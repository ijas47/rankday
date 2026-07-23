import { NextResponse } from "next/server";
import { buildVisibilityReport, type ReportRequest } from "@/lib/ai-visibility-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Free tool: no LLM calls. Only optional HTML/robots fetch (same class as AEO Score).
const cache = new Map<string, { at: number; data: unknown }>();
const hits = new Map<string, { count: number; windowStart: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 12; // 12h
const RATE_LIMIT = 10;
const RATE_WINDOW = 1000 * 60 * 10;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.windowStart > RATE_WINDOW) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  rec.count += 1;
  return rec.count > RATE_LIMIT;
}

type Body = {
  brandName?: string;
  domain?: string;
  industry?: string;
  market?: string;
  aliases?: string[];
  competitors?: { name?: string; domain?: string }[];
  customPrompts?: string[];
};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many reports. Try again in a few minutes." }, { status: 429 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const brandName = (body.brandName || "").trim();
  const domain = (body.domain || "").trim();
  const industry = (body.industry || "").trim();
  const market = (body.market || "").trim();

  if (!brandName) return NextResponse.json({ error: "Enter a brand name." }, { status: 400 });
  if (!domain) return NextResponse.json({ error: "Enter a website." }, { status: 400 });
  if (!industry) return NextResponse.json({ error: "Enter your industry or category." }, { status: 400 });

  const competitors = (body.competitors || [])
    .map((item) => ({
      name: (item.name || "").trim(),
      domain: (item.domain || "").trim() || undefined,
    }))
    .filter((item) => item.name)
    .slice(0, 5);

  const customPrompts = (body.customPrompts || [])
    .map((text) => (typeof text === "string" ? text.trim() : ""))
    .filter(Boolean)
    .slice(0, 5);

  const input: ReportRequest = {
    brandName,
    domain,
    industry,
    market: market || "Global",
    aliases: Array.isArray(body.aliases) ? body.aliases.map(String).filter(Boolean).slice(0, 8) : [],
    competitors,
    customPrompts,
  };

  const cacheKey = JSON.stringify({
    brandName: brandName.toLowerCase(),
    domain: domain.toLowerCase(),
    industry: industry.toLowerCase(),
    market: market.toLowerCase(),
    competitors: competitors.map((c) => c.name.toLowerCase()).sort(),
    customPrompts,
  });
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.at < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const report = await buildVisibilityReport(input);
    cache.set(cacheKey, { at: Date.now(), data: report });
    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not build the report." },
      { status: 500 },
    );
  }
}
