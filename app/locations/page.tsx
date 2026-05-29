import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "Locations Served. SEO Agency Across UAE, UK, US, and More.",
  description:
    "Rankday delivers SEO and AEO across UAE, UK, US, Canada, Australia, Singapore, Ireland, and New Zealand. Local invoicing and pricing where available.",
  path: "/locations",
});

const primaryLocations = [
  { slug: "seo-agency-dubai", market: "UAE", title: "SEO agency Dubai", price: "From AED 18,000", body: "Local UAE invoice. Arabic and English at no extra cost. Google Business Profile rebuild included.", tone: "pink" },
  { slug: "seo-agency-uk", market: "UK", title: "SEO agency UK", price: "From £3,900", body: "GBP invoice. Async delivery across UK time zones. Fixed-price alternative to retainer agencies.", tone: "peach" },
  { slug: "seo-agency-us", market: "US", title: "SEO agency US", price: "From $4,900", body: "USD invoice. Async across all US time zones. SEO and AEO bundled into one 90-day engagement.", tone: "mint" },
];

const otherMarkets = [
  ["Canada", "lilac"],
  ["Australia", "pink"],
  ["Singapore", "peach"],
  ["Ireland", "yellow"],
  ["New Zealand", "mint"],
] as const;

export default function LocationsPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Locations served</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            SEO agency across <span className="it">eight markets.</span> Local invoicing where available.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            Rankday is async-first by design. We work across time zones without issue. Local invoicing is available in UAE, UK, and US. All other markets billed in USD.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger className="r-2">
            {primaryLocations.map((loc) => (
              <Link key={loc.slug} href={`/${loc.slug}`} className={`card card-${loc.tone}`} style={{ padding: 36, minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "space-between", textDecoration: "none", gap: 20 }}>
                <div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink)", opacity: 0.5 }}>/ {loc.market}</span>
                  <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", margin: "12px 0 0", letterSpacing: "-0.02em" }}>{loc.title}</h2>
                  <p style={{ fontSize: 13, color: "var(--purple)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 12 }}>{loc.price}</p>
                  <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.5, margin: "16px 0 0" }}>{loc.body}</p>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--purple)", fontWeight: 700, fontSize: 14 }}>
                  See full details
                  <Icon.Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Other markets we serve.</h2>
            <p className="body lg" style={{ maxWidth: 540 }}>
              Same scope. Same 90-day guarantee. Billed in USD.
            </p>
          </div>

          <div data-reveal-stagger className="r-cards-5">
            {otherMarkets.map(([m, tone], i) => (
              <div
                key={m}
                className={`card card-${tone}`}
                style={{ padding: 28, minHeight: 130, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink)", opacity: 0.5 }}>
                  / {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--ink)", letterSpacing: "-0.02em" }}>{m}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-aside">
            <div className="sticky-aside">
              <h2 className="h1">Outside these markets?</h2>
            </div>
            <div>
              <p className="body lg" style={{ color: "var(--ink-2)" }}>
                We serve other English-speaking markets case-by-case. If your business operates in a country not listed above, send a WhatsApp or email. We confirm fit and pricing in the first conversation.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <Icon.WhatsApp /> WhatsApp
                </a>
                <a href="mailto:sales@rank-day.com" className="btn btn-light">
                  Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}>Start your <span className="serif">90 days.</span></h2>
            <Link href="/pricing" className="btn btn-light">See pricing <span className="btn-icon"><Icon.Arrow /></span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
