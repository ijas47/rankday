import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("what-is-local-seo")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Local SEO is the discipline of ranking in the searches buyers run when they want a business near them. If a customer ever searches "near me," includes a city or neighbourhood in their query, or asks ChatGPT for recommendations in a specific area, local SEO is the work that decides whether your business shows up.
      </P>
      <P>
        For some categories, local SEO drives more leads than the entire website combined. For others, it is irrelevant. Here is how to tell which category you fall into, and what to actually do about it.
      </P>

      <H2>What "local" means to Google in 2026</H2>
      <P>
        When a user runs a search that Google detects as having local intent, the results page changes. Instead of just blue links, the user sees:
      </P>
      <UL>
        <LI><Strong>The local pack</Strong> (sometimes called the map pack): 3 business listings with a map, often above the organic results.</LI>
        <LI><Strong>Google Business Profile listings</Strong> for each of those 3 businesses, with reviews, photos, hours, and a directions button.</LI>
        <LI><Strong>Organic results</Strong> below the local pack, often filtered toward businesses with local relevance.</LI>
      </UL>
      <P>
        For commercial local queries, the local pack often gets more clicks than the entire organic results section. If you are not in the top 3 there, you are largely invisible.
      </P>

      <H2>Does your business need local SEO?</H2>
      <P>
        Local SEO is critical if your business serves customers in a specific geographic area and they search for businesses like yours.
      </P>
      <P>
        Categories where local SEO is essential:
      </P>
      <UL>
        <LI>Clinics, dental practices, aesthetic clinics, GPs, specialists</LI>
        <LI>Law firms, accountants, financial advisors</LI>
        <LI>Restaurants, hotels, gyms, salons, spas</LI>
        <LI>Plumbers, electricians, contractors, home services</LI>
        <LI>Retail stores, real estate brokers, dealerships</LI>
        <LI>Local B2B service providers</LI>
      </UL>
      <P>
        Categories where local SEO is less critical or irrelevant:
      </P>
      <UL>
        <LI>Pure online businesses serving customers globally</LI>
        <LI>Most SaaS companies</LI>
        <LI>E-commerce stores shipping nationwide or internationally</LI>
        <LI>Drop-shipping or print-on-demand businesses</LI>
        <LI>Online courses, digital products, content publishers</LI>
      </UL>
      <P>
        Even for online businesses, local SEO occasionally matters. A SaaS company headquartered in Dubai that wants to be cited as "the best [category] tool in the UAE" benefits from local relevance signals. But for most pure-online businesses, traditional SEO and AEO are higher priorities.
      </P>

      <H2>The three core elements of local SEO</H2>

      <H3>1. Google Business Profile</H3>
      <P>
        Your Google Business Profile (formerly Google My Business) is the single most important element of local SEO. It is the listing that shows up in the local pack and on Google Maps.
      </P>
      <P>
        A complete profile includes:
      </P>
      <UL>
        <LI>Verified business location (or service area if you do not have a physical location customers visit)</LI>
        <LI>Accurate business name, address, phone number (must match your website exactly)</LI>
        <LI>Primary category and all relevant secondary categories</LI>
        <LI>Business hours including special hours for holidays</LI>
        <LI>Photos: exterior, interior, team, products, service in action</LI>
        <LI>Services list with descriptions and pricing where appropriate</LI>
        <LI>Products if applicable</LI>
        <LI>Q&amp;A section with proactively answered common questions</LI>
        <LI>Posts: weekly updates, offers, events (similar to social media posts but for Google)</LI>
        <LI>Active review collection and response strategy</LI>
      </UL>
      <P>
        Most businesses set up the basics and stop there. The competitive advantage comes from the elements most businesses skip: weekly posts, proactive Q&amp;A, consistent review responses, photo updates.
      </P>

      <H3>2. Citations and NAP consistency</H3>
      <P>
        NAP stands for Name, Address, Phone. Google uses NAP consistency across the web as a trust signal. If your business name is "Acme Dental" on Google but "Acme Dental Clinic LLC" on Yelp and "Acme Dental Practice" on Yellow Pages, Google does not know which to trust.
      </P>
      <P>
        Citations are mentions of your business on directories, industry sites, and review platforms. Each citation should use the exact same NAP information. Inconsistency degrades local rankings.
      </P>
      <P>
        The minimum citation set for most local businesses:
      </P>
      <UL>
        <LI>Google Business Profile</LI>
        <LI>Bing Places</LI>
        <LI>Apple Maps Business</LI>
        <LI>Yelp (or local equivalent: Yellow Pages UAE, Yell.com, etc.)</LI>
        <LI>Facebook Business Page</LI>
        <LI>LinkedIn company page</LI>
        <LI>5 to 10 industry-specific directories</LI>
        <LI>5 to 10 local directories specific to your city</LI>
      </UL>

      <H3>3. Local content and on-page signals</H3>
      <P>
        Your website needs to signal local relevance. Specifically:
      </P>
      <UL>
        <LI>The city or area name in titles, H1s, and meta descriptions for relevant pages</LI>
        <LI>LocalBusiness schema markup with structured address, geo coordinates, opening hours, and service area</LI>
        <LI>An embedded Google Map on the contact page or footer</LI>
        <LI>Location-specific pages if you serve multiple areas (a dedicated page per city or neighbourhood)</LI>
        <LI>Customer testimonials or case studies from local customers</LI>
        <LI>Content mentioning local landmarks, events, or context where natural</LI>
      </UL>

      <H2>Reviews: the local SEO multiplier</H2>
      <P>
        Reviews are the single biggest local SEO ranking factor outside the basic Google Business Profile setup. They affect:
      </P>
      <UL>
        <LI>Whether you appear in the local pack at all</LI>
        <LI>Your position within the local pack</LI>
        <LI>Click-through rate from search to your profile</LI>
        <LI>Conversion rate from profile view to call or visit</LI>
        <LI>Whether AI engines cite you when asked for recommendations</LI>
      </UL>
      <P>
        Effective review collection looks like:
      </P>
      <UL>
        <LI>A simple link to your Google Review form, shared after every transaction or service</LI>
        <LI>SMS or email follow-up 1 to 3 days after the service</LI>
        <LI>A printable QR code at the point of sale for in-person businesses</LI>
        <LI>Responding to every review (positive and negative) within 48 hours</LI>
        <LI>Avoiding fake or paid reviews, which Google detects and penalises</LI>
      </UL>

      <H2>Common local SEO mistakes</H2>
      <UL>
        <LI><Strong>Multiple Google Business Profiles for the same location.</Strong> Causes duplicate listings and confusion. Consolidate to one verified listing.</LI>
        <LI><Strong>Wrong primary category.</Strong> Choose the category that most closely matches your core service. Wrong category = ranking for the wrong queries.</LI>
        <LI><Strong>Service area too broad.</Strong> Listing every city within 100 miles dilutes your relevance for the city you actually serve. Be honest about your service area.</LI>
        <LI><Strong>Inconsistent NAP across the web.</Strong> Audit and standardise.</LI>
        <LI><Strong>Ignoring negative reviews.</Strong> A non-response looks worse than a polite acknowledgment. Always respond.</LI>
        <LI><Strong>No photos, or only stock photos.</Strong> Profiles with real photos get more clicks. Real photos beat stock by a wide margin.</LI>
      </UL>

      <Callout tone="mint">
        Quick local SEO health check. Search your business name on Google. Then search "[your category] [your city]" on Google. Then search both queries on ChatGPT. If you do not show up clearly in all four, you have local SEO work to do.
      </Callout>

      <H2>Local SEO and AEO together</H2>
      <P>
        Increasingly, local queries are happening on AI assistants too. A buyer asking ChatGPT "what's a good dentist in Business Bay Dubai" is doing the same job as a Google search, but the answer comes from a different signal chain.
      </P>
      <P>
        For AI engines to recommend your local business, they need consistent NAP signals across the directories they were trained on, structured content explaining what you do and where, and ideally third-party mentions in local publications. The work overlaps with traditional local SEO almost entirely. The difference is that the citation and consistency work matters more for AI than the on-page work does.
      </P>

      <H2>Where Rankday handles local SEO</H2>
      <P>
        Every Rankday engagement for a local business includes a Google Business Profile rebuild, citation network setup (30+ relevant directories), review collection system, and LocalBusiness schema markup. For multi-location businesses, we build dedicated location pages targeting each city or neighbourhood you serve. <A href="/seo-agency-dubai">See how we handle Dubai local SEO</A> or <A href="/pricing">see the full pricing.</A>
      </P>
    </BlogPostLayout>
  );
}
