import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "How It Works. The 90-Day SEO and AEO Process.",
  description:
    "Week-by-week breakdown of how rankday delivers a new website, Google top-3 rankings, and AI citations in 90 days. No contracts, no 40-page reports, no surprises.",
  path: "/how-it-works",
});
import {
  BuildIcon,
  LaunchIcon,
  ContentIcon,
  RankIcon,
} from "@/components/page-icons";
import { Timeline } from "@/components/timeline";

type Phase = {
  week: string;
  pct: number;
  title: string;
  body: string;
  output?: string;
  footer?: string;
  icon: React.ReactNode;
  tone: string;
  featured?: boolean;
};

const phases: Phase[] = [
  {
    week: "Week 1",
    pct: 12,
    title: "Foundations + site rebuild",
    body: "We audit your current website, search presence, and AI visibility. You tell us the keywords that matter and we agree on the list. In parallel, we design and ship your new site. Five to twelve pages depending on scope. Mobile-first. 95+ Core Web Vitals. Branding included. Modern tooling lets us do in one week what most agencies stretch into a month.",
    output: "Keyword agreement, competitor map, baseline, and a shipped site.",
    footer: "You sign off the keywords and review the site once. We ship by end of week 1.",
    icon: <BuildIcon />,
    tone: "peach",
    featured: true,
  },
  {
    week: "Week 2",
    pct: 25,
    title: "Launch + technical setup",
    body: "Site goes live. Schema markup applied. Sitemap submitted to Google. Search Console and analytics installed. Google Business Profile rebuilt for local. LinkedIn and directory listings optimized for B2B.",
    icon: <LaunchIcon />,
    tone: "yellow",
  },
  {
    week: "Weeks 2 to 7",
    pct: 58,
    title: "Content + signals",
    body: "We publish four to eight content pages targeting your agreed keywords. Each is structured for both Google ranking and LLM citation. We build citations, earn backlinks, run review collection, and get you listed on the directories LLMs pull from.",
    footer: "Weekly Loom update. Two minutes. No reports.",
    icon: <ContentIcon />,
    tone: "mint",
  },
  {
    week: "Weeks 8 to 12",
    pct: 100,
    title: "Rank, refine, get cited",
    body: "Rankings start moving. We watch which keywords are landing and double down. Weekly AI visibility checks across ChatGPT, Perplexity, Claude, and Google AI Overviews feed back into the content engine.",
    footer: "By day 90, top 3 for 90% of agreed keywords and showing up in AI answers.",
    icon: <RankIcon />,
    tone: "lilac",
  },
];

const processGuides = [
  { href: "/blog/what-is-seo-in-digital-marketing", title: "What is SEO in digital marketing?", body: "The plain-English guide to what SEO does, what moves rankings, and why the first 90 days need structure.", tone: "pink" },
  { href: "/blog/seo-content-writing-guide", title: "SEO content writing guide", body: "How to write pages that answer buyer intent, rank on Google, and support AI citation visibility.", tone: "peach" },
  { href: "/blog/how-to-choose-a-digital-marketing-agency", title: "How to choose a digital marketing agency", body: "The agency due diligence checklist for avoiding vague retainers and demanding measurable outcomes.", tone: "mint" },
];

export default function HowItWorksPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 40px", textAlign: "center", position: "relative" }}>
        <div className="container">
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 1100, margin: "0 auto" }}>
            How <span className="it">rankday</span> works.
          </h1>
          <p className="lede" data-reveal data-reveal-delay="0.1" style={{ marginTop: 28, maxWidth: 780, marginLeft: "auto", marginRight: "auto" }}>
            Most agencies hide the work behind dashboards and monthly reports. The work is actually pretty simple. Here&apos;s what happens.
          </p>
        </div>
      </section>

      <section style={{ padding: "24px 0 48px" }}>
        <div className="container">
          <Timeline phases={phases} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Read the strategy behind the sprint.</h2>
            <p className="body lg" style={{ maxWidth: 620 }}>
              These guides explain the SEO, content, and agency selection decisions behind the rankday process.
            </p>
          </div>

          <div data-reveal-stagger className="r-3">
            {processGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className={`card card-${guide.tone}`} style={{ padding: 28, minHeight: 190, textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 18 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>{guide.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5, margin: "12px 0 0" }}>{guide.body}</p>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--purple)", fontWeight: 700, fontSize: 14 }}>
                  Read the guide
                  <Icon.Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 0 96px" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {phases.map((p, i) => (
              <Phase key={i} idx={String(i + 1).padStart(2, "0")} {...p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger className="r-2">
            <div className="card" style={{ padding: 40, minHeight: 360, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <p className="kicker">What you do</p>
              <p style={{ fontSize: 24, color: "var(--ink)", lineHeight: 1.3, letterSpacing: "-0.015em", fontWeight: 600, margin: 0 }}>
                Sign off on the keyword list and approve the site in week 1. <span className="serif" style={{ color: "var(--purple)" }}>Answer two short questions a week.</span> That&apos;s it.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 28 }}>
                {["Day 3", "Day 7", "Weekly"].map((w, i) => (
                  <div key={w} style={{ padding: "10px 12px", background: "var(--paper)", borderRadius: 10, border: "1px solid var(--hairline)" }}>
                    <p style={{ fontSize: 10, color: "var(--muted)", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                      0{i + 1}
                    </p>
                    <p style={{ fontSize: 14, color: "var(--ink)", margin: "4px 0 0", fontWeight: 700, letterSpacing: "-0.005em" }}>{w}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-ink" style={{ padding: 40, minHeight: 360 }}>
              <p className="kicker" style={{ color: "rgba(255,255,255,0.5)" }}>What we never do</p>
              <div style={{ marginTop: 22 }}>
                {[
                  "Send you 40-page reports.",
                  'Charge for "strategy calls."',
                  "Disappear after the website launches.",
                  "Lock you into a 12-month contract.",
                  "Promise things we can't deliver.",
                ].map((t) => (
                  <div className="check" key={t} style={{ borderTopColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.92)" }}>
                    <span className="xmark">
                      <Icon.X />
                    </span>
                    <span style={{ fontSize: 16 }}>{t}</span>
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
              <span className="serif">Start</span> your 90 days.
            </h2>
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-light">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Phase({ idx, week, title, body, output, footer, featured, tone, icon }: Phase & { idx: string }) {
  return (
    <div data-reveal className={`card ${featured ? `card-${tone}` : ""}`} style={{ padding: 36 }}>
      <div className="r-phase">
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: featured ? "rgba(255,255,255,0.7)" : "var(--purple-tint)",
            color: featured ? "var(--ink)" : "var(--purple)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        <div>
          <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted-2)" }}>/ {idx}</span>
          <p style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--purple)", marginTop: 8, fontWeight: 700 }}>
            {week}
          </p>
        </div>

        <div>
          <h3 className="h3" style={{ fontSize: 26 }}>{title}</h3>
          <p className="body" style={{ marginTop: 12, color: "var(--ink-2)" }}>{body}</p>
          {footer && <p style={{ marginTop: 14, fontSize: 15, color: "var(--ink)", fontWeight: 700 }}>{footer}</p>}
        </div>

        <div>
          {output && (
            <div style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.7)", display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>Output</span>
              <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500, lineHeight: 1.4 }}>{output}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
