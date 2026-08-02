"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { faqPageSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import { easeOut, staggerContainer, staggerItem } from "@/lib/motion";

const standardIncludes = [
  "5 to 7 page custom website",
  "Branding (logo, colors, type system)",
  "Hosting and domain setup for year one",
  "Google Business Profile rebuild (for local businesses)",
  "4 to 6 SEO content pages",
  "Up to 15 keywords agreed in writing before day 1",
  "30+ citations and backlinks",
  "Review collection system",
  "AEO setup: schema, structured answers, LLM-ready content",
  "Weekly Loom updates",
  "Top 3 ranking guarantee on 90% of agreed keywords",
];

const growthExtras = [
  "Up to 12-page website with reposition or rebuild",
  "Up to 8 SEO content pages",
  "Up to 30 keywords agreed in writing",
  'Comparison and "vs" pages for competitive verticals',
  "Third-party placement (directories, review sites, industry publications)",
  "LinkedIn and category-page optimization",
  "Bi-weekly AI visibility audits on buyer prompts",
  "Custom dashboard for ranking and AI citation tracking",
];

const commerceIncludes = [
  "Shopify store setup or rebuild (WooCommerce on request)",
  "Custom theme design + branding alignment",
  "Product and collection structure",
  "Product import assistance up to ~150 products",
  "Payments and shipping basics (your accounts)",
  "Technical + on-page ecommerce SEO",
  "AEO / GEO: product, FAQ, and category schema",
  "Answer-ready category and buying-guide content",
  "Up to 20 commercial keywords agreed in writing",
  "Top 3 on 90% of agreed commercial keywords (categories, money pages, brand terms; not every SKU)",
  "Weekly Loom updates",
];

const commerceScaleExtras = [
  "Large catalog support up to ~1,500 products",
  "Bulk product and image SEO (filenames, alt, structured data at scale)",
  "Collection architecture for multi-category stores",
  "Deeper technical ecom SEO (crawl, canonicals, faceted nav hygiene)",
  "Up to 40 commercial keywords agreed in writing",
  "Bi-weekly AI visibility audits on product and category prompts",
  "Custom dashboard for rankings and AI citation tracking",
  "Third-party placement for store and category authority",
];

const localPricing: Array<[string, string, string]> = [
  ["India", "₹3,99,000", "₹6,49,000"],
  ["UAE", "AED 18,000", "AED 29,000"],
  ["UK", "£3,900", "£6,200"],
  ["US", "$4,900", "$7,900"],
];

const localCommercePricing: Array<[string, string, string]> = [
  ["India", "₹8,05,000", "₹12,15,000"],
  ["UAE", "AED 36,000", "AED 55,000"],
  ["UK", "£7,900", "£11,900"],
  ["US", "$9,900", "$14,900"],
];

const notIncluded = [
  "Paid advertising (Google Ads, Meta, etc.)",
  "Social media management or content calendars",
  "Shopify / platform subscription fees and paid apps",
  "Product photography, inventory ops, or order fulfillment",
  "Custom Shopify apps or headless builds (quoted separately)",
  "Ongoing retainers unless you opt into maintenance after day 90",
  "Anything outside the written 90-day scope and keyword list",
];

const guaranteePoints = [
  {
    title: "Keywords are fixed in writing",
    body: "Before work starts we agree a keyword list (up to 15 on Standard, 30 on Growth, 20 on Commerce, 40 on Commerce Scale). That list is the guarantee. We do not move the goalposts mid-project.",
  },
  {
    title: "Top 3 on 90% of agreed keywords",
    body: "By day 90, if you are not in the Google top 3 for at least 90% of that list, we keep working at no extra cost until you are, on those keywords. For Commerce plans, the list is commercial keywords (categories, money pages, brand terms), not every product SKU.",
  },
  {
    title: "What can slow results",
    body: "Approvals, content access, legal review, product data quality, and extreme competition on brand-new domains all affect pace. We flag risk before you pay the second installment.",
  },
  {
    title: "AI citations are included as work, not a second guarantee",
    body: "We build AEO into every engagement (structure, schema, answer pages, proof). AI engines change faster than Google SERPs, so the formal guarantee is Google top-3 on the agreed set.",
  },
];

