import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("keyword-research-for-small-business")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Most keyword research advice is built for agencies running enterprise SEO. The workflows assume Ahrefs and Semrush subscriptions, 40-tab spreadsheets, and a content team to act on the results. Small businesses do not need any of that.
      </P>
      <P>
        Here is a 30-minute method that finds the keywords actually worth targeting. No paid tools required.
      </P>

      <H2>The principle: search intent over search volume</H2>
      <P>
        Most keyword research focuses on volume: which terms get the most monthly searches. That is the wrong starting point for small businesses.
      </P>
      <P>
        A keyword with 100 monthly searches and high commercial intent is more valuable than a keyword with 10,000 searches and zero buying intent. The 100 searches are people about to spend money. The 10,000 are people doing research who will never become customers.
      </P>
      <P>
        For small businesses, the ranking math is:
      </P>
      <UL>
        <LI><Strong>Ignore:</Strong> head terms with high volume and high competition</LI>
        <LI><Strong>Target:</Strong> long-tail terms with medium volume and clear commercial intent</LI>
        <LI><Strong>Track:</Strong> brand and navigational terms (your business name + variations)</LI>
      </UL>

      <H2>The 30-minute method</H2>

      <H3>Step 1 (5 minutes): list what your buyers actually search</H3>
      <P>
        Open a blank document. Write down the 20 things a real buyer would type into Google when looking for what you sell. Use real customer language, not your industry jargon.
      </P>
      <P>
        For a dental clinic in Dubai, this might be:
      </P>
      <UL>
        <LI>dentist near me</LI>
        <LI>dental implants Dubai price</LI>
        <LI>emergency dentist Dubai</LI>
        <LI>orthodontist Dubai</LI>
        <LI>dentist Business Bay</LI>
        <LI>teeth whitening cost Dubai</LI>
        <LI>kids dentist Dubai</LI>
        <LI>... (continue to 20)</LI>
      </UL>
      <P>
        Tip: ask your front desk or sales person what callers ask for. They hear the actual language buyers use.
      </P>

      <H3>Step 2 (10 minutes): expand with Google autocomplete</H3>
      <P>
        Open Google in an incognito window (so personalisation does not skew results). Type each of your 20 base terms, one by one. Note what Google autocompletes.
      </P>
      <P>
        Then scroll to the bottom of the search results page. The "People also ask" and "Related searches" sections give you 10 to 15 more variations per query.
      </P>
      <P>
        For "dental implants Dubai," you might find:
      </P>
      <UL>
        <LI>dental implants Dubai price</LI>
        <LI>dental implants Dubai cost</LI>
        <LI>dental implants Dubai review</LI>
        <LI>best dental implants in Dubai</LI>
        <LI>cheap dental implants Dubai</LI>
        <LI>full mouth dental implants Dubai</LI>
        <LI>single tooth dental implant Dubai</LI>
      </UL>
      <P>
        Add the relevant ones to your list. You should now have 50 to 80 keyword candidates.
      </P>

      <H3>Step 3 (5 minutes): categorise by intent</H3>
      <P>
        Sort your list into three buckets:
      </P>
      <UL>
        <LI><Strong>Commercial intent:</Strong> the searcher is ready to spend money. Examples: "dental implants Dubai price," "dentist Business Bay book appointment," "emergency dentist near me."</LI>
        <LI><Strong>Research intent:</Strong> the searcher is comparing or learning. Examples: "dental implants vs bridges," "how long do dental implants last," "are dental implants safe."</LI>
        <LI><Strong>Brand intent:</Strong> searches for your business name or close variations. Always rank for these.</LI>
      </UL>
      <P>
        Commercial intent terms are your priority. They convert. Research intent terms are valuable for content marketing and AI citation but secondary. Brand terms should be automatic wins for you and require minimal work.
      </P>

      <H3>Step 4 (5 minutes): check the competition</H3>
      <P>
        For each commercial intent term, search it on Google. Look at the top 5 organic results. Ask:
      </P>
      <UL>
        <LI>Are the top results dominated by enterprise brands or major directories?</LI>
        <LI>Are the top results small businesses similar to yours?</LI>
        <LI>What format are the top results: blog posts, service pages, product pages, directory listings?</LI>
      </UL>
      <P>
        If the top 5 are all major brands (e.g., big hospital chains or massive directory sites), the term is too competitive for now. Park it for later.
      </P>
      <P>
        If the top 5 are small businesses similar to yours, the term is rankable. Keep it on the list.
      </P>

      <H3>Step 5 (5 minutes): finalise your priority list</H3>
      <P>
        From the original 50 to 80 candidates, you should end with 15 to 25 priority keywords. These are your targets for the next 90 days.
      </P>
      <P>
        Group them by topic. Often you will find 3 to 5 keywords that can be covered by a single high-quality page. For example: "dental implants Dubai price," "dental implants Dubai cost," and "how much do dental implants cost in Dubai" can all be targeted by one well-written service page.
      </P>
      <P>
        At the end of this step, you should have:
      </P>
      <UL>
        <LI>A list of 15 to 25 priority commercial-intent keywords</LI>
        <LI>Grouped into 5 to 10 page topics</LI>
        <LI>Each topic has a clear page format (service page, location page, comparison page, etc.)</LI>
      </UL>

      <H2>Tools you can use, if you want them</H2>
      <P>
        The 30-minute method above requires no paid tools. If you want to validate your list with data:
      </P>
      <UL>
        <LI><Strong>Google Keyword Planner (free, requires Google Ads account):</Strong> shows monthly search volume. Be aware the ranges are broad.</LI>
        <LI><Strong>Ubersuggest (free tier):</Strong> rough volume and competition estimates.</LI>
        <LI><Strong>AnswerThePublic (free tier):</Strong> visualises questions related to your seed term.</LI>
        <LI><Strong>Ahrefs / Semrush (paid):</Strong> the most accurate data, useful if budget allows.</LI>
      </UL>
      <P>
        For small businesses, the free tools are sufficient. The expensive tools mostly buy you precision that does not change the keyword list materially.
      </P>

      <H2>How to use your keyword list</H2>
      <P>
        Now that you have 15 to 25 priority keywords grouped into 5 to 10 topics, here is what to do:
      </P>
      <UL>
        <LI>Build a dedicated page for each topic, optimised for the keywords in that group</LI>
        <LI>Add the primary keyword to the page title, H1, and meta description</LI>
        <LI>Mention all keywords from the group naturally in the body, including related questions</LI>
        <LI>Internal-link from your homepage and from related pages to the new keyword-targeted page</LI>
        <LI>Apply appropriate schema markup (Service, FAQ, LocalBusiness, etc.)</LI>
        <LI>Track ranking progress weekly using Google Search Console (free)</LI>
      </UL>

      <Callout tone="lilac">
        Realistic timeline. For most small businesses with this approach, 60% of priority keywords will be in the top 10 within 60 to 90 days. Some will be top 3. Some competitive terms will take longer. Stick with the list. Do not change it every two weeks.
      </Callout>

      <H2>What about AEO keyword research?</H2>
      <P>
        For AEO and GEO, the keyword research is slightly different. Instead of focusing on what people type into Google, focus on what people ask conversational AI.
      </P>
      <P>
        Open ChatGPT or Perplexity. Type the conversational version of your target query: "What's the best dental clinic in Dubai for implants?" or "Who does emergency plumbing in JBR Dubai?" See what answer the AI gives. Note which businesses get cited.
      </P>
      <P>
        That gives you two pieces of information: your AEO competitors, and the kinds of attributes the AI mentions (price, location, specialty, reviews, etc.). Optimise your content to surface those attributes prominently.
      </P>

      <H2>What rankday does differently</H2>
      <P>
        At rankday we run keyword research in week 1 of every engagement. The output is a scoped, written list of 15 to 30 priority keywords (depending on plan) that we both agree on. The list is fixed in writing before any other work starts.
      </P>
      <P>
        Then we deliver against that list. Top 3 rankings on 90% of agreed keywords by day 90, or we keep working at no extra cost. <A href="/how-it-works">See the full 90-day breakdown.</A>
      </P>
    </BlogPostLayout>
  );
}
