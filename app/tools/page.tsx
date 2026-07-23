import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Icon } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "Free Tools. Check Your AI Search Visibility.",
  description:
    "Free tools from rankday: AI Visibility Report (ChatGPT, Perplexity, Gemini), AEO Score, website SEO audit, store audit, and llms.txt generator. No signup.",
  path: "/tools",
});

const tools = [
  {
    href: "/tools/ai-visibility-report",
    name: "AI Visibility Report",
    desc: "Get 20 buyer prompts AI assistants actually answer, a free site readiness check, and 5 fixes to improve your chances of being recommended. Optional full audit from $149.",
    tone: "pink",
    cta: "Get free report",
  },
  {
    href: "/tools/website-seo-audit",
    name: "Website SEO Audit",
    desc: "Crawl up to 75 pages for a 0-100 score across technical SEO, schema, content, Core Web Vitals, and AI-search readiness — plus a full crawl report of every URL and issue.",
    tone: "mint",
    cta: "Audit a website",
  },
  {
    href: "/tools/store-seo-audit",
    name: "Store SEO Audit",
    desc: "Audit any ecommerce store across technical SEO, product schema, content, Core Web Vitals signals, and AI-search readiness. Get a 0-100 dashboard.",
    tone: "peach",
    cta: "Audit a store",
  },
  {
    href: "/tools/aeo-score",
    name: "AEO Score",
    desc: "Score how visible your site is to AI search (ChatGPT, Perplexity, Claude, Google AI), from 0 to 100, with the exact fixes ranked by impact.",
    tone: "pink",
    cta: "Check your score",
  },
  {
    href: "/tools/llms-txt",
    name: "llms.txt Generator",
    desc: "Generate a ready-to-use llms.txt for any site in seconds. Copy, download, upload. It helps AI systems understand and cite your content.",
    tone: "mint",
    cta: "Generate yours",
  },
  {
    href: "/ai-visibility-tracker",
    name: "AI Visibility Tracker",
    desc: "Track prompts, competitors, sources, sentiment, and share of voice across OpenAI, Perplexity, and Gemini for rankday clients.",
    tone: "peach",
    cta: "See the tracker",
  },
];

export default function ToolsPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">Free tools</span>
          <h1
            className="h-display"
            data-reveal-text
            style={{ maxWidth: 880, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Free tools from <span className="it">rankday</span>
          </h1>
          <p
            className="lede"
            data-reveal
            style={{ marginTop: 24, maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}
          >
            See how findable you are to Google and AI search, then fix what matters. No signup, no catch.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger className="r-2">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={`card card-${t.tone}`}
                style={{ padding: 40, display: "flex", flexDirection: "column", gap: 16, textDecoration: "none" }}
              >
                <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", margin: 0 }}>
                  {t.name}
                </h2>
                <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>{t.desc}</p>
                <span className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                  {t.cta}
                  <span className="btn-icon">
                    <Icon.Arrow />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
