// Generates public/llms-full.txt by extracting the rendered <main> text from
// the production build (.next/server/app/**/*.html). Run after `next build`:
//   npm run build && npm run llms:full
//
// Why from the build and not the source: the built HTML is the real, rendered
// text, so the full-text dump can't drift from what users and crawlers see.

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const APP_DIR = ".next/server/app";
const OUT = "public/llms-full.txt";
const BASE = "https://www.rank-day.com";

if (!existsSync(APP_DIR)) {
  console.error(`Missing ${APP_DIR}. Run \`npm run build\` first.`);
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&nbsp;/g, " ");
}

function extract(html) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? decode(titleMatch[1]).trim() : "";

  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  let body = mainMatch ? mainMatch[1] : html;
  body = body
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  body = decode(body).replace(/\s+/g, " ").trim();

  return { title, body };
}

function pathFromFile(file) {
  let rel = relative(APP_DIR, file).replace(/\.html$/, "");
  if (rel === "index") return "/";
  return "/" + rel;
}

// Ordering: home, then core, educational, locations, industries, then blog, then the rest.
const order = [
  "/", "/pricing", "/how-it-works", "/who-its-for", "/faq", "/about",
  "/what-is-aeo", "/get-cited-by-chatgpt", "/ai-visibility-tracker",
  "/locations", "/seo-agency-dubai", "/best-seo-agency-dubai",
  "/best-web-design-agency-dubai", "/best-aeo-agency-dubai",
  "/best-geo-agency-dubai", "/seo-agency-uk", "/seo-agency-us",
  "/industries", "/seo-for-saas", "/seo-for-law-firms", "/seo-for-clinics",
  "/seo-for-plumbers", "/seo-for-electricians", "/seo-for-contractors",
  "/seo-for-interior-designers", "/seo-for-fit-out-companies",
  "/seo-for-facilities-management", "/seo-for-maid-services",
  "/ai-info-page", "/blog",
];
const rank = (p) => {
  const i = order.indexOf(p);
  if (i !== -1) return i;
  if (p.startsWith("/blog/")) return order.length + 1; // blog posts after blog index
  return order.length + 2;
};

const pages = walk(APP_DIR)
  .map((file) => ({ path: pathFromFile(file), ...extract(readFileSync(file, "utf8")) }))
  .filter((p) => p.path !== "/_not-found" && p.body.length > 0)
  .sort((a, b) => rank(a.path) - rank(b.path) || a.path.localeCompare(b.path));

const header = [
  "# rankday - full content",
  "",
  "> Full text of every page on rank-day.com, for AI ingestion. rankday is a 90-day SEO and AI citation agency: we rebuild a business's website, rank it on Google, and get it cited by ChatGPT, Perplexity, Claude, and Google AI. One fixed price, top-3 ranking guarantee on 90% of agreed keywords, no retainer.",
  "",
  "Contact: WhatsApp +971 56 598 1209. Email sales@rank-day.com.",
  "",
  `Generated from the production build. ${pages.length} pages.`,
  "",
].join("\n");

const body = pages
  .map((p) => `## ${p.title || p.path}\nURL: ${BASE}${p.path === "/" ? "/" : p.path}\n\n${p.body}`)
  .join("\n\n---\n\n");

writeFileSync(OUT, header + "\n" + body + "\n");
console.log(`Wrote ${OUT} (${pages.length} pages, ${(body.length / 1024).toFixed(0)} KB).`);
