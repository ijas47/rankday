// SEO Spider — a Screaming Frog-style site crawler.
// Crawls a site by following internal links (BFS), records a per-URL data grid,
// and surfaces site-wide issues (broken links, duplicate/missing titles, redirects,
// canonical problems, crawl depth, orphan pages). Returns structured JSON that the
// client renders as an interactive HTML report. No external dependencies.

export type SpiderSeverity = "critical" | "high" | "medium" | "low";

export type CrawledUrl = {
  url: string;
  status: number;
  statusText: string;
  contentType: string;
  isHtml: boolean;
  indexable: boolean;
  indexabilityReason: string;
  title: string;
  titleLength: number;
  titleCount: number;
  metaDescription: string;
  descLength: number;
  h1: string[];
  h2: string[];
  wordCount: number;
  canonical: string;
  redirectTo: string;
  responseTimeMs: number;
  sizeBytes: number;
  inlinks: number;
  outlinks: number;
  images: number;
  imagesMissingAlt: number;
  hasViewport: boolean;
  schemaTypes: string[];
  depth: number;
  inSitemap: boolean;
};

export type IssueGroup = {
  id: string;
  category: string;
  label: string;
  severity: SpiderSeverity;
  detail: string;
  fix: string;
  count: number;
  urls: string[];
};

export type SpiderReport = {
  url: string;
  domain: string;
  generatedAt: string;
  health: number;
  rating: "Excellent" | "Good" | "Fair" | "Needs work" | "Critical";
  stats: {
    crawled: number;
    notCrawled: number;
    indexable: number;
    nonIndexable: number;
    internalLinks: number;
    responseCodes: { "2xx": number; "3xx": number; "4xx": number; "5xx": number; other: number };
    avgResponseMs: number;
    depthDistribution: { depth: number; count: number }[];
    crawlComplete: boolean;
    durationMs: number;
  };
  issues: IssueGroup[];
  urls: CrawledUrl[];
};

const UA = "Mozilla/5.0 (compatible; rankdaySeoSpider/1.0; +https://www.rank-day.com/tools/seo-spider)";
const TIMEOUT_MS = 12000;
const CONCURRENCY = 5;
const BUDGET_MS = 50000;
const SEVERITY_PENALTY: Record<SpiderSeverity, number> = { critical: 20, high: 12, medium: 6, low: 2 };
const ASSET_RE = /\.(jpg|jpeg|png|gif|webp|avif|svg|ico|pdf|zip|rar|gz|mp4|mov|webm|mp3|wav|woff2?|ttf|eot|css|js|json|xml|rss|txt)(\?|$)/i;
const PRIVATE_RE = /\/(cdn-cgi|_next|api|cart|checkout|account|login|sign-in|signup|admin|wp-admin|wp-login)\b/i;

type FetchResult = {
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  finalUrl: string;
  location: string;
  contentType: string;
  headers: Record<string, string>;
  text: string;
  responseTimeMs: number;
  sizeBytes: number;
};

type ParsedPage = {
  title: string;
  titleCount: number;
  description: string;
  descriptionCount: number;
  canonical: string;
  h1: string[];
  h2: string[];
  links: string[];
  images: { src: string; alt: string }[];
  schemaTypes: string[];
  wordCount: number;
  hasViewport: boolean;
  hasNoindex: boolean;
  hasNofollow: boolean;
};

