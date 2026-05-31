import type { Metadata } from "next";
import { DubaiBestAgencyPage } from "@/components/dubai-best-agency-page";
import { pageMeta } from "@/lib/seo";

const path = "/best-web-design-agency-dubai";

export const metadata: Metadata = pageMeta({
  title: "Best Web Design Agency in Dubai. Built to Rank in 90 Days.",
  description:
    "Looking for the best web design agency in Dubai? rankday builds search-ready websites with SEO, AEO, analytics, and conversion structure included.",
  path,
});

export default function BestWebDesignAgencyDubaiPage() {
  return (
    <DubaiBestAgencyPage
      path={path}
      serviceName="Best Web Design Agency Dubai"
      serviceDescription="Search-ready web design for Dubai businesses with SEO, AEO, analytics, local search, and conversion structure included."
      eyebrow="Best web design agency Dubai"
      heading={<>Best web design agency in <span className="it">Dubai</span> for websites that need to rank and convert.</>}
      lead="A good Dubai website should look credible, load quickly, explain the offer, and help buyers take action. The best web design agency should also build the SEO foundation before the site goes live."
      fitTitle="When rankday is the right web design agency."
      fitBody="rankday is a fit when you need a business website that is not just a brochure. We build the pages, metadata, internal links, schema, conversion sections, and analytics foundation together so the site can compete in Google and AI search from day one."
      mustHaveTitle="What the best web design agency in Dubai should include."
      mustHaves={[
        { title: "Search-ready structure", body: "The sitemap, URL structure, page titles, headings, and internal links need to match how Dubai buyers search before design polish is added.", tone: "pink" },
        { title: "Conversion-first pages", body: "Service pages should show pricing signals, proof, process, objections, and clear calls to action. Pretty sections alone do not create enquiries.", tone: "peach" },
        { title: "Fast mobile experience", body: "Dubai buyers research on mobile. Layout, images, forms, WhatsApp links, and tap targets need to work cleanly on small screens.", tone: "mint" },
        { title: "SEO and AEO built in", body: "The site should ship with metadata, schema, content blocks, FAQs, and answer-ready structure so it can be understood by search engines and AI systems.", tone: "lilac" },
      ]}
      deliveryTitle="A website should be a ranking asset."
      deliveryBody="The Dubai package combines web design with SEO and AEO because separating them often creates rework. We plan the pages around demand, then design the experience around trust and action."
      checklist={[
        "5 to 7 page website for the standard Dubai package",
        "Service page copy, page metadata, and internal linking",
        "Mobile responsive layouts and conversion CTAs",
        "Schema, analytics, and technical SEO setup",
        "Launch support and 90-day ranking work after the build",
      ]}
      faqs={[
        { q: "Is rankday only a web design agency?", a: "No. rankday combines web design, SEO, AEO, and GEO in one 90-day delivery scope for Dubai businesses." },
        { q: "Can you redesign an existing Dubai business website?", a: "Yes. We can rebuild the full website or replace only the pages that are blocking conversions and rankings." },
        { q: "How much does the Dubai website package cost?", a: "The standard Dubai package starts at AED 18,000 for 90 days of website, SEO, and AI visibility work." },
      ]}
    />
  );
}
