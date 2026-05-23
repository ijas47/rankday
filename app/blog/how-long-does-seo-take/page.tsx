import type { Metadata } from "next";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("how-long-does-seo-take")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Most SEO agencies refuse to commit to a timeline. The standard answer is "SEO is a long-term investment" or "results take 6 to 12 months." That answer is technically not wrong, but it is also not useful. The honest version has four variables and a clear range for each.
      </P>
      <P>
        Here is the breakdown.
      </P>

      <H2>The four variables that determine SEO timeline</H2>
      <P>
        Every SEO timeline depends on these four factors, in roughly this order of impact:
      </P>
      <OrderedList items={[
        "Domain age and history",
        "Keyword competition level",
        "Quality of execution",
        "External signals (backlinks, citations, mentions)",
      ]} />

      <H3>1. Domain age and history</H3>
      <P>
        A brand new domain (under 6 months old) sits in a probationary state with Google. The algorithm has not yet collected enough signals to trust it. Even with perfect on-page work, a new domain typically takes 60 to 120 days just to start ranking for low-competition long-tail terms.
      </P>
      <P>
        A domain that is 2+ years old with a clean history (no past penalties, no spammy backlinks) starts from a much better position. The same SEO work can produce rankings 2 to 4 weeks faster on an established domain.
      </P>
      <P>
        A domain with a bad history (previous penalties, link spam, hacked content) is the worst starting point. In some cases it takes 6+ months just to restore trust, before any real ranking work can happen. If the history is bad enough, starting on a new domain is faster.
      </P>

      <H3>2. Keyword competition level</H3>
      <P>
        Not all keywords are equal. The competition level determines how much work it takes to rank.
      </P>
      <UL>
        <LI><Strong>Long-tail, low competition</Strong> (e.g., "emergency plumber JBR Dubai"): possible to rank in 30 to 60 days with a clean site and one good content page targeting the term.</LI>
        <LI><Strong>Mid-competition local</Strong> (e.g., "plumber Dubai"): typically 60 to 120 days with proper on-page work and a basic Google Business Profile setup.</LI>
        <LI><Strong>Mid-competition commercial</Strong> (e.g., "best CRM for small business"): 4 to 8 months with substantial content and a few quality backlinks.</LI>
        <LI><Strong>Highly competitive head terms</Strong> (e.g., "SEO agency", "CRM software"): 12 to 24 months for established domains, often never for new ones unless the budget supports aggressive backlink building.</LI>
      </UL>

      <H3>3. Quality of execution</H3>
      <P>
        Bad SEO can take 12 months and still not rank. Good SEO compresses the timeline dramatically. The difference is in how the work is sequenced.
      </P>
      <P>
        A typical agency takes weeks 1 to 4 to "audit" the site, weeks 5 to 8 to "plan a strategy," and weeks 9 to 12 to actually start publishing content. By month 4 they have published 3 to 5 pages of content and earned 2 to 5 backlinks. Rankings start showing up in month 5 or 6.
      </P>
      <P>
        A sharp operation ships the new site by end of week 1, has the technical foundations applied by week 2, and starts publishing content by week 3. By week 8 they have published 6 to 10 pages of content and earned 10 to 20 citations. Rankings start showing up in week 6 or 7.
      </P>

      <H3>4. External signals</H3>
      <P>
        Google trusts signals from outside your website more than signals from inside it. The faster you build directory listings, citations, and backlinks pointing to your site, the faster Google trusts you enough to rank you.
      </P>
      <P>
        Many SEO agencies do not do this work at all. They optimise the website and wait. A focused operation does on-page work and off-page work in parallel, which is the single biggest accelerator on the SEO timeline.
      </P>

      <H2>Realistic timelines by scenario</H2>
      <P>
        Putting the variables together, here are timelines for the most common scenarios:
      </P>

      <H3>Scenario A: new domain, local service business, mid-competition</H3>
      <P>
        Example: a new dental clinic in a Dubai neighbourhood, targeting "dentist [neighbourhood] Dubai", "dental implants Dubai", "cosmetic dentist near me."
      </P>
      <UL>
        <LI>First rankings appear: week 6 to 8 for long-tail terms</LI>
        <LI>Top 10 for primary keywords: week 12 to 16</LI>
        <LI>Top 3 for primary keywords: month 4 to 6</LI>
      </UL>
      <P>
        With Rankday's playbook, this scenario can hit top 3 by day 90 on most of the agreed keyword list. That is the entire point of the 90-day model. Concentrated execution on a scoped list of achievable keywords.
      </P>

      <H3>Scenario B: established domain, B2B SaaS, mid-competition</H3>
      <P>
        Example: a SaaS company that has existed for 3 years, has a marketing site that ranks for its brand name only, wants to rank for category and comparison keywords.
      </P>
      <UL>
        <LI>First rankings for new content: week 4 to 6</LI>
        <LI>Top 10 for category keywords: week 10 to 14</LI>
        <LI>Top 3 for comparison and alternative keywords: month 3 to 5</LI>
        <LI>Top 3 for category head terms: month 6 to 12+</LI>
      </UL>

      <H3>Scenario C: highly competitive head terms, regardless of domain</H3>
      <P>
        Example: trying to rank for "SEO agency," "CRM software," or "personal injury lawyer."
      </P>
      <UL>
        <LI>Realistic timeline: 12 to 24 months with substantial budget</LI>
        <LI>Honest recommendation: stop chasing the head term. Target the long-tail and comparison variants where intent is higher and competition is lower.</LI>
      </UL>

      <Callout tone="pink">
        If an agency promises top 3 rankings for a highly competitive head term in 90 days, run. Either they have not understood the competition, or they are willing to lie to close the deal. Both are bad signs.
      </Callout>

      <H2>The 90-day model: when it works, when it doesn't</H2>
      <P>
        Rankday's model is built around a 90-day timeline. It works in specific conditions:
      </P>
      <UL>
        <LI>The keyword list is scoped to terms that are realistically rankable in 90 days based on competition</LI>
        <LI>The site is rebuilt cleanly at the start, removing technical debt</LI>
        <LI>Content is published and indexed within the first 3 to 4 weeks</LI>
        <LI>Citation and directory work happens in parallel with content</LI>
        <LI>The keyword list is fixed in writing, not added to mid-engagement</LI>
      </UL>
      <P>
        The model does not work if you want to rank for "SEO agency" against established competitors who have been working on it for a decade. It does work if you want to rank for "SEO agency in Manchester for law firms" or "fixed-price SEO agency UAE" or similar long-tail terms with real commercial intent and reachable competition.
      </P>

      <H2>What you should ask your agency</H2>
      <P>
        Before signing with any agency, ask three questions:
      </P>
      <OrderedList items={[
        "Which keywords specifically can you rank me for, and in what timeframe?",
        "How do you sequence the work? When does content go live, when do backlinks start, when do citations get built?",
        "What does the guarantee look like in writing?",
      ]} />
      <P>
        An agency that cannot answer these without hedging is selling time, not results.
      </P>
      <P>
        Rankday's answer: top 3 rankings on 90% of your agreed keywords by day 90, or we keep working at no extra cost. The keyword list is agreed in week 1 and fixed in writing. <A href="/how-it-works">See the full 90-day breakdown.</A>
      </P>
    </BlogPostLayout>
  );
}

function OrderedList({ items }: { items: string[] }) {
  return (
    <ol style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 22px", paddingLeft: 24 }}>
      {items.map((item) => (
        <li key={item} style={{ margin: "0 0 10px" }}>{item}</li>
      ))}
    </ol>
  );
}
