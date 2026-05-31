import type { Metadata } from "next";
import { pageMeta, serviceSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BundlePills } from "@/components/bundle-pills";

export const metadata: Metadata = pageMeta({
  title: "Website + SEO for SaaS Companies. Top 3 in 90 Days.",
  description:
    "A new marketing site, top-3 Google rankings, and AI citations for B2B SaaS. Category, comparison, alternative, and feature pages that rank and convert. One fixed price.",
  path: "/seo-for-saas",
});

const saasKeywordTypes = [
  { title: "Category keywords", example: '"best project management tool for agencies"', body: "High volume, high competition. These need content depth and domain authority to crack. We build toward them from week 1.", tone: "pink" },
  { title: "Comparison keywords", example: '"[your tool] vs [competitor]"', body: "High buyer intent. Users searching comparisons are close to a decision. Dedicated comparison pages rank fast and convert well.", tone: "peach" },
  { title: "Feature keywords", example: '"time tracking software with invoicing"', body: "Long-tail, specific intent. Lower competition. Easier to rank. Often the highest-converting traffic on a SaaS site.", tone: "yellow" },
  { title: "Alternative keywords", example: '"[competitor] alternative"', body: "Buyers looking to switch. They have buying intent already. An alternatives page that ranks for these captures them mid-decision.", tone: "mint" },
  { title: "Integration keywords", example: '"CRM that integrates with Slack"', body: "Specific, commercial intent. Usually low competition. These pages work well for both ranking and AI citation.", tone: "lilac" },
];

const serviceLd = serviceSchema({
  name: "SEO for B2B SaaS",
  description: "A new marketing site, top-3 Google rankings, and AI citations for B2B SaaS. Category, comparison, alternative, and feature pages that rank and convert. One fixed price.",
  path: "/seo-for-saas",
  areaServed: ["United Arab Emirates","United Kingdom","United States","Canada","Australia","Singapore","Ireland","New Zealand"],
  offer: { price: "4900", currency: "USD" },
});

export default function SEOForSaaSPage() {
  return (
    <div className="page-enter">
      <JsonLd data={serviceLd} />
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">SaaS and B2B Software</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            A new marketing site + top-3 Google rankings for <span className="it">SaaS companies.</span> In 90 days.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            We rebuild your SaaS marketing site, rank it on Google for category and comparison keywords, and get your tool cited by ChatGPT and Perplexity. All three. In 90 days. One fixed price.
          </p>
          <div data-reveal style={{ marginTop: 28 }}>
            <BundlePills />
          </div>
          <div data-reveal style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/pricing" className="btn btn-primary">
              See pricing <span className="btn-icon"><Icon.Arrow /></span>
            </Link>
            <Link href="/how-it-works" className="btn btn-light">
              How it works <span className="btn-icon"><Icon.Arrow /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="card card-ink" style={{ padding: "48px 56px" }}>
            <p style={{ fontSize: "clamp(18px, 2.2vw, 28px)", color: "#fff", fontWeight: 700, lineHeight: 1.35, letterSpacing: "-0.015em", maxWidth: 800 }}>
              When someone asks ChatGPT "what's the best CRM for a 10-person sales team," it names specific tools. The tools it names are not necessarily the most popular. They are the ones structured to be cited.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">The five keyword types every SaaS site needs to rank for.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              Most SaaS sites rank for their brand name and not much else. These are the pages that drive trial signups from organic search.
            </p>
          </div>

          <div data-reveal-stagger className="r-cards-5">
            {saasKeywordTypes.map((k) => (
              <div key={k.title} className={`card card-${k.tone}`} style={{ padding: 28, minHeight: 220, display: "flex", flexDirection: "column", gap: 12 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{k.title}</h3>
                <p style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--purple)", margin: 0, lineHeight: 1.4 }}>{k.example}</p>
                <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>{k.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="r-aside">
            <div data-reveal className="sticky-aside">
              <h2 className="h1">What rankday builds for SaaS companies.</h2>
              <Link href="/pricing" className="btn btn-primary" style={{ marginTop: 28 }}>
                Growth plan from $7,900 <span className="btn-icon"><Icon.Arrow /></span>
              </Link>
            </div>

            <div data-reveal>
              <p className="body lg" style={{ color: "var(--ink-2)" }}>
                Most SaaS companies have a marketing site that ranks for their brand name and nothing else. Organic traffic is flat. Paid acquisition is the only lever. rankday changes that.
              </p>

              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { title: "Site rebuild around your ICP", body: "Your site rewritten and restructured for the buyers who search your category. Clear positioning, clear CTAs, fast load times." },
                  { title: "Comparison and alternative pages", body: "Dedicated pages for your top comparison and alternative queries. These are among the highest-converting pages a SaaS site can have." },
                  { title: "Feature and use-case pages", body: "Long-tail pages targeting specific feature keywords. Lower competition, faster to rank, high purchase intent." },
                  { title: "AEO for category queries", body: "Schema, structured content, and directory placement so ChatGPT and Perplexity cite you when buyers ask for tools in your category." },
                  { title: "LinkedIn and G2 optimization", body: "Your LinkedIn company page and G2 profile optimized for the keywords buyers search on those platforms." },
                ].map((item, i) => (
                  <div key={item.title} className="card" style={{ padding: 28, display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--purple)", fontWeight: 700, flexShrink: 0, paddingTop: 2 }}>
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>{item.title}</h3>
                      <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5, margin: "8px 0 0" }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}>
              Rank your SaaS in <span className="serif">90 days.</span>
            </h2>
            <a href="https://calendly.com/ijas-rank-day/30min" target="_blank" rel="noopener noreferrer" className="btn btn-light">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
