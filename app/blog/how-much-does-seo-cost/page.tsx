import type { Metadata } from "next";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("how-much-does-seo-cost")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        SEO pricing has almost no relationship to results. A $500-a-month freelancer can outperform a $5,000-a-month agency, and a $20,000-a-month enterprise contract can deliver less than a focused $5,000 fixed-price engagement. The price tag is mostly about the seller's overhead, not the work that gets done for you.
      </P>
      <P>
        Here is what each pricing model actually buys you in 2026, and how to know when you are overpaying.
      </P>

      <H2>Monthly retainer: the default SEO pricing model</H2>
      <P>
        Most SEO agencies sell monthly retainers. The price ranges from $300 a month at the budget end to $20,000+ a month at the enterprise end. The retainer typically commits you for 6 to 12 months, sometimes with auto-renewal.
      </P>
      <P>
        What you get in each retainer tier:
      </P>

      <H3>$300 to $800 per month</H3>
      <P>
        Usually a freelancer or a small agency outsourcing to overseas labour. The work is often limited to basic on-page tweaks, 1 or 2 thin blog posts per month, and submission to a small set of directories. Reports look reasonable but actual results are rare.
      </P>
      <P>
        Reality check: ranking for any commercially valuable keyword usually requires more work than this budget allows. Buyers in this tier are mostly subsidising the freelancer's other paid work.
      </P>

      <H3>$1,000 to $2,500 per month</H3>
      <P>
        The most common SEO retainer tier. Buyers in this range typically get 2 to 4 blog posts per month, some technical SEO maintenance, light backlink outreach, and a monthly report. Quality varies enormously. Some agencies in this range deliver real results. Most do not.
      </P>
      <P>
        Math: at $1,500 per month for 12 months, you spend $18,000 total. Many agencies at this tier have still not delivered top 3 rankings by month 12.
      </P>

      <H3>$3,000 to $7,500 per month</H3>
      <P>
        Mid-market agencies. The work scales up. Usually 6 to 10 content pieces a month, active backlink outreach, technical SEO, dedicated account manager. Results improve but the overhead also climbs: account managers, weekly reports, monthly calls, sales staff. A meaningful share of your retainer pays for the agency's overhead, not the work on your site.
      </P>
      <P>
        Math: $5,000 per month for 12 months is $60,000. That is a serious investment. The results should be too. Often they are not, because the work is spread thin across too many client accounts.
      </P>

      <H3>$10,000+ per month</H3>
      <P>
        Enterprise SEO. Multiple dedicated specialists, technical SEO engineers, content teams, link-building outreach, conversion rate optimisation. Real strategy. Usually delivers, but the cost structure assumes the client has hundreds of thousands of dollars annually to spend on SEO.
      </P>
      <P>
        Math: $15,000 per month is $180,000 per year. Worth it for companies whose organic channel drives millions in revenue. Massively overpriced for a business doing $1 to $5 million in revenue.
      </P>

      <H2>Project-based pricing</H2>
      <P>
        Some agencies offer fixed-price projects instead of retainers. The work is scoped, the price is set, the engagement ends when the work is done. Project pricing typically ranges from $3,000 to $25,000 depending on scope.
      </P>
      <P>
        Common projects:
      </P>
      <UL>
        <LI><Strong>SEO audit only:</Strong> $1,500 to $5,000. Reveals problems, gives you a list to fix. Implementation not included.</LI>
        <LI><Strong>SEO audit plus implementation:</Strong> $5,000 to $15,000. Audit plus the technical and on-page fixes.</LI>
        <LI><Strong>SEO migration:</Strong> $5,000 to $20,000. When you are launching a new site or moving domains.</LI>
        <LI><Strong>Content-led SEO project:</Strong> $8,000 to $25,000. Several months of content production targeting agreed keywords.</LI>
      </UL>
      <P>
        Project pricing is usually a better deal than retainer pricing when the work is well scoped. The downside is that ongoing maintenance is not included, so rankings can drift if no one is watching.
      </P>

      <H2>Fixed-price outcome-based pricing</H2>
      <P>
        A small but growing category. The price is fixed, the timeline is fixed, the outcome is agreed in writing. If the outcome is not met, the agency keeps working at no extra cost or refunds part of the fee.
      </P>
      <P>
        Rankday operates this model. Standard $4,900 USD, Growth $7,900 USD, for a 90-day engagement that delivers a new website, top 3 rankings on 90% of agreed keywords, and citations in AI tools like ChatGPT and Perplexity. If the rankings are not delivered by day 90, work continues at no extra cost.
      </P>
      <P>
        The math is interesting. A standard Rankday engagement at $4,900 is equivalent to one month of a $5,000-per-month retainer. But you get a new website (worth $5,000 to $20,000 elsewhere), full SEO work, and AEO work. After 90 days you own everything and you have no ongoing commitment.
      </P>

      <Callout tone="lilac">
        Quick comparison. At a $1,500-per-month SEO retainer, 12 months costs $18,000. After 12 months you may or may not be ranking. At Rankday's standard plan, 90 days costs $4,900. By day 90 you are ranking for 90% of your agreed keywords or work continues free.
      </Callout>

      <H2>Hourly consulting</H2>
      <P>
        SEO consultants charge $100 to $500 per hour. This model works for specific advice and review work, less so for actual implementation. A 2-hour call can be incredibly valuable. 40 hours of vague consulting often delivers less than a focused project.
      </P>
      <P>
        Use hourly consulting when you have a specific question or want a second opinion. Avoid it as a way to "do SEO" because nobody manages the implementation.
      </P>

      <H2>Performance / pay-per-rank pricing</H2>
      <P>
        Some agencies advertise "pay only when you rank." Charges are based on how many keywords you rank for, or how much traffic the rankings deliver.
      </P>
      <P>
        Reality check: this model sounds great in pitch decks. In practice, the keywords that get targeted are usually low-competition long-tails that were going to rank anyway, and the contract terms often have buried clauses about "minimum monthly fees" or "setup costs" that look more like a retainer once you read them carefully.
      </P>
      <P>
        It can work. But it requires careful contract review. The honest version of pay-per-rank is a fixed-price model with a written guarantee, which is what Rankday does.
      </P>

      <H2>What you should actually pay</H2>
      <P>
        Forget the model for a second. Work backwards from what the result is worth to you.
      </P>
      <P>
        If a top 3 ranking for your main keyword would bring 50 qualified leads per month, and each lead is worth $2,000 in lifetime value to your business, that ranking is worth $100,000 a month to you. Paying $5,000 a month for SEO to achieve it is rational. Paying $10,000 a month is still rational.
      </P>
      <P>
        If a top 3 ranking would bring 5 qualified leads per month worth $500 each, that ranking is worth $2,500 a month to you. Paying $5,000 a month for SEO is not rational. Paying $500 a month for a freelancer who hits the target is.
      </P>
      <P>
        The correct SEO budget is whatever delivers the outcome at a cost-per-acquisition that beats your other channels. Most businesses pay too much for retainer SEO and not enough for focused, outcome-based execution.
      </P>

      <H2>Red flags in SEO pricing</H2>
      <UL>
        <LI><Strong>"We guarantee #1 on Google."</Strong> Nobody can. Run.</LI>
        <LI><Strong>"It takes 12 to 18 months to see results."</Strong> Sometimes true for highly competitive head terms. Often a stalling tactic so the agency can keep billing without showing results.</LI>
        <LI><Strong>"We need to do 3 months of audit and strategy first."</Strong> An audit takes a week. Strategy takes another week. Three months of "audit and strategy" is two and a half months of avoiding implementation.</LI>
        <LI><Strong>"The contract is for 12 months, but we can renegotiate at month 6."</Strong> Run.</LI>
        <LI><Strong>"We can't tell you which keywords until we start work."</Strong> You should be able to agree on a keyword list before any contract is signed.</LI>
      </UL>

      <H2>Bottom line</H2>
      <P>
        The price you should pay depends on what the outcome is worth to you and how the work is structured. The default monthly retainer model usually overcharges relative to the result. Fixed-price outcome-based pricing matches cost to result better.
      </P>
      <P>
        Rankday's pricing is published openly: Standard $4,900 USD, Growth $7,900 USD, both for 90 days of work that includes website, SEO, and AEO. Local pricing in AED and GBP. The deliverables and the guarantee are in writing before anything starts. <A href="/pricing">See the full pricing breakdown.</A>
      </P>
    </BlogPostLayout>
  );
}
