import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BundlePills } from "@/components/bundle-pills";

export const metadata: Metadata = {
  title: "Website + SEO for Maid Services and Cleaning Companies.",
  description:
    "A new website, top-3 Google rankings, and AI citations for cleaning and maid services. Regular, deep clean, specialist. One fixed price. 90-day guarantee.",
};

const keywords = [
  { intent: "Regular cleaning", examples: '"maid service Dubai", "regular cleaning Dubai", "weekly cleaning service UAE"', tone: "pink" },
  { intent: "Deep clean", examples: '"deep cleaning Dubai", "one-time deep clean UAE", "move-in cleaning service Dubai"', tone: "peach" },
  { intent: "Specialist", examples: '"carpet cleaning Dubai", "sofa cleaning UAE", "post-construction cleaning Dubai"', tone: "yellow" },
  { intent: "Location", examples: '"maid service JBR", "cleaning company Downtown Dubai", "maid [area or building]"', tone: "mint" },
];

export default function SEOForMaidServicesPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Maid and Cleaning Services</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            A new website + top-3 Google rankings for <span className="it">maid services.</span> In 90 days.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            We rebuild your cleaning company website, rank it on Google for the bookings you want, and get you cited by AI search. All three. In 90 days. One fixed price.
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
            <h2 className="h1">The searches that bring in cleaning bookings.</h2>
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
              <h2 className="h1">What Rankday builds for cleaning companies.</h2>
              <Link href="/pricing" className="btn btn-primary" style={{ marginTop: 28 }}>Standard from $4,900 <span className="btn-icon"><Icon.Arrow /></span></Link>
            </div>
            <div data-reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { title: "Service and area pages", body: "Dedicated pages for each service type (regular, deep clean, specialist) plus location pages for the areas you cover. These are the pages that rank for the specific searches your customers make." },
                  { title: "Google Business Profile rebuild", body: "Most cleaning bookings start with a Google search that lands on a GBP listing. We rebuild yours completely: categories, services, photos, Q&A, and a review system that keeps new reviews coming." },
                  { title: "Review collection system", body: "Reviews drive cleaning bookings. We set up a simple post-clean review request that gets satisfied customers to leave a Google review. More reviews means better rankings and more bookings." },
                  { title: "AI citation for cleaning searches", body: "When someone asks ChatGPT or Google AI for a reliable maid service in their area, we make sure your company is named. Schema, directory listings, and structured content all feed this." },
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
            <h2 className="h1" style={{ color: "#fff" }}>Rank your cleaning company in <span className="serif">90 days.</span></h2>
            <a href="https://calendly.com/ijas-rank-day/30min" target="_blank" rel="noopener noreferrer" className="btn btn-light">Start your 90 days <span className="btn-icon"><Icon.Arrow /></span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
