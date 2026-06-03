"use client";

import { useMemo, useState } from "react";
import type { WebsiteAuditFinding, WebsiteAuditReport, WebsiteAuditSection } from "@/lib/website-seo-audit";

const WHATSAPP_URL = "https://wa.me/971565981209";
const SECTION_COLORS: Record<string, string> = {
  technical: "#4a2bf0",
  schema: "#16a34a",
  content: "#d97706",
  cwv: "#0f766e",
  ai: "#db2777",
};

export function WebsiteSeoAuditClient() {
  const [url, setUrl] = useState("rank-day.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<WebsiteAuditReport | null>(null);
  const [email, setEmail] = useState("");
  const [isClientSite, setIsClientSite] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function runAudit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setReport(null);
    setUnlocked(false);
    if (!url.trim()) {
      setError("Enter a website URL to audit.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/website-seo-audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url, maxPages: 14 }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Could not run the audit. Try another URL.");
      else setReport(data as WebsiteAuditReport);
    } catch {
      setError("Could not run the audit. Check the URL and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (!report) return;
    setSubmitting(true);
    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    try {
      if (web3Key) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `New Website SEO Audit lead: ${email} (${report.score}/100)`,
            from_name: "rankday Website SEO Audit",
            email,
            replyto: email,
            message: `Email: ${email}\nScanned: ${report.url}\nScore: ${report.score}/100\nClient site: ${isClientSite ? "yes" : "no"}`,
            scanned_url: report.url,
            score: report.score,
            is_client_site: isClientSite,
          }),
        });
      } else {
        await fetch("/api/website-seo-lead", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, url: report.url, score: report.score, isClientSite }),
        });
      }
      setUnlocked(true);
    } catch {
      setUnlocked(true);
    } finally {
      setSubmitting(false);
    }
  }

  const highImpact = useMemo(
    () => (report ? report.findings.filter((finding) => finding.severity === "critical" || finding.severity === "high") : []),
    [report],
  );
  const visibleFindings = report ? (unlocked ? report.findings : report.findings.slice(0, 4)) : [];
  const lockedCount = report ? Math.max(report.findings.length - visibleFindings.length, 0) : 0;

  return (
    <section className="section" style={{ paddingTop: 8 }}>
      <div className="container" style={{ maxWidth: 1120 }}>
        <form
          onSubmit={runAudit}
          data-reveal
          className="card"
          style={{ padding: 18, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="rank-day.com"
            aria-label="Website URL"
            style={{
              flex: "1 1 320px",
              minWidth: 0,
              padding: "16px 18px",
              fontSize: 16,
              borderRadius: 12,
              border: "1px solid var(--hairline)",
              background: "#fff",
              color: "var(--ink)",
            }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flexShrink: 0 }}>
            {loading ? "Auditing..." : "Run free audit"}
          </button>
        </form>

        <p style={{ margin: "12px 0 0", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
          Crawls a small sample of public pages. No login, no Search Console access, no credit card.
        </p>

        {error ? (
          <p style={{ marginTop: 16, textAlign: "center", color: "#dc2626", fontWeight: 700 }}>{error}</p>
        ) : null}

        {report ? (
          <div style={{ marginTop: 34 }}>
            <div
              className="card card-ink"
              style={{
                padding: "clamp(24px, 4vw, 44px)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 28,
                alignItems: "center",
              }}
            >
              <ScoreDial score={report.score} rating={report.rating} />
              <div>
                <p className="kicker" style={{ color: "rgba(255,255,255,0.62)" }}>
                  Website SEO Audit for {report.domain}
                </p>
                <h2 className="h1" style={{ color: "#fff", marginTop: 10 }}>
                  {report.rating}: {scoreLine(report.score)}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.74)", fontSize: 16, lineHeight: 1.6, margin: "12px 0 0" }}>
                  {report.stats.pagesAnalyzed} pages sampled, {report.stats.sitemapUrls} sitemap URLs discovered,
                  and {report.findings.length} prioritized issues found.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
                  <span style={pillStyle}>{highImpact.length} high-impact issue{highImpact.length === 1 ? "" : "s"}</span>
                  <span style={pillStyle}>AI-search ready: {report.sections.find((s) => s.id === "ai")?.score || 0}/100</span>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 14 }}>
              {report.sections.map((section) => (
                <SectionTile key={section.id} section={section} />
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginTop: 16 }}>
              <div className="card" style={{ padding: 28 }}>
                <p className="kicker">Priority fixes</p>
                <h2 className="h1" style={{ fontSize: 28, marginTop: 8 }}>
                  What to fix first.
                </h2>
                <div style={{ marginTop: 12 }}>
                  {visibleFindings.length ? (
                    visibleFindings.map((finding, index) => <FindingRow key={`${finding.title}-${index}`} finding={finding} />)
                  ) : (
                    <p style={{ color: "var(--muted)" }}>No major issues found in the crawl sample.</p>
                  )}
                </div>

                {lockedCount > 0 && !unlocked ? (
                  <div className="card card-pink" style={{ padding: 24, marginTop: 18 }}>
                    <p style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)", margin: 0 }}>
                      Unlock {lockedCount} more fix{lockedCount === 1 ? "" : "es"} and the client-ready report summary.
                    </p>
                    <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "8px 0 0" }}>
                      Send it to your inbox. Use it before a discovery call or a website rebuild pitch.
                    </p>
                    <form onSubmit={unlock} style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        aria-label="Your email"
                        style={{ flex: "1 1 240px", minWidth: 0, padding: "14px 16px", borderRadius: 10, border: "1px solid var(--hairline)" }}
                      />
                      <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
                        {submitting ? "Unlocking..." : "Unlock report"}
                      </button>
                    </form>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, color: "var(--muted)", fontSize: 13 }}>
                      <input type="checkbox" checked={isClientSite} onChange={(e) => setIsClientSite(e.target.checked)} />
                      This is a client or prospect site
                    </label>
                  </div>
                ) : null}
              </div>

              <aside>
                <div className="card" style={{ padding: 24 }}>
                  <p className="kicker">Sampled pages</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                    {report.pages.slice(0, 8).map((page) => (
                      <div key={page.url} style={{ borderTop: "1px solid var(--hairline)", paddingTop: 12 }}>
                        <p style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)", margin: 0, overflowWrap: "anywhere" }}>
                          {page.title || page.url}
                        </p>
                        <p style={{ fontSize: 12, color: "var(--muted)", margin: "4px 0 0", overflowWrap: "anywhere" }}>
                          {page.status} · {page.wordCount} words · {page.schemaTypes.slice(0, 3).join(", ") || "no schema"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div data-reveal className="band-purple r-band" style={{ marginTop: 16, padding: 28 }}>
                  <h2 className="h1" style={{ color: "#fff", fontSize: 28 }}>
                    Want this fixed in <span className="serif">90 days?</span>
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                    rankday rebuilds the site, fixes the SEO foundations, and gets you ready for Google and AI search.
                  </p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                    Start your 90 days
                  </a>
                </div>
              </aside>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ScoreDial({ score, rating }: { score: number; rating: string }) {
  return (
    <div
      style={{
        width: 180,
        height: 180,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: `conic-gradient(#fff ${score * 3.6}deg, rgba(255,255,255,0.14) 0deg)`,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          width: 142,
          height: 142,
          borderRadius: "50%",
          background: "var(--ink)",
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div>
          <strong style={{ display: "block", fontSize: 46, lineHeight: 1 }}>{score}</strong>
          <span style={{ color: "rgba(255,255,255,0.66)", fontSize: 13 }}>{rating}</span>
        </div>
      </div>
    </div>
  );
}

function SectionTile({ section }: { section: WebsiteAuditSection }) {
  const color = SECTION_COLORS[section.id] || "var(--purple)";
  return (
    <div className="card" style={{ padding: 18, minHeight: 124 }}>
      <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {section.label}
      </p>
      <strong style={{ display: "block", marginTop: 10, fontSize: 30, color: "var(--ink)" }}>{section.score}</strong>
      <div style={{ marginTop: 12, height: 8, borderRadius: 99, background: "var(--hairline)", overflow: "hidden" }}>
        <div style={{ width: `${section.score}%`, height: "100%", background: color }} />
      </div>
    </div>
  );
}

function FindingRow({ finding }: { finding: WebsiteAuditFinding & { section: string } }) {
  const color = finding.severity === "critical" || finding.severity === "high" ? "#dc2626" : finding.severity === "medium" ? "#d97706" : "#64748b";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "88px minmax(0, 1fr)", gap: 14, padding: "16px 0", borderTop: "1px solid var(--hairline)" }}>
      <span
        style={{
          alignSelf: "start",
          borderRadius: 99,
          padding: "5px 9px",
          background: color,
          color: "#fff",
          fontSize: 11,
          fontWeight: 800,
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {finding.severity}
      </span>
      <div style={{ minWidth: 0 }}>
        <h3 style={{ margin: 0, color: "var(--ink)", fontSize: 16, fontWeight: 800 }}>{finding.title}</h3>
        <p style={{ margin: "5px 0 0", color: "var(--muted)", fontSize: 14, lineHeight: 1.5 }}>
          {finding.section}: {finding.detail}
        </p>
        <p style={{ margin: "8px 0 0", color: "var(--ink-2)", fontSize: 14, lineHeight: 1.5 }}>{finding.fix}</p>
      </div>
    </div>
  );
}

function scoreLine(score: number): string {
  if (score >= 85) return "strong foundations, now chase the edge cases.";
  if (score >= 70) return "solid website, visible growth gaps.";
  if (score >= 55) return "real upside hiding in technical and AI-search fixes.";
  return "the website is leaving organic demand on the table.";
}

const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: 99,
  padding: "8px 11px",
  color: "rgba(255,255,255,0.82)",
  fontSize: 13,
  fontWeight: 700,
};
