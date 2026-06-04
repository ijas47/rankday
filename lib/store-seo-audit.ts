export type StoreAuditSeverity = "critical" | "high" | "medium" | "low";

export type StoreAuditFinding = {
  severity: StoreAuditSeverity;
  title: string;
  detail: string;
  fix: string;
  urls?: string[];
};

export type StoreAuditSectionId = "technical" | "schema" | "content" | "cwv" | "ai";
export type StoreAuditCheckStatus = "pass" | "warning" | "fail" | "needs-data";

export type StoreAuditCheck = {
  label: string;
  status: StoreAuditCheckStatus;
  detail: string;
};

export type StoreAuditSection = {
  id: StoreAuditSectionId;
  label: string;
  score: number;
  findings: StoreAuditFinding[];
  checks: StoreAuditCheck[];
  data: Record<string, unknown>;
};

export type StoreAuditReport = {
  url: string;
  domain: string;
  score: number;
  rating: "Excellent" | "Good" | "Fair" | "Needs work" | "Critical";
  sections: StoreAuditSection[];
  findings: (StoreAuditFinding & { section: string })[];
  pages: {
    url: string;
    status: number;
    title: string;
    description: string;
    canonical: string;
    wordCount: number;
    schemaTypes: string[];
    h1Count: number;
    internalLinks: number;
    images: number;
    imagesMissingAlt: number;
  }[];
  stats: {
    pagesAnalyzed: number;
    sitemapUrls: number;
    generatedAt: string;
  };
  summary: {
    verifiedFromCrawl: string[];
    needsExternalData: string[];
    nextSteps: string[];
  };
};

const UA = "Mozilla/5.0 (compatible; rankdayStoreAudit/1.0; +https://www.rank-day.com/tools/store-seo-audit)";
const TIMEOUT_MS = 12000;
const AI_BOTS = ["GPTBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended"];
const SEVERITY_PENALTY: Record<StoreAuditSeverity, number> = {
  critical: 24,
  high: 14,
  medium: 8,
  low: 3,
};

type FetchResult = {
  ok: boolean;
  status: number;
  url: string;
  finalUrl: string;
  headers: Record<string, string>;
  text: string;
};

type ParsedPage = {
  title: string;
  description: string;
  canonical: string;
  headings: { level: number; text: string }[];
  links: string[];
  images: { src: string; alt: string; hasDimensions: boolean; loading: string }[];
  schemaTypes: string[];
  schemas: unknown[];
  wordCount: number;
  textSample: string;
  hasViewport: boolean;
  hasNoindex: boolean;
  hasHreflang: boolean;
};

type CrawledPage = {
  url: string;
  response: FetchResult;
  parsed: ParsedPage;
};

export async function auditStore(input: string, maxPages = 14): Promise<StoreAuditReport | { error: string }> {
  const normalized = normalizeUrl(input);
  if (!normalized) return { error: "Enter a valid store URL, like eyewa.com." };

  const origin = normalized.origin;
  const [home, robots, llms] = await Promise.all([
    safeFetch(normalized.href),
    safeFetch(`${origin}/robots.txt`),
    safeFetch(`${origin}/llms.txt`),
  ]);

  if (!home.ok || !home.text) {
    return { error: `Couldn't reach ${normalized.hostname} (status ${home.status || "no response"}).` };
  }

  const sitemapUrls = await discoverSitemapUrls(origin, robots.text);
  const homeParsed = parseHtml(home.text, home.finalUrl || normalized.href);
  const crawlUrls = chooseCrawlUrls(normalized.href, sitemapUrls, homeParsed.links, maxPages);
  const pages = await mapLimit(crawlUrls, 5, async (url) => {
    const response = url === normalized.href ? home : await safeFetch(url);
    return {
      url,
      response,
      parsed: parseHtml(response.text, response.finalUrl || url),
    };
  });

  const context = { origin, pages, robots, llms, sitemapUrls };
  const sections = await Promise.all([
    technicalAgent(context),
    schemaAgent(context),
    contentAgent(context),
    cwvAgent(context),
    aiAgent(context),
  ]);
  const score = weightedScore(sections);
  const findings = sortFindings(sections);
  const crawledOk = pages.filter((page) => page.response.ok).length;

  return {
    url: normalized.href,
    domain: normalized.hostname.replace(/^www\./, ""),
    score,
    rating: ratingFor(score),
    sections,
    findings,
    pages: pages.map((page) => ({
      url: page.url,
      status: page.response.status,
      title: page.parsed.title,
      description: page.parsed.description,
      canonical: page.parsed.canonical,
      wordCount: page.parsed.wordCount,
      schemaTypes: page.parsed.schemaTypes,
      h1Count: page.parsed.headings.filter((heading) => heading.level === 1).length,
      internalLinks: page.parsed.links.filter((link) => sameOrigin(link, origin)).length,
      images: page.parsed.images.length,
      imagesMissingAlt: page.parsed.images.filter((image) => !image.alt).length,
    })),
    stats: {
      pagesAnalyzed: pages.length,
      sitemapUrls: sitemapUrls.length,
      generatedAt: new Date().toISOString(),
    },
    summary: {
      verifiedFromCrawl: [
        `Fetched ${crawledOk}/${pages.length} sampled public pages plus robots.txt, llms.txt, and sitemap candidates.`,
        "Parsed HTTP status, titles, descriptions, canonicals, headings, internal links, images, cache headers, JSON-LD, and microdata.",
        "Checked public robots rules for major AI crawlers and validated whether /llms.txt resolves as a text resource.",
      ],
      needsExternalData: [
        "Google Search Console data for indexed pages, impressions, queries, and crawl errors.",
        "PageSpeed or CrUX field data for real LCP, INP, and CLS performance.",
        "Backlink, brand mention, review, and competitor SERP data from external sources.",
        "Rendered browser inspection for JavaScript-injected schema, lazy content, and hydration issues.",
      ],
      nextSteps: findings.slice(0, 3).map((item) => item.fix),
    },
  };
}

