import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { pageMeta, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI Visibility Tracker for ChatGPT, Perplexity & Gemini.",
  description:
    "Track how often your brand appears in AI answers, which competitors get mentioned, what sources are cited, and what to fix next. Built into rankday client work.",
  path: "/ai-visibility-tracker",
});

const features = [
  { title: "Prompt tracking", body: "Track buyer questions every week across OpenAI, Perplexity, and Gemini." },
  { title: "Competitor share of voice", body: "See who AI assistants mention, how often they appear, and whether they outrank you in the answer." },
  { title: "Source monitoring", body: "Find the cited domains and pages that AI engines use when forming recommendations." },
  { title: "Sentiment scoring", body: "Measure whether your brand is described positively, neutrally, or with weak context." },
  { title: "Action queue", body: "Turn missing mentions, weak citations, and competitor wins into pages and proof assets to publish." },
  { title: "Client reporting", body: "Show weekly movement during the 90-day rankday sprint without another reporting tool." },
];

export default function AiVisibilityTrackerPage() {
  return (
    <div className="page-enter">
      <JsonLd
        data={serviceSchema({
          name: "AI Visibility Tracker",
          description: "AI search visibility tracking for ChatGPT, Perplexity, Gemini, and Google AI readiness.",
          path: "/ai-visibility-tracker",
          areaServed: ["UAE", "UK", "US", "Canada", "Australia", "Singapore", "Ireland", "New Zealand"],
        })}
      />

      <section style={{ padding: "48px 0 30px" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 36, alignItems: "center" }}>
          <div>
            <span className="eyebrow">AI visibility tracker</span>
            <h1 className="h-display" data-reveal-text style={{ marginTop: 18, fontSize: "clamp(38px, 6vw, 78px)" }}>
              Know when AI recommends you.
            </h1>
            <p className="lede" data-reveal style={{ marginTop: 20 }}>
              rankday tracks your prompts, competitors, citations, sentiment, and source gaps across ChatGPT-style answers, Perplexity, and Gemini.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
              <Link href="/tools/ai-visibility-report" className="btn btn-primary">
                Free AI Visibility Report
              </Link>
              <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Start your 90 days
              </a>
              <Link href="/dashboard/ai-visibility" className="btn btn-ghost">
                Client login
              </Link>
            </div>
          </div>

          <div className="card card-ink" style={{ padding: 28 }}>
            <p className="kicker" style={{ color: "rgba(255,255,255,0.62)" }}>Weekly report</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18 }}>
              {[
                ["Visibility", "64%"],
                ["Avg position", "#2"],
                ["Sentiment", "78/100"],
                ["Top sources", "12"],
              ].map(([label, value]) => (
                <div key={label} style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: 8, padding: 16 }}>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.62)", fontSize: 12, fontWeight: 800 }}>{label}</p>
                  <strong style={{ display: "block", color: "#fff", fontSize: 32, marginTop: 8 }}>{value}</strong>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
              {["Competitor is winning 3 buyer prompts", "Your domain is missing from cited sources", "Publish a comparison page for AI visibility"].map((item) => (
                <p key={item} style={{ margin: 0, color: "rgba(255,255,255,0.78)", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 10 }}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="r-3" data-reveal-stagger>
            {features.map((feature) => (
              <div key={feature.title} className="card" style={{ padding: 28 }}>
                <h2 style={{ margin: 0, color: "var(--ink)", fontSize: 22 }}>{feature.title}</h2>
                <p style={{ margin: "10px 0 0", color: "var(--muted)", lineHeight: 1.55 }}>{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}>
              Tracking is useful. Fixing the gaps is where rankday earns the result.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.74)", maxWidth: 720 }}>
              The tracker is included for rankday clients so the weekly visibility data turns into pages, schema, citations, and proof assets.
            </p>
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-light">
              Track my AI visibility
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
