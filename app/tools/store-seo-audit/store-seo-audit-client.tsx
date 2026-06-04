"use client";

import { useMemo, useState } from "react";
import type { StoreAuditCheck, StoreAuditFinding, StoreAuditReport, StoreAuditSection } from "@/lib/store-seo-audit";

const WHATSAPP_URL = "https://wa.me/971565981209";
const SECTION_COLORS: Record<string, string> = {
  technical: "#4a2bf0",
  schema: "#16a34a",
  content: "#d97706",
  cwv: "#0f766e",
  ai: "#db2777",
};

export function StoreSeoAuditClient() {
  const [url, setUrl] = useState("eyewa.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<StoreAuditReport | null>(null);
  const [email, setEmail] = useState("");
  const [isClientSite, setIsClientSite] = useState(true);
  const [requested, setRequested] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function runAudit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setReport(null);
    setRequested(false);
    if (!url.trim()) {
      setError("Enter a store URL to audit.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/store-seo-audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url, maxPages: 20 }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Could not run the audit. Try another URL.");
      else setReport(data as StoreAuditReport);
    } catch {
      setError("Could not run the audit. Check the URL and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function requestReview(e: React.FormEvent) {
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
            subject: `New Store SEO Audit lead: ${email} (${report.score}/100)`,
            from_name: "rankday Store SEO Audit",
            email,
            replyto: email,
            message: `Email: ${email}\nScanned: ${report.url}\nScore: ${report.score}/100\nClient site: ${isClientSite ? "yes" : "no"}`,
            scanned_url: report.url,
            score: report.score,
            is_client_site: isClientSite,
          }),
        });
      } else {
        await fetch("/api/store-seo-lead", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, url: report.url, score: report.score, isClientSite }),
        });
      }
      setRequested(true);
    } catch {
      setRequested(true);
    } finally {
      setSubmitting(false);
    }
  }

  const highImpact = useMemo(
    () => (report ? report.findings.filter((finding) => finding.severity === "critical" || finding.severity === "high") : []),
    [report],
  );
  const groupedFindings = useMemo(
    () =>
      report
        ? report.sections.map((section) => ({
            section,
            findings: report.findings.filter((finding) => finding.section === section.label),
          }))
        : [],
    [report],
  );

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
            placeholder="eyewa.com"
            aria-label="Store URL"
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
                  Store SEO Audit for {report.domain}
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 16, marginTop: 16 }}>
              <div className="card" style={{ padding: 28, minWidth: 0 }}>
                <p className="kicker">Priority fixes</p>
                <h2 className="h1" style={{ fontSize: 28, marginTop: 8 }}>
                  What to fix first.
                </h2>
                <div style={{ marginTop: 12 }}>
                  {report.findings.length ? (
                    report.findings.map((finding, index) => <FindingRow key={`${finding.title}-${index}`} finding={finding} />)
                  ) : (
                    <p style={{ color: "var(--muted)" }}>No major issues found in the crawl sample.</p>
                  )}
                </div>
              </div>

              <aside style={{ minWidth: 0 }}>
                <ScopeCard report={report} />

                <div className="card card-pink" style={{ padding: 24, marginTop: 16 }}>
                  {requested ? (
                    <>
                      <p style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)", margin: 0 }}>Request received.</p>
                      <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "8px 0 0", lineHeight: 1.5 }}>
                        rankday has the URL, score, and contact email for a manual follow-up.
                      </p>
                    </>
                  ) : (
                    <>
                    <p style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)", margin: 0 }}>
                        Want a manual review of this audit?
                    </p>
                    <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "8px 0 0" }}>
                        The free crawl is visible here. Send the URL to rankday if you want a human to check the blind spots.
                    </p>
                      <form onSubmit={requestReview} style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
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
                          {submitting ? "Sending..." : "Request review"}
                      </button>
                    </form>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, color: "var(--muted)", fontSize: 13 }}>
                      <input type="checkbox" checked={isClientSite} onChange={(e) => setIsClientSite(e.target.checked)} />
                      This is a client or prospect site
                    </label>
                    </>
                  )}
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

            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
              {groupedFindings.map(({ section, findings }) => (
                <SectionDetail key={section.id} section={section} findings={findings} />
              ))}
            </div>

            <SampledPages pages={report.pages} />
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

