import Link from "next/link";
import { Icon } from "@/components/icons";
import { HeroVisual } from "@/components/hero-visual";
import {
  WebsiteIcon,
  BrandingIcon,
  SearchIcon,
  AIIcon,
  SignalsIcon,
} from "@/components/page-icons";

const aiEngines = [
  { name: "ChatGPT", color: "#10a37f" },
  { name: "Perplexity", color: "#20808d" },
  { name: "Claude", color: "#c96442" },
  { name: "Google AI", color: "#4285f4" },
  { name: "Gemini", color: "#1a73e8" },
];

const audience = [
  "Local services",
  "B2B SaaS",
  "Agencies",
  "Consultancies",
  "E-commerce",
  "Professional services",
  "Clinics",
  "Law firms",
  "Real estate",
  "Hospitality",
];

const markets: Array<[string, string]> = [
  ["UAE", "pink"],
  ["UK", "peach"],
  ["US", "yellow"],
  ["Canada", "mint"],
  ["Australia", "lilac"],
  ["Singapore", "pink"],
  ["Ireland", "peach"],
  ["New Zealand", "mint"],
];

export default function HomePage() {
  return (
    <div className="page-enter">
      {/* HERO */}
      <section style={{ padding: "32px 0 64px", position: "relative" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 32, alignItems: "center", minHeight: 620 }}>
            <div data-reveal>
              <h1 className="h-display" style={{ maxWidth: 780, fontSize: "clamp(36px, 5vw, 72px)" }}>
                Top 3 on Google for 90% of your keywords. Recommended by{" "}
                <span className="it">ChatGPT and Perplexity.</span> In 90 days. Or we keep working free.
              </h1>

              <p className="lede" style={{ marginTop: 28, maxWidth: 580 }}>
                Most businesses lose customers because their competitors rank above them on Google and get name-dropped by AI when buyers ask for recommendations. We rebuild your website, fix your search presence, and make sure your business is the one that comes up. <strong>90 days. One price.</strong>
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
                <Link href="/pricing" className="btn btn-primary">
                  Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
                </Link>
                <Link href="/how-it-works" className="btn btn-light">
                  How it works <span className="btn-icon"><Icon.Arrow /></span>
                </Link>
              </div>
            </div>

            <HeroVisual />
          </div>

          {/* AI engines row */}
          <div
            data-reveal
            style={{
              marginTop: 80,
              padding: "24px 32px",
              background: "rgba(255,255,255,0.6)",
              border: "1px solid var(--hairline)",
              borderRadius: 20,
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 32,
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.3, fontWeight: 600, letterSpacing: "-0.005em" }}>
              We get you cited
              <br />
              <strong style={{ color: "var(--ink)", fontWeight: 700 }}>by every AI that matters.</strong>
            </p>
            <div data-reveal-stagger style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, alignItems: "center" }}>
              {aiEngines.map((ai) => (
                <div
                  key={ai.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "10px 14px",
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px solid var(--hairline)",
                  }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: 99, background: ai.color }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>{ai.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="section">
        <div className="container">
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56, alignItems: "end", marginBottom: 48 }}>
            <h2 className="h1">What you get.</h2>
            <p className="body lg" style={{ maxWidth: 600 }}>
              A website built around your actual business. Branding that matches the quality of your work. Top 3 Google rankings for the keywords your buyers are searching. Mentions in ChatGPT, Perplexity, Google AI Overviews, and Claude when someone asks for businesses like yours.
            </p>
          </div>

          <div data-reveal-stagger style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            <GetCard tone="pink" title="Website" body="Built around your actual business." icon={<WebsiteIcon />} />
            <GetCard tone="peach" title="Branding" body="Matches the quality of your work." icon={<BrandingIcon />} />
            <GetCard tone="yellow" title="Top 3 on Google" body="For the keywords your buyers search." icon={<SearchIcon />} />
            <GetCard tone="mint" title="AI mentions" body="ChatGPT, Perplexity, Claude, Google AI." icon={<AIIcon />} />
          </div>

          <p
            data-reveal
            style={{
              marginTop: 48,
              textAlign: "center",
              fontSize: "clamp(32px, 4.4vw, 56px)",
              color: "var(--ink)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            90 days. One price. <span className="serif" style={{ color: "var(--purple)" }}>Done.</span>
          </p>
        </div>
      </section>

      {/* HOW WE DO IT */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "start" }}>
            <div data-reveal style={{ position: "sticky", top: 100 }}>
              <h2 className="h1">How we do it.</h2>
              <Link href="/how-it-works" className="btn btn-light" style={{ marginTop: 28 }}>
                See the 90-day plan <span className="btn-icon"><Icon.Arrow /></span>
              </Link>
            </div>

            <div>
              <div data-reveal-stagger style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                <ProcessCard icon={<WebsiteIcon />} title="Rebuild the site" tone="lilac" />
                <ProcessCard icon={<SearchIcon />} title="Write content Google ranks" tone="pink" />
                <ProcessCard icon={<AIIcon />} title="Structure for LLM citation" tone="peach" />
                <ProcessCard icon={<SignalsIcon />} title="Earn citations, reviews, links" tone="mint" />
              </div>

              <p data-reveal style={{ marginTop: 28, fontSize: 17, color: "var(--ink-2)", lineHeight: 1.55 }}>
                You don&apos;t manage any of it. You don&apos;t learn what schema markup or AEO means. You answer two short questions a week and <span className="serif" style={{ color: "var(--purple)" }}>we handle the rest.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="section">
        <div className="container">
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56, alignItems: "end", marginBottom: 48 }}>
            <h2 className="h1">Who this is for.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              Any business with a website and something to sell. Local service businesses, B2B SaaS, agencies, consultancies, e-commerce, professional services, clinics, law firms, real estate, hospitality.
            </p>
          </div>

          <div data-reveal-stagger style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            {audience.map((t) => (
              <div key={t} className="card" style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.005em" }}>{t}</span>
                <span className="check-mark" style={{ width: 20, height: 20 }}>
                  <Icon.Check />
                </span>
              </div>
            ))}
          </div>

          <p
            data-reveal
            style={{
              marginTop: 32,
              fontSize: "clamp(18px, 2vw, 24px)",
              lineHeight: 1.4,
              color: "var(--ink-2)",
              letterSpacing: "-0.01em",
              textAlign: "center",
              maxWidth: 900,
              marginLeft: "auto",
              marginRight: "auto",
              fontWeight: 500,
            }}
          >
            If you have keywords you want to rank for and customers who research before they buy, <span className="serif" style={{ color: "var(--purple)" }}>we can get you found.</span>
          </p>
        </div>
      </section>

      {/* GUARANTEE */}
      <section style={{ padding: "0 32px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple" style={{ padding: "64px 56px" }}>
            <p className="kicker" style={{ color: "rgba(255,255,255,0.7)" }}>The guarantee</p>
            <p
              style={{
                marginTop: 24,
                fontSize: "clamp(24px, 3vw, 40px)",
                lineHeight: 1.2,
                letterSpacing: "-0.025em",
                fontWeight: 700,
                color: "#fff",
                maxWidth: 1100,
              }}
            >
              We agree on your target keywords in week 1. If you&apos;re not in the top 3 for 90% of them by day 90, <span className="serif" style={{ color: "rgba(255,255,255,0.92)" }}>we keep working until you are.</span> No extra charge.
            </p>

            <div
              style={{
                marginTop: 32,
                padding: 28,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.15)",
                maxWidth: 920,
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 28,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 99,
                  background: "#fff",
                  color: "var(--purple)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon.Sparkle />
              </div>
              <p style={{ fontSize: 17, color: "#fff", lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                We also track AI citations weekly. Within 90 days, your business should appear in AI-generated answers for at least <strong>5 high-intent queries</strong> in your category.
              </p>
              <div style={{ display: "flex", gap: 6 }}>
                {["GPT", "PPX", "CLD", "GEM"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "6px 10px",
                      background: "rgba(255,255,255,0.18)",
                      borderRadius: 99,
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETS */}
      <section className="section">
        <div className="container">
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56, alignItems: "end", marginBottom: 48 }}>
            <h2 className="h1">Markets.</h2>
            <p className="body lg" style={{ maxWidth: 540 }}>
              UAE · UK · US · Canada · Australia · Singapore · Ireland · New Zealand. Most English-speaking markets.
            </p>
          </div>

          <div data-reveal-stagger style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {markets.map(([m, tone], i) => (
              <div
                key={m}
                className={`card card-${tone}`}
                style={{ padding: "28px", minHeight: 130, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink)", opacity: 0.5 }}>
                  / {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--ink)", letterSpacing: "-0.02em" }}>{m}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GetCard({ tone, title, body, icon }: { tone: string; title: string; body: string; icon: React.ReactNode }) {
  return (
    <div className={`card card-${tone}`} style={{ padding: 28, minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: "rgba(255,255,255,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ink)",
        }}
      >
        {icon}
      </div>
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.015em" }}>{title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.45, color: "var(--ink-2)", margin: "8px 0 0" }}>{body}</p>
      </div>
    </div>
  );
}

function ProcessCard({ tone, title, icon }: { tone: string; title: string; icon: React.ReactNode }) {
  return (
    <div className={`card card-${tone}`} style={{ padding: 22, display: "flex", alignItems: "center", gap: 16 }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "rgba(255,255,255,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ink)",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{title}</p>
    </div>
  );
}