export async function crawlSite(input: string, maxPages = 75): Promise<SpiderReport | { error: string }> {
  const started = Date.now();
  const normalized = normalizeUrl(input);
  if (!normalized) return { error: "Enter a valid website URL, like rank-day.com." };

  const seed = await doFetch(normalized.href, true);
  if (seed.status === 0 || (!seed.ok && !(seed.status >= 300 && seed.status < 400))) {
    return { error: `Couldn't reach ${normalized.hostname} (status ${seed.status || "no response"}).` };
  }

  const origin = new URL(seed.finalUrl || normalized.href).origin;
  const seedUrl = seed.finalUrl || normalized.href;

  // Discover sitemap URLs so sitemap-only / orphan pages are reachable and detectable.
  const robots = await doFetch(`${origin}/robots.txt`, true);
  const sitemapUrls = await discoverSitemapUrls(origin, robots.text);
  const sitemapSet = new Set(sitemapUrls.map(stripHash));

  const cap = Math.max(10, Math.min(maxPages, 150));
  const deadline = started + BUDGET_MS;

  const visited = new Set<string>();
  const queued = new Set<string>();
  const inlinks = new Map<string, number>();
  const records: CrawledUrl[] = [];

  const frontier: { url: string; depth: number }[] = [];
  const enqueue = (url: string, depth: number) => {
    const clean = stripHash(url);
    if (!clean || queued.has(clean) || !isCrawlable(clean, origin)) return;
    queued.add(clean);
    frontier.push({ url: clean, depth });
  };

  enqueue(seedUrl, 0);
  // Seed sitemap URLs at depth 1 so they get crawled even if not internally linked.
  for (const url of sitemapUrls) enqueue(url, 1);

  while (frontier.length && visited.size < cap && Date.now() < deadline) {
    const batch: { url: string; depth: number }[] = [];
    while (frontier.length && batch.length < CONCURRENCY && visited.size + batch.length < cap) {
      const item = frontier.shift()!;
      if (visited.has(item.url)) continue;
      visited.add(item.url);
      batch.push(item);
    }
    if (!batch.length) break;

    const fetched = await Promise.all(
      batch.map(async ({ url, depth }) => ({ url, depth, res: url === seedUrl ? seed : await doFetch(url, false) })),
    );

    for (const { url, depth, res } of fetched) {
      const isHtml = /text\/html|application\/xhtml/i.test(res.contentType) || (!res.contentType && Boolean(res.text));
      const parsed = isHtml && res.text ? parseHtml(res.text, res.finalUrl || url) : emptyParsed();

      const internalTargets: string[] = [];
      // 3xx: the redirect destination is an internal target.
      if (res.status >= 300 && res.status < 400 && res.location && sameOrigin(res.location, origin)) {
        internalTargets.push(res.location);
      }
      for (const link of parsed.links) {
        if (sameOrigin(link, origin) && !ASSET_RE.test(link)) internalTargets.push(link);
      }
      for (const target of uniqueUrls(internalTargets, 2000)) {
        const clean = stripHash(target);
        inlinks.set(clean, (inlinks.get(clean) || 0) + 1);
        enqueue(clean, depth + 1);
      }

      const canonical = parsed.canonical;
      const { indexable, reason } = indexability(res, parsed, url, canonical);
      records.push({
        url,
        status: res.status,
        statusText: res.statusText,
        contentType: res.contentType,
        isHtml,
        indexable,
        indexabilityReason: reason,
        title: parsed.title,
        titleLength: parsed.title.length,
        titleCount: parsed.titleCount,
        metaDescription: parsed.description,
        descLength: parsed.description.length,
        h1: parsed.h1,
        h2: parsed.h2,
        wordCount: parsed.wordCount,
        canonical,
        redirectTo: res.status >= 300 && res.status < 400 ? res.location : "",
        responseTimeMs: res.responseTimeMs,
        sizeBytes: res.sizeBytes,
        inlinks: 0,
        outlinks: parsed.links.filter((link) => sameOrigin(link, origin)).length,
        images: parsed.images.length,
        imagesMissingAlt: parsed.images.filter((image) => image.src && !image.alt.trim()).length,
        hasViewport: parsed.hasViewport,
        schemaTypes: parsed.schemaTypes,
        depth,
        inSitemap: sitemapSet.has(url),
      });
    }
  }

  // Fold accumulated inlink counts back onto each record.
  for (const record of records) record.inlinks = inlinks.get(record.url) || 0;
  records.sort((a, b) => a.depth - b.depth || a.url.localeCompare(b.url));

  const crawlComplete = frontier.length === 0;
  const notCrawled = Math.max(0, queued.size - records.length);
  const issues = buildIssues(records, origin);
  const health = clamp(100 - issues.reduce((sum, issue) => sum + SEVERITY_PENALTY[issue.severity], 0));

  return {
    url: seedUrl,
    domain: normalized.hostname.replace(/^www\./, ""),
    generatedAt: new Date().toISOString(),
    health,
    rating: ratingFor(health),
    stats: {
      crawled: records.length,
      notCrawled,
      indexable: records.filter((r) => r.indexable).length,
      nonIndexable: records.filter((r) => !r.indexable).length,
      internalLinks: [...inlinks.values()].reduce((sum, n) => sum + n, 0),
      responseCodes: responseCodeBuckets(records),
      avgResponseMs: records.length
        ? Math.round(records.reduce((sum, r) => sum + r.responseTimeMs, 0) / records.length)
        : 0,
      depthDistribution: depthDistribution(records),
      crawlComplete,
      durationMs: Date.now() - started,
    },
    issues,
    urls: records,
  };
}

