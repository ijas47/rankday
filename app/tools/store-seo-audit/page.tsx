import type { Metadata } from "next";
import { pageMeta, faqPageSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { StoreSeoAuditClient } from "./store-seo-audit-client";

export const metadata: Metadata = pageMeta({
  title: "Free Ecommerce SEO Audit. Technical, Schema, CWV, AI Search.",
  description:
    "Run a free ecommerce SEO audit across technical SEO, product schema, content, Core Web Vitals signals, and AI-search readiness. Built by rankday.",
  path: "/tools/store-seo-audit",
});

const faqs: FaqItem[] = [
  {
    q: "What does the ecommerce SEO audit check?",
    a: "It checks public crawl signals across technical SEO, structured data, category and product-page content, performance risk signals, image SEO, internal linking, llms.txt, robots rules, and AI-search readiness. The result is a 0-100 score with prioritized fixes and sampled-page evidence.",
  },
  {
    q: "Is this the same as Ahrefs?",
    a: "No. A free public crawl cannot see backlinks, ranking history, Search Console, paid keyword data, or competitor databases. This audit is built for fast diagnostics: crawlability, schema, content, performance risk signals, and AI-search readiness in one dashboard.",
  },
  {
    q: "Can agencies use this for client prospecting?",
    a: "Yes. It was designed for DTC brands, ecommerce teams, and creative agencies that need a repeatable audit they can run before a sales call or strategy workshop.",
  },
  {
    q: "Does it guarantee AI shopping visibility?",
    a: "No. It scores the signals that make stores easier for AI systems to crawl, understand, cite, and recommend. Real visibility also depends on authority, reviews, brand demand, and third-party mentions.",
  },
];

export default function StoreSeoAuditPage() {
  return (
    <div className="page-enter">
      <JsonLd data={faqPageSchema(faqs)} />

      <section style={{ padding: "32px 0 24px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Free ecommerce SEO audit</span>
          <h1
            className="h-display"
            data-reveal-text
            style={{ maxWidth: 940, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Audit any store for Google, <span className="it">AI search,</span> and shoppers.
          </h1>
          <p
            className="lede"
            data-reveal
            style={{ marginTop: 24, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}
          >
            Paste a store URL. In minutes, get a 0-100 dashboard across technical SEO, product
            schema, content, performance risk signals, image SEO, and AI-search readiness.
          </p>
        </div>
      </section>

      <StoreSeoAuditClient />

      <FaqSection
        heading="About the store SEO audit."
        intro="What the audit checks, how to use it, and what the score means."
        items={faqs}
      />
    </div>
  );
}
