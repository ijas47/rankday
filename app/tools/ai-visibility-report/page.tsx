import type { Metadata } from "next";
import { pageMeta, faqPageSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { AUDIT_PRICE_RANGE, FREE_PROMPT_COUNT, FULL_PROMPT_COUNT } from "@/lib/ai-visibility-report";
import { AiVisibilityReportClient } from "./report-client";

export const metadata: Metadata = pageMeta({
  title: "Free AI Visibility Report. Buyer Prompts + Fixes.",
  description:
    "Free AI visibility report with zero AI API cost: 20 buyer prompts, site readiness signals, and 5 fixes. Live ChatGPT, Perplexity, and Gemini mention checks available as a paid audit. By rankday.",
  path: "/tools/ai-visibility-report",
});

const faqs: FaqItem[] = [
  {
    q: "Does the free report call ChatGPT or other AI APIs?",
    a: "No. The free tool never calls paid AI APIs. It generates a tailored buyer-prompt plan, runs free HTTP site-readiness checks (same cost class as our AEO Score), and gives five concrete fixes. Free tools are not cost centres.",
  },
  {
    q: "What do I get for free?",
    a: `A ${FULL_PROMPT_COUNT}-prompt buyer plan for your brand, industry, and market (first ${FREE_PROMPT_COUNT} visible immediately; full list with email), optional site readiness gaps, and five prioritized fixes. Plus a clear path to a paid live-engine audit or the 90-day implementation program.`,
  },
  {
    q: `What does the ${AUDIT_PRICE_RANGE} full audit include?`,
    a: `rankday runs your prompt set live across ChatGPT, Perplexity, and Gemini under controlled spend (paying audits only). You get mentions, competitors, citations, sentiment signals, and a prioritized action report — typically within about 48 hours after confirmation.`,
  },
  {
    q: "How is this different from the free AEO Score?",
    a: "AEO Score grades whether your website is technically ready for AI crawlers and citations. This report focuses on the buyer questions AI answers for your category and what to publish/earn so you can get recommended. Free still uses only free signals; live mention proof is paid.",
  },
  {
    q: "Will you implement the fixes?",
    a: "Yes. The report ends with rankday’s 90-day program: website, SEO, AEO, citations, and tracking — one price, with a top-3 ranking guarantee on agreed keywords.",
  },
];

export default function AiVisibilityReportPage() {
  return (
    <div className="page-enter">
      <JsonLd data={faqPageSchema(faqs)} />

      <section style={{ padding: "32px 0 24px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Free · zero AI API cost · Full audit {AUDIT_PRICE_RANGE}</span>
          <h1
            className="h-display"
            data-reveal-text
            style={{ maxWidth: 920, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Your AI visibility <span className="it">prompt plan</span>
          </h1>
          <p
            className="lede"
            data-reveal
            style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}
          >
            Free report: {FULL_PROMPT_COUNT} buyer prompts, free site readiness signals, and five fixes.
            Live “does ChatGPT mention you?” checks stay in the paid audit — so free tools never burn model budget.
          </p>
        </div>
      </section>

      <AiVisibilityReportClient />

      <div style={{ marginTop: 8, textAlign: "center", padding: "0 16px 8px" }}>
        <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 8 }}>
          Ready for hands-off results instead of just a plan?
        </p>
        <a
          href="https://wa.me/971565981209?text=I%20want%20rankday%20to%20implement%20my%20AI%20visibility%20fixes%20in%2090%20days"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
        >
          We implement this in 90 days
        </a>
      </div>

      <FaqSection
        heading="About the AI Visibility Report."
        intro="What is free, what is paid, and why free never calls AI APIs."
        items={faqs}
      />
    </div>
  );
}
