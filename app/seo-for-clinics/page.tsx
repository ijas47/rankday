import type { Metadata } from "next";
import { pageMeta, serviceSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BundlePills } from "@/components/bundle-pills";

export const metadata: Metadata = pageMeta({
  title: "Website + SEO for Clinics. Top 3 in 90 Days.",
  description:
    "A new website, top-3 Google rankings, and AI citations for clinics. Treatment pages, Google Business Profile, review collection. One fixed price. 90-day guarantee.",
  path: "/seo-for-clinics",
});

const clinicTypes = [
  { type: "Dental clinics", keywords: '"dentist Dubai", "dental implants near me", "best orthodontist [city]"', tone: "pink" },
  { type: "Aesthetic clinics", keywords: '"botox clinic Dubai", "laser hair removal [city]", "aesthetic doctor near me"', tone: "peach" },
  { type: "Private GP clinics", keywords: '"private GP Dubai", "same day GP appointment [city]"', tone: "yellow" },
  { type: "Physiotherapy", keywords: '"physio near me", "sports injury clinic [city]", "physiotherapist Dubai"', tone: "mint" },
  { type: "Specialist clinics", keywords: '"dermatologist Dubai", "cardiologist near me", "ENT specialist [city]"', tone: "lilac" },
];

const clinicGuides = [
  { href: "/blog/seo-for-healthcare-providers", title: "SEO for healthcare providers", body: "The full clinic SEO playbook: service pages, doctor credibility, local search, reviews, schema, and AI citation readiness.", tone: "pink" },
  { href: "/blog/what-is-seo-in-digital-marketing", title: "What is SEO in digital marketing?", body: "A business owner's guide to how SEO works, what moves rankings, and what should happen in the first 90 days.", tone: "mint" },
];

const serviceLd = serviceSchema({
  name: "SEO for Clinics",
  description: "A new website, top-3 Google rankings, and AI citations for clinics. Treatment pages, Google Business Profile, review collection. One fixed price. 90-day guarantee.",
  path: "/seo-for-clinics",
  areaServed: ["United Arab Emirates","United Kingdom","United States","Canada","Australia","Singapore","Ireland","New Zealand"],
  offer: { price: "4900", currency: "USD" },
});

export default function SEOForClinicsPage() {
  return (
    <div className="page-enter">
      <JsonLd data={serviceLd} />
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Clinics and Healthcare</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            A new website + top-3 Google rankings for <span className="it">clinics.</span> In 90 days.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            We rebuild your clinic website, rank it on Google for the treatments you offer, and get you cited by ChatGPT and Google AI when patients ask for a clinic in your area. All three. In 90 days. One fixed price.
          </p>
          <div data-reveal style={{ marginTop: 28 }}>
            <BundlePills />
          </div>
          <div data-reveal style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/pricing" className="btn btn-primary">
              See pricing <span className="btn-icon"><Icon.Arrow /></span>
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
            <div className="card card-pink" style={{ padding: 40 }}>
              <p className="kicker">How patients search</p>
              <p style={{ fontSize: 22, color: "var(--ink)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.015em", marginTop: 16 }}>
                A patient looking for a dentist does not search your clinic name. They search "dentist near Business Bay" or "dental implants Dubai price."
              </p>
              <p className="body" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                These are treatment-plus-location searches. They have direct booking intent. If your clinic is not in the top 3 for them, those patients book elsewhere. We rank you for the searches that bring in patients, not just traffic.
              </p>
            </div>

            <div className="card card-mint" style={{ padding: 40 }}>
              <p className="kicker">How AI changes the equation</p>
              <p style={{ fontSize: 22, color: "var(--ink)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.015em", marginTop: 16 }}>
                "What's the best dental clinic in Dubai for implants?" is the kind of question people now ask ChatGPT before they search Google.
              </p>
              <p className="body" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                The clinics named in that answer get the inquiry. They are not there by accident. They have structured content, schema markup, and consistent presence on the platforms LLMs pull from. We build that for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Clinic SEO reading.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              Use these guides to understand how healthcare search visibility works before we build the pages.
            </p>
          </div>

          <div data-reveal-stagger className="r-2">
            {clinicGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className={`card card-${guide.tone}`} style={{ padding: 32, minHeight: 200, textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 18 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.015em" }}>{guide.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.5, margin: "12px 0 0" }}>{guide.body}</p>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--purple)", fontWeight: 700, fontSize: 14 }}>
                  Read the guide
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
            <h2 className="h1">Clinic types and the keywords that matter.</h2>
          </div>

          <div data-reveal-stagger style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {clinicTypes.map((c) => (
              <div key={c.type} className={`card card-${c.tone}`} style={{ padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em", minWidth: 180 }}>{c.type}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.4, flex: 1 }}>{c.keywords}</span>
                <span className="check-mark" style={{ width: 22, height: 22, flexShrink: 0 }}>
                  <Icon.Check />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="r-aside">
            <div data-reveal className="sticky-aside">
              <h2 className="h1">What Rankday builds for clinics.</h2>
              <Link href="/pricing" className="btn btn-primary" style={{ marginTop: 28 }}>
                Standard from $4,900 <span className="btn-icon"><Icon.Arrow /></span>
              </Link>
            </div>

            <div data-reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { title: "Treatment pages that rank", body: "A dedicated page per treatment or service, targeting the search terms patients actually use. Not generic clinic overviews. Specific, optimized pages that answer patient questions and rank for treatment-plus-location queries." },
                  { title: "Google Business Profile rebuild", body: "Your GBP is often the first thing a patient sees. We rebuild it completely: categories, services, photos, Q&A, and a review collection system that drives consistent patient reviews." },
                  { title: "Local citation network", body: "Consistent clinic name, address, phone number, and category across 30+ health directories, maps platforms, and review sites. Consistency is a ranking signal for both Google and AI engines." },
                  { title: "Review collection system", body: "Reviews are the biggest trust signal for healthcare. We set up a system that makes it easy for satisfied patients to leave a review. More reviews, better rankings, stronger AI citation signals." },
                  { title: "AEO for healthcare queries", body: "Medical schema markup, structured Q&A content, and placement on the health directories and review platforms LLMs cite when answering healthcare questions." },
                ].map((item, i) => (
                  <div key={item.title} className="card" style={{ padding: 28, display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--purple)", fontWeight: 700, flexShrink: 0, paddingTop: 2 }}>
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>{item.title}</h3>
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
            <h2 className="h1" style={{ color: "#fff" }}>
              Fill your appointment book in <span className="serif">90 days.</span>
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
