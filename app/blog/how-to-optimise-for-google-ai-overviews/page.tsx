import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("how-to-optimise-for-google-ai-overviews")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Google AI Overviews now appear above traditional search results for a growing share of queries. They get clicks before organic listings do. Many websites have already lost meaningful organic traffic to them.
      </P>
      <P>
        Here is how to get your content pulled into AI Overviews, and how to recover traffic if you have already lost it.
      </P>

      <H2>What Google AI Overviews are</H2>
      <P>
        AI Overviews are AI-generated summary answers that appear at the top of Google search results for certain queries. They pull from indexed web content and synthesise it into a single paragraph (or sometimes a structured list) that directly answers the user's question.
      </P>
      <P>
        Below the Overview, traditional organic results still appear. Users can scroll past the Overview to see them, but many users do not. Click-through rates on top organic results have dropped 30 to 60% on queries where Overviews appear.
      </P>
      <P>
        AI Overviews are not consistent across queries. Some queries trigger an Overview every time. Some never. Some trigger it for some users and not others. Google's internal logic decides when an Overview adds value.
      </P>

      <H2>Which queries trigger AI Overviews</H2>
      <P>
        Based on observation since the feature rolled out:
      </P>
      <UL>
        <LI><Strong>Informational queries:</Strong> "how does X work", "what is X", "why does X happen". Almost always trigger Overviews.</LI>
        <LI><Strong>Comparison queries:</Strong> "X vs Y", "difference between X and Y". Frequently trigger Overviews.</LI>
        <LI><Strong>List queries:</Strong> "best X", "top X for Y", "X compared". Sometimes trigger Overviews with structured lists.</LI>
        <LI><Strong>How-to queries:</Strong> "how to do X". Often trigger Overviews with step-by-step responses.</LI>
        <LI><Strong>Transactional queries:</Strong> "buy X near me", "X price". Rarely trigger Overviews. Google still favours local pack and shopping results here.</LI>
        <LI><Strong>Brand or navigational queries:</Strong> "Acme Corp website". Rarely trigger Overviews.</LI>
      </UL>

      <H2>How Google AI Overviews choose source content</H2>
      <P>
        Google has not published a complete spec, but the signals are roughly:
      </P>
      <UL>
        <LI><Strong>Content that already ranks well.</Strong> Sources for Overviews are usually pulled from the top 10 organic results, sometimes the top 20.</LI>
        <LI><Strong>Content that directly answers the question.</Strong> Pages structured as Q&A or with clear topic headings get pulled more often than narrative articles.</LI>
        <LI><Strong>Content with high authority.</Strong> Domains with strong backlink profiles and editorial reputation are sourced more often.</LI>
        <LI><Strong>Content with structured data.</Strong> Schema markup (especially FAQPage, HowTo, Article) signals what a page is about.</LI>
        <LI><Strong>Content that is current.</Strong> Recently updated pages are favoured for queries where freshness matters.</LI>
        <LI><Strong>Content with author attribution.</Strong> Pages with named authors and credentials get pulled more often than anonymous content.</LI>
      </UL>

      <H2>How to optimise your content for AI Overviews</H2>

      <H3>1. Structure for direct answers</H3>
      <P>
        Open each section with a 1 to 3 sentence direct answer to a specific question. Follow with the details.
      </P>
      <P>
        Bad: a 4-paragraph narrative leading to an implicit answer.
      </P>
      <P>
        Good: "[Direct answer in one sentence]. [Two to three sentences of qualification.]" Then the supporting detail.
      </P>
      <P>
        AI Overviews can lift that opening sentence cleanly. Narrative-style content is harder to extract.
      </P>

      <H3>2. Use question-shaped headings</H3>
      <P>
        H2s and H3s formatted as questions ("What is X?", "How does X work?", "Why does X matter?") match query patterns and get pulled into Overviews more often.
      </P>
      <P>
        Generic headings like "Overview" or "About" do not.
      </P>

      <H3>3. Apply FAQPage and HowTo schema</H3>
      <P>
        FAQPage schema marks up question-answer pairs as structured data. HowTo schema marks up step-by-step instructions.
      </P>
      <P>
        Both are heavily used by Google AI Overviews. Pages with these schemas are pulled more frequently than equivalent content without them.
      </P>

      <H3>4. Write concise, declarative sentences</H3>
      <P>
        AI Overviews favour content that can be lifted as standalone statements. Long, hedged, qualifier-heavy prose is harder to extract.
      </P>
      <P>
        Compare:
      </P>
      <UL>
        <LI><Strong>Hard to lift:</Strong> "While it may depend on various factors, generally speaking, SEO can take a considerable amount of time before measurable results become apparent in most cases."</LI>
        <LI><Strong>Easy to lift:</Strong> "SEO typically takes 60 to 120 days to produce first rankings, and 6 to 12 months for competitive keywords."</LI>
      </UL>
      <P>
        Both might be technically true. The second gets pulled into Overviews.
      </P>

      <H3>5. Include concrete data and specific numbers</H3>
      <P>
        Specific facts get lifted. Vague claims do not.
      </P>
      <P>
        "Our process is fast" is not Overview-friendly. "Our 90-day process delivers top 3 rankings on 90% of agreed keywords" is.
      </P>

      <H3>6. Add author bylines and credentials</H3>
      <P>
        Article schema with a named author, plus an author bio on the page with credentials, signals to Google that the content has a real expert behind it. Particularly important for YMYL (Your Money, Your Life) topics like health, finance, and legal.
      </P>

      <H3>7. Keep content current</H3>
      <P>
        Add datePublished and dateModified schema. Update old content with refreshed data, current examples, and revised dates. Google favours recently updated content for queries where freshness matters.
      </P>

      <H3>8. Earn external citations</H3>
      <P>
        AI Overviews often cite multiple sources. Content from domains with strong backlink profiles gets included more often. Backlink work for traditional SEO also helps for Overview inclusion.
      </P>

      <Callout tone="lilac">
        Test: search a target informational query on Google. If an AI Overview appears, note which sources it cites. Those are your direct competitors for that query. Study how they structure the answers Google chose to lift.
      </Callout>

      <H2>How to recover traffic if AI Overviews are eating it</H2>
      <P>
        If your traffic has dropped on queries where Overviews now appear, you have three options.
      </P>

      <H3>Option 1: become the source</H3>
      <P>
        Restructure your existing content to be more Overview-friendly using the techniques above. Aim to be the source the Overview cites.
      </P>
      <P>
        Even when Overview clicks are lower than traditional organic clicks, being cited as a source builds brand recognition and drives some clickthrough from users who want more depth.
      </P>

      <H3>Option 2: shift to queries that don't trigger Overviews</H3>
      <P>
        Transactional and brand queries rarely trigger AI Overviews. Shift your content strategy toward queries with commercial intent and away from purely informational queries.
      </P>
      <P>
        "Best SEO agency Dubai" (transactional) is more valuable than "how does SEO work" (informational) for a service business anyway. Optimise toward the queries that convert, not just the ones that drive traffic.
      </P>

      <H3>Option 3: build alternative channels</H3>
      <P>
        Google traffic is no longer the only path. Direct traffic, email, social, AI engines (ChatGPT, Perplexity, Claude), and YouTube all provide alternatives.
      </P>
      <P>
        For service businesses, building visibility on multiple channels reduces the risk of any single algorithm change destroying your pipeline.
      </P>

      <H2>What this means strategically</H2>
      <P>
        Google AI Overviews are part of a larger shift. The search results page is becoming more AI-driven. Informational queries are increasingly resolved at the top of the page without organic clicks. Transactional and commercial queries still drive traffic, but the path is more competitive.
      </P>
      <P>
        For service businesses like yours, the practical response is:
      </P>
      <UL>
        <LI>Optimise existing content for Overview inclusion (structure, schema, freshness)</LI>
        <LI>Prioritise commercial-intent keywords over purely informational ones</LI>
        <LI>Build visibility in AI engines beyond Google (Perplexity, ChatGPT, Claude)</LI>
        <LI>Diversify traffic sources so no single channel determines the business outcome</LI>
      </UL>

      <H2>What rankday does</H2>
      <P>
        Every page we publish is optimised for both traditional Google rankings and AI Overview inclusion. Schema markup, question-shaped structure, concrete data, author attribution, and freshness signals are all applied by default. We also track AI Overview citations weekly during the engagement, so you know whether your content is being pulled. <A href="/get-cited-by-chatgpt">See our full approach to AI citation.</A>
      </P>
    </BlogPostLayout>
  );
}