async function technicalAgent(context: AuditContext): Promise<StoreAuditSection> {
  const findings: StoreAuditFinding[] = [];
  const { origin, pages, robots, sitemapUrls } = context;
  const homepage = pages[0];
  const localeUrls = sitemapUrls.filter((url) => /\/[a-z]{2}-(en|ar)\b/i.test(new URL(url).pathname));
  const failedPages = pages.filter((page) => !page.response.ok);
  const robotsReferencesSitemap = /^sitemap\s*:/im.test(robots.text);

  if (!homepage?.response.ok) {
    findings.push(finding("critical", "Homepage did not return a healthy response", `Status ${homepage?.response.status || 0}`, "Fix availability, redirects, or security blocks before optimizing SEO."));
  }
  if (failedPages.length > 1 || (failedPages.length === 1 && failedPages[0] !== homepage)) {
    findings.push(finding("high", "Some sampled URLs return unhealthy responses", `${failedPages.length}/${pages.length} sampled pages returned non-2xx status codes.`, "Fix broken product, collection, and policy URLs or remove them from internal links and sitemaps.", failedPages.map((p) => p.url)));
  }
  if (!robots.ok) {
    findings.push(finding("medium", "robots.txt could not be fetched", `Status ${robots.status || 0}`, "Publish a clear robots.txt with sitemap references."));
  }
  if (robots.ok && !robotsReferencesSitemap) {
    findings.push(finding("low", "robots.txt does not reference a sitemap", "The robots.txt file was fetched, but no Sitemap directive was found.", "Add Sitemap lines for the main XML sitemap index so crawlers discover key URLs faster."));
  }
  if (sitemapUrls.length === 0) {
    findings.push(finding("high", "No XML sitemap URLs were discovered", "Checked robots.txt, /sitemap.xml, and /sitemap_index.xml.", "Expose a clean XML sitemap and reference it from robots.txt."));
  }

  const missingCanonical = pages.filter((page) => page.response.ok && !page.parsed.canonical);
  if (missingCanonical.length) {
    findings.push(finding("medium", "Some sampled pages have no canonical tag", `${missingCanonical.length}/${pages.length} pages`, "Add self-referencing canonicals on unique product, collection, and content pages.", missingCanonical.map((p) => p.url)));
  }
  const crossDomainCanonicals = pages.filter((page) => page.parsed.canonical && !sameOrigin(page.parsed.canonical, origin));
  if (crossDomainCanonicals.length) {
    findings.push(finding("high", "Canonicals point to another domain", `${crossDomainCanonicals.length}/${pages.length} sampled pages canonicalize outside the audited domain.`, "Use cross-domain canonicals only when duplicate content is intentionally consolidated elsewhere.", crossDomainCanonicals.map((p) => p.url)));
  }

  const noViewport = pages.filter((page) => page.response.ok && !page.parsed.hasViewport);
  if (noViewport.length) {
    findings.push(finding("high", "Viewport meta tag is missing on sampled pages", `${noViewport.length}/${pages.length} pages`, "Add a responsive viewport meta tag so mobile-first rendering is reliable.", noViewport.map((p) => p.url)));
  }

  const noindex = pages.filter((page) => page.parsed.hasNoindex);
  if (noindex.length) {
    findings.push(finding("high", "Sampled pages include noindex directives", `${noindex.length}/${pages.length} pages`, "Remove noindex from revenue pages that should appear in search.", noindex.map((p) => p.url)));
  }

  if (localeUrls.length > 20 && !pages.some((page) => page.parsed.hasHreflang)) {
    findings.push(finding("high", "International hreflang signals are missing", `${localeUrls.length} locale-like sitemap URLs found, but sampled HTML had no hreflang tags.`, "Add reciprocal hreflang alternates, self-references, and x-default for each locale."));
  }

  const noStorePages = pages.filter((page) => /no-store|no-cache|private/i.test(page.response.headers["cache-control"] || ""));
  if (noStorePages.length / Math.max(pages.length, 1) > 0.5) {
    findings.push(finding("medium", "Public catalog pages may be hard to cache", `${noStorePages.length}/${pages.length} sampled pages use private, no-cache, or no-store.`, "Cache public product and collection pages at the CDN edge while keeping account, cart, and checkout private."));
  }

  const checks = [
    check("Homepage response", homepage?.response.ok ? "pass" : "fail", homepage?.response.ok ? `HTTP ${homepage.response.status}` : `HTTP ${homepage?.response.status || 0}`),
    check("Sampled URL health", failedPages.length ? "fail" : "pass", failedPages.length ? `${failedPages.length}/${pages.length} sampled URLs failed` : "All sampled URLs returned healthy responses"),
    check("robots.txt", robots.ok ? "pass" : "warning", robots.ok ? `Fetched with HTTP ${robots.status}` : `Could not fetch, status ${robots.status || 0}`),
    check("XML sitemap discovery", sitemapUrls.length ? "pass" : "fail", sitemapUrls.length ? `${sitemapUrls.length} sitemap URLs discovered` : "No sitemap URLs discovered"),
    check("Canonical coverage", missingCanonical.length || crossDomainCanonicals.length ? "warning" : "pass", `${pages.length - missingCanonical.length}/${pages.length} sampled pages have canonicals`),
    check("Mobile viewport", noViewport.length ? "fail" : "pass", noViewport.length ? `${noViewport.length} sampled pages missing viewport` : "Viewport meta tag found in sampled HTML"),
    check("Indexability", noindex.length ? "fail" : "pass", noindex.length ? `${noindex.length} sampled pages include noindex` : "No noindex tags found in sampled HTML"),
    check("International signals", localeUrls.length > 20 ? (pages.some((page) => page.parsed.hasHreflang) ? "pass" : "warning") : "needs-data", localeUrls.length > 20 ? `${localeUrls.length} locale-like sitemap URLs found` : "Not enough locale URLs in public sample"),
  ];

  return section("technical", "Technical SEO", 100 - penalty(findings), findings, checks, {
    pagesCrawled: pages.length,
    sitemapUrls: sitemapUrls.length,
    robotsStatus: robots.status,
    robotsReferencesSitemap,
    failedPages: failedPages.length,
  });
}

