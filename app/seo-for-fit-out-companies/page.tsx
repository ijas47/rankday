import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BundlePills } from "@/components/bundle-pills";

export const metadata: Metadata = {
  title: "Website + SEO for Fit Out Companies. Top 3 in 90 Days.",
  description:
    "A new website, top-3 Google rankings, and AI citations for fit out companies. Office, retail, hospitality. One fixed price. 90-day guarantee.",
};

const keywords = [
  { intent: "Office fit out", examples: '"office fit out Dubai", "office interior fit out UAE", "office refurbishment contractor Dubai"', tone: "pink" },
  { intent: "Retail", examples: '"retail fit out Dubai", "shop fit out UAE", "retail interior contractor"', tone: "peach" },
  { intent: "Hospitality", examples: '"restaurant fit out Dubai", "hotel fit out UAE", "F&B interior fit out"', tone: "yellow" },
  { intent: "Turnkey", examples: '"turnkey fit out Dubai", "design and build fit out UAE", "fit out contractor Dubai"', tone: "mint" },
];

export default function SEOForFitOutCompaniesPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Fit Out and Interiors</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            A new website + top-3 Google rankings for <span className="it">fit out companies.</span> In 90 days.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            We rebuild your fit out company website, rank it on Google for the sectors you want to win, and get you cited by AI search. All three. In 90 days. One fixed price.
          </p>
          <div data-reveal style={{ marginTop: 28 }}>
            <BundlePills />
          </div>
          <div data-reveal style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/pricing" className="btn btn-primary">See pricing <span className="btn-icon"><Icon.Arrow /></span></Link>
            <Link href="/how-it-works" className="btn btn-light">How it works <span className="btn-icon"><Icon.Arrow /></span></Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="card card-purple" style={{ padding: "40px 48px" }}>
            <p style={{ fontSize: "clamp(18px, 2.2vw, 26px)", color: "#fff", fontWeight: 700, lineHeight: 1.35, letterSpacing: "-0.015em", maxWidth: 760 }}>
              Dubai's fit out market is among the most active in the world. The companies that win the best projects are not always the best at fit out. They are the ones clients find first.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">The searches that bring in fit out projects.</h2>
          </div>
          <div data-reveal-stagger style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {keywords.map((k) => (
              <div key={k.intent} className={`card card-${k.tone}`} style={{ padding: "22px 28px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", minWidth: 140 }}>{k.intent}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-2)", flex: 1 }}>{k.examples}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="r-aside">
            <div data-reveal className="sticky-aside">
              <h2 className="h1">What Rankday builds for fit out companies.</h2>
              <Link href="/pricing" className="btn btn-primary" style={{ marginTop: 28 }}>See pricing <span className="btn-icon"><Icon.Arrow /></span></Link>
            </div>
            <div data-reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { title: "Sector pages for each vertical", body: "Separate pages for office, retail, hospitality, healthcare, and any other sector you work in. Each page targets the specific searches buyers in that sector run when looking for a fit out contractor." },
                  { title: "Project portfolio for SEO", body: "Completed project pages that showcase your work and rank for project type and location keywords. These build both credibility and search visibility simultaneously." },
                  { title: "Developer and B2B targeting", body: "We build the content and authority that ranks you for the developer and corporate procurement searches. Design and build, turnkey, and BOQ-based fit out queries all targeted." },
                  { title: "AI citation for procurement searches", body: "Procurement managers now use AI tools to research and shortlist fit out companies. We make sure your company appears in those answers with the right project credentials visible." },
                  { title: "Top 3 guarantee", body: "Top 3 for 90% of agreed keywords by day 90, or we keep working at no extra cost." },
                ].map((item, i) => (
                  <div key={item.title} className="card" style={{ padding: 28, display: "flex", gap: 20 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--purple)", fontWeight: 700, flexShrink: 0, paddingTop: 2 }}>/{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{item.title}</h3>
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
            <h2 className="h1" style={{ color: "#fff" }}>Rank your fit out company in <span className="serif">90 days.</span></h2>
            <a href="https://calendly.com/ijas-rank-day/30min" target="_blank" rel="noopener noreferrer" className="btn btn-light">Start your 90 days <span className="btn-icon"><Icon.Arrow /></span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
