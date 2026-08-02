import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, faqPageSchema, serviceSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import { BundlePills } from "@/components/bundle-pills";

export const metadata: Metadata = pageMeta({
  title: "Shopify & Ecommerce Website + SEO. Fixed Price.",
  description:
    "Custom Shopify and ecommerce stores with product SEO, AEO, and GEO. Commerce from $9,900. Commerce Scale from $14,900 for large catalogs. 90 days, one fixed price.",
  path: "/ecommerce",
});

const ecomPills = [
  { dot: "var(--purple)", label: "Shopify store build or rebuild" },
  { dot: "#10a37f", label: "Ecommerce SEO + AEO / GEO" },
  { dot: "#ff8a4c", label: "Up to ~1,500 products on Scale" },
];

const pillars = [
  {
    title: "Store that sells",
    body: "Theme design, collections, product structure, payments and shipping basics, and a checkout path that does not fight the buyer.",
    tone: "lilac",
  },
  {
    title: "Catalog that ranks",
    body: "Category architecture, technical ecom SEO, product and collection schema, and commercial keywords agreed in writing, not every SKU.",
    tone: "peach",
  },
  {
    title: "AI-ready product answers",
    body: "FAQ and product schema, answer-ready category copy, and structure so ChatGPT and Perplexity can cite you on buying prompts.",
    tone: "mint",
  },
];

const deliverables = [
  "Shopify setup or rebuild (WooCommerce on request)",
  "Custom theme design aligned to your brand",
  "Product and collection architecture",
  "Product import assistance (tier caps on pricing)",
  "Image SEO guidance and bulk alt/filename work on Scale",
  "Payments and shipping basics (your platform accounts)",
  "Technical + on-page ecommerce SEO",
  "AEO / GEO: product, FAQ, and category schema",
  "Answer-ready category and buying-guide content",
  "Commercial keyword list locked before day 1",
  "Top 3 guarantee on 90% of agreed commercial keywords",
  "Weekly Loom updates through the 90 days",
];

const tiers = [
  {
    name: "Commerce",
    price: "$9,900",
    blurb: "Shopify or ecommerce launches. Up to ~150 products, collections, payments/shipping, ecommerce SEO and AEO.",
    href: "https://wa.me/971565981209?text=I%20want%20Commerce%20%249%2C900%20-%20Shopify%20%2B%20SEO",
    popular: false,
  },
  {
    name: "Commerce Scale",
    price: "$14,900",
    blurb: "Large catalogs (hundreds to ~1,500 products) and heavy image sets. Bulk product and image SEO, deeper technical ecom SEO.",
    href: "https://wa.me/971565981209?text=I%20want%20Commerce%20Scale%20%2414%2C900%20-%20large%20catalog",
    popular: true,
  },
];

const faqs: FaqItem[] = [
  {
    q: "Is this the same as the Standard or Growth website plan?",
    a: "No. Standard and Growth are for service and brochure sites (5-12 pages). Ecommerce plans are for product catalogs: store build, collections, product import, and ecommerce SEO/AEO.",
  },
  {
    q: "Do you only work on Shopify?",
    a: "Shopify is the default. WooCommerce is available on request. Headless or custom app builds are quoted separately.",
  },
  {
    q: "How does the ranking guarantee work for stores?",
    a: "We lock a written list of commercial keywords (categories, money pages, brand terms). Top 3 on 90% of that list by day 90, or we keep working free on those keywords. The list is not every product URL.",
  },
  {
    q: "What is not included?",
    a: "Shopify or platform subscription fees, paid apps, product photography, inventory and fulfillment, paid ads, and custom app or headless development (quoted separately).",
  },
];

const serviceLd = serviceSchema({
  name: "Shopify & Ecommerce Website + SEO",
  description:
    "Custom Shopify and ecommerce store builds with ecommerce SEO, AEO, and GEO. Fixed 90-day engagement. Commerce from $9,900 USD.",
  path: "/ecommerce",
  areaServed: [
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "India",
    "Canada",
    "Australia",
    "Singapore",
    "Ireland",
    "New Zealand",
  ],
  offer: { price: "9900", currency: "USD" },
});

