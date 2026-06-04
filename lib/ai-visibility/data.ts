import { buildRecommendations, buildSummaryMetrics, citedDomains, detectMentions } from "./metrics";
import { activeProviders, runProvider } from "./providers";
import { insertRows, selectRows, updateRows } from "./supabase-rest";
import type {
  AiVisibilitySummary,
  Competitor,
  Project,
  Prompt,
  PromptResult,
  Recommendation,
  TrackingRun,
} from "./types";

export async function loadProjectBundle(projectId: string) {
  const [project] = await selectRows<Project>("projects", `select=*&id=eq.${encodeURIComponent(projectId)}&limit=1`);
  if (!project) throw new Error("Project not found.");
  const [competitors, prompts] = await Promise.all([
    selectRows<Competitor>("competitors", `select=*&project_id=eq.${encodeURIComponent(projectId)}&order=name.asc`),
    selectRows<Prompt>("prompts", `select=*&project_id=eq.${encodeURIComponent(projectId)}&active=eq.true&order=priority.desc,created_at.asc`),
  ]);
  return { project, competitors, prompts };
}

export async function loadActiveProjects(): Promise<Project[]> {
  return selectRows<Project>("projects", "select=*&status=eq.active&order=created_at.asc");
}

export async function loadDashboardSummary(projectId: string): Promise<AiVisibilitySummary> {
  const { project, competitors, prompts } = await loadProjectBundle(projectId);
  const [latestRun] = await selectRows<TrackingRun>(
    "tracking_runs",
    `select=*&project_id=eq.${encodeURIComponent(projectId)}&order=started_at.desc&limit=1`,
  );
  const recentResults = await selectRows<PromptResult>(
    "prompt_results",
    `select=*&project_id=eq.${encodeURIComponent(projectId)}&order=created_at.desc&limit=90`,
  );
  const recommendations = await selectRows<Recommendation>(
    "recommendations",
    `select=*&project_id=eq.${encodeURIComponent(projectId)}&status=eq.open&order=created_at.desc&limit=12`,
  );

  return {
    project,
    competitors,
    prompts,
    latestRun: latestRun || null,
    metrics: buildSummaryMetrics(project, competitors, recentResults),
    recentResults,
    recommendations,
  };
}

export async function createProject(input: {
  organizationName: string;
  brandName: string;
  domain: string;
  market: string;
  aliases: string[];
  memberUserIds: string[];
  competitors: { name: string; domain?: string; aliases: string[] }[];
  prompts: { promptText: string; topic: string; market: string; priority: number }[];
}) {
  const [organization] = await insertRows<{ id: string }>("organizations", [{ name: input.organizationName }]);
  if (input.memberUserIds.length) {
    await insertRows<{ id: string }>(
      "organization_members",
      input.memberUserIds.map((userId) => ({
        organization_id: organization.id,
        user_id: userId,
        role: "member",
      })),
    );
  }

  const [project] = await insertRows<Project>("projects", [
    {
      organization_id: organization.id,
      brand_name: input.brandName,
      domain: input.domain,
      market: input.market,
      aliases: input.aliases,
      status: "active",
    },
  ]);

  if (input.competitors.length) {
    await insertRows<Competitor>(
      "competitors",
      input.competitors.map((item) => ({
        project_id: project.id,
        name: item.name,
        domain: item.domain || null,
        aliases: item.aliases,
      })),
    );
  }

  if (input.prompts.length) {
    await insertRows<Prompt>(
      "prompts",
      input.prompts.map((item) => ({
        project_id: project.id,
        prompt_text: item.promptText,
        topic: item.topic,
        market: item.market,
        priority: item.priority,
        active: true,
      })),
    );
  }

  return project;
}

export async function runProject(projectId: string) {
  const { project, competitors, prompts } = await loadProjectBundle(projectId);
  const [trackingRun] = await insertRows<TrackingRun>("tracking_runs", [
    {
      project_id: project.id,
      status: "running",
      started_at: new Date().toISOString(),
    },
  ]);

  try {
    const rows: Omit<PromptResult, "id" | "created_at">[] = [];
    for (const prompt of prompts) {
      for (const provider of activeProviders()) {
        const output = await runProvider({ provider, prompt, project, competitors });
        const mentions = output.responseText ? detectMentions(output.responseText, project, competitors) : [];
        const urls = output.citedUrls;
        rows.push({
          project_id: project.id,
          prompt_id: prompt.id,
          tracking_run_id: trackingRun.id,
          provider,
          prompt_text: prompt.prompt_text,
          response_text: output.responseText,
          mentioned_brands: mentions,
          cited_urls: urls,
          cited_domains: citedDomains(urls),
          raw_response: output.raw,
          error: output.error,
        });
      }
    }

    if (rows.length) await insertRows<PromptResult>("prompt_results", rows);
    const insertedResults = await selectRows<PromptResult>(
      "prompt_results",
      `select=*&tracking_run_id=eq.${encodeURIComponent(trackingRun.id)}&order=created_at.desc`,
    );
    const recommendations = buildRecommendations(project, competitors, insertedResults).map((item) => ({
      ...item,
      tracking_run_id: trackingRun.id,
      status: "open",
    }));
    if (recommendations.length) await insertRows<Recommendation>("recommendations", recommendations);

    const [completed] = await updateRows<TrackingRun>(
      "tracking_runs",
      `id=eq.${encodeURIComponent(trackingRun.id)}`,
      { status: "completed", finished_at: new Date().toISOString() },
    );
    return { run: completed, results: insertedResults.length, recommendations: recommendations.length };
  } catch (error) {
    const [failed] = await updateRows<TrackingRun>(
      "tracking_runs",
      `id=eq.${encodeURIComponent(trackingRun.id)}`,
      {
        status: "failed",
        finished_at: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Run failed.",
      },
    );
    return { run: failed, results: 0, recommendations: 0 };
  }
}
