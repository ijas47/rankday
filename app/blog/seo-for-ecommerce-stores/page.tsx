import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("seo-for-ecommerce-stores")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        E-commerce SEO works differently from service business SEO. The site has hundreds or thousands of product pages, dozens of category pages, faceted navigation that can generate millions of URLs, and constant inventory changes. Get the structure wrong and the entire store rankings collapse.
      </P>
      <P>
        Here is the 2026 playbook for ranking an e-commerce store, organised by site element.
      </P>

      <H2>Product pages</H2>
      <P>
        Product pages are the bottom of the funnel. They convert traffic into purchases. They need to rank for specific product searches and convert visitors who land on them.
      </P>

      <H3>Title and meta description</H3>
      <P>
        Format: [Product Name] - [Key Attribute] | [Brand]. Example: "Nike Air Max 90 - Triple White Leather | Acme Sports."
      </P>
      <P>
        Meta description: 150 to 160 characters describing the product, including price if applicable, key features, and a call to action.
      </P>

      <H3>Unique product descriptions</H3>
      <P>
        Manufacturer-provided product descriptions are duplicate content across every retailer selling the same item. Write your own descriptions. Even 100 to 200 words of original copy outranks the duplicated manufacturer text.
      </P>

      <H3>Product schema</H3>
      <P>
        Apply Product schema with: name, image, description, brand, sku, gtin (if available), offers (price, currency, availability), aggregateRating (if reviews exist).
      </P>
      <P>
        This is what powers rich results in Google: price, stock status, star ratings appearing directly in search.
      </P>

      <H3>Customer reviews</H3>
      <P>
        Product pages with reviews convert 2 to 5x better and rank higher. Build a review collection system that asks customers to review after delivery.
      </P>

      <H3>Q&amp;A section</H3>
      <P>
        Common product questions answered on the page. Apply FAQPage schema to mark them up. Gets pulled into rich results and AI Overviews.
      </P>

      <H3>Out-of-stock handling</H3>
      <P>
        Do not 404 out-of-stock products. Keep the page indexed with "Out of stock" availability in schema, and offer alternatives or a notify-me option. The page already has accumulated SEO authority. Killing it loses that.
      </P>

      <H2>Category pages</H2>
      <P>
        Category pages aggregate products and rank for broader keywords like "men's running shoes" or "leather sofas." They typically drive more traffic than individual product pages.
      </P>

      <H3>Category description text</H3>
      <P>
        Add 200 to 500 words of original category description at the top or bottom of the page. Explains what the category contains, helps shoppers choose, includes target keywords naturally.
      </P>
      <P>
        Without this text, category pages are just lists of products, which Google rates as thin.
      </P>

      <H3>Hierarchy with breadcrumbs</H3>
      <P>
        Home &gt; Category &gt; Subcategory &gt; Product. Implement BreadcrumbList schema. Helps Google understand site structure and shows breadcrumbs in search results.
      </P>

      <H3>Internal linking between related categories</H3>
      <P>
        Link from each category page to related categories. "Customers viewing leather sofas also looked at fabric sofas, ottomans, sofa beds." Helps both users and Google.
      </P>

      <H2>Faceted navigation: the trap</H2>
      <P>
        Faceted navigation (filters like color, size, brand, price) can generate millions of URLs. Most are useless duplicates that confuse Google.
      </P>
      <P>
        Strategy:
      </P>
      <UL>
        <LI><Strong>Index strategically valuable facets:</Strong> "red running shoes," "size 10 sneakers," "Nike running shoes." These have real search demand.</LI>
        <LI><Strong>Noindex worthless facets:</Strong> filter combinations with no search demand. Use canonical tags pointing to the parent category.</LI>
        <LI><Strong>Block crawling of low-value filter combinations:</Strong> use robots.txt or noindex tags for filter parameters that generate combinatorial URLs.</LI>
        <LI><Strong>Use clean URLs for valuable facets:</Strong> /running-shoes/red instead of /running-shoes?color=red&filter=on.</LI>
      </UL>

      <H2>Site structure</H2>

      <H3>Flat hierarchy</H3>
      <P>
        Avoid deep nesting. Aim for products to be 2 to 3 clicks from the homepage. Example: Home &gt; Category &gt; Subcategory &gt; Product.
      </P>

      <H3>HTML sitemap</H3>
      <P>
        Some e-commerce stores benefit from an HTML sitemap linked in the footer, listing all categories and key products. Aids both discoverability and indexation.
      </P>

      <H3>XML sitemap segmentation</H3>
      <P>
        For large stores, segment XML sitemaps by type: product-sitemap.xml, category-sitemap.xml, blog-sitemap.xml. Reference all in a sitemap index. Easier to monitor indexation per segment.
      </P>

      <H2>Speed and Core Web Vitals</H2>
      <P>
        E-commerce is unusually demanding for site speed. Image-heavy product pages, third-party scripts (review widgets, chat tools, analytics), and complex checkout flows all slow things down.
      </P>
      <P>
        Priorities:
      </P>
      <UL>
        <LI>Use WebP or AVIF images with lazy loading</LI>
        <LI>Optimise product image sizes (responsive srcset)</LI>
        <LI>Defer non-critical scripts</LI>
        <LI>Use a CDN for images and static assets</LI>
        <LI>Audit third-party scripts ruthlessly. Each one is a tax on speed.</LI>
        <LI>Server-side render category and product pages where possible</LI>
      </UL>

      <H2>Content beyond products</H2>
      <P>
        E-commerce sites that only have product and category pages rank narrowly. Adding content layers expands the keyword universe.
      </P>

      <H3>Buying guides</H3>
      <P>
        "How to choose [product type]" articles. Educational content that ranks for research-phase keywords. Link to relevant products.
      </P>

      <H3>Comparison content</H3>
      <P>
        "[Brand A] vs [Brand B] [product type]." High commercial intent. Comparison articles often outrank individual product pages for comparison queries.
      </P>

      <H3>Style and use-case content</H3>
      <P>
        "Best running shoes for marathon training." "Best leather sofas for small apartments." Connects products to specific user contexts. Drives qualified traffic.
      </P>

      <H3>FAQ pages</H3>
      <P>
        Common questions about shipping, returns, sizing, payment, materials. Drives long-tail traffic and builds trust.
      </P>

      <H2>Local SEO for e-commerce</H2>
      <P>
        If you have a physical store alongside online, treat them separately. Local SEO for the physical store, e-commerce SEO for the online operation. Use LocalBusiness schema for the physical location and Organization schema for the online brand.
      </P>

      <H2>International SEO for e-commerce</H2>
      <P>
        If you ship internationally, use hreflang tags or country-specific subdomains/subfolders. Common patterns:
      </P>
      <UL>
        <LI>example.com/us, example.com/uk, example.com/au (subfolders)</LI>
        <LI>us.example.com, uk.example.com (subdomains)</LI>
        <LI>example.us, example.co.uk (separate domains)</LI>
      </UL>
      <P>
        Each version should have unique localized content, prices in local currency, and hreflang tags pointing to the other versions.
      </P>

      <H2>AI search for e-commerce</H2>
      <P>
        AI engines like ChatGPT and Perplexity now respond to product recommendation queries. "What's the best running shoe for flat feet?" can return specific product recommendations.
      </P>
      <P>
        To appear in AI recommendations:
      </P>
      <UL>
        <LI>Apply detailed Product schema</LI>
        <LI>Earn editorial product reviews and mentions</LI>
        <LI>Build presence on review platforms (Trustpilot, Yotpo, etc.)</LI>
        <LI>Publish buying guides that AI engines can pull from</LI>
        <LI>Earn third-party comparison content mentioning your products</LI>
      </UL>

      <Callout tone="lilac">
        E-commerce SEO is more technical than service SEO because of scale. A 1000-product store has 1000 product pages, dozens of categories, and potentially millions of faceted URLs. Get the structure right or the entire site collapses under crawl budget waste.
      </Callout>

      <H2>What Rankday does for e-commerce</H2>
      <P>
        Our 90-day model is designed primarily for service businesses, but the principles apply to e-commerce. For small-to-medium stores (under 500 SKUs), we can deliver:
      </P>
      <UL>
        <LI>Full Product and Category schema</LI>
        <LI>Category description copywriting</LI>
        <LI>Faceted navigation cleanup</LI>
        <LI>Buying guide content (4 to 8 pieces)</LI>
        <LI>Top product page rewrites</LI>
        <LI>Technical SEO foundations</LI>
      </UL>
      <P>
        For larger e-commerce operations (1000+ SKUs), the work is more involved and usually scoped as a custom engagement. <A href="/faq">Get in touch via WhatsApp</A> if you want to discuss your store specifically.
      </P>
    </BlogPostLayout>
  );
}