export default function EcommercePage() {
  return (
    <div className="page-enter">
      <JsonLd data={serviceLd} />
      <JsonLd data={faqPageSchema(faqs)} />

      <section className="ecom-hero">
        <div className="container">
          <div className="ecom-hero-grid">
            <div>
              <span className="eyebrow">Shopify &amp; ecommerce</span>
              <h1 className="h-display" data-reveal-text style={{ marginTop: 18, maxWidth: 640 }}>
                Build the store. Rank the catalog. Get cited by <span className="it">AI</span>.
              </h1>
              <p className="lede" data-reveal style={{ marginTop: 22, maxWidth: 520 }}>
                Custom Shopify (or ecommerce) builds with SEO, GEO, and AEO in one fixed 90-day price. From launch catalogs to 1,000+ product stores.
              </p>
              <div data-reveal style={{ marginTop: 24 }}>
                <BundlePills items={ecomPills} align="left" />
              </div>
              <div data-reveal style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                <Link href="/pricing#commerce" className="btn btn-primary">
                  See ecommerce pricing <span className="btn-icon"><Icon.Arrow /></span>
                </Link>
                <a
                  href="https://wa.me/971565981209?text=I%20want%20a%20Shopify%20or%20ecommerce%20store%20with%20SEO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                >
                  WhatsApp to start <span className="btn-icon"><Icon.Arrow /></span>
                </a>
              </div>
            </div>

            <div data-reveal className="ecom-hero-panel" data-reveal-delay="0.08">
              <div className="ecom-hero-glow" aria-hidden />
              <div className="ecom-hero-card">
                <p className="kicker" style={{ margin: 0 }}>Fixed price plans</p>
                <div className="ecom-tier-row">
                  <div>
                    <p className="ecom-tier-name">Commerce</p>
                    <p className="ecom-tier-price">$9,900</p>
                    <p className="ecom-tier-meta">Up to ~150 products</p>
                  </div>
                  <div className="ecom-tier-divider" />
                  <div>
                    <p className="ecom-tier-name">Commerce Scale</p>
                    <p className="ecom-tier-price">$14,900</p>
                    <p className="ecom-tier-meta">Up to ~1,500 products</p>
                  </div>
                </div>
                <ul className="ecom-hero-list">
                  <li>Store + theme + collections</li>
                  <li>Ecommerce SEO + schema</li>
                  <li>AEO / GEO for product prompts</li>
                  <li>50% start, 50% day 45</li>
                </ul>
                <Link href="/pricing" className="btn btn-primary btn-sm" style={{ marginTop: 8, alignSelf: "flex-start" }}>
                  Full pricing table <span className="btn-icon"><Icon.Arrow /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Built for product brands, not brochure sites.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              Service plans stop at pages. Ecommerce needs catalogs, images, collections, crawl hygiene, and commercial intent.
            </p>
          </div>
          <div data-reveal-stagger className="r-3">
            {pillars.map((p) => (
              <div key={p.title} className={`card card-${p.tone}`} style={{ padding: 32, minHeight: 200 }}>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>{p.title}</h3>
                <p style={{ margin: "14px 0 0", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="r-aside">
            <div data-reveal className="sticky-aside">
              <h2 className="h1">What ships in 90 days.</h2>
              <p className="body lg" style={{ marginTop: 16, maxWidth: 360 }}>
                One engagement. Store foundation, search structure, and AI-ready product content.
              </p>
            </div>
            <div data-reveal className="card" style={{ padding: 36 }}>
              <div className="check-grid">
                {deliverables.map((item) => (
                  <div className="check" key={item} style={{ padding: "12px 0", fontSize: 15 }}>
                    <span className="check-mark" style={{ width: 20, height: 20 }}>
                      <Icon.Check />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="plans">
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Pick the catalog size.</h2>
            <p className="body lg" style={{ maxWidth: 520 }}>
              Same payment split as every rankday plan: 50% to start, 50% on day 45. Local rates on the pricing page.
            </p>
          </div>
          <div data-reveal-stagger className="r-2">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={t.popular ? "card card-purple" : "card card-lilac"}
                style={{ padding: 40, display: "flex", flexDirection: "column", gap: 18 }}
              >
                <div>
                  <span className="tag light" style={t.popular ? { background: "rgba(255,255,255,0.16)", color: "#fff" } : undefined}>
                    {t.name}
                    {t.popular ? " · large catalogs" : ""}
                  </span>
                  <p
                    style={{
                      margin: "18px 0 0",
                      fontSize: "clamp(42px, 5vw, 64px)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      lineHeight: 0.95,
                      color: t.popular ? "#fff" : "var(--ink)",
                      fontFamily: "var(--display)",
                    }}
                  >
                    {t.price}
                    <span style={{ fontSize: 16, fontWeight: 600, marginLeft: 8, opacity: 0.75 }}>USD</span>
                  </p>
                  <p
                    style={{
                      margin: "14px 0 0",
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: t.popular ? "rgba(255,255,255,0.88)" : "var(--ink-2)",
                    }}
                  >
                    {t.blurb}
                  </p>
                </div>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={t.popular ? "btn btn-light" : "btn btn-primary"}
                  style={{ alignSelf: "flex-start", marginTop: 8 }}
                >
                  Start {t.name} <span className="btn-icon"><Icon.Arrow /></span>
                </a>
              </div>
            ))}
          </div>
          <p data-reveal style={{ marginTop: 20, fontSize: 14, color: "var(--muted)", textAlign: "center" }}>
            AED, GBP, and INR rates on{" "}
            <Link href="/pricing" style={{ color: "var(--purple)", fontWeight: 700 }}>
              pricing
            </Link>
            . Free{" "}
            <Link href="/tools/store-seo-audit" style={{ color: "var(--purple)", fontWeight: 700 }}>
              Store SEO Audit
            </Link>{" "}
            if you want a baseline first.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="card card-ink ecom-proof">
            <p className="ecom-proof-kicker">Why this is a separate service</p>
            <p className="ecom-proof-copy">
              A 1,200-product store with thousands of images is not a 7-page brochure site. Crawl budget, collection architecture, product schema, and image SEO are the work. That is why Commerce sits above Growth, not beside it.
            </p>
          </div>
        </div>
      </section>

      <FaqSection heading="Ecommerce questions." intro="Scope, platforms, guarantee, and what is out of scope." items={faqs} />

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}>
              Start your store <span className="serif">90 days.</span>
            </h2>
            <a
              href="https://wa.me/971565981209?text=I%20want%20ecommerce%20%2F%20Shopify%20with%20SEO"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light"
            >
              WhatsApp to start <span className="btn-icon"><Icon.Arrow /></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
