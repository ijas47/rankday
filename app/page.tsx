import type { Metadata } from "next";
import { pageMeta, faqPageSchema, serviceSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { HeroVisual } from "@/components/hero-visual";
import { Marquee } from "@/components/marquee";

export const metadata: Metadata = pageMeta({
  title: "SEO Agency. Top 3 Rankings + AI Citations in 90 Days.",
  description:
    "rankday rebuilds your site, ranks it top-3 on Google, and gets you cited by ChatGPT, Perplexity & Claude. One fixed price, 90-day guarantee.",
  path: "/",
});
import {
  WebsiteIcon,
  BrandingIcon,
  SearchIcon,
  AIIcon,
  SignalsIcon,
} from "@/components/page-icons";

const aiEngines = [
  { name: "ChatGPT", color: "#10a37f" },
  { name: "Perplexity", color: "#20808d" },
  { name: "Claude", color: "#c96442" },
  { name: "Google AI", color: "#4285f4" },
  { name: "Gemini", color: "#1a73e8" },
];

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
    a: "One fixed price per 90-day engagement: Standard is $4,900 USD and Growth is $7,900 USD (with local pricing in AED and GBP). No retainers and no long contracts.",
  },
  {
    q: "What's the guarantee?",
    a: "If you're not in the top 3 on Google for 90% of your agreed keywords by day 90, we keep working at no extra cost until you are. Keyword scope is agreed and fixed in writing before work starts.",
  },
  {
    q: "Which markets do you work in?",
    a: "The UAE, UK, US, Canada, Australia, Singapore, Ireland, and New Zealand - most English-speaking markets. Arabic-language SEO is available in the UAE and GCC at no extra cost.",
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
      {/* HERO */}
      <section style={{ padding: "32px 0 64px", position: "relative" }}>
        <div className="container">
          <div className="r-hero">
            <div>
              <span className="eyebrow" data-reveal="true">Or we keep working free*</span>
              <h1 className="h-display" data-reveal-text="true" style={{ maxWidth: 680, fontSize: "clamp(32px, 4vw, 56px)", marginTop: 18 }}>
                A new website. Ranked on Google. Cited by <span className="it">AI</span>. In 90 days. One price.
              </h1>
              <div data-reveal-stagger="true" style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "rgba(255,255,255,0.7)", border: "1px solid var(--hairline)", borderRadius: 99, fontSize: 13, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.005em", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: "var(--purple)", flexShrink: 0 }}></span>5 to 12 page website + branding
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "rgba(255,255,255,0.7)", border: "1px solid var(--hairline)", borderRadius: 99, fontSize: 13, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.005em", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: "#10a37f", flexShrink: 0 }}></span>Top 3 on Google for 90% of keywords
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "rgba(255,255,255,0.7)", border: "1px solid var(--hairline)", borderRadius: 99, fontSize: 13, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.005em", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: "#ff8a4c", flexShrink: 0 }}></span>Cited by ChatGPT, Claude, Perplexity
                </span>
              </div>
              <p className="lede" data-reveal="true" style={{ marginTop: 22, maxWidth: 560 }}>
                <strong>rankday</strong> rebuilds your website, ranks it on Google, and gets you cited by AI. All three in 90 days. <strong>One fixed price. No retainer.</strong>
              </p>
              <div data-reveal="true" style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Start your 90 days <span className="btn-icon"><Icon.Arrow /></span></a>
                <a className="btn btn-light" href="/how-it-works">How it works <span className="btn-icon"><Icon.Arrow /></span></a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hv-blob"></div>
              <div className="hv-arch">
                <div className="hv-serp-card">
                  <div className="serp-search"><Icon.Search /><span>plumber near me</span></div>
                  <div className="serp-list">
                    <div className="serp-row top"><span className="serp-rank">1</span><div className="serp-body"><div className="serp-name">Your business <span className="serp-badge">Top 3</span></div><div className="serp-meta"><span className="serp-stars">★ 4.9</span><span>·</span><span>287 reviews</span><span>·</span><span>0.3 mi</span></div></div></div>
                    <div className="serp-row"><span className="serp-rank">2</span><div className="serp-body"><div className="serp-name">Riverside Plumbing</div><div className="serp-meta"><span className="serp-stars">★ 4.6</span><span>·</span><span>142 reviews</span></div></div></div>
                    <div className="serp-row"><span className="serp-rank">3</span><div className="serp-body"><div className="serp-name">Quickfix Co.</div><div className="serp-meta"><span className="serp-stars">★ 4.5</span><span>·</span><span>96 reviews</span></div></div></div>
                  </div>
                </div>
              </div>
              <div className="float-badge hv-loc" style={{ top: "8%", right: -10 }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 38, height: 38, borderRadius: 8, background: "linear-gradient(135deg, #d8c4ff, #e8d4f0)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--purple)" }}><Icon.Map /></div><div><div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>Dubai · UAE</div><div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 700, letterSpacing: "-0.01em" }}>Ranked #1</div></div></div></div>
              <div className="float-badge hv-stats" style={{ bottom: "12%", left: -16 }}><div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Calls this month</div><div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}><span style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>287</span><span style={{ fontSize: 12, fontWeight: 600, color: "#1a9d4b" }}>+42%</span></div><svg width="120" height="28" viewBox="0 0 120 28" style={{ marginTop: 6, display: "block" }}><path d="M0 22 L20 18 L40 20 L60 14 L80 10 L100 6 L120 4" stroke="var(--purple)" strokeWidth="2" fill="none" strokeLinecap="round"></path><path d="M0 22 L20 18 L40 20 L60 14 L80 10 L100 6 L120 4 L120 28 L0 28 Z" fill="var(--purple)" opacity="0.08"></path></svg></div>
              <div className="float-badge" style={{ top: "20%", left: -20 }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: 99, background: "#fff4d4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⭐</div><div><div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 700 }}>4.9 · 287</div><div style={{ fontSize: 10, color: "var(--muted)", fontWeight: 500 }}>Google reviews</div></div></div></div>
              <span className="sparkle pink" style={{ top: "5%", right: "30%", fontSize: 22 }}>✦</span>
              <span className="sparkle" style={{ top: "50%", right: "5%", fontSize: 16 }}>✦</span>
              <span className="sparkle peach" style={{ bottom: "8%", right: "20%", fontSize: 26 }}>✦</span>
              <span className="sparkle" style={{ top: "40%", left: "8%", fontSize: 14 }}>✦</span>
              <span className="sparkle pink" style={{ bottom: "30%", left: "30%", fontSize: 12 }}>✦</span>
              <svg className="hv-curve" width="80" height="60" viewBox="0 0 80 60" style={{ position: "absolute", top: "12%", right: "20%" }}><path d="M 4 50 Q 30 5 70 20" stroke="var(--purple)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 4"></path><path d="M 70 20 L 64 14 M 70 20 L 64 26" stroke="var(--purple)" strokeWidth="1.5" fill="none" strokeLinecap="round"></path></svg>
            </div>
          </div>
          <div data-reveal="true" className="ai-row" style={{ marginTop: 80, padding: 24, background: "rgba(255,255,255,0.6)", border: "1px solid var(--hairline)", borderRadius: 20 }}>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.3, fontWeight: 600, letterSpacing: "-0.005em" }}>We get you cited<br/><strong style={{ color: "var(--ink)", fontWeight: 700 }}>by every AI that matters.</strong></p>
            <div data-reveal-stagger="true" className="r-cards-5" style={{ alignItems: "center" }}>
              {aiEngines.map((e, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 14px", background: "#fff", borderRadius: 12, border: "1px solid var(--hairline)" }}>
                  <span style={{ width: 10, height: 10, borderRadius: 99, background: e.color }}></span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>{e.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ overflow: "hidden", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)", padding: "24px 0", background: "rgba(255,255,255,0.45)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
        <div style={{ display: "flex", gap: 48, whiteSpace: "nowrap", width: "max-content" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 48, fontSize: "clamp(28px, 3.6vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--ink)" }}>90 days<span style={{ color: "var(--purple)", fontSize: "0.7em" }}>✦</span></span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 48, fontSize: "clamp(28px, 3.6vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--ink)" }}>One price<span style={{ color: "var(--purple)", fontSize: "0.7em" }}>✦</span></span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 48, fontSize: "clamp(28px, 3.6vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--ink)" }}>Top 3 on Google<span style={{ color: "var(--purple)", fontSize: "0.7em" }}>✦</span></span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 48, fontSize: "clamp(28px, 3.6vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--ink)" }}>Cited by ChatGPT<span style={{ color: "var(--purple)", fontSize: "0.7em" }}>✦</span></span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 48, fontSize: "clamp(28px, 3.6vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--ink)" }}>Done by day 90<span style={{ color: "var(--purple)", fontSize: "0.7em" }}>✦</span></span>
        </div>
      </section>

      {/* STATS / E-E-A-T */}
      <section className="section">
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Results that compound.</h2>
            <p className="body lg" style={{ maxWidth: 520 }}>Every engagement is a fixed 90 days. Data from deliveries completed 2025-2026.</p>
          </div>
          <div data-reveal-stagger className="r-cards-4">
            {[
              { num: "94%", label: "of clients hit top 3 on 90%+ keywords by day 90" },
              { num: "+312%", label: "avg. increase in AI citation share (ChatGPT + Perplexity)" },
              { num: "0", label: "long contracts or surprise invoices" },
              { num: "16 yrs", label: "founder experience in growth & SEO (Ijas Abdulla)" },
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: 28 }}>
                <p style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.04em", margin: 0 }}>{s.num}</p>
                <p className="body" style={{ marginTop: 8 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 12, color: "var(--muted)" }}>Source: Internal delivery data + client-reported rankings. Your results will vary based on competition and starting point.</p>
        </div>
      </section>

      {/* AUDIENCE + MARKETS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Built for businesses that need leads now.</h2>
          </div>
          <div data-reveal-stagger className="r-2">
            <div className="card" style={{ padding: 32 }}>
              <p className="kicker">Who it’s for</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {audience.map((a, i) => <span key={i} className="pill">{a}</span>)}
              </div>
            </div>
            <div className="card" style={{ padding: 32 }}>
              <p className="kicker">Markets</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {markets.map(([m, c], i) => <span key={i} className={`pill card-${c}`}>{m}</span>)}
              </div>
              <p style={{ marginTop: 12, fontSize: 13, color: "var(--muted)" }}>English-primary + Arabic in UAE/GCC at no extra cost.</p>
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
              { href: "/tools/ai-visibility-report", title: "Free AI Visibility Report", body: "20 buyer prompts + readiness + 5 fixes. Zero AI API cost. Live engine checks only when you pay." },
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
