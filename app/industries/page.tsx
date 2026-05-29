import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "Industries We Work With. SEO for Every Category We Serve.",
  description:
    "Rankday delivers SEO and AEO for SaaS, law firms, clinics, contractors, interior designers, fit out companies, facilities management, and home services. Pick your industry.",
  path: "/industries",
});

const industries = [
  { slug: "seo-for-saas", title: "SaaS and B2B software", body: "Rank for category, comparison, alternative, feature, and integration keywords. Get cited by ChatGPT when buyers ask for tools in your category.", tone: "pink" },
  { slug: "seo-for-law-firms", title: "Law firms", body: "Practice area pages, local SEO, E-E-A-T signals for legal content. Top 3 for the searches your clients run before they call.", tone: "peach" },
  { slug: "seo-for-clinics", title: "Clinics and healthcare", body: "Treatment-plus-location pages, Google Business Profile rebuild, review collection. Show up when patients search.", tone: "yellow" },
  { slug: "seo-for-plumbers", title: "Plumbers", body: "Emergency, install, repair, and area-level searches. The jobs that come in through Google before your competitors answer.", tone: "mint" },
  { slug: "seo-for-electricians", title: "Electricians", body: "Residential faults, commercial fit-outs, EV charger installs. Rank for every job type you want to win.", tone: "lilac" },
  { slug: "seo-for-contractors", title: "Contractors and construction", body: "Residential, commercial, MEP, civil. Get on the shortlist before procurement starts.", tone: "pink" },
  { slug: "seo-for-interior-designers", title: "Interior designers", body: "Style, space, and sector pages that rank in one of the world's most competitive design markets.", tone: "peach" },
  { slug: "seo-for-fit-out-companies", title: "Fit out companies", body: "Office, retail, hospitality, turnkey. Get found by developers and procurement teams.", tone: "yellow" },
  { slug: "seo-for-facilities-management", title: "Facilities management", body: "Hard services, soft services, integrated FM. Win contracts before the tender stage.", tone: "mint" },
  { slug: "seo-for-maid-services", title: "Maid and cleaning services", body: "Regular, deep clean, specialist cleaning. Rank for the bookings before your competitors do.", tone: "lilac" },
];

export default function IndustriesPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Industries served</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            SEO and AEO for every <span className="it">industry</span> we serve.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            Pick your industry. Each page covers the keywords that bring in clients, the pages we build, and what Rankday delivers in 90 days for businesses in that category.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger className="r-2">
            {industries.map((ind) => (
              <Link key={ind.slug} href={`/${ind.slug}`} className={`card card-${ind.tone}`} style={{ padding: 32, minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "space-between", textDecoration: "none", gap: 20 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.015em" }}>{ind.title}</h2>
                  <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.5, marginTop: 14, margin: "14px 0 0" }}>{ind.body}</p>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--purple)", fontWeight: 700, fontSize: 14 }}>
                  See how we work in this industry
                  <Icon.Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-aside">
            <div className="sticky-aside">
              <h2 className="h1">Not in this list?</h2>
            </div>
            <div>
              <p className="body lg" style={{ color: "var(--ink-2)" }}>
                We work with most categories that share two things: keywords with buying intent, and customers who research before they spend. If your category is not listed above, that does not mean it is not a fit.
              </p>
              <p className="body lg" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                Send a WhatsApp or email. We confirm fit in the first conversation and tell you straight if it is not a category we can deliver on.
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
