import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, faqPageSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import { caseStudies, resultsBreadcrumbSchema } from "@/lib/case-studies";

export const metadata: Metadata = pageMeta({
  title: "Results. 90-Day SEO & AEO Case Studies.",
  description:
    "See how rankday engagements move Google rankings and AI visibility in 90 days. Case studies across clinics, trades, and SaaS — fixed price, top-3 guarantee.",
  path: "/results",
});

const faqs: FaqItem[] = [
  {
    q: "Are these results guaranteed for every business?",
    a: "We guarantee top-3 Google rankings on 90% of the keywords agreed in writing before work starts — or we keep working at no extra cost. Outcomes vary by competition, domain history, and how fast approvals move. Case studies show what completed engagements delivered for those scopes.",
  },
  {
    q: "Why are some clients anonymized?",
    a: "Many clients prefer not to publish brand names. Metrics and scope still reflect completed work. Where we have permission, we add names, logos, and screenshots.",
  },
  {
    q: "Do you track AI citations as well as Google?",
    a: "Yes. Growth engagements include AI visibility checks on buyer prompts across ChatGPT-style answers, Perplexity, and Gemini. We report mentions, competitors, and citation sources — then build pages and proof so AI can recommend you.",
  },
];

export default function ResultsPage() {
  return (
    <div className="page-enter">
      <JsonLd data={resultsBreadcrumbSchema()} />
      <JsonLd data={faqPageSchema(faqs)} />

      <section style={{ padding: "40px 0 28px" }}>
        <div className="container">
          <span className="eyebrow">Results</span>
          <h1
            className="h-display"
            data-reveal-text
            style={{ maxWidth: 920, marginTop: 18, fontSize: "clamp(34px, 5vw, 64px)" }}
          >
            Proof from <span className="it">90-day</span> engagements.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 20, maxWidth: 680 }}>
            rankday is built around a finish line: website, Google top-3 on agreed keywords, and AI visibility — one fixed price.
            These case studies show the work and the numbers.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Start your 90 days
              <span className="btn-icon">
                <Icon.Arrow />
              </span>
            </a>
            <Link href="/pricing" className="btn btn-ghost">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container">
          <div data-reveal-stagger style={{ display: "grid", gap: 16 }}>
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/results/${study.slug}`}
                className="card"
                style={{ padding: 32, textDecoration: "none", display: "grid", gap: 14 }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                  <span className="eyebrow" style={{ margin: 0 }}>
                    {study.industry}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>
                    {study.market} · {study.plan} · {study.durationDays} days
                    {study.anonymized ? " · Anonymized" : ""}
                  </span>
                </div>
                <h2 style={{ margin: 0, fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                  {study.title}
                </h2>
                <p style={{ margin: 0, fontSize: 16, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: 820 }}>
                  {study.summary}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 10,
                    marginTop: 4,
                  }}
                >
                  {study.metrics.slice(0, 3).map((metric) => (
                    <div
                      key={metric.label}
                      style={{
                        border: "1px solid var(--hairline)",
                        borderRadius: 12,
                        padding: "12px 14px",
                        background: "var(--bg, #fff)",
                      }}
                    >
                      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        {metric.label}
                      </p>
                      <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--ink)" }}>
                        <span style={{ color: "var(--muted)" }}>{metric.before}</span>
                        {" → "}
                        <strong>{metric.after}</strong>
                      </p>
                    </div>
                  ))}
                </div>
                <span style={{ color: "var(--purple)", fontWeight: 700, fontSize: 14 }}>Read case study →</span>
              </Link>
            ))}
          </div>

          <div className="card card-ink" style={{ padding: 36, marginTop: 28 }}>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#fff" }}>
              Want results like these on a fixed timeline?
            </h2>
            <p style={{ margin: "12px 0 0", color: "rgba(255,255,255,0.78)", maxWidth: 560, lineHeight: 1.5 }}>
              Standard and Growth plans. Keyword scope agreed in writing. Top-3 on 90% of agreed keywords or we keep working free.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
              <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-light">
                Start your 90 days
              </a>
              <Link href="/how-it-works" className="btn btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.35)" }}>
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection heading="About these results." intro="How to read the case studies and what the guarantee covers." items={faqs} />
    </div>
  );
}
