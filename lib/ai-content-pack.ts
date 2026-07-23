/**
 * Build a Claude/ChatGPT-ready content pack from a site crawl.
 * Zero LLM cost — export only. Mirrors the Screaming Frog → TXT → Claude workflow.
 */

import type { CrawledPage, RichCrawl } from "./seo-spider";

export type ContentPackOptions = {
  /** Max pages to include in the pack (highest-value first). Default 40. */
  maxPages?: number;
  /** Max characters of body text per page. Default 12000. */
  maxCharsPerPage?: number;
  /** Optional brand context line for the strategy prompt header. */
  brandHint?: string;
};

const MONEY_PATH_RE =
  /^\/$|\/(pricing|how-it-works|results|who-its-for|faq|about|partners|what-is-aeo|get-cited-by-chatgpt|ai-visibility|seo-agency|best-|seo-for-|tools|locations|industries|blog)(\/|$)/i;

export function buildAiContentPack(crawl: RichCrawl, options: ContentPackOptions = {}): string {
  const maxPages = Math.max(5, Math.min(options.maxPages ?? 40, 80));
  const maxChars = Math.max(2000, Math.min(options.maxCharsPerPage ?? 12000, 30000));
  const brandHint = options.brandHint || crawl.domain;

  const htmlPages = crawl.pages.filter(
    (page) => page.response.ok && page.parsed.wordCount > 0 && isHtmlPage(page),
  );

  const ranked = [...htmlPages].sort((a, b) => pagePriority(b) - pagePriority(a)).slice(0, maxPages);

  const lines: string[] = [];
  lines.push(`# AI SEO Content Pack — ${crawl.domain}`);
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Seed: ${crawl.seedUrl}`);
  lines.push(`Pages in pack: ${ranked.length} (from ${htmlPages.length} HTML pages crawled)`);
  lines.push(`Crawl stats: ${crawl.spider.stats.crawled} crawled · health context from site audit if attached separately`);
  lines.push("");
  lines.push("## How to use (Chris Long / Nectiv-style workflow)");
  lines.push("");
  lines.push("1. Paste this entire file into Claude (or ChatGPT / Gemini).");
  lines.push("2. Use the strategy prompt at the bottom.");
  lines.push("3. Do not invent page content — only use what is in this pack + your knowledge of SEO.");
  lines.push("4. Free tools should not call paid APIs; this export is offline context only.");
  lines.push("");
  lines.push("## Site signals");
  lines.push("");
  lines.push(`- robots.txt fetched: ${crawl.robots.ok ? "yes" : "no"} (status ${crawl.robots.status})`);
  lines.push(`- llms.txt fetched: ${crawl.llms.ok ? "yes" : "no"} (status ${crawl.llms.status})`);
  lines.push(`- Sitemap URLs discovered: ${crawl.sitemapUrls.length}`);
  if (crawl.llms.ok && crawl.llms.text) {
    lines.push("");
    lines.push("### llms.txt (truncated)");
    lines.push("```");
    lines.push(crawl.llms.text.slice(0, 4000));
    lines.push("```");
  }
  lines.push("");
  lines.push("## Page inventory (priority order)");
  lines.push("");
  ranked.forEach((page, index) => {
    const path = safePath(page.url);
    lines.push(
      `${index + 1}. ${path} — "${page.parsed.title || "(no title)"}" — ${page.parsed.wordCount} words — H1: ${
        page.parsed.headings
          .filter((h) => h.level === 1)
          .map((h) => h.text)
          .join(" | ") || "(none)"
      }`,
    );
  });
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Page content dumps");
  lines.push("");

  for (const page of ranked) {
    const path = safePath(page.url);
    const h1s = page.parsed.headings.filter((h) => h.level === 1).map((h) => h.text);
    const h2s = page.parsed.headings.filter((h) => h.level === 2).map((h) => h.text).slice(0, 20);
    const body = extractBodyText(page, maxChars);

    lines.push(`### PAGE: ${page.url}`);
    lines.push("");
    lines.push(`- Path: ${path}`);
    lines.push(`- Title: ${page.parsed.title || "(missing)"}`);
    lines.push(`- Meta description: ${page.parsed.description || "(missing)"}`);
    lines.push(`- Canonical: ${page.parsed.canonical || "(none)"}`);
    lines.push(`- Word count: ${page.parsed.wordCount}`);
    lines.push(`- H1: ${h1s.join(" | ") || "(none)"}`);
    lines.push(`- H2: ${h2s.join(" | ") || "(none)"}`);
    lines.push(`- Schema types: ${page.parsed.schemaTypes.join(", ") || "(none detected)"}`);
    lines.push(`- noindex: ${page.parsed.hasNoindex ? "yes" : "no"}`);
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
  lines.push(defaultStrategyPrompt(brandHint, crawl.domain));
  lines.push("```");
  lines.push("");
  lines.push("## End of content pack");
  lines.push("");

  return lines.join("\n");
}

export function defaultStrategyPrompt(brandHint: string, domain: string): string {
  return `You are a senior SEO + AEO strategist reviewing a crawled content pack for ${brandHint} (${domain}).

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

function isHtmlPage(page: CrawledPage): boolean {
  return (
    /text\/html|application\/xhtml/i.test(page.response.contentType) ||
    (!page.response.contentType && Boolean(page.response.text))
  );
}

function safePath(url: string): string {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url;
  }
}

function pagePriority(page: CrawledPage): number {
  const path = safePath(page.url);
  let score = 0;
  if (path === "/") score += 100;
  if (MONEY_PATH_RE.test(path)) score += 40;
  if (path.includes("/results")) score += 15;
  if (path.includes("/pricing")) score += 20;
  if (path.includes("/tools")) score += 12;
  if (path.includes("/blog")) score += 5;
  // Prefer substantial pages slightly
  score += Math.min(page.parsed.wordCount / 100, 15);
  // Prefer shallower... we don't have depth on CrawledPage; title presence helps
  if (page.parsed.title) score += 2;
  if (page.parsed.headings.some((h) => h.level === 1)) score += 2;
  return score;
}

function extractBodyText(page: CrawledPage, maxChars: number): string {
  const fromHtml = page.response.text ? stripHtml(page.response.text) : "";
  const text = fromHtml || page.parsed.textSample || "";
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n\n[…truncated at ${maxChars} chars]`;
}

function stripHtml(html: string): string {
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

export function contentPackFilename(domain: string): string {
  const safe = domain.replace(/[^a-z0-9.-]+/gi, "-").toLowerCase();
  const stamp = new Date().toISOString().slice(0, 10);
  return `${safe}-ai-content-pack-${stamp}.md`;
}