const vsRows: Array<[string, string, string]> = [
  ["Price model", "One fixed price for 90 days", "Monthly retainer, often 6-12 months minimum"],
  ["Website / store", "New custom site or Shopify store included", 'Usually "optimise your existing site"'],
  ["Finish line", "Day 90: done or free extension on guarantee", "Open-ended; hard to know when you're finished"],
  ["Guarantee", "Top 3 on 90% of agreed keywords or we keep working free", 'Rarely contractual; "we will do our best"'],
  ["AI / AEO", "Built in: schema, answer content, citation readiness", "Often missing or sold as a separate upsell"],
  ["Reporting", "Weekly Looms + clear keyword scoreboard", "Dashboards full of vanity metrics"],
];

const processSteps = [
  {
    step: "01",
    title: "Fit call (15-20 min)",
    body: "WhatsApp or call. We check market, competition, and whether a 90-day sprint can work. If not, we say so.",
  },
  {
    step: "02",
    title: "Keyword scope locked",
    body: 'You get a written list of target keywords and what "top 3" means for each. No surprise topics later.',
  },
  {
    step: "03",
    title: "50% to start",
    body: "Invoice one. We rebuild the site, technical foundations, and content engine in the first half of the sprint.",
  },
  {
    step: "04",
    title: "50% on day 45",
    body: "Mid-sprint check. You see progress before the second half: rankings momentum, pages live, AEO structure in place.",
  },
  {
    step: "05",
    title: "Day 90 scoreboard",
    body: "Agreed keywords vs top-3. If we miss the guarantee bar, we keep working free on that list.",
  },
];

const faqs: FaqItem[] = [
  {
    q: "What do I actually pay for?",
    a: "A fixed 90-day engagement: custom website or Shopify/ecommerce store, on-page and off-page SEO, and AEO setup so you are easier to cite in AI answers. Standard is $4,900; Growth is $7,900; Commerce is $9,900; Commerce Scale is $14,900 (USD), with local pricing in India, UAE, and UK.",
  },
  {
    q: "What is Commerce vs Standard / Growth?",
    a: "Standard and Growth are for service and brochure sites (5-12 pages). Commerce is for Shopify or ecommerce stores: product import, collections, payments/shipping setup, and ecommerce SEO/AEO. Commerce Scale is for large catalogs (hundreds to ~1,500 products) with bulk product and image SEO.",
  },
  {
    q: "How does the top-3 guarantee work?",
    a: "Keywords are agreed in writing before day 1. If by day 90 you are not in the Google top 3 for at least 90% of that list, we continue working at no extra cost until you are, on those keywords. On Commerce plans the list is commercial keywords (categories, money pages, brand), not every product URL.",
  },
  {
    q: "Why two installments?",
    a: "50% starts the build. 50% is due on day 45 so you have seen real work before the second payment. There is no surprise third invoice for extra hours.",
  },
  {
    q: "Is this cheaper than a normal SEO retainer?",
    a: "A $1,500 to $3,000/month retainer over 6 to 12 months often costs more than a full rankday engagement, and usually without a website or store rebuild or a contractual finish line. Compare total cost and what is included, not the monthly number alone.",
  },
  {
    q: "What if I only need SEO, not a new website or store?",
    a: "Most clients who need rankings also need a site that can rank. If your current site is already strong, tell us on the fit call. We will say if a lighter scope makes sense or if you are better with another partner.",
  },
  {
    q: "Do I have to pay after day 90?",
    a: "No. Maintenance is optional and month-to-month. Many clients keep the site and rankings without an ongoing fee.",
  },
];

