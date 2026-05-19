import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "SEO Agency Dubai. Top 3 Google Rankings in 90 Days.",
  description:
    "Rankday is a Dubai-based SEO agency that rebuilds your website, ranks it on Google, and gets you cited by ChatGPT and Perplexity. Fixed price. 90-day guarantee. AED 18,000 standard.",
};

const dubaiCategories = [
  { title: "Clinics and healthcare", body: "Dental, aesthetic, GP, specialist clinics. Patients search by treatment and location. We rank you for both.", tone: "pink" },
  { title: "Real estate", body: "Brokerages, developers, property management. Buyer searches are specific: area, type, price range. We target them.", tone: "peach" },
  { title: "Professional services", body: "Law firms, accountants, consultancies, financial advisors. Your clients research before they call. We make sure they find you first.", tone: "yellow" },
  { title: "Hospitality", body: "Hotels, restaurants, tour operators, experience companies. Dubai visitors research heavily before they book. We get you into those searches.", tone: "mint" },
  { title: "B2B and SaaS", body: "Agencies, software companies, service providers targeting the GCC market. We rank you for the category keywords your buyers search.", tone: "lilac" },
];

export default function SEOAgencyDubaiPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Dubai and UAE</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            SEO agency <span className="it">Dubai.</span> Top 3 on Google in 90 days.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            Rankday works with Dubai and UAE businesses to rebuild their website, rank on Google, and get cited by ChatGPT and Perplexity. One fixed price. One 90-day engagement. No retainer.
          </p>
          <div data-reveal style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            <Link href="/pricing" className="btn btn-primary">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </Link>
            <Link href="/how-it-works" className="btn btn-light">
              How it works <span className="btn-icon"><Icon.Arrow /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger className="r-2">
            <div className="card card-purple" style={{ padding: 40 }}>
              <p className="kicker" style={{ color: "rgba(255,255,255,0.7)" }}>Standard</p>
              <p style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.035em", lineHeight: 0.95, margin: "16px 0 0" }}>
                AED 18,000
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 8, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                For 90 days of work
              </p>
              <p className="body" style={{ marginTop: 20, color: "rgba(255,255,255,0.85)" }}>
                5 to 7 page website, local SEO, Google Business Profile rebuild, 4 to 6 content pages, 30+ citations, AEO setup. Top 3 ranking guarantee on 90% of agreed keywords.
              </p>
            </div>

            <div className="card card-lilac" style={{ padding: 40 }}>
              <p className="kicker">Growth</p>
              <p style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.035em", lineHeight: 0.95, margin: "16px 0 0" }}>
                AED 29,000
              </p>
              <p style={{ fontSize: 13, color: "var(--purple)", marginTop: 8, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                For 90 days of work
              </p>
              <p className="body" style={{ marginTop: 20, color: "var(--ink-2)" }}>
                Up to 12-page website, up to 8 content pages, comparison pages, third-party placement, LinkedIn optimization, bi-weekly AI visibility audits, and custom ranking dashboard.
              </p>
            </div>
          </div>

          <p style={{ marginTop: 18, textAlign: "center", fontSize: 14, color: "var(--muted)" }}>
            Both paid in two installments: 50% to start, 50% on day 45. Local UAE invoice.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Who we work with in Dubai.</h2>
            <p className="body lg" style={{ maxWidth: 540 }}>
              Any Dubai business with customers who search before they buy. These are the categories we work with most.
            </p>
          </div>

          <div data-reveal-stagger className="r-cards-5">
            {dubaiCategories.map((c) => (
              <div key={c.title} className={`card card-${c.tone}`} style={{ padding: 28, minHeight: 180, display: "flex", flexDirection: "column", gap: 14 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="r-aside">
            <div data-reveal className="sticky-aside">
              <h2 className="h1">Why Dubai businesses need AEO alongside SEO.</h2>
            </div>

            <div data-reveal>
              <p className="body lg" style={{ color: "var(--ink-2)" }}>
                Dubai is one of the most digitally active markets in the world. Smartphone penetration exceeds 90%. Residents and visitors research everything before they spend, and increasingly they use ChatGPT, Perplexity, and Google AI Overviews to do it.
              </p>
              <p className="body lg" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                A search for "best orthodontist Dubai" or "top digital marketing agency UAE" now returns AI-generated answers before organic results. The businesses named in those answers get the call. The ones below them often do not.
              </p>
              <p className="body lg" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                English and Arabic both matter in this market. Rankday handles both languages in the UAE and GCC at no extra cost.
              </p>

              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Arabic-language SEO available at no extra cost",
                  "Local UAE invoice in AED",
                  "Google Business Profile rebuild included",
                  "UAE directory and citation network",
                  "Async delivery, no mandatory calls",
                ].map((t) => (
                  <div key={t} className="check" style={{ borderTopColor: "var(--hairline)", paddingTop: 14, paddingBottom: 14 }}>
                    <span className="check-mark" style={{ width: 20, height: 20 }}>
                      <Icon.Check />
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>{t}</span>
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
              Ready to rank in <span className="serif">Dubai?</span>
            </h2>
            <Link href="/pricing" className="btn btn-light">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
