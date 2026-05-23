import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "What is Answer Engine Optimization (AEO)?",
  description:
    "AEO is the practice of making your business citable by ChatGPT, Perplexity, Claude, and Google AI. Learn how it works and why it matters more than traditional SEO alone.",
};

const factors = [
  {
    title: "Structured content",
    body: "AI engines favor content that directly answers questions. Clear H2s, concise definitions, and FAQ-style writing make your content easy for LLMs to extract and cite.",
    tone: "pink",
  },
  {
    title: "Schema markup",
    body: "JSON-LD structured data tells AI crawlers exactly what your business does, who it serves, and where it operates. Without schema, AI engines guess. With it, they cite.",
    tone: "peach",
  },
  {
    title: "Third-party mentions",
    body: "LLMs weight consistency of brand mentions across directories, review platforms, and industry publications. A business mentioned in 30 relevant places outranks one mentioned in 3.",
    tone: "yellow",
  },
  {
    title: "Directory and platform presence",
    body: "ChatGPT and Perplexity pull heavily from G2, Clutch, Yelp, Trustpilot, and category-specific directories. If you're not listed there, you won't be cited from there.",
    tone: "mint",
  },
  {
    title: "Authority signals",
    body: "Backlinks, press mentions, and citations in industry publications all feed into the authority signals LLMs use to decide whose answer to trust.",
    tone: "lilac",
  },
];

const differences = [
  { label: "Goal", seo: "Rank on Google's results page", aeo: "Get cited in AI-generated answers" },
  { label: "Format", seo: "Optimized blog posts and landing pages", aeo: "Structured, question-answer content" },
  { label: "Signals", seo: "Backlinks, keywords, Core Web Vitals", aeo: "Schema, directories, brand consistency" },
  { label: "Timeline", seo: "3 to 12 months to rank", aeo: "4 to 12 weeks to appear in AI answers" },
  { label: "Measurement", seo: "SERP position, organic clicks", aeo: "Citation rate across AI platforms" },
];

export default function WhatIsAEOPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Answer Engine Optimization</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 900, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            What is <span className="it">AEO</span>, and why does it matter more than SEO alone?
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            AEO stands for Answer Engine Optimization. It is the discipline of making your business citable by ChatGPT, Perplexity, Claude, Google AI Overviews, and every other AI tool your buyers now use to research purchases.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="r-aside">
            <div data-reveal className="sticky-aside">
              <div className="card card-purple" style={{ padding: 32 }}>
                <p className="kicker" style={{ color: "rgba(255,255,255,0.7)" }}>The shift</p>
                <p style={{ fontSize: 18, color: "#fff", lineHeight: 1.5, fontWeight: 600, marginTop: 16 }}>
                  In 2024, ChatGPT reached 200 million weekly active users. Perplexity handled over 500 million queries per month. Buyers now ask AI before they Google.
                </p>
              </div>
            </div>

            <div data-reveal>
              <h2 className="h2" style={{ marginBottom: 20 }}>How buyers research has changed</h2>
              <p className="body lg" style={{ color: "var(--ink-2)" }}>
                Five years ago, a buyer searching for a dental clinic in Dubai opened Google, scanned the top 3 results, and clicked. Today, many of those same buyers open ChatGPT and ask: "What are the best dental clinics in Dubai that take walk-ins?"
              </p>
              <p className="body lg" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                ChatGPT answers with specific business names. The businesses it names are not necessarily the ones ranking first on Google. They are the ones whose content, schema, directory presence, and third-party mentions made them citable by the model.
              </p>
              <p className="body lg" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                If your business is not in that answer, you lost the buyer before they ever visited a website.
              </p>
              <p style={{ marginTop: 28, fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.35, letterSpacing: "-0.015em" }}>
                AEO is how you get into that answer. It is not a replacement for SEO. It is what you layer on top of SEO to capture the buyers Google is no longer sending alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">The five factors that determine AI citations.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              LLMs do not rank websites. They pull from a model trained on structured, credible, consistent information. These are the signals that determine who gets cited.
            </p>
          </div>

          <div data-reveal-stagger className="r-cards-5">
            {factors.map((f) => (
              <div key={f.title} className={`card card-${f.tone}`} style={{ padding: 28, minHeight: 200, display: "flex", flexDirection: "column", gap: 14 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.005em" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">AEO vs SEO: what is different.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              They share foundations but diverge in execution. A business serious about visibility in 2025 needs both.
            </p>
          </div>

          <div data-reveal className="card" style={{ padding: 0, overflow: "hidden", maxWidth: 960, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "var(--ink)", color: "#fff", padding: "14px 24px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>Factor</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>SEO</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7, color: "var(--purple-light, #b8a9ff)" }}>AEO</div>
            </div>
            {differences.map((r, i) => (
              <div
                key={r.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  padding: "18px 24px",
                  borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
                  alignItems: "start",
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{r.label}</div>
                <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.4 }}>{r.seo}</div>
                <div style={{ fontSize: 14, color: "var(--purple)", fontWeight: 600, lineHeight: 1.4 }}>{r.aeo}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="r-aside">
            <div data-reveal className="sticky-aside">
              <h2 className="h1">How Rankday does AEO.</h2>
              <Link href="/pricing" className="btn btn-primary" style={{ marginTop: 28 }}>
                See pricing <span className="btn-icon"><Icon.Arrow /></span>
              </Link>
            </div>

            <div data-reveal>
              <p className="body lg" style={{ color: "var(--ink-2)" }}>
                AEO is built into every Rankday engagement. It is not an add-on. It is not a report. It is the actual work done alongside SEO in the same 90 days.
              </p>

              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { step: "01", title: "Site structured for citation", body: "We write and structure your content so LLMs can extract clear, direct answers. Every service page, FAQ, and about page is built to be cited, not just read." },
                  { step: "02", title: "Schema applied across the site", body: "Organization, LocalBusiness, Service, FAQPage, and Person schema are applied in week 2. This is the machine-readable layer that AI engines rely on." },
                  { step: "03", title: "Directory and platform placement", body: "We get you listed on the directories and review platforms that LLMs pull from. G2, Clutch, industry-specific platforms, and local directories depending on your category." },
                  { step: "04", title: "Third-party mentions earned", body: "We secure mentions in publications and platforms your target AI engine trusts. These are real placements, not link farms." },
                  { step: "05", title: "Weekly AI visibility tracking", body: "We run your target queries through ChatGPT, Perplexity, Claude, and Google AI Overviews every week and track whether you appear. The data feeds back into the content engine." },
                ].map((item) => (
                  <div key={item.step} className="card" style={{ padding: 28, display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--purple)", fontWeight: 700, flexShrink: 0, paddingTop: 2 }}>/{item.step}</span>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>{item.title}</h3>
                      <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5, margin: "8px 0 0" }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}>
              Get cited by <span className="serif">every AI that matters.</span>
            </h2>
            <a href="https://calendly.com/ijas-rank-day/30min" target="_blank" rel="noopener noreferrer" className="btn btn-light">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
