// llms.txt generator: builds an llms.txt for any site from its sitemap (or a
// shallow crawl fallback), pulling each page's title + meta description.
// Deterministic, server-side, no LLM calls. Mirrors the AEO Score tool's stack.

export type LlmsResult = {
  url: string;
  domain: string;
  siteName: string;
  pageCount: number;
  source: "sitemap" | "crawl";
  llmsTxt: string;
};

const UA = "Mozilla/5.0 (compatible; rankdayLLMSBot/1.0; +https://www.rank-day.com/tools/llms-txt)";
const TIMEOUT_MS = 12000;
const MAX_PAGES = 40; // keep the llms.txt curated, not a dump
const CRAWL_FETCH_CONCURRENCY = 6;

export function normalizeUrl(input: string): URL | null {
  let s = (input || "").trim();
  if (!s) return null;
  if (!/^https?:\/\//i.test(s)) s = "https://" + s;
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:" ? u : null;
  } catch {
    return null;
  }
}

async function fetchText(url: string): Promise<{ ok: boolean; status: number; text: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "user-agent": UA, accept: "text/html,application/xml,*/*" },
    });
    return { ok: res.ok, status: res.status, text: res.ok ? await res.text() : "" };
  } catch {
    return { ok: false, status: 0, text: "" };
  } finally {
    clearTimeout(timer);
  }
}

function firstMatch(html: string, re: RegExp): string | null {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ").trim();
}

function getTitle(html: string): string {
  const t = firstMatch(html, /<title[^>]*>([^<]*)<\/title>/i);
  if (t) return decode(t);
  const h1 = firstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return h1 ? decode(h1.replace(/<[^>]+>/g, " ")) : "";
}

