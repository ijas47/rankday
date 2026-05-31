import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("common-seo-myths-debunked")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        SEO is a field full of half-truths, outdated advice, and confident misinformation. Below are 12 myths that still circulate in 2026, with what is actually true and what to do instead.
      </P>

      <H2>Myth 1: "Meta keywords still matter"</H2>
      <P>
        <Strong>The myth:</Strong> Add a meta keywords tag stuffed with target keywords.
      </P>
      <P>
        <Strong>Reality:</Strong> Google has ignored the meta keywords tag since 2009. Bing has ignored it for almost as long. It does nothing.
      </P>
      <P>
        <Strong>Do this instead:</Strong> Focus on meta titles and meta descriptions. Those still matter.
      </P>

      <H2>Myth 2: "More content = better rankings"</H2>
      <P>
        <Strong>The myth:</Strong> Publish a blog post every day. More words = better rankings.
      </P>
      <P>
        <Strong>Reality:</Strong> Mass-published thin content actively hurts rankings under Google's Helpful Content update. Quality matters more than quantity.
      </P>
      <P>
        <Strong>Do this instead:</Strong> Publish fewer, deeper, more useful articles. One 2,500-word piece that genuinely answers a question outperforms 10 superficial 500-word posts.
      </P>

      <H2>Myth 3: "Keyword density should be X%"</H2>
      <P>
        <Strong>The myth:</Strong> Aim for 2% keyword density. Or 3%. Or whatever the SEO blog of the week says.
      </P>
      <P>
        <Strong>Reality:</Strong> Keyword density as a target is meaningless. Google uses semantic understanding, not bag-of-words frequency counting. Forcing exact keyword repetition into prose actively hurts.
      </P>
      <P>
        <Strong>Do this instead:</Strong> Write naturally about the topic. Use the keyword where it fits. Use related terms, synonyms, and topical variations. Google's algorithm understands semantic relationships.
      </P>

      <H2>Myth 4: "Domain age is a ranking factor"</H2>
      <P>
        <Strong>The myth:</Strong> Buy aged domains because Google ranks older domains higher.
      </P>
      <P>
        <Strong>Reality:</Strong> Google has stated repeatedly that domain age is not a direct ranking factor. What old domains have is accumulated signals: backlinks, brand mentions, content. New domains rank slowly because they lack those signals, not because of the age itself.
      </P>
      <P>
        <Strong>Do this instead:</Strong> Build the signals that aged domains have organically. Directory citations, backlinks, real traffic, fresh content.
      </P>

      <H2>Myth 5: "You need to publish content every day"</H2>
      <P>
        <Strong>The myth:</Strong> Daily publishing keeps your site "fresh" for Google.
      </P>
      <P>
        <Strong>Reality:</Strong> Frequency of publishing is not a ranking factor. Freshness matters for some queries (news, recent events), but most queries benefit from comprehensive evergreen content that gets updated when needed.
      </P>
      <P>
        <Strong>Do this instead:</Strong> Publish on a schedule you can sustain with quality. Once a week of strong content beats daily of weak content.
      </P>

      <H2>Myth 6: "Bounce rate is a Google ranking factor"</H2>
      <P>
        <Strong>The myth:</Strong> High bounce rate hurts your rankings.
      </P>
      <P>
        <Strong>Reality:</Strong> Google has stated multiple times that bounce rate (as defined in Google Analytics) is not a direct ranking signal. User satisfaction is, but bounce rate is a poor proxy. A high bounce rate on a page that answers the user's question completely is fine.
      </P>
      <P>
        <Strong>Do this instead:</Strong> Focus on satisfying the searcher's intent. Whether they then click around your site or leave is mostly irrelevant.
      </P>

      <H2>Myth 7: "Submit your URL to Google through their submission form"</H2>
      <P>
        <Strong>The myth:</Strong> There is a Google URL submission form that gets pages indexed faster.
      </P>
      <P>
        <Strong>Reality:</Strong> The old "submit a URL" form was deprecated years ago. The current method is to use Google Search Console's URL Inspection tool to request indexing.
      </P>
      <P>
        <Strong>Do this instead:</Strong> Verify Search Console for your domain. Submit your XML sitemap. Use URL Inspection to request indexing for individual important pages.
      </P>

      <H2>Myth 8: "Link to authoritative external sites to boost SEO"</H2>
      <P>
        <Strong>The myth:</Strong> Adding outbound links to high-DR sites passes their authority to you.
      </P>
      <P>
        <Strong>Reality:</Strong> Outbound links do not directly boost your rankings. They can help by adding context to your content (linking to studies, sources, definitions), but the act of linking out is not itself a ranking factor.
      </P>
      <P>
        <Strong>Do this instead:</Strong> Link to external sources when it genuinely helps the reader. Don't manufacture outbound links for SEO purposes.
      </P>

      <H2>Myth 9: "Length matters: longer content always wins"</H2>
      <P>
        <Strong>The myth:</Strong> 3,000+ word articles always rank better than shorter ones.
      </P>
      <P>
        <Strong>Reality:</Strong> Length correlates with ranking because longer content tends to be more comprehensive. But length alone is not a ranking factor. A 500-word answer that satisfies the query can outrank a 3,000-word answer that drowns the user in fluff.
      </P>
      <P>
        <Strong>Do this instead:</Strong> Match length to query complexity. Simple queries: short answers. Complex queries: long answers. Quality over word count.
      </P>

      <H2>Myth 10: "Buying expensive SEO tools is required for results"</H2>
      <P>
        <Strong>The myth:</Strong> You need Ahrefs and Semrush subscriptions to do SEO.
      </P>
      <P>
        <Strong>Reality:</Strong> The free tools (Google Search Console, Google Analytics, Bing Webmaster Tools, PageSpeed Insights, Mobile-Friendly Test, Schema Validator) cover 80% of what most businesses need. Paid tools add precision and convenience, not capability.
      </P>
      <P>
        <Strong>Do this instead:</Strong> Use free tools first. Add paid tools when you genuinely need their specific features, not because the field treats them as required.
      </P>

      <H2>Myth 11: "Social signals (likes, shares) directly boost SEO"</H2>
      <P>
        <Strong>The myth:</Strong> More social shares = better Google rankings.
      </P>
      <P>
        <Strong>Reality:</Strong> Google has stated that social signals are not direct ranking factors. Social activity can indirectly help (driving traffic, earning backlinks from the resulting visibility), but likes and shares themselves do not move rankings.
      </P>
      <P>
        <Strong>Do this instead:</Strong> Use social to drive traffic and brand visibility. Do not chase shares as an SEO tactic.
      </P>

      <H2>Myth 12: "AI content always hurts SEO"</H2>
      <P>
        <Strong>The myth:</Strong> Any AI-assisted content is automatically penalised by Google.
      </P>
      <P>
        <Strong>Reality:</Strong> Google has clarified that AI-generated content is not inherently penalised. Low-quality content is, regardless of who wrote it. AI used to assist a human expert who edits, fact-checks, and adds genuine insight is fine. AI used to mass-produce thin filler is not.
      </P>
      <P>
        <Strong>Do this instead:</Strong> Use AI as a tool for research, outlining, and first drafts. Have a real expert edit, fact-check, and add original insight before publishing. The output should be content a knowledgeable human stands behind.
      </P>

      <Callout tone="mint">
        Common thread. Most SEO myths persist because they were once partially true. Meta keywords used to matter (in 1999). Daily publishing helped (in 2010 with weak competition). Keyword density used to be measured (in 2005). The field moves. Old advice does not.
      </Callout>

      <H2>What actually matters in 2026</H2>
      <P>
        Cutting through the myths, the things that actually drive rankings in 2026:
      </P>
      <UL>
        <LI>Technical foundation (Core Web Vitals, mobile-first, schema, clean URLs)</LI>
        <LI>Content that genuinely satisfies search intent</LI>
        <LI>E-E-A-T signals (real authors, real expertise, real authority)</LI>
        <LI>Quality backlinks from relevant authoritative sites</LI>
        <LI>Internal linking that signals page priority</LI>
        <LI>Brand consistency across the web (NAP, schema, named author)</LI>
        <LI>For local: Google Business Profile and citation network</LI>
        <LI>For AEO: presence on the platforms AI engines pull from</LI>
      </UL>
      <P>
        Everything else is noise. Focus on these. Ignore the myths.
      </P>

      <H2>What rankday does</H2>
      <P>
        We focus exclusively on the actual ranking factors. No keyword density obsession, no daily blog churn, no chasing social shares. Just the foundational work that actually compounds: technical SEO, content that satisfies intent, real authority signals, and AI citation work.
      </P>
      <P>
        <A href="/how-it-works">See the 90-day breakdown</A> or <A href="/pricing">see the pricing.</A>
      </P>
    </BlogPostLayout>
  );
}
