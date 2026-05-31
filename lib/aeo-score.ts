// AEO Score engine: fetches a URL and scores how visible it is to AI search
// engines (ChatGPT, Perplexity, Claude, Google AI). Deterministic, server-side,
// no third-party API calls. Heuristic by design: it grades the signals that
// drive AI citation, not a guarantee of citation.

export type Severity = "high" | "medium" | "low";

export type Check = {
  id: string;
  category: CategoryName;
  label: string;
  passed: boolean;
  weight: number; // points contributed to its category when passed
  detail: string; // short human explanation of the result
  fix: string; // what to do if failed
  severity: Severity;
};

export type CategoryName =
  | "AI crawler access"
  | "Structured data"
  | "Content structure"
  | "Discoverability";

export type CategoryScore = { name: CategoryName; score: number; max: number };

export type AeoReport = {
  url: string;
  domain: string;
  score: number; // 0-100
  grade: "A" | "B" | "C" | "D" | "F";
  categories: CategoryScore[];
  checks: Check[];
  fetchedAt: string;
};

const UA =
  "Mozilla/5.0 (compatible; rankdayAEOBot/1.0; +https://www.rank-day.com/tools/aeo-score)";
const TIMEOUT_MS = 12000;

export function normalizeUrl(input: string): URL | null {
  let s = input.trim();
  if (!s) return null;
  if (!/^https?:\/\//i.test(s)) s = "https://" + s;
  try {
    const u = new URL(s);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u;
  } catch {
    return null;
  }
}

async function safeFetch(url: string): Promise<{ ok: boolean; status: number; text: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "user-agent": UA, accept: "text/html,*/*" },
    });
    const text = res.ok ? await res.text() : "";
    return { ok: res.ok, status: res.status, text };
  } catch {
    return { ok: false, status: 0, text: "" };
  } finally {
    clearTimeout(timer);
  }
}

// --- robots.txt parsing for the AI crawlers we care about ---

const AI_CRAWLERS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

function isBlocked(robotsTxt: string, agent: string): boolean {
  if (!robotsTxt) return false; // no robots.txt = not blocked
  const lines = robotsTxt.split(/\r?\n/).map((l) => l.replace(/#.*$/, "").trim());

  // Group consecutive User-agent lines with the Disallow rules that follow them.
  const groups: { agents: string[]; disallows: string[] }[] = [];
  let current: { agents: string[]; disallows: string[] } | null = null;
  let lastWasAgent = false;

  for (const line of lines) {
    const m = line.match(/^(user-agent|disallow|allow)\s*:\s*(.*)$/i);
    if (!m) continue;
    const field = m[1].toLowerCase();
    const value = m[2].trim();
    if (field === "user-agent") {
      if (!lastWasAgent || !current) {
        current = { agents: [], disallows: [] };
        groups.push(current);
      }
      current.agents.push(value);
      lastWasAgent = true;
    } else {
      if (current && field === "disallow") current.disallows.push(value);
      lastWasAgent = false;
    }
  }

  // A group applies if it names the agent explicitly or "*". "Disallow: /"
  // blocks the whole site for that group.
  const lc = agent.toLowerCase();
  for (const g of groups) {
    const names = g.agents.map((a) => a.toLowerCase());
    if (names.includes(lc) || names.includes("*")) {
      if (g.disallows.some((d) => d === "/")) return true;
    }
  }
  return false;
}

// --- JSON-LD @type extraction ---

function jsonLdTypes(html: string): Set<string> {
  const types = new Set<string>();
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const raw = m[1].trim();
    try {
      const data = JSON.parse(raw);
      collectTypes(data, types);
    } catch {
      // also catch @type via regex if JSON is malformed
      for (const t of raw.matchAll(/"@type"\s*:\s*"([^"]+)"/g)) types.add(t[1]);
    }
  }
  return types;
}

function collectTypes(node: unknown, out: Set<string>): void {
  if (Array.isArray(node)) {
    node.forEach((n) => collectTypes(n, out));
  } else if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    const t = obj["@type"];
    if (typeof t === "string") out.add(t);
    else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && out.add(x));
    Object.values(obj).forEach((v) => collectTypes(v, out));
  }
}

