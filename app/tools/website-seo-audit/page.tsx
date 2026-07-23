import type { Metadata } from "next";
import { pageMeta, faqPageSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { WebsiteSeoAuditClient } from "./website-seo-audit-client";

export const metadata: Metadata = pageMeta({
  title: "Free Website SEO Audit + Site Crawler. Score & Fix.",
  description:
    "Crawl up to 75 pages and get a free 0-100 SEO audit across technical SEO, schema, content, Core Web Vitals, and AI-search readiness — plus a full crawl report of every URL, broken link, redirect, and duplicate. Built by rankday.",
  path: "/tools/website-seo-audit",
});

const faqs: FaqItem[] = [
  {
    q: "What does the website SEO audit check?",
    a: "It crawls your site by following internal links and the sitemap, then scores it 0-100 across technical SEO, entity and service schema, content quality, Core Web Vitals signals, and AI-search readiness. You also get a full crawl report: every URL with its status, indexability, titles, meta, headings, word count, crawl depth, and internal links, grouped into issues like broken links, redirects, duplicate titles, missing meta, and orphan pages.",
  },
  {
    q: "How many pages does it crawl?",
    a: "Up to 75 internal pages per run, which covers most small and mid-size sites and is ideal for a fast pre-sales or pre-build audit. Larger sites have more URLs than one run can cover, so the report tells you how many extra URLs were discovered but not crawled, keeping coverage honest.",
  },
  {
    q: "Is this the same as Ahrefs?",
    a: "No. A free public crawl cannot see backlinks, ranking history, Search Console, paid keyword data, or competitor databases. This tool is built for fast diagnostics: crawlability, schema, on-page content, technical issues across every page, and AI-search readiness in one dashboard.",
  },
  {
    q: "Can agencies use this for client prospecting?",
    a: "Yes. It was designed for SEO agencies, web design agencies, consultants, and business owners who need a repeatable crawl and audit before a sales call or website strategy workshop. You can download a self-contained HTML report to share with a prospect or client.",
  },
  {
    q: "What is “Export content pack for AI”?",
    a: "After a crawl, you can download a Markdown file of page titles, headings, and body text plus a ready-made strategy prompt. Paste it into Claude or ChatGPT for site-specific SEO recommendations (the Screaming Frog → TXT → Claude workflow). The export never calls paid AI APIs — you bring the model.",
  },
];

export default function WebsiteSeoAuditPage() {
  return (
    <div className="page-enter">
      <JsonLd data={faqPageSchema(faqs)} />

      <section style={{ padding: "32px 0 24px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Free website SEO audit</span>
          <h1
            className="h-display"
            data-reveal-text
            style={{ maxWidth: 940, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Crawl, score, and fix any website for <span className="it">Google and AI search.</span>
          </h1>
          <p
            className="lede"
            data-reveal
            style={{ marginTop: 24, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}
          >
            Paste a URL. We crawl up to 75 pages and give you a 0-100 score across technical SEO,
            schema, content, Core Web Vitals, and AI-search readiness — plus a full crawl report of
            every URL, broken link, redirect, and duplicate.
          </p>
        </div>
      </section>

      <WebsiteSeoAuditClient />

      <FaqSection
        heading="About the website SEO audit."
        intro="What the audit checks, how to use it, and what the score means."
        items={faqs}
      />
    </div>
  );
}