export function PricingClient() {
  const reduce = useReducedMotion();

  return (
    <div className="page-enter">
      <JsonLd data={faqPageSchema(faqs)} />

      <section style={{ padding: "28px 0 24px", textAlign: "center" }}>
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            Pricing
          </motion.span>
          <motion.h1
            className="h-display"
            style={{ maxWidth: 1100, margin: "16px auto 0" }}
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease: easeOut, delay: 0.05 }}
          >
            One price. One outcome. <span className="it">No surprises.</span>
          </motion.h1>
          <motion.p
            className="lede"
            style={{ marginTop: 20, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.15 }}
          >
            Website or Shopify store, Google top-3 on agreed keywords, and AI-ready structure. All in 90 days.
            Paid in two installments. Top-3 guarantee on 90% of the keyword list we lock before day 1.
          </motion.p>
        </div>
      </section>

      <section style={{ padding: "24px 0 48px" }}>
        <div className="container">
          <motion.div
            className="r-2"
            variants={reduce ? undefined : staggerContainer}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={reduce ? undefined : staggerItem} className="card card-lilac" style={{ padding: 48, display: "flex", flexDirection: "column", gap: 28 }}>
              <div>
                <span className="tag light">Standard</span>
                <div style={{ marginTop: 22, display: "flex", alignItems: "baseline", gap: 12 }}>
                  <p
                    style={{
                      fontSize: "clamp(54px, 7vw, 96px)",
                      fontWeight: 700,
                      color: "var(--ink)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.035em",
                      margin: 0,
                    }}
                  >
                    $4,900
                  </p>
                  <span style={{ fontSize: 16, color: "var(--muted)", fontWeight: 600 }}>USD</span>
                </div>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: 14,
                    color: "var(--purple)",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  For 90 days of work. One price.
                </p>
                <p className="body" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                  For local service businesses and small operators. Up to 7-page website, up to 15 target
                  keywords, local SEO and AEO.
                </p>
              </div>

              <div>
                {standardIncludes.map((t) => (
                  <div className="check" key={t} style={{ padding: "10px 0", fontSize: 14 }}>
                    <span className="check-mark" style={{ width: 18, height: 18 }}>
                      <Icon.Check />
                    </span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/971565981209?text=I%20want%20Standard%20%244%2C900%20%20-%20%2090%20days"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ alignSelf: "flex-start" }}
              >
                Start Standard <span className="btn-icon"><Icon.Arrow /></span>
              </a>
            </motion.div>

            <motion.div variants={reduce ? undefined : staggerItem} className="card card-purple" style={{ padding: 48, display: "flex", flexDirection: "column", gap: 28 }}>
              <div>
                <span className="tag" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
                  Growth · most popular
                </span>
                <div style={{ marginTop: 22, display: "flex", alignItems: "baseline", gap: 12 }}>
                  <p
                    style={{
                      fontSize: "clamp(54px, 7vw, 96px)",
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 0.95,
                      letterSpacing: "-0.035em",
                      margin: 0,
                    }}
                  >
                    $7,900
                  </p>
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>USD</span>
                </div>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: 14,
                    color: "#fff",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  For 90 days of work. One price.
                </p>
                <p className="body" style={{ marginTop: 18, color: "rgba(255,255,255,0.85)" }}>
                  For B2B, SaaS, professional services, or higher-intent categories. Up to 12-page website, up
                  to 30 target keywords, full SEO and AEO including comparison content and third-party placement.
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.7)",
                    margin: 0,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Everything in Standard, plus
                </p>
                <div style={{ marginTop: 12 }}>
                  {growthExtras.map((t) => (
                    <div
                      className="check"
                      key={t}
                      style={{
                        padding: "10px 0",
                        fontSize: 14,
                        borderTopColor: "rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.92)",
                      }}
                    >
                      <span
                        className="check-mark"
                        style={{ width: 18, height: 18, background: "#fff", color: "var(--purple)" }}
                      >
                        <Icon.Check />
                      </span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://wa.me/971565981209?text=I%20want%20Growth%20%247%2C900%20%20-%20%2090%20days"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light"
                style={{ alignSelf: "flex-start" }}
              >
                Start Growth <span className="btn-icon"><Icon.Arrow /></span>
              </a>
            </motion.div>
          </motion.div>

          <p style={{ marginTop: 28, textAlign: "center", fontSize: 15, color: "var(--muted)" }}>
            All plans paid in two installments:{" "}
            <strong style={{ color: "var(--ink)" }}>50% to start, 50% on day 45.</strong> No third invoice for
            'extra hours.'
          </p>
        </div>
      </section>

      {/* Commerce plans: Shopify / ecommerce */}
      <section className="section" id="commerce" style={{ paddingTop: 8, scrollMarginTop: 100 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Shopify &amp; ecommerce stores.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              Same fixed-price model. Built for product catalogs, not brochure sites. Includes store build,
              ecommerce SEO, and AEO / GEO.
            </p>
          </div>

          <motion.div
            className="r-2"
            variants={reduce ? undefined : staggerContainer}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, amount: 0.12 }}
          >
            <motion.div variants={reduce ? undefined : staggerItem} className="card card-peach" style={{ padding: 48, display: "flex", flexDirection: "column", gap: 28 }}>
              <div>
                <span className="tag light">Commerce</span>
                <div style={{ marginTop: 22, display: "flex", alignItems: "baseline", gap: 12 }}>
                  <p
                    style={{
                      fontSize: "clamp(54px, 7vw, 96px)",
                      fontWeight: 700,
                      color: "var(--ink)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.035em",
                      margin: 0,
                    }}
                  >
                    $9,900
                  </p>
                  <span style={{ fontSize: 16, color: "var(--muted)", fontWeight: 600 }}>USD</span>
                </div>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: 14,
                    color: "var(--purple)",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  For 90 days of work. One price.
                </p>
                <p className="body" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                  For Shopify and ecommerce launches. Custom theme, up to ~150 products, collections, payments
                  and shipping basics, ecommerce SEO and AEO.
                </p>
              </div>

              <div>
                {commerceIncludes.map((t) => (
                  <div className="check" key={t} style={{ padding: "10px 0", fontSize: 14 }}>
                    <span className="check-mark" style={{ width: 18, height: 18 }}>
                      <Icon.Check />
                    </span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/971565981209?text=I%20want%20Commerce%20%249%2C900%20%20-%20%20Shopify%20%2B%20SEO"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ alignSelf: "flex-start" }}
              >
                Start Commerce <span className="btn-icon"><Icon.Arrow /></span>
              </a>
            </motion.div>

            <motion.div variants={reduce ? undefined : staggerItem} className="card card-pink" style={{ padding: 48, display: "flex", flexDirection: "column", gap: 28 }}>
              <div>
                <span className="tag light">Commerce Scale · large catalogs</span>
                <div style={{ marginTop: 22, display: "flex", alignItems: "baseline", gap: 12 }}>
                  <p
                    style={{
                      fontSize: "clamp(54px, 7vw, 96px)",
                      fontWeight: 700,
                      color: "var(--ink)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.035em",
                      margin: 0,
                    }}
                  >
                    $14,900
                  </p>
                  <span style={{ fontSize: 16, color: "var(--muted)", fontWeight: 600 }}>USD</span>
                </div>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: 14,
                    color: "var(--purple)",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  For 90 days of work. One price.
                </p>
                <p className="body" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                  For large catalogs: hundreds to ~1,500 products and heavy image sets. Bulk product and image
                  SEO, collection architecture, deeper technical ecom SEO, and AEO.
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    margin: 0,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Everything in Commerce, plus
                </p>
                <div style={{ marginTop: 12 }}>
                  {commerceScaleExtras.map((t) => (
                    <div className="check" key={t} style={{ padding: "10px 0", fontSize: 14 }}>
                      <span className="check-mark" style={{ width: 18, height: 18 }}>
                        <Icon.Check />
                      </span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://wa.me/971565981209?text=I%20want%20Commerce%20Scale%20%2414%2C900%20%20-%20%20large%20catalog"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ alignSelf: "flex-start" }}
              >
                Start Commerce Scale <span className="btn-icon"><Icon.Arrow /></span>
              </a>
            </motion.div>
          </motion.div>

          <p style={{ marginTop: 28, textAlign: "center", fontSize: 15, color: "var(--muted)" }}>
            Platform fees (Shopify plan, apps) and product photography are not included.{" "}
            <strong style={{ color: "var(--ink)" }}>Same 50% / 50% payment split.</strong>
          </p>
        </div>
      </section>

      {/* How payment + scope works */}
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">How scope and payment work.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              Fixed price only works if the finish line is clear. Here is the sequence before and during the 90 days.
            </p>
          </div>
          <div data-reveal-stagger style={{ display: "grid", gap: 12 }}>
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="card"
                style={{ padding: "22px 28px", display: "grid", gridTemplateColumns: "72px 1fr", gap: 16, alignItems: "start" }}
              >
                <span style={{ fontSize: 13, fontWeight: 800, color: "var(--purple)", letterSpacing: "0.06em" }}>
                  {item.step}
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>{item.title}</h3>
                  <p style={{ margin: "8px 0 0", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">The top-3 guarantee, in plain language.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              Not 'we will try.' A written keyword list, a 90-day scoreboard, and free continuation if we miss the bar.
            </p>
          </div>
          <div data-reveal-stagger className="r-2">
            {guaranteePoints.map((item) => (
              <div key={item.title} className="card" style={{ padding: 32 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>{item.title}</h3>
                <p style={{ margin: "12px 0 0", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>{item.body}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 14, color: "var(--muted)" }}>
            Full process detail:{" "}
            <Link href="/how-it-works" style={{ color: "var(--purple)", fontWeight: 700 }}>
              How it works
            </Link>
            . Example outcomes:{" "}
            <Link href="/results" style={{ color: "var(--purple)", fontWeight: 700 }}>
              Results
            </Link>
            .
          </p>
        </div>
      </section>

      {/* vs retainer */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">rankday vs a typical SEO retainer.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              Compare total cost and finish line, not only the monthly number.
            </p>
          </div>
          <div data-reveal className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
                <thead>
                  <tr style={{ background: "var(--ink)", color: "#fff" }}>
                    <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      Dimension
                    </th>
                    <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#c4b5fd" }}>
                      rankday
                    </th>
                    <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.75 }}>
                      Typical retainer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vsRows.map(([dim, us, them], i) => (
                    <tr key={dim} style={{ borderTop: i === 0 ? "none" : "1px solid var(--hairline)" }}>
                      <td style={{ padding: "16px 20px", fontWeight: 700, color: "var(--ink)", fontSize: 14 }}>{dim}</td>
                      <td style={{ padding: "16px 20px", color: "var(--ink-2)", fontSize: 14, lineHeight: 1.45 }}>{us}</td>
                      <td style={{ padding: "16px 20px", color: "var(--muted)", fontSize: 14, lineHeight: 1.45 }}>{them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ marginTop: 14, fontSize: 14, color: "var(--muted)" }}>
            Example: six months at $2,000/mo is $12,000, often without a new site or a contractual top-3 finish line.
          </p>
        </div>
      </section>

      {/* Local pricing */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Local pricing.</h2>
            <p className="body lg" style={{ maxWidth: 540 }}>
              Same scope. Local invoicing. All prices below are for the full 90 days of work. Other markets billed in USD.
            </p>
          </div>

          <p
            data-reveal
            style={{
              marginBottom: 12,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textAlign: "center",
            }}
          >
            Website plans
          </p>
          <div data-reveal className="card" style={{ padding: 0, overflow: "hidden", maxWidth: 880, margin: "0 auto" }}>
            <div className="r-pricing-table" style={{ background: "var(--ink)", color: "#fff", padding: "16px 28px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>
                Market
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>
                Standard
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>
                Growth
              </div>
            </div>

            {localPricing.map(([market, std, gro], i) => (
              <div
                key={market}
                className="r-pricing-table"
                style={{
                  padding: "22px 28px",
                  borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.005em" }}>{market}</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.005em" }}>{std}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--purple)", letterSpacing: "-0.005em" }}>{gro}</div>
              </div>
            ))}
          </div>

          <p
            data-reveal
            style={{
              marginTop: 32,
              marginBottom: 12,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textAlign: "center",
            }}
          >
            Shopify &amp; ecommerce plans
          </p>
          <div data-reveal className="card" style={{ padding: 0, overflow: "hidden", maxWidth: 880, margin: "0 auto" }}>
            <div className="r-pricing-table" style={{ background: "var(--ink)", color: "#fff", padding: "16px 28px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>
                Market
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>
                Commerce
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>
                Commerce Scale
              </div>
            </div>

            {localCommercePricing.map(([market, com, scale], i) => (
              <div
                key={market}
                className="r-pricing-table"
                style={{
                  padding: "22px 28px",
                  borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.005em" }}>{market}</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.005em" }}>{com}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--purple)", letterSpacing: "-0.005em" }}>{scale}</div>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 18, textAlign: "center", fontSize: 14, color: "var(--muted)" }}>
            Other markets billed in USD. Arabic (UAE/GCC) and Malayalam (Kerala) available at no extra cost where relevant.
          </p>
        </div>
      </section>

      {/* After + not included */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger className="r-2">
            <div className="card" style={{ padding: 40 }}>
              <p className="kicker">After day 90</p>
              <p
                style={{
                  fontSize: 24,
                  color: "var(--ink)",
                  marginTop: 18,
                  lineHeight: 1.3,
                  letterSpacing: "-0.015em",
                  fontWeight: 700,
                }}
              >
                Most clients keep the site and rankings as-is.{" "}
                <span className="serif" style={{ color: "var(--purple)" }}>No ongoing fees required.</span>
              </p>
              <p className="body" style={{ marginTop: 22 }}>
                If you want us to keep producing content, protecting your rankings, and expanding AI visibility, we
                offer month-to-month maintenance:
              </p>

              <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="maintenance-grid">
                <div
                  style={{
                    padding: "16px 18px",
                    background: "var(--paper)",
                    borderRadius: 14,
                    border: "1px solid var(--hairline)",
                  }}
                >
                  <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", margin: 0, fontWeight: 600 }}>
                    Standard
                  </p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", margin: "8px 0 0", letterSpacing: "-0.02em" }}>
                    $600<span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>/mo</span>
                  </p>
                </div>
                <div
                  style={{
                    padding: "16px 18px",
                    background: "var(--purple-tint)",
                    borderRadius: 14,
                    border: "1px solid rgba(74,43,240,0.15)",
                  }}
                >
                  <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--purple)", margin: 0, fontWeight: 600 }}>
                    Growth
                  </p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: "var(--purple)", margin: "8px 0 0", letterSpacing: "-0.02em" }}>
                    $1,200<span style={{ fontSize: 13, color: "var(--purple)", opacity: 0.7, fontWeight: 500 }}>/mo</span>
                  </p>
                </div>
                <div
                  style={{
                    padding: "16px 18px",
                    background: "var(--paper)",
                    borderRadius: 14,
                    border: "1px solid var(--hairline)",
                  }}
                >
                  <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", margin: 0, fontWeight: 600 }}>
                    Commerce
                  </p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", margin: "8px 0 0", letterSpacing: "-0.02em" }}>
                    $900<span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>/mo</span>
                  </p>
                </div>
                <div
                  style={{
                    padding: "16px 18px",
                    background: "var(--purple-tint)",
                    borderRadius: 14,
                    border: "1px solid rgba(74,43,240,0.15)",
                  }}
                >
                  <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--purple)", margin: 0, fontWeight: 600 }}>
                    Commerce Scale
                  </p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: "var(--purple)", margin: "8px 0 0", letterSpacing: "-0.02em" }}>
                    $1,500<span style={{ fontSize: 13, color: "var(--purple)", opacity: 0.7, fontWeight: 500 }}>/mo</span>
                  </p>
                </div>
              </div>

              <p className="body" style={{ marginTop: 22, fontStyle: "italic", color: "var(--muted-2)" }}>
                Cancel any time. We do not push it. The 90-day work is built to stand on its own for most businesses.
              </p>
            </div>

            <div className="card card-pink" style={{ padding: 40 }}>
              <p className="kicker" style={{ color: "#c63b5b" }}>What is not included</p>
              <div style={{ marginTop: 18 }}>
                {notIncluded.map((t) => (
                  <div className="check" key={t} style={{ borderTopColor: "rgba(0,0,0,0.06)" }}>
                    <span className="xmark">
                      <Icon.X />
                    </span>
                    <span style={{ fontSize: 16 }}>{t}</span>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 22, fontSize: 15, color: "var(--ink-2)", fontWeight: 500 }}>
                If you need ads or social, we will point you to someone good. We will not pad the 90-day scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who should pick which */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Which plan should you pick?</h2>
          </div>
          <div data-reveal-stagger className="r-2">
            <div className="card" style={{ padding: 32 }}>
              <p className="kicker">Choose Standard if</p>
              <ul style={{ margin: "14px 0 0", paddingLeft: 18, color: "var(--ink-2)", lineHeight: 1.6, fontSize: 15 }}>
                <li>You are a local service or small operator</li>
                <li>You need a clean 5-7 page site and a focused keyword set</li>
                <li>Competition is local or regional, not national brand wars</li>
                <li>You want a fixed finish line without enterprise content volume</li>
              </ul>
            </div>
            <div className="card" style={{ padding: 32 }}>
              <p className="kicker">Choose Growth if</p>
              <ul style={{ margin: "14px 0 0", paddingLeft: 18, color: "var(--ink-2)", lineHeight: 1.6, fontSize: 15 }}>
                <li>You are B2B, SaaS, or professional services</li>
                <li>Buyers compare alternatives and need 'vs' / category pages</li>
                <li>You care about AI shortlists as well as Google top-3</li>
                <li>You want a wider keyword set and third-party placement work</li>
              </ul>
            </div>
            <div className="card" style={{ padding: 32 }}>
              <p className="kicker">Choose Commerce if</p>
              <ul style={{ margin: "14px 0 0", paddingLeft: 18, color: "var(--ink-2)", lineHeight: 1.6, fontSize: 15 }}>
                <li>You need a Shopify or ecommerce store, not a brochure site</li>
                <li>You have up to ~150 products and clear collections</li>
                <li>You want store build + ecommerce SEO + AEO in one fixed price</li>
                <li>You are launching or rebuilding a mid-size catalog</li>
              </ul>
            </div>
            <div className="card" style={{ padding: 32 }}>
              <p className="kicker">Choose Commerce Scale if</p>
              <ul style={{ margin: "14px 0 0", paddingLeft: 18, color: "var(--ink-2)", lineHeight: 1.6, fontSize: 15 }}>
                <li>You have hundreds to ~1,500 products (and large image sets)</li>
                <li>You need bulk product and image SEO, not only theme polish</li>
                <li>Category architecture and technical crawl health matter</li>
                <li>You want a wider commercial keyword set and AI visibility work</li>
              </ul>
            </div>
          </div>
          <p style={{ marginTop: 16, fontSize: 14, color: "var(--muted)" }}>
            Not sure?{" "}
            <Link href="/who-its-for" style={{ color: "var(--purple)", fontWeight: 700 }}>
              Who it is for
            </Link>{" "}
            or message us. We will recommend the right plan on a 15-minute fit call.
          </p>
        </div>
      </section>

      <FaqSection
        heading="Pricing questions."
        intro="What you pay, what the guarantee covers, and what happens after day 90."
        items={faqs}
      />

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}>
              <span className="serif">Start</span> your 90 days.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.82)", maxWidth: 480, margin: "8px 0 0" }}>
              Tell us Standard, Growth, Commerce, or Commerce Scale. We lock keywords in writing, then build.
            </p>
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-light" style={{ marginTop: 8 }}>
              WhatsApp to start <span className="btn-icon"><Icon.Arrow /></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