// ---------------------------------------------------------------------------
// Issue analysis (Screaming Frog-style site-wide tabs).
// ---------------------------------------------------------------------------

function buildIssues(records: CrawledUrl[], origin: string): IssueGroup[] {
  const issues: IssueGroup[] = [];
  const add = (
    id: string,
    category: string,
    label: string,
    severity: SpiderSeverity,
    detail: string,
    fix: string,
    urls: string[],
  ) => {
    const list = uniqueList(urls);
    if (list.length) issues.push({ id, category, label, severity, detail, fix, count: list.length, urls: list.slice(0, 500) });
  };

  // Content pages = 2xx HTML, used for on-page checks so non-200 noise is excluded.
  const content = records.filter((r) => r.status >= 200 && r.status < 300 && r.isHtml);

  // --- Response codes ---
  add(
    "client-errors",
    "Response Codes",
    "Client errors (4xx)",
    "critical",
    "Internal links resolve to pages that no longer exist or are forbidden.",
    "Fix or remove the broken links, or restore/redirect the missing URLs.",
    records.filter((r) => r.status >= 400 && r.status < 500).map((r) => r.url),
  );
  add(
    "server-errors",
    "Response Codes",
    "Server errors (5xx)",
    "critical",
    "Pages returned a server error during the crawl.",
    "Investigate server logs and fix the failing pages; recrawl once stable.",
    records.filter((r) => r.status >= 500).map((r) => r.url),
  );
  add(
    "redirects",
    "Response Codes",
    "Redirects (3xx)",
    "medium",
    "Internal links point at URLs that redirect, wasting crawl budget and link equity.",
    "Update internal links to point directly at the final destination URL.",
    records.filter((r) => r.status >= 300 && r.status < 400).map((r) => r.url),
  );
  add(
    "no-response",
    "Response Codes",
    "No response",
    "high",
    "URLs timed out or failed to connect during the crawl.",
    "Check availability, DNS, firewall, or bot-blocking rules for these URLs.",
    records.filter((r) => r.status === 0).map((r) => r.url),
  );

  // --- Page titles ---
  add(
    "title-missing",
    "Page Titles",
    "Missing title",
    "high",
    "Indexable pages have no <title>, hurting rankings and click-through.",
    "Add a unique, descriptive title tag (~50-60 characters) to every page.",
    content.filter((r) => !r.title.trim()).map((r) => r.url),
  );
  add(
    "title-duplicate",
    "Page Titles",
    "Duplicate titles",
    "high",
    "Multiple pages share the same title, confusing search engines about which to rank.",
    "Write a distinct title for each page that reflects its unique content.",
    duplicateGroupUrls(content, (r) => r.title),
  );
  add(
    "title-long",
    "Page Titles",
    "Title over 60 characters",
    "low",
    "Long titles get truncated in search results.",
    "Trim titles to roughly 60 characters so they display in full.",
    content.filter((r) => r.title.trim() && r.titleLength > 60).map((r) => r.url),
  );
  add(
    "title-short",
    "Page Titles",
    "Title under 30 characters",
    "low",
    "Very short titles often miss keyword and context opportunities.",
    "Expand thin titles with relevant, specific descriptors.",
    content.filter((r) => r.title.trim() && r.titleLength < 30).map((r) => r.url),
  );
  add(
    "title-multiple",
    "Page Titles",
    "Multiple title tags",
    "medium",
    "Pages contain more than one <title> element.",
    "Keep exactly one title tag per page; remove the duplicates.",
    content.filter((r) => r.titleCount > 1).map((r) => r.url),
  );

  // --- Meta descriptions ---
  add(
    "desc-missing",
    "Meta Description",
    "Missing meta description",
    "medium",
    "Pages lack a meta description, so search engines auto-generate the snippet.",
    "Write a compelling 70-160 character description for each indexable page.",
    content.filter((r) => !r.metaDescription.trim()).map((r) => r.url),
  );
  add(
    "desc-duplicate",
    "Meta Description",
    "Duplicate meta descriptions",
    "low",
    "Several pages reuse the same meta description.",
    "Give each page a unique description that matches its content.",
    duplicateGroupUrls(content.filter((r) => r.metaDescription.trim()), (r) => r.metaDescription),
  );
  add(
    "desc-long",
    "Meta Description",
    "Meta description over 160 characters",
    "low",
    "Long descriptions get truncated in search results.",
    "Trim descriptions to roughly 155 characters.",
    content.filter((r) => r.descLength > 160).map((r) => r.url),
  );

  // --- Headings ---
  add(
    "h1-missing",
    "Headings",
    "Missing H1",
    "high",
    "Indexable pages have no H1, weakening on-page topical signals.",
    "Add a single, descriptive H1 that states what the page is about.",
    content.filter((r) => r.h1.length === 0).map((r) => r.url),
  );
  add(
    "h1-multiple",
    "Headings",
    "Multiple H1",
    "low",
    "Pages use more than one H1, diluting heading hierarchy.",
    "Use one H1 per page and demote the rest to H2/H3.",
    content.filter((r) => r.h1.length > 1).map((r) => r.url),
  );
  add(
    "h1-duplicate",
    "Headings",
    "Duplicate H1",
    "low",
    "Different pages share the same H1 text.",
    "Make each H1 unique to the page's topic.",
    duplicateGroupUrls(content.filter((r) => r.h1.length === 1), (r) => r.h1[0] || ""),
  );

  // --- Canonicals & directives ---
  add(
    "canonical-missing",
    "Canonicals",
    "Missing canonical",
    "medium",
    "Indexable pages have no canonical tag, raising duplicate-content risk.",
    "Add a self-referencing canonical to each unique page.",
    content.filter((r) => !r.canonical).map((r) => r.url),
  );
  add(
    "canonicalised",
    "Canonicals",
    "Canonicalised to another URL",
    "low",
    "Pages canonicalise to a different URL, so they will not be indexed on their own.",
    "Confirm this consolidation is intentional; otherwise self-canonicalise.",
    content.filter((r) => r.canonical && stripHash(r.canonical) !== r.url).map((r) => r.url),
  );
  add(
    "canonical-offsite",
    "Canonicals",
    "Canonical points off-domain",
    "high",
    "Canonicals point to a different domain, handing indexing signals away.",
    "Use cross-domain canonicals only for intentional content syndication.",
    content.filter((r) => r.canonical && !sameOrigin(r.canonical, origin)).map((r) => r.url),
  );
  add(
    "noindex",
    "Directives",
    "Noindex",
    "high",
    "Pages carry a noindex directive and will be dropped from search.",
    "Remove noindex from any page that should rank.",
    records.filter((r) => r.indexabilityReason === "Noindex").map((r) => r.url),
  );

  // --- Images & content ---
  add(
    "img-alt",
    "Images",
    "Images missing alt text",
    "low",
    "Pages contain images without alt text, hurting accessibility and image SEO.",
    "Add descriptive alt text to meaningful images.",
    content.filter((r) => r.imagesMissingAlt > 0).map((r) => r.url),
  );
  add(
    "thin-content",
    "Content",
    "Thin content (under 200 words)",
    "medium",
    "Indexable pages have very little body text to rank or be cited for.",
    "Expand thin pages with useful, specific, self-contained content.",
    content.filter((r) => r.wordCount > 0 && r.wordCount < 200).map((r) => r.url),
  );

  // --- Crawl structure ---
  add(
    "deep-pages",
    "Crawl Depth",
    "Deep pages (depth 4+)",
    "low",
    "Pages sit four or more clicks from the start URL, so they get crawled less often.",
    "Surface important deep pages with closer internal links from hub pages.",
    records.filter((r) => r.depth >= 4).map((r) => r.url),
  );
  add(
    "orphan",
    "Crawl Depth",
    "Orphan pages",
    "medium",
    "Pages appear in the sitemap but have no internal links pointing to them.",
    "Add internal links from relevant pages so these are discoverable and pass equity.",
    records.filter((r) => r.inSitemap && r.inlinks === 0 && r.depth > 0).map((r) => r.url),
  );

  const rank: Record<SpiderSeverity, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  return issues.sort((a, b) => rank[a.severity] - rank[b.severity] || b.count - a.count);
}

