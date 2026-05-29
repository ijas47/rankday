import type { Metadata } from "next";
import { pageMeta, serviceSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BundlePills } from "@/components/bundle-pills";

export const metadata: Metadata = pageMeta({
  title: "Website + SEO for Plumbers. Top 3 Rankings in 90 Days.",
  description:
    "A new website, top-3 Google rankings, and AI citations for plumbing businesses. Rankday rebuilds, ranks, and gets you cited. One fixed price. 90-day guarantee.",
  path: "/seo-for-plumbers",
});

const keywords = [
  { intent: "Emergency", examples: '"emergency plumber Dubai", "plumber near me open now", "burst pipe repair [city]"', tone: "pink" },
  { intent: "Installation", examples: '"water heater installation Dubai", "boiler installation [city]", "bathroom plumbing install"', tone: "peach" },
  { intent: "Repair", examples: '"pipe repair Dubai", "leaking tap fix [city]", "drain unblocking near me"', tone: "yellow" },
  { intent: "Location", examples: '"plumber JLT", "plumber Jumeirah", "plumber [neighbourhood]"', tone: "mint" },
];

const serviceLd = serviceSchema({
  name: "SEO for Plumbers",
  description: "A new website, top-3 Google rankings, and AI citations for plumbing businesses. Rankday rebuilds, ranks, and gets you cited. One fixed price. 90-day guarantee.",
  path: "/seo-for-plumbers",
  areaServed: ["United Arab Emirates","United Kingdom","United States","Canada","Australia","Singapore","Ireland","New Zealand"],
  offer: { price: "4900", currency: "USD" },
});

export default function SEOForPlumbersPage() {
  return (
    <div className="page-enter">
      <JsonLd data={serviceLd} />
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Home Services</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            A new website + top-3 Google rankings for <span className="it">plumbers.</span> In 90 days.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            We rebuild your plumbing business website, rank it on Google, and get you cited by ChatGPT and Google AI. All three. In 90 days. One fixed price. No retainer.
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
            <h2 className="h1">The searches that bring in plumbing jobs.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>Plumbing searches fall into four intent categories. We target all of them.</p>
          </div>
          <div data-reveal-stagger style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {keywords.map((k) => (
              <div key={k.intent} className={`card card-${k.tone}`} style={{ padding: "22px 28px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", minWidth: 120 }}>{k.intent}</span>
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
              <h2 className="h1">What Rankday builds for plumbers.</h2>
              <Link href="/pricing" className="btn btn-primary" style={{ marginTop: 28 }}>Standard from $4,900 <span className="btn-icon"><Icon.Arrow /></span></Link>
            </div>
            <div data-reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { title: "Service and location pages", body: "Dedicated pages for each service (emergency, installation, repair) plus location pages for each area you cover. These are what rank for the specific searches your customers make." },
                  { title: "Google Business Profile rebuild", body: "Your GBP is where most plumbing calls come from. We rebuild it completely: categories, services, photos, Q&A, and a review system that keeps new reviews coming in." },
                  { title: "Review collection system", body: "Plumbing customers trust reviews. We set up a simple post-job review request that gets satisfied customers to leave a Google review with minimal friction." },
                  { title: "AI citation setup", body: "When someone asks ChatGPT or Google AI for a plumber in your area, we make sure your business is in the answer. Schema markup, directory presence, and structured content all feed this." },
                  { title: "Top 3 guarantee", body: "If you are not in the top 3 for 90% of agreed keywords by day 90, we keep working at no extra cost." },
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
            <h2 className="h1" style={{ color: "#fff" }}>Rank your plumbing business in <span className="serif">90 days.</span></h2>
            <a href="https://calendly.com/ijas-rank-day/30min" target="_blank" rel="noopener noreferrer" className="btn btn-light">Start your 90 days <span className="btn-icon"><Icon.Arrow /></span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
