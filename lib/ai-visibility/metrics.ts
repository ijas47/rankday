import type { Competitor, MentionedBrand, Project, PromptResult, Recommendation } from "./types";

type BrandCandidate = {
  id: string;
  name: string;
  kind: "project" | "competitor";
  aliases: string[];
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function domains(urls: string[]): string[] {
  return urls
    .map((url) => {
      try {
        return new URL(url).hostname.replace(/^www\./, "");
      } catch {
        return "";
      }
    })
    .filter(Boolean);
}

export function citedDomains(urls: string[]): string[] {
  return [...new Set(domains(urls))];
}

export function detectMentions(responseText: string, project: Project, competitors: Competitor[]): MentionedBrand[] {
  const candidates: BrandCandidate[] = [
    { id: project.id, name: project.brand_name, kind: "project", aliases: [project.brand_name, project.domain, ...(project.aliases || [])] },
    ...competitors.map((item) => ({
      id: item.id,
      name: item.name,
      kind: "competitor" as const,
      aliases: [item.name, item.domain || "", ...(item.aliases || [])],
    })),
  ];

  const found = candidates
    .map((candidate) => {
      const firstIndex = candidate.aliases
        .filter(Boolean)
        .map((alias) => {
          const re = new RegExp(`(^|\\b)${escapeRegExp(alias)}(\\b|$)`, "i");
          const match = responseText.match(re);
          return match?.index ?? -1;
        })
        .filter((index) => index >= 0)
        .sort((a, b) => a - b)[0];

      if (firstIndex === undefined) return null;
      return {
        brand: candidate.name,
        kind: candidate.kind,
        brand_id: candidate.id,
        first_index: firstIndex,
        sentiment: sentimentFor(responseText, candidate.aliases),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a!.first_index - b!.first_index) as Omit<MentionedBrand, "position">[];

  return found.map((item, index) => ({ ...item, position: index + 1 }));
}

function sentimentFor(text: string, aliases: string[]): number {
  const lower = text.toLowerCase();
  const firstAlias = aliases.find((alias) => alias && lower.includes(alias.toLowerCase()));
  if (!firstAlias) return 50;
  const index = lower.indexOf(firstAlias.toLowerCase());
  const windowText = lower.slice(Math.max(0, index - 240), index + firstAlias.length + 240);
  const positive = ["best", "strong", "recommended", "trusted", "leader", "excellent", "top", "popular", "credible", "notable"];
  const negative = ["weak", "limited", "poor", "expensive", "missing", "complaints", "not recommended", "behind", "unclear"];
  const pos = positive.reduce((sum, word) => sum + (windowText.includes(word) ? 1 : 0), 0);
  const neg = negative.reduce((sum, word) => sum + (windowText.includes(word) ? 1 : 0), 0);
  return Math.max(0, Math.min(100, 50 + pos * 10 - neg * 12));
}

export function buildSummaryMetrics(project: Project, competitors: Competitor[], results: PromptResult[]) {
  const completed = results.filter((result) => !result.error);
  const projectMentions = completed.filter((result) => result.mentioned_brands.some((item) => item.kind === "project"));
  const allMentions = completed.flatMap((result) => result.mentioned_brands);
  const mentionCount = new Map<string, { brand: string; kind: "project" | "competitor"; mentions: number }>();

  allMentions.forEach((mention) => {
    const key = mention.brand_id;
    const current = mentionCount.get(key) || { brand: mention.brand, kind: mention.kind, mentions: 0 };
    current.mentions += 1;
    mentionCount.set(key, current);
  });

  const totalMentions = [...mentionCount.values()].reduce((sum, item) => sum + item.mentions, 0);
  const projectPositions = allMentions.filter((item) => item.kind === "project").map((item) => item.position);
  const projectSentiment = allMentions.filter((item) => item.kind === "project").map((item) => item.sentiment);
  const topSources = new Map<string, number>();
  completed.flatMap((result) => result.cited_domains).forEach((domain) => topSources.set(domain, (topSources.get(domain) || 0) + 1));

  const providers = ["openai", "perplexity", "gemini"] as const;

  return {
    visibility: completed.length ? Math.round((projectMentions.length / completed.length) * 100) : 0,
    shareOfVoice: [...mentionCount.values()]
      .map((item) => ({
        ...item,
        percent: totalMentions ? Math.round((item.mentions / totalMentions) * 100) : 0,
      }))
      .sort((a, b) => b.mentions - a.mentions),
    averagePosition: average(projectPositions),
    averageSentiment: average(projectSentiment),
    providerCoverage: providers.map((provider) => {
      const providerResults = completed.filter((result) => result.provider === provider);
      const providerMentions = providerResults.filter((result) => result.mentioned_brands.some((item) => item.kind === "project"));
      return {
        provider,
        results: providerResults.length,
        visibility: providerResults.length ? Math.round((providerMentions.length / providerResults.length) * 100) : 0,
      };
    }),
    topSources: [...topSources.entries()].map(([domain, count]) => ({ domain, count })).sort((a, b) => b.count - a.count).slice(0, 12),
  };
}

export function buildRecommendations(project: Project, competitors: Competitor[], results: PromptResult[]): Recommendation[] {
  const metrics = buildSummaryMetrics(project, competitors, results);
  const recommendations: Recommendation[] = [];
  const competitorLeader = metrics.shareOfVoice.find((item) => item.kind === "competitor" && item.percent > (metrics.shareOfVoice.find((v) => v.kind === "project")?.percent || 0));

  if (metrics.visibility < 40) {
    recommendations.push({
      project_id: project.id,
      priority: "high",
      title: "Brand is missing from too many tracked AI answers",
      detail: `rankday found ${metrics.visibility}% visibility across the latest completed results.`,
      action: "Create direct answer sections for each tracked prompt and add those pages to llms.txt.",
    });
  }

  if (competitorLeader) {
    recommendations.push({
      project_id: project.id,
      priority: "high",
      title: `${competitorLeader.brand} is winning share of voice`,
      detail: `${competitorLeader.brand} has ${competitorLeader.percent}% share of voice in the latest sample.`,
      action: "Review the prompts they win, identify cited sources, and publish comparison or proof pages that answer the same buyer questions.",
    });
  }

  if (!metrics.topSources.length) {
    recommendations.push({
      project_id: project.id,
      priority: "medium",
      title: "AI answers are not returning usable source data",
      detail: "The latest result set has no cited domains.",
      action: "Prioritize Perplexity prompts and add source-rich pages with clear references, stats, and schema.",
    });
  } else if (!metrics.topSources.some((source) => source.domain.includes(project.domain.replace(/^www\./, "")))) {
    recommendations.push({
      project_id: project.id,
      priority: "medium",
      title: "rankday is not seeing your domain among cited sources",
      detail: `Top sources include ${metrics.topSources.slice(0, 3).map((source) => source.domain).join(", ")}.`,
      action: "Add citation-worthy pages with exact answers, expert proof, and internal links from the highest-authority pages.",
    });
  }

  if ((metrics.averageSentiment || 100) < 60) {
    recommendations.push({
      project_id: project.id,
      priority: "medium",
      title: "Brand sentiment needs improvement",
      detail: `Average sentiment is ${metrics.averageSentiment}/100 in the latest result set.`,
      action: "Publish proof points, reviews, case studies, and third-party citations that support the brand's strengths.",
    });
  }

  return recommendations.length
    ? recommendations
    : [
        {
          project_id: project.id,
          priority: "low",
          title: "Visibility baseline is healthy",
          detail: "The latest run shows no major visibility gap from the available sample.",
          action: "Keep adding prompt clusters, source-backed pages, and weekly comparisons to maintain momentum.",
        },
      ];
}

function average(values: number[]): number | null {
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}