// ---------------------------------------------------------------------------
// Fetching & parsing.
// ---------------------------------------------------------------------------

async function doFetch(url: string, follow: boolean): Promise<FetchResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const start = Date.now();
  try {
    const response = await fetch(url, {
      redirect: follow ? "follow" : "manual",
      signal: controller.signal,
      headers: {
        "user-agent": UA,
        accept: "text/html,application/xhtml+xml,application/xml,text/xml,text/plain;q=0.9,*/*;q=0.7",
      },
    });
    const headers = Object.fromEntries(response.headers.entries());
    const contentType = headers["content-type"] || "";
    const status = response.status;
    const isRedirect = status >= 300 && status < 400;
    const isHtml = /text\/html|application\/xhtml|xml/i.test(contentType);
    let text = "";
    if (!isRedirect && isHtml) {
      text = await response.text();
    } else {
      try {
        await response.arrayBuffer();
      } catch {
        // Body not needed for redirects / binary assets.
      }
    }
    const sizeBytes = text ? Buffer.byteLength(text) : Number(headers["content-length"]) || 0;
    return {
      ok: response.ok,
      status,
      statusText: response.statusText || statusLabel(status),
      url,
      finalUrl: response.url || url,
      location: headers["location"] ? absolutize(headers["location"], url) : "",
      contentType,
      headers,
      text,
      responseTimeMs: Date.now() - start,
      sizeBytes,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      statusText: "No response",
      url,
      finalUrl: url,
      location: "",
      contentType: "",
      headers: {},
      text: "",
      responseTimeMs: Date.now() - start,
      sizeBytes: 0,
    };
  } finally {
    clearTimeout(timer);
  }
}

