/**
 * AI Visibility Report — free tier is intentionally zero LLM cost.
 *
 * Free deliverable (no OpenAI / Perplexity / Gemini keys):
 *   - 20 buyer prompts tailored to brand, industry, market
 *   - optional site readiness signals via existing AEO fetch (HTTP only)
 *   - 5 concrete fixes ranked for impact
 *   - clear path to paid live-engine audit
 *
 * Live "does ChatGPT mention you?" checks are NOT free.
 * Those run only as a paid one-off audit (manual / controlled spend).
 */

import { scoreUrl, type AeoReport, type Check } from "@/lib/aeo-score";

export const FREE_PROMPT_COUNT = 5;
export const FULL_PROMPT_COUNT = 20;
export const AUDIT_PRICE_USD = 149;
export const AUDIT_PRICE_RANGE = "$149";

export type ReportRequest = {
  brandName: string;
  domain: string;
  industry: string;
  market: string;
  aliases?: string[];
  competitors?: { name: string; domain?: string }[];
  customPrompts?: string[];
};

export type BuyerPrompt = {
  promptText: string;
  topic: string;
  whyItMatters: string;
  /** First N are previewed before email unlock */
  preview: boolean;
};

export type FixItem = {
  priority: "high" | "medium" | "low";
  title: string;
  detail: string;
  action: string;
};

export type VisibilityReport = {
  brandName: string;
  domain: string;
  industry: string;
  market: string;
  competitors: string[];
  generatedAt: string;
  /** Free report never queries paid AI APIs */
  costModel: "zero-llm";
  prompts: BuyerPrompt[];
  readiness: {
    available: boolean;
    score: number | null;
    grade: "A" | "B" | "C" | "D" | "F" | null;
    summary: string;
    checks: { label: string; passed: boolean; severity: string; fix: string }[];
  };
  fixes: FixItem[];
  summary: {
    headline: string;
    detail: string;
  };
  nextSteps: {
    free: string;
    paidAudit: string;
    implement: string;
  };
  limits: {
    freePromptPreview: number;
    fullPromptCount: number;
    auditPriceUsd: number;
  };
};

function normalizeDomain(input: string): string {
  const raw = input.trim().toLowerCase();
  if (!raw) return "";
  try {
    const withProto = raw.startsWith("http") ? raw : `https://${raw}`;
    return new URL(withProto).hostname.replace(/^www\./, "");
  } catch {
    return raw.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  }
}

export function generateBuyerPrompts(input: {
  brandName: string;
  industry: string;
  market: string;
}): { promptText: string; topic: string; whyItMatters: string }[] {
  const industry = input.industry.trim() || "local service";
  const market = input.market.trim() || "my area";
  const brand = input.brandName.trim();

  return [
    {
      topic: "Best of",
      promptText: `What is the best ${industry} in ${market}?`,
      whyItMatters: "Highest-intent discovery prompt. If you are missing here, AI is sending buyers elsewhere.",
    },
    {
      topic: "Recommendations",
      promptText: `Recommend the top ${industry} companies in ${market} for a first-time buyer.`,
      whyItMatters: "Shortlist prompt. Share of voice is won or lost on recommendation lists.",
    },
    {
      topic: "Comparison",
      promptText: `Who are the top alternatives if I need ${industry} services in ${market}?`,
      whyItMatters: "Surfaces competitor framing and comparison content AI already trusts.",
    },
    {
      topic: "Near me",
      promptText: `Best ${industry} near me in ${market} with strong reviews.`,
      whyItMatters: "Local + proof signal. Reviews and GBP-style authority often decide the answer.",
    },
    {
      topic: "Pricing",
      promptText: `How much does ${industry} cost in ${market}, and which providers are worth it?`,
      whyItMatters: "Commercial intent. Brands with clear pricing/value pages get named more often.",
    },
    {
      topic: "Trust",
      promptText: `Which ${industry} businesses in ${market} are most trusted and why?`,
      whyItMatters: "Trust language drives both mentions and positive sentiment.",
    },
    {
      topic: "Urgency",
      promptText: `I need a reliable ${industry} provider in ${market} this week. Who should I call?`,
      whyItMatters: "Urgency prompts favor brands with clear availability and response proof.",
    },
    {
      topic: "Quality",
      promptText: `Which ${industry} companies in ${market} deliver the highest quality work?`,
      whyItMatters: "Quality claims need case studies and third-party proof AI can cite.",
    },
    {
      topic: "For businesses",
      promptText: `Best ${industry} for small businesses in ${market}.`,
      whyItMatters: "Segment prompt. Niche pages beat generic homepages in AI answers.",
    },
    {
      topic: "For homes",
      promptText: `Best ${industry} for homeowners in ${market}.`,
      whyItMatters: "Another segment split — missing pages = missing mentions.",
    },
    {
      topic: "Reviews",
      promptText: `Based on recent reviews, who is winning in ${industry} in ${market}?`,
      whyItMatters: "Review ecosystems (Google, industry sites) often feed AI recommendations.",
    },
    {
      topic: "Value",
      promptText: `Best value ${industry} in ${market} without cutting corners.`,
      whyItMatters: "Value framing. Clear offers and guarantees help AI describe you accurately.",
    },
    {
      topic: "Premium",
      promptText: `Best premium ${industry} options in ${market}.`,
      whyItMatters: "Premium buyers ask differently — content must match the tier.",
    },
    {
      topic: "How to choose",
      promptText: `How do I choose a ${industry} company in ${market}? Which brands stand out?`,
      whyItMatters: "Educational prompts still name brands. Guides and criteria pages win citations.",
    },
    {
      topic: "Problems",
      promptText: `Who solves common ${industry} problems best in ${market}?`,
      whyItMatters: "Problem-led search maps to service pages with direct answers.",
    },
    {
      topic: "Vs market",
      promptText: `Compare the leading ${industry} providers in ${market} and say who is best for most people.`,
      whyItMatters: "Direct comparison prompt. If you lack vs/pages, competitors own the narrative.",
    },
    {
      topic: "Shortlist",
      promptText: `Give me a shortlist of 5 ${industry} brands in ${market} with reasons.`,
      whyItMatters: "Classic AI shortlist. Being #1–5 here is the game.",
    },
    {
      topic: "Brand check",
      promptText: `Is ${brand} a good ${industry} company in ${market}? Who else should I consider?`,
      whyItMatters: "Branded evaluation. Tests whether AI knows you and how it positions you.",
    },
    {
      topic: "Sources",
      promptText: `Which websites and directories are most useful when researching ${industry} in ${market}?`,
      whyItMatters: "Shows which off-site sources AI trusts — your citation roadmap.",
    },
    {
      topic: "Local authority",
      promptText: `Which ${industry} brands are most often recommended online for ${market}?`,
      whyItMatters: "Authority roll-up. Consistent web presence compounds into AI mentions.",
    },
  ].slice(0, FULL_PROMPT_COUNT);
}

