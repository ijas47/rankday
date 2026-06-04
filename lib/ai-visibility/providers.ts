import type { AiProvider, ProviderRunInput, ProviderRunOutput } from "./types";

const PROVIDERS: AiProvider[] = ["openai", "perplexity", "gemini"];

export function activeProviders(): AiProvider[] {
  return PROVIDERS;
}

export async function runProvider(input: ProviderRunInput): Promise<ProviderRunOutput> {
  try {
    if (input.provider === "openai") return await runOpenAi(input);
    if (input.provider === "perplexity") return await runPerplexity(input);
    return await runGemini(input);
  } catch (error) {
    return {
      provider: input.provider,
      responseText: "",
      citedUrls: [],
      raw: {},
      error: error instanceof Error ? error.message : "Provider request failed.",
    };
  }
}

function promptText(input: ProviderRunInput): string {
  const competitors = input.competitors.map((item) => `${item.name}${item.domain ? ` (${item.domain})` : ""}`).join(", ");
  return [
    `Market: ${input.project.market}`,
    `Brand to monitor: ${input.project.brand_name} (${input.project.domain})`,
    competitors ? `Known competitors: ${competitors}` : "Known competitors: none provided",
    "Answer the user's question naturally. If you include brands, use their real names. Include source URLs when the provider supports citations.",
    "",
    input.prompt.prompt_text,
  ].join("\n");
}

async function runOpenAi(input: ProviderRunInput): Promise<ProviderRunOutput> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return missing(input.provider, "OPENAI_API_KEY");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_AI_VISIBILITY_MODEL || "gpt-4o-mini",
      temperature: 0.2,
      max_tokens: 900,
      messages: [
        { role: "system", content: "You are an AI search assistant answering buyer research questions with concise, source-aware recommendations." },
        { role: "user", content: promptText(input) },
      ],
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || "OpenAI request failed.");
  return {
    provider: "openai",
    responseText: data?.choices?.[0]?.message?.content || "",
    citedUrls: extractUrls(JSON.stringify(data)),
    raw: data,
    error: null,
  };
}

async function runPerplexity(input: ProviderRunInput): Promise<ProviderRunOutput> {
  const key = process.env.PERPLEXITY_API_KEY;
  if (!key) return missing(input.provider, "PERPLEXITY_API_KEY");
  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.PERPLEXITY_AI_VISIBILITY_MODEL || "sonar",
      temperature: 0.2,
      max_tokens: 900,
      messages: [
        { role: "system", content: "Answer as a web-connected AI search assistant. Prefer cited, current sources." },
        { role: "user", content: promptText(input) },
      ],
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || "Perplexity request failed.");
  return {
    provider: "perplexity",
    responseText: data?.choices?.[0]?.message?.content || "",
    citedUrls: normalizeCitations(data?.citations || extractUrls(JSON.stringify(data))),
    raw: data,
    error: null,
  };
}

async function runGemini(input: ProviderRunInput): Promise<ProviderRunOutput> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return missing(input.provider, "GEMINI_API_KEY");
  const model = process.env.GEMINI_AI_VISIBILITY_MODEL || "gemini-1.5-flash";
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      generationConfig: { temperature: 0.2, maxOutputTokens: 900 },
      contents: [{ role: "user", parts: [{ text: promptText(input) }] }],
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || "Gemini request failed.");
  const responseText = data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || "").join("\n") || "";
  return {
    provider: "gemini",
    responseText,
    citedUrls: extractUrls(JSON.stringify(data)),
    raw: data,
    error: null,
  };
}

function missing(provider: AiProvider, env: string): ProviderRunOutput {
  return {
    provider,
    responseText: "",
    citedUrls: [],
    raw: {},
    error: `${env} is not configured.`,
  };
}

function normalizeCitations(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object" && "url" in item && typeof item.url === "string") return item.url;
      return "";
    })
    .filter(Boolean);
}

function extractUrls(value: string): string[] {
  return [...new Set((value.match(/https?:\/\/[^\s"'<>),\]]+/g) || []).map((url) => url.replace(/[.]+$/, "")))].slice(0, 12);
}
