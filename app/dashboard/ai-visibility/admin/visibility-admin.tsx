"use client";

import { useState } from "react";

export function AiVisibilityAdmin() {
  const [adminKey, setAdminKey] = useState("");
  const [brandName, setBrandName] = useState("rankday");
  const [domain, setDomain] = useState("rank-day.com");
  const [market, setMarket] = useState("UAE");
  const [memberUserIds, setMemberUserIds] = useState("");
  const [aliases, setAliases] = useState("rank-day\nrank day");
  const [competitors, setCompetitors] = useState("Competitor One, competitor-one.com, Competitor One\nCompetitor Two, competitor-two.com, Competitor Two");
  const [prompts, setPrompts] = useState("What are the best SEO agencies for AI search visibility in Dubai?\nWhich agencies help businesses get cited by ChatGPT and Perplexity?\nBest AEO agency for a local service business");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function createProject(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/ai-visibility/admin/projects", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-rankday-admin-key": adminKey,
        },
        body: JSON.stringify({
          organizationName: brandName,
          brandName,
          domain,
          market,
          aliases: lines(aliases),
          memberUserIds: lines(memberUserIds),
          competitors: lines(competitors).map((line) => {
            const [name, competitorDomain, ...rest] = line.split(",").map((item) => item.trim());
            return { name, domain: competitorDomain, aliases: rest };
          }),
          prompts: lines(prompts).map((promptText, index) => ({ promptText, topic: "AI visibility", market, priority: 10 - index })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create project.");
      setMessage(`Created project ${data.project.id}. Dashboard: /dashboard/ai-visibility/${data.project.id}`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not create project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section" style={{ paddingTop: 32 }}>
      <div className="container" style={{ maxWidth: 980 }}>
        <div className="card" style={{ padding: "clamp(28px, 5vw, 52px)" }}>
          <p className="kicker">rankday admin</p>
          <h1 className="h-display" style={{ fontSize: "clamp(34px, 5vw, 58px)", marginTop: 14 }}>
            Create an AI visibility project.
          </h1>
          <form onSubmit={createProject} style={{ display: "grid", gap: 12, marginTop: 24 }}>
            <input value={adminKey} onChange={(e) => setAdminKey(e.target.value)} required placeholder="Admin key" aria-label="Admin key" style={inputStyle} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              <input value={brandName} onChange={(e) => setBrandName(e.target.value)} required placeholder="Brand name" aria-label="Brand name" style={inputStyle} />
              <input value={domain} onChange={(e) => setDomain(e.target.value)} required placeholder="Domain" aria-label="Domain" style={inputStyle} />
              <input value={market} onChange={(e) => setMarket(e.target.value)} required placeholder="Market" aria-label="Market" style={inputStyle} />
            </div>
            <textarea value={memberUserIds} onChange={(e) => setMemberUserIds(e.target.value)} required placeholder="Supabase user IDs, one per line" aria-label="Supabase user IDs" style={areaStyle} />
            <textarea value={aliases} onChange={(e) => setAliases(e.target.value)} placeholder="Aliases, one per line" aria-label="Aliases" style={areaStyle} />
            <textarea value={competitors} onChange={(e) => setCompetitors(e.target.value)} placeholder="Competitors: Name, domain, aliases" aria-label="Competitors" style={areaStyle} />
            <textarea value={prompts} onChange={(e) => setPrompts(e.target.value)} placeholder="Prompts, one per line" aria-label="Prompts" style={{ ...areaStyle, minHeight: 150 }} />
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ justifyContent: "center" }}>
              {loading ? "Creating..." : "Create project"}
            </button>
          </form>
          {message ? <p style={{ marginTop: 14, color: message.startsWith("Created") ? "#16a34a" : "#dc2626", fontWeight: 800 }}>{message}</p> : null}
        </div>
      </div>
    </section>
  );
}

function lines(value: string): string[] {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  minWidth: 0,
  padding: "14px 16px",
  borderRadius: 10,
  border: "1px solid var(--hairline)",
  fontSize: 15,
};

const areaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 110,
  resize: "vertical",
  fontFamily: "inherit",
};
