import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BundlePills } from "@/components/bundle-pills";

export const metadata: Metadata = {
  title: "Website + SEO Agency US. Top 3 in 90 Days. From $4,900.",
  description:
    "A new website, top-3 Google rankings, and AI citations for US businesses. $4,900 USD standard. Async delivery. 90-day guarantee. Fixed-price alternative to retainer agencies.",
};

const usCategories = [
  { title: "Professional services", body: "Law firms, CPA firms, financial advisors, consultancies. US buyers research credentials before they engage. We rank you for practice-area and city-level keywords.", tone: "pink" },
  { title: "Healthcare and clinics", body: "Private practices, dental, aesthetic, specialist clinics. Patients search by treatment and zip code. We get you into those searches.", tone: "peach" },
  { title: "B2B and SaaS", body: "Software companies, agencies, service providers. We rank you for the category and comparison keywords your buyers search before they request a demo.", tone: "yellow" },
  { title: "Local services", body: "Contractors, home services, trades, real estate. Near-me and city-level searches have direct buying intent. We rank you for them.", tone: "mint" },
  { title: "Hospitality", body: "Hotels, restaurants, experience companies. American travellers research before they book. We get your business into those searches.", tone: "lilac" },
];

export default function SEOAgencyUSPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">United States</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            A new website + top-3 Google rankings for <span className="it">US</span> businesses. In 90 days.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            We rebuild your website, rank it on Google, and get you cited by ChatGPT, Perplexity, and Google AI. All three. In 90 days. One fixed price. USD invoice. Fixed-price alternative to the retainer-based agencies running 12-month contracts.
          </p>
          <div data-reveal style={{ marginTop: 28 }}>
            <BundlePills />
          </div>
          <div data-reveal style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <a href="https://calendly.com/ijas-rank-day/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </a>
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
                $4,900
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 8, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                USD. For 90 days of work.
              </p>
              <p className="body" style={{ marginTop: 20, color: "rgba(255,255,255,0.85)" }}>
                5 to 7 page website, local SEO, Google Business Profile rebuild, 4 to 6 content pages, 30+ citations, AEO setup. Top 3 ranking guarantee on 90% of agreed keywords.
              </p>
            </div>

            <div className="card card-lilac" style={{ padding: 40 }}>
              <p className="kicker">Growth</p>
              <p style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.035em", lineHeight: 0.95, margin: "16px 0 0" }}>
                $7,900
              </p>
              <p style={{ fontSize: 13, color: "var(--purple)", marginTop: 8, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                USD. For 90 days of work.
              </p>
              <p className="body" style={{ marginTop: 20, color: "var(--ink-2)" }}>
                Up to 12-page website, up to 8 content pages, comparison pages, third-party placement, LinkedIn optimization, bi-weekly AI visibility audits, and custom ranking dashboard.
              </p>
            </div>
          </div>

          <p style={{ marginTop: 18, textAlign: "center", fontSize: 14, color: "var(--muted)" }}>
            Both paid in two installments: 50% to start, 50% on day 45.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Who we work with in the US.</h2>
          </div>
          <div data-reveal-stagger className="r-cards-5">
            {usCategories.map((c) => (
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
              <h2 className="h1">What makes Rankday different from US SEO agencies.</h2>
            </div>

            <div data-reveal>
              <p className="body lg" style={{ color: "var(--ink-2)" }}>
                Most US SEO agencies sell 12-month retainers at $2,000 to $5,000 per month. At month 6, they are still setting up. At month 12, rankings are inconsistent and the contract auto-renews.
              </p>
              <p className="body lg" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                Rankday charges a single fixed fee and delivers in 90 days. The keyword list is agreed in week 1 and fixed in writing. If you are not in the top 3 for 90% of them by day 90, we keep working at no extra cost.
              </p>
              <p className="body lg" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                We also do what most US agencies are not doing yet: AEO. Getting your business cited by ChatGPT and Perplexity alongside Google rankings. Both in the same 90 days. One price.
              </p>

              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "USD invoice, no conversion fees",
                  "Async delivery across US time zones",
                  "Google Business Profile rebuild included",
                  "US-specific directory and citation network",
                  "AEO included alongside SEO",
                  "No retainer required after day 90",
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
              Rank in the <span className="serif">US in 90 days.</span>
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
