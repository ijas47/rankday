"use client";

import { useMemo, useState } from "react";
import type { VisibilityReport } from "@/lib/ai-visibility-report";
import { trackLead } from "@/lib/track";

const FREE_PROMPT_COUNT = 5;
const FULL_PROMPT_COUNT = 20;
const AUDIT_PRICE_RANGE = "$149";
const WHATSAPP_BASE = "https://wa.me/971565981209";

const GRADE_COLOR: Record<string, string> = {
  A: "#16a34a",
  B: "#65a30d",
  C: "#d97706",
  D: "#ea580c",
  F: "#dc2626",
};

type CompetitorRow = { name: string; domain: string };

export function AiVisibilityReportClient() {
  const [brandName, setBrandName] = useState("");
  const [domain, setDomain] = useState("");
  const [industry, setIndustry] = useState("");
  const [market, setMarket] = useState("");
  const [competitors, setCompetitors] = useState<CompetitorRow[]>([
    { name: "", domain: "" },
    { name: "", domain: "" },
    { name: "", domain: "" },
  ]);
  const [customPrompt, setCustomPrompt] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<VisibilityReport | null>(null);

  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [auditRequested, setAuditRequested] = useState(false);

  const whatsappAudit = useMemo(() => {
    if (!report) return WHATSAPP_BASE;
    const text = encodeURIComponent(
      `Hi rankday — I want the full ${FULL_PROMPT_COUNT}-prompt AI Visibility Audit (${AUDIT_PRICE_RANGE}) for ${report.brandName} (${report.domain}). Readiness score: ${report.readiness.score ?? "n/a"}.`,
    );
    return `${WHATSAPP_BASE}?text=${text}`;
  }, [report]);

  const whatsapp90 = useMemo(() => {
    if (!report) return WHATSAPP_BASE;
    const text = encodeURIComponent(
      `Hi rankday — I want you to implement AI visibility for ${report.brandName} (${report.domain}) in the 90-day program.`,
    );
    return `${WHATSAPP_BASE}?text=${text}`;
  }, [report]);

  async function runReport(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setReport(null);
    setUnlocked(false);
    setAuditRequested(false);

    if (!brandName.trim() || !domain.trim() || !industry.trim()) {
      setError("Brand name, website, and industry are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ai-visibility-report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          brandName,
          domain,
          industry,
          market,
          competitors: competitors.filter((c) => c.name.trim()),
          customPrompts: customPrompt.trim() ? [customPrompt.trim()] : [],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
      } else {
        setReport(data as VisibilityReport);
      }
    } catch {
      setError("Couldn't build the report. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (!report) return;
    setSubmitting(true);

    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    const payload = {
      email,
      brandName: report.brandName,
      domain: report.domain,
      industry: report.industry,
      market: report.market,
      competitors: competitors
        .filter((c) => c.name.trim())
        .map((c) => c.name)
        .join(", "),
      visibility: report.readiness.score,
      grade: report.readiness.grade,
      intent: "unlock-sample" as const,
    };

    try {
      if (web3Key) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `AI Visibility Report lead: ${email} (${report.brandName})`,
            from_name: "rankday AI Visibility Report",
            email,
            replyto: email,
            message: [
              `Email: ${email}`,
              `Brand: ${report.brandName}`,
              `Domain: ${report.domain}`,
              `Industry: ${report.industry}`,
              `Market: ${report.market}`,
              `Readiness: ${report.readiness.score ?? "n/a"} / ${report.readiness.grade ?? "n/a"}`,
              `Competitors: ${payload.competitors || "none"}`,
              `Intent: unlock-sample (zero-cost free tool)`,
            ].join("\n"),
          }),
        });
      } else {
        await fetch("/api/ai-visibility-report-lead", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      trackLead("ai-visibility-report");
      setUnlocked(true);
    } catch {
      setUnlocked(true);
    } finally {
      setSubmitting(false);
    }
  }

  async function requestFullAudit() {
    if (!report || !email.trim()) {
      setError("Enter your email (unlock the free plan first) to request the full audit.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/ai-visibility-report-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          brandName: report.brandName,
          domain: report.domain,
          industry: report.industry,
          market: report.market,
          competitors: competitors
            .filter((c) => c.name.trim())
            .map((c) => c.name)
            .join(", "),
          visibility: report.readiness.score,
          grade: report.readiness.grade,
          intent: "request-full-audit",
          notes: `Requested full ${FULL_PROMPT_COUNT}-prompt live-engine audit at ${AUDIT_PRICE_RANGE}`,
        }),
      });
      trackLead("ai-visibility-report-full-audit");
      setAuditRequested(true);
      setUnlocked(true);
    } catch {
      setAuditRequested(true);
    } finally {
      setSubmitting(false);
    }
  }

  const previewPrompts = report?.prompts.filter((p) => p.preview) || [];
  const lockedPrompts = report?.prompts.filter((p) => !p.preview) || [];
  const previewFixes = report ? report.fixes.slice(0, 2) : [];
  const lockedFixes = report ? report.fixes.slice(2) : [];

  return (
    <section className="section" style={{ paddingTop: 8 }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <form onSubmit={runReport} data-reveal className="card" style={{ padding: 28, display: "grid", gap: 14 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: 12,
            }}
          >
            <Field label="Brand name" required>
              <input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Acme Dental" required style={inputStyle} />
            </Field>
            <Field label="Website" required>
              <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="acmedental.com" required style={inputStyle} />
            </Field>
            <Field label="Industry / category" required>
              <input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="dentist, CRM software, plumber…"
                required
                style={inputStyle}
              />
            </Field>
            <Field label="Market / city">
              <input value={market} onChange={(e) => setMarket(e.target.value)} placeholder="Dubai, London, US…" style={inputStyle} />
            </Field>
          </div>

          <div>
            <p style={{ margin: "4px 0 10px", fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
              Competitors <span style={{ fontWeight: 500, color: "var(--muted)" }}>(optional, up to 3)</span>
            </p>
            <div style={{ display: "grid", gap: 8 }}>
              {competitors.map((row, index) => (
                <div key={index} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 8 }}>
                  <input
                    value={row.name}
                    onChange={(e) => {
                      const next = [...competitors];
                      next[index] = { ...next[index], name: e.target.value };
                      setCompetitors(next);
                    }}
                    placeholder={`Competitor ${index + 1} name`}
                    style={inputStyle}
                  />
                  <input
                    value={row.domain}
                    onChange={(e) => {
                      const next = [...competitors];
                      next[index] = { ...next[index], domain: e.target.value };
                      setCompetitors(next);
                    }}
                    placeholder="domain.com"
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
          </div>

          <Field label="One custom buyer prompt (optional)">
            <input
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Best emergency plumber in Dubai Marina with same-day service"
              style={inputStyle}
            />
          </Field>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", maxWidth: 520 }}>
              Free forever, zero AI API cost: {FULL_PROMPT_COUNT} buyer prompts, site readiness signals, and 5 fixes.
              Live ChatGPT / Perplexity / Gemini mention checks are only in the {AUDIT_PRICE_RANGE} audit.
            </p>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Building report…" : "Get free report"}
            </button>
          </div>
        </form>

        {error ? (
          <p style={{ marginTop: 16, textAlign: "center", color: "#dc2626", fontWeight: 600 }}>{error}</p>
        ) : null}

        {loading ? (
          <div className="card" style={{ marginTop: 24, padding: 28, textAlign: "center" }}>
            <p style={{ margin: 0, fontWeight: 700, color: "var(--ink)" }}>Building your free plan…</p>
            <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 14 }}>
              Generating buyer prompts and checking free site signals. No paid AI APIs are called.
            </p>
          </div>
        ) : null}

        {report ? (
          <div style={{ marginTop: 36 }}>
            <div className="card" style={{ padding: 32, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              <div
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: 99,
                  background: report.readiness.grade
                    ? GRADE_COLOR[report.readiness.grade] || "#d97706"
                    : "var(--ink)",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {report.readiness.score != null ? (
                  <>
                    <span style={{ fontSize: 34, fontWeight: 800, lineHeight: 1 }}>{report.readiness.score}</span>
                    <span style={{ fontSize: 12, opacity: 0.85 }}>/ 100</span>
                  </>
                ) : (
                  <span style={{ fontSize: 14, fontWeight: 800, textAlign: "center", padding: 8 }}>Plan ready</span>
                )}
              </div>
              <div style={{ flex: "1 1 260px" }}>
                <p className="kicker">
                  Free AI Visibility Report · {report.brandName}
                  {report.readiness.grade ? ` · Readiness ${report.readiness.grade}` : ""}
                </p>
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "var(--ink)",
                    margin: "6px 0 0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {report.summary.headline}
                </p>
                <p style={{ fontSize: 15, color: "var(--ink-2)", margin: "10px 0 0", lineHeight: 1.5 }}>
                  {report.summary.detail}
                </p>
                <p style={{ margin: "12px 0 0", fontSize: 12, fontWeight: 700, color: "var(--muted)" }}>
                  Cost model: {report.costModel} · free tools never call ChatGPT / Perplexity / Gemini APIs
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 10,
              }}
            >
              {[
                ["Buyer prompts", String(report.prompts.length)],
                ["Preview free", String(FREE_PROMPT_COUNT)],
                ["Readiness", report.readiness.score != null ? `${report.readiness.score}/100` : "—"],
                ["Live AI checks", `Paid ${AUDIT_PRICE_RANGE}`],
              ].map(([label, value]) => (
                <div key={label} className="card" style={{ padding: "14px 16px" }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "var(--muted)" }}>{label}</p>
                  <strong style={{ display: "block", marginTop: 6, fontSize: 18, color: "var(--ink)" }}>{value}</strong>
                </div>
              ))}
            </div>

            {/* Honesty banner */}
            <div className="card" style={{ marginTop: 14, padding: 20, background: "var(--mint)", borderColor: "transparent" }}>
              <p style={{ margin: 0, fontWeight: 800, color: "var(--ink)" }}>What free includes vs what costs money</p>
              <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5 }}>
                <strong>Free:</strong> {report.nextSteps.free}
                <br />
                <strong>Paid audit:</strong> {report.nextSteps.paidAudit}
              </p>
            </div>

            {/* Readiness gaps */}
            {report.readiness.checks.length > 0 ? (
              <div style={{ marginTop: 28 }}>
                <h2 className="h1" style={{ fontSize: 24 }}>
                  Site readiness gaps (free HTTP check)
                </h2>
                <p className="body" style={{ marginTop: 8 }}>
                  Same cost class as our AEO Score — we fetch your pages/robots. No model spend.
                </p>
                {report.readiness.checks.slice(0, unlocked ? 8 : 3).map((check) => (
                  <div key={check.label} className="card" style={{ padding: 18, marginTop: 10 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 99,
                          background: check.severity === "high" ? "#dc2626" : check.severity === "medium" ? "#d97706" : "#9ca3af",
                        }}
                      />
                      <strong style={{ color: "var(--ink)" }}>{check.label}</strong>
                      <span style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", fontWeight: 700 }}>
                        {check.severity}
                      </span>
                    </div>
                    <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--ink-2)" }}>{check.fix}</p>
                  </div>
                ))}
                {!unlocked && report.readiness.checks.length > 3 ? (
                  <p style={{ marginTop: 10, fontSize: 13, color: "var(--muted)" }}>
                    +{report.readiness.checks.length - 3} more gaps after email unlock.
                  </p>
                ) : null}
              </div>
            ) : null}

            {/* Prompt plan */}
            <div style={{ marginTop: 28 }}>
              <h2 className="h1" style={{ fontSize: 24 }}>
                Your {report.prompts.length}-prompt buyer plan
              </h2>
              <p className="body" style={{ marginTop: 8 }}>
                These are the questions AI buyers ask. Free shows {FREE_PROMPT_COUNT}; unlock the rest with email.
                Copy any prompt into ChatGPT yourself if you want a manual spot-check — we do not run paid APIs on free traffic.
              </p>

              {previewPrompts.map((prompt, index) => (
                <PromptRow key={prompt.promptText} prompt={prompt} index={index + 1} />
              ))}

              {lockedPrompts.length > 0 && !unlocked ? (
                <EmailGate
                  email={email}
                  setEmail={setEmail}
                  submitting={submitting}
                  onSubmit={unlock}
                  title={`Unlock all ${FULL_PROMPT_COUNT} prompts + remaining fixes`}
                  subtitle="Email unlocks the full free plan. No spam. Live multi-engine mention tracking stays in the paid audit so free tools stay free to run."
                />
              ) : null}

              {unlocked
                ? lockedPrompts.map((prompt, index) => (
                    <PromptRow key={prompt.promptText} prompt={prompt} index={index + FREE_PROMPT_COUNT + 1} />
                  ))
                : null}
            </div>

            {/* Fixes */}
            <div style={{ marginTop: 28 }}>
              <h2 className="h1" style={{ fontSize: 24 }}>
                5 concrete fixes
              </h2>
              <p className="body" style={{ marginTop: 8 }}>
                Ranked for impact. Free shows two; unlock for the full set.
              </p>

              {previewFixes.map((fix, i) => (
                <FixRow key={fix.title} fix={fix} index={i + 1} />
              ))}

              {lockedFixes.length > 0 && !unlocked ? (
                <EmailGate
                  email={email}
                  setEmail={setEmail}
                  submitting={submitting}
                  onSubmit={unlock}
                  title="Get all 5 fixes + full prompt list"
                  subtitle="Still free. Still zero AI API cost."
                />
              ) : null}

              {unlocked
                ? lockedFixes.map((fix, i) => <FixRow key={fix.title} fix={fix} index={i + 3} />)
                : null}
            </div>

            {/* Offer ladder */}
            <div
              style={{
                marginTop: 32,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: 14,
              }}
            >
              <div className="card card-mint" style={{ padding: 28 }}>
                <p className="kicker" style={{ margin: 0 }}>Free</p>
                <h3 style={{ margin: "8px 0 0", fontSize: 22, fontWeight: 800 }}>Prompt plan + readiness</h3>
                <p style={{ margin: "10px 0 0", color: "var(--ink-2)", fontSize: 14, lineHeight: 1.5 }}>
                  {FULL_PROMPT_COUNT} buyer prompts, free site signals, 5 fixes. No AI API keys. No cost centre.
                </p>
                <p style={{ margin: "16px 0 0", fontWeight: 800, color: "var(--ink)" }}>You just got this.</p>
              </div>

              <div className="card card-pink" style={{ padding: 28 }}>
                <p className="kicker" style={{ margin: 0 }}>One-off audit</p>
                <h3 style={{ margin: "8px 0 0", fontSize: 22, fontWeight: 800 }}>{AUDIT_PRICE_RANGE}</h3>
                <p style={{ margin: "10px 0 0", color: "var(--ink-2)", fontSize: 14, lineHeight: 1.5 }}>
                  We run the live ChatGPT / Perplexity / Gemini checks on your prompt set (controlled spend on paying
                  audits only). Mentions, competitors, citations, sentiment, prioritized actions. ~48h.
                </p>
                {auditRequested ? (
                  <p style={{ margin: "16px 0 0", fontWeight: 700, color: "var(--ink)" }}>
                    Request received. Confirm on WhatsApp to schedule and pay.
                  </p>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                    <button type="button" className="btn btn-primary btn-sm" disabled={submitting} onClick={requestFullAudit}>
                      Request full audit
                    </button>
                    <a href={whatsappAudit} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                      WhatsApp
                    </a>
                  </div>
                )}
              </div>

              <div className="card card-ink" style={{ padding: 28 }}>
                <p className="kicker" style={{ margin: 0, color: "rgba(255,255,255,0.62)" }}>Done-for-you</p>
                <h3 style={{ margin: "8px 0 0", fontSize: 22, fontWeight: 800, color: "#fff" }}>
                  We implement this in 90 days
                </h3>
                <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,0.78)", fontSize: 14, lineHeight: 1.5 }}>
                  {report.nextSteps.implement}
                </p>
                <a href={whatsapp90} target="_blank" rel="noopener noreferrer" className="btn btn-light btn-sm" style={{ marginTop: 16 }}>
                  Start your 90 days
                </a>
              </div>
            </div>

            <div data-reveal className="band-purple r-band" style={{ marginTop: 28 }}>
              <h2 className="h1" style={{ color: "#fff" }}>
                Free shows the map. <span className="serif">Paid proves the mentions.</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.82)", maxWidth: 560, margin: "8px 0 0" }}>
                We do not burn model budget on free traffic. When you are ready for live engine results — or full
                implementation — we run that on purpose.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
                <a href={whatsappAudit} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                  Book {AUDIT_PRICE_RANGE} audit
                </a>
                <a href={whatsapp90} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
                  We implement this in 90 days
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}

