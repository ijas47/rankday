import type { Metadata } from "next";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("why-isnt-my-website-ranking-on-google")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        If your business is not on the first page of Google for the searches your buyers run, the cause is almost always one of nine specific reasons. Most are fixable in under 30 days. Here is the diagnostic order from most common to least common.
      </P>
      <P>
        Work through them in sequence. The earlier reasons are the most likely culprits, and fixing them often resolves the issue without needing to investigate further.
      </P>

      <H2>1. Your site is not indexed</H2>
      <P>
        If Google has not added your pages to its index, you cannot rank for anything. This is the most common cause and the easiest to miss.
      </P>
      <P>
        How to check: search <Strong>site:yourdomain.com</Strong> in Google. If you see no pages or far fewer than your site contains, you have an indexing problem.
      </P>
      <P>
        Then open Google Search Console, go to Pages, and look at the indexing report. You will see pages in three categories: indexed, crawled-but-not-indexed, and discovered-but-not-crawled.
      </P>
      <P>
        Common fixes: submit the sitemap to Search Console, use URL Inspection to manually request indexing for each page, ensure robots.txt is not blocking crawlers, ensure no pages have noindex tags applied accidentally.
      </P>

      <H2>2. Your domain is too new</H2>
      <P>
        Google deliberately holds new domains in a probationary state. Even with perfect setup, a domain less than 6 months old will rank slowly for anything competitive.
      </P>
      <P>
        How to check: when was the domain registered? If under 6 months, this is likely part of your problem.
      </P>
      <P>
        Fix: time. Plus the work below to accelerate trust signals: external mentions, citations, backlinks, and content that genuinely helps users.
      </P>

      <H2>3. Your content does not match search intent</H2>
      <P>
        Each Google query has an implicit intent. Buyers searching "best CRM for B2B" want a comparison article, not a product page. Buyers searching "CRM pricing" want to see prices, not a marketing pitch.
      </P>
      <P>
        How to check: search your target keyword. Look at the top 3 organic results. What format are they? Comparison post? Listicle? Product page? Service page? Local result?
      </P>
      <P>
        If your page is a different format from what is ranking, you have a search intent mismatch. Either change your page format to match, or target a different keyword.
      </P>

      <H2>4. Your content is too thin or too generic</H2>
      <P>
        Google now strongly penalises thin content. A 200-word page does not rank for a competitive keyword in 2026. A page with no original insight, no specific data, and no clear value to the reader will not rank either.
      </P>
      <P>
        How to check: pick your top ranking page. Read it next to the top 3 ranking competitors. Is yours less detailed, less specific, less helpful? If yes, content depth is your problem.
      </P>
      <P>
        Fix: rewrite or extend the page. Aim for 1500 to 2500 words with concrete examples, specific data, original insight, and clear answers to the question the user is asking.
      </P>

      <H2>5. No backlinks pointing to the page</H2>
      <P>
        For competitive keywords, content quality alone is not enough. Google needs external signals that other sites consider your content trustworthy. Those signals come from backlinks: other domains linking to your page.
      </P>
      <P>
        How to check: use a free tool like Ahrefs Backlink Checker, Moz, or SE Ranking to see how many backlinks point to your domain. If the answer is "fewer than 10" and you are trying to rank for anything competitive, this is part of the problem.
      </P>
      <P>
        Fix: earn backlinks through editorial outreach, guest posts on credible industry publications, citations on relevant directories, and PR. Avoid link farms and paid link schemes, which can permanently damage your domain.
      </P>

      <H2>6. Your site has technical SEO problems</H2>
      <P>
        Common technical problems that block ranking:
      </P>
      <UL>
        <LI><Strong>Slow page load.</Strong> Pages that take 5+ seconds to load rank below faster competitors. Aim for Largest Contentful Paint under 2.5 seconds.</LI>
        <LI><Strong>Mobile usability issues.</Strong> Google indexes mobile-first. If your site is broken on mobile, you will rank worse on every device.</LI>
        <LI><Strong>Missing or wrong schema markup.</Strong> Schema does not directly affect ranking but enables rich results that drive higher click-through rates.</LI>
        <LI><Strong>Broken internal links.</Strong> 404 errors and redirect loops confuse crawlers and reduce indexability.</LI>
        <LI><Strong>Duplicate content.</Strong> Multiple pages targeting the same keyword cause keyword cannibalisation.</LI>
        <LI><Strong>Improper canonicalisation.</Strong> If your canonical tags point to the wrong URLs, Google may index the wrong page or none at all.</LI>
      </UL>
      <P>
        How to check: run the site through Google PageSpeed Insights and Search Console's Core Web Vitals report. Also use a crawler like Screaming Frog to spot internal link issues and duplicate content.
      </P>

      <H2>7. Keyword competition is too high</H2>
      <P>
        Some keywords are dominated by domains that have invested years and millions of dollars in SEO. Trying to outrank them with limited resources is a losing strategy.
      </P>
      <P>
        How to check: search your target keyword. Look at the domains ranking in the top 10. Are they enterprise-scale brands, government sites, major publications, or industry giants? If yes, you are competing with very deep pockets.
      </P>
      <P>
        Fix: target less competitive long-tail keywords first. "Best CRM" is extremely competitive. "Best CRM for solo financial advisors in the UK" is significantly more achievable. Build authority on long-tails first, then climb up.
      </P>

      <H2>8. Your title and meta descriptions are bad</H2>
      <P>
        Even if you rank, a bad title and meta description tank your click-through rate. Google notices low CTR and lowers your ranking further over time.
      </P>
      <P>
        How to check: search your target keyword. Find your result. Is the title compelling? Does it match the user's intent? Does the meta description give a clear reason to click?
      </P>
      <P>
        Common mistakes: duplicate titles across pages, titles that do not include the target keyword, generic descriptions like "We are the best SEO agency in town."
      </P>
      <P>
        Fix: unique title and meta description per page, primary keyword in title, compelling reason to click in meta description.
      </P>

      <H2>9. Google has manually penalised your site</H2>
      <P>
        Rare but real. If your site has a history of spammy backlinks, hacked content, or violation of Google's guidelines, you may have a manual action against your domain.
      </P>
      <P>
        How to check: Search Console → Security & Manual Actions → Manual actions. If you see anything other than "No issues detected," you have a manual penalty.
      </P>
      <P>
        Fix: depends on the specific violation. For unnatural backlinks, disavow them and submit a reconsideration request. For content violations, fix the content and submit a reconsideration request. The process takes weeks to months.
      </P>

      <Callout tone="lilac">
        Diagnostic order. Start with #1 (indexation) and work through in order. Most "my site isn't ranking" issues are resolved in the first 3 reasons. Reasons 4 through 9 are progressively rarer and more involved to fix.
      </Callout>

      <H2>The 30-day diagnostic</H2>
      <P>
        Here is a 30-day plan to diagnose and fix most ranking problems:
      </P>
      <OrderedList items={[
        "Days 1-2: verify indexation. Check site: searches and Search Console. Submit sitemap. Request indexing for any unindexed key pages.",
        "Days 3-7: audit search intent. For each target keyword, compare your page format to top 3 ranking results. Note mismatches.",
        "Days 8-14: rewrite or extend thin content. Pick the 3 most important pages, get each to 1500+ words with concrete value.",
        "Days 15-21: technical audit. Run PageSpeed Insights, Search Console, and a crawler. Fix the obvious issues.",
        "Days 22-30: begin backlink outreach. Identify 10 relevant industry publications, pitch guest posts or inclusion in their roundups.",
      ]} />
      <P>
        After 30 days, the most common ranking problems are either fixed or clearly identified. The longer-term work (building backlinks and earning citations) continues from there.
      </P>

      <H2>When you need help</H2>
      <P>
        Some of this work is straightforward. Some requires deeper expertise: schema markup, content strategy, backlink outreach, technical site rebuilds.
      </P>
      <P>
        Rankday does a complete 90-day audit and rebuild for businesses whose current setup is not delivering. Standard $4,900. Top 3 ranking guarantee on agreed keywords by day 90, or we keep working at no extra cost. <A href="/pricing">See the full pricing</A> or <A href="/how-it-works">how the 90 days work.</A>
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
