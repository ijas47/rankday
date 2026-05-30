"use client";

import { useState } from "react";

const CALENDLY = "https://calendly.com/ijas-rank-day/30min";

type Result = {
  url: string;
  domain: string;
  siteName: string;
  pageCount: number;
  source: "sitemap" | "crawl";
  llmsTxt: string;
};

export function LlmsClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setCopied(false);
    setSent(false);
    if (!url.trim()) {
      setError("Enter a URL.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/llms-txt", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong. Try again.");
      else setResult(data as Result);
    } catch {
      setError("Couldn't generate. Check the URL and try again.");
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    if (!result) return;
    navigator.clipboard.writeText(result.llmsTxt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function download() {
    if (!result) return;
    const blob = new Blob([result.llmsTxt], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "llms.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function capture(e: React.FormEvent) {
    e.preventDefault();
    try {
      const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (web3Key) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `llms.txt tool lead: ${email}`,
            from_name: "Rankday llms.txt tool",
            email,
            message: `Email: ${email}\nGenerated for: ${result?.url || ""}\nSource: llms-txt-tool`,
            scanned_url: result?.url || "",
            source: "llms-txt-tool",
          }),
        });
      } else {
        await fetch("/api/aeo-lead", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, url: result?.url, isOwnSite: true }),
        });
      }
      setSent(true);
    } catch {
      setSent(true);
    }
  }

  return (
    <section className="section" style={{ paddingTop: 8 }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <form onSubmit={generate} data-reveal style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourwebsite.com"
            aria-label="Website URL"
            style={{ flex: "1 1 320px", minWidth: 0, padding: "16px 20px", fontSize: 16, borderRadius: 12, border: "1px solid var(--hairline)", background: "#fff", color: "var(--ink)" }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flexShrink: 0 }}>
            {loading ? "Generating…" : "Generate llms.txt"}
          </button>
        </form>

        {error ? <p style={{ marginTop: 16, textAlign: "center", color: "#dc2626", fontWeight: 600 }}>{error}</p> : null}

        {result ? (
          <div style={{ marginTop: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <p className="kicker">
                llms.txt for {result.domain} · {result.pageCount} pages · via {result.source}
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={copy} className="btn btn-light btn-sm">{copied ? "Copied" : "Copy"}</button>
                <button onClick={download} className="btn btn-primary btn-sm">Download</button>
              </div>
            </div>

            <pre
              style={{
                marginTop: 14, padding: 24, background: "var(--ink)", color: "#e5e7eb", borderRadius: 14,
                fontSize: 13, lineHeight: 1.6, overflowX: "auto", maxHeight: 520, fontFamily: "var(--mono, monospace)", whiteSpace: "pre-wrap",
              }}
            >
              {result.llmsTxt}
            </pre>

            <p style={{ marginTop: 14, fontSize: 14, color: "var(--muted)" }}>
              Upload this to your site root so it is reachable at {result.domain}/llms.txt. Review it first and trim anything that does not belong.
            </p>

            {/* soft, optional lead capture */}
            <div className="card card-ink" style={{ padding: 28, marginTop: 20 }}>
              {sent ? (
                <p style={{ color: "#fff", fontSize: 16, fontWeight: 600, margin: 0 }}>Thanks. We will be in touch.</p>
              ) : (
                <>
                  <p style={{ color: "#fff", fontSize: 17, fontWeight: 700, margin: 0 }}>
                    Want your full AI-visibility score and the rest of the fixes?
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 14, margin: "6px 0 0" }}>
                    llms.txt is one signal. We will run a full check and send it over. Optional.
                  </p>
                  <form onSubmit={capture} style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <input
                      type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com" aria-label="Your email"
                      style={{ flex: "1 1 260px", minWidth: 0, padding: "14px 18px", fontSize: 15, borderRadius: 10, border: "none" }}
                    />
                    <button type="submit" className="btn btn-light" style={{ flexShrink: 0 }}>Send it over</button>
                  </form>
                </>
              )}
            </div>

            {/* cross-link to the AEO Score tool */}
            <div data-reveal className="band-purple r-band" style={{ marginTop: 24 }}>
              <h2 className="h1" style={{ color: "#fff" }}>
                See your full <span className="serif">AI-visibility score.</span>
              </h2>
              <a href="/tools/aeo-score" className="btn btn-light">Run the free AEO check</a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
