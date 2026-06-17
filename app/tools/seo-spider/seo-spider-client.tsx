"use client";

import { useMemo, useState } from "react";
import type { CrawledUrl, IssueGroup, SpiderReport, SpiderSeverity } from "@/lib/seo-spider";

const WHATSAPP_URL = "https://wa.me/971565981209";

const SEVERITY_COLORS: Record<SpiderSeverity, string> = {
  critical: "#dc2626",
  high: "#ea580c",
  medium: "#d97706",
  low: "#64748b",
};

const CODE_COLORS: Record<string, string> = {
  "2xx": "#16a34a",
  "3xx": "#d97706",
  "4xx": "#dc2626",
  "5xx": "#991b1b",
  other: "#64748b",
};

type SortKey = "url" | "status" | "title" | "descLength" | "wordCount" | "depth" | "inlinks";

export function SeoSpiderClient() {
  const [url, setUrl] = useState("rank-day.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<SpiderReport | null>(null);
  const [activeIssue, setActiveIssue] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("depth");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [email, setEmail] = useState("");
  const [isClientSite, setIsClientSite] = useState(true);
  const [requested, setRequested] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function runCrawl(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setReport(null);
    setRequested(false);
    setActiveIssue(null);
    setFilterText("");
    if (!url.trim()) {
      setError("Enter a website URL to crawl.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/seo-spider", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url, maxPages: 75 }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Could not crawl that site. Try another URL.");
      else setReport(data as SpiderReport);
    } catch {
      setError("Could not crawl that site. Check the URL and try again.");
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
            subject: `New SEO Spider lead: ${email} (${report.health}/100)`,
            from_name: "rankday SEO Spider",
            email,
            replyto: email,
            message: `Email: ${email}\nCrawled: ${report.url}\nHealth: ${report.health}/100\nPages crawled: ${report.stats.crawled}\nClient site: ${isClientSite ? "yes" : "no"}`,
            scanned_url: report.url,
            score: report.health,
            is_client_site: isClientSite,
          }),
        });
      } else {
        await fetch("/api/website-seo-lead", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, url: report.url, score: report.health, isClientSite }),
        });
      }
      setRequested(true);
    } catch {
      setRequested(true);
    } finally {
      setSubmitting(false);
    }
  }

  const activeIssueGroup = useMemo(
    () => (report && activeIssue ? report.issues.find((issue) => issue.id === activeIssue) || null : null),
    [report, activeIssue],
  );

  const rows = useMemo(() => {
    if (!report) return [];
    const issueSet = activeIssueGroup ? new Set(activeIssueGroup.urls) : null;
    const text = filterText.trim().toLowerCase();
    const filtered = report.urls.filter((row) => {
      if (issueSet && !issueSet.has(row.url)) return false;
      if (text && !row.url.toLowerCase().includes(text) && !row.title.toLowerCase().includes(text)) return false;
      return true;
    });
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = sortValue(a, sortKey);
      const bv = sortValue(b, sortKey);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [report, activeIssueGroup, filterText, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "url" || key === "title" ? "asc" : "desc");
    }
  }

  return (
    <section className="section" style={{ paddingTop: 8 }}>
      <div className="container" style={{ maxWidth: 1180 }}>
        <form
          onSubmit={runCrawl}
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
            {loading ? "Crawling..." : "Crawl this site"}
          </button>
        </form>

        <p style={{ margin: "12px 0 0", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
          Crawls up to 75 internal pages by following links and the sitemap. No login, no credit card.
        </p>

        {error ? <p style={{ marginTop: 16, textAlign: "center", color: "#dc2626", fontWeight: 700 }}>{error}</p> : null}

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
              <ScoreDial score={report.health} rating={report.rating} />
              <div>
                <p className="kicker" style={{ color: "rgba(255,255,255,0.62)" }}>
                  SEO Spider crawl for {report.domain}
                </p>
                <h2 className="h1" style={{ color: "#fff", marginTop: 10 }}>
                  {report.rating}: {report.issues.length} issue type{report.issues.length === 1 ? "" : "s"} found
                </h2>
                <p style={{ color: "rgba(255,255,255,0.74)", fontSize: 16, lineHeight: 1.6, margin: "12px 0 0" }}>
                  Crawled {report.stats.crawled} URLs
                  {report.stats.notCrawled > 0 ? ` (${report.stats.notCrawled} more discovered, not crawled)` : ""}.{" "}
                  {report.stats.indexable} indexable, average response {report.stats.avgResponseMs} ms.
                  {report.stats.crawlComplete ? "" : " Crawl stopped at the page limit."}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
                  {(["2xx", "3xx", "4xx", "5xx"] as const).map((code) => (
                    <span key={code} style={codePill(CODE_COLORS[code])}>
                      {report.stats.responseCodes[code]} {code}
                    </span>
                  ))}
                  <button type="button" onClick={() => downloadReport(report)} className="btn btn-light btn-sm">
                    Download HTML report
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 14 }}>
              <StatTile label="URLs crawled" value={String(report.stats.crawled)} />
              <StatTile label="Indexable" value={`${report.stats.indexable}/${report.stats.crawled}`} />
              <StatTile label="Broken (4xx/5xx)" value={String(report.stats.responseCodes["4xx"] + report.stats.responseCodes["5xx"])} />
              <StatTile label="Redirects (3xx)" value={String(report.stats.responseCodes["3xx"])} />
              <StatTile label="Avg response" value={`${report.stats.avgResponseMs} ms`} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 16, marginTop: 16 }}>
              <div className="card" style={{ padding: 24, minWidth: 0 }}>
                <p className="kicker">Issues</p>
                <h2 className="h1" style={{ fontSize: 24, marginTop: 8 }}>
                  What the crawl found.
                </h2>
                <p style={{ color: "var(--muted)", fontSize: 13, margin: "6px 0 12px" }}>
                  Select an issue to filter the URL table below.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveIssue(null)}
                  style={issueRowStyle(!activeIssue)}
                >
                  <span style={{ fontWeight: 800, color: "var(--ink)" }}>All crawled URLs</span>
                  <span style={{ color: "var(--muted)", fontWeight: 800 }}>{report.stats.crawled}</span>
                </button>
                {report.issues.length ? (
                  report.issues.map((issue) => (
                    <button
                      key={issue.id}
                      type="button"
                      onClick={() => setActiveIssue(issue.id === activeIssue ? null : issue.id)}
                      style={issueRowStyle(issue.id === activeIssue)}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                        <span style={{ width: 9, height: 9, borderRadius: 99, background: SEVERITY_COLORS[issue.severity], flexShrink: 0 }} />
                        <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          <span style={{ color: "var(--muted)", fontSize: 11, fontWeight: 800, textTransform: "uppercase" }}>{issue.category}</span>
                          <br />
                          <span style={{ fontWeight: 700, color: "var(--ink)" }}>{issue.label}</span>
                        </span>
                      </span>
                      <span style={{ color: SEVERITY_COLORS[issue.severity], fontWeight: 900 }}>{issue.count}</span>
                    </button>
                  ))
                ) : (
                  <p style={{ color: "var(--muted)" }}>No issues detected in the crawl.</p>
                )}
              </div>

              <aside style={{ minWidth: 0 }}>
                {activeIssueGroup ? (
                  <div className="card" style={{ padding: 24 }}>
                    <span
                      style={{
                        display: "inline-block",
                        borderRadius: 99,
                        padding: "5px 9px",
                        background: SEVERITY_COLORS[activeIssueGroup.severity],
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 800,
                        textTransform: "uppercase",
                      }}
                    >
                      {activeIssueGroup.severity}
                    </span>
                    <h2 className="h1" style={{ fontSize: 22, marginTop: 12 }}>
                      {activeIssueGroup.label}
                    </h2>
                    <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.5, marginTop: 8 }}>{activeIssueGroup.detail}</p>
                    <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.5, marginTop: 8 }}>
                      <strong style={{ color: "var(--ink)" }}>Fix:</strong> {activeIssueGroup.fix}
                    </p>
                    <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>
                      Affects {activeIssueGroup.count} URL{activeIssueGroup.count === 1 ? "" : "s"} — shown in the table below.
                    </p>
                  </div>
                ) : (
                  <div className="card card-pink" style={{ padding: 24 }}>
                    {requested ? (
                      <>
                        <p style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)", margin: 0 }}>Request received.</p>
                        <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "8px 0 0", lineHeight: 1.5 }}>
                          rankday has the URL, score, and contact email for a manual follow-up.
                        </p>
                      </>
                    ) : (
                      <>
                        <p style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)", margin: 0 }}>Want rankday to fix these?</p>
                        <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "8px 0 0" }}>
                          Send the URL and we&apos;ll turn this crawl into a prioritized action plan.
                        </p>
                        <form onSubmit={requestReview} style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            aria-label="Your email"
                            style={{ flex: "1 1 220px", minWidth: 0, padding: "14px 16px", borderRadius: 10, border: "1px solid var(--hairline)" }}
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
                )}

                <div data-reveal className="band-purple r-band" style={{ marginTop: 16, padding: 28 }}>
                  <h2 className="h1" style={{ color: "#fff", fontSize: 26 }}>
                    Want this fixed in <span className="serif">90 days?</span>
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                    rankday fixes the technical foundations and gets you ready for Google and AI search.
                  </p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                    Start your 90 days
                  </a>
                </div>
              </aside>
            </div>

            <div className="card" style={{ padding: 24, marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <p className="kicker">Crawl data</p>
                  <h2 className="h1" style={{ fontSize: 24, marginTop: 8 }}>
                    {activeIssueGroup ? activeIssueGroup.label : "Every crawled URL"}
                  </h2>
                </div>
                <input
                  type="text"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Filter by URL or title"
                  aria-label="Filter URLs"
                  style={{ flex: "0 1 280px", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--hairline)", fontSize: 14 }}
                />
              </div>
              <div style={{ overflowX: "auto", marginTop: 14 }}>
                <table style={{ width: "100%", minWidth: 940, borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      <Th label="URL" k="url" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} align="left" />
                      <Th label="Status" k="status" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      <th style={thStyle("left")}>Indexability</th>
                      <Th label="Title" k="title" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} align="left" />
                      <Th label="Meta" k="descLength" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      <Th label="Words" k="wordCount" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      <Th label="Depth" k="depth" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      <Th label="Inlinks" k="inlinks" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <GridRow key={row.url} row={row} />
                    ))}
                  </tbody>
                </table>
                {rows.length === 0 ? (
                  <p style={{ color: "var(--muted)", marginTop: 14, textAlign: "center" }}>No URLs match this filter.</p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function GridRow({ row }: { row: CrawledUrl }) {
  const path = pathFor(row.url);
  return (
    <tr style={{ borderTop: "1px solid var(--hairline)" }}>
      <td style={{ ...tdStyle, maxWidth: 320 }}>
        <span title={row.url} style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--ink)", fontWeight: 700 }}>
          {path}
        </span>
      </td>
      <td style={{ ...tdStyle, textAlign: "center" }}>
        <span style={{ color: statusColor(row.status), fontWeight: 800 }}>{row.status || "—"}</span>
      </td>
      <td style={tdStyle}>
        <span style={{ color: row.indexable ? "#16a34a" : "#dc2626", fontWeight: 700 }}>{row.indexabilityReason}</span>
      </td>
      <td style={{ ...tdStyle, maxWidth: 280 }}>
        <span title={row.title} style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {row.title || <em style={{ color: "#dc2626" }}>missing</em>}
        </span>
        {row.title ? <span style={{ color: "var(--muted)", fontSize: 11 }}>{row.titleLength} chars</span> : null}
      </td>
      <td style={{ ...tdStyle, textAlign: "center" }}>{row.metaDescription ? row.descLength : <em style={{ color: "#d97706" }}>0</em>}</td>
      <td style={{ ...tdStyle, textAlign: "center" }}>{row.wordCount}</td>
      <td style={{ ...tdStyle, textAlign: "center" }}>{row.depth}</td>
      <td style={{ ...tdStyle, textAlign: "center" }}>{row.inlinks}</td>
    </tr>
  );
}

function Th({
  label,
  k,
  sortKey,
  sortDir,
  onSort,
  align = "center",
}: {
  label: string;
  k: SortKey;
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  onSort: (k: SortKey) => void;
  align?: "left" | "center";
}) {
  const active = k === sortKey;
  return (
    <th style={thStyle(align)}>
      <button
        type="button"
        onClick={() => onSort(k)}
        style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", color: active ? "var(--ink)" : "var(--muted)", fontWeight: 800, padding: 0 }}
      >
        {label}
        {active ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
      </button>
    </th>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
      <strong style={{ display: "block", marginTop: 10, fontSize: 28, color: "var(--ink)" }}>{value}</strong>
    </div>
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
      <div style={{ width: 142, height: 142, borderRadius: "50%", background: "var(--ink)", display: "grid", placeItems: "center", textAlign: "center", color: "#fff" }}>
        <div>
          <strong style={{ display: "block", fontSize: 46, lineHeight: 1 }}>{score}</strong>
          <span style={{ color: "rgba(255,255,255,0.66)", fontSize: 13 }}>{rating}</span>
        </div>
      </div>
    </div>
  );
}

const thStyle = (align: "left" | "center"): React.CSSProperties => ({
  textAlign: align,
  padding: "0 10px 10px",
  color: "var(--muted)",
  fontSize: 12,
  fontWeight: 800,
  whiteSpace: "nowrap",
});

const tdStyle: React.CSSProperties = { padding: "11px 10px", color: "var(--ink-2)", verticalAlign: "top" };

function issueRowStyle(active: boolean): React.CSSProperties {
  return {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    textAlign: "left",
    padding: "10px 12px",
    marginTop: 8,
    borderRadius: 10,
    border: "1px solid var(--hairline)",
    background: active ? "var(--purple-tint, #f1edff)" : "#fff",
    cursor: "pointer",
    font: "inherit",
  };
}

function codePill(color: string): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    border: `1px solid ${color}`,
    color,
    borderRadius: 99,
    padding: "7px 12px",
    fontSize: 13,
    fontWeight: 800,
    background: "rgba(255,255,255,0.06)",
  };
}