async function schemaAgent(context: AuditContext): Promise<StoreAuditSection> {
  const findings: StoreAuditFinding[] = [];
  const { pages } = context;
  const schemaPages = pages.filter((page) => page.parsed.schemaTypes.length);
  const productSchemaPages = pages.filter((page) => page.parsed.schemaTypes.some((type) => /Product/i.test(type)));
  const organizationSchema = pages.some((page) => page.parsed.schemaTypes.some((type) => /Organization|Store|LocalBusiness/i.test(type)));
  const websiteSchema = pages.some((page) => page.parsed.schemaTypes.some((type) => /WebSite/i.test(type)));
  const breadcrumbSchema = pages.some((page) => page.parsed.schemaTypes.some((type) => /BreadcrumbList/i.test(type)));
  const parseErrorPages = pages.filter((page) => JSON.stringify(page.parsed.schemas).includes('"parseError":true'));
  const schemaJson = JSON.stringify(pages.flatMap((page) => page.parsed.schemas));
  const commercePages = pages.filter((page) => isCommerceUrl(page.url));
  const productSchemaCoverage = commercePages.length ? productSchemaPages.length / commercePages.length : productSchemaPages.length ? 1 : 0;

  if (schemaPages.length === 0) {
    findings.push(finding("critical", "No structured data was found", "No JSON-LD or microdata schema types were found in the sampled HTML.", "Add Organization, WebSite, BreadcrumbList, and Product schema."));
  }
  if (parseErrorPages.length) {
    findings.push(finding("high", "Some JSON-LD blocks could not be parsed", `${parseErrorPages.length}/${pages.length} sampled pages include invalid JSON-LD.`, "Validate JSON-LD templates and remove trailing commas, HTML entities, or malformed script output.", parseErrorPages.map((p) => p.url)));
  }
  if (!organizationSchema) {
    findings.push(finding("high", "Organization or Store schema is missing", "No Organization, Store, or LocalBusiness type was found.", "Add complete Organization schema with logo, sameAs, contactPoint, and policy URLs."));
  }
  if (!websiteSchema) {
    findings.push(finding("low", "WebSite schema is missing", "No WebSite schema type was found in the sampled HTML.", "Add WebSite schema with the canonical site name, URL, and SearchAction when the site has search."));
  }
  if (productSchemaPages.length === 0) {
    findings.push(finding("high", "Product schema was not found in the crawl sample", "Ecommerce audits expect Product schema on product/category templates.", "Add Product schema with offers, availability, priceCurrency, image, brand, SKU, and aggregateRating where visible."));
  }
  if (commercePages.length >= 3 && productSchemaCoverage < 0.3) {
    findings.push(finding("high", "Product schema coverage is low on commerce pages", `${productSchemaPages.length}/${commercePages.length} sampled commerce URLs include Product schema.`, "Ensure product templates output Product schema and category templates expose ItemList or product collection markup where appropriate.", commercePages.filter((page) => !page.parsed.schemaTypes.some((type) => /Product/i.test(type))).map((p) => p.url)));
  }
  if (!breadcrumbSchema) {
    findings.push(finding("medium", "BreadcrumbList schema is missing", "Breadcrumb schema helps search and AI systems understand store hierarchy.", "Add BreadcrumbList schema on category, product, and editorial pages."));
  }
  if (productSchemaPages.length > 0 && !/offers|price|priceCurrency|availability/i.test(schemaJson)) {
    findings.push(finding("medium", "Product schema lacks offer fields", "No offers, price, priceCurrency, or availability fields were found in sampled Product schema.", "Add Offer markup with visible price, currency, availability, URL, and seller details."));
  }
  if (productSchemaPages.length > 0 && !/aggregateRating|review|reviewRating/i.test(schemaJson)) {
    findings.push(finding("medium", "Product schema lacks review and rating trust fields", "No aggregateRating or review fields were found in sampled Product schema.", "Add aggregateRating and review markup when visible reviews are present."));
  }

  const checks = [
    check("Structured data coverage", schemaPages.length ? "pass" : "fail", `${schemaPages.length}/${pages.length} sampled pages expose schema types`),
    check("JSON-LD validity", parseErrorPages.length ? "fail" : "pass", parseErrorPages.length ? `${parseErrorPages.length} sampled pages include parse errors` : "No JSON-LD parse errors found"),
    check("Organization entity", organizationSchema ? "pass" : "fail", organizationSchema ? "Organization, Store, or LocalBusiness schema found" : "Missing entity schema"),
    check("WebSite schema", websiteSchema ? "pass" : "warning", websiteSchema ? "WebSite schema found" : "WebSite schema not found"),
    check("Product schema", productSchemaPages.length ? "pass" : "fail", `${productSchemaPages.length} sampled pages include Product schema`),
    check("Breadcrumb schema", breadcrumbSchema ? "pass" : "warning", breadcrumbSchema ? "BreadcrumbList schema found" : "BreadcrumbList schema missing"),
    check("Review fields", /aggregateRating|review|reviewRating/i.test(schemaJson) ? "pass" : "warning", /aggregateRating|review|reviewRating/i.test(schemaJson) ? "Review or rating fields found" : "No review or rating fields found"),
  ];

  return section("schema", "Product Schema", (schemaPages.length ? 96 : 72) - penalty(findings), findings, checks, {
    schemaCoverage: pages.length ? schemaPages.length / pages.length : 0,
    productSchemaPages: productSchemaPages.length,
    productSchemaCoverage,
    schemaTypes: [...new Set(pages.flatMap((page) => page.parsed.schemaTypes))].sort(),
  });
}

