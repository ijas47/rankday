import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { Icon } from "@/components/icons";
import {
  caseStudies,
  caseStudySchema,
  getCaseStudy,
  resultsBreadcrumbSchema,
} from "@/lib/case-studies";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return pageMeta({
    title: `${study.title}`,
    description: study.summary,
    path: `/results/${study.slug}`,
  });
}

export default function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  return (
    <div className="page-enter">
      <JsonLd data={caseStudySchema(study)} />
      <JsonLd data={resultsBreadcrumbSchema(study)} />

      <section style={{ padding: "40px 0 20px" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <Link href="/results" style={{ fontSize: 14, fontWeight: 700, color: "var(--purple)", textDecoration: "none" }}>
            ← All results
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20, alignItems: "center" }}>
            <span className="eyebrow" style={{ margin: 0 }}>
              {study.industry}
            </span>
            <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>
              {study.market} · {study.plan} · {study.durationDays} days
              {study.anonymized ? " · Client anonymized" : ""}
            </span>
          </div>
          <h1
            className="h-display"
            data-reveal-text
            style={{ marginTop: 16, fontSize: "clamp(32px, 4.5vw, 52px)", maxWidth: 820 }}
          >
            {study.title}
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 18, maxWidth: 720 }}>
            {study.summary}
          </p>
          <p style={{ marginTop: 12, fontSize: 15, color: "var(--ink-2)" }}>
            <strong style={{ color: "var(--ink)" }}>Client:</strong> {study.clientLabel}
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 12,
            }}
          >
            {study.metrics.map((metric) => (
              <div key={metric.label} className="card" style={{ padding: 20 }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {metric.label}
                </p>
                <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--muted)" }}>Before</p>
                <p style={{ margin: "2px 0 0", fontSize: 18, fontWeight: 700, color: "var(--ink-2)" }}>{metric.before}</p>
                <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--muted)" }}>After (day {study.durationDays})</p>
                <p style={{ margin: "2px 0 0", fontSize: 22, fontWeight: 800, color: "var(--ink)" }}>{metric.after}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36 }}>
            <h2 className="h1" style={{ fontSize: 28 }}>
              The challenge
            </h2>
            <p className="body" style={{ marginTop: 12, fontSize: 17, lineHeight: 1.65 }}>
              {study.challenge}
            </p>
          </div>

          <div style={{ marginTop: 36 }}>
            <h2 className="h1" style={{ fontSize: 28 }}>
              What we did in {study.durationDays} days
            </h2>
            <ul style={{ margin: "16px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
              {study.work.map((item) => (
                <li
                  key={item}
                  className="card"
                  style={{ padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <span style={{ color: "var(--purple)", fontWeight: 800, lineHeight: 1.4 }}>✓</span>
                  <span style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {study.aiVisibility ? (
            <div className="card card-mint" style={{ marginTop: 28, padding: 28 }}>
              <p className="kicker" style={{ margin: 0 }}>
                AI / AEO visibility
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 14 }}>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--muted)" }}>Before</p>
                  <p style={{ margin: "6px 0 0", color: "var(--ink)", lineHeight: 1.5 }}>{study.aiVisibility.before}</p>
                </div>
                <div>
                  <p style={{ margin: "0", fontSize: 13, fontWeight: 700, color: "var(--muted)" }}>After</p>
                  <p style={{ margin: "6px 0 0", color: "var(--ink)", lineHeight: 1.5 }}>{study.aiVisibility.after}</p>
                </div>
              </div>
            </div>
          ) : null}

          <div style={{ marginTop: 36 }}>
            <h2 className="h1" style={{ fontSize: 28 }}>
              Keyword focus
            </h2>
            <p className="body" style={{ marginTop: 10 }}>
              Scope was agreed in writing before day 1. Representative themes:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
              {study.keywords.map((keyword) => (
                <span
                  key={keyword}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 99,
                    background: "var(--hairline)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {study.quote ? (
            <blockquote
              className="card"
              style={{
                marginTop: 36,
                padding: 32,
                borderLeft: "4px solid var(--purple)",
                marginBottom: 0,
              }}
            >
              <p style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "var(--ink)", lineHeight: 1.45, letterSpacing: "-0.01em" }}>
                “{study.quote.text}”
              </p>
              <footer style={{ marginTop: 14, fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>
                — {study.quote.name}, {study.quote.role}
              </footer>
            </blockquote>
          ) : null}

          <div style={{ marginTop: 36 }}>
            <h2 className="h1" style={{ fontSize: 24 }}>
              Related
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
              {study.relatedPaths.map((link) => (
                <Link key={link.href} href={link.href} className="btn btn-ghost btn-sm">
                  {link.label}
                </Link>
              ))}
              <Link href="/pricing" className="btn btn-ghost btn-sm">
                Pricing
              </Link>
              <Link href="/results" className="btn btn-ghost btn-sm">
                All results
              </Link>
            </div>
          </div>

          <div data-reveal className="band-purple r-band" style={{ marginTop: 40 }}>
            <h2 className="h1" style={{ color: "#fff" }}>
              Get the same system in <span className="serif">90 days.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.82)", maxWidth: 520, margin: "8px 0 0" }}>
              Fixed price. Agreed keywords. Top-3 on 90% or we keep working free. AI visibility included in the model.
            </p>
            <a
              href="https://wa.me/971565981209"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light"
              style={{ marginTop: 8 }}
            >
              Start your 90 days
              <span className="btn-icon">
                <Icon.Arrow />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
