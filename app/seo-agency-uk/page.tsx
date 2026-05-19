import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "SEO Agency UK. Top 3 Google Rankings in 90 Days.",
  description:
    "Rankday works with UK businesses to rank on Google and get cited by ChatGPT and Perplexity. Fixed price from £3,900. 90-day guarantee. No retainer.",
};

const ukCategories = [
  { title: "Professional services", body: "Solicitors, accountants, financial advisors, consultancies. Buyers research credentials before they call. We rank you for practice-area and location keywords.", tone: "pink" },
  { title: "Healthcare and clinics", body: "Private clinics, dentists, physios, aesthetic practices. Patients search by treatment and postcode. We get you into those searches.", tone: "peach" },
  { title: "B2B and SaaS", body: "UK-based software companies, agencies, and B2B service providers. We rank you for the category keywords your buyers search before booking a demo.", tone: "yellow" },
  { title: "Trades and local services", body: "Builders, plumbers, electricians, landscapers. Near-me searches are high-intent. We rank you for them in your service area.", tone: "mint" },
  { title: "Hospitality", body: "Hotels, restaurants, venues, experiences. UK diners and travellers research before they book. We get your business into those searches.", tone: "lilac" },
];

export default function SEOAgencyUKPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">United Kingdom</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            SEO agency <span className="it">UK.</span> Top 3 on Google in 90 days.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            Rankday works with UK businesses to rank on Google and get cited by ChatGPT, Perplexity, and Google AI Overviews. One fixed price. 90 days. No retainer.
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
                £3,900
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
                £6,200
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
            Both paid in two installments: 50% to start, 50% on day 45. GBP invoice.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Who we work with in the UK.</h2>
          </div>
          <div data-reveal-stagger className="r-cards-5">
            {ukCategories.map((c) => (
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
              <h2 className="h1">Why a fixed-price model works better for UK businesses.</h2>
            </div>

            <div data-reveal>
              <p className="body lg" style={{ color: "var(--ink-2)" }}>
                UK SEO agencies typically sell monthly retainers. A £1,500 per month retainer runs to £18,000 a year. At that rate, most agencies have still not delivered top-3 rankings 12 months in.
              </p>
              <p className="body lg" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                Rankday charges a single fixed fee, delivers in 90 days, and guarantees the result in writing. If you are not in the top 3 for 90% of agreed keywords by day 90, we keep working at no extra cost.
              </p>
              <p className="body lg" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                Delivery is async by default. We work across UK time zones without issue. You answer two short questions a week. We handle everything else.
              </p>

              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "GBP invoice, no currency conversion",
                  "Async delivery across UK time zones",
                  "Google Business Profile rebuild included",
                  "UK-specific directory and citation network",
                  "No 12-month contract, no retainer",
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
              Rank in the <span className="serif">UK in 90 days.</span>
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
