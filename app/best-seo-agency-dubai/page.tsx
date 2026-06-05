import type { Metadata } from "next";
import { DubaiBestAgencyPage } from "@/components/dubai-best-agency-page";
import { pageMeta } from "@/lib/seo";

const path = "/best-seo-agency-dubai";

export const metadata: Metadata = pageMeta({
  title: "Best SEO Agency in Dubai. Website + Top 3 in 90 Days.",
  description:
    "Looking for the best SEO agency in Dubai? rankday rebuilds your website, ranks agreed keywords, and adds AI citation visibility in one 90-day AED package.",
  path,
});

export default function BestSEOAgencyDubaiPage() {
  return (
    <DubaiBestAgencyPage
      path={path}
      serviceName="Best SEO Agency Dubai"
      serviceDescription="Website rebuild, technical SEO, local SEO, content, citations, and AI visibility for Dubai businesses in one fixed 90-day package."
      eyebrow="Best SEO agency Dubai"
      heading={<>Best SEO agency in <span className="it">Dubai</span> for businesses that need rankings, not retainers.</>}
      lead="The right SEO agency in Dubai should not just send reports. It should fix the website, target buyer keywords, build local authority, and show measurable ranking movement inside a fixed delivery window."
      fitTitle="When rankday is the right SEO agency."
      fitBody="rankday is built for Dubai businesses that want one accountable team for the website, SEO, local search, content, and AI search visibility. We are not a monthly retainer agency. We scope the keywords, rebuild the pages, publish the assets, track movement, and keep working if the agreed ranking target is not met."
      mustHaveTitle="What the best SEO agency in Dubai should include."
      mustHaves={[
        { title: "Technical fixes first", body: "The site must be crawlable, fast, indexable, and structured before content work can compound. We clean the foundation before scaling pages.", tone: "pink" },
        { title: "Local search coverage", body: "Dubai buyers search by area, service, language, and urgency. Google Business Profile, citations, and location intent need to be part of the scope.", tone: "peach" },
        { title: "Content mapped to revenue", body: "Keywords should map to services, industries, and buyer questions. We avoid vanity traffic and build pages that can turn searches into enquiries.", tone: "mint" },
        { title: "AI visibility included", body: "SEO now overlaps with AEO and GEO. We structure pages so ChatGPT, Perplexity, Claude, Gemini, and Google AI can understand the business.", tone: "lilac" },
      ]}
      deliveryTitle="Rankings need a page, proof, and a reason to trust you."
      deliveryBody="That is why the Dubai SEO package includes the website rebuild and not just keyword work. If the page experience is weak, links and articles cannot carry the full result."
      checklist={[
        "Keyword map for Dubai and UAE buyer searches",
        "Website rebuild or page rebuild where the current site blocks ranking",
        "Technical SEO, metadata, internal links, and schema setup",
        "Google Business Profile rebuild for local visibility",
        "Citation building and content pages for authority",
      ]}
      faqs={[
        { q: "Is this a replacement for a monthly SEO retainer?", a: "Yes. rankday is a fixed 90-day project, not an open-ended monthly retainer. The standard Dubai package starts at AED 18,000." },
        { q: "Can rankday work with an existing Dubai website?", a: "Yes. If the existing site is strong enough, we improve it. If it is blocking rankings, we rebuild the pages that matter." },
        { q: "Do you support Arabic SEO?", a: "Yes. Arabic is available for UAE projects at no extra cost when it is needed for the target audience." },
      ]}
    />
  );
}
