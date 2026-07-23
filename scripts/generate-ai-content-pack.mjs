/**
 * Offline / CLI content pack generator (Chris Long workflow).
 * Usage: node scripts/generate-ai-content-pack.mjs [url] [maxPages]
 * Writes Markdown under docs/ai-content-packs/
 *
 * Zero LLM cost — crawl + export only.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Dynamic import of compiled TS is awkward without build; reimplement a focused
// pack for known URLs OR call the local Next API. Prefer direct fetch of seed
// sitemap + key paths for Rankday when run against production.

const SEED = process.argv[2] || "https://www.rank-day.com";
const MAX_PAGES = Math.min(Number(process.argv[3] || 35), 50);

const PRIORITY_PATHS = [
  "/",
  "/pricing",
  "/how-it-works",
  "/results",
  "/results/dubai-clinic-90-day-seo-aeo",
  "/results/uk-trades-company-local-seo",
  "/results/b2b-saas-aeo-comparison-pages",
  "/who-its-for",
  "/faq",
  "/about",
  "/partners",
  "/what-is-aeo",
  "/get-cited-by-chatgpt",
  "/ai-visibility-tracker",
  "/seo-agency-dubai",
  "/best-seo-agency-dubai",
  "/best-aeo-agency-dubai",
  "/best-geo-agency-dubai",
  "/best-web-design-agency-dubai",
  "/seo-agency-uk",
  "/seo-agency-us",
  "/seo-for-clinics",
  "/seo-for-saas",
  "/seo-for-plumbers",
  "/seo-for-law-firms",
  "/tools",
  "/tools/aeo-score",
  "/tools/ai-visibility-report",
  "/tools/website-seo-audit",
  "/tools/llms-txt",
  "/blog",
  "/blog/seo-vs-aeo-vs-geo",
  "/blog/how-long-does-seo-take",
  "/blog/how-much-does-seo-cost",
  "/blog/what-is-geo-generative-engine-optimization",
  "/blog/how-to-optimise-for-google-ai-overviews",
  "/ai-info-page",
];

const UA = "Mozilla/5.0 (compatible; rankdayContentPack/1.0; +https://www.rank-day.com)";

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "user-agent": UA, accept: "text/html,text/plain,*/*" },
    });
    const text = res.ok ? await res.text() : "";
    return { ok: res.ok, status: res.status, finalUrl: res.url, text };
  } catch (error) {
    return { ok: false, status: 0, finalUrl: url, text: "", error: String(error) };
  } finally {
    clearTimeout(timer);
  }
}

