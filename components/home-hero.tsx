"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "./icons";
import { easeOut } from "@/lib/motion";

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="home-hero">
      <div className="container">
        <div className="r-hero">
          <div>
            <motion.span
              className="eyebrow"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              Top 3 or we keep working free
            </motion.span>

            <motion.h1
              className="h-display"
              style={{ maxWidth: 680, marginTop: 18 }}
              initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.05 }}
            >
              A new website. Ranked on Google. Cited by <span className="it">AI</span>. In 90 days.
            </motion.h1>

            <motion.p
              className="lede"
              style={{ marginTop: 20, maxWidth: 520 }}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.18 }}
            >
              Website or Shopify store, Google top-3 on agreed keywords, and AI citations. One fixed price.
              No retainer.
            </motion.p>

            <motion.div
              style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.28 }}
            >
              <a
                href="https://wa.me/971565981209"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Start your 90 days{" "}
                <span className="btn-icon">
                  <Icon.Arrow />
                </span>
              </a>
              <Link className="btn btn-light" href="/how-it-works">
                How it works{" "}
                <span className="btn-icon">
                  <Icon.Arrow />
                </span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeOut, delay: 0.12 }}
          >
            <div className="hv-blob" />
            <div className="hv-arch">
              <div className="hv-serp-card">
                <div className="serp-search">
                  <Icon.Search />
                  <span>plumber near me</span>
                </div>
                <div className="serp-list">
                  <div className="serp-row top">
                    <span className="serp-rank">1</span>
                    <div className="serp-body">
                      <div className="serp-name">
                        Your business <span className="serp-badge">Top 3</span>
                      </div>
                      <div className="serp-meta">
                        <span className="serp-stars">4.9</span>
                        <span>·</span>
                        <span>287 reviews</span>
                      </div>
                    </div>
                  </div>
                  <div className="serp-row">
                    <span className="serp-rank">2</span>
                    <div className="serp-body">
                      <div className="serp-name">Riverside Plumbing</div>
                      <div className="serp-meta">
                        <span className="serp-stars">4.6</span>
                        <span>·</span>
                        <span>142 reviews</span>
                      </div>
                    </div>
                  </div>
                  <div className="serp-row">
                    <span className="serp-rank">3</span>
                    <div className="serp-body">
                      <div className="serp-name">Quick Fix Co.</div>
                      <div className="serp-meta">
                        <span className="serp-stars">4.5</span>
                        <span>·</span>
                        <span>96 reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="float-badge hv-loc"
              style={{ top: "8%", right: -10 }}
              data-float
              data-float-amp="6"
              animate={reduce ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #d8c4ff, #e8d4f0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--purple)",
                  }}
                >
                  <Icon.Map />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>Dubai, UAE</div>
                  <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 700, letterSpacing: "-0.01em" }}>
                    Ranked #1
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="float-badge hv-stats"
              style={{ bottom: "12%", left: -16 }}
              animate={reduce ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  fontFamily: "var(--mono)",
                }}
              >
                Calls this month
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                  287
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#1a9d4b" }}>+42%</span>
              </div>
              <svg width="120" height="28" viewBox="0 0 120 28" style={{ marginTop: 6, display: "block" }}>
                <path
                  d="M0 22 L20 18 L40 20 L60 14 L80 10 L100 6 L120 4"
                  stroke="var(--purple)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M0 22 L20 18 L40 20 L60 14 L80 10 L100 6 L120 4 L120 28 L0 28 Z"
                  fill="var(--purple)"
                  opacity="0.08"
                />
              </svg>
            </motion.div>

            <span className="sparkle pink" style={{ top: "5%", right: "28%", fontSize: 22 }}>
              ✦
            </span>
            <span className="sparkle" style={{ top: "48%", right: "4%", fontSize: 16 }}>
              ✦
            </span>
            <span className="sparkle peach" style={{ bottom: "10%", right: "18%", fontSize: 24 }}>
              ✦
            </span>
          </motion.div>
        </div>

        <motion.div
          className="ai-row"
          style={{
            marginTop: 64,
            padding: 22,
            background: "rgba(255,255,255,0.65)",
            border: "1px solid var(--hairline)",
            borderRadius: 20,
            boxShadow: "var(--shadow-sm)",
          }}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--muted)",
              margin: 0,
              lineHeight: 1.35,
              fontWeight: 600,
              letterSpacing: "-0.005em",
            }}
          >
            Cited by the AI engines
            <br />
            <strong style={{ color: "var(--ink)", fontWeight: 700 }}>buyers already use.</strong>
          </p>
          <div className="r-cards-5" style={{ alignItems: "center" }}>
            {[
              { name: "ChatGPT", color: "#10a37f" },
              { name: "Perplexity", color: "#20808d" },
              { name: "Claude", color: "#c96442" },
              { name: "Google AI", color: "#4285f4" },
              { name: "Gemini", color: "#1a73e8" },
            ].map((e, i) => (
              <motion.div
                key={e.name}
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
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.35, ease: easeOut }}
              >
                <span style={{ width: 10, height: 10, borderRadius: 99, background: e.color }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>
                  {e.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