function EmailGate({
  email,
  setEmail,
  submitting,
  onSubmit,
  title,
  subtitle,
}: {
  email: string;
  setEmail: (v: string) => void;
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="card card-ink" style={{ padding: 28, marginTop: 16 }}>
      <p style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: 0 }}>{title}</p>
      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, margin: "8px 0 0" }}>{subtitle}</p>
      <form onSubmit={onSubmit} style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
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
          {submitting ? "Sending…" : "Unlock free plan"}
        </button>
      </form>
    </div>
  );
}

function PromptRow({
  prompt,
  index,
}: {
  prompt: VisibilityReport["prompts"][number];
  index: number;
}) {
  return (
    <div className="card" style={{ padding: 18, marginTop: 10 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "var(--muted)", minWidth: 28 }}>{index}</span>
        <div>
          <p style={{ margin: 0, fontWeight: 700, color: "var(--ink)", fontSize: 15 }}>{prompt.promptText}</p>
          <p style={{ margin: "6px 0 0", fontSize: 12, fontWeight: 700, color: "var(--muted)" }}>{prompt.topic}</p>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.45 }}>{prompt.whyItMatters}</p>
        </div>
      </div>
    </div>
  );
}

function FixRow({
  fix,
  index,
}: {
  fix: VisibilityReport["fixes"][number];
  index: number;
}) {
  const dot = fix.priority === "high" ? "#dc2626" : fix.priority === "medium" ? "#d97706" : "#9ca3af";
  return (
    <div className="card" style={{ padding: 22, marginTop: 12, display: "flex", gap: 14, alignItems: "flex-start" }}>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 99,
          background: "var(--hairline)",
          display: "grid",
          placeItems: "center",
          fontSize: 12,
          fontWeight: 800,
          color: "var(--ink)",
          flexShrink: 0,
        }}
      >
        {index}
      </span>
      <div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{fix.title}</h3>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: dot }} title={fix.priority} />
        </div>
        <p style={{ fontSize: 14, color: "var(--muted)", margin: "6px 0 0" }}>{fix.detail}</p>
        <p style={{ fontSize: 14, color: "var(--ink-2)", margin: "8px 0 0", lineHeight: 1.5 }}>
          <strong style={{ color: "var(--ink)" }}>Do this: </strong>
          {fix.action}
        </p>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontSize: 15,
  borderRadius: 12,
  border: "1px solid var(--hairline)",
  background: "#fff",
  color: "var(--ink)",
};
