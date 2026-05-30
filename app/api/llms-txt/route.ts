import { NextResponse } from "next/server";
import { generateLlmsTxt } from "@/lib/llms-txt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const cache = new Map<string, { at: number; data: unknown }>();
const hits = new Map<string, { count: number; windowStart: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24;
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

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again in a few minutes." }, { status: 429 });
  }

  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const url = (body.url || "").trim();
  if (!url) return NextResponse.json({ error: "Enter a URL." }, { status: 400 });

  const key = url.toLowerCase();
  const cached = cache.get(key);
  if (cached && Date.now() - cached.at < CACHE_TTL) return NextResponse.json(cached.data);

  const result = await generateLlmsTxt(url);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 422 });

  cache.set(key, { at: Date.now(), data: result });
  return NextResponse.json(result);
}
