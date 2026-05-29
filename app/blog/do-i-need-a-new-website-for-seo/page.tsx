import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("do-i-need-a-new-website-for-seo")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        A new website is one of the fastest ways to fix bad SEO. It is also one of the most expensive mistakes if your existing site is fundamentally fine. The honest answer to "do I need a new website" depends on six specific factors. Walk through them in order. By the end you will know which side of the line you are on.
      </P>

      <H2>The six factors</H2>

      <H3>1. Technical foundation</H3>
      <P>
        Is your site built on a platform that supports modern SEO requirements? Specifically:
      </P>
      <UL>
        <LI>Server-side rendering or static generation (not pure client-side React without SSR)</LI>
        <LI>Fast initial page load (Largest Contentful Paint under 2.5 seconds)</LI>
        <LI>Mobile-friendly without zoom or horizontal scroll</LI>
        <LI>Custom meta titles and descriptions per page</LI>
        <LI>Ability to add JSON-LD schema markup</LI>
        <LI>Clean, semantic URL structure</LI>
        <LI>Custom canonical URLs per page</LI>
      </UL>
      <P>
        If your site fails 3 or more of these, you need a new site. Patching these issues on a fundamentally broken platform usually costs more than rebuilding from scratch.
      </P>
      <P>
        Common platforms that pass: Next.js, Remix, Astro, Webflow (with care), Shopify (for e-commerce), Squarespace (basic SEO only), WordPress (with good hosting and themes).
      </P>
      <P>
        Common platforms that struggle: Wix, custom legacy platforms, drag-and-drop builders from 2015, WordPress with bad themes or unmaintained hosting.
      </P>

      <H3>2. Site speed</H3>
      <P>
        Google's Core Web Vitals are now ranking factors. The three metrics:
      </P>
      <UL>
        <LI><Strong>LCP (Largest Contentful Paint):</Strong> should be under 2.5 seconds. Your largest hero image, video, or text block should appear within that window.</LI>
        <LI><Strong>INP (Interaction to Next Paint):</Strong> should be under 200 milliseconds. When a user clicks or taps, the page should respond within that time.</LI>
        <LI><Strong>CLS (Cumulative Layout Shift):</Strong> should be under 0.1. The page should not jump around as it loads.</LI>
      </UL>
      <P>
        Run Google PageSpeed Insights on your homepage and main service page. If you fail on 2 or more of these metrics consistently, your site is fighting an uphill battle.
      </P>
      <P>
        Sometimes these can be fixed without rebuilding. Lazy-loading images, removing unused scripts, switching hosts, and code optimisation can rescue a slow site. Sometimes they cannot, and rebuilding on a fast modern stack is faster than fixing.
      </P>

      <H3>3. Content structure</H3>
      <P>
        Does your site have dedicated pages for each thing you want to rank for? Or does it have one "Services" page that briefly mentions every service?
      </P>
      <P>
        Google ranks pages, not sites. To rank for "interior designer Dubai" you need a page specifically targeting that query. To rank for "office fit out Dubai" you need a different page targeting that query. One generic page about "design services" will not rank for either.
      </P>
      <P>
        If your site has 5 to 10 pages and you are trying to rank for 30 keywords, you have a content structure problem. You can fix this on the existing site by writing more pages, but if the platform makes adding pages hard, a new site is often the better answer.
      </P>

      <H3>4. Information architecture and navigation</H3>
      <P>
        Can a user find any page on your site within 3 clicks from the homepage?
      </P>
      <P>
        Pages that are buried deep (4+ clicks from the homepage) are signaled as low priority to Google. They get crawled less, indexed slower, and ranked lower. If your important pages are buried in unhelpful sub-menus, you have an architecture problem.
      </P>
      <P>
        Sometimes this is a content reorganisation problem. Sometimes the platform makes good architecture impossible. The latter requires a rebuild.
      </P>

      <H3>5. Schema markup</H3>
      <P>
        Modern SEO requires schema markup. Without it, AI engines and Google rich results both struggle to understand what your business does.
      </P>
      <P>
        Can your current site support custom JSON-LD schema per page? If yes, this is fixable. If no (some site builders do not allow custom head tags), you need a new site or a major platform change.
      </P>

      <H3>6. Conversion-readiness</H3>
      <P>
        SEO without conversion is wasted. If your site ranks but visitors do not contact you, the problem is not SEO, it is the site itself.
      </P>
      <P>
        Common conversion problems on existing sites:
      </P>
      <UL>
        <LI>Unclear value proposition above the fold</LI>
        <LI>No clear primary CTA</LI>
        <LI>Contact information buried</LI>
        <LI>Pricing hidden or absent (when buyers want pricing)</LI>
        <LI>Generic messaging that does not speak to the actual ICP</LI>
        <LI>Outdated design that signals the business is no longer active</LI>
      </UL>
      <P>
        A site rebuild often pays for itself purely in conversion uplift, before SEO benefits even kick in.
      </P>

      <Callout tone="lilac">
        Quick decision rule. If your site fails 3 or more of these 6 factors, a rebuild is the right move. If it fails 1 or 2, patches and optimisation are usually enough. Specific exception: a site with severe Core Web Vitals issues on a bad platform almost always justifies a rebuild on its own.
      </Callout>

      <H2>When patching is the right answer</H2>
      <P>
        You do not need a new website if:
      </P>
      <UL>
        <LI>The platform supports modern SEO (Next.js, Webflow, properly hosted WordPress, etc.)</LI>
        <LI>Page speed is acceptable (Core Web Vitals mostly green)</LI>
        <LI>You can add custom meta tags and schema</LI>
        <LI>The architecture allows easy addition of new pages</LI>
        <LI>The conversion design is decent</LI>
      </UL>
      <P>
        In this case, the work is: write more pages targeting your keyword list, apply schema markup, improve internal linking, build backlinks. No rebuild needed.
      </P>

      <H2>When a rebuild is the right answer</H2>
      <P>
        You do need a new website if:
      </P>
      <UL>
        <LI>The platform fundamentally limits SEO (custom legacy platform, old Wix, broken WordPress installs)</LI>
        <LI>Core Web Vitals are persistently bad and cannot be fixed</LI>
        <LI>You cannot add pages or modify meta tags easily</LI>
        <LI>The information architecture buries important pages</LI>
        <LI>The design is so outdated it actively hurts conversion</LI>
        <LI>The cost of patching exceeds the cost of rebuilding cleanly</LI>
      </UL>

      <H2>The hidden cost of patching a broken site</H2>
      <P>
        Many businesses choose to patch when they should rebuild because the upfront cost looks lower. The trap is that patching often costs more in the long run.
      </P>
      <P>
        Example: a business pays an agency $2,000 per month to "improve our SEO" on a fundamentally broken site. After 12 months they have spent $24,000 and rankings have barely moved. They eventually rebuild for $8,000 and rank within 90 days on the new site. They could have skipped the $24,000.
      </P>
      <P>
        The correct calculation is: what is the cost of NOT ranking for 12 months? For most businesses, that exceeds the cost of a rebuild many times over.
      </P>

      <H2>How Rankday handles this question</H2>
      <P>
        In week 1 of every engagement, we audit the existing site against these 6 factors. We tell you straight: rebuild or patch.
      </P>
      <P>
        If a rebuild is needed, it is included in the standard 90-day engagement at no extra cost beyond the fixed price. The website rebuild is part of the bundle, not an add-on.
      </P>
      <P>
        If a rebuild is not needed, we optimise the existing site. You save the cost of a rebuild and we focus the 90 days on content and ranking work instead.
      </P>
      <P>
        Either way the price is the same. Standard $4,900. Growth $7,900. The decision about rebuild vs patch is made on what is actually needed, not what generates more billable hours. <A href="/how-it-works">See the full 90-day breakdown.</A>
      </P>
    </BlogPostLayout>
  );
}
