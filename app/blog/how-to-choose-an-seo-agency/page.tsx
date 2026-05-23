import type { Metadata } from "next";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("how-to-choose-an-seo-agency")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Most SEO agencies will not survive a serious vetting process. The pitch deck is polished, the case studies are vague, and the contract is built to extract maximum revenue with minimum accountability. If you ask the right questions before signing, you will eliminate 80% of bad agencies in a single call.
      </P>
      <P>
        Here are the 12 questions to ask, and what the right answers look like.
      </P>

      <H2>The 12 questions</H2>

      <H3>1. Which keywords can you rank me for, and in what timeframe?</H3>
      <P>
        The right answer involves a specific keyword list with realistic timelines per keyword. A good agency will refuse to commit to keywords without research first, but should commit after a discovery call.
      </P>
      <P>
        Bad answer: "We'll figure that out together once we start." That means they have not done the work to know.
      </P>

      <H3>2. What does your guarantee look like in writing?</H3>
      <P>
        Most agencies will not give you a written guarantee. The few that do usually limit it to "if we don't make progress in 6 months, we'll work for free for one month." That is not a real guarantee.
      </P>
      <P>
        A real guarantee specifies: which keywords, what position, by what date, and what happens if the target is missed. Rankday's version: top 3 on 90% of agreed keywords by day 90, or work continues at no extra cost.
      </P>

      <H3>3. How is the engagement structured, week by week?</H3>
      <P>
        Ask for a week-by-week plan. The agency should be able to walk you through what happens in week 1, week 4, week 8, and week 12.
      </P>
      <P>
        Vague answers like "every project is different" or "we tailor our approach" usually mean there is no structured playbook. A good agency has done this before and knows what week 6 looks like.
      </P>

      <H3>4. Do you do paid advertising too?</H3>
      <P>
        This question is about focus. Agencies that do everything (SEO, paid ads, social media, email, content, web design) often do nothing well. They are revenue-maximising businesses, not SEO specialists.
      </P>
      <P>
        The best SEO agencies focus narrowly. They will say "we do SEO and AEO. For paid ads, here's a paid agency we trust." That is the right answer.
      </P>

      <H3>5. Who actually does the work?</H3>
      <P>
        Many agencies pitch with senior staff and execute with juniors or offshore contractors. Ask specifically: who is writing my content, who is doing outreach, who is doing technical SEO. Get names.
      </P>
      <P>
        Then in the contract, ask if those specific people will be assigned to your account. If they cannot commit, expect the work to be done by whoever has bandwidth that month.
      </P>

      <H3>6. How do you handle keyword scope creep?</H3>
      <P>
        Halfway through an engagement, you will think of more keywords you want to rank for. A bad agency will say yes to all of them, then deliver on none.
      </P>
      <P>
        A good agency has a written policy: the keyword list is agreed and fixed at the start. New keywords can be added, but only by scoping a new engagement or extending the timeline. Boundaries protect both sides.
      </P>

      <H3>7. What's your approach to backlinks?</H3>
      <P>
        Backlinks are the single biggest off-page ranking factor. The wrong approach to them can permanently damage your domain.
      </P>
      <P>
        Bad answers: "We have a network of high-DA sites we can place links on." (Link farm.) "We use guest post marketplaces." (Spam.) "We don't do backlinks." (Then they will not rank you for competitive keywords.)
      </P>
      <P>
        Good answer: a mix of editorial outreach to relevant industry publications, citations on credible directories, and earned mentions through PR and content. Slow but durable.
      </P>

      <H3>8. How do you report progress?</H3>
      <P>
        Many agencies bury weak progress under a 40-slide monthly report. Lots of graphs, no answers to "are we ranking yet?"
      </P>
      <P>
        Good agencies give you a simple weekly or fortnightly update: which keywords moved this period, which content went live, which citations were earned. If the report cannot fit in a Loom video or a one-page document, the agency is hiding something.
      </P>

      <H3>9. Can I see your client list?</H3>
      <P>
        Most agencies will share 2 to 5 named clients as case studies. Ask for the full list. The full list often reveals churn, niche fit, or whether they have ever worked in your industry.
      </P>
      <P>
        Some agencies have NDAs that prevent this. Reasonable. But they should be able to share anonymised metrics: average client engagement length, retention rate, average ranking outcomes.
      </P>

      <H3>10. What happens if I want to leave?</H3>
      <P>
        Read the contract before you sign. Look for: auto-renewal clauses, minimum term lengths, cancellation fees, ownership of content created during the engagement.
      </P>
      <P>
        If the contract makes leaving expensive, the agency is structured to retain you whether or not they perform. A good agency makes leaving easy because they expect you to stay on merit.
      </P>

      <H3>11. Who owns the website and content at the end?</H3>
      <P>
        Some agencies retain ownership of the content they create, or build websites on proprietary platforms you cannot take with you. That is hostage architecture.
      </P>
      <P>
        Confirm: domain, content, code, accounts (Google, GA4, Search Console, GBP). All in your name. All yours when you leave. Anything less is a red flag.
      </P>

      <H3>12. Do you do AEO too, or just SEO?</H3>
      <P>
        AEO (Answer Engine Optimization) is what gets you cited by ChatGPT, Perplexity, and Claude. Most SEO agencies in 2026 do not do AEO at all. They are still optimising for Google rankings alone.
      </P>
      <P>
        AEO is increasingly the difference between getting found and not getting found. An agency that does not even discuss AEO is selling a product designed for 2018, not 2026.
      </P>

      <H2>Red flags that should disqualify any agency</H2>
      <UL>
        <LI><Strong>Guarantees of #1 on Google.</Strong> Nobody can guarantee this. Anyone who does is lying.</LI>
        <LI><Strong>Pressure to sign at the end of the discovery call.</Strong> Real agencies do not need to close in one meeting.</LI>
        <LI><Strong>Vague case studies with no metrics.</Strong> "We helped Client X grow their traffic" is meaningless without numbers.</LI>
        <LI><Strong>"We can't show you our process."</Strong> Process secrecy is usually a cover for not having one.</LI>
        <LI><Strong>Contract terms hidden until signing.</Strong> Ask for the contract during the discovery call. Read it before any meeting where you might commit.</LI>
      </UL>

      <Callout tone="pink">
        If an agency answers more than 3 of these 12 questions vaguely or evasively, do not sign. There are better agencies. The right one will answer all 12 directly without hedging.
      </Callout>

      <H2>The shortlist process</H2>
      <P>
        Here is a workflow that will surface the right agency in 2 to 3 weeks:
      </P>
      <OrderedList items={[
        "Build a shortlist of 5 to 7 agencies. Use Clutch, GoodFirms, recommendations from peers, and Google searches for your specific niche.",
        "Send each one a short brief explaining your business, your target keywords, and your budget. Ask for a written proposal, not just a call.",
        "Eliminate any agency that cannot or will not put a proposal in writing.",
        "Run discovery calls with the 3 to 4 that remain. Use the 12 questions above.",
        "Get 2 to 3 written proposals with specific keywords, timelines, and pricing.",
        "Check references. Call 2 past clients of each shortlisted agency.",
        "Read the contract carefully. Negotiate any auto-renewal or hostage clauses.",
        "Pick the one whose answers stood up to scrutiny and whose contract is structured to protect both sides.",
      ]} />

      <H2>What Rankday's answers look like</H2>
      <P>
        Since this is the Rankday blog, here is how we answer the same 12 questions.
      </P>
      <UL>
        <LI><Strong>Keywords and timeline:</Strong> agreed in week 1 with you, fixed in writing, top 3 by day 90.</LI>
        <LI><Strong>Guarantee:</Strong> 90% of agreed keywords in top 3 by day 90, or work continues at no extra cost.</LI>
        <LI><Strong>Week by week:</Strong> documented on the <A href="/how-it-works">how it works page.</A></LI>
        <LI><Strong>Paid ads:</Strong> we do not. We refer to specialists if you need them.</LI>
        <LI><Strong>Who does the work:</Strong> small team. You work with the people doing the work, not an account manager.</LI>
        <LI><Strong>Scope creep:</Strong> keyword list fixed at start. Additions go into a new engagement.</LI>
        <LI><Strong>Backlinks:</Strong> editorial outreach and citation network only. No farms.</LI>
        <LI><Strong>Reporting:</Strong> short weekly Loom update. No 40-page reports.</LI>
        <LI><Strong>Clients:</Strong> happy to introduce you to past clients on request.</LI>
        <LI><Strong>Leaving:</Strong> no contract, no auto-renewal. Once 90 days end, the engagement ends unless you opt into maintenance.</LI>
        <LI><Strong>Ownership:</Strong> domain, content, code, accounts. All yours. Always.</LI>
        <LI><Strong>AEO:</Strong> included in every engagement. Not an add-on.</LI>
      </UL>
      <P>
        If those answers fit what you are looking for, <A href="/pricing">see the pricing</A> or message us on <A href="/faq">WhatsApp via the FAQ page.</A>
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