async function contentAgent(context: AuditContext): Promise<StoreAuditSection> {
  const findings: StoreAuditFinding[] = [];
  const { pages } = context;
  const missingTitles = pages.filter((page) => !page.parsed.title);
  const shortTitles = pages.filter((page) => page.parsed.title && page.parsed.title.length < 25);
  const longTitles = pages.filter((page) => page.parsed.title.length > 68);
  const missingDescriptions = pages.filter((page) => !page.parsed.description);
  const weakDescriptions = pages.filter((page) => page.parsed.description && (page.parsed.description.length < 70 || page.parsed.description.length > 170));
  const missingH1 = pages.filter((page) => !page.parsed.headings.some((heading) => heading.level === 1));
  const multipleH1 = pages.filter((page) => page.parsed.headings.filter((heading) => heading.level === 1).length > 1);
  const commercePages = pages.filter((page) => isCommerceUrl(page.url));
  const thinCommercePages = commercePages.filter((page) => page.response.ok && page.parsed.wordCount < 350);
  const templatedTitles = pages.filter((page) => /\bBuy\s+Buy\b|Online in [^|]+ Online in/i.test(page.parsed.title));
  const qaReady = pages.filter((page) => /\b(faq|questions|how to|what is|which|best|guide|size|shipping|returns|compare)\b/i.test(page.parsed.textSample));
  const duplicateTitles = duplicateValues(pages.map((page) => page.parsed.title).filter(Boolean));
  const duplicateDescriptions = duplicateValues(pages.map((page) => page.parsed.description).filter(Boolean));
  const images = pages.flatMap((page) => page.parsed.images.map((image) => ({ ...image, pageUrl: page.url })));
  const imagesMissingAlt = images.filter((image) => !image.alt);
  const pagesWithFewInternalLinks = pages.filter((page) => page.response.ok && page.parsed.links.filter((link) => sameOrigin(link, context.origin)).length < 5);

  if (missingTitles.length) {
    findings.push(finding("high", "Some pages are missing title tags", `${missingTitles.length}/${pages.length} pages`, "Add unique, descriptive title tags to every indexable page.", missingTitles.map((p) => p.url)));
  }
  if (shortTitles.length || longTitles.length) {
    findings.push(finding("medium", "Some title tags are too short or too long", `${shortTitles.length} short and ${longTitles.length} long titles found.`, "Keep titles specific, natural, and usually between 25 and 68 characters.", [...shortTitles, ...longTitles].map((p) => p.url)));
  }
  if (missingDescriptions.length) {
    findings.push(finding("medium", "Some pages are missing meta descriptions", `${missingDescriptions.length}/${pages.length} pages`, "Add concise descriptions that explain category, product, or brand value.", missingDescriptions.map((p) => p.url)));
  }
  if (weakDescriptions.length > 1) {
    findings.push(finding("low", "Some meta descriptions are weak length-wise", `${weakDescriptions.length}/${pages.length} descriptions are under 70 or over 170 characters.`, "Rewrite descriptions to summarize the page benefit in one useful search snippet.", weakDescriptions.map((p) => p.url)));
  }
  if (duplicateTitles.length) {
    findings.push(finding("medium", "Duplicate title tags were found", `${duplicateTitles.length} repeated title values appeared in the sample.`, "Make product, category, and policy title templates unique by page intent.", pages.filter((p) => duplicateTitles.includes(p.parsed.title.trim().toLowerCase())).map((p) => p.url)));
  }
  if (duplicateDescriptions.length) {
    findings.push(finding("low", "Duplicate meta descriptions were found", `${duplicateDescriptions.length} repeated descriptions appeared in the sample.`, "Write descriptions that reflect the specific category, product type, or policy page.", pages.filter((p) => duplicateDescriptions.includes(p.parsed.description.trim().toLowerCase())).map((p) => p.url)));
  }
  if (missingH1.length) {
    findings.push(finding("medium", "Some pages have no H1", `${missingH1.length}/${pages.length} pages`, "Use one clear H1 that names the product, collection, or topic.", missingH1.map((p) => p.url)));
  }
  if (multipleH1.length) {
    findings.push(finding("low", "Some pages use multiple H1s", `${multipleH1.length}/${pages.length} sampled pages`, "Keep the main page topic in one H1 and use H2/H3 headings for sections.", multipleH1.map((p) => p.url)));
  }
  if (commercePages.length && thinCommercePages.length / commercePages.length > 0.4) {
    findings.push(finding("high", "Collection and commerce pages are thin", `${thinCommercePages.length}/${commercePages.length} commerce pages are under 350 words.`, "Add category intros, buying guidance, comparison copy, care advice, and concise FAQs.", thinCommercePages.map((p) => p.url)));
  }
  if (templatedTitles.length) {
    findings.push(finding("medium", "Title tags look programmatically duplicated", `${templatedTitles.length}/${pages.length} sampled titles repeat awkward ecommerce template phrases.`, "Rewrite title templates so category names, modifiers, locale, and brand appear once in a natural order.", templatedTitles.map((p) => p.url)));
  }
  if (images.length >= 8 && imagesMissingAlt.length / images.length > 0.25) {
    findings.push(finding("medium", "Many product or content images are missing alt text", `${imagesMissingAlt.length}/${images.length} images in sampled HTML have empty alt text.`, "Add concise alt text for product, category, and editorial images that need search context.", uniqueUrls(imagesMissingAlt.map((image) => image.pageUrl), 10)));
  }
  if (pagesWithFewInternalLinks.length / Math.max(pages.length, 1) > 0.35) {
    findings.push(finding("low", "Some pages have weak internal linking signals", `${pagesWithFewInternalLinks.length}/${pages.length} sampled pages expose fewer than 5 internal links in HTML.`, "Add contextual links between categories, buying guides, product groups, FAQs, and policy pages.", pagesWithFewInternalLinks.map((p) => p.url)));
  }
  if (qaReady.length / Math.max(pages.length, 1) < 0.25) {
    findings.push(finding("low", "Few pages include answer-ready buying guidance", `${qaReady.length}/${pages.length} pages include FAQ or guide-like language.`, "Add concise Q&A sections for fit, use case, shipping, returns, and product comparisons."));
  }

  const checks = [
    check("Title tags", missingTitles.length || duplicateTitles.length ? "warning" : "pass", `${pages.length - missingTitles.length}/${pages.length} sampled pages include titles`),
    check("Meta descriptions", missingDescriptions.length ? "warning" : "pass", `${pages.length - missingDescriptions.length}/${pages.length} sampled pages include descriptions`),
    check("H1 structure", missingH1.length || multipleH1.length ? "warning" : "pass", missingH1.length || multipleH1.length ? `${missingH1.length} missing, ${multipleH1.length} multiple H1s` : "One H1 pattern looks healthy in the sample"),
    check("Commerce content depth", thinCommercePages.length ? "warning" : "pass", commercePages.length ? `${commercePages.length - thinCommercePages.length}/${commercePages.length} commerce pages clear 350 words` : "No commerce URLs identified in the sample"),
    check("Image alt text", imagesMissingAlt.length ? "warning" : "pass", images.length ? `${images.length - imagesMissingAlt.length}/${images.length} images include alt text` : "No images found in sampled HTML"),
    check("Answer-ready content", qaReady.length / Math.max(pages.length, 1) >= 0.25 ? "pass" : "warning", `${qaReady.length}/${pages.length} pages include FAQ, guide, or comparison language`),
  ];

  return section("content", "Content Quality", 94 - penalty(findings), findings, checks, {
    averageWordCount: Math.round(pages.reduce((sum, page) => sum + page.parsed.wordCount, 0) / Math.max(pages.length, 1)),
    answerReadyPages: qaReady.length,
    duplicateTitles: duplicateTitles.length,
    imagesMissingAlt: imagesMissingAlt.length,
  });
}

