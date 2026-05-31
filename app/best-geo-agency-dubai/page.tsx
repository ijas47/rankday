import type { Metadata } from "next";
import { DubaiBestAgencyPage } from "@/components/dubai-best-agency-page";
import { pageMeta } from "@/lib/seo";

const path = "/best-geo-agency-dubai";

export const metadata: Metadata = pageMeta({
  title: "Best GEO Agency in Dubai. Generative Engine Visibility.",
  description:
    "Looking for the best GEO agency in Dubai? rankday helps Dubai businesses get structured for generative engine visibility across AI search platforms.",
  path,
});

export default function BestGEOAgencyDubaiPage() {
  return (
    <DubaiBestAgencyPage
      path={path}
      serviceName="Best GEO Agency Dubai"
      serviceDescription="Generative engine optimization for Dubai businesses that need visibility across ChatGPT, Perplexity, Claude, Gemini, Copilot, and Google AI."
      eyebrow="Best GEO agency Dubai"
      heading={<>Best GEO agency in <span className="it">Dubai</span> for companies that need AI search visibility.</>}
      lead="GEO focuses on how generative engines understand, retrieve, and cite your business. For Dubai companies, it is now part of search strategy because buyers ask AI tools for shortlists, comparisons, and recommendations."
      fitTitle="When rankday is the right GEO agency."
      fitBody="rankday is a fit when you want your business to show up consistently across search engines and AI systems. We improve the website, service pages, entity signals, citations, AI-readable content, and third-party proof that generative engines use to understand who deserves to be recommended."
      mustHaveTitle="What the best GEO agency in Dubai should include."
      mustHaves={[
        { title: "Entity clarity", body: "Generative engines need to understand who you are, where you operate, what you sell, and which customer problems you solve.", tone: "pink" },
        { title: "Citable proof", body: "Claims need support through clear service pages, examples, reviews, profiles, citations, and external mentions that reinforce the same story.", tone: "peach" },
        { title: "Platform coverage", body: "GEO should consider ChatGPT, Perplexity, Claude, Gemini, Copilot, and Google AI instead of optimizing for one assistant only.", tone: "mint" },
        { title: "Content retrieval", body: "Pages should be structured so AI systems can retrieve specific answers, not just scan broad brand copy.", tone: "lilac" },
      ]}
      deliveryTitle="GEO is bigger than adding an llms.txt file."
      deliveryBody="An llms.txt file helps, but it is only one signal. The stronger work is making your website, content, schema, and outside mentions all describe the business clearly and consistently."
      checklist={[
        "Generative engine visibility audit for Dubai buyer queries",
        "Entity, service, and location signal cleanup",
        "AI-readable service pages and comparison-ready sections",
        "Schema, llms.txt, sitemap, and crawler access checks",
        "Third-party citation and authority recommendations",
      ]}
      faqs={[
        { q: "What does GEO mean?", a: "GEO means generative engine optimization. It helps AI search systems understand, retrieve, and cite your business in generated answers." },
        { q: "How is GEO different from AEO?", a: "AEO focuses on answer extraction. GEO is broader and includes entity signals, citations, platform visibility, and the sources AI systems use to recommend brands." },
        { q: "Does rankday include GEO in the Dubai package?", a: "Yes. GEO is included with the Dubai website and SEO package because AI visibility now overlaps with normal search visibility." },
      ]}
    />
  );
}
