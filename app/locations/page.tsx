import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "Locations Served. SEO Across India, UAE, UK, US & More.",
  description:
    "rankday delivers SEO and AEO across India (Kerala + every district), UAE, UK, US, Canada, Australia, Singapore, Ireland, and New Zealand. Local invoicing and pricing where available.",
  path: "/locations",
});

const primaryLocations = [
  { slug: "seo-agency-dubai", market: "UAE", title: "SEO agency Dubai", price: "From AED 18,000", body: "Local UAE invoice. Arabic and English at no extra cost. Google Business Profile rebuild included.", tone: "pink" },
  { slug: "seo-agency-uk", market: "UK", title: "SEO agency UK", price: "From £3,900", body: "GBP invoice. Async delivery across UK time zones. Fixed-price alternative to retainer agencies.", tone: "peach" },
  { slug: "seo-agency-us", market: "US", title: "SEO agency US", price: "From $4,900", body: "USD invoice. Async across all US time zones. SEO and AEO bundled into one 90-day engagement.", tone: "mint" },
];

const dubaiServicePages = [
  { slug: "best-seo-agency-dubai", title: "Best SEO agency Dubai", body: "Commercial SEO page for Dubai buyers comparing agencies, retainers, guarantees, and ranking outcomes.", tone: "pink" },
  { slug: "best-web-design-agency-dubai", title: "Best web design agency Dubai", body: "Search-ready web design page for Dubai businesses that need a site built to rank and convert.", tone: "peach" },
  { slug: "best-aeo-agency-dubai", title: "Best AEO agency Dubai", body: "AI answer visibility page for businesses that want to be understood and cited by AI systems.", tone: "mint" },
  { slug: "best-geo-agency-dubai", title: "Best GEO agency Dubai", body: "Generative engine visibility page for ChatGPT, Perplexity, Claude, Gemini, Copilot, and Google AI.", tone: "lilac" },
];

const otherMarkets = [
  ["Canada", "lilac"],
  ["Australia", "pink"],
  ["Singapore", "peach"],
  ["Ireland", "yellow"],
  ["New Zealand", "mint"],
] as const;

const indiaHubs = [
  { slug: "india", title: "SEO agency India", body: "Nationwide. INR pricing (₹3,99,000 / ₹6,49,000), GST invoice, AI-search optimisation for Indian businesses.", tone: "lilac" },
  { slug: "kerala", title: "SEO agency Kerala", body: "Statewide. Malayalam + English SEO. Top-3 Google and AI citations for high-ticket Kerala businesses.", tone: "mint" },
  { slug: "kochi", title: "SEO agency Kochi", body: "Cochin — Kerala's most competitive market. Construction, interiors, marble, lighting, real estate.", tone: "pink" },
  { slug: "thiruvananthapuram", title: "SEO agency Trivandrum", body: "Capital market. Premium homes, IT, government, and professional services.", tone: "peach" },
];

const keralaDistricts = [
  "thrissur", "kozhikode", "ernakulam", "kollam", "kottayam", "alappuzha",
  "palakkad", "malappuram", "kannur", "pathanamthitta", "idukki", "wayanad", "kasaragod",
];

const keralaTowns = [
  "kakkanad", "aluva", "guruvayur", "munnar", "thalassery", "manjeri", "perinthalmanna", "pala", "kanhangad",
];

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function LocationsPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Locations served</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            SEO agency across <span className="it">India and eight more markets.</span> Local invoicing where available.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            rankday is async-first by design. We work across time zones without issue. Local invoicing is available in India (INR/GST), the UAE, UK, and US. All other markets billed in USD.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Dubai service pages.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              Separate pages for high-intent Dubai searches. These are service pages, not blog posts.
            </p>
          </div>

          <div data-reveal-stagger className="r-cards-4">
            {dubaiServicePages.map((service) => (
              <Link key={service.slug} href={`/${service.slug}`} className={`card card-${service.tone}`} style={{ padding: 28, minHeight: 210, display: "flex", flexDirection: "column", justifyContent: "space-between", textDecoration: "none", gap: 18 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>{service.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5, margin: "14px 0 0" }}>{service.body}</p>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--purple)", fontWeight: 700, fontSize: 14 }}>
                  Open page
                  <Icon.Arrow />
                </span>
              </Link>
            ))}
          </div>
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

      {/* INDIA & KERALA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">India & Kerala.</h2>
            <p className="body lg" style={{ maxWidth: 620 }}>
              Local INR pricing and GST invoicing. Malayalam and English SEO at no extra cost. Dedicated pages for every district and major town in Kerala.
            </p>
          </div>

          <div data-reveal-stagger className="r-cards-4">
            {indiaHubs.map((h) => (
              <Link key={h.slug} href={`/seo-agency/${h.slug}`} className={`card card-${h.tone}`} style={{ padding: 28, minHeight: 210, display: "flex", flexDirection: "column", justifyContent: "space-between", textDecoration: "none", gap: 18 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>{h.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5, margin: "14px 0 0" }}>{h.body}</p>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--purple)", fontWeight: 700, fontSize: 14 }}>
                  Open page
                  <Icon.Arrow />
                </span>
              </Link>
            ))}
          </div>

          <p style={{ margin: "28px 0 12px", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>Kerala districts</p>
          <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {keralaDistricts.map((slug) => (
              <Link key={slug} href={`/seo-agency/${slug}`} className="pill" style={{ fontSize: 14, padding: "9px 15px", textDecoration: "none" }}>
                {titleCase(slug)} →
              </Link>
            ))}
          </div>

          <p style={{ margin: "24px 0 12px", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>Kerala towns</p>
          <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {keralaTowns.map((slug) => (
              <Link key={slug} href={`/seo-agency/${slug}`} className="pill" style={{ fontSize: 14, padding: "9px 15px", textDecoration: "none" }}>
                {titleCase(slug)} →
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