function parseHtml(html: string, pageUrl: string): ParsedPage {
  const titleMatches = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)];
  const title = decode(titleMatches[0]?.[1] || "");
  const descMatches = [...html.matchAll(/<meta[^>]*name=["']description["'][^>]*>/gi)];
  const description = decode(
    firstMatch(html, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      firstMatch(html, /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i) ||
      "",
  );
  const canonical = absolutize(
    firstMatch(html, /<link[^>]+rel=["'][^"']*canonical[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/i) ||
      firstMatch(html, /<link[^>]+href=["']([^"']+)["'][^>]*rel=["'][^"']*canonical[^"']*["'][^>]*>/i) ||
      "",
    pageUrl,
  );
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => htmlToText(m[1]).slice(0, 200)).filter(Boolean);
  const h2 = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => htmlToText(m[1]).slice(0, 200)).filter(Boolean);
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)]
    .map((m) => absolutize(decode(m[1]), pageUrl))
    .filter(Boolean);
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => ({
    src: attr(m[0], "src") || attr(m[0], "data-src"),
    alt: attr(m[0], "alt"),
  }));
  const text = htmlToText(html);
  const robotsContent = firstMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i).toLowerCase();
  return {
    title,
    titleCount: titleMatches.length,
    description,
    descriptionCount: descMatches.length,
    canonical,
    h1,
    h2,
    links,
    images,
    schemaTypes: collectSchemaTypes(html),
    wordCount: text ? text.split(/\s+/).filter(Boolean).length : 0,
    hasViewport: /<meta[^>]+name=["']viewport["']/i.test(html),
    hasNoindex: /noindex/.test(robotsContent),
    hasNofollow: /nofollow/.test(robotsContent),
  };
}

function emptyParsed(): ParsedPage {
  return {
    title: "",
    titleCount: 0,
    description: "",
    descriptionCount: 0,
    canonical: "",
    h1: [],
    h2: [],
    links: [],
    images: [],
    schemaTypes: [],
    wordCount: 0,
    hasViewport: false,
    hasNoindex: false,
    hasNofollow: false,
  };
}

function indexability(res: FetchResult, parsed: ParsedPage, url: string, canonical: string): { indexable: boolean; reason: string } {
  if (res.status === 0) return { indexable: false, reason: "No response" };
  if (res.status >= 300 && res.status < 400) return { indexable: false, reason: "Redirect" };
  if (res.status >= 400) return { indexable: false, reason: `HTTP ${res.status}` };
  if (parsed.hasNoindex) return { indexable: false, reason: "Noindex" };
  if (canonical && stripHash(canonical) !== url) return { indexable: false, reason: "Canonicalised" };
  return { indexable: true, reason: "Indexable" };
}

function collectSchemaTypes(html: string): string[] {
  const out = new Set<string>();
  for (const m of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const visit = (node: unknown) => {
        if (!node || typeof node !== "object") return;
        const obj = node as Record<string, unknown>;
        const type = obj["@type"];
        if (typeof type === "string") out.add(type);
        if (Array.isArray(type)) type.forEach((t) => typeof t === "string" && out.add(t));
        Object.values(obj).forEach((v) => (Array.isArray(v) ? v.forEach(visit) : visit(v)));
      };
      visit(JSON.parse(decode(m[1].trim())));
    } catch {
      // Ignore invalid JSON-LD.
    }
  }
  for (const m of html.matchAll(/itemtype=["'][^"']*schema\.org\/([^"'/\s>]+)/gi)) out.add(m[1]);
  return [...out].sort();
}

