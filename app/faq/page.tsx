import type { Metadata } from "next";
import { FAQClient, faqs } from "./faq-client";

export const metadata: Metadata = {
  title: "SEO and AEO FAQ. Common Questions Answered.",
  description:
    "Questions about 90-day SEO, AI citation strategy, AEO, guarantees, pricing, and how Rankday works. Honest answers, no sales spin.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClient />
    </>
  );
}
