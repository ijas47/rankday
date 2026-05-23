import type { Metadata } from "next";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("technical-seo-checklist")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Technical SEO is what determines whether Google can crawl, render, and rank your site at all. Get it wrong and the best content strategy on Earth fails. Get it right and the rest of SEO becomes possible.
      </P>
      <P>
        Here is the 21-point checklist to run through before launching any site, or auditing an existing one.
      </P>

      <H2>Crawlability</H2>

      <H3>1. robots.txt exists and allows crawlers</H3>
      <P>
        Your robots.txt file sits at /robots.txt and tells crawlers what they can and cannot access. It should exist and not accidentally block important sections.
      </P>
      <P>
        Common mistakes: blocking /assets, /images, or /static folders (which can affect rendering), or forgetting to remove "Disallow: /" left over from staging.
      </P>

      <H3>2. XML sitemap exists and is submitted</H3>
      <P>
        An XML sitemap lists every URL you want indexed. It belongs at /sitemap.xml or referenced in robots.txt.
      </P>
      <P>
        Submit it to Google Search Console and Bing Webmaster Tools. Without submission, discovery takes weeks longer.
      </P>

      <H3>3. No accidental noindex tags</H3>
      <P>
        A meta noindex tag tells search engines not to index a page. Common accident: developers add noindex during staging and forget to remove it on launch.
      </P>
      <P>
        Check every page. The HTML head should not contain &lt;meta name="robots" content="noindex"&gt; unless you actually want the page excluded.
      </P>

      <H3>4. Internal links connect every page</H3>
      <P>
        Every page should be reachable through internal links. Orphan pages (no internal links pointing to them) are rarely crawled.
      </P>
      <P>
        Run a crawler (Screaming Frog) and check the "orphan" report. Fix any.
      </P>

      <H2>Indexation</H2>

      <H3>5. Canonical URLs set correctly</H3>
      <P>
        Each page should have a self-referencing canonical tag in the head. The canonical URL should be the version you want indexed (typically https://www. or your chosen primary domain).
      </P>
      <P>
        Common mistakes: canonical pointing to a different domain, canonical pointing to homepage from every page, or no canonical at all.
      </P>

      <H3>6. HTTPS and one canonical domain</H3>
      <P>
        Your site should be served only on HTTPS. HTTP versions should 301-redirect to HTTPS. Non-www and www versions should redirect to whichever you chose as canonical.
      </P>
      <P>
        Test by typing each variant in the browser and confirming it lands on the canonical URL with a single redirect (not a chain).
      </P>

      <H3>7. No duplicate content</H3>
      <P>
        Multiple URLs serving the same content (e.g., /page and /page/, /page?utm=x and /page) confuse Google. Either canonicalise them to one URL or redirect.
      </P>

      <H3>8. Pagination handled cleanly</H3>
      <P>
        For paginated content (blogs, e-commerce category pages), each paginated page should self-canonical and link to the next page. Do not canonical page 2+ to page 1.
      </P>

      <H2>Site speed and Core Web Vitals</H2>

      <H3>9. Largest Contentful Paint under 2.5 seconds</H3>
      <P>
        LCP measures when the biggest visible element of your page is rendered. Should be under 2.5 seconds. Common fixes: optimise hero images, defer non-critical JavaScript, use a CDN, choose better hosting.
      </P>

      <H3>10. Cumulative Layout Shift under 0.1</H3>
      <P>
        CLS measures how much the page jumps around as it loads. Should be under 0.1. Fix by reserving space for images and ads, avoiding late-loading fonts that shift text.
      </P>

      <H3>11. Interaction to Next Paint under 200 ms</H3>
      <P>
        INP measures responsiveness. Replaces the older FID metric. Should be under 200 ms. Fix by reducing JavaScript execution time, splitting large bundles, removing heavy third-party scripts.
      </P>

      <H3>12. Modern image formats</H3>
      <P>
        Use WebP or AVIF instead of JPEG and PNG. Specify width and height attributes on all img tags. Use srcset for responsive images. Lazy-load images below the fold.
      </P>

      <H3>13. Compressed text assets</H3>
      <P>
        Enable gzip or Brotli compression for HTML, CSS, JavaScript. Modern hosts (Vercel, Cloudflare, Netlify) handle this automatically.
      </P>

      <H2>Mobile and accessibility</H2>

      <H3>14. Mobile-friendly responsive design</H3>
      <P>
        Google indexes the mobile version of your site. If mobile is broken or worse than desktop, your rankings suffer everywhere. Test with Google's Mobile-Friendly Test tool.
      </P>

      <H3>15. Viewport meta tag set</H3>
      <P>
        Every page should have &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;. Without it, mobile browsers render at desktop width.
      </P>

      <H3>16. Tap targets sized correctly</H3>
      <P>
        Buttons and links on mobile should be at least 48×48 pixels with enough spacing. Cramped targets fail mobile usability checks.
      </P>

      <H2>Structured data</H2>

      <H3>17. Schema markup applied site-wide</H3>
      <P>
        Apply Organization on homepage, Service on service pages, Article on blog posts, FAQPage on FAQ sections, LocalBusiness if applicable. Validate with Google's Rich Results Test.
      </P>

      <H3>18. Open Graph and Twitter Card metadata</H3>
      <P>
        Every page should have og:title, og:description, og:image, twitter:card metadata. Controls how the page appears when shared on LinkedIn, X, Slack, WhatsApp.
      </P>

      <H2>URLs and redirects</H2>

      <H3>19. Clean, readable URLs</H3>
      <P>
        URLs should be lowercase, hyphenated, descriptive, and short. /seo-for-plumbers is good. /index.php?cat=23&item=789 is bad.
      </P>

      <H3>20. No redirect chains</H3>
      <P>
        Redirects should be single 301s, not chains. Chain example: HTTP → HTTPS → non-www → www. Each hop is a small SEO penalty. Configure your host to do the entire redirect in one step.
      </P>

      <H3>21. 404s tracked and fixed</H3>
      <P>
        Check Search Console's "Pages" report for 404 errors. For each, either restore the page, 301-redirect to a relevant alternative, or accept and leave it (which signals to Google the URL is gone).
      </P>

      <Callout tone="mint">
        Quick audit. Open Search Console, run PageSpeed Insights, run Mobile-Friendly Test, run Rich Results Test. In 30 minutes you will have a clear picture of which of these 21 points need attention.
      </Callout>

      <H2>Tools to use</H2>
      <UL>
        <LI><Strong>Google Search Console</Strong> (free): indexation status, crawl errors, Core Web Vitals, search performance.</LI>
        <LI><Strong>Google PageSpeed Insights</Strong> (free): Core Web Vitals scores with specific fix recommendations.</LI>
        <LI><Strong>Google Rich Results Test</Strong> (free): validates schema markup.</LI>
        <LI><Strong>Mobile-Friendly Test</Strong> (free): mobile usability.</LI>
        <LI><Strong>Screaming Frog SEO Spider</Strong> (free up to 500 URLs): site-wide crawl audit.</LI>
        <LI><Strong>Ahrefs / Semrush</Strong> (paid): comprehensive technical audits, broken links, redirect chains.</LI>
      </UL>

      <H2>What Rankday does</H2>
      <P>
        Technical SEO is the first work we do in every Rankday engagement. The full 21-point checklist is applied in week 1, before any content goes live. Schema markup, Core Web Vitals optimisation, clean URL structure, canonical setup, and mobile-first rendering are non-negotiable foundations. <A href="/how-it-works">See the 90-day breakdown.</A>
      </P>
    </BlogPostLayout>
  );
}
