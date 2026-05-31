import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("mobile-first-indexing-explained")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Mobile-first indexing means Google uses the mobile version of your site as the primary version it crawls, indexes, and ranks. If your mobile experience is worse than your desktop experience, Google is judging you on your worst content.
      </P>
      <P>
        Most site owners still think of the desktop experience as the "real" site and mobile as the secondary one. That has been backwards since 2019, and the gap has widened every year since.
      </P>

      <H2>What mobile-first actually means</H2>
      <P>
        Until 2019, Google had two crawlers: a desktop crawler that crawled and indexed the desktop version, and a mobile crawler that supplemented it. Desktop was the canonical version. Mobile was the bonus.
      </P>
      <P>
        Since 2019, this has been inverted. The mobile version is the canonical version. Google's main crawler is the smartphone Googlebot. Desktop content is sometimes considered as a supplement but is not the primary signal.
      </P>
      <P>
        Consequences:
      </P>
      <UL>
        <LI>If a page exists on desktop but is hidden on mobile, Google may not index it</LI>
        <LI>If an image exists on desktop but is removed on mobile, Google does not see it</LI>
        <LI>If structured data is on desktop but missing on mobile, the schema is missing for Google's purposes</LI>
        <LI>If page load is fast on desktop but slow on mobile, Google ranks you based on the slow version</LI>
      </UL>

      <H2>How to know if mobile-first is hurting you</H2>

      <H3>Symptoms</H3>
      <UL>
        <LI>Pages drop in rankings after a Google algorithm update</LI>
        <LI>Mobile traffic declines disproportionately compared to desktop</LI>
        <LI>Search Console shows pages indexed but ranking poorly</LI>
        <LI>Page speed is fine on desktop but bad on mobile</LI>
      </UL>

      <H3>Quick diagnostic</H3>
      <P>
        Open Search Console. Under Pages, look at "Crawl" data. The User-agent column tells you which crawler last visited each page. If it consistently shows "Smartphone" Googlebot, you are on mobile-first indexing (almost all sites are by 2026).
      </P>
      <P>
        Then visit your most important pages on your phone. Compare to desktop. Anything missing, broken, or worse on mobile is something Google is judging you on.
      </P>

      <H2>Common mobile-first issues</H2>

      <H3>1. Content hidden on mobile</H3>
      <P>
        Some responsive designs hide certain sections on mobile (sidebars, secondary navigation, "expandable" content). If that content matters for ranking, hiding it costs you.
      </P>
      <P>
        Fix: render the same content on mobile and desktop. Use responsive layout to rearrange, not to remove.
      </P>

      <H3>2. Smaller H1s and headings</H3>
      <P>
        H1 and H2 hierarchy should be identical on mobile and desktop. If your mobile shows the H1 in a small font that visually reads as body text, you may also be marking it up wrong in the HTML.
      </P>

      <H3>3. Images at lower quality on mobile</H3>
      <P>
        Responsive images are good. But if your mobile images are so compressed they lose visual quality and alt text is missing or different, image search ranking suffers.
      </P>

      <H3>4. Different structured data</H3>
      <P>
        Schema markup must be present on mobile, not just desktop. Some templates accidentally inject schema only when desktop CSS rules apply.
      </P>

      <H3>5. Slow mobile load times</H3>
      <P>
        Core Web Vitals are measured separately for mobile. A site that scores 95 on desktop and 45 on mobile is ranked based on the 45.
      </P>

      <H3>6. Intrusive interstitials</H3>
      <P>
        Pop-ups, full-screen overlays, and aggressive cookie banners on mobile are penalised more strictly than on desktop. They block the content the user came to see.
      </P>

      <H3>7. Tap targets too small</H3>
      <P>
        Buttons and links should be at least 48×48 pixels with sufficient spacing. Cramped targets cause accidental taps and fail mobile usability checks.
      </P>

      <H3>8. Horizontal scroll</H3>
      <P>
        Mobile pages should never require horizontal scroll. Test by loading on your phone in portrait. If you have to scroll sideways to read, the layout is broken.
      </P>

      <H2>Mobile usability tests to run</H2>

      <H3>Google Search Console: Mobile Usability report</H3>
      <P>
        Search Console flags specific mobile issues per page: text too small, clickable elements too close, content wider than screen. Fix each one.
      </P>

      <H3>PageSpeed Insights mobile score</H3>
      <P>
        Aim for 90+ on mobile. Anything below 50 is actively hurting rankings. The report tells you which specific assets are slow.
      </P>

      <H3>Manual phone test</H3>
      <P>
        Open your top 5 pages on your phone, in cellular network mode (not Wi-Fi). Time the load. Try to tap every button. Read the content. Anything that feels broken to you is broken for users.
      </P>

      <H2>What good mobile-first design looks like</H2>
      <UL>
        <LI>Same content as desktop, never less</LI>
        <LI>Fast initial render (LCP under 2.5 seconds on 4G)</LI>
        <LI>Single column layout that works on narrow screens without zoom</LI>
        <LI>Tap targets at least 48×48 pixels with comfortable spacing</LI>
        <LI>Large readable text (16 pixels minimum body font)</LI>
        <LI>No horizontal scroll, no zoom required</LI>
        <LI>Cookie banner and email opt-in modals minimised on mobile (or absent until users engage)</LI>
        <LI>Images responsive with srcset and proper width/height attributes</LI>
        <LI>Schema markup applied to mobile, not just desktop</LI>
      </UL>

      <Callout tone="mint">
        Practical exercise. Open your homepage on your phone. Time how long until you can interact (tap something useful, not just see the page). If it is over 3 seconds, you have a mobile speed problem regardless of what Search Console reports.
      </Callout>

      <H2>Mobile-first and AI search</H2>
      <P>
        AI engines like ChatGPT and Perplexity that browse the live web typically pull the version of your site they see when rendering. If your mobile version is the canonical, that is what they see and cite.
      </P>
      <P>
        AEO and GEO inherit the mobile-first reality. A site that renders poorly on mobile gets cited less by AI engines for similar reasons it ranks lower on Google.
      </P>

      <H2>What rankday does</H2>
      <P>
        Every rankday-built site is designed mobile-first from the start. We test on real phones, target Core Web Vitals scores of 90+ on mobile, and ensure that mobile is the canonical experience, not a degraded version of the desktop site.
      </P>
      <P>
        This is foundational. A site that fails mobile-first cannot rank consistently, no matter how good the content or backlinks are. <A href="/how-it-works">See the 90-day breakdown</A> for the full technical scope.
      </P>
    </BlogPostLayout>
  );
}
