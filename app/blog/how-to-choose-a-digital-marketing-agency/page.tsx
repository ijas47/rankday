import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("how-to-choose-a-digital-marketing-agency")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Choosing a digital marketing agency is risky because the sales process is designed to feel safe. The case studies sound good, the proposal has impressive channel names, and the contract usually hides the real problem: accountability is vague.
      </P>
      <P>
        A better selection process starts with one question: what measurable business outcome is the agency responsible for?
      </P>

      <H2>Start with the outcome, not the channel</H2>
      <P>
        Do not begin by asking whether you need SEO, Google Ads, Meta Ads, social media, email, or a new website. Begin with the outcome.
      </P>
      <UL>
        <LI>Do you need more inbound calls from people already searching?</LI>
        <LI>Do you need immediate paid demand while organic search grows?</LI>
        <LI>Do you need a better website because traffic is not converting?</LI>
        <LI>Do you need your brand to appear in AI-generated recommendations?</LI>
      </UL>
      <P>
        The right agency will narrow the plan. The wrong agency will sell every channel because every channel creates more retainer scope.
      </P>

      <H2>Questions to ask before you sign</H2>
      <H3>1. What exactly will be delivered in the first 30 days?</H3>
      <P>
        You want concrete outputs: audit, keyword map, technical fixes, landing pages, campaign setup, tracking, creative, or content. "Strategy" is not enough by itself.
      </P>

      <H3>2. Who owns the assets?</H3>
      <P>
        You should own the domain, website, copy, ad accounts, analytics, Search Console, Google Business Profile, and creative files. If the agency keeps control, you are not buying marketing. You are renting access.
      </P>

      <H3>3. How will success be measured?</H3>
      <P>
        Rankings, booked calls, qualified leads, cost per acquisition, organic conversions, and AI citations are measurable. "Brand awareness" can be valid, but it should not be used to hide weak performance.
      </P>

      <H3>4. What happens if targets are missed?</H3>
      <P>
        Most retainers have no consequence for missed targets. Ask what changes if performance does not move. A serious partner has a recovery plan and written accountability.
      </P>

      <H3>5. What do you not do?</H3>
      <P>
        This is one of the fastest ways to spot focus. An agency that claims to be excellent at every marketing discipline is usually built for breadth, not depth.
      </P>

      <H2>Red flags</H2>
      <UL>
        <LI><Strong>Long contracts before proof.</Strong> A 12-month lock-in shifts risk from the agency to you.</LI>
        <LI><Strong>Reports full of activity metrics.</Strong> Posts published, impressions, and meetings held are not outcomes.</LI>
        <LI><Strong>No clear channel owner.</Strong> If nobody is accountable, performance will drift.</LI>
        <LI><Strong>Vague SEO timelines.</Strong> "SEO takes time" is true, but it should still have milestones.</LI>
        <LI><Strong>Platform lock-in.</Strong> You should be able to leave without rebuilding your business infrastructure.</LI>
      </UL>

      <Callout tone="peach">
        A good agency makes the plan smaller and sharper. A weak agency makes the plan bigger until the proposal looks impressive.
      </Callout>

      <H2>When a specialist beats a full-service agency</H2>
      <P>
        Full-service agencies make sense when you need brand, creative, paid media, organic, email, production, and reporting under one roof. They are less ideal when one specific channel is the bottleneck.
      </P>
      <P>
        If the problem is "we are invisible on Google and AI search," hire a search specialist. If the problem is "our ads spend is inefficient," hire a paid media specialist. If the problem is "our positioning is unclear," hire a brand strategist first.
      </P>

      <H2>The agency comparison scorecard</H2>
      <UL>
        <LI><Strong>Specificity:</Strong> do they name the pages, keywords, campaigns, and milestones?</LI>
        <LI><Strong>Ownership:</Strong> do you keep every asset and account?</LI>
        <LI><Strong>Proof:</Strong> can they show relevant outcomes, not just logos?</LI>
        <LI><Strong>Accountability:</Strong> is there a consequence if targets are missed?</LI>
        <LI><Strong>Fit:</Strong> have they solved your exact type of problem before?</LI>
      </UL>

      <H2>Where Rankday fits</H2>
      <P>
        Rankday is not a full-service digital marketing agency. It is a focused SEO and AEO sprint for businesses that need a better website, Google rankings, and AI citations in 90 days without a retainer.
      </P>
      <P>
        If search visibility is the bottleneck, start with <A href="/pricing">Rankday pricing</A> or read <A href="/blog/how-to-choose-an-seo-agency">the SEO-specific agency checklist</A>.
      </P>
    </BlogPostLayout>
  );
}
