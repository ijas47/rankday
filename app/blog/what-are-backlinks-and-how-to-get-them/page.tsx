import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("what-are-backlinks-and-how-to-get-them")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        A backlink is a hyperlink from another website pointing to your site. It is the single biggest off-page Google ranking factor and one of the strongest trust signals for AI engines as well.
      </P>
      <P>
        Most SEO agencies are bad at getting backlinks. The strategies that actually work are slow, manual, and require real outreach. The strategies that look fast (link farms, paid link schemes) destroy domains.
      </P>
      <P>
        Here is what good backlink building actually looks like in 2026.
      </P>

      <H2>Why backlinks still matter</H2>
      <P>
        Google's ranking algorithm has hundreds of factors, but backlinks remain among the top three for competitive queries. The logic is simple: when one website links to another, it is implicitly endorsing the linked content. Lots of endorsements from credible sources signal that your content is trustworthy.
      </P>
      <P>
        For AI engines, backlinks function as a proxy for credibility. A business mentioned (and linked) in industry publications, comparison sites, and editorial content gets pulled into AI answers more often than one mentioned only on its own website.
      </P>
      <P>
        For brand searches, backlinks help Google understand entity identity. Multiple sites linking to rank-day.com using the anchor text "Rankday" teach Google that those two strings refer to the same entity.
      </P>

      <H2>What makes a good backlink</H2>

      <H3>1. Relevance</H3>
      <P>
        A link from a site in your industry or adjacent industries is worth more than a link from an unrelated site. A SEO agency linking to your dental clinic site is less valuable than a healthcare industry publication linking to it.
      </P>

      <H3>2. Authority</H3>
      <P>
        The linking site's own credibility matters. Sites with high Domain Rating, lots of their own backlinks, and editorial reputation pass more authority through their links.
      </P>
      <P>
        Domain Rating (DR) and Domain Authority (DA) are third-party metrics. Anything above DR 50 is generally considered authoritative. The really valuable links come from sites with DR 70+.
      </P>

      <H3>3. Editorial placement</H3>
      <P>
        A link that appears in the editorial body of an article is more valuable than one in a footer, sidebar, or author bio. Google can detect the difference and weights editorial links higher.
      </P>

      <H3>4. Anchor text variety</H3>
      <P>
        The anchor text (the clickable text of the link) matters. Natural backlink profiles include a mix of:
      </P>
      <UL>
        <LI>Branded anchors ("Rankday", "rank-day.com")</LI>
        <LI>Descriptive anchors ("SEO agency in Dubai", "90-day SEO service")</LI>
        <LI>Generic anchors ("click here", "this article", "learn more")</LI>
        <LI>URL anchors ("https://www.rank-day.com")</LI>
      </UL>
      <P>
        Over-optimised anchor text (every link uses "SEO agency Dubai" exactly) signals manipulation and can trigger penalties.
      </P>

      <H3>5. Dofollow vs nofollow</H3>
      <P>
        Some links have a "nofollow" attribute, which tells search engines not to pass authority through them. Most social media links, paid links, and user-generated content links are nofollow.
      </P>
      <P>
        Dofollow links pass more authority. But a natural backlink profile has both. All-dofollow profiles look manipulated.
      </P>

      <H2>How to actually get backlinks in 2026</H2>

      <H3>1. Directories and citations</H3>
      <P>
        Industry directories and review platforms (Clutch, G2, Trustpilot, Yelp, GoodFirms, DesignRush) provide easy first backlinks. They are nofollow on some platforms and dofollow on others, but they all contribute to consistent NAP signals and discoverability.
      </P>
      <P>
        For a new business, getting listed on 30 to 50 relevant directories is the first phase of backlink building. It is also the foundation for AEO.
      </P>

      <H3>2. Guest posts on industry publications</H3>
      <P>
        Writing a well-researched, valuable article for a publication in your industry, in exchange for a link back to your site, remains one of the most effective tactics.
      </P>
      <P>
        How to do it well:
      </P>
      <UL>
        <LI>Identify 20 to 30 publications in your industry that accept contributed content</LI>
        <LI>Read their existing content. Find topic gaps your expertise can fill.</LI>
        <LI>Pitch specific article ideas, not vague offers to write "something"</LI>
        <LI>Write the article to their actual quality standards, not to maximise your link insertion</LI>
        <LI>Include 1 to 2 natural links to your site in the body, plus the author bio link</LI>
      </UL>
      <P>
        Expected response rate: 5 to 15%. So pitch 20 to 30 to land 2 to 5 published guest posts per quarter.
      </P>

      <H3>3. Resource page link building</H3>
      <P>
        Many sites maintain "resource" or "useful links" pages relevant to their topic. If your content fits, you can request inclusion.
      </P>
      <P>
        Process:
      </P>
      <UL>
        <LI>Search "[your topic] resources" or "[your topic] useful links" on Google</LI>
        <LI>Identify pages that link to similar content</LI>
        <LI>Email the page owner with a polite, specific request to include your resource</LI>
        <LI>Make clear why your content adds value to their existing list</LI>
      </UL>
      <P>
        Response rate: 5 to 10%. Higher quality lists and more specific pitches convert better.</P>

      <H3>4. Broken link building</H3>
      <P>
        Find dead links on relevant industry sites. Email the site owner: "Hey, your article links to [X] but that link is dead. I wrote something similar that might be a useful replacement."
      </P>
      <P>
        This works because you are doing the site owner a favour (fixing a broken link) while quietly asking for a link to your content. Response rates are typically higher than cold outreach: 10 to 20%.
      </P>

      <H3>5. HARO and similar journalist outreach platforms</H3>
      <P>
        Help A Reporter Out (HARO) and similar platforms connect journalists with sources. Journalists post requests for expert quotes. If you provide a useful quote, you often get cited (and linked) in the published article.
      </P>
      <P>
        For agency owners and subject matter experts, this is one of the highest-quality backlink sources available. A single mention in a major publication outweighs 50 directory listings.
      </P>

      <H3>6. Comparison and review content</H3>
      <P>
        Comparison articles like "best SEO agencies in Dubai" or "top fit-out contractors UAE" rank well and link to multiple businesses in each list. Getting included in these articles requires either:
      </P>
      <UL>
        <LI>Direct outreach to the author</LI>
        <LI>Being notable enough in your category that the author finds you</LI>
        <LI>Paying for placement (which crosses into paid links and should be disclosed)</LI>
      </UL>

      <H3>7. Linkable assets</H3>
      <P>
        Build content other sites want to link to. Original research, data reports, calculators, comparison tables, and free tools all attract organic backlinks over time.
      </P>
      <P>
        Example: a SEO agency that publishes "Annual State of SEO in the UAE" report with original survey data will earn backlinks from anyone writing about UAE SEO for years afterward.
      </P>

      <H2>Tactics that destroy domains</H2>
      <P>
        Some "backlink strategies" look like shortcuts but can result in manual penalties that take months or years to recover from:
      </P>
      <UL>
        <LI><Strong>Private Blog Networks (PBNs):</Strong> agencies that own a network of low-quality sites and place links from them. Google has been detecting and penalising these for over a decade.</LI>
        <LI><Strong>Comment spam:</Strong> automated tools that drop links in blog comments across thousands of sites. Almost always nofollow, harmful, and obvious.</LI>
        <LI><Strong>Forum signature spam:</Strong> joining forums purely to add a link to your site in the signature. Detected easily.</LI>
        <LI><Strong>Bought links from "high-DA" sites:</Strong> link marketplaces selling placements on credible-looking sites. Google has gotten very good at identifying these patterns.</LI>
        <LI><Strong>Reciprocal link schemes:</Strong> "I'll link to you if you link to me" on a large scale. Detected algorithmically.</LI>
      </UL>

      <Callout tone="pink">
        Rule. If a tactic feels like it might be against Google's guidelines, it is. The short-term gains are not worth the long-term penalty risk. The only sustainable backlink strategy is genuinely earning placements through valuable content and real outreach.
      </Callout>

      <H2>How many backlinks do you need?</H2>
      <P>
        It depends on competition. For low-competition local queries, 10 to 30 quality backlinks is often enough to rank top 3. For mid-competition commercial keywords, you typically need 50 to 100. For competitive head terms, hundreds or thousands.
      </P>
      <P>
        Quality &gt; quantity. Ten links from DR 70+ relevant industry sites outweigh 500 links from random low-quality directories.
      </P>

      <H2>Realistic timeline</H2>
      <P>
        Backlink building is slow. A focused outreach campaign typically produces:
      </P>
      <UL>
        <LI>Month 1: 5 to 10 directory citations, 1 to 2 editorial mentions</LI>
        <LI>Month 2: 1 to 2 guest posts published, more directory citations</LI>
        <LI>Month 3: 2 to 4 guest posts, first organic earned mentions</LI>
        <LI>Month 6+: compound growth as your content gets discovered and linked</LI>
      </UL>

      <H2>What Rankday does</H2>
      <P>
        Every Rankday engagement includes 30+ citations and backlinks built during the 90 days. We focus on relevant directories, editorial outreach, and resource page inclusions. No PBNs, no paid link schemes, no spam.
      </P>
      <P>
        The work continues to compound after the 90 days because the links are real placements on credible sites, not rented spots on a link farm. <A href="/how-it-works">See the full 90-day breakdown.</A>
      </P>
    </BlogPostLayout>
  );
}
