"use client";

import { useState } from "react";
import type { AeoReport, Check } from "@/lib/aeo-score";

const WHATSAPP_URL = "https://wa.me/971565981209";
const GRADE_COLOR: Record<string, string> = {
  A: "#16a34a",
  B: "#65a30d",
  C: "#d97706",
  D: "#ea580c",
  F: "#dc2626",
};

export function AeoClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<AeoReport | null>(null);

  const [email, setEmail] = useState("");
  const [isOwnSite, setIsOwnSite] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function runScan(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setReport(null);
    setUnlocked(false);
    if (!url.trim()) {
      setError("Enter a URL to scan.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/aeo-score", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
      } else {
        setReport(data as AeoReport);
      }
    } catch {
      setError("Couldn't run the scan. Check the URL and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (!report) return;
    setSubmitting(true);
    // Web3Forms' free plan only accepts submissions from the browser, so we send
    // it client-side. If no public key is configured, fall back to the server
    // route (which can log or forward to a server-side webhook).
    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    try {
      if (web3Key) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `New AEO Score lead: ${email} (${report.score}/100)`,
            from_name: "rankday AEO Score tool",
            email,
            replyto: email,
            message: `Email: ${email}\nScanned: ${report.url}\nScore: ${report.score}/100\nClient site: ${isOwnSite ? "no (own site)" : "yes"}`,
            scanned_url: report.url,
            score: report.score,
            is_own_site: isOwnSite,
          }),
        });
      } else {
        await fetch("/api/aeo-lead", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, url: report.url, score: report.score, isOwnSite }),
        });
      }
      setUnlocked(true);
    } catch {
      // Unlock anyway; don't punish the user for a backend hiccup.
      setUnlocked(true);
    } finally {
      setSubmitting(false);
    }
  }

  const failed: Check[] = report
    ? [...report.checks]
        .filter((c) => !c.passed)
        .sort((a, b) => severityRank(b.severity) - severityRank(a.severity) || b.weight - a.weight)
    : [];
  const previewFixes = failed.slice(0, 2);
  const lockedFixes = failed.slice(2);

  return (
    <section className="section" style={{ paddingTop: 8 }}>
      <div className="container" style={{ maxWidth: 820 }}>
        {/* Input */}
        <form onSubmit={runScan} data-reveal style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourwebsite.com"
            aria-label="Website URL"
            style={{
              flex: "1 1 320px",
              minWidth: 0,
              padding: "16px 20px",
              fontSize: 16,
              borderRadius: 12,
              border: "1px solid var(--hairline)",
              background: "#fff",
              color: "var(--ink)",
            }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flexShrink: 0 }}>
            {loading ? "Scanning…" : "Scan my site"}
          </button>
        </form>

        {error ? (
          <p style={{ marginTop: 16, textAlign: "center", color: "#dc2626", fontWeight: 600 }}>{error}</p>
        ) : null}

        {/* Results */}
        {report ? (
          <div style={{ marginTop: 36 }}>
            {/* Score header */}
            <div className="card" style={{ padding: 36, display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
              <div
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: 99,
                  background: GRADE_COLOR[report.grade] || "#dc2626",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 34, fontWeight: 800, lineHeight: 1 }}>{report.score}</span>
                <span style={{ fontSize: 12, opacity: 0.85 }}>/ 100</span>
              </div>
              <div style={{ flex: "1 1 240px" }}>
                <p className="kicker">AEO Score for {report.domain}</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: "var(--ink)", margin: "6px 0 0", letterSpacing: "-0.02em" }}>
                  Grade {report.grade}: {gradeBlurb(report.grade)}
                </p>
              </div>
            </div>

            {/* Category bars */}
            <div data-reveal style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {report.categories.map((c) => {
                const pct = c.max ? Math.round((c.score / c.max) * 100) : 0;
                return (
                  <div key={c.name} className="card" style={{ padding: "18px 24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>
                      <span>{c.name}</span>
                      <span>{c.score}/{c.max}</span>
                    </div>
                    <div style={{ marginTop: 10, height: 8, borderRadius: 99, background: "var(--hairline)", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: pct >= 70 ? "#16a34a" : pct >= 40 ? "#d97706" : "#dc2626" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fixes */}
            <div style={{ marginTop: 28 }}>
              <h2 className="h1" style={{ fontSize: 24 }}>
                {failed.length === 0 ? "No major issues found." : `${failed.length} things to fix.`}
              </h2>

              {previewFixes.map((c) => (
                <FixRow key={c.id} check={c} />
              ))}

              {lockedFixes.length > 0 && !unlocked ? (
                <div className="card card-ink" style={{ padding: 32, marginTop: 16 }}>
                  <p style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: 0 }}>
                    Get the full list: {lockedFixes.length} more fix{lockedFixes.length === 1 ? "" : "es"}, ranked by impact.
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, margin: "8px 0 0" }}>
                    We'll email your complete report and the badge you can embed. No spam.
                  </p>
                  <form onSubmit={unlock} style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      aria-label="Your email"
                      style={{ flex: "1 1 260px", minWidth: 0, padding: "14px 18px", fontSize: 15, borderRadius: 10, border: "none" }}
                    />
                    <button type="submit" className="btn btn-light" disabled={submitting} style={{ flexShrink: 0 }}>
                      {submitting ? "Sending…" : "Get full report"}
                    </button>
                  </form>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, color: "rgba(255,255,255,0.75)", fontSize: 13 }}>
                    <input type="checkbox" checked={!isOwnSite} onChange={(e) => setIsOwnSite(!e.target.checked)} />
                    This is a client's site, not mine
                  </label>
                </div>
              ) : null}

              {unlocked ? (
                <>
                  {lockedFixes.map((c) => (
                    <FixRow key={c.id} check={c} />
                  ))}
                  <BadgeEmbed report={report} />
                </>
              ) : null}
            </div>

            {/* CTA */}
            <div data-reveal className="band-purple r-band" style={{ marginTop: 28 }}>
              <h2 className="h1" style={{ color: "#fff" }}>
                {report.score >= 80 ? (
                  <>Strong score. Want to <span className="serif">own the rankings too?</span></>
                ) : (
                  <>That's exactly what we fix <span className="serif">in 90 days.</span></>
                )}
              </h2>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                Start your 90 days
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FixRow({ check }: { check: Check }) {
  const dot = check.severity === "high" ? "#dc2626" : check.severity === "medium" ? "#d97706" : "#9ca3af";
  return (
    <div className="card" style={{ padding: 24, marginTop: 12, display: "flex", gap: 16, alignItems: "flex-start" }}>
      <span style={{ width: 10, height: 10, borderRadius: 99, background: dot, flexShrink: 0, marginTop: 6 }} />
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{check.label}</h3>
        <p style={{ fontSize: 14, color: "var(--muted)", margin: "4px 0 0" }}>{check.detail}</p>
        <p style={{ fontSize: 14, color: "var(--ink-2)", margin: "8px 0 0", lineHeight: 1.5 }}>{check.fix}</p>
      </div>
    </div>
  );
}

function BadgeEmbed({ report }: { report: AeoReport }) {
  const base = "https://www.rank-day.com";
  const badgeUrl = `${base}/api/badge?domain=${encodeURIComponent(report.domain)}&score=${report.score}&grade=${report.grade}`;
  const snippet = `<a href="${base}/tools/aeo-score">\n  <img src="${badgeUrl}" alt="AEO Score ${report.score}/100 by rankday" width="220" height="56" />\n</a>`;
  return (
    <div className="card" style={{ padding: 28, marginTop: 16 }}>
      <p className="kicker">Show off your score</p>
      <p style={{ fontSize: 15, color: "var(--ink-2)", margin: "8px 0 16px" }}>
        Embed this badge on your site. It links back to your free report.
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={badgeUrl} alt={`AEO Score ${report.score} out of 100`} width={220} height={56} />
      <pre
        style={{
          marginTop: 16,
          padding: 16,
          background: "var(--ink)",
          color: "#e5e7eb",
          borderRadius: 10,
          fontSize: 12,
          overflowX: "auto",
          fontFamily: "var(--mono, monospace)",
        }}
      >
        {snippet}
      </pre>
    </div>
  );
}

function severityRank(s: Check["severity"]): number {
  return s === "high" ? 3 : s === "medium" ? 2 : 1;
}

function gradeBlurb(grade: string): string {
  return (
    {
      A: "AI search can find and cite you.",
      B: "Solid, with a few gaps to close.",
      C: "Partly visible, real gaps remain.",
      D: "AI engines are mostly missing you.",
      F: "Largely invisible to AI search.",
    }[grade] || ""
  );
}
