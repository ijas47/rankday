import type { Metadata } from "next";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("how-to-write-meta-titles-and-descriptions")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Your meta title and description are your one-shot pitch to a searcher. The page might be brilliant, but if the SERP snippet does not earn the click, nobody reads it. Most sites waste these fields on auto-generated junk.
      </P>
      <P>
        Here is how to write titles and descriptions that get clicks, with patterns that work and patterns that do not.
      </P>

      <H2>Why these fields matter more than people think</H2>
      <P>
        Two reasons:
      </P>
      <UL>
        <LI><Strong>Click-through rate (CTR) is a ranking factor.</Strong> Google watches whether users click your result. Low CTR signals weak relevance and pushes you down.</LI>
        <LI><Strong>The snippet is your sales pitch.</Strong> You won the impression. Now you have to win the click against 9 other results above and below you.</LI>
      </UL>
      <P>
        A page ranked #5 with a 12% CTR can drive more traffic than a page ranked #3 with a 3% CTR. The snippet is the difference.
      </P>

      <H2>Meta title: the rules</H2>

      <H3>1. Length: 50 to 60 characters</H3>
      <P>
        Google truncates titles around 60 characters (about 580 pixels). Aim for 50 to 60. Shorter is fine. Longer gets cut off mid-sentence.
      </P>

      <H3>2. Primary keyword near the beginning</H3>
      <P>
        Google weights the first words of the title more heavily. Put your target keyword in the first half.
      </P>
      <P>
        Bad: "Discover Rankday: The leading SEO agency in Dubai" (keyword too late)
      </P>
      <P>
        Good: "SEO Agency Dubai. Top 3 Rankings in 90 Days. | Rankday" (keyword first)
      </P>

      <H3>3. One unique title per page</H3>
      <P>
        Never duplicate titles across pages. Each page needs its own title that distinguishes it.
      </P>

      <H3>4. Brand name at the end (or omit it)</H3>
      <P>
        Putting your brand name at the end keeps the keyword visible in truncated SERPs. Putting it at the beginning sometimes makes sense for established brands but usually wastes pixels.
      </P>

      <H3>5. Specific and quantified</H3>
      <P>
        Numbers, dates, and specifics increase clicks. "10 best CRMs" outperforms "best CRMs." "90-Day SEO" outperforms "SEO Services."
      </P>

      <H3>6. Match search intent</H3>
      <P>
        A buyer searching "best SEO agency UAE" wants comparison or recommendation. A title saying "Our SEO Services" misses the intent. A title saying "Best SEO Agencies in UAE: Top 5 Compared" matches it.
      </P>

      <H2>Meta description: the rules</H2>

      <H3>1. Length: 150 to 160 characters</H3>
      <P>
        Google truncates around 155 to 160 characters. Aim for 150 to 160.
      </P>

      <H3>2. Include the keyword (Google bolds matches)</H3>
      <P>
        When the searcher's query matches words in your meta description, Google bolds them. Bolded text catches the eye and increases clicks. Include the primary keyword and 1 to 2 related variations naturally.
      </P>

      <H3>3. Answer the searcher's implicit question</H3>
      <P>
        The searcher typed a query. The description should answer "yes, this page solves that problem."
      </P>
      <P>
        Query: "how long does SEO take"
      </P>
      <P>
        Bad description: "We are a professional SEO agency offering data-driven solutions."
      </P>
      <P>
        Good description: "SEO timelines explained for new domains, established sites, and competitive markets. Honest answer for 2026, with breakdowns by scenario."
      </P>

      <H3>4. Include a call to action</H3>
      <P>
        End with a soft CTA: "Read the breakdown." "See the pricing." "Learn how."
      </P>

      <H3>5. Avoid duplication and auto-generation</H3>
      <P>
        Never duplicate descriptions across pages. And never let WordPress, Webflow, or a CMS auto-generate them from the first paragraph. Write each one deliberately.
      </P>

      <H2>High-converting patterns</H2>

      <H3>Pattern 1: Problem + outcome + proof</H3>
      <P>
        "[Common problem the searcher has]. [Specific outcome you deliver]. [Proof point]."
      </P>
      <P>
        Example: "Stuck below page 1 of Google? Top-3 rankings on agreed keywords in 90 days. 90% success rate or we keep working free."
      </P>

      <H3>Pattern 2: Direct answer with specifics</H3>
      <P>
        "[Direct answer to the query]. [Specifics that build credibility]."
      </P>
      <P>
        Example: "SEO costs range from $300 monthly retainers to $20,000+ enterprise contracts. Here is what each price actually buys you in 2026."
      </P>

      <H3>Pattern 3: Question + answer hook</H3>
      <P>
        "[Question that matches search intent]? [Hook that promises the answer in the article]."
      </P>
      <P>
        Example: "Why is your website not ranking on Google? Nine most common reasons, with a 30-day diagnostic plan to fix them."
      </P>

      <H3>Pattern 4: Number + benefit + qualifier</H3>
      <P>
        "[Number] [benefit] [qualifier that increases credibility]."
      </P>
      <P>
        Example: "12 questions to ask before signing with an SEO agency. Use these to filter out 80% of bad agencies on the first call."
      </P>

      <H2>Patterns that do not work</H2>
      <UL>
        <LI><Strong>"Welcome to..."</Strong> Wastes characters and tells Google nothing useful.</LI>
        <LI><Strong>"Discover..."</Strong> Generic verb that no human searches for.</LI>
        <LI><Strong>"The leading..."</Strong> Unverifiable superlative. Google does not weight it.</LI>
        <LI><Strong>"Our..."</Strong> The page is about the user, not about you. Lead with what they get.</LI>
        <LI><Strong>Keyword stuffing.</Strong> "SEO agency Dubai SEO services Dubai SEO Dubai" looks spammy and Google may rewrite the title for you.</LI>
        <LI><Strong>All caps or excessive symbols.</Strong> Looks like clickbait. Google often rewrites these.</LI>
      </UL>

      <Callout tone="lilac">
        Test before publishing. Mock up the SERP listing in a tool like SERPSim or just on paper. Read it like a stranger seeing it for the first time. Would you click? If the answer is "maybe," rewrite until the answer is "yes."
      </Callout>

      <H2>How Google sometimes overrides your title</H2>
      <P>
        In about 20 to 30% of cases, Google rewrites your meta title in the SERP based on its own assessment of relevance. Common triggers:
      </P>
      <UL>
        <LI>Title is too long</LI>
        <LI>Title is identical to other pages on your site</LI>
        <LI>Title contains keyword stuffing</LI>
        <LI>Title does not match the actual page content</LI>
        <LI>Better signal exists elsewhere on the page (H1 or natural language)</LI>
      </UL>
      <P>
        If Google is rewriting your titles, rewrite them yourself to match what Google's algorithm chose. Often Google has identified a better title than your original.
      </P>

      <H2>Title and description for AI search</H2>
      <P>
        For pages targeted at AI search engines (ChatGPT, Perplexity, Claude, Google AI Overviews), meta titles and descriptions matter slightly less because AI engines synthesise from full content. But they still:
      </P>
      <UL>
        <LI>Signal what the page is primarily about</LI>
        <LI>Get included in some AI-generated answers verbatim</LI>
        <LI>Provide context to schema markup</LI>
      </UL>
      <P>
        Optimise for both: clear, specific, keyword-led for Google, and informative enough that AI engines can correctly categorise the page.
      </P>

      <H2>What Rankday does</H2>
      <P>
        Every Rankday-built site has unique, keyword-optimised, intent-matched meta titles and descriptions on every page. We write them as part of the launch, not as an afterthought. Each page also includes Open Graph and Twitter Card metadata for social sharing previews.
      </P>
      <P>
        Want examples? Browse any page on rank-day.com and view the source. Each one demonstrates the patterns above. <A href="/pricing">See the pricing</A> or <A href="/how-it-works">the 90-day breakdown.</A>
      </P>
    </BlogPostLayout>
  );
}
