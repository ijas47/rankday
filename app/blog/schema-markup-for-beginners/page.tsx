import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("schema-markup-for-beginners")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Schema markup is the structured data code embedded in your website that tells search engines and AI engines exactly what your business does, who it serves, and how it works. Most websites have none of it. The ones that do consistently outperform competitors on both Google rich results and AI citations.
      </P>
      <P>
        Here is what schema is, why it matters, and copy-paste examples for the schemas your site probably needs.
      </P>

      <H2>What schema markup is</H2>
      <P>
        Schema is a vocabulary developed by Schema.org (a collaboration between Google, Microsoft, Yahoo, and Yandex) for describing web content in a machine-readable way. The most common implementation is JSON-LD: a small block of JSON code embedded in the &lt;head&gt; of a page.
      </P>
      <P>
        Without schema, search engines have to infer what your page is about from prose. With schema, they know explicitly.
      </P>
      <P>
        A simplified example:
      </P>
      <Callout tone="lilac">
        Without schema: "We are a dental clinic in Dubai offering implants, cleanings, and orthodontics." Google reads this and probably figures it out. Probably.
        <br /><br />
        With schema: a structured block of JSON that explicitly says: type = Dentist, name = X, address = Y, services = [Z, A, B], opening hours = C. Google knows exactly what it is looking at.
      </Callout>

      <H2>Why schema matters in 2026</H2>

      <H3>1. Rich results on Google</H3>
      <P>
        Schema enables rich results: enhanced search listings with star ratings, FAQ dropdowns, recipe details, event dates, product prices, and more. Rich results typically get 30 to 100% higher click-through rates than standard blue-link results.
      </P>

      <H3>2. AI engine understanding</H3>
      <P>
        ChatGPT, Perplexity, Claude, and Google AI Overviews all parse structured data to understand what businesses do. Schema is one of the strongest signals an AI engine has for confidently citing a business in an answer.
      </P>

      <H3>3. Knowledge Graph entry</H3>
      <P>
        For brands, schema is a key signal toward getting a Knowledge Graph panel in Google search (the box that appears on the right side for known entities). The Knowledge Graph is built from structured data, including yours.
      </P>

      <H3>4. Local SEO</H3>
      <P>
        LocalBusiness schema is the single biggest on-page signal for local rankings outside of Google Business Profile. Without it, you are missing a major local ranking factor.
      </P>

      <H2>The schemas your site probably needs</H2>

      <H3>1. Organization schema (homepage and most other pages)</H3>
      <P>
        Describes your business as an entity. Goes on the homepage and inherits across the site.
      </P>
      <P>
        Critical fields:
      </P>
      <UL>
        <LI>name: official business name</LI>
        <LI>alternateName: brand variations (rank-day, rank day, etc.)</LI>
        <LI>url: canonical homepage URL</LI>
        <LI>logo: URL to logo image (recommend 1080×1080 or larger)</LI>
        <LI>description: 2 to 3 sentence summary</LI>
        <LI>founder: the founder's name</LI>
        <LI>foundingDate: year founded</LI>
        <LI>sameAs: array of social profile URLs (LinkedIn, Twitter, etc.)</LI>
        <LI>contactPoint: phone, email, customer service hours</LI>
      </UL>

      <H3>2. LocalBusiness schema (for businesses with physical locations or service areas)</H3>
      <P>
        Extends Organization with location-specific fields:
      </P>
      <UL>
        <LI>address (streetAddress, addressLocality, postalCode, addressCountry)</LI>
        <LI>geo (latitude, longitude)</LI>
        <LI>openingHoursSpecification (per day)</LI>
        <LI>priceRange ($ to $$$$)</LI>
        <LI>areaServed (cities or regions served)</LI>
        <LI>telephone</LI>
      </UL>
      <P>
        For specific business types, use the more specific subtype. Dentist instead of LocalBusiness for a dental clinic. LegalService for a law firm. Restaurant for a restaurant. Schema.org has hundreds of specific types.
      </P>

      <H3>3. Service schema (for each service page)</H3>
      <P>
        Apply on each service page describing what that page covers.
      </P>
      <UL>
        <LI>serviceType: the specific service</LI>
        <LI>provider: reference to your Organization</LI>
        <LI>areaServed: where the service is available</LI>
        <LI>description: what the service includes</LI>
        <LI>offers: pricing if applicable</LI>
      </UL>

      <H3>4. FAQPage schema (on FAQ pages and pages with Q&A sections)</H3>
      <P>
        Marks up question-and-answer content so Google can show the questions as expandable rich results.
      </P>
      <P>
        Each Q&A pair becomes a Question entity with an acceptedAnswer.
      </P>

      <H3>5. Article schema (on every blog post)</H3>
      <P>
        Identifies the page as an article with publication metadata.
      </P>
      <UL>
        <LI>headline: post title</LI>
        <LI>description: post description</LI>
        <LI>datePublished, dateModified</LI>
        <LI>author: Person object with name</LI>
        <LI>publisher: Organization object</LI>
        <LI>mainEntityOfPage: URL of the post</LI>
      </UL>

      <H3>6. BreadcrumbList schema (on all interior pages)</H3>
      <P>
        Shows the page hierarchy. Helps Google display breadcrumb navigation in search results.
      </P>

      <H3>7. Product schema (on product or pricing pages)</H3>
      <P>
        For e-commerce products, but also relevant for service businesses with productised offerings.
      </P>
      <UL>
        <LI>name, description, image</LI>
        <LI>offers (Offer object with price, priceCurrency, availability)</LI>
        <LI>aggregateRating (if you have reviews to surface)</LI>
      </UL>

      <H2>How to add schema to your site</H2>

      <H3>If you use WordPress</H3>
      <P>
        Plugins handle most schema. Recommended: RankMath (free), Yoast SEO (free), or Schema Pro (paid). Configure them to apply the right schemas to the right page types.
      </P>
      <P>
        Drawback: plugins often inject schema after JavaScript loads, which some tools cannot detect even though Google can read it.
      </P>

      <H3>If you use Webflow</H3>
      <P>
        Schema goes in the &lt;head&gt; via custom code per page. Webflow's CMS Collection variables can populate the JSON-LD dynamically.
      </P>

      <H3>If you use Next.js (like rankday)</H3>
      <P>
        Inject JSON-LD via a &lt;script type="application/ld+json"&gt; tag in the layout or page component. Use template strings or JSON.stringify to keep the schema typed and maintainable.
      </P>

      <H3>If you build manually</H3>
      <P>
        Add the JSON-LD block to the &lt;head&gt; of each page. Many developers prefer to centralise it in a template that pulls dynamic data per page.
      </P>

      <H2>How to validate schema</H2>
      <P>
        Two tools to test your schema:
      </P>
      <UL>
        <LI><Strong>Google Rich Results Test:</Strong> at search.google.com/test/rich-results. Tells you if your schema is valid and what rich results it qualifies for.</LI>
        <LI><Strong>Schema.org Validator:</Strong> at validator.schema.org. Validates schema against the broader specification, not just Google's subset.</LI>
      </UL>
      <P>
        Run every schema through both. Fix any errors before relying on the markup to drive results.
      </P>

      <H2>Common schema mistakes</H2>
      <UL>
        <LI><Strong>Schema doesn't match visible content.</Strong> If your schema says "ratings: 4.9 stars based on 247 reviews" but those reviews are not visible on the page, Google will eventually penalise you.</LI>
        <LI><Strong>Wrong type used.</Strong> Marking a service page as a Product, or vice versa. Use the most specific applicable type.</LI>
        <LI><Strong>Missing required fields.</Strong> Some schema types require specific fields. Missing them invalidates the markup.</LI>
        <LI><Strong>Schema applied to wrong pages.</Strong> FAQPage schema on a service page that does not have an FAQ section. Article schema on a homepage. Mismatches confuse search engines.</LI>
        <LI><Strong>Fake reviews schema.</Strong> Schema marking up reviews that do not actually exist. Detected by Google and results in a manual penalty.</LI>
      </UL>

      <Callout tone="mint">
        Quick start. If your site has zero schema today and you want to deploy the highest-impact 3 schemas, do them in this order: Organization (or LocalBusiness for local businesses), then FAQPage on your FAQ page, then Article on each blog post. That covers 80% of the value.
      </Callout>

      <H2>What rankday does with schema</H2>
      <P>
        Every rankday-built site includes the full schema stack from day one:
      </P>
      <UL>
        <LI>Organization or LocalBusiness on the homepage and layout</LI>
        <LI>WebSite schema for brand entity recognition</LI>
        <LI>Service schema on each service page</LI>
        <LI>FAQPage schema on FAQ pages</LI>
        <LI>Article schema on all blog posts</LI>
        <LI>BreadcrumbList schema on interior pages</LI>
        <LI>Person schema for the founder where appropriate</LI>
      </UL>
      <P>
        Schema is part of the technical foundation, not an add-on. We apply it before any content goes live so search engines and AI engines understand your business from the first crawl. <A href="/how-it-works">See the 90-day breakdown</A> or <A href="/get-cited-by-chatgpt">how schema feeds into AI citation.</A>
      </P>
    </BlogPostLayout>
  );
}
