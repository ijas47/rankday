import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { pageMeta, serviceSchema, faqPageSchema, SITE_URL, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import { BundlePills } from "@/components/bundle-pills";
import {
  locations,
  getLocation,
  INR_STANDARD,
  INR_GROWTH,
  type Location,
} from "./locations";

export function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const loc = getLocation(params.city);
  if (!loc) return {};
  return pageMeta({
    title: loc.metaTitle,
    description: loc.metaDescription,
    path: `/seo-agency/${loc.slug}`,
  });
}

const toneCycle = ["pink", "peach", "yellow", "mint", "lilac"];

function localFaqs(loc: Location): FaqItem[] {
  const place = loc.name;
  return [
    {
      q: `How much does SEO cost in ${place}?`,
      a: `rankday works on one fixed price per 90-day engagement, not a monthly retainer. Standard is ₹${INR_STANDARD} and Growth is ₹${INR_GROWTH} for the full 90 days. That covers a rebuilt website, top-3 Google rankings for your agreed keywords, and AI citations across ChatGPT, Perplexity, Gemini, and Google AI. No long contracts.`,
    },
    {
      q: `How long does it take to rank a ${place} business on Google?`,
      a: `90 days. With a clean website rebuild, proper technical setup, focused content, and a scoped keyword list agreed in week 1, top-3 rankings for 90% of your agreed keywords are achievable in 90 days. If we miss it, we keep working at no extra cost until we hit it.`,
    },
    {
      q: `Can you get my ${place} business cited by ChatGPT and Gemini?`,
      a: `Yes — that is the core of what rankday does beyond traditional SEO. We structure your site for AI citation, place you in the directories and comparison sources LLMs pull from, and build the consistent brand signals that make ChatGPT, Perplexity, and Gemini name your business when someone in ${place} asks for a recommendation.`,
    },
    {
      q: `Do you work in Malayalam?`,
      a: `Yes. Malayalam-language SEO and content are available at no extra cost for Kerala businesses, alongside English. Many buyers search in both, and we cover both.`,
    },
  ];
}