function fixesFromReadiness(
  brandName: string,
  industry: string,
  market: string,
  domain: string,
  competitors: string[],
  aeo: AeoReport | null,
): FixItem[] {
  const failed = aeo?.checks.filter((c) => !c.passed) || [];
  const bySeverity = (s: Check["severity"]) => failed.filter((c) => c.severity === s);

  const fixes: FixItem[] = [];

  const highTech = bySeverity("high")[0];
  if (highTech) {
    fixes.push({
      priority: "high",
      title: highTech.label,
      detail: highTech.detail,
      action: highTech.fix,
    });
  }

  fixes.push({
    priority: "high",
    title: `Publish direct-answer pages for top “best ${industry} in ${market}” prompts`,
    detail:
      "AI assistants favor pages that answer the buyer question in the first screen with clear entities, proof, and FAQs — not vague service blurbs.",
    action: `Create dedicated pages for your highest-intent prompts (best of, pricing, how to choose, vs competitors) with a 40–80 word direct answer, FAQ schema, and internal links from ${domain}.`,
  });

  fixes.push({
    priority: "high",
    title: "Earn mentions on sources AI already cites for your category",
    detail:
      "Live audits usually show the same pattern: models reuse directories, review sites, listicles, and a few industry publishers. Your homepage alone is rarely enough.",
    action:
      competitors.length > 0
        ? `Map where ${competitors.slice(0, 3).join(", ")} appear online, then pursue the same citation classes (reviews, directories, comparisons) for ${brandName}.`
        : `Build a citation map for ${industry} in ${market}: review platforms, directories, local/publisher listicles, and partner pages. Get listed with consistent NAP and proof.`,
  });

  const mediumTech = bySeverity("medium")[0];
  if (mediumTech && fixes.length < 5) {
    fixes.push({
      priority: "medium",
      title: mediumTech.label,
      detail: mediumTech.detail,
      action: mediumTech.fix,
    });
  }

  fixes.push({
    priority: "medium",
    title: "Ship comparison and proof assets AI can quote",
    detail:
      "Models summarize what is easy to extract: comparisons, stats, case results, guarantees, and third-party validation.",
    action: `Publish “${brandName} vs [competitor]”, process, results, and review-proof pages. Add Organization/LocalBusiness/FAQ/Service schema and an llms.txt pointing at your strongest URLs.`,
  });

  fixes.push({
    priority: "medium",
    title: "Run your 20 prompts monthly (or let rankday do it)",
    detail:
      "Visibility without a repeatable prompt set is guessing. The free report gives you the prompt plan; live engine checks belong in a controlled audit so free traffic never burns API budget.",
    action: `Each month, test the brand-check + best-of prompts in ChatGPT, Perplexity, and Gemini. Log mention / competitor / sources. Or book the ${AUDIT_PRICE_RANGE} audit and the 90-day program to implement gaps.`,
  });

  // Dedupe by title, cap at 5
  const seen = new Set<string>();
  return fixes
    .filter((f) => {
      if (seen.has(f.title)) return false;
      seen.add(f.title);
      return true;
    })
    .slice(0, 5);
}

