"use client";

import { useEffect, useMemo, useState } from "react";
import type { AiVisibilitySummary } from "@/lib/ai-visibility/types";

export function AiVisibilityDashboard({ projectId }: { projectId: string }) {
  const [summary, setSummary] = useState<AiVisibilitySummary | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/ai-visibility/project/${projectId}`, { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load project.");
        if (active) setSummary(data as AiVisibilitySummary);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Could not load project.");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [projectId]);

  const latestDate = useMemo(() => {
    if (!summary?.latestRun?.started_at) return "No run yet";
    return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(summary.latestRun.started_at));
  }, [summary]);

  if (loading) return <Shell><p className="lede">Loading AI visibility report...</p></Shell>;
  if (error) return <Shell><ErrorCard error={error} /></Shell>;
  if (!summary) return <Shell><ErrorCard error="No report available." /></Shell>;

  return (
    <Shell>
      <div className="card card-ink" style={{ padding: "clamp(26px, 5vw, 48px)" }}>
        <p className="kicker" style={{ color: "rgba(255,255,255,0.62)" }}>
          {summary.project.market} - weekly AI visibility
        </p>
        <h1 className="h-display" style={{ color: "#fff", fontSize: "clamp(34px, 5vw, 64px)", marginTop: 12 }}>
          {summary.project.brand_name}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.74)", margin: "14px 0 0", lineHeight: 1.6 }}>
          Latest run: {latestDate}. Tracking {summary.prompts.length} prompts against {summary.competitors.length} competitors across OpenAI, Perplexity, and Gemini.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14, marginTop: 16 }}>
        <MetricCard label="Visibility" value={`${summary.metrics.visibility}%`} detail="Prompts where brand appears" />
        <MetricCard label="Avg position" value={summary.metrics.averagePosition ? `#${summary.metrics.averagePosition}` : "N/A"} detail="Among mentioned brands" />
        <MetricCard label="Sentiment" value={summary.metrics.averageSentiment ? `${summary.metrics.averageSentiment}/100` : "N/A"} detail="Brand context score" />
        <MetricCard label="Sources" value={String(summary.metrics.topSources.length)} detail="Cited domains tracked" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 16, marginTop: 16 }}>
        <Panel title="Share of voice">
          {summary.metrics.shareOfVoice.length ? summary.metrics.shareOfVoice.map((item) => (
            <Bar key={`${item.kind}-${item.brand}`} label={item.brand} value={item.percent} muted={item.kind !== "project"} />
          )) : <Muted>No mentions yet.</Muted>}
        </Panel>

        <Panel title="Provider coverage">
          {summary.metrics.providerCoverage.map((item) => (
            <Bar key={item.provider} label={item.provider} value={item.visibility} detail={`${item.results} results`} />
          ))}
        </Panel>

        <Panel title="Top sources">
          {summary.metrics.topSources.length ? summary.metrics.topSources.slice(0, 8).map((item) => (
            <p key={item.domain} style={rowText}><strong>{item.domain}</strong><span>{item.count}</span></p>
          )) : <Muted>No cited domains yet.</Muted>}
        </Panel>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 16, marginTop: 16 }}>
        <Panel title="Recommended actions">
          {summary.recommendations.map((item) => (
            <div key={`${item.title}-${item.created_at || ""}`} style={{ borderTop: "1px solid var(--hairline)", padding: "14px 0" }}>
              <span style={{ ...pill, background: priorityColor(item.priority) }}>{item.priority}</span>
              <h3 style={{ margin: "9px 0 0", color: "var(--ink)", fontSize: 16 }}>{item.title}</h3>
              <p style={{ margin: "6px 0 0", color: "var(--muted)", lineHeight: 1.5 }}>{item.detail}</p>
              <p style={{ margin: "6px 0 0", color: "var(--ink-2)", lineHeight: 1.5 }}>{item.action}</p>
            </div>
          ))}
        </Panel>

        <Panel title="Recent AI answers">
          {summary.recentResults.slice(0, 8).map((result) => (
            <div key={result.id} style={{ borderTop: "1px solid var(--hairline)", padding: "14px 0" }}>
              <p style={{ margin: 0, color: "var(--ink)", fontWeight: 800 }}>{result.provider}</p>
              <p style={{ margin: "5px 0 0", color: "var(--muted)", fontSize: 13, lineHeight: 1.45 }}>{result.prompt_text}</p>
              <p style={{ margin: "8px 0 0", color: result.error ? "#dc2626" : "var(--ink-2)", fontSize: 14, lineHeight: 1.5 }}>
                {result.error || result.response_text.slice(0, 260) || "No response text stored."}
              </p>
            </div>
          ))}
        </Panel>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="section" style={{ paddingTop: 32 }}>
      <div className="container" style={{ maxWidth: 1180 }}>{children}</div>
    </section>
  );
}

function ErrorCard({ error }: { error: string }) {
  return <div className="card" style={{ padding: 32 }}><p style={{ color: "#dc2626", fontWeight: 800 }}>{error}</p></div>;
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="card" style={{ padding: 22 }}>
      <p className="kicker">{label}</p>
      <strong style={{ display: "block", color: "var(--ink)", fontSize: 34, marginTop: 8 }}>{value}</strong>
      <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 13 }}>{detail}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="card" style={{ padding: 24, minWidth: 0 }}><h2 style={{ margin: 0, color: "var(--ink)", fontSize: 22 }}>{title}</h2><div style={{ marginTop: 12 }}>{children}</div></div>;
}

function Bar({ label, value, muted = false, detail }: { label: string; value: number; muted?: boolean; detail?: string }) {
  return (
    <div style={{ borderTop: "1px solid var(--hairline)", padding: "12px 0" }}>
      <p style={{ ...rowText, color: muted ? "var(--muted)" : "var(--ink)" }}><strong>{label}</strong><span>{detail || `${value}%`}</span></p>
      <div style={{ height: 8, borderRadius: 99, background: "var(--hairline)", overflow: "hidden", marginTop: 8 }}>
        <div style={{ width: `${Math.max(0, Math.min(100, value))}%`, height: "100%", background: muted ? "#94a3b8" : "var(--purple)" }} />
      </div>
    </div>
  );
}

function Muted({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "var(--muted)", lineHeight: 1.5 }}>{children}</p>;
}

function priorityColor(priority: string) {
  if (priority === "high") return "#dc2626";
  if (priority === "medium") return "#d97706";
  return "#64748b";
}

const rowText: React.CSSProperties = {
  margin: 0,
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  color: "var(--ink)",
  fontSize: 14,
};

const pill: React.CSSProperties = {
  display: "inline-flex",
  borderRadius: 99,
  padding: "5px 9px",
  color: "#fff",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};