export default function LocationPage({ params }: { params: { city: string } }) {
  const loc = getLocation(params.city);
  if (!loc) notFound();

  const path = `/seo-agency/${loc.slug}`;
  const faqs = localFaqs(loc);
  const nearby = loc.nearby
    .map((slug) => getLocation(slug))
    .filter((l): l is Location => Boolean(l));

  const areaServed =
    loc.type === "country"
      ? ["India"]
      : loc.type === "state"
      ? ["Kerala", "India"]
      : [loc.name, loc.district || "Kerala", "India"];

  const serviceLd = serviceSchema({
    name: `SEO Agency ${loc.name}`,
    description: loc.metaDescription,
    path,
    areaServed,
    offer: { price: "399000", currency: "INR" },
  });

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `rankday ${loc.name}`,
    description: `90-day SEO + AEO for ${loc.name}: website rebuild, top-3 Google rankings, and AI citations (ChatGPT, Perplexity, Gemini, Google AI).`,
    url: `${SITE_URL}${path}`,
    areaServed: areaServed.join(", "),
    priceRange: "₹₹₹",
    parentOrganization: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "rankday" },
    founder: { "@type": "Person", "@id": `${SITE_URL}/#ijas-abdulla`, name: "Ijas Abdulla" },
    ...(loc.aliases ? { alternateName: loc.aliases.map((a) => `rankday ${a}`) } : {}),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "SEO Agency India", item: `${SITE_URL}/seo-agency/india` },
      ...(loc.parent && loc.parent !== "india"
        ? [{ "@type": "ListItem", position: 3, name: getLocation(loc.parent)?.name || "Kerala", item: `${SITE_URL}/seo-agency/${loc.parent}` }]
        : []),
      {
        "@type": "ListItem",
        position: loc.parent && loc.parent !== "india" ? 4 : 3,
        name: loc.name,
        item: `${SITE_URL}${path}`,
      },
    ],
  };

  return (
    <div className="page-enter">
      <JsonLd data={serviceLd} />
      <JsonLd data={localBusinessLd} />
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqPageSchema(faqs)} />

      {/* HERO */}
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">
            {loc.type === "country" ? "India" : loc.type === "state" ? "Kerala" : `${loc.district || "Kerala"} · Kerala`}
          </span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(30px, 4vw, 54px)" }}>
            {loc.headline}
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            {loc.intro}
          </p>
          <div data-reveal style={{ marginTop: 28 }}>
            <BundlePills />
          </div>
          <div data-reveal style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </a>
            <Link href="/how-it-works" className="btn btn-light">
              How it works <span className="btn-icon"><Icon.Arrow /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger className="r-2">
            <div className="card card-purple" style={{ padding: 40 }}>
              <p className="kicker" style={{ color: "rgba(255,255,255,0.7)" }}>Standard</p>
              <p style={{ fontSize: "clamp(38px, 5vw, 68px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.035em", lineHeight: 0.95, margin: "16px 0 0" }}>
                ₹{INR_STANDARD}
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 8, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                For 90 days of work
              </p>
              <p className="body" style={{ marginTop: 20, color: "rgba(255,255,255,0.85)" }}>
                5 to 7 page website, local SEO, Google Business Profile rebuild, 4 to 6 content pages, 30+ citations, AEO setup. Top 3 ranking guarantee on 90% of agreed keywords.
              </p>
            </div>
            <div className="card card-lilac" style={{ padding: 40 }}>
              <p className="kicker">Growth · most popular</p>
              <p style={{ fontSize: "clamp(38px, 5vw, 68px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.035em", lineHeight: 0.95, margin: "16px 0 0" }}>
                ₹{INR_GROWTH}
              </p>
              <p style={{ fontSize: 13, color: "var(--purple)", marginTop: 8, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                For 90 days of work
              </p>
              <p className="body" style={{ marginTop: 20, color: "var(--ink-2)" }}>
                Up to 12-page website, up to 8 content pages, comparison pages, third-party placement, LinkedIn optimization, bi-weekly AI visibility audits, and a custom ranking dashboard.
              </p>
            </div>
          </div>
          <p style={{ marginTop: 18, textAlign: "center", fontSize: 14, color: "var(--muted)" }}>
            Both paid in two installments: 50% to start, 50% on day 45. GST invoice. Same guarantee as every rankday engagement worldwide.
          </p>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">High-ticket businesses we work with in {loc.name}.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              We focus on businesses where one won client is worth lakhs — the ones whose buyers research hard before they spend.
            </p>
          </div>
          <div data-reveal-stagger style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {loc.industries.map((industry, i) => (
              <span key={industry} className={`pill card-${toneCycle[i % toneCycle.length]}`} style={{ fontSize: 15, padding: "10px 18px" }}>
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHY AEO HERE */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="r-aside">
            <div data-reveal className="sticky-aside">
              <h2 className="h1">Why {loc.name} businesses need AI visibility now.</h2>
            </div>
            <div data-reveal>
              <p className="body lg" style={{ color: "var(--ink-2)" }}>{loc.localAngle}</p>
              <p className="body lg" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                rankday does all three in one 90-day engagement: a rebuilt website, top-3 Google rankings, and citations in the AI tools your buyers actually use. One fixed price. A written guarantee. No retainer.
              </p>
              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Top 3 on Google for 90% of agreed keywords — or we work free",
                  "Cited by ChatGPT, Perplexity, Gemini & Google AI",
                  "Malayalam + English SEO at no extra cost",
                  "GST invoice, two simple installments",
                  "You own the website, content, and code",
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

      {/* FAQ */}
      <FaqSection
        heading={`SEO in ${loc.name}: common questions.`}
        intro="Straight answers on pricing, timelines, and AI citations."
        items={faqs}
      />

      {/* NEARBY / INTERNAL LINKS */}
      {nearby.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div data-reveal className="r-header">
              <h2 className="h1">rankday across Kerala & India.</h2>
              <p className="body lg" style={{ maxWidth: 560 }}>Same 90-day model, same guarantee, wherever you are.</p>
            </div>
            <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {nearby.map((n) => (
                <Link key={n.slug} href={`/seo-agency/${n.slug}`} className="pill" style={{ fontSize: 14, padding: "10px 16px", textDecoration: "none" }}>
                  SEO Agency {n.name} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}>
              Ready to rank in <span className="serif">{loc.name}?</span>
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
