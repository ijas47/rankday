"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Icon } from "./icons";

export function HeroVisual() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hv-blob", { scale: 0.85, opacity: 0, duration: 1.1 })
        .from(".hv-arch", { y: 36, opacity: 0, duration: 0.9 }, "-=0.7")
        .from(".hv-serp-card", { y: 18, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hv-serp-card .serp-row", { x: 12, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .from(".hv-pills", { y: -10, opacity: 0, duration: 0.5 }, "-=0.5")
        .from(".float-badge", { y: 18, opacity: 0, duration: 0.6, stagger: 0.12 }, "-=0.45")
        .from(".sparkle", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, "-=0.5")
        .from(".hv-curve", { opacity: 0, scale: 0.85, transformOrigin: "50% 50%", duration: 0.6 }, "-=0.4");

      // perpetual gentle float on badges
      gsap.to(".float-badge", {
        y: "+=6",
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
      // sparkle twinkle (opacity pulse)
      gsap.to(".sparkle", {
        opacity: 0.55,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-visual" ref={root}>
      <div className="hv-blob" />

      <div className="hv-arch">
        <div className="hv-serp-card">
          <div className="serp-search">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
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
                  <span className="serp-stars">★ 4.9</span>
                  <span>·</span>
                  <span>287 reviews</span>
                  <span>·</span>
                  <span>0.3 mi</span>
                </div>
              </div>
            </div>
            <div className="serp-row">
              <span className="serp-rank">2</span>
              <div className="serp-body">
                <div className="serp-name">Riverside Plumbing</div>
                <div className="serp-meta">
                  <span className="serp-stars">★ 4.6</span>
                  <span>·</span>
                  <span>142 reviews</span>
                </div>
              </div>
            </div>
            <div className="serp-row">
              <span className="serp-rank">3</span>
              <div className="serp-body">
                <div className="serp-name">Quickfix Co.</div>
                <div className="serp-meta">
                  <span className="serp-stars">★ 4.5</span>
                  <span>·</span>
                  <span>96 reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="float-badge hv-loc" style={{ top: "8%", right: "-10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
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
            <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>Dubai · UAE</div>
            <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 700, letterSpacing: "-0.01em" }}>Ranked #1</div>
          </div>
        </div>
      </div>

      <div className="float-badge hv-stats" style={{ bottom: "12%", left: "-16px" }}>
        <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
          Calls this month
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>4,532</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#1a9d4b" }}>+218%</span>
        </div>
        <svg width="120" height="28" viewBox="0 0 120 28" style={{ marginTop: 6, display: "block" }}>
          <path d="M0 22 L20 18 L40 20 L60 14 L80 10 L100 6 L120 4" stroke="var(--purple)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M0 22 L20 18 L40 20 L60 14 L80 10 L100 6 L120 4 L120 28 L0 28 Z" fill="var(--purple)" opacity="0.08" />
        </svg>
      </div>

      <div className="float-badge" style={{ top: "20%", left: "-20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 99,
              background: "#fff4d4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            ⭐
          </div>
          <div>
            <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 700 }}>4.9 · 287</div>
            <div style={{ fontSize: 10, color: "var(--muted)", fontWeight: 500 }}>Google reviews</div>
          </div>
        </div>
      </div>

      <span className="sparkle pink" style={{ top: "5%", right: "30%", fontSize: 22 }}>✦</span>
      <span className="sparkle" style={{ top: "50%", right: "5%", fontSize: 16 }}>✦</span>
      <span className="sparkle peach" style={{ bottom: "8%", right: "20%", fontSize: 26 }}>✦</span>
      <span className="sparkle" style={{ top: "40%", left: "8%", fontSize: 14 }}>✦</span>
      <span className="sparkle pink" style={{ bottom: "30%", left: "30%", fontSize: 12 }}>✦</span>

      <svg className="hv-curve" width="80" height="60" viewBox="0 0 80 60" style={{ position: "absolute", top: "12%", right: "20%" }}>
        <path d="M 4 50 Q 30 5 70 20" stroke="var(--purple)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 4" />
        <path d="M 70 20 L 64 14 M 70 20 L 64 26" stroke="var(--purple)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>

      <div className="hv-pills">
        <a
          className="pill-link"
          href="#footer"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Contact
        </a>
        <Link className="pill-link solid" href="/pricing">
          Get started{" "}
          <span style={{ display: "inline-flex", marginLeft: 4 }}>
            <Icon.Arrow style={{ width: 12, height: 12 }} />
          </span>
        </Link>
      </div>
    </div>
  );
}
