import type { Metadata } from "next";
import { DubaiBestAgencyPage } from "@/components/dubai-best-agency-page";
import { pageMeta } from "@/lib/seo";

const path = "/best-aeo-agency-dubai";

export const metadata: Metadata = pageMeta({
  title: "Best AEO Agency in Dubai. Get Cited by AI Search.",
  description:
    "Looking for the best AEO agency in Dubai? rankday structures your website for Google AI Overviews, ChatGPT, Perplexity, Claude, and Gemini visibility.",
  path,
});

export default function BestAEOAgencyDubaiPage() {
  return (
    <DubaiBestAgencyPage
      path={path}
      serviceName="Best AEO Agency Dubai"
      serviceDescription="Answer engine optimization for Dubai businesses that want to be cited in AI answers, Google AI Overviews, ChatGPT, Perplexity, Claude, and Gemini."
      eyebrow="Best AEO agency Dubai"
      heading={<>Best AEO agency in <span className="it">Dubai</span> for brands that want to appear in AI answers.</>}
      lead="AEO helps your business become easier for AI systems to understand, summarize, and cite. For Dubai buyers, that matters because more research now starts in AI answers before anyone clicks a website."
      fitTitle="When rankday is the right AEO agency."
      fitBody="rankday is a fit when you want your website to answer buyer questions clearly and be structured for AI discovery. We combine page architecture, concise answer blocks, FAQs, schema, entity consistency, and supporting content so AI systems can understand what you do and when to recommend you."
      mustHaveTitle="What the best AEO agency in Dubai should include."
      mustHaves={[
        { title: "Answer-ready content", body: "Important pages need direct, self-contained answers to buyer questions. AI systems extract clear passages more easily than vague marketing copy.", tone: "pink" },
        { title: "Entity consistency", body: "Your brand, services, locations, founders, contact details, and proof points should be consistent across your website and trusted external sources.", tone: "peach" },
        { title: "Structured data", body: "Service, FAQ, local business, article, and organization schema help machines understand what each page represents.", tone: "mint" },
        { title: "Search alignment", body: "AEO should not replace SEO. Google AI Overviews still depend heavily on normal search quality, crawlability, and relevance signals.", tone: "lilac" },
      ]}
      deliveryTitle="AEO works best when the website is already clear."
      deliveryBody="That is why rankday pairs AEO with website and SEO work. We do not just add AI language to weak pages. We rebuild the pages so people and AI systems can both understand the offer."
      checklist={[
        "AI visibility audit for priority Dubai searches",
        "Answer blocks, FAQs, schema, and service definitions",
        "llms.txt and AI crawler access checks",
        "Content sections for ChatGPT, Perplexity, Claude, Gemini, and Google AI",
        "Monthly visibility checks during the 90-day project",
      ]}
      faqs={[
        { q: "What does AEO mean?", a: "AEO means answer engine optimization. It is the process of structuring content so AI answers and search features can understand and cite the business." },
        { q: "Is AEO separate from SEO?", a: "No. AEO should sit on top of SEO. The page still needs crawlability, relevance, authority, and useful content to perform." },
        { q: "Can AEO guarantee AI citations?", a: "No agency can guarantee every AI answer. rankday improves the structure, authority, and clarity needed to increase the chance of being cited." },
      ]}
    />
  );
}
