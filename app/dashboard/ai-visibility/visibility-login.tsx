"use client";

import { useState } from "react";

export function AiVisibilityLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projectId, setProjectId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai-visibility/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed.");
      window.location.href = projectId.trim() ? `/dashboard/ai-visibility/${projectId.trim()}` : "/dashboard/ai-visibility/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section" style={{ paddingTop: 48 }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="card" style={{ padding: "clamp(28px, 5vw, 52px)" }}>
          <p className="kicker">rankday client dashboard</p>
          <h1 className="h-display" style={{ fontSize: "clamp(34px, 5vw, 58px)", marginTop: 14 }}>
            AI visibility tracking.
          </h1>
          <p className="lede" style={{ marginTop: 16 }}>
            Sign in with your client access and open the project link rankday shared with you.
          </p>

          <form onSubmit={login} style={{ display: "grid", gap: 12, marginTop: 26 }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email"
              style={inputStyle}
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              aria-label="Password"
              style={inputStyle}
            />
            <input
              type="text"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="Project ID"
              aria-label="Project ID"
              style={inputStyle}
            />
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ justifyContent: "center" }}>
              {loading ? "Signing in..." : "Open dashboard"}
            </button>
          </form>
          {error ? <p style={{ color: "#dc2626", fontWeight: 700, marginTop: 14 }}>{error}</p> : null}
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  minWidth: 0,
  padding: "15px 16px",
  borderRadius: 10,
  border: "1px solid var(--hairline)",
  color: "var(--ink)",
  background: "#fff",
  fontSize: 15,
};
