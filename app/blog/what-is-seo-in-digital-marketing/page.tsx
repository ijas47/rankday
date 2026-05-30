import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("what-is-seo-in-digital-marketing")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        SEO in digital marketing is the work of making your website visible when buyers search for a problem, service, product, or provider. Paid ads rent attention. SEO earns placement in search results and compounds over time.
      </P>
      <P>
        For a business owner, the practical definition is simpler: SEO is how a buyer finds you before they find a competitor. In 2026, that means Google rankings, local map visibility, and answers that AI systems can understand and cite.
      </P>

      <H2>What SEO actually does</H2>
      <P>
        Search engines do three jobs. They crawl pages, understand what each page is about, and rank the best answers for a query. SEO improves all three.
      </P>
      <UL>
        <LI><Strong>Crawlability:</Strong> Google can access the page, follow links, read the content, and understand the site structure.</LI>
        <LI><Strong>Relevance:</Strong> the page clearly matches the query, location, service, and search intent.</LI>
        <LI><Strong>Trust:</Strong> the site has proof, reviews, expertise, links, citations, and a clean technical foundation.</LI>
        <LI><Strong>Conversion:</Strong> the page turns the right visitor into a call, enquiry, booking, demo, or purchase.</LI>
      </UL>

      <H2>The four parts of SEO</H2>
      <H3>1. Technical SEO</H3>
      <P>
        Technical SEO is the foundation. It covers speed, mobile usability, indexing, canonical tags, redirects, structured data, internal links, and broken pages. If technical SEO is weak, content has to work harder than it should.
      </P>

      <H3>2. On-page SEO</H3>
      <P>
        On-page SEO is the content and structure of each page. The title, headings, copy, images, FAQs, internal links, and calls to action all need to match the job the searcher is trying to complete.
      </P>

      <H3>3. Off-page SEO</H3>
      <P>
        Off-page SEO is the trust layer around your site. Backlinks, directory citations, brand mentions, PR, reviews, and local listings all help search engines decide whether your business deserves to rank.
      </P>

      <H3>4. Local SEO</H3>
      <P>
        Local SEO matters when customers search with a city, area, or "near me" intent. It includes your Google Business Profile, location pages, local backlinks, reviews, service-area clarity, and consistent name, address, and phone data.
      </P>

      <H2>How AI search changed SEO</H2>
      <P>
        SEO is no longer only about ten blue links. Buyers now ask ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews for recommendations. Those systems prefer content that is clear, structured, specific, and easy to cite.
      </P>
      <P>
        This is where SEO overlaps with <A href="/what-is-aeo">AEO</A> and <A href="/blog/what-is-geo-generative-engine-optimization">GEO</A>. A page should still rank on Google, but it should also answer direct questions in a format an AI assistant can reuse.
      </P>

      <H2>What should happen in the first 90 days?</H2>
      <P>
        A good SEO sprint does not begin with random blogs. It begins with the pages closest to revenue.
      </P>
      <UL>
        <LI><Strong>Days 1 to 14:</Strong> audit the site, choose target keywords, fix technical blockers, and map the pages needed to rank.</LI>
        <LI><Strong>Days 15 to 30:</Strong> rebuild or improve the core service pages, location pages, internal links, schema, and conversion paths.</LI>
        <LI><Strong>Days 31 to 60:</Strong> publish supporting content, build local and industry citations, and strengthen Google Business Profile signals.</LI>
        <LI><Strong>Days 61 to 90:</Strong> refresh pages based on ranking movement, add FAQs for AI answers, and build links to pages stuck below the top three.</LI>
      </UL>

      <Callout tone="pink">
        The mistake most businesses make is publishing broad educational content before the money pages are strong. Fix the pages that can create revenue first, then build the blog cluster around them.
      </Callout>

      <H2>SEO metrics that matter</H2>
      <P>
        Traffic is useful, but it is not the only score. A business should track rankings for agreed keywords, leads by landing page, calls from Google Business Profile, indexed pages, technical health, referring domains, and AI citation appearances.
      </P>
      <P>
        The question is not "did traffic go up?" The better question is "are more qualified buyers finding the right page and taking the next step?"
      </P>

      <H2>Where Rankday fits</H2>
      <P>
        Rankday is built for businesses that do not want an open-ended retainer. We rebuild the site, target the agreed keywords, optimise for Google and AI citations, and work toward top 3 rankings in 90 days.
      </P>
      <P>
        If your current site is not ranking, start with <A href="/blog/why-isnt-my-website-ranking-on-google">this ranking diagnostic</A>, then look at <A href="/pricing">the 90-day Rankday sprint</A>.
      </P>
    </BlogPostLayout>
  );
}
