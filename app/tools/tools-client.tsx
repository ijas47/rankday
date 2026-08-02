"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/icons";
import { easeOut, staggerContainer, staggerItem } from "@/lib/motion";

const tools = [
  {
    href: "/tools/ai-visibility-report",
    name: "AI Visibility Report",
    desc: "20 buyer prompts AI assistants answer, a free site readiness check, and 5 fixes to improve recommendations. Optional full audit from $149.",
    tone: "pink",
    cta: "Get free report",
  },
  {
    href: "/tools/website-seo-audit",
    name: "Website SEO Audit",
    desc: "Crawl up to 75 pages for a 0-100 score across technical SEO, schema, content, Core Web Vitals, and AI-search readiness, plus a full crawl report.",
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
    desc: "Score how visible your site is to AI search (ChatGPT, Perplexity, Claude, Google AI), from 0 to 100, with fixes ranked by impact.",
    tone: "lilac",
    cta: "Check your score",
  },
  {
    href: "/tools/llms-txt",
    name: "llms.txt Generator",
    desc: "Generate a ready-to-use llms.txt for any site in seconds. Copy, download, upload. Helps AI systems understand and cite your content.",
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

export function ToolsClient() {
  const reduce = useReducedMotion();

  return (
    <div className="page-enter">
      <section style={{ padding: "28px 0 40px", textAlign: "center" }}>
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            Free tools
          </motion.span>
          <motion.h1
            className="h-display"
            style={{ maxWidth: 880, margin: "18px auto 0" }}
            initial={reduce ? false : { opacity: 0, y: 22, scale: 0.98, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.05 }}
          >
            Free tools from <span className="it">rankday</span>
          </motion.h1>
          <motion.p
            className="lede"
            style={{ marginTop: 20, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.14 }}
          >
            See how findable you are to Google and AI search, then fix what matters. No signup.
          </motion.p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <motion.div
            className="r-2"
            variants={reduce ? undefined : staggerContainer}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, amount: 0.12 }}
          >
            {tools.map((t) => (
              <motion.div key={t.href} variants={reduce ? undefined : staggerItem}>
                <Link
                  href={t.href}
                  className={`card card-${t.tone} tools-card`}
                  style={{
                    padding: 36,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    textDecoration: "none",
                    height: "100%",
                    minHeight: 220,
                  }}
                >
                  <h2
                    style={{
                      fontSize: "clamp(22px, 2.4vw, 28px)",
                      fontWeight: 800,
                      color: "var(--ink)",
                      letterSpacing: "-0.025em",
                      margin: 0,
                      fontFamily: "var(--display)",
                    }}
                  >
                    {t.name}
                  </h2>
                  <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, margin: 0, flex: 1 }}>
                    {t.desc}
                  </p>
                  <span className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start", marginTop: 4 }}>
                    {t.cta}
                    <span className="btn-icon">
                      <Icon.Arrow />
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="card"
            style={{
              marginTop: 28,
              padding: 32,
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
            }}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: easeOut }}
          >
            <div>
              <p className="kicker" style={{ margin: 0 }}>
                Ready for the full 90 days?
              </p>
              <p style={{ margin: "10px 0 0", fontSize: 18, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                Website or store + SEO + AEO. One fixed price.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/pricing" className="btn btn-primary btn-sm">
                View pricing
                <span className="btn-icon">
                  <Icon.Arrow />
                </span>
              </Link>
              <a
                href="https://wa.me/971565981209"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light btn-sm"
              >
                WhatsApp
                <span className="btn-icon">
                  <Icon.Arrow />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
