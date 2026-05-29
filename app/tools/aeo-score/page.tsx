import type { Metadata } from "next";
import { pageMeta, faqPageSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { AeoClient } from "./aeo-client";

export const metadata: Metadata = pageMeta({
  title: "Free AEO Score. Is Your Site Visible to AI Search?",
  description:
    "Check how visible your website is to ChatGPT, Perplexity, Claude, and Google AI. Free instant AEO score with the exact fixes that get you cited. By Rankday.",
  path: "/tools/aeo-score",
});

const faqs: FaqItem[] = [
  {
    q: "What is an AEO score?",
    a: "An AEO (Answer Engine Optimization) score measures how ready your website is to be cited by AI search engines like ChatGPT, Perplexity, Claude, and Google AI Overviews. It checks AI crawler access, structured data, content structure, and discoverability, then grades the site from 0 to 100.",
  },
  {
    q: "Is the AEO Score tool free?",
    a: "Yes. Enter any URL and get an instant score and category breakdown for free. The full ranked list of fixes is sent to your email at no cost.",
  },
  {
    q: "How is the score calculated?",
    a: "The tool fetches your page and checks four categories: AI crawler access (can GPTBot, ClaudeBot, PerplexityBot, and Google-Extended read your site), structured data (Organization, FAQPage, Service, and Article schema), content structure (a single H1, subheadings, title, meta description, and depth), and discoverability (llms.txt, sitemap, and canonical tags).",
  },
  {
    q: "Does a high score guarantee AI citations?",
    a: "No. The score grades the signals that make a site citable by AI engines, but citation also depends on your authority, reviews, and presence across the web. A strong score removes the technical barriers; building authority is the rest of the work Rankday does in 90 days.",
  },
];

export default function AeoScorePage() {
  return (
    <div className="page-enter">
      <JsonLd data={faqPageSchema(faqs)} />

      <section style={{ padding: "32px 0 24px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Free tool</span>
          <h1
            className="h-display"
            data-reveal-text
            style={{ maxWidth: 880, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            How visible is your site to <span className="it">AI search?</span>
          </h1>
          <p
            className="lede"
            data-reveal
            style={{ marginTop: 24, maxWidth: 660, marginLeft: "auto", marginRight: "auto" }}
          >
            Paste your URL. In a few seconds, see how ready your site is to be cited by ChatGPT,
            Perplexity, Claude, and Google AI — and exactly what to fix.
          </p>
        </div>
      </section>

      <AeoClient />

      <FaqSection
        heading="About the AEO Score."
        intro="What the tool checks and what the score means."
        items={faqs}
      />
    </div>
  );
}
