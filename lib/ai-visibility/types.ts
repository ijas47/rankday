export type AiProvider = "openai" | "perplexity" | "gemini";
export type RunStatus = "queued" | "running" | "completed" | "failed";
export type RecommendationPriority = "high" | "medium" | "low";

export type Organization = {
  id: string;
  name: string;
  created_at?: string;
};

export type Project = {
  id: string;
  organization_id: string;
  brand_name: string;
  domain: string;
  market: string;
  aliases: string[];
  status: "active" | "paused";
  created_at?: string;
};

export type Competitor = {
  id: string;
  project_id: string;
  name: string;
  domain: string | null;
  aliases: string[];
  created_at?: string;
};

export type Prompt = {
  id: string;
  project_id: string;
  prompt_text: string;
  topic: string;
  market: string;
  priority: number;
  active: boolean;
  created_at?: string;
};

export type TrackingRun = {
  id: string;
  project_id: string;
  status: RunStatus;
  started_at: string;
  finished_at: string | null;
  error: string | null;
};

export type PromptResult = {
  id: string;
  project_id: string;
  prompt_id: string;
  tracking_run_id: string;
  provider: AiProvider;
  prompt_text: string;
  response_text: string;
  mentioned_brands: MentionedBrand[];
  cited_urls: string[];
  cited_domains: string[];
  raw_response: Record<string, unknown>;
  error: string | null;
  created_at?: string;
};

export type MentionedBrand = {
  brand: string;
  kind: "project" | "competitor";
  brand_id: string;
  position: number;
  sentiment: number;
  first_index: number;
};

export type Recommendation = {
  id?: string;
  project_id: string;
  tracking_run_id?: string | null;
  priority: RecommendationPriority;
  title: string;
  detail: string;
  action: string;
  status?: "open" | "done";
  created_at?: string;
};

export type AiVisibilitySummary = {
  project: Project;
  competitors: Competitor[];
  prompts: Prompt[];
  latestRun: TrackingRun | null;
  metrics: {
    visibility: number;
    shareOfVoice: { brand: string; kind: "project" | "competitor"; mentions: number; percent: number }[];
    averagePosition: number | null;
    averageSentiment: number | null;
    providerCoverage: { provider: AiProvider; results: number; visibility: number }[];
    topSources: { domain: string; count: number }[];
  };
  recentResults: PromptResult[];
  recommendations: Recommendation[];
};

export type ProviderRunInput = {
  provider: AiProvider;
  prompt: Prompt;
  project: Project;
  competitors: Competitor[];
};

export type ProviderRunOutput = {
  provider: AiProvider;
  responseText: string;
  citedUrls: string[];
  raw: Record<string, unknown>;
  error: string | null;
};
