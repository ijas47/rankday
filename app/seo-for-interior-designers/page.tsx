import type { Metadata } from "next";
import { pageMeta, serviceSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BundlePills } from "@/components/bundle-pills";

export const metadata: Metadata = pageMeta({
  title: "Website + SEO for Interior Designers. Top 3 in 90 Days.",
  description:
    "A new website, top-3 Google rankings, and AI citations for interior design studios. Residential, commercial, hospitality. One fixed price. 90-day guarantee.",
  path: "/seo-for-interior-designers",
});

const keywords = [
  { intent: "Residential", examples: '"interior designer Dubai", "villa interior design UAE", "apartment interior designer [city]"', tone: "pink" },
  { intent: "Commercial", examples: '"commercial interior design Dubai", "office interior designer UAE", "retail interior fit out"', tone: "peach" },
  { intent: "Style", examples: '"modern interior design Dubai", "luxury interior designer UAE", "minimalist interior design"', tone: "yellow" },
  { intent: "Space type", examples: '"kitchen design Dubai", "bedroom interior designer", "living room redesign UAE"', tone: "mint" },
];

const serviceLd = serviceSchema({
  name: "SEO for Interior Designers",
  description: "A new website, top-3 Google rankings, and AI citations for interior design studios. Residential, commercial, hospitality. One fixed price. 90-day guarantee.",
  path: "/seo-for-interior-designers",
  areaServed: ["United Arab Emirates","United Kingdom","United States","Canada","Australia","Singapore","Ireland","New Zealand"],
  offer: { price: "4900", currency: "USD" },
});

export default function SEOForInteriorDesignersPage() {
  return (
    <div className="page-enter">
      <JsonLd data={serviceLd} />
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Interior Design</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            A new website + top-3 Google rankings for <span className="it">interior designers.</span> In 90 days.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            We rebuild your design studio website, rank it on Google for the projects you want, and get you cited by ChatGPT and AI search. All three. In 90 days. One fixed price.
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
          <div data-reveal className="card card-ink" style={{ padding: "40px 48px" }}>
            <p style={{ fontSize: "clamp(18px, 2.2vw, 26px)", color: "#fff", fontWeight: 700, lineHeight: 1.35, letterSpacing: "-0.015em", maxWidth: 760 }}>
              The Dubai and UAE interior design market is one of the most competitive in the world. Ranking on Google is not optional. It is the difference between a full pipeline and waiting for referrals.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">The searches that bring in design projects.</h2>
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
              <h2 className="h1">What rankday builds for design studios.</h2>
              <Link href="/pricing" className="btn btn-primary" style={{ marginTop: 28 }}>See pricing <span className="btn-icon"><Icon.Arrow /></span></Link>
            </div>
            <div data-reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { title: "Style and space type pages", body: "Dedicated pages for each design style and space type you specialise in. Modern, luxury, minimalist. Residential, commercial, hospitality. Each page targets the specific searches clients use." },
                  { title: "Portfolio structured for SEO", body: "Project portfolio pages optimised for both visual impact and keyword ranking. Each project page targets the style, space, and location keywords relevant to that work." },
                  { title: "Commercial and hospitality targeting", body: "If you want hotel, restaurant, and office projects alongside residential, we build the content and authority signals that rank you for commercial design queries." },
                  { title: "AI citation for design recommendations", body: "When someone asks ChatGPT for an interior designer in Dubai or a luxury design studio in the UAE, we make sure your studio is cited. Schema, directory presence, and structured content feed this." },
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
            <h2 className="h1" style={{ color: "#fff" }}>Rank your design studio in <span className="serif">90 days.</span></h2>
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-light">Start your 90 days <span className="btn-icon"><Icon.Arrow /></span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