async function cwvAgent(context: AuditContext): Promise<StoreAuditSection> {
  const findings: StoreAuditFinding[] = [];
  const { pages } = context;
  const heavyPages = pages.filter((page) => page.response.text.length > 700_000 && page.response.text.length <= 1_200_000);
  const veryHeavyPages = pages.filter((page) => page.response.text.length > 1_200_000);
  const fontPreloads = pages[0]?.response.text.match(/rel=["']preload["'][^>]+font/gi)?.length || 0;
  const scriptCount = (pages[0]?.response.text.match(/<script\b/gi) || []).length;
  const stylesheetCount = (pages[0]?.response.text.match(/<link[^>]+rel=["']stylesheet["']/gi) || []).length;
  const homepageBytes = pages[0]?.response.text.length || 0;
  const images = pages.flatMap((page) => page.parsed.images.map((image) => ({ ...image, pageUrl: page.url })));
  const imagesWithoutDimensions = images.filter((image) => !image.hasDimensions);
  const lazyImages = images.filter((image) => /^lazy$/i.test(image.loading));

  if (veryHeavyPages.length) {
    findings.push(finding("high", "Some pages ship very heavy HTML payloads", `${veryHeavyPages.length}/${pages.length} sampled pages are over 1.2MB of HTML.`, "Reduce server-rendered payload size, trim embedded data, and defer non-critical personalization.", veryHeavyPages.map((p) => p.url)));
  }
  if (heavyPages.length) {
    findings.push(finding("medium", "Some pages ship heavy HTML payloads", `${heavyPages.length}/${pages.length} sampled pages are over 700KB of HTML.`, "Reduce server-rendered payload size and defer non-critical personalization."));
  }
  if (scriptCount > 55) {
    findings.push(finding("high", "Homepage script count is very high", `${scriptCount} script tags found on the homepage.`, "Remove low-value third-party scripts and defer non-critical JavaScript from product discovery paths."));
  } else if (scriptCount > 35) {
    findings.push(finding("medium", "Homepage script count is high", `${scriptCount} script tags found on the homepage.`, "Audit third-party scripts and split non-critical JavaScript from product discovery paths."));
  }
  if (stylesheetCount > 16) {
    findings.push(finding("low", "Homepage loads many stylesheets", `${stylesheetCount} stylesheet links found on the homepage.`, "Consolidate non-critical CSS and keep above-the-fold styles lean."));
  }
  if (images.length >= 8 && imagesWithoutDimensions.length / images.length > 0.5) {
    findings.push(finding("medium", "Many images lack width and height attributes", `${imagesWithoutDimensions.length}/${images.length} images in sampled HTML lack dimensions.`, "Set image dimensions or aspect-ratio containers to reduce layout shift.", uniqueUrls(imagesWithoutDimensions.map((image) => image.pageUrl), 10)));
  }

  const checks = [
    check("Field Core Web Vitals", "needs-data", "Requires PageSpeed or CrUX data for LCP, INP, and CLS"),
    check("Homepage HTML size", homepageBytes > 700_000 ? "warning" : "pass", `${readableBytes(homepageBytes)} HTML response`),
    check("Script pressure", scriptCount > 55 ? "fail" : scriptCount > 35 ? "warning" : "pass", `${scriptCount} script tags on homepage`),
    check("Stylesheet pressure", stylesheetCount > 16 ? "warning" : "pass", `${stylesheetCount} stylesheet links on homepage`),
    check("Image dimensions", imagesWithoutDimensions.length ? "warning" : "pass", images.length ? `${images.length - imagesWithoutDimensions.length}/${images.length} images include width and height` : "No images found in sampled HTML"),
    check("Lazy loading", lazyImages.length ? "pass" : images.length ? "warning" : "needs-data", images.length ? `${lazyImages.length}/${images.length} sampled images explicitly lazy-load` : "No images found in sampled HTML"),
  ];

  return section("cwv", "Core Web Vitals", 88 - penalty(findings), findings, checks, {
    source: "instant-signals",
    homepageScripts: scriptCount,
    homepageBytes,
    stylesheetCount,
    fontPreloads,
    heavyPages: heavyPages.length,
    imagesWithoutDimensions: imagesWithoutDimensions.length,
  });
}

async function aiAgent(context: AuditContext): Promise<StoreAuditSection> {
  const findings: StoreAuditFinding[] = [];
  const { pages, robots, llms, sitemapUrls } = context;
  const validLlms = isValidLlmsTxt(llms);
  const blockedBots = robots.text ? AI_BOTS.filter((bot) => isBotBlocked(robots.text, bot)) : [];
  const hasOrganization = pages.some((page) => page.parsed.schemaTypes.some((type) => /Organization|Store|LocalBusiness/i.test(type)));
  const hasFaqSchema = pages.some((page) => page.parsed.schemaTypes.some((type) => /FAQPage|QAPage|HowTo/i.test(type)));
  const schemaJson = JSON.stringify(pages.flatMap((page) => page.parsed.schemas));
  const sameAsSignals = /sameAs|instagram|linkedin|youtube|tiktok|facebook|twitter|x\.com/i.test(schemaJson);
  const answerBlocks = pages.filter((page) => /\b(best|how|what|which|can i|should i|faq|guide|compare|size|fit|prescription)\b/i.test(page.parsed.textSample));
  const commercePages = pages.filter((page) => isCommerceUrl(page.url));
  const thinCommercePages = commercePages.filter((page) => page.response.ok && page.parsed.wordCount < 350);
  const allKnownUrls = [...pages.map((page) => page.url), ...sitemapUrls];
  const hasPolicySignals = allKnownUrls.some((url) => /\/(shipping|returns?|refund|delivery|privacy|terms|faq|support|contact)(\/|$|-)/i.test(new URL(url).pathname));
  const hasContactSignals = pages.some((page) => /\b(contact|support|help center|customer service|whatsapp|email|phone)\b/i.test(page.parsed.textSample));

  if (blockedBots.length) {
    findings.push(finding("critical", "Robots rules block important AI crawlers", blockedBots.join(", "), "Allow trusted AI discovery crawlers unless there is a deliberate content policy reason to block them."));
  }
  if (!validLlms) {
    findings.push(finding("high", "No valid llms.txt file was found", llms.finalUrl || `Status ${llms.status || 0}`, "Publish /llms.txt as a text or markdown file with canonical product, category, help, and policy resources."));
  }
  if (!hasOrganization) {
    findings.push(finding("high", "Entity schema is weak for AI search", "No Organization/Store schema found.", "Add Organization schema with sameAs profiles, logo, support contacts, and policy links."));
  }
  if (!sameAsSignals) {
    findings.push(finding("medium", "Third-party entity signals are not exposed in schema", "No sameAs or social profile signals found in sampled JSON-LD.", "Add authoritative social and marketplace profiles to Organization schema."));
  }
  if (!hasFaqSchema && answerBlocks.length) {
    findings.push(finding("medium", "FAQ-like content is not marked up for extraction", `${answerBlocks.length} pages include answer-ready language.`, "Use FAQPage or QAPage schema where the visible page genuinely contains Q&A."));
  }
  if (!hasPolicySignals) {
    findings.push(finding("medium", "Shopping policy pages were not visible in the public sample", "No obvious shipping, returns, refund, FAQ, support, or contact URLs were found in sampled pages or sitemap URLs.", "Expose clear policy and support pages in navigation, sitemap, schema, and llms.txt so AI shopping assistants can answer buyer objections."));
  }
  if (!hasContactSignals) {
    findings.push(finding("low", "Support and contact signals look thin", "The sampled page text did not expose obvious contact, support, phone, email, or help-center language.", "Make contact and support paths easy for crawlers and shoppers to find from the main templates."));
  }
  if (commercePages.length && thinCommercePages.length / commercePages.length > 0.4) {
    findings.push(finding("high", "Category pages are not extractable enough for shopping agents", `${thinCommercePages.length}/${commercePages.length} commerce pages are under 350 words.`, "Add structured buying guidance that agents can quote when comparing products and categories."));
  }

  const checks = [
    check("AI crawler access", blockedBots.length ? "fail" : robots.ok ? "pass" : "needs-data", blockedBots.length ? `${blockedBots.join(", ")} blocked` : robots.ok ? "No full-site AI crawler blocks found" : "robots.txt unavailable"),
    check("llms.txt", validLlms ? "pass" : "fail", validLlms ? "/llms.txt resolved as a text resource" : "No valid /llms.txt found"),
    check("Entity clarity", hasOrganization ? "pass" : "fail", hasOrganization ? "Organization, Store, or LocalBusiness schema found" : "Missing entity schema"),
    check("sameAs authority signals", sameAsSignals ? "pass" : "warning", sameAsSignals ? "sameAs or social profile signals found" : "No sameAs or social signals found in sampled schema"),
    check("Answer-ready pages", answerBlocks.length ? "pass" : "warning", `${answerBlocks.length}/${pages.length} pages include answer-style language`),
    check("Shopping policy access", hasPolicySignals ? "pass" : "warning", hasPolicySignals ? "Policy or support URLs found" : "No obvious policy or support URLs found"),
    check("Brand authority", "needs-data", "Requires reviews, backlinks, directories, and third-party mentions"),
  ];

  return section("ai", "AI Search Readiness", 92 - penalty(findings), findings, checks, {
    llmsTxt: validLlms,
    blockedAiBots: blockedBots,
    answerReadyPages: answerBlocks.length,
    hasPolicySignals,
  });
}

type AuditContext = {
  origin: string;
  pages: CrawledPage[];
  robots: FetchResult;
  llms: FetchResult;
  sitemapUrls: string[];
};

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

async function safeFetch(url: string): Promise<FetchResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": UA,
        accept: "text/html,application/xhtml+xml,application/xml,text/xml,text/plain;q=0.9,*/*;q=0.7",
      },
    });
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      url,
      finalUrl: response.url,
      headers: Object.fromEntries(response.headers.entries()),
      text,
    };
  } catch {
    return { ok: false, status: 0, url, finalUrl: url, headers: {}, text: "" };
  } finally {
    clearTimeout(timer);
  }
}