function statusColor(status: number): string {
  if (status >= 200 && status < 300) return "#16a34a";
  if (status >= 300 && status < 400) return "#d97706";
  if (status === 0) return "#64748b";
  return "#dc2626";
}

function sortValue(row: CrawledUrl, key: SortKey): string | number {
  switch (key) {
    case "url":
      return row.url;
    case "title":
      return row.title.toLowerCase();
    case "status":
      return row.status;
    case "descLength":
      return row.descLength;
    case "wordCount":
      return row.wordCount;
    case "depth":
      return row.depth;
    case "inlinks":
      return row.inlinks;
  }
}

function pathFor(url: string): string {
  try {
    const u = new URL(url);
    return (u.pathname + u.search) || "/";
  } catch {
    return url;
  }
}

// Builds a self-contained, styled HTML file and triggers a download.
function downloadReport(report: SpiderReport) {
  const html = buildReportHtml(report);
  const blob = new Blob([html], { type: "text/html" });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = `seo-spider-${report.domain}-${report.generatedAt.slice(0, 10)}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

function buildReportHtml(report: SpiderReport): string {
  const codes = report.stats.responseCodes;
  const issueRows = report.issues
    .map(
      (issue) =>
        `<tr><td><span class="dot" style="background:${SEVERITY_COLORS[issue.severity]}"></span>${esc(issue.severity)}</td><td>${esc(issue.category)}</td><td>${esc(issue.label)}</td><td class="num">${issue.count}</td><td>${esc(issue.fix)}</td></tr>`,
    )
    .join("");
  const urlRows = report.urls
    .map(
      (row) =>
        `<tr><td>${esc(row.url)}</td><td class="num" style="color:${statusColor(row.status)}">${row.status || "—"}</td><td>${esc(row.indexabilityReason)}</td><td>${esc(row.title) || '<em style="color:#dc2626">missing</em>'}</td><td class="num">${row.descLength}</td><td class="num">${row.wordCount}</td><td class="num">${row.depth}</td><td class="num">${row.inlinks}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>SEO Spider report — ${esc(report.domain)}</title>
<style>
  :root{color-scheme:light}
  *{box-sizing:border-box}
  body{font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#0f172a;margin:0;background:#f8fafc}
  .wrap{max-width:1100px;margin:0 auto;padding:40px 20px}
  header{background:#0f172a;color:#fff;border-radius:16px;padding:32px}
  h1{font-size:26px;margin:0 0 4px}
  .sub{color:#94a3b8;margin:0}
  .score{font-size:54px;font-weight:800;margin:14px 0 0}
  .chips{margin-top:14px}
  .chip{display:inline-block;border:1px solid #334155;border-radius:99px;padding:5px 12px;margin:0 6px 6px 0;font-weight:700;font-size:13px}
  h2{font-size:19px;margin:34px 0 12px}
  table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;font-size:13px;box-shadow:0 1px 2px rgba(0,0,0,.05)}
  th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #e2e8f0;vertical-align:top}
  th{background:#f1f5f9;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#475569}
  td.num,th.num{text-align:right;white-space:nowrap}
  .dot{display:inline-block;width:9px;height:9px;border-radius:99px;margin-right:6px;vertical-align:middle}
  footer{color:#94a3b8;font-size:12px;margin-top:24px}
  td:first-child{word-break:break-all}
</style></head><body><div class="wrap">
<header>
  <p class="sub">SEO Spider crawl — rank-day.com</p>
  <h1>${esc(report.domain)}</h1>
  <div class="score">${report.health}<span style="font-size:18px;color:#94a3b8"> / 100 · ${esc(report.rating)}</span></div>
  <p class="sub" style="margin-top:10px">Crawled ${report.stats.crawled} URLs${report.stats.notCrawled ? ` (${report.stats.notCrawled} more discovered)` : ""} · avg ${report.stats.avgResponseMs} ms · ${new Date(report.generatedAt).toUTCString()}</p>
  <div class="chips">
    <span class="chip">${codes["2xx"]} 2xx</span>
    <span class="chip">${codes["3xx"]} 3xx</span>
    <span class="chip">${codes["4xx"]} 4xx</span>
    <span class="chip">${codes["5xx"]} 5xx</span>
    <span class="chip">${report.stats.indexable} indexable</span>
  </div>
</header>
<h2>Issues (${report.issues.length})</h2>
<table><thead><tr><th>Severity</th><th>Category</th><th>Issue</th><th class="num">URLs</th><th>Recommended fix</th></tr></thead>
<tbody>${issueRows || '<tr><td colspan="5">No issues detected.</td></tr>'}</tbody></table>
<h2>Crawled URLs (${report.urls.length})</h2>
<table><thead><tr><th>URL</th><th class="num">Status</th><th>Indexability</th><th>Title</th><th class="num">Meta</th><th class="num">Words</th><th class="num">Depth</th><th class="num">Inlinks</th></tr></thead>
<tbody>${urlRows}</tbody></table>
<footer>Generated by the rank-day.com SEO Spider · https://www.rank-day.com/tools/seo-spider</footer>
</div></body></html>`;
}

function esc(value: string): string {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
