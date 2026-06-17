import type { Metadata } from "next";
import { pageMeta, faqPageSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { SeoSpiderClient } from "./seo-spider-client";

export const metadata: Metadata = pageMeta({
  title: "Free SEO Spider. Crawl Your Whole Site Online.",
  description:
    "A free online SEO spider that crawls your site like Screaming Frog: response codes, duplicate and missing titles, meta, H1s, canonicals, redirects, and crawl depth. By rankday.",
  path: "/tools/seo-spider",
});

const faqs: FaqItem[] = [
  {
    q: "What does the SEO Spider crawl?",
    a: "It starts at your URL, follows internal links and your XML sitemap, and records a per-URL data grid: HTTP status, indexability, page titles and lengths, meta descriptions, H1 and H2 headings, word count, canonicals, redirects, response time, crawl depth, and internal inlinks. It then groups site-wide issues like broken links, duplicate titles, missing meta descriptions, redirects, canonical problems, thin content, and orphan pages.",
  },
  {
    q: "How is this different from the desktop Screaming Frog SEO Spider?",
    a: "Screaming Frog is a desktop app you install. This is a free online crawler that runs in your browser with no setup. To stay fast and reliable it crawls up to 75 internal pages per run, which is ideal for diagnosing small and mid-size sites or doing a quick pre-sales audit. For a full unlimited crawl of a very large site, a desktop crawler is still the right tool.",
  },
  {
    q: "Why does it stop at 75 pages?",
    a: "The crawler runs on a serverless function with a strict time budget, so it caps each run to finish reliably and return complete results. When a site has more URLs than the cap, the report tells you exactly how many extra URLs were discovered but not crawled, so the coverage is always honest.",
  },
  {
    q: "Can agencies use this for prospecting?",
    a: "Yes. It is built for SEO agencies, web designers, and consultants who need a fast, shareable technical crawl before a sales call. You can download a self-contained HTML report and send it to a prospect or client.",
  },
];

export default function SeoSpiderPage() {
  return (
    <div className="page-enter">
      <JsonLd data={faqPageSchema(faqs)} />

      <section style={{ padding: "32px 0 24px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Free SEO spider</span>
          <h1
            className="h-display"
            data-reveal-text
            style={{ maxWidth: 940, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Crawl your whole site, <span className="it">like Screaming Frog.</span>
          </h1>
          <p
            className="lede"
            data-reveal
            style={{ marginTop: 24, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}
          >
            Paste a URL and crawl up to 75 internal pages. Get response codes, duplicate and missing
            titles, meta, headings, canonicals, redirects, and crawl depth in one filterable report.
          </p>
        </div>
      </section>

      <SeoSpiderClient />

      <FaqSection
        heading="About the SEO Spider."
        intro="What it crawls, how it compares to Screaming Frog, and how to use it."
        items={faqs}
      />
    </div>
  );
}