async function discoverSitemapUrls(origin: string, robotsTxt: string): Promise<string[]> {
  const sitemapCandidates = uniqueUrls([
    ...robotsTxt
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => /^sitemap:/i.test(line))
      .map((line) => line.replace(/^sitemap:\s*/i, "")),
    `${origin}/sitemap.xml`,
    `${origin}/sitemap_index.xml`,
  ]).slice(0, 8);

  const fetched = await mapLimit(sitemapCandidates, 3, safeFetch);
  const locs = fetched.filter((result) => result.ok).flatMap((result) => extractLocs(result.text)).filter((url) => url.startsWith("http"));
  const nested = locs.filter((url) => /sitemap/i.test(url)).slice(0, 8);
  if (!nested.length) return uniqueUrls(locs.filter((url) => sameOrigin(url, origin)), 500);

  const nestedFetched = await mapLimit(nested, 3, safeFetch);
  const nestedLocs = nestedFetched
    .filter((result) => result.ok)
    .flatMap((result) => extractLocs(result.text))
    .filter((url) => url.startsWith("http") && sameOrigin(url, origin));
  const directLocs = locs.filter((url) => sameOrigin(url, origin) && !/sitemap/i.test(url));
  return uniqueUrls([...directLocs, ...nestedLocs], 500);
}

