import Link from "next/link";
import { Icon } from "@/components/icons";

const standardIncludes = [
  "5 to 7 page custom website",
  "Branding (logo, colors, type system)",
  "Hosting and domain setup for year one",
  "Google Business Profile rebuild (for local businesses)",
  "4 to 6 SEO content pages",
  "30+ citations and backlinks",
  "Review collection system",
  "AEO setup: schema, structured answers, LLM-ready content",
  "Weekly Loom updates",
  "Top 3 ranking guarantee on 90% of agreed keywords",
];

const growthExtras = [
  "Up to 12-page website with reposition or rebuild",
  "Up to 8 SEO content pages",
  'Comparison and "vs" pages for competitive verticals',
  "Third-party placement (directories, review sites, industry publications)",
  "LinkedIn and category-page optimization",
  "Bi-weekly AI visibility audits",
  "Custom dashboard for ranking and AI citation tracking",
];

const localPricing: Array<[string, string, string]> = [
  ["UAE", "AED 18,000", "AED 29,000"],
  ["UK", "£3,900", "£6,200"],
  ["US", "$4,900", "$7,900"],
];

export default function PricingPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 40px", textAlign: "center" }}>
        <div className="container">
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 1100, margin: "0 auto" }}>
            One price. One outcome. <span className="it">No surprises.</span>
          </h1>
        </div>
      </section>

      <section style={{ padding: "32px 0 64px" }}>
        <div className="container">
          <div data-reveal-stagger style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* Standard */}
            <div className="card card-lilac" style={{ padding: 48, display: "flex", flexDirection: "column", gap: 28 }}>
              <div>
                <span className="tag light">Standard</span>
                <div style={{ marginTop: 22, display: "flex", alignItems: "baseline", gap: 12 }}>
                  <p style={{ fontSize: "clamp(54px, 7vw, 96px)", fontWeight: 700, color: "var(--ink)", lineHeight: 0.95, letterSpacing: "-0.035em", margin: 0 }}>
                    $4,900
                  </p>
                  <span style={{ fontSize: 16, color: "var(--muted)", fontWeight: 600 }}>USD</span>
                </div>
                <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--purple)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  For 90 days of work. One price.
                </p>
                <p className="body" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                  For local service businesses and small operators. Up to 7-page website, up to 15 target keywords, local SEO and AEO.
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

              <Link href="/pricing" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
              </Link>
            </div>

            {/* Growth */}
            <div className="card card-purple" style={{ padding: 48, display: "flex", flexDirection: "column", gap: 28 }}>
              <div>
                <span className="tag" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
                  Growth · most popular
                </span>
                <div style={{ marginTop: 22, display: "flex", alignItems: "baseline", gap: 12 }}>
                  <p style={{ fontSize: "clamp(54px, 7vw, 96px)", fontWeight: 700, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.035em", margin: 0 }}>
                    $7,900
                  </p>
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>USD</span>
                </div>
                <p style={{ margin: "10px 0 0", fontSize: 14, color: "#fff", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  For 90 days of work. One price.
                </p>
                <p className="body" style={{ marginTop: 18, color: "rgba(255,255,255,0.85)" }}>
                  For B2B, SaaS, e-commerce, professional services, or anyone competing in higher-intent categories. Up to 12-page website, up to 30 target keywords, full SEO and AEO including comparison content and third-party placement.
                </p>
              </div>

              <div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Everything in Standard, plus
                </p>
                <div style={{ marginTop: 12 }}>
                  {growthExtras.map((t) => (
                    <div className="check" key={t} style={{ padding: "10px 0", fontSize: 14, borderTopColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.92)" }}>
                      <span className="check-mark" style={{ width: 18, height: 18, background: "#fff", color: "var(--purple)" }}>
                        <Icon.Check />
                      </span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn btn-light" style={{ alignSelf: "flex-start" }}>
                Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
              </button>
            </div>
          </div>

          <p style={{ marginTop: 28, textAlign: "center", fontSize: 15, color: "var(--muted)" }}>
            Both paid in two installments: <strong style={{ color: "var(--ink)" }}>50% to start, 50% on day 45.</strong>
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56, alignItems: "end", marginBottom: 40 }}>
            <h2 className="h1">Local pricing.</h2>
            <p className="body lg" style={{ maxWidth: 540 }}>
              Same scope. Local invoicing. All prices below are for the full 90 days of work. Other markets billed in USD.
            </p>
          </div>

          <div data-reveal className="card" style={{ padding: 0, overflow: "hidden", maxWidth: 880, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 0, background: "var(--ink)", color: "#fff", padding: "16px 28px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>Market</div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>Standard</div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>Growth</div>
            </div>

            {localPricing.map(([market, std, gro], i) => (
              <div
                key={market}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1fr 1fr",
                  gap: 0,
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
            Other markets billed in USD.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="card" style={{ padding: 40 }}>
              <p className="kicker">After day 90</p>
              <p style={{ fontSize: 24, color: "var(--ink)", marginTop: 18, lineHeight: 1.3, letterSpacing: "-0.015em", fontWeight: 700 }}>
                Most clients keep the site and rankings as-is. <span className="serif" style={{ color: "var(--purple)" }}>No ongoing fees required.</span>
              </p>
              <p className="body" style={{ marginTop: 22 }}>
                If you want us to keep producing content, protecting your rankings, and expanding your AI visibility, we offer month-to-month maintenance:
              </p>

              <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ padding: "16px 18px", background: "var(--paper)", borderRadius: 14, border: "1px solid var(--hairline)" }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", margin: 0, fontWeight: 600 }}>Standard</p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", margin: "8px 0 0", letterSpacing: "-0.02em" }}>
                    $600<span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>/mo</span>
                  </p>
                </div>
                <div style={{ padding: "16px 18px", background: "var(--purple-tint)", borderRadius: 14, border: "1px solid rgba(74,43,240,0.15)" }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--purple)", margin: 0, fontWeight: 600 }}>Growth</p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: "var(--purple)", margin: "8px 0 0", letterSpacing: "-0.02em" }}>
                    $1,200<span style={{ fontSize: 13, color: "var(--purple)", opacity: 0.7, fontWeight: 500 }}>/mo</span>
                  </p>
                </div>
              </div>

              <p className="body" style={{ marginTop: 22, fontStyle: "italic", color: "var(--muted-2)" }}>
                Cancel any time. We don&apos;t push it. The 90-day work holds on its own for most businesses.
              </p>
            </div>

            <div className="card card-pink" style={{ padding: 40 }}>
              <p className="kicker" style={{ color: "#c63b5b" }}>What&apos;s not included</p>
              <div style={{ marginTop: 18 }}>
                {[
                  "Paid advertising.",
                  "Social media management.",
                  "Anything outside the 90-day scope.",
                ].map((t) => (
                  <div className="check" key={t} style={{ borderTopColor: "rgba(0,0,0,0.06)" }}>
                    <span className="xmark">
                      <Icon.X />
                    </span>
                    <span style={{ fontSize: 16 }}>{t}</span>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 22, fontSize: 15, color: "var(--ink-2)", fontWeight: 500 }}>
                If you need those, we&apos;ll point you to someone good.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple" style={{ padding: "56px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            <h2 className="h1" style={{ color: "#fff" }}>
              <span className="serif">Start</span> your 90 days.
            </h2>
            <button className="btn btn-light">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