function SectionTile({ section }: { section: StoreAuditSection }) {
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

function ScopeCard({ report }: { report: StoreAuditReport }) {
  return (
    <div className="card" style={{ padding: 24 }}>
      <p className="kicker">Audit scope</p>
      <h2 className="h1" style={{ fontSize: 24, marginTop: 8 }}>
        What this tool verified.
      </h2>
      <ListBlock items={report.summary.verifiedFromCrawl} />
      <p className="kicker" style={{ marginTop: 18 }}>
        Needs external data
      </p>
      <ListBlock items={report.summary.needsExternalData} muted />
    </div>
  );
}

function SectionDetail({ section, findings }: { section: StoreAuditSection; findings: (StoreAuditFinding & { section: string })[] }) {
  return (
    <div className="card" style={{ padding: 24, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
        <div>
          <p className="kicker">{section.label}</p>
          <h2 className="h1" style={{ fontSize: 24, marginTop: 8 }}>
            {section.score}/100
          </h2>
        </div>
        <span
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background: SECTION_COLORS[section.id] || "var(--purple)",
            color: "#fff",
            fontWeight: 900,
          }}
        >
          {section.checks.filter((item) => item.status === "pass").length}
        </span>
      </div>
      <div style={{ marginTop: 14 }}>
        {section.checks.map((item) => (
          <CheckRow key={`${section.id}-${item.label}`} check={item} />
        ))}
      </div>
      {findings.length ? (
        <div style={{ marginTop: 14, borderTop: "1px solid var(--hairline)", paddingTop: 14 }}>
          <p style={{ margin: 0, color: "var(--ink)", fontSize: 13, fontWeight: 800 }}>Section issues</p>
          {findings.slice(0, 4).map((finding) => (
            <p key={finding.title} style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 13, lineHeight: 1.45 }}>
              <strong style={{ color: "var(--ink)" }}>{finding.severity}:</strong> {finding.title}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CheckRow({ check }: { check: StoreAuditCheck }) {
  const color =
    check.status === "pass" ? "#16a34a" : check.status === "fail" ? "#dc2626" : check.status === "warning" ? "#d97706" : "#64748b";
  const label = check.status === "needs-data" ? "needs data" : check.status;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "92px minmax(0, 1fr)", gap: 10, padding: "10px 0", borderTop: "1px solid var(--hairline)" }}>
      <span
        style={{
          alignSelf: "start",
          borderRadius: 99,
          background: color,
          color: "#fff",
          fontSize: 10,
          fontWeight: 900,
          textTransform: "uppercase",
          textAlign: "center",
          padding: "5px 7px",
        }}
      >
        {label}
      </span>
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, color: "var(--ink)", fontSize: 13, fontWeight: 800 }}>{check.label}</p>
        <p style={{ margin: "3px 0 0", color: "var(--muted)", fontSize: 13, lineHeight: 1.45 }}>{check.detail}</p>
      </div>
    </div>
  );
}

function SampledPages({ pages }: { pages: StoreAuditReport["pages"] }) {
  return (
    <div className="card" style={{ padding: 24, marginTop: 16, overflowX: "auto" }}>
      <p className="kicker">Sampled pages</p>
      <div style={{ minWidth: 760, marginTop: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 80px 110px 90px 120px 1.2fr", gap: 12, color: "var(--muted)", fontSize: 12, fontWeight: 800 }}>
          <span>Page</span>
          <span>Status</span>
          <span>Words</span>
          <span>H1s</span>
          <span>Images</span>
          <span>Schema</span>
        </div>
        {pages.map((page) => (
          <div
            key={page.url}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 80px 110px 90px 120px 1.2fr",
              gap: 12,
              alignItems: "start",
              borderTop: "1px solid var(--hairline)",
              padding: "12px 0",
              fontSize: 13,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <p style={{ fontWeight: 800, color: "var(--ink)", margin: 0, overflowWrap: "anywhere" }}>{page.title || page.url}</p>
              <p style={{ color: "var(--muted)", margin: "3px 0 0", overflowWrap: "anywhere" }}>{page.url}</p>
            </div>
            <span style={{ color: page.status >= 200 && page.status < 300 ? "#16a34a" : "#dc2626", fontWeight: 800 }}>{page.status}</span>
            <span>{page.wordCount}</span>
            <span>{page.h1Count}</span>
            <span>
              {page.imagesMissingAlt}/{page.images} missing alt
            </span>
            <span style={{ overflowWrap: "anywhere" }}>{page.schemaTypes.slice(0, 4).join(", ") || "none"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListBlock({ items, muted = false }: { items: string[]; muted?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
      {items.map((item) => (
        <p key={item} style={{ margin: 0, color: muted ? "var(--muted)" : "var(--ink-2)", fontSize: 14, lineHeight: 1.5 }}>
          {item}
        </p>
      ))}
    </div>
  );
}

function FindingRow({ finding }: { finding: StoreAuditFinding & { section: string } }) {
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
  if (score >= 70) return "good operator, visible gaps.";
  if (score >= 55) return "real upside hiding in technical and AI-search fixes.";
  return "the store is leaving organic demand on the table.";
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
