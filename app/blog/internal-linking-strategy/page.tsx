import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("internal-linking-strategy")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Internal links tell Google which pages on your site matter most and pass authority between them. Most sites do this badly, accidentally, or not at all. Done well, internal linking can lift rankings by 20 to 40% with no new content needed.
      </P>
      <P>
        Here is a simple strategy that works for sites of any size.
      </P>

      <H2>Why internal links matter</H2>
      <P>
        Three reasons:
      </P>
      <UL>
        <LI><Strong>Crawlability.</Strong> Google discovers new pages by following links. Pages with no inbound internal links are rarely crawled.</LI>
        <LI><Strong>PageRank flow.</Strong> Authority passes through links. A page linked from your homepage receives more authority than a page buried 4 clicks deep.</LI>
        <LI><Strong>Topical signals.</Strong> When multiple related pages link to each other, Google understands them as a topic cluster, which builds topical authority faster.</LI>
      </UL>

      <H2>The hub-and-spoke model</H2>
      <P>
        The cleanest internal linking strategy for most sites is a hub-and-spoke model. It looks like this:
      </P>
      <UL>
        <LI><Strong>Homepage:</Strong> the top-level hub. Links to major sections.</LI>
        <LI><Strong>Category hubs:</Strong> pages that group related content (e.g., /industries, /locations, /blog). Each links to all the specific pages in its category.</LI>
        <LI><Strong>Spoke pages:</Strong> the specific service, location, blog post, or product pages. Each links back to its hub and across to related spokes.</LI>
      </UL>
      <P>
        Visualised, it looks like a wheel: hub in the middle, spokes pointing outward, with connections between adjacent spokes.
      </P>

      <H2>Practical rules</H2>

      <H3>1. Every page should have inbound internal links</H3>
      <P>
        Run a crawler (Screaming Frog free up to 500 URLs). Look at the "orphan pages" report. Any page with zero inbound internal links is invisible to Google's authority calculation.
      </P>
      <P>
        Fix: add the orphan page to the relevant hub, or link to it from related pages.
      </P>

      <H3>2. Important pages need many internal links</H3>
      <P>
        Your highest-priority pages (homepage, pricing, top service pages) should be linked from many places: nav, footer, related content, and contextual mentions in body copy.
      </P>
      <P>
        Rule of thumb: pages you want to rank highly should have 10+ internal links pointing to them from across the site.
      </P>

      <H3>3. Use descriptive anchor text</H3>
      <P>
        The clickable text of the link tells Google what the linked page is about.
      </P>
      <P>
        Bad: "Click here to read more."
      </P>
      <P>
        Good: "See our SEO pricing for Dubai businesses."
      </P>
      <P>
        Use natural, descriptive anchor text. Vary it so it does not look manipulated. Avoid using the same exact-match keyword anchor 50 times.
      </P>

      <H3>4. Link to related pages contextually</H3>
      <P>
        When you mention a topic in body content, link to your dedicated page on it. This is the most powerful kind of internal link.
      </P>
      <P>
        Example: in a blog post about local SEO, when you mention Google Business Profile, link to your guide on GBP setup.
      </P>

      <H3>5. Use a clean global nav</H3>
      <P>
        Your top nav (and footer) should link to the most important pages. These links appear on every page and pass significant authority.
      </P>
      <P>
        Limit to 5 to 7 nav items. Crowded navs dilute the signal.
      </P>

      <H3>6. Link forward and backward in clusters</H3>
      <P>
        Within a topic cluster (e.g., all your SEO blog posts), each post should link to several related posts. Forward links to deeper or more specific content. Backward links to foundational content.
      </P>
      <P>
        Example: a post about "how to choose an SEO agency" should link forward to "how much does SEO cost" and backward to "what is SEO."
      </P>

      <H3>7. Avoid excessive footer links</H3>
      <P>
        Some sites stuff dozens of links into the footer. Google sees these as low-value because they are site-wide and not contextually relevant. Use the footer for genuine navigation, not link manipulation.
      </P>

      <H2>How to audit your current internal linking</H2>

      <H3>Step 1: Map your current links</H3>
      <P>
        Use Screaming Frog or Ahrefs Site Audit to crawl your site and export a link map. Identify:
      </P>
      <UL>
        <LI>Pages with zero internal links pointing to them (orphans)</LI>
        <LI>Pages with fewer than 3 internal links (under-linked)</LI>
        <LI>Pages with excessive links (over-linked, possibly diluting authority)</LI>
        <LI>Internal links using "click here" or other generic anchor text</LI>
      </UL>

      <H3>Step 2: Identify your priority pages</H3>
      <P>
        Which pages do you want to rank highest? Typically: homepage, pricing, top service pages, top blog posts.
      </P>
      <P>
        These should be your "destinations" for most internal linking work.
      </P>

      <H3>Step 3: Audit category hubs</H3>
      <P>
        Do you have hub pages for major categories? Examples: /services, /industries, /locations, /blog. If not, create them.
      </P>
      <P>
        Each hub should link to every specific page in its category. Hub pages compound authority for their category significantly.
      </P>

      <H3>Step 4: Add contextual links</H3>
      <P>
        Go through your top 10 to 20 most-trafficked pages. Add 2 to 5 contextual internal links per page where they naturally fit. Each link should:
      </P>
      <UL>
        <LI>Point to a related page on your site</LI>
        <LI>Use descriptive anchor text</LI>
        <LI>Fit naturally in the surrounding content</LI>
        <LI>Add value for the reader (not just SEO-driven)</LI>
      </UL>

      <H2>Example: how rankday's site is internally linked</H2>
      <P>
        The rankday site follows a hub-and-spoke model:
      </P>
      <UL>
        <LI><Strong>Homepage</Strong> links to How It Works, Pricing, Industries, Locations, Blog, FAQ, About</LI>
        <LI><Strong>Industries hub</Strong> at /industries links to all 10 industry pages (SaaS, law firms, clinics, plumbers, electricians, contractors, interior designers, fit out, FM, maid services)</LI>
        <LI><Strong>Locations hub</Strong> at /locations links to Dubai, UK, US plus 5 other markets</LI>
        <LI><Strong>Blog hub</Strong> at /blog links to every blog post</LI>
        <LI><Strong>Each industry page</Strong> links back to the Industries hub and to /pricing and /how-it-works</LI>
        <LI><Strong>Each blog post</Strong> links contextually to related blog posts and to relevant service pages</LI>
        <LI><Strong>Footer</Strong> mirrors the hub structure for site-wide accessibility</LI>
      </UL>
      <P>
        This creates a network of links where authority flows from the homepage outward to the spokes, and back inward through cross-links between related pages.
      </P>

      <Callout tone="mint">
        Quick rule. Before publishing any new page, ask "where on the existing site should this page be linked from?" Add the link before publishing. Otherwise the new page launches as an orphan and ranks slowly.
      </Callout>

      <H2>Internal linking and AI search</H2>
      <P>
        AI engines use internal links similarly to Google. Pages linked from authoritative parts of your site (homepage, key hubs) are weighted more heavily when AI engines parse your site's content.
      </P>
      <P>
        For AEO specifically, internal links between related content help AI engines understand topical relationships. A site where "what is AEO," "how to get cited by ChatGPT," and "what is GEO" all link to each other signals topical coherence that AI engines reward.
      </P>

      <H2>What rankday does</H2>
      <P>
        Internal linking is built into the architecture of every rankday site from day one. We design the hub-and-spoke structure during the planning phase, ensure every page has inbound and outbound links by launch, and add contextual links across the content as it goes live.
      </P>
      <P>
        The result: no orphan pages, clear hub structure for Google to understand, authority flowing from homepage to priority pages, and topical clusters that compound. <A href="/how-it-works">See how the 90-day plan handles the build.</A>
      </P>
    </BlogPostLayout>
  );
}
