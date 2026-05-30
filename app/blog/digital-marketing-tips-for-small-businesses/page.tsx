import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("digital-marketing-tips-for-small-businesses")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Small businesses do not lose because they lack marketing ideas. They lose because they try too many channels before the basics are working.
      </P>
      <P>
        The practical order is simple: make the website trustworthy, show up for searches with buying intent, collect proof, answer buyer questions, and make the next step easy.
      </P>

      <H2>1. Fix the website before buying more traffic</H2>
      <P>
        If your site is slow, vague, hard to use on mobile, or missing clear contact paths, more traffic will not solve the problem. Your homepage and service pages should explain who you help, what you do, where you operate, what proof you have, and how to contact you.
      </P>

      <H2>2. Build pages for services and locations</H2>
      <P>
        A small business should not depend on one generic services page. If you are a plumber in Dubai, an electrician in Manchester, or a clinic in Toronto, your pages should match how people search.
      </P>
      <UL>
        <LI>One page for each core service</LI>
        <LI>One page for each important location or service area</LI>
        <LI>FAQs that answer price, timing, availability, and process questions</LI>
        <LI>Internal links between related services and locations</LI>
      </UL>

      <H2>3. Treat Google Business Profile like a lead channel</H2>
      <P>
        For local businesses, Google Business Profile can produce more calls than the website. Keep services updated, add real photos, answer questions, respond to reviews, and make sure your category is accurate.
      </P>
      <P>
        Ask happy customers for reviews soon after the job is complete. The best reviews mention the service and area naturally.
      </P>

      <H2>4. Publish content around buyer questions</H2>
      <P>
        Blog content should not be random. Start with questions buyers ask before they contact you.
      </P>
      <UL>
        <LI>How much does the service cost?</LI>
        <LI>How long does it take?</LI>
        <LI>What should I check before hiring a provider?</LI>
        <LI>What are the signs I need this service?</LI>
        <LI>What is the difference between option A and option B?</LI>
      </UL>
      <P>
        These posts attract qualified searchers and support the service pages that convert them.
      </P>

      <H2>5. Use paid ads only when the landing page is ready</H2>
      <P>
        Ads can work, but they expose weak pages quickly. Before spending, make sure the landing page has one clear offer, relevant proof, fast load speed, phone and form options, and tracking.
      </P>

      <H2>6. Make AI search part of the plan</H2>
      <P>
        Buyers increasingly ask AI assistants for local recommendations and service comparisons. Your site should clearly state your services, service areas, process, proof, and answers to common questions. This helps both Google and AI systems understand what you should be cited for.
      </P>

      <Callout tone="mint">
        Small business marketing works best when it is boring and consistent: clear pages, visible proof, local search, buyer questions, and fast follow-up.
      </Callout>

      <H2>7. Track the few numbers that matter</H2>
      <UL>
        <LI>Calls and forms by landing page</LI>
        <LI>Google Business Profile calls and direction requests</LI>
        <LI>Rankings for service and location keywords</LI>
        <LI>Cost per qualified lead if running ads</LI>
        <LI>Conversion rate from visitor to enquiry</LI>
      </UL>

      <H2>The 30-day starter plan</H2>
      <H3>Week 1</H3>
      <P>
        Audit the site, fix mobile issues, update contact paths, and clean up your Google Business Profile.
      </P>
      <H3>Week 2</H3>
      <P>
        Build or improve the top service pages and add proof, FAQs, and internal links.
      </P>
      <H3>Week 3</H3>
      <P>
        Add location pages for priority areas and make sure local citations are consistent.
      </P>
      <H3>Week 4</H3>
      <P>
        Publish two buyer-question posts and start asking recent customers for reviews.
      </P>

      <H2>Where Rankday fits</H2>
      <P>
        Rankday is built for small businesses that want search visibility without managing an agency for a year. We rebuild the site, publish the right pages, optimise for Google and AI citations, and work toward top 3 rankings in 90 days.
      </P>
      <P>
        Start with <A href="/who-its-for">who Rankday is for</A> or read <A href="/blog/keyword-research-for-small-business">the small business keyword research method</A>.
      </P>
    </BlogPostLayout>
  );
}