function chooseCrawlUrls(homepage: string, sitemapUrls: string[], internalLinks: string[], maxPages: number): string[] {
  const origin = new URL(homepage).origin;
  const priorityPatterns = [
    /\/products?\//i,
    /\/collections?\//i,
    /\/category\//i,
    /\/shop/i,
    /\/blog\//i,
    /\/pages?\/(about|contact|shipping|returns|refund|faq)/i,
    /\/(about|contact|shipping|returns|refund|faq)/i,
  ];
  const candidates = uniqueUrls([homepage, ...sitemapUrls, ...internalLinks], 1000)
    .filter((url) => sameOrigin(url, origin))
    .filter((url) => !/\.(jpg|jpeg|png|gif|webp|svg|pdf|zip|mp4|mov|woff2?|css|js)(\?|$)/i.test(url))
    .filter((url) => !/\/(cdn-cgi|_next|api|cart|checkout|account)\b/i.test(new URL(url).pathname));

  return candidates
    .map((url, index) => ({
      url,
      index,
      score: url === homepage ? 1000 : priorityPatterns.reduce((sum, re, i) => sum + (re.test(url) ? 80 - i * 6 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, Math.max(1, Math.min(maxPages, 24)))
    .map((entry) => entry.url);
}

function parseHtml(html: string, pageUrl: string): ParsedPage {
  const title = decode(firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i) || "");
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
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: htmlToText(match[2]).slice(0, 160),
  }));
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((match) => absolutize(decode(match[1]), pageUrl)).filter(Boolean);
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => {
    const tag = match[0];
    return {
      src: attr(tag, "src") || attr(tag, "data-src"),
      alt: attr(tag, "alt"),
      hasDimensions: Boolean(attr(tag, "width") && attr(tag, "height")),
      loading: attr(tag, "loading"),
    };
  });
  const schemas = extractJsonLd(html);
  const schemaTypes = collectSchemaTypes(schemas, html);
  const text = htmlToText(html);
  return {
    title,
    description,
    canonical,
    headings,
    links,
    images,
    schemas,
    schemaTypes,
    wordCount: text ? text.split(/\s+/).filter(Boolean).length : 0,
    textSample: text.slice(0, 5000),
    hasViewport: /<meta[^>]+name=["']viewport["']/i.test(html),
    hasNoindex: /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html),
    hasHreflang: /<link[^>]+hreflang=["']/i.test(html),
  };
}

