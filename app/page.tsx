import type { Metadata } from "next";
import { pageMeta, faqPageSchema, serviceSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { HomeHero } from "@/components/home-hero";

export const metadata: Metadata = pageMeta({
  title: "SEO Agency. Top 3 Rankings + AI Citations in 90 Days.",
  description:
    "rankday rebuilds your site, ranks it top-3 on Google, and gets you cited by ChatGPT, Perplexity & Claude. One fixed price, 90-day guarantee.",
  path: "/",
});

const audience = [
  "Local services",
  "B2B SaaS",
  "Agencies",
  "Consultancies",
  "Professional services",
  "Clinics",
  "Law firms",
  "Real estate",
  "Hospitality",
];

const markets: Array<[string, string]> = [
  ["India", "lilac"],
  ["UAE", "pink"],
  ["UK", "peach"],
  ["US", "yellow"],
  ["Canada", "mint"],
  ["Australia", "lilac"],
  ["Singapore", "pink"],
  ["Ireland", "peach"],
  ["New Zealand", "mint"],
];

const homeFaqs: FaqItem[] = [
  {
    q: "What does rankday actually deliver in 90 days?",
    a: "A rebuilt website, top-3 Google rankings for your agreed keywords, and citations in AI search (ChatGPT, Perplexity, Claude, Google AI), all for one fixed price, with a top-3 guarantee on 90% of agreed keywords or we keep working free.",
  },
  {
    q: "How much does it cost?",
    a: "One fixed price per 90-day engagement: Standard $4,900, Growth $7,900, Commerce (Shopify/ecom) $9,900, Commerce Scale $14,900 (USD, with local pricing in AED, GBP, and INR). No retainers and no long contracts.",
  },
  {
    q: "What's the guarantee?",
    a: "If you're not in the top 3 on Google for 90% of your agreed keywords by day 90, we keep working at no extra cost until you are. Keyword scope is agreed and fixed in writing before work starts.",
  },
  {
    q: "Which markets do you work in?",
    a: "India (including Kerala and all major cities), the UAE, UK, US, Canada, Australia, Singapore, Ireland, and New Zealand. Malayalam-language SEO is available across Kerala, and Arabic in the UAE and GCC, both at no extra cost.",
  },
  {
    q: "How much of my time does it take?",
    a: "Almost none. You approve the keyword list and the site in week 1, then answer two short questions a week. We handle everything else.",
  },
];

const homeServiceLd = serviceSchema({
  name: "90-Day SEO & AEO Engagement",
  description:
    "rankday rebuilds your website, ranks it in the Google top 3, and gets you cited by AI search engines, in a fixed 90-day engagement with a top-3 ranking guarantee.",
  path: "/",
  areaServed: [
    "India",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
    "Singapore",
    "Ireland",
    "New Zealand",
  ],
  offer: { price: "4900", currency: "USD" },
});

export default function HomePage() {
  return (
    <div className="page-enter">
      <HomeHero />

      <Marquee
        items={["90 days", "One price", "Top 3 on Google", "Cited by ChatGPT", "Shopify + SEO", "Done by day 90"]}
        speed={36}
      />

      {/* THE OFFER — editorial ledger, no repeated stat-card template */}
      <section className="section">
        <div className="container">
          <div className="offer-split">
            <div data-reveal className="offer-lead">
              <h2 className="h1">
                Built around a <span className="it">finish line</span>, not a retainer.
              </h2>
              <p className="body lg" style={{ marginTop: 20 }}>
                Most agencies bill you monthly and hope. We agree the keywords in writing, fix one price,
                and work to a date. Top&nbsp;3 on 90% of that list by day&nbsp;90, or we keep going free.
              </p>
              <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 10 }}>
                <Link href="/results" className="btn btn-ghost btn-sm">
                  See case studies<span className="btn-icon"><Icon.Arrow /></span>
                </Link>
                <Link href="/pricing" className="btn btn-primary btn-sm">
                  View pricing<span className="btn-icon"><Icon.Arrow /></span>
                </Link>
              </div>
            </div>

            <ol data-reveal-stagger className="offer-ledger">
              {[
                { k: "01", t: "A website that can actually rank", d: "A new 5–12 page site, rebuilt for Core Web Vitals, schema, and clean structure — not a patch on the old one." },
                { k: "02", t: "Top-3 on the keywords you name", d: "Scope agreed and locked before day one. Tracked on a written scoreboard you can check any day." },
                { k: "03", t: "Cited by the AI engines buyers use", d: "Structured so ChatGPT, Perplexity, Claude and Google AI can understand and recommend your business." },
                { k: "04", t: "One price. No retainer trap.", d: "Fixed for the full 90-day build. When the finish line is met, you own the result — no monthly leash." },
              ].map((r) => (
                <li key={r.k} className="offer-item">
                  <span className="offer-item-k">{r.k}</span>
                  <div>
                    <h3 className="offer-item-t">{r.t}</h3>
                    <p className="offer-item-d">{r.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <p style={{ marginTop: 28, fontSize: 13, color: "var(--muted)", maxWidth: 640 }}>
            Individual results vary by competition, domain history, and how fast approvals move.
            See example engagements on the results page.
          </p>
        </div>
      </section>

      {/* AUDIENCE + MARKETS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Built for businesses that need leads now.</h2>
            <p className="body lg">High-ticket, high-intent categories where one more top-3 keyword pays for the whole engagement.</p>
          </div>
          <div data-reveal-stagger className="r-2">
            <div className="card" style={{ padding: 32 }}>
              <p className="eyebrow" style={{ marginBottom: 18 }}>Who it&rsquo;s for</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {audience.map((a, i) => <span key={i} className="pill">{a}</span>)}
              </div>
            </div>
            <div className="card" style={{ padding: 32 }}>
              <p className="eyebrow" style={{ marginBottom: 18 }}>Markets</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {markets.map(([m, c], i) => <span key={i} className={`pill card-${c}`}>{m}</span>)}
              </div>
              <p style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>English-primary, with Arabic in UAE/GCC and Malayalam across Kerala at no extra cost.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR TABLE - EXTRACTABLE */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">rankday vs traditional SEO retainers</h2>
            <p className="body lg">Source: 50+ client deliveries, 2025-2026 internal data.</p>
          </div>
          <div data-reveal style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--hairline)" }}>
                  <th style={{ textAlign: "left", padding: "12px 8px" }}></th>
                  <th style={{ textAlign: "left", padding: "12px 8px", color: "var(--purple)", fontWeight: 700 }}>rankday</th>
                  <th style={{ textAlign: "left", padding: "12px 8px" }}>Typical retainer agency</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--hairline)" }}><td style={{ padding: "12px 8px", fontWeight: 600 }}>Price model</td><td style={{ padding: "12px 8px" }}>One fixed price. 90 days.</td><td style={{ padding: "12px 8px" }}>Monthly retainer, 6-12 months minimum</td></tr>
                <tr style={{ borderBottom: "1px solid var(--hairline)" }}><td style={{ padding: "12px 8px", fontWeight: 600 }}>Guarantee</td><td style={{ padding: "12px 8px" }}>Top 3 on 90% or we keep working free</td><td style={{ padding: "12px 8px" }}>“We’ll do our best”</td></tr>
                <tr style={{ borderBottom: "1px solid var(--hairline)" }}><td style={{ padding: "12px 8px", fontWeight: 600 }}>Website</td><td style={{ padding: "12px 8px" }}>New custom 5-12 page site included</td><td style={{ padding: "12px 8px" }}>“Optimise your existing site”</td></tr>
                <tr style={{ borderBottom: "1px solid var(--hairline)" }}><td style={{ padding: "12px 8px", fontWeight: 600 }}>AI Citations (AEO)</td><td style={{ padding: "12px 8px" }}>Built in. Tracked weekly.</td><td style={{ padding: "12px 8px" }}>Rarely offered or tracked</td></tr>
                <tr><td style={{ padding: "12px 8px", fontWeight: 600 }}>Finish line</td><td style={{ padding: "12px 8px" }}>Day 90. Done or free extension.</td><td style={{ padding: "12px 8px" }}>Ongoing monthly fees</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FREE TOOLS FUNNEL */}
      <section className="section">
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Free tools that prove the model.</h2>
            <p className="body lg">Use them. See the gaps. Then decide if you want the full service.</p>
          </div>
          <div data-reveal-stagger className="r-3">
            {[
              { href: "/tools/ai-visibility-report", title: "Free AI Visibility Report", body: "20 buyer prompts AI answers, site readiness check, and 5 fixes to get recommended." },
              { href: "/tools/aeo-score", title: "Free AEO Score", body: "Instant score + exact fixes to get cited by ChatGPT, Perplexity, Claude." },
              { href: "/tools/website-seo-audit", title: "Free Website SEO Audit", body: "Technical + schema + AI-readiness in one clean report." },
            ].map((t, i) => (
              <Link key={i} href={t.href} className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12, textDecoration: "none" }}>
                <h3 style={{ fontSize: 18, margin: 0, fontWeight: 700 }}>{t.title}</h3>
                <p className="body" style={{ margin: 0 }}>{t.body}</p>
                <span style={{ marginTop: "auto", color: "var(--purple)", fontWeight: 600, fontSize: 14 }}>Run it free →</span>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>These tools are free forever. Many users start here and then book the 90-day service.</p>
        </div>
      </section>

      <FaqSection heading="Common questions." intro="The questions businesses ask before they start." items={homeFaqs} />

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}><span className="serif">Start</span> your 90 days.</h2>
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-light">Start your 90 days <span className="btn-icon"><Icon.Arrow /></span></a>
          </div>
        </div>
      </section>

      <JsonLd data={homeServiceLd} />
      <JsonLd data={faqPageSchema(homeFaqs)} />
    </div>
  );
}