function stripHtml(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<\/(p|div|h[1-6]|li|tr|section|article|br|hr)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function firstMatch(html, re) {
  const m = html.match(re);
  return m ? (m[1] || "").trim() : "";
}

function parseMeta(html) {
  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i).replace(/\s+/g, " ").trim();
  const description =
    firstMatch(html, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    firstMatch(html, /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const canonical =
    firstMatch(html, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
    firstMatch(html, /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripHtml(m[1]).slice(0, 200));
  const h2 = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => stripHtml(m[1]).slice(0, 200)).slice(0, 20);
  const body = stripHtml(html);
  const words = body ? body.split(/\s+/).filter(Boolean).length : 0;
  return { title, description, canonical, h1, h2, body, words };
}

function strategyPrompt(domain) {
  return `You are a senior SEO + AEO strategist reviewing a crawled content pack for ${domain}.

Use ONLY the page dumps and signals in this file as evidence of what is on the site. You may use general SEO knowledge for recommendations, but do not invent on-page copy that is not present.

Deliver:

1. **Money page map** — Which URLs own commercial vs educational intent? Any cannibalization?
2. **Top 15 fixes** — Ranked by revenue / ranking impact. Be specific (URL + action).
3. **Thin / duplicate / weak pages** — Call out with evidence (word count, titles, overlapping H1s).
4. **Internal linking plan** — From supporting pages → owner money pages (max 20 links).
5. **AEO / AI visibility gaps** — Answer blocks, FAQs, entity clarity, proof/case studies, citation-worthiness.
6. **What NOT to do** — Pages or content that would dilute focus.
7. **30-day action plan** — Week-by-week, realistic for a small team.

Format with clear headings and bullet points. Prefer surgical changes over "write 50 new blogs".`;
}

async function main() {
  const base = SEED.replace(/\/$/, "");
  const origin = new URL(base.startsWith("http") ? base : `https://${base}`).origin;
  const domain = new URL(origin).hostname.replace(/^www\./, "");

  console.log(`Building AI content pack for ${origin} (max ${MAX_PAGES} pages)…`);

  const robots = await fetchText(`${origin}/robots.txt`);
  const llms = await fetchText(`${origin}/llms.txt`);

  const paths = PRIORITY_PATHS.slice(0, MAX_PAGES);
  const pages = [];
  for (const path of paths) {
    const url = `${origin}${path === "/" ? "" : path}`;
    process.stdout.write(`  fetch ${path} … `);
    const res = await fetchText(url);
    if (!res.ok || !res.text) {
      console.log(`fail (${res.status})`);
      continue;
    }
    const meta = parseMeta(res.text);
    pages.push({ url: res.finalUrl || url, path, ...meta });
    console.log(`ok (${meta.words} words)`);
  }

  const stamp = new Date().toISOString();
  const lines = [];
  lines.push(`# AI SEO Content Pack — ${domain}`);
  lines.push("");
  lines.push(`Generated: ${stamp}`);
  lines.push(`Seed: ${origin}`);
  lines.push(`Pages in pack: ${pages.length}`);
  lines.push(`Method: Priority URL fetch (Screaming Frog → TXT → Claude style, zero LLM cost)`);
  lines.push("");
  lines.push("## How to use");
  lines.push("");
  lines.push("1. Open this file in Claude (or ChatGPT).");
  lines.push("2. Run the strategy prompt at the bottom.");
  lines.push("3. Cross-check recommendations against docs/keyword-ownership.md if present.");
  lines.push("");
  lines.push("## Site signals");
  lines.push("");
  lines.push(`- robots.txt: ${robots.ok ? "yes" : "no"} (${robots.status})`);
  lines.push(`- llms.txt: ${llms.ok ? "yes" : "no"} (${llms.status})`);
  if (llms.ok && llms.text) {
    lines.push("");
    lines.push("### llms.txt (truncated)");
    lines.push("```");
    lines.push(llms.text.slice(0, 4000));
    lines.push("```");
  }
  lines.push("");
  lines.push("## Page inventory");
  lines.push("");
  pages.forEach((p, i) => {
    lines.push(`${i + 1}. ${p.path} — "${p.title || "(no title)"}" — ${p.words} words — H1: ${p.h1.join(" | ") || "(none)"}`);
  });
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Page content dumps");
  lines.push("");

  for (const p of pages) {
    const body = p.body.length > 12000 ? `${p.body.slice(0, 12000)}\n\n[…truncated at 12000 chars]` : p.body;
    lines.push(`### PAGE: ${p.url}`);
    lines.push("");
    lines.push(`- Path: ${p.path}`);
    lines.push(`- Title: ${p.title || "(missing)"}`);
    lines.push(`- Meta description: ${p.description || "(missing)"}`);
    lines.push(`- Canonical: ${p.canonical || "(none)"}`);
    lines.push(`- Word count: ${p.words}`);
    lines.push(`- H1: ${p.h1.join(" | ") || "(none)"}`);
    lines.push(`- H2: ${p.h2.join(" | ") || "(none)"}`);
    lines.push("");
    lines.push("#### Body text");
    lines.push("");
    lines.push(body || "(empty)");
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  lines.push("## Strategy prompt (copy with this pack)");
  lines.push("");
  lines.push("```");
  lines.push(strategyPrompt(domain));
  lines.push("```");
  lines.push("");
  lines.push("## End of content pack");
  lines.push("");

  const outDir = join(root, "docs", "ai-content-packs");
  await mkdir(outDir, { recursive: true });
  const date = stamp.slice(0, 10);
  const outFile = join(outDir, `${domain}-ai-content-pack-${date}.md`);
  await writeFile(outFile, lines.join("\n"), "utf8");
  console.log(`\nWrote ${outFile} (${pages.length} pages)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