function extractJsonLd(html: string): unknown[] {
  return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => {
    try {
      return JSON.parse(decode(match[1].trim()));
    } catch {
      return { parseError: true };
    }
  });
}

function collectSchemaTypes(schemas: unknown[], html: string): string[] {
  const out = new Set<string>();
  const visit = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    const type = obj["@type"];
    if (typeof type === "string") out.add(type);
    if (Array.isArray(type)) type.forEach((item) => typeof item === "string" && out.add(item));
    Object.values(obj).forEach((value) => {
      if (Array.isArray(value)) value.forEach(visit);
      else visit(value);
    });
  };
  schemas.forEach(visit);
  for (const match of html.matchAll(/itemtype=["'][^"']*schema\.org\/([^"'/\s>]+)/gi)) out.add(match[1]);
  return [...out].sort();
}

function isBotBlocked(robotsTxt: string, botName: string): boolean {
  const groups: { agents: string[]; rules: { type: string; path: string }[] }[] = [];
  let current: { agents: string[]; rules: { type: string; path: string }[] } | null = null;
  for (const rawLine of robotsTxt.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, "").trim();
    const match = line.match(/^(user-agent|allow|disallow)\s*:\s*(.*)$/i);
    if (!match) continue;
    const field = match[1].toLowerCase();
    const value = match[2].trim();
    if (field === "user-agent") {
      current = { agents: [value.toLowerCase()], rules: [] };
      groups.push(current);
    } else if (current) {
      current.rules.push({ type: field, path: value });
    }
  }
  const bot = botName.toLowerCase();
  const rules = groups
    .filter((group) => group.agents.some((agent) => agent === "*" || bot.includes(agent) || agent.includes(bot)))
    .flatMap((group) => group.rules);
  return rules.some((rule) => rule.type === "disallow" && rule.path === "/") && !rules.some((rule) => rule.type === "allow" && rule.path === "/");
}

function isValidLlmsTxt(response: FetchResult): boolean {
  if (!response.ok) return false;
  const path = new URL(response.finalUrl || response.url).pathname;
  const contentType = response.headers["content-type"] || "";
  if (!/llms\.txt$/i.test(path)) return false;
  if (/text\/html/i.test(contentType) || /^\s*<!doctype html/i.test(response.text)) return false;
  return /text\/plain|text\/markdown|application\/octet-stream/i.test(contentType) || /^#\s+\S+/m.test(response.text);
}

async function mapLimit<T, R>(items: T[], limit: number, worker: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let index = 0;
  async function next() {
    while (index < items.length) {
      const current = index++;
      results[current] = await worker(items[current]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, next));
  return results;
}

function section(
  id: StoreAuditSectionId,
  label: string,
  score: number,
  findings: StoreAuditFinding[],
  checks: StoreAuditCheck[],
  data: Record<string, unknown>,
): StoreAuditSection {
  return { id, label, score: clamp(score), findings, checks, data };
}

function finding(severity: StoreAuditSeverity, title: string, detail: string, fix: string, urls: string[] = []): StoreAuditFinding {
  return { severity, title, detail, fix, urls };
}

function check(label: string, status: StoreAuditCheckStatus, detail: string): StoreAuditCheck {
  return { label, status, detail };
}

function penalty(findings: StoreAuditFinding[]): number {
  return findings.reduce((sum, item) => sum + SEVERITY_PENALTY[item.severity], 0);
}

function weightedScore(sections: StoreAuditSection[]): number {
  const weights: Record<StoreAuditSectionId, number> = { technical: 0.25, schema: 0.2, content: 0.2, cwv: 0.2, ai: 0.15 };
  return Math.round(sections.reduce((sum, item) => sum + item.score * weights[item.id], 0));
}

function ratingFor(score: number): StoreAuditReport["rating"] {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Needs work";
  return "Critical";
}

function sortFindings(sections: StoreAuditSection[]): (StoreAuditFinding & { section: string })[] {
  const rank: Record<StoreAuditSeverity, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  return sections
    .flatMap((s) => s.findings.map((finding) => ({ ...finding, section: s.label })))
    .sort((a, b) => rank[a.severity] - rank[b.severity] || a.title.localeCompare(b.title));
}

function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function isCommerceUrl(url: string): boolean {
  return /\/(products?|collections?|category|shop|contact-lenses|sunglasses|glasses|frames|men|women|sale|deals?|offers?)|\.html$/i.test(
    new URL(url).pathname,
  );
}

function duplicateValues(values: string[]): string[] {
  const counts = new Map<string, number>();
  values.forEach((value) => {
    const key = value.trim().toLowerCase();
    if (!key) return;
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value);
}

function readableBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function extractLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => decode(match[1].trim()));
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
      // Ignore malformed URLs found in page markup.
    }
  }
  return out;
}

function sameOrigin(url: string, origin: string): boolean {
  return new URL(url).origin === origin;
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
