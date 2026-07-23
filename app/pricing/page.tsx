import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, faqPageSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "SEO Pricing. Flat Rate, No Contracts.",
  description:
    "Standard from $4,900 USD. Growth from $7,900 USD. One price covers website rebuild, Google top-3 rankings, and AI citations. 90 days, paid in two installments. Top-3 guarantee on 90% of agreed keywords.",
  path: "/pricing",
});

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

const localPricing: Array<[string, string, string]> = [
  ["India", "₹3,99,000", "₹6,49,000"],
  ["UAE", "AED 18,000", "AED 29,000"],
  ["UK", "£3,900", "£6,200"],
  ["US", "$4,900", "$7,900"],
];

const notIncluded = [
  "Paid advertising (Google Ads, Meta, etc.)",
  "Social media management or content calendars",
  "Ongoing retainers unless you opt into maintenance after day 90",
  "Anything outside the written 90-day scope and keyword list",
];

const guaranteePoints = [
  {
    title: "Keywords are fixed in writing",
    body: "Before work starts we agree a keyword list (up to 15 on Standard, up to 30 on Growth). That list is the guarantee. We do not move the goalposts mid-project.",
  },
  {
    title: "Top 3 on 90% of agreed keywords",
    body: "By day 90, if you are not in the Google top 3 for at least 90% of that list, we keep working at no extra cost until you are — on those keywords.",
  },
  {
    title: "What can slow results",
    body: "Approvals, content access, legal review, and extreme competition on brand-new domains all affect pace. We flag risk before you pay the second installment.",
  },
  {
    title: "AI citations are included as work, not a second guarantee",
    body: "We build AEO into every engagement (structure, schema, answer pages, proof). AI engines change faster than Google SERPs, so the formal guarantee is Google top-3 on the agreed set.",
  },
];

const vsRows: Array<[string, string, string]> = [
  ["Price model", "One fixed price for 90 days", "Monthly retainer, often 6–12 months minimum"],
  ["Website", "New custom site included", "Usually “optimise your existing site”"],
  ["Finish line", "Day 90 — done or free extension on guarantee", "Open-ended; hard to know when you’re finished"],
  ["Guarantee", "Top 3 on 90% of agreed keywords or we keep working free", "Rarely contractual; “we’ll do our best”"],
  ["AI / AEO", "Built in: schema, answer content, citation readiness", "Often missing or sold as a separate upsell"],
  ["Reporting", "Weekly Looms + clear keyword scoreboard", "Dashboards full of vanity metrics"],
];

const processSteps = [
  {
    step: "01",
    title: "Fit call (15–20 min)",
    body: "WhatsApp or call. We check market, competition, and whether a 90-day sprint can work. If not, we say so.",
  },
  {
    step: "02",
    title: "Keyword scope locked",
    body: "You get a written list of target keywords and what “top 3” means for each. No surprise topics later.",
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
    a: "A fixed 90-day engagement: custom website (or rebuild), on-page and off-page SEO, and AEO setup so you are easier to cite in AI answers. Standard is $4,900 USD; Growth is $7,900 USD, with local pricing in India, UAE, and UK.",
  },
  {
    q: "How does the top-3 guarantee work?",
    a: "Keywords are agreed in writing before day 1. If by day 90 you are not in the Google top 3 for at least 90% of that list, we continue working at no extra cost until you are — on those keywords.",
  },
  {
    q: "Why two installments?",
    a: "50% starts the build. 50% is due on day 45 so you have seen real work before the second payment. There is no surprise third invoice for “extra hours.”",
  },
  {
    q: "Is this cheaper than a normal SEO retainer?",
    a: "A $1,500–$3,000/month retainer over 6–12 months often costs more than a full rankday engagement — without a website rebuild or a contractual finish line. Compare total cost and what is included, not the monthly number alone.",
  },
  {
    q: "What if I only need SEO, not a new website?",
    a: "Most clients who need rankings also need a site that can rank. If your current site is already strong, tell us on the fit call — we will say if a lighter scope makes sense or if you are better with another partner.",
  },
  {
    q: "Do I have to pay after day 90?",
    a: "No. Maintenance is optional and month-to-month. Many clients keep the site and rankings without an ongoing fee.",
  },
];

export default function PricingPage() {
  return (
    <div className="page-enter">
      <JsonLd data={faqPageSchema(faqs)} />

      <section style={{ padding: "32px 0 24px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 1100, margin: "16px auto 0" }}>
            One price. One outcome. <span className="it">No surprises.</span>
          </h1>
          <p
            className="lede"
            data-reveal
            style={{ marginTop: 20, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
          >
            Website, Google top-3 on agreed keywords, and AI-ready structure — in 90 days.
            Paid in two installments. Top-3 guarantee on 90% of the keyword list we lock before day 1.
          </p>
        </div>
      </section>

      <section style={{ padding: "24px 0 48px" }}>
        <div className="container">
          <div data-reveal-stagger className="r-2">
            <div className="card card-lilac" style={{ padding: 48, display: "flex", flexDirection: "column", gap: 28 }}>
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
                href="https://wa.me/971565981209?text=I%20want%20Standard%20%244%2C900%20%E2%80%94%2090%20days"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ alignSelf: "flex-start" }}
              >
                Start Standard <span className="btn-icon"><Icon.Arrow /></span>
              </a>
            </div>

            <div className="card card-purple" style={{ padding: 48, display: "flex", flexDirection: "column", gap: 28 }}>
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
                href="https://wa.me/971565981209?text=I%20want%20Growth%20%247%2C900%20%E2%80%94%2090%20days"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light"
                style={{ alignSelf: "flex-start" }}
              >
                Start Growth <span className="btn-icon"><Icon.Arrow /></span>
              </a>
            </div>
          </div>

          <p style={{ marginTop: 28, textAlign: "center", fontSize: 15, color: "var(--muted)" }}>
            Both paid in two installments:{" "}
            <strong style={{ color: "var(--ink)" }}>50% to start, 50% on day 45.</strong> No third invoice for
            “extra hours.”
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
              Not “we’ll try.” A written keyword list, a 90-day scoreboard, and free continuation if we miss the bar.
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
              Compare total cost and finish line — not just the monthly number.
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
            Example: six months at $2,000/mo is $12,000 — often without a new site or a contractual top-3 finish line.
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
                If you need ads or social, we will point you to someone good — we will not pad the 90-day scope.
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
                <li>You need a clean 5–7 page site and a focused keyword set</li>
                <li>Competition is local or regional, not national brand wars</li>
                <li>You want a fixed finish line without enterprise content volume</li>
              </ul>
            </div>
            <div className="card" style={{ padding: 32 }}>
              <p className="kicker">Choose Growth if</p>
              <ul style={{ margin: "14px 0 0", paddingLeft: 18, color: "var(--ink-2)", lineHeight: 1.6, fontSize: 15 }}>
                <li>You are B2B, SaaS, or professional services</li>
                <li>Buyers compare alternatives and need “vs” / category pages</li>
                <li>You care about AI shortlists as well as Google top-3</li>
                <li>You want a wider keyword set and third-party placement work</li>
              </ul>
            </div>
          </div>
          <p style={{ marginTop: 16, fontSize: 14, color: "var(--muted)" }}>
            Not sure?{" "}
            <Link href="/who-its-for" style={{ color: "var(--purple)", fontWeight: 700 }}>
              Who it is for
            </Link>{" "}
            or message us — we will recommend Standard or Growth on a 15-minute fit call.
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
              Tell us Standard or Growth. We lock keywords in writing, then build.
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