export async function buildVisibilityReport(input: ReportRequest): Promise<VisibilityReport> {
  const brandName = input.brandName.trim();
  const domain = normalizeDomain(input.domain);
  const industry = input.industry.trim();
  const market = (input.market || "").trim() || "your market";

  if (!brandName) throw new Error("Enter a brand name.");
  if (!domain) throw new Error("Enter a website domain.");
  if (!industry) throw new Error("Enter your industry or category.");

  const competitors = (input.competitors || [])
    .map((c) => c.name.trim())
    .filter(Boolean)
    .slice(0, 5);

  const custom = (input.customPrompts || [])
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 5)
    .map((promptText) => ({
      promptText,
      topic: "Custom",
      whyItMatters: "You told us this is a real buyer question. It should be in every live audit run.",
    }));

  const generated = generateBuyerPrompts({ brandName, industry, market });
  const seen = new Set<string>();
  const merged = [...custom, ...generated].filter((p) => {
    const key = p.promptText.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, FULL_PROMPT_COUNT);

  const prompts: BuyerPrompt[] = merged.map((p, index) => ({
    ...p,
    preview: index < FREE_PROMPT_COUNT,
  }));

  // Optional free HTTP readiness check (same cost class as AEO Score — no LLM).
  let aeo: AeoReport | null = null;
  const scored = await scoreUrl(domain);
  if (!("error" in scored)) aeo = scored;

  const fixes = fixesFromReadiness(brandName, industry, market, domain, competitors, aeo);

  const readinessScore = aeo?.score ?? null;
  let headline: string;
  let detail: string;

  if (aeo) {
    if (aeo.score >= 70) {
      headline = `${brandName} looks technically ready — the open question is whether AI names you.`;
      detail = `Site readiness scored ${aeo.score}/100 (grade ${aeo.grade}). That helps crawlers and citations, but it does not prove ChatGPT, Perplexity, or Gemini recommend you. Your free report is the ${FULL_PROMPT_COUNT}-prompt plan + fixes. Live mention checks are the paid audit.`;
    } else if (aeo.score >= 40) {
      headline = `${brandName} has real technical gaps before AI can reliably cite you.`;
      detail = `Site readiness scored ${aeo.score}/100 (grade ${aeo.grade}). Fix crawler, schema, and structure issues first — then win mentions on buyer prompts. Below is your prompt plan and the top five actions.`;
    } else {
      headline = `${brandName} is under-prepared for AI discovery right now.`;
      detail = `Site readiness scored ${aeo.score}/100 (grade ${aeo.grade}). AI engines will struggle to understand or cite you until basics improve. Use the prompt plan to see what buyers ask, and the fixes to prioritize.`;
    }
  } else {
    headline = `Your ${FULL_PROMPT_COUNT}-prompt AI visibility plan for ${brandName} is ready.`;
    detail = `We could not fetch the site for a readiness score, but you still get a full buyer-prompt plan and five concrete fixes. Live engine mention tracking is available as a ${AUDIT_PRICE_RANGE} audit — free tools never call paid AI APIs.`;
  }

  const failedHigh = aeo?.checks.filter((c) => !c.passed && c.severity === "high").length ?? 0;

  return {
    brandName,
    domain,
    industry,
    market,
    competitors,
    generatedAt: new Date().toISOString(),
    costModel: "zero-llm",
    prompts,
    readiness: {
      available: Boolean(aeo),
      score: readinessScore,
      grade: aeo?.grade ?? null,
      summary: aeo
        ? `HTTP readiness check only (no AI API cost). ${failedHigh} high-severity gaps found.`
        : "Site fetch failed; prompt plan and fixes still generated.",
      checks: (aeo?.checks || [])
        .filter((c) => !c.passed)
        .sort((a, b) => severityRank(b.severity) - severityRank(a.severity))
        .slice(0, 8)
        .map((c) => ({
          label: c.label,
          passed: c.passed,
          severity: c.severity,
          fix: c.fix,
        })),
    },
    fixes,
    summary: { headline, detail },
    nextSteps: {
      free: "Use the prompt plan. Unlock the full list with email. Manually spot-check 1–2 prompts if you want — free tools never spend on model APIs.",
      paidAudit: `${AUDIT_PRICE_RANGE}: rankday runs ~${FULL_PROMPT_COUNT} prompts across ChatGPT, Perplexity, and Gemini, logs mentions/competitors/citations/sentiment, and delivers a prioritized action report (~48h).`,
      implement: "90-day program: we implement the pages, proof, sources, and tracking so AI can recommend you — not just diagnose the gap.",
    },
    limits: {
      freePromptPreview: FREE_PROMPT_COUNT,
      fullPromptCount: FULL_PROMPT_COUNT,
      auditPriceUsd: AUDIT_PRICE_USD,
    },
  };
}

function severityRank(s: "high" | "medium" | "low"): number {
  return s === "high" ? 3 : s === "medium" ? 2 : 1;
}
