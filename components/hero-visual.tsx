"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "./icons";
import { easeOut } from "@/lib/motion";

/** Standalone hero visual (Framer Motion). Used if a page mounts it outside HomeHero. */
export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="hero-visual"
      initial={reduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeOut }}
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
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
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
            4,532
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#1a9d4b" }}>+218%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
