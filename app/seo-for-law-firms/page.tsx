import type { Metadata } from "next";
import { pageMeta, serviceSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BundlePills } from "@/components/bundle-pills";

export const metadata: Metadata = pageMeta({
  title: "Website + SEO for Law Firms. Top 3 in 90 Days.",
  description:
    "A new website, top-3 Google rankings, and AI citations for law firms. Practice area pages, local SEO, E-E-A-T signals. One fixed price. 90-day guarantee.",
  path: "/seo-for-law-firms",
});

const practiceAreas = [
  { area: "Family law", keywords: '"divorce solicitor London", "child custody lawyer near me"', tone: "pink" },
  { area: "Personal injury", keywords: '"personal injury lawyer Dubai", "accident claim solicitor"', tone: "peach" },
  { area: "Corporate and commercial", keywords: '"commercial lawyer UAE", "business contract solicitor UK"', tone: "yellow" },
  { area: "Immigration", keywords: '"immigration lawyer Dubai", "UK visa solicitor"', tone: "mint" },
  { area: "Real estate", keywords: '"property lawyer UAE", "conveyancing solicitor UK"', tone: "lilac" },
];

const serviceLd = serviceSchema({
  name: "SEO for Law Firms",
  description: "A new website, top-3 Google rankings, and AI citations for law firms. Practice area pages, local SEO, E-E-A-T signals. One fixed price. 90-day guarantee.",
  path: "/seo-for-law-firms",
  areaServed: ["United Arab Emirates","United Kingdom","United States","Canada","Australia","Singapore","Ireland","New Zealand"],
  offer: { price: "4900", currency: "USD" },
});

export default function SEOForLawFirmsPage() {
  return (
    <div className="page-enter">
      <JsonLd data={serviceLd} />
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Law Firms and Legal Services</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            A new website + top-3 Google rankings for <span className="it">law firms.</span> In 90 days.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            We rebuild your law firm website, rank it on Google for the practice areas you serve, and get you cited by ChatGPT when someone asks for a lawyer in your area. All three. In 90 days. One fixed price.
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
              <p className="kicker">The search problem</p>
              <p style={{ fontSize: 22, color: "var(--ink)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.015em", marginTop: 16 }}>
                Most law firm websites rank for their firm name. That only helps people who already know you.
              </p>
              <p className="body" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                The clients you want, the ones who do not know you yet, are searching "divorce lawyer Dubai" or "personal injury solicitor Manchester." If you are not in the top 3 for those searches, those clients never find you.
              </p>
            </div>

            <div className="card card-purple" style={{ padding: 40 }}>
              <p className="kicker" style={{ color: "rgba(255,255,255,0.7)" }}>The AI problem</p>
              <p style={{ fontSize: 22, color: "#fff", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.015em", marginTop: 16 }}>
                Legal queries are among the most common in AI search. "What's the best immigration lawyer in Dubai?" is exactly the kind of question people ask ChatGPT.
              </p>
              <p className="body" style={{ marginTop: 18, color: "rgba(255,255,255,0.85)" }}>
                The firms that get cited in those answers did not get there by accident. They structured their content, applied schema, and built directory presence specifically to be citable by LLMs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Practice areas and the keywords that matter.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              Every practice area has a set of high-intent local keywords. These are the searches that bring in clients, not traffic.
            </p>
          </div>

          <div data-reveal-stagger style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {practiceAreas.map((p) => (
              <div key={p.area} className={`card card-${p.tone}`} style={{ padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em", minWidth: 180 }}>{p.area}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.4, flex: 1 }}>{p.keywords}</span>
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
              <h2 className="h1">What rankday does for law firms.</h2>
              <Link href="/pricing" className="btn btn-primary" style={{ marginTop: 28 }}>
                See pricing <span className="btn-icon"><Icon.Arrow /></span>
              </Link>
            </div>

            <div data-reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { title: "Practice area pages that rank", body: "A dedicated page per practice area, targeting the search terms potential clients actually use. Not generic firm overviews. Specific, optimized pages for each service." },
                  { title: "Local SEO and Google Business Profile", body: "Optimized Google Business Profile, local citation building, and review collection. Legal clients trust reviews. We build the infrastructure to collect and display them." },
                  { title: "E-E-A-T signals for legal content", body: "Google weights expertise, authoritativeness, and trustworthiness especially heavily for legal content. We build those signals into the site structure, content, and off-site presence." },
                  { title: "AEO for legal queries", body: "Schema markup for legal services, structured Q&A content targeting how clients phrase legal questions, and directory placement on the platforms LLMs pull from for legal recommendations." },
                  { title: "Top 3 guarantee", body: "If you are not in the top 3 for 90% of your agreed practice-area and location keywords by day 90, we keep working at no extra cost." },
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
              Rank your firm in <span className="serif">90 days.</span>
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
