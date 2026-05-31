import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("seo-for-new-domains-first-90-days")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Google deliberately holds new domains in a probationary state. The algorithm has not yet collected enough signals to trust them, so they rank slowly for the first 60 to 120 days regardless of how good the on-page work is.
      </P>
      <P>
        Trying to rank for competitive head terms on day 1 of a new domain is a losing strategy. The work that actually moves rankings during the first 90 days is different from the work that moves rankings on an established domain. Here is what to do, sequenced by week.
      </P>

      <H2>The new-domain reality</H2>
      <P>
        Google's "trust" of a domain depends on signals it builds over time:
      </P>
      <UL>
        <LI>How long the domain has existed</LI>
        <LI>How much real traffic flows through it (visitors, time on page, return visits)</LI>
        <LI>How many other credible domains link to it</LI>
        <LI>How consistently the brand appears across third-party sites</LI>
        <LI>Whether the content matches user search intent and satisfies queries</LI>
      </UL>
      <P>
        A 5-day-old domain with perfect on-page SEO has none of these signals yet. A 5-year-old domain with mediocre on-page SEO has many. The difference is months of compounding trust.
      </P>
      <P>
        That does not mean a new domain cannot rank. It means you have to choose your targets carefully and stack the signals fast.
      </P>

      <H2>What works for new domains in the first 90 days</H2>

      <H3>1. Target long-tail commercial keywords first</H3>
      <P>
        Head terms ("SEO agency", "best CRM") are dominated by domains that have been working on them for years. A new domain will not crack them in 90 days no matter how much budget you throw at it.
      </P>
      <P>
        Long-tail variants ("fixed-price SEO agency UAE", "best CRM for solo financial advisors") have lower search volume but much lower competition. A new domain can realistically rank top 3 for them within 60 to 90 days.
      </P>
      <P>
        The math is favourable. Ten long-tail terms each driving 20 to 50 monthly visits = 200 to 500 monthly visits with high intent. That outperforms a single head term you cannot actually rank for.
      </P>

      <H3>2. Get indexed fast</H3>
      <P>
        A page that is not indexed cannot rank. Google's first-time crawl of a new domain can take days to weeks. You can accelerate this:
      </P>
      <UL>
        <LI>Set up Google Search Console immediately</LI>
        <LI>Submit your XML sitemap to Search Console</LI>
        <LI>Use URL Inspection → Request Indexing for each important page</LI>
        <LI>Make sure robots.txt is not accidentally blocking crawlers</LI>
        <LI>Ensure every page has a clean canonical tag pointing to itself</LI>
        <LI>Add internal links between every page so the crawler can navigate the site</LI>
      </UL>

      <H3>3. Build the citation foundation</H3>
      <P>
        External signals matter more for new domains than for established ones. The fastest way to build them in the first 30 days is directory citations:
      </P>
      <UL>
        <LI>Google Business Profile (if applicable)</LI>
        <LI>Bing Places, Apple Maps Business</LI>
        <LI>LinkedIn company page</LI>
        <LI>Industry-specific directories (Clutch, G2, GoodFirms for agencies, etc.)</LI>
        <LI>Local directories (Yellow Pages variants, Yelp, Trustpilot)</LI>
        <LI>10 to 20 niche directories specific to your category</LI>
      </UL>
      <P>
        Each citation is a tiny trust signal. Twenty to thirty of them in the first month build a meaningful foundation that Google notices.
      </P>

      <H3>4. Ship 6 to 10 substantial content pages early</H3>
      <P>
        Each page should be 1500 to 2500 words, target one specific keyword cluster, and provide concrete value. Thin sites with 3 to 5 short pages signal "small, possibly low-quality" to Google. Sites with 6 to 10 substantial pages signal "real business with depth."
      </P>
      <P>
        Aim to have all the priority content live by end of week 4.
      </P>

      <H3>5. Apply schema markup site-wide</H3>
      <P>
        Schema markup is the single highest-leverage technical change for a new domain. It tells search engines and AI engines what your business is, what it does, and where it operates. Without it, Google has to infer everything from prose, which takes longer for an untrusted new domain.
      </P>
      <P>
        Apply: Organization on the homepage and layout, Service on each service page, FAQPage on FAQ pages, Article on all blog posts, LocalBusiness if applicable, BreadcrumbList on interior pages.
      </P>

      <H3>6. Optimise Core Web Vitals before launch</H3>
      <P>
        New domains do not have legacy traffic to "prove" their site speed. Google's first crawl forms the initial impression. If Largest Contentful Paint is over 3 seconds and Cumulative Layout Shift is over 0.25, Google's first impression of your site is "slow."
      </P>
      <P>
        Optimise images, defer non-critical scripts, use a CDN, and use a modern framework (Next.js, Astro, Webflow with care) that ships clean HTML.
      </P>

      <H3>7. Start backlink outreach in week 4</H3>
      <P>
        Backlinks take longer to build than citations. Start the outreach process early so the first links arrive while the rest of the work is still in progress.
      </P>
      <P>
        Realistic in 90 days: 5 to 15 quality backlinks from outreach (guest posts, resource pages, broken link replacement, HARO mentions). Plus 30 to 50 directory citations.
      </P>

      <H2>The 90-day sequence</H2>

      <H3>Week 1: Foundations</H3>
      <UL>
        <LI>Domain set up, hosting configured, SSL active</LI>
        <LI>Google Search Console verified, sitemap submitted</LI>
        <LI>Google Business Profile created (if applicable), verification started</LI>
        <LI>Keyword research complete, target list finalised</LI>
        <LI>Site map and information architecture designed</LI>
        <LI>Technical SEO checklist applied (robots.txt, canonicals, schema)</LI>
      </UL>

      <H3>Week 2: Site live</H3>
      <UL>
        <LI>Homepage and 3 to 5 core pages published</LI>
        <LI>Schema markup applied to all pages</LI>
        <LI>Internal linking structured</LI>
        <LI>First 5 directory citations submitted</LI>
        <LI>Search Console URL Inspection for all live pages</LI>
      </UL>

      <H3>Weeks 3-4: Content depth and citations</H3>
      <UL>
        <LI>3 to 5 more pages published targeting priority long-tail keywords</LI>
        <LI>10 to 15 additional directory citations</LI>
        <LI>LinkedIn company page optimised</LI>
        <LI>Google Business Profile fully populated with photos, services, Q&A, first posts</LI>
        <LI>Initial outreach for first guest post or backlink opportunities</LI>
      </UL>

      <H3>Weeks 5-8: Content and signals</H3>
      <UL>
        <LI>Total content count reaches 8 to 12 pages</LI>
        <LI>Citation count reaches 25 to 40</LI>
        <LI>First 1 to 3 backlinks earned through outreach</LI>
        <LI>Search Console shows first rankings appearing (typically week 6 to 8)</LI>
        <LI>Review collection system live and producing 1 to 3 reviews per week (for local businesses)</LI>
      </UL>

      <H3>Weeks 9-12: Refinement and momentum</H3>
      <UL>
        <LI>Rankings start moving for long-tail terms</LI>
        <LI>Total backlinks reach 5 to 15</LI>
        <LI>Refine content based on Search Console data (impressions, click-through rates, average position)</LI>
        <LI>Double down on pages showing promise, refresh pages stuck below position 10</LI>
        <LI>AI citation tracking starts: query ChatGPT, Perplexity, Claude weekly with target queries</LI>
      </UL>

      <H2>What does NOT work for new domains</H2>
      <UL>
        <LI><Strong>Chasing head terms.</Strong> "Best SEO agency" is impossible for a new domain to rank for in 90 days. Stop trying.</LI>
        <LI><Strong>Volume-based content strategies.</Strong> Publishing 50 thin articles in 90 days does not build authority. It signals "AI-generated content farm."</LI>
        <LI><Strong>Black-hat backlink shortcuts.</Strong> PBN links, link farms, paid links from "DR 70+ sites" are detected and penalised especially harshly for new domains.</LI>
        <LI><Strong>Ignoring the technical foundation.</Strong> A new domain with slow load times, no schema, and broken canonicals has nothing else to fall back on.</LI>
        <LI><Strong>Changing strategy every 2 weeks.</Strong> Rankings compound. Constant strategy changes prevent compounding.</LI>
      </UL>

      <Callout tone="peach">
        Realistic expectations. For a new domain in the first 90 days: expect to start ranking for long-tail terms in weeks 6 to 10. Expect top 3 on 60 to 90% of agreed long-tail keywords by day 90. Expect head terms to take 6 to 18 months regardless of effort.
      </Callout>

      <H2>The rankday model for new domains</H2>
      <P>
        Most of rankday's clients are on new or recently launched domains. The 90-day playbook is built specifically for that scenario:
      </P>
      <UL>
        <LI>Realistic keyword scoping (long-tail commercial intent, not head terms)</LI>
        <LI>Clean technical foundation from day 1 (no legacy debt to undo)</LI>
        <LI>Concentrated citation and content work in the first 6 weeks</LI>
        <LI>Outreach for backlinks running in parallel</LI>
        <LI>Top 3 rankings on 90% of agreed keywords by day 90, or work continues at no extra cost</LI>
      </UL>
      <P>
        For new domains, the 90-day model fits the actual constraints of Google's ranking algorithm. <A href="/how-it-works">See the full breakdown</A> or <A href="/pricing">see the pricing.</A>
      </P>
    </BlogPostLayout>
  );
}
