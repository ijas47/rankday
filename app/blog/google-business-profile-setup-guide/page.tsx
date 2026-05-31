import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("google-business-profile-setup-guide")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Google Business Profile (formerly Google My Business) is the listing that shows up on Google Maps and in the local pack when someone searches for a business near them. For local businesses, it often drives more leads than the entire website.
      </P>
      <P>
        Most businesses set it up once, half-finish it, and never touch it again. The competitive advantage is in the elements most businesses skip. Here is the complete 2026 setup.
      </P>

      <H2>Step 1: claim or create your profile</H2>
      <P>
        Go to business.google.com. If your business already has a listing (Google may have created one automatically), claim it. If not, create it.
      </P>
      <P>
        Verification options:
      </P>
      <UL>
        <LI><Strong>Postcard:</Strong> Google mails you a postcard with a verification code. Takes 5 to 14 days.</LI>
        <LI><Strong>Phone:</Strong> automated call or SMS with a code. Instant if available for your business type.</LI>
        <LI><Strong>Email:</Strong> link sent to a business email. Available for some categories.</LI>
        <LI><Strong>Video:</Strong> live video call with a Google reviewer showing your business. Increasingly common.</LI>
      </UL>
      <P>
        Use whichever option is fastest. Verification is mandatory before the profile becomes visible in search.
      </P>

      <H2>Step 2: nail the basics</H2>

      <H3>Business name</H3>
      <P>
        Use the exact legal name of your business. Do not append keywords. "rankday SEO Agency Dubai" is a Google policy violation. "rankday" is correct.
      </P>
      <P>
        The exception: if your legal name actually includes a descriptor ("Acme Dental Clinic"), keep it as registered. Do not invent a new format.
      </P>

      <H3>Primary and secondary categories</H3>
      <P>
        Categories are the most important ranking factor in the local pack. Choose the most specific applicable primary category.
      </P>
      <UL>
        <LI>For a dental clinic, "Dentist" is better than "Dental clinic" because Google searches map to specific category strings.</LI>
        <LI>For a fit-out company, "Interior fitting contractor" is more specific than "Construction company".</LI>
        <LI>For a SaaS company, "Software company" or the closest applicable category.</LI>
      </UL>
      <P>
        Add up to 9 secondary categories for adjacent services. Each one expands the searches you can rank for.
      </P>

      <H3>Address</H3>
      <P>
        For businesses customers visit, enter the exact address. For service-area businesses (mobile services, home services), hide the address and specify the service area instead.
      </P>
      <P>
        NAP consistency rule: your address on Google Business Profile must match the address on your website, footer, and every directory you list on. Inconsistency degrades local rankings significantly.
      </P>

      <H3>Service area (if applicable)</H3>
      <P>
        For service-area businesses, list the cities or zip codes you serve. Be realistic. Listing every city within 100 miles dilutes relevance for the cities you actually serve.
      </P>

      <H3>Phone number</H3>
      <P>
        Use a local phone number matching your business location. Toll-free numbers and call tracking numbers cause inconsistency and can hurt rankings.
      </P>

      <H3>Hours of operation</H3>
      <P>
        Set them accurately. Include "special hours" for holidays, ramadan, public holidays, and any deviations from standard hours. Customers calling outside listed hours hurt your perceived reliability.
      </P>

      <H2>Step 3: complete the profile fields most businesses skip</H2>

      <H3>Description (750-character business summary)</H3>
      <P>
        Write a 600 to 750 character description that explains what you do, who you serve, and what makes you different. Include relevant keywords naturally. No keyword stuffing.
      </P>
      <P>
        Example for a dental clinic: "Acme Dental Clinic in Business Bay Dubai. Family-owned, est. 2018. Services include dental implants, orthodontics, cosmetic dentistry, and emergency care. Same-day appointments available. Arabic and English spoken. Insurance accepted. Walk-ins welcome Monday to Saturday."
      </P>

      <H3>Services / Products</H3>
      <P>
        List every service you offer as a distinct item with a name, description, and price (or "starting from" price). For products, do the same.
      </P>
      <P>
        Many businesses skip this. The businesses that complete it consistently outrank competitors who do not.
      </P>

      <H3>Attributes</H3>
      <P>
        Google offers category-specific attributes. For restaurants: dietary options, payment methods, seating. For services: accessibility, languages spoken, payment options.
      </P>
      <P>
        Fill in every applicable attribute. Customers often filter by these.
      </P>

      <H3>Photos</H3>
      <P>
        Profiles with 25+ real photos significantly outperform those with 0 to 5. Include:
      </P>
      <UL>
        <LI>Exterior shots (so customers can recognise the building)</LI>
        <LI>Interior shots (waiting area, treatment rooms, retail space)</LI>
        <LI>Team photos</LI>
        <LI>Service in action (real customers, with consent)</LI>
        <LI>Products on display</LI>
        <LI>Updated logo and cover photo</LI>
      </UL>
      <P>
        Add new photos monthly. Google interprets photo activity as a signal of an active, real business.
      </P>

      <H3>Q&A section</H3>
      <P>
        Customers can ask questions on your profile. You can also pre-emptively ask and answer common questions yourself (using a different Google account to ask, then your business account to answer).
      </P>
      <P>
        Pre-fill 5 to 10 common questions: pricing ranges, what to expect from a first visit, do you accept insurance, what languages are spoken, what is your cancellation policy, how do you handle emergencies.
      </P>

      <H3>Booking / appointment URL</H3>
      <P>
        If you accept bookings online, link your booking platform directly. Google can show a "Book online" button on your profile, which converts much higher than "Visit website."
      </P>

      <H2>Step 4: build a review collection system</H2>
      <P>
        Reviews are the single biggest ongoing local SEO factor. The number of reviews, the recency, the velocity (rate of new reviews), and the response rate all affect rankings.
      </P>
      <P>
        Set up:
      </P>
      <UL>
        <LI><Strong>A short review link.</Strong> Generate one via your Google Business Profile dashboard. Use a URL shortener or QR code generator to make it easy to share.</LI>
        <LI><Strong>A post-service request.</Strong> 1 to 3 days after each service, send an SMS or email asking the customer to leave a review. Include the short link.</LI>
        <LI><Strong>A printable QR code.</Strong> For in-person businesses, display it at checkout or the reception desk.</LI>
        <LI><Strong>A response policy.</Strong> Respond to every review (positive and negative) within 48 hours. Keep responses brief, professional, and personalised.</LI>
      </UL>
      <P>
        Aim for: at least 5 new reviews per month for the first 6 months, then steady at 3+ per month. Industry benchmarks vary, but consistent review velocity matters more than total count beyond about 50 reviews.
      </P>

      <H2>Step 5: post weekly</H2>
      <P>
        Google Business Profile lets you publish "Posts" similar to social media updates. They appear directly on your profile and signal an active business.
      </P>
      <P>
        Post types:
      </P>
      <UL>
        <LI><Strong>Update:</Strong> general news, announcements, behind-the-scenes</LI>
        <LI><Strong>Offer:</Strong> promotions with start and end dates</LI>
        <LI><Strong>Event:</Strong> upcoming workshops, talks, openings</LI>
        <LI><Strong>Product:</Strong> highlight a specific product or service</LI>
      </UL>
      <P>
        Aim for 1 post per week minimum. Posts expire after 7 days for Updates (longer for others), so weekly posting keeps a fresh post visible at all times.
      </P>

      <H2>Step 6: monitor insights and iterate</H2>
      <P>
        Google provides analytics for your profile. Check monthly:
      </P>
      <UL>
        <LI><Strong>Search vs Maps views:</Strong> shows whether discovery is happening through search or Maps</LI>
        <LI><Strong>Direct vs discovery searches:</Strong> direct = people searching your name. Discovery = people searching your category. High discovery means your profile is doing its job.</LI>
        <LI><Strong>Actions:</Strong> website clicks, phone calls, direction requests, photo views. These are the KPIs that matter for leads.</LI>
        <LI><Strong>Photo views:</Strong> how often your photos are seen. Low views = add more photos.</LI>
      </UL>
      <P>
        Adjust your strategy based on what is working. If direction requests are high but call clicks are low, the call-to-action on your profile may need work. If photo views are high but website clicks are low, your photos may not be motivating people to learn more.
      </P>

      <H2>Common mistakes</H2>
      <UL>
        <LI><Strong>Keyword-stuffed business name.</Strong> Google policy violation. Can result in suspension.</LI>
        <LI><Strong>Multiple listings for the same business.</Strong> Causes ranking confusion. Consolidate.</LI>
        <LI><Strong>Inconsistent NAP across the web.</Strong> Audit and fix.</LI>
        <LI><Strong>Ignoring reviews.</Strong> Not responding (especially to negative reviews) looks worse than a polite acknowledgment.</LI>
        <LI><Strong>Fake reviews.</Strong> Detected by Google. Penalty includes profile suspension and ranking drops that take months to recover.</LI>
        <LI><Strong>Stale profile.</Strong> No new photos, no posts, no review responses. Signals an inactive business. Add new content monthly minimum.</LI>
      </UL>

      <Callout tone="mint">
        The 30-minute weekly habit. Every Monday: respond to any new reviews, publish one post, upload one new photo, check insights. That alone keeps your profile in the top tier of activity signals for your category.
      </Callout>

      <H2>What rankday does</H2>
      <P>
        Every rankday engagement for a local business includes a complete Google Business Profile rebuild. We claim or create the listing, optimise every field, build the review collection system, set up the first 30 days of posts, and apply LocalBusiness schema on your website that matches the profile exactly.
      </P>
      <P>
        After 90 days you have a fully optimised profile and a system to keep it active. <A href="/seo-agency-dubai">See how we handle local SEO for Dubai businesses</A> or <A href="/pricing">see the full pricing.</A>
      </P>
    </BlogPostLayout>
  );
}
