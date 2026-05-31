import Link from "next/link";
import type { ReactNode } from "react";
import { BundlePills } from "@/components/bundle-pills";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { faqPageSchema, serviceSchema, type FaqItem } from "@/lib/seo";

type Tone = "pink" | "peach" | "yellow" | "mint" | "lilac" | "purple" | "ink";

type Pillar = {
  title: string;
  body: string;
  tone: Tone;
};

type BestAgencyPageProps = {
  path: string;
  serviceName: string;
  serviceDescription: string;
  eyebrow: string;
  heading: ReactNode;
  lead: string;
  fitTitle: string;
  fitBody: string;
  mustHaveTitle: string;
  mustHaves: Pillar[];
  deliveryTitle: string;
  deliveryBody: string;
  checklist: string[];
  faqs: FaqItem[];
};

const relatedPages = [
  { href: "/best-seo-agency-dubai", label: "Best SEO agency Dubai" },
  { href: "/best-web-design-agency-dubai", label: "Best web design agency Dubai" },
  { href: "/best-aeo-agency-dubai", label: "Best AEO agency Dubai" },
  { href: "/best-geo-agency-dubai", label: "Best GEO agency Dubai" },
];

export function DubaiBestAgencyPage({
  path,
  serviceName,
  serviceDescription,
  eyebrow,
  heading,
  lead,
  fitTitle,
  fitBody,
  mustHaveTitle,
  mustHaves,
  deliveryTitle,
  deliveryBody,
  checklist,
  faqs,
}: BestAgencyPageProps) {
  const serviceLd = serviceSchema({
    name: serviceName,
    description: serviceDescription,
    path,
    areaServed: ["Dubai", "United Arab Emirates"],
    offer: { price: "18000", currency: "AED" },
  });

  const visibleRelated = relatedPages.filter((page) => page.href !== path);

  return (
    <div className="page-enter">
      <JsonLd data={serviceLd} />
      <JsonLd data={faqPageSchema(faqs)} />

      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 980, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            {heading}
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            {lead}
          </p>
          <div data-reveal style={{ marginTop: 28 }}>
            <BundlePills />
          </div>
          <div data-reveal style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </a>
            <Link href="/seo-agency-dubai" className="btn btn-light">
              See Dubai SEO page <span className="btn-icon"><Icon.Arrow /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-aside">
            <div className="sticky-aside">
              <h2 className="h1">{fitTitle}</h2>
            </div>
            <div>
              <p className="body lg" style={{ color: "var(--ink-2)" }}>
                {fitBody}
              </p>
              <div style={{ marginTop: 28, display: "grid", gap: 10 }}>
                {[
                  "Fixed AED pricing",
                  "90-day delivery",
                  "Website, SEO, AEO, and GEO in one scope",
                  "Arabic available at no extra cost",
                  "Top-3 guarantee on agreed keywords",
                ].map((item) => (
                  <div key={item} className="check" style={{ borderTopColor: "var(--hairline)", paddingTop: 14, paddingBottom: 14 }}>
                    <span className="check-mark" style={{ width: 20, height: 20 }}>
                      <Icon.Check />
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">{mustHaveTitle}</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              A page targeting "best agency in Dubai" should help buyers compare what matters before they book a call.
            </p>
          </div>

          <div data-reveal-stagger className="r-cards-4">
            {mustHaves.map((item) => (
              <div key={item.title} className={`card card-${item.tone}`} style={{ padding: 28, minHeight: 210, display: "flex", flexDirection: "column", gap: 14 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger className="r-2">
            <div className="card card-purple" style={{ padding: 40 }}>
              <p className="kicker" style={{ color: "rgba(255,255,255,0.72)" }}>Dubai package</p>
              <p style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.035em", lineHeight: 0.95, margin: "16px 0 0" }}>
                AED 18,000
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", marginTop: 8, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Standard 90-day scope
              </p>
              <p className="body" style={{ marginTop: 20, color: "rgba(255,255,255,0.86)" }}>
                Website rebuild, technical SEO, local SEO, AI citation setup, content pages, citation building, tracking, and reporting in one fixed project.
              </p>
            </div>

            <div className="card card-lilac" style={{ padding: 40 }}>
              <p className="kicker">Delivery</p>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.04, margin: "16px 0 0" }}>
                {deliveryTitle}
              </h2>
              <p className="body" style={{ marginTop: 20, color: "var(--ink-2)" }}>
                {deliveryBody}
              </p>
            </div>
          </div>

          <div style={{ marginTop: 28, display: "grid", gap: 10 }}>
            {checklist.map((item) => (
              <div key={item} className="check" style={{ borderTopColor: "var(--hairline)", paddingTop: 14, paddingBottom: 14 }}>
                <span className="check-mark" style={{ width: 20, height: 20 }}>
                  <Icon.Check />
                </span>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Related Dubai agency pages.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              These pages split commercial intent cleanly so each service has its own search target.
            </p>
          </div>
          <div data-reveal-stagger className="r-cards-3">
            {visibleRelated.map((page, index) => (
              <Link key={page.href} href={page.href} className={`card card-${["pink", "mint", "peach"][index]}`} style={{ padding: 28, minHeight: 160, textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 18 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{page.label}</h3>
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
          <div data-reveal className="r-header">
            <h2 className="h1">Questions Dubai buyers ask.</h2>
          </div>
          <div data-reveal-stagger style={{ display: "grid", gap: 12 }}>
            {faqs.map((faq) => (
              <div key={faq.q} className="card card-paper" style={{ padding: "24px 28px" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{faq.q}</h3>
                <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, margin: "10px 0 0" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}>
              Want to be found in <span className="serif">Dubai?</span>
            </h2>
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-light">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
