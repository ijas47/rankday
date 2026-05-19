import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BundlePills } from "@/components/bundle-pills";

export const metadata: Metadata = {
  title: "Website + SEO for Facilities Management Companies.",
  description:
    "A new website, top-3 Google rankings, and AI citations for facilities management companies. Hard, soft, and integrated FM. One fixed price. 90-day guarantee.",
};

const keywords = [
  { intent: "Integrated FM", examples: '"facilities management company Dubai", "integrated FM services UAE", "total FM contractor"', tone: "pink" },
  { intent: "Hard services", examples: '"MEP maintenance Dubai", "HVAC maintenance contractor UAE", "building maintenance company Dubai"', tone: "peach" },
  { intent: "Soft services", examples: '"cleaning company Dubai", "security services UAE", "landscaping maintenance Dubai"', tone: "yellow" },
  { intent: "Sector", examples: '"FM company for commercial property UAE", "FM services for hospitals Dubai", "facilities management retail"', tone: "mint" },
];

export default function SEOForFacilitiesManagementPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Facilities Management</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            A new website + top-3 Google rankings for <span className="it">facilities management</span> companies. In 90 days.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            We rebuild your FM company website, rank it on Google for the service lines and sectors you target, and get you cited by AI when procurement teams research. All three. In 90 days. One fixed price.
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
            <h2 className="h1">The searches that bring in FM contracts.</h2>
          </div>
          <div data-reveal-stagger style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {keywords.map((k) => (
              <div key={k.intent} className={`card card-${k.tone}`} style={{ padding: "22px 28px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", minWidth: 150 }}>{k.intent}</span>
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
              <h2 className="h1">What Rankday builds for FM companies.</h2>
              <Link href="/pricing" className="btn btn-primary" style={{ marginTop: 28 }}>Growth from $7,900 <span className="btn-icon"><Icon.Arrow /></span></Link>
            </div>
            <div data-reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { title: "Service line pages", body: "Separate pages for hard services, soft services, integrated FM, and any specialisations. Each page targets the specific searches procurement teams run for that service category." },
                  { title: "Sector pages", body: "FM buyers often search by their own sector: commercial property, healthcare, education, hospitality. We build sector-specific pages that speak directly to each buyer's context." },
                  { title: "Authority signals for B2B", body: "FM contracts are high-value and long-term. Buyers scrutinise. We build the content, third-party mentions, and credentials visibility that makes your company credible at first glance." },
                  { title: "AI citation for procurement research", body: "When a property manager asks AI for recommended FM companies in the UAE, we make sure yours is named. Structured content, industry directories, and schema all feed this." },
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
            <h2 className="h1" style={{ color: "#fff" }}>Rank your FM company in <span className="serif">90 days.</span></h2>
            <Link href="/pricing" className="btn btn-light">Start your 90 days <span className="btn-icon"><Icon.Arrow /></span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
