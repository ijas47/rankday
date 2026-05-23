import type { Metadata } from "next";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("why-did-my-google-ranking-drop")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        A sudden ranking drop is one of the most stressful things in SEO. Traffic falls. Phones go quiet. You did not change anything (you think) and yet position 3 has become position 17 overnight.
      </P>
      <P>
        Panicking does not help. Working through a diagnostic in order does. Here is the order, with the recovery playbook for each cause.
      </P>

      <H2>The diagnostic order</H2>

      <H3>1. Verify the drop is real</H3>
      <P>
        Before you fix anything, confirm the drop actually happened. Rankings fluctuate normally by 1 to 3 positions day to day. A drop of 1 to 2 spots that lasts 2 days is noise, not a problem.
      </P>
      <P>
        Open Google Search Console &gt; Performance. Set the date range to the last 90 days. Filter by the affected query or page. If the drop is real and persistent, it will show clearly.
      </P>
      <P>
        Also: check if the drop is on one keyword or many. One keyword = page-level issue. Many keywords across the site = site-wide issue.
      </P>

      <H3>2. Check the date the drop started</H3>
      <P>
        The exact date matters. Google rolls out algorithm updates on specific days. If your drop matches a known update date, you have your likely cause.
      </P>
      <P>
        Check Google's official algorithm updates page or sites like Search Engine Land's "Google algorithm updates" tracker. Cross-reference your drop date with their list.
      </P>
      <P>
        If the date matches an algorithm update, the cause is likely one of: content quality, E-E-A-T, helpful content, spam, or core update.
      </P>

      <H3>3. Check for site changes</H3>
      <P>
        Almost every "we didn't change anything" drop turns out to involve a change. Investigate:
      </P>
      <UL>
        <LI>Did you redesign or relaunch the site recently?</LI>
        <LI>Did you migrate to a new platform?</LI>
        <LI>Did you change URLs, even slightly?</LI>
        <LI>Did you install or remove a plugin?</LI>
        <LI>Did you change hosting?</LI>
        <LI>Did you update content on the affected pages?</LI>
        <LI>Did you change meta titles or descriptions?</LI>
      </UL>
      <P>
        Even small changes can have large effects. A URL change without redirects, a plugin that injects noindex tags, a theme update that breaks schema. All cause sudden drops.
      </P>

      <H3>4. Check Search Console for manual actions</H3>
      <P>
        Search Console &gt; Security &amp; Manual Actions &gt; Manual Actions. If there is anything here other than "No issues detected," you have a manual penalty from Google's team.
      </P>
      <P>
        Manual actions are rare but devastating. They almost always require you to fix the underlying issue (spammy links, hacked content, deceptive practices) and submit a reconsideration request.
      </P>

      <H3>5. Check indexation status</H3>
      <P>
        Search Console &gt; Pages. Make sure the affected pages are still indexed. Sometimes pages drop out of the index entirely.
      </P>
      <P>
        Common causes: accidental noindex tag, removed from sitemap, blocked by robots.txt change, canonical pointing elsewhere.
      </P>

      <H3>6. Check Core Web Vitals</H3>
      <P>
        If Core Web Vitals scores tanked recently, rankings can drop. Common cause: heavy new scripts added (ads, chat widgets, analytics), unoptimized images, slow hosting after traffic spike.
      </P>

      <H3>7. Check backlinks</H3>
      <P>
        Look at your backlink profile in Ahrefs or Search Console &gt; Links. Did you lose major backlinks recently? Did spammy backlinks appear (possibly a negative SEO attack)?
      </P>
      <P>
        Lost authority backlinks can cause ranking drops. Sudden influx of low-quality backlinks can trigger a penalty.
      </P>

      <H3>8. Check competitor activity</H3>
      <P>
        Sometimes you did not drop. Your competitors rose. Look at who is now above you. Did they publish new content? Earn new backlinks? Launch a new product page?
      </P>
      <P>
        If competitors are now better optimised, you need to respond by improving your own content depth, internal linking, or backlinks.
      </P>

      <H3>9. Check search intent shift</H3>
      <P>
        Google sometimes reinterprets search intent. A query that used to favour service pages might now favour comparison content. If the SERP for your target keyword has shifted (different result types now dominate), your page format may no longer match intent.
      </P>
      <P>
        Run the query yourself. What format are the top 3 results now? If different from before, your page may need a structural change.
      </P>

      <H2>Recovery playbooks by cause</H2>

      <H3>Core algorithm update</H3>
      <P>
        Google's core updates re-evaluate the entire algorithm's calibration. Sites with weak E-E-A-T, thin content, or low user satisfaction often drop. Sites with strong fundamentals often rise.
      </P>
      <P>
        Recovery: improve content quality, add expert author attribution, deepen pages with original insight, earn authority signals. Recovery from core updates typically takes 3 to 6 months because you have to wait for the next update to incorporate your improvements.
      </P>

      <H3>Helpful Content update</H3>
      <P>
        Targets sites that mass-produce thin, AI-written, or low-effort content designed to rank rather than to help users.
      </P>
      <P>
        Recovery: audit your content. Delete or rewrite the weakest 20%. Focus on demonstrating real experience and expertise. Cut AI-generated filler.
      </P>

      <H3>Spam update</H3>
      <P>
        Targets sites with manipulative practices: link schemes, cloaking, scraped content, doorway pages.
      </P>
      <P>
        Recovery: clean up the practices. Disavow spammy backlinks. Delete or rebuild compromised content. Submit a reconsideration request if you have a manual action.
      </P>

      <H3>Site migration without redirects</H3>
      <P>
        Common cause: changed URL structure or moved to a new domain without 301 redirects.
      </P>
      <P>
        Recovery: set up 301 redirects from old URLs to new ones. Update internal links to point to new URLs. Resubmit sitemap to Search Console. Recovery typically 4 to 8 weeks.
      </P>

      <H3>Lost backlinks</H3>
      <P>
        Recovery: identify which backlinks were lost. Reach out to the linking sites to restore. Build new backlinks to replace lost authority. Slow process.
      </P>

      <H3>Competitor improvement</H3>
      <P>
        Recovery: match or exceed the competitor's content. Improve your internal linking. Earn new backlinks. Update content with fresher data.
      </P>

      <H3>Search intent shift</H3>
      <P>
        Recovery: rewrite the page to match the new dominant intent format. If the SERP now favours listicles, rewrite as a listicle. If it favours comparisons, add comparison content.
      </P>

      <Callout tone="pink">
        First principle. Do not panic-make changes during a ranking drop. Diagnose first. Random changes during a drop often make things worse. Identify the cause, then execute the specific recovery playbook.
      </Callout>

      <H2>Realistic recovery timelines</H2>
      <UL>
        <LI><Strong>Technical issue (noindex, broken redirect, blocked crawler):</Strong> 1 to 3 weeks after fixing.</LI>
        <LI><Strong>Lost backlinks:</Strong> 4 to 12 weeks to rebuild authority.</LI>
        <LI><Strong>Content quality issue:</Strong> 2 to 6 months. Requires next algorithm update to fully recover.</LI>
        <LI><Strong>Manual action:</Strong> 4 to 8 weeks after a successful reconsideration request, but only after the underlying issue is genuinely fixed.</LI>
        <LI><Strong>Core algorithm update:</Strong> 3 to 9 months. You have to wait for the next core update to incorporate your improvements.</LI>
      </UL>

      <H2>Preventing future drops</H2>
      <UL>
        <LI><Strong>Monitor Search Console weekly.</Strong> Catch drops early before they compound.</LI>
        <LI><Strong>Document every site change.</Strong> Keep a log of redesigns, migrations, plugin installs. When a drop happens, you can correlate with changes.</LI>
        <LI><Strong>Maintain content quality.</Strong> Audit and refresh older pages quarterly. Delete or rebuild weak content.</LI>
        <LI><Strong>Build diverse backlinks.</Strong> Do not rely on one or two big backlinks. Diversify across many credible sources.</LI>
        <LI><Strong>Build other channels.</Strong> Direct traffic, email, social, AI search citations all reduce dependence on any single algorithm.</LI>
      </UL>

      <H2>What Rankday does</H2>
      <P>
        We monitor Search Console weekly for every active client. Sudden drops trigger an immediate diagnostic before any reactive changes. The 90-day playbook also builds resilience: clean technical foundation, real content, diverse backlinks, AI citation work. Sites with this foundation drop less often and recover faster.
      </P>
      <P>
        If you are dealing with a ranking drop now, the first step is the diagnostic above. <A href="/faq">Get in touch via WhatsApp on the FAQ page</A> if you want a specific opinion on what to do.
      </P>
    </BlogPostLayout>
  );
}