function countTag(html: string, tag: string): number {
  return (html.match(new RegExp(`<${tag}[\\s>]`, "gi")) || []).length;
}

function firstMatch(html: string, re: RegExp): string | null {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

function visibleWordCount(html: string): number {
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return body ? body.split(" ").length : 0;
}

function gradeFor(score: number): AeoReport["grade"] {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export async function scoreUrl(input: string): Promise<AeoReport | { error: string }> {
  const u = normalizeUrl(input);
  if (!u) return { error: "That doesn't look like a valid URL. Try example.com." };

  const origin = u.origin;
  const [home, robots, llms, sitemap] = await Promise.all([
    safeFetch(u.href),
    safeFetch(`${origin}/robots.txt`),
    safeFetch(`${origin}/llms.txt`),
    safeFetch(`${origin}/sitemap.xml`),
  ]);

  if (!home.ok || !home.text) {
    return { error: `Couldn't reach ${u.hostname} (status ${home.status || "no response"}).` };
  }

  const html = home.text;
  const types = jsonLdTypes(html);
  const h1Count = countTag(html, "h1");
  const h2Count = countTag(html, "h2");
  const title = firstMatch(html, /<title[^>]*>([^<]*)<\/title>/i);
  const metaDesc = firstMatch(html, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const canonical = firstMatch(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const words = visibleWordCount(html);

  const has = (...names: string[]) => names.some((n) => types.has(n));

  const checks: Check[] = [
    // --- AI crawler access (max 25) ---
    ...AI_CRAWLERS.map((bot): Check => {
      const blocked = robots.ok ? isBlocked(robots.text, bot) : false;
      return {
        id: `crawler-${bot}`,
        category: "AI crawler access",
        label: `${bot} can crawl the site`,
        passed: !blocked,
        weight: 25 / AI_CRAWLERS.length,
        detail: blocked ? `${bot} is blocked in robots.txt` : `${bot} is allowed`,
        fix: `Remove the Disallow rule for ${bot} in robots.txt so it can read your content.`,
        severity: "high",
      };
    }),

    // --- Structured data (max 30) ---
    {
      id: "schema-org",
      category: "Structured data",
      label: "Organization / LocalBusiness schema",
      passed: has("Organization", "LocalBusiness", "ProfessionalService", "Corporation"),
      weight: 8,
      detail: has("Organization", "LocalBusiness", "ProfessionalService", "Corporation")
        ? "Organization-type schema found"
        : "No Organization-type schema",
      fix: "Add Organization (or LocalBusiness) JSON-LD so AI engines know who you are.",
      severity: "high",
    },
    {
      id: "schema-faq",
      category: "Structured data",
      label: "FAQPage schema",
      passed: has("FAQPage"),
      weight: 10,
      detail: has("FAQPage") ? "FAQPage schema found" : "No FAQPage schema",
      fix: "Add a visible FAQ section with FAQPage JSON-LD. It's the most-cited format in AI answers.",
      severity: "high",
    },
    {
      id: "schema-content",
      category: "Structured data",
      label: "Service / Article / Product schema",
      passed: has("Service", "Article", "BlogPosting", "Product"),
      weight: 7,
      detail: has("Service", "Article", "BlogPosting", "Product")
        ? "Content-type schema found"
        : "No Service/Article/Product schema",
      fix: "Add Service schema to service pages and Article schema to posts.",
      severity: "medium",
    },
    {
      id: "schema-website",
      category: "Structured data",
      label: "WebSite / BreadcrumbList schema",
      passed: has("WebSite", "BreadcrumbList"),
      weight: 5,
      detail: has("WebSite", "BreadcrumbList") ? "Site-level schema found" : "No WebSite/Breadcrumb schema",
      fix: "Add WebSite schema for entity recognition and BreadcrumbList for hierarchy.",
      severity: "low",
    },

    // --- Content structure (max 25) ---
    {
      id: "single-h1",
      category: "Content structure",
      label: "Exactly one H1",
      passed: h1Count === 1,
      weight: 8,
      detail: `${h1Count} H1 tag(s) found`,
      fix: h1Count === 0 ? "Add a single descriptive H1." : "Use exactly one H1 per page.",
      severity: "medium",
    },
    {
      id: "has-h2",
      category: "Content structure",
      label: "Uses H2 subheadings",
      passed: h2Count >= 2,
      weight: 5,
      detail: `${h2Count} H2 tag(s) found`,
      fix: "Break content into clear, question-style H2 sections AI engines can extract.",
      severity: "low",
    },
    {
      id: "title",
      category: "Content structure",
      label: "Title tag present",
      passed: !!title && title.length >= 10,
      weight: 4,
      detail: title ? `Title: "${title.slice(0, 60)}"` : "No title tag",
      fix: "Add a descriptive 50-60 character title tag.",
      severity: "medium",
    },
    {
      id: "meta-desc",
      category: "Content structure",
      label: "Meta description present",
      passed: !!metaDesc && metaDesc.length >= 50,
      weight: 4,
      detail: metaDesc ? "Meta description found" : "No meta description",
      fix: "Add a 150-160 character meta description.",
      severity: "low",
    },
    {
      id: "depth",
      category: "Content structure",
      label: "Enough content to cite",
      passed: words >= 300,
      weight: 4,
      detail: `~${words} words on the page`,
      fix: "Add substantive, factual content. Thin pages rarely get cited.",
      severity: "medium",
    },

    // --- Discoverability (max 20) ---
    {
      id: "llms-txt",
      category: "Discoverability",
      label: "llms.txt present",
      passed: llms.ok && llms.text.length > 0,
      weight: 6,
      detail: llms.ok ? "llms.txt found" : "No llms.txt",
      fix: "Add an llms.txt at your root summarizing your site for AI systems.",
      severity: "medium",
    },
    {
      id: "sitemap",
      category: "Discoverability",
      label: "XML sitemap present",
      passed: sitemap.ok && sitemap.text.includes("<urlset") ,
      weight: 6,
      detail: sitemap.ok ? "sitemap.xml found" : "No sitemap.xml",
      fix: "Publish an XML sitemap and reference it in robots.txt.",
      severity: "medium",
    },
    {
      id: "canonical",
      category: "Discoverability",
      label: "Canonical tag present",
      passed: !!canonical,
      weight: 4,
      detail: canonical ? "Canonical tag found" : "No canonical tag",
      fix: "Add a self-referencing canonical tag to each page.",
      severity: "low",
    },
    {
      id: "title-length",
      category: "Discoverability",
      label: "Title length in range",
      passed: !!title && title.length >= 20 && title.length <= 65,
      weight: 4,
      detail: title ? `Title is ${title.length} chars` : "No title",
      fix: "Keep titles roughly 20-65 characters so they aren't truncated.",
      severity: "low",
    },
  ];

  const categoriesOrder: CategoryName[] = [
    "AI crawler access",
    "Structured data",
    "Content structure",
    "Discoverability",
  ];
  const categories: CategoryScore[] = categoriesOrder.map((name) => {
    const inCat = checks.filter((c) => c.category === name);
    const max = inCat.reduce((s, c) => s + c.weight, 0);
    const score = inCat.reduce((s, c) => s + (c.passed ? c.weight : 0), 0);
    return { name, score: Math.round(score), max: Math.round(max) };
  });

  const total = Math.round(checks.reduce((s, c) => s + (c.passed ? c.weight : 0), 0));

  return {
    url: u.href,
    domain: u.hostname.replace(/^www\./, ""),
    score: total,
    grade: gradeFor(total),
    categories,
    checks,
    fetchedAt: new Date().toISOString(),
  };
}
