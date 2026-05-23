import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BundlePills } from "@/components/bundle-pills";

export const metadata: Metadata = {
  title: "Website + SEO for Contractors. Top 3 in 90 Days.",
  description:
    "A new website, top-3 Google rankings, and AI citations for contractors and construction companies. Residential and commercial. One fixed price. 90-day guarantee.",
};

const keywords = [
  { intent: "Residential", examples: '"villa renovation contractor Dubai", "home renovation company UAE", "residential contractor [city]"', tone: "pink" },
  { intent: "Commercial", examples: '"commercial construction company Dubai", "office renovation contractor UAE"', tone: "peach" },
  { intent: "Specialist", examples: '"MEP contractor Dubai", "civil contractor UAE", "turnkey construction company"', tone: "yellow" },
  { intent: "Project type", examples: '"warehouse construction Dubai", "villa extension contractor", "building refurbishment UAE"', tone: "mint" },
];

export default function SEOForContractorsPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Construction and Contracting</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            A new website + top-3 Google rankings for <span className="it">contractors.</span> In 90 days.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            We rebuild your contracting website, rank it on Google for the project types you want to win, and get you cited by AI search. All three. In 90 days. One fixed price.
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
          <div data-reveal className="r-header">
            <h2 className="h1">The searches that bring in construction projects.</h2>
          </div>
          <div data-reveal-stagger style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {keywords.map((k) => (
              <div key={k.intent} className={`card card-${k.tone}`} style={{ padding: "22px 28px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", minWidth: 130 }}>{k.intent}</span>
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
              <h2 className="h1">What Rankday builds for contractors.</h2>
              <Link href="/pricing" className="btn btn-primary" style={{ marginTop: 28 }}>See pricing <span className="btn-icon"><Icon.Arrow /></span></Link>
            </div>
            <div data-reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { title: "Project type and specialisation pages", body: "Separate pages for each project type and specialisation you want to win. Residential, commercial, MEP, civil. Each page targets the specific searches that bring in those projects." },
                  { title: "Portfolio and project showcase", body: "Construction clients want to see proof. We build a site structure that showcases completed projects in a way that supports both credibility and keyword ranking." },
                  { title: "B2B and developer targeting", body: "If you want to work with developers and commercial clients, we build the authority signals and content that puts you in front of those buyers when they research contractors." },
                  { title: "AI citation for contractor queries", body: "Procurement teams and developers now use AI tools to research and shortlist contractors. We make sure your business appears in those answers with the right credentials visible." },
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
            <h2 className="h1" style={{ color: "#fff" }}>Rank your contracting business in <span className="serif">90 days.</span></h2>
            <a href="https://calendly.com/ijas-rank-day/30min" target="_blank" rel="noopener noreferrer" className="btn btn-light">Start your 90 days <span className="btn-icon"><Icon.Arrow /></span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
