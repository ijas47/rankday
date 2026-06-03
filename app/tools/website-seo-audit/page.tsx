import type { Metadata } from "next";
import { pageMeta, faqPageSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { WebsiteSeoAuditClient } from "./website-seo-audit-client";

export const metadata: Metadata = pageMeta({
  title: "Free Website SEO Audit. Technical, Schema, CWV, AI Search.",
  description:
    "Run a free website SEO audit across technical SEO, entity schema, content quality, Core Web Vitals signals, and AI-search readiness. Built by rankday.",
  path: "/tools/website-seo-audit",
});

const faqs: FaqItem[] = [
  {
    q: "What does the website SEO audit check?",
    a: "It checks technical SEO, entity and service schema, page content, Core Web Vitals signals, and AI-search readiness. The result is a 0-100 score with prioritized fixes.",
  },
  {
    q: "Is this the same as Ahrefs?",
    a: "No single free tool replaces every Ahrefs database feature. This audit is built for fast client-ready diagnostics: crawlability, schema, on-page content, performance signals, and AI-search readiness in one dashboard.",
  },
  {
    q: "Can agencies use this for client prospecting?",
    a: "Yes. It was designed for SEO agencies, web design agencies, consultants, and business owners who need a repeatable audit before a sales call or website strategy workshop.",
  },
  {
    q: "Does it guarantee AI search visibility?",
    a: "No. It scores the signals that make websites easier for AI systems to crawl, understand, cite, and recommend. Real visibility also depends on authority, reviews, brand demand, content depth, and third-party mentions.",
  },
];

export default function StoreSeoAuditPage() {
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
            Audit any website for Google, <span className="it">AI search,</span> and leads.
          </h1>
          <p
            className="lede"
            data-reveal
            style={{ marginTop: 24, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}
          >
            Paste a business website URL. In minutes, get a 0-100 dashboard across technical SEO,
            entity schema, content, Core Web Vitals signals, and AI-search readiness.
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