function getDescription(html: string): string {
  const m =
    firstMatch(html, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    firstMatch(html, /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
  return m ? decode(m) : "";
}

// Strip a trailing " | Brand" / " - Brand" from a page title for cleaner link text.
function cleanTitle(title: string, siteName: string): string {
  let t = title;
  for (const sep of [" | ", " - ", " :: ", " · "]) {
    if (t.includes(sep)) t = t.split(sep)[0].trim();
  }
  if (siteName && t.toLowerCase() === siteName.toLowerCase()) return t;
  return t || title;
}

function deriveSiteName(homeHtml: string, domain: string): string {
  const og = firstMatch(homeHtml, /<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']*)["']/i);
  if (og) return decode(og);
  const title = getTitle(homeHtml);
  if (title) {
    for (const sep of [" | ", " - ", " :: ", " · "]) {
      if (title.includes(sep)) {
        const parts = title.split(sep);
        // brand is usually the shorter trailing part
        const last = parts[parts.length - 1].trim();
        if (last.length && last.length <= 40) return last;
      }
    }
    return title.length <= 40 ? title : domain;
  }
  return domain;
}

// --- page discovery ---

async function fromSitemap(origin: string): Promise<string[]> {
  const candidates = [`${origin}/sitemap.xml`, `${origin}/sitemap_index.xml`, `${origin}/sitemap-index.xml`];
  for (const sm of candidates) {
    const res = await fetchText(sm);
    if (!res.ok || !res.text.includes("<loc>")) continue;
    const locs = [...res.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    // sitemap index -> child sitemaps end in .xml; fetch a few and collect their locs
    const childSitemaps = locs.filter((u) => /\.xml(\?|$)/i.test(u));
    if (childSitemaps.length && res.text.includes("<sitemapindex")) {
      const urls: string[] = [];
      for (const child of childSitemaps.slice(0, 5)) {
        const c = await fetchText(child);
        if (c.ok) urls.push(...[...c.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()));
        if (urls.length >= MAX_PAGES * 2) break;
      }
      if (urls.length) return urls;
    }
    return locs;
  }
  return [];
}

async function fromCrawl(home: URL, homeHtml: string): Promise<string[]> {
  const urls = new Set<string>([home.href]);
  const hrefs = [...homeHtml.matchAll(/<a[^>]*href=["']([^"'#]+)["']/gi)].map((m) => m[1]);
  for (const href of hrefs) {
    try {
      const u = new URL(href, home.href);
      if (u.hostname.replace(/^www\./, "") === home.hostname.replace(/^www\./, "") && /^https?:$/.test(u.protocol)) {
        u.hash = "";
        urls.add(u.href);
      }
    } catch {
      /* skip */
    }
    if (urls.size >= MAX_PAGES) break;
  }
  return [...urls];
}

// --- grouping ---

function sectionFor(u: URL, home: URL): string {
  const path = u.pathname.replace(/\/+$/, "");
  if (path === "" || path === "/" || u.href === home.href) return "Core pages";
  const seg = path.split("/").filter(Boolean)[0] || "";
  const map: Record<string, string> = {
    blog: "Blog", news: "Blog", articles: "Blog", insights: "Blog",
    docs: "Documentation", documentation: "Documentation", guide: "Documentation", guides: "Documentation",
    product: "Products", products: "Products", features: "Products", pricing: "Core pages",
    about: "Core pages", contact: "Core pages", services: "Core pages",
  };
  if (map[seg]) return map[seg];
  // single-segment paths are core-ish; deeper paths get grouped by their first segment
  const depth = path.split("/").filter(Boolean).length;
  if (depth <= 1) return "Core pages";
  return seg.charAt(0).toUpperCase() + seg.slice(1).replace(/[-_]/g, " ");
}

export async function generateLlmsTxt(input: string): Promise<LlmsResult | { error: string }> {
  const u = normalizeUrl(input);
  if (!u) return { error: "That doesn't look like a valid URL. Try example.com." };

  const home = await fetchText(u.href);
  if (!home.ok || !home.text) {
    return { error: `Couldn't reach ${u.hostname} (status ${home.status || "no response"}).` };
  }
  const domain = u.hostname.replace(/^www\./, "");
  const siteName = deriveSiteName(home.text, domain);
  const siteSummary = getDescription(home.text) || getTitle(home.text) || `${siteName} website.`;

  let pageUrls = await fromSitemap(u.origin);
  let source: "sitemap" | "crawl" = "sitemap";
  if (pageUrls.length === 0) {
    pageUrls = await fromCrawl(u, home.text);
    source = "crawl";
  }

  // dedupe, keep http(s), cap
  const seen = new Set<string>();
  const picked: URL[] = [];
  for (const raw of pageUrls) {
    const pu = normalizeUrl(raw);
    if (!pu) continue;
    const key = pu.href.replace(/\/$/, "");
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(pu);
    if (picked.length >= MAX_PAGES) break;
  }
  if (picked.length === 0) picked.push(u);

  // fetch titles/descriptions with concurrency
  type Page = { url: URL; title: string; desc: string };
  const pages: Page[] = [];
  let idx = 0;
  async function worker() {
    while (idx < picked.length) {
      const pu = picked[idx++];
      const r = await fetchText(pu.href);
      if (!r.ok) continue;
      const title = cleanTitle(getTitle(r.text), siteName);
      if (!title) continue;
      pages.push({ url: pu, title, desc: getDescription(r.text) });
    }
  }
  await Promise.all(Array.from({ length: CRAWL_FETCH_CONCURRENCY }, worker));

  // group
  const groups = new Map<string, Page[]>();
  for (const p of pages) {
    const sec = sectionFor(p.url, u);
    if (!groups.has(sec)) groups.set(sec, []);
    groups.get(sec)!.push(p);
  }

  // order sections: Core pages first, Blog/Docs/Products next, then the rest, "Optional" last
  const order = ["Core pages", "Products", "Documentation", "Blog"];
  const sectionNames = [...groups.keys()].sort((a, b) => {
    const ia = order.indexOf(a), ib = order.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  });

  const lines: string[] = [];
  lines.push(`# ${siteName}`, "");
  lines.push(`> ${siteSummary}`, "");
  for (const sec of sectionNames) {
    lines.push(`## ${sec}`, "");
    for (const p of groups.get(sec)!) {
      const desc = p.desc ? `: ${p.desc}` : "";
      lines.push(`- [${p.title}](${p.url.href})${desc}`);
    }
    lines.push("");
  }
  const llmsTxt = lines.join("\n").trim() + "\n";

  return { url: u.href, domain, siteName, pageCount: pages.length, source, llmsTxt };
}
