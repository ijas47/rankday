import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("ai-search-optimisation-for-b2b-saas")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        B2B SaaS buyers now ask ChatGPT and Perplexity for tool recommendations before they ever open Google. The buyer who would have spent two hours comparing CRMs on G2 in 2022 now asks ChatGPT "what's the best CRM for a 10-person sales team in B2B?" and gets a 2-paragraph answer naming 3 to 5 tools.
      </P>
      <P>
        If your tool is not in that answer, you lost the deal before you knew it existed. Here is how SaaS companies should approach AI search optimisation.
      </P>

      <H2>How B2B SaaS buyers actually research in 2026</H2>
      <P>
        Updated buying journey:
      </P>
      <UL>
        <LI><Strong>Problem awareness:</Strong> "Why is our team struggling with [problem]?" Asked of ChatGPT or Claude.</LI>
        <LI><Strong>Solution awareness:</Strong> "What kind of tool would help us with [problem]?" AI describes the category.</LI>
        <LI><Strong>Vendor shortlist:</Strong> "What are the best [category] tools for [our specific situation]?" AI names 3 to 5 specific tools.</LI>
        <LI><Strong>Comparison:</Strong> "Compare [tool A] vs [tool B] for [use case]." AI provides side-by-side.</LI>
        <LI><Strong>Decision:</Strong> Visit the named tools' websites. Often skip Google entirely.</LI>
      </UL>
      <P>
        At each stage above, traditional SEO matters less than it used to. AEO matters more.
      </P>

      <H2>The signals that get a SaaS tool cited by AI</H2>

      <H3>1. Presence on the directories AI engines pull from</H3>
      <P>
        For B2B SaaS specifically:
      </P>
      <UL>
        <LI><Strong>G2:</Strong> the highest-weight source for B2B SaaS recommendations. Get listed, get verified, encourage reviews.</LI>
        <LI><Strong>Capterra:</Strong> sister to G2. Lower citation weight but still relevant.</LI>
        <LI><Strong>Software Advice, GetApp, TrustRadius:</Strong> secondary B2B platforms.</LI>
        <LI><Strong>Product Hunt:</Strong> mentions help discovery, especially for newer tools.</LI>
        <LI><Strong>Hacker News:</Strong> if your tool gets organic discussion there, AI engines notice.</LI>
        <LI><Strong>LinkedIn:</Strong> company page and founder presence both feed B2B AI citations.</LI>
        <LI><Strong>Industry-specific platforms:</Strong> AppExchange (Salesforce), HubSpot Marketplace, Slack App Directory, etc.</LI>
      </UL>

      <H3>2. Category positioning</H3>
      <P>
        AI engines categorise tools. To be cited as "best CRM," you have to be in the CRM category in the model's understanding.
      </P>
      <P>
        How to influence category positioning:
      </P>
      <UL>
        <LI>Use category language consistently across your site, marketing, and platforms</LI>
        <LI>Get listed in the right category on G2, Capterra, etc.</LI>
        <LI>Earn editorial mentions that categorise you correctly</LI>
        <LI>Run paid placement on category-defining searches if needed to establish positioning</LI>
      </UL>

      <H3>3. Comparison content</H3>
      <P>
        AI engines synthesise comparisons by pulling from comparison content. If "yourtool vs competitor" comparison articles exist (on your site, on competitor sites, on third-party blogs), the AI has material to work with.
      </P>
      <P>
        Build dedicated comparison pages for your top 5 to 10 competitors. Be honest about strengths and weaknesses. AI engines penalise content that reads as pure marketing.
      </P>

      <H3>4. Use-case content</H3>
      <P>
        AI buyers often ask "what's the best [category] for [specific use case]." If your content explicitly answers that question, AI can lift it.
      </P>
      <P>
        Examples:
      </P>
      <UL>
        <LI>"Best CRM for solo financial advisors"</LI>
        <LI>"Best project management tool for remote agencies"</LI>
        <LI>"Best email tool for B2B newsletters"</LI>
      </UL>
      <P>
        Build dedicated landing pages for each use case you want to be recommended for.</P>

      <H3>5. Reviews and ratings</H3>
      <P>
        On G2 specifically, the number of reviews, recency, and rating all affect citation likelihood. A G2 listing with 200 reviews at 4.7 stars gets cited more than one with 20 reviews at 4.8.
      </P>
      <P>
        Build a review collection system that prompts customers post-onboarding and at renewal moments.
      </P>

      <H3>6. Schema markup</H3>
      <P>
        Apply SoftwareApplication or Service schema with:
      </P>
      <UL>
        <LI>name, description, applicationCategory</LI>
        <LI>offers (pricing tiers if public)</LI>
        <LI>aggregateRating (if you can validate the review data)</LI>
        <LI>operatingSystem, requirementsDescription</LI>
        <LI>publisher (Organization reference)</LI>
      </UL>

      <H2>What changes in SaaS content strategy</H2>

      <H3>Less generic content, more specific</H3>
      <P>
        "What is a CRM" generic guides drove SEO traffic in 2018. They drive almost no traffic now because AI Overviews answer the question directly.
      </P>
      <P>
        Specific use-case content drives the remaining traffic. "How a solo financial advisor uses [your tool] to manage 200 client accounts" is the kind of content that ranks and converts.
      </P>

      <H3>Comparison content as a primary asset</H3>
      <P>
        Comparison pages were always valuable. Now they are critical. Each comparison page is:
      </P>
      <UL>
        <LI>A SEO asset (ranks for "yourtool vs competitor" queries)</LI>
        <LI>An AEO asset (pulled into AI comparisons)</LI>
        <LI>A conversion asset (catches buyers at decision stage)</LI>
      </UL>

      <H3>Founder and team content</H3>
      <P>
        B2B SaaS buyers want to know who is behind the tool. Founder LinkedIn presence, podcast appearances, conference talks, and bylined articles all feed into AI engines' understanding of the company.
      </P>
      <P>
        Investing in founder thought leadership is no longer optional for B2B SaaS visibility in AI search.
      </P>

      <H3>Documentation as marketing</H3>
      <P>
        Public-facing docs get crawled by AI engines and used to answer "how does [tool] do X?" questions. Good public docs are an AI search asset.
      </P>

      <H2>Testing your AI search visibility</H2>
      <P>
        Run these queries weekly on ChatGPT, Perplexity, and Claude. Note whether your tool appears:
      </P>
      <UL>
        <LI>"Best [your category] for [primary ICP]"</LI>
        <LI>"What's a good alternative to [your main competitor]?"</LI>
        <LI>"Compare [your tool] vs [main competitor]"</LI>
        <LI>"What's the cheapest [your category] for small businesses?"</LI>
        <LI>"What's the most enterprise-ready [your category]?"</LI>
      </UL>
      <P>
        Track over time. Improvements in AI citations correlate with the work above.
      </P>

      <Callout tone="lilac">
        Most B2B SaaS companies are still doing only SEO in 2026. The window for being one of the first tools cited by AI engines in your category is open for another 12 to 18 months. After that, the established citations will be much harder to dislodge.
      </Callout>

      <H2>What does NOT work for SaaS AEO</H2>
      <UL>
        <LI><Strong>Spammy "alternative to [competitor]" pages</Strong> with no real comparison value. AI engines detect and ignore.</LI>
        <LI><Strong>Mass-generated programmatic content.</Strong> Pages like "best CRM for [city]" generated for hundreds of cities. Quality issues hurt the brand's authority signal.</LI>
        <LI><Strong>Paid review schemes.</Strong> Detected by G2 and similar platforms. Penalties include listing removal.</LI>
        <LI><Strong>Buying ranks on third-party "best X tools" articles.</Strong> Often fails the AI's quality filter and damages authority.</LI>
      </UL>

      <H2>The minimum viable B2B SaaS AEO playbook</H2>
      <P>
        If you are starting from scratch, do these in order:
      </P>
      <UL>
        <LI>1. Get listed on G2, Capterra, and 3 to 5 niche platforms relevant to your category</LI>
        <LI>2. Apply SoftwareApplication schema and Organization schema across the site</LI>
        <LI>3. Build comparison pages for your top 5 competitors</LI>
        <LI>4. Build 5 to 10 use-case landing pages for specific ICP segments</LI>
        <LI>5. Set up a review collection system that runs continuously</LI>
        <LI>6. Optimise founder LinkedIn for category positioning</LI>
        <LI>7. Earn 3 to 5 editorial mentions in industry publications per quarter</LI>
        <LI>8. Test AI visibility weekly and iterate</LI>
      </UL>

      <H2>What Rankday does for SaaS</H2>
      <P>
        Our Growth plan ($7,900) is built for B2B SaaS. It includes comparison content, use-case landing pages, SoftwareApplication schema, LinkedIn optimisation, third-party placement, and bi-weekly AI visibility audits.
      </P>
      <P>
        <A href="/seo-for-saas">See the SaaS-specific page</A> or <A href="/pricing">see the full pricing.</A>
      </P>
    </BlogPostLayout>
  );
}