async function discoverSitemapUrls(origin: string, robotsTxt: string): Promise<string[]> {
  const candidates = uniqueUrls(
    [
      ...robotsTxt
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => /^sitemap:/i.test(line))
        .map((line) => line.replace(/^sitemap:\s*/i, "")),
      `${origin}/sitemap.xml`,
      `${origin}/sitemap_index.xml`,
    ],
    8,
  );

  const fetched = await Promise.all(candidates.map((url) => doFetch(url, true)));
  const locs = fetched
    .filter((r) => r.ok)
    .flatMap((r) => extractLocs(r.text))
    .filter((url) => url.startsWith("http"));
  const nested = locs.filter((url) => /sitemap/i.test(url)).slice(0, 8);
  if (!nested.length) return uniqueUrls(locs.filter((url) => sameOrigin(url, origin)), 500);

  const nestedFetched = await Promise.all(nested.map((url) => doFetch(url, true)));
  const nestedLocs = nestedFetched
    .filter((r) => r.ok)
    .flatMap((r) => extractLocs(r.text))
    .filter((url) => url.startsWith("http") && sameOrigin(url, origin));
  const directLocs = locs.filter((url) => sameOrigin(url, origin) && !/sitemap/i.test(url));
  return uniqueUrls([...directLocs, ...nestedLocs], 500);
}

