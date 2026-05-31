import type { Metadata } from "next";
import { pageMeta, faqPageSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { LlmsClient } from "./llms-client";

export const metadata: Metadata = pageMeta({
  title: "Free llms.txt Generator. Build Yours in Seconds.",
  description:
    "Generate an llms.txt for any website, free. Paste a URL and get a ready-to-use llms.txt that helps ChatGPT, Perplexity, Claude, and other AI systems understand your site. By rankday.",
  path: "/tools/llms-txt",
});

const faqs: FaqItem[] = [
  {
    q: "What is an llms.txt file?",
    a: "llms.txt is a plain-text file you place at the root of your website (yoursite.com/llms.txt) that summarizes what your site is about and lists your key pages. It helps AI systems like ChatGPT, Perplexity, and Claude understand your content quickly, the way robots.txt and sitemap.xml help search engines.",
  },
  {
    q: "How does this generator work?",
    a: "Paste your URL. The tool reads your sitemap (or crawls your homepage if there is no sitemap), pulls the title and description of each page, groups them into sections, and writes a ready-to-use llms.txt. You copy or download it and upload it to your site root.",
  },
  {
    q: "Where do I put the llms.txt file?",
    a: "At the root of your domain, so it is reachable at yoursite.com/llms.txt. On most hosts you upload it to your public or root folder. On frameworks like Next.js, put it in your public folder.",
  },
  {
    q: "Is it free?",
    a: "Yes. Generate, copy, and download your llms.txt at no cost, no signup required.",
  },
];

export default function LlmsTxtPage() {
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
            Free <span className="it">llms.txt</span> generator
          </h1>
          <p
            className="lede"
            data-reveal
            style={{ marginTop: 24, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
          >
            Paste your URL. Get a ready-to-use llms.txt that helps ChatGPT, Perplexity, Claude, and
            other AI systems understand your site. Copy it, upload it, done.
          </p>
        </div>
      </section>

      <LlmsClient />

      <FaqSection
        heading="About llms.txt"
        intro="What the file is and how to use it."
        items={faqs}
      />
    </div>
  );
}