// ---------------------------------------------------------------------------
// Stats helpers.
// ---------------------------------------------------------------------------

function responseCodeBuckets(records: CrawledUrl[]): SpiderReport["stats"]["responseCodes"] {
  const buckets = { "2xx": 0, "3xx": 0, "4xx": 0, "5xx": 0, other: 0 };
  for (const r of records) {
    if (r.status >= 200 && r.status < 300) buckets["2xx"]++;
    else if (r.status >= 300 && r.status < 400) buckets["3xx"]++;
    else if (r.status >= 400 && r.status < 500) buckets["4xx"]++;
    else if (r.status >= 500) buckets["5xx"]++;
    else buckets.other++;
  }
  return buckets;
}

function depthDistribution(records: CrawledUrl[]): { depth: number; count: number }[] {
  const counts = new Map<number, number>();
  for (const r of records) counts.set(r.depth, (counts.get(r.depth) || 0) + 1);
  return [...counts.entries()].sort((a, b) => a[0] - b[0]).map(([depth, count]) => ({ depth, count }));
}

function duplicateGroupUrls(records: CrawledUrl[], key: (r: CrawledUrl) => string): string[] {
  const groups = new Map<string, string[]>();
  for (const r of records) {
    const value = key(r).trim().toLowerCase();
    if (!value) continue;
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value)!.push(r.url);
  }
  return [...groups.values()].filter((urls) => urls.length > 1).flat();
}

// ---------------------------------------------------------------------------
// Generic utilities (self-contained; mirror lib/website-seo-audit.ts).
// ---------------------------------------------------------------------------

function normalizeUrl(input: string): URL | null {
  let value = input.trim();
  if (!value) return null;
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

function isCrawlable(url: string, origin: string): boolean {
  try {
    if (!sameOrigin(url, origin)) return false;
    if (ASSET_RE.test(url)) return false;
    if (PRIVATE_RE.test(new URL(url).pathname)) return false;
    return true;
  } catch {
    return false;
  }
}

function stripHash(raw: string): string {
  try {
    const url = new URL(raw);
    url.hash = "";
    return url.toString();
  } catch {
    return raw;
  }
}

function statusLabel(status: number): string {
  if (status === 0) return "No response";
  if (status >= 200 && status < 300) return "OK";
  if (status >= 300 && status < 400) return "Redirect";
  if (status >= 400 && status < 500) return "Client error";
  if (status >= 500) return "Server error";
  return "Unknown";
}

function extractLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((m) => decode(m[1].trim()));
}

function uniqueUrls(urls: string[], limit = 50): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of urls) {
    try {
      const url = new URL(raw);
      url.hash = "";
      const normalized = url.toString();
      if (!seen.has(normalized)) {
        seen.add(normalized);
        out.push(normalized);
      }
      if (out.length >= limit) break;
    } catch {
      // Ignore malformed URLs found in markup.
    }
  }
  return out;
}

function uniqueList(values: string[]): string[] {
  return [...new Set(values)];
}

function sameOrigin(url: string, origin: string): boolean {
  try {
    return new URL(url).origin === origin;
  } catch {
    return false;
  }
}

function firstMatch(source: string, re: RegExp): string {
  return source.match(re)?.[1]?.trim() || "";
}

function attr(tag: string, name: string): string {
  return decode(tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"))?.[1] || "");
}

function htmlToText(html: string): string {
  return decode(
    html
      .replace(/<(script|style|noscript|svg|canvas)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/(p|div|section|article|li|h[1-6])>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function absolutize(raw: string, pageUrl: string): string {
  if (!raw || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:")) return "";
  try {
    return new URL(raw, pageUrl).toString();
  } catch {
    return "";
  }
}

function decode(value: string): string {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .trim();
}

function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function ratingFor(score: number): SpiderReport["rating"] {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Needs work";
  return "Critical";
}
