"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Icon } from "./icons";

export function HeroVisual() {
  const root = useRef<HTMLDivElement | null>(null);
  const callsRef = useRef<HTMLSpanElement | null>(null);
  const pctRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        if (callsRef.current) callsRef.current.textContent = "4,532";
        if (pctRef.current) pctRef.current.textContent = "+218%";
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hv-blob", { scale: 0.85, opacity: 0, duration: 1.1 })
        .from(".hv-arch", { y: 36, opacity: 0, duration: 0.9 }, "-=0.7")
        .from(".hv-serp-card", { y: 18, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hv-serp-card .serp-row", { x: 12, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .from(".hv-pills", { y: -10, opacity: 0, duration: 0.5 }, "-=0.5")
        .from(".float-badge", { y: 18, opacity: 0, duration: 0.6, stagger: 0.12 }, "-=0.45")
        .from(".sparkle", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, "-=0.5")
        .from(".hv-curve", { opacity: 0, scale: 0.85, transformOrigin: "50% 50%", duration: 0.6 }, "-=0.4");

      // Number tickers
      const calls = { v: 0 };
      gsap.to(calls, {
        v: 4532,
        duration: 1.8,
        ease: "power3.out",
        delay: 1.0,
        onUpdate: () => {
          if (callsRef.current) callsRef.current.textContent = Math.round(calls.v).toLocaleString();
        },
      });
      const pct = { v: 0 };
      gsap.to(pct, {
        v: 218,
        duration: 1.6,
        ease: "power3.out",
        delay: 1.1,
        onUpdate: () => {
          if (pctRef.current) pctRef.current.textContent = `+${Math.round(pct.v)}%`;
        },
      });

      // Perpetual gentle float on badges
      gsap.to(".float-badge", {
        y: "+=6",
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
      // Sparkle twinkle
      gsap.to(".sparkle", {
        opacity: 0.55,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });

      // Slow drift on the SERP arch (subtle, perpetual)
      gsap.to(".hv-arch", {
        y: "+=12",
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Mouse parallax. Sparkles, badges, and the curve drift slightly with cursor.
      const sparkles = gsap.utils.toArray<HTMLElement>(".sparkle");
      const badges = gsap.utils.toArray<HTMLElement>(".float-badge");
      const curve = root.current!.querySelector(".hv-curve") as HTMLElement | null;

      const quickSparkles = sparkles.map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
      }));
      const quickBadges = badges.map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 1.0, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1.0, ease: "power3.out" }),
      }));
      const quickCurve = curve
        ? {
            x: gsap.quickTo(curve, "x", { duration: 1.2, ease: "power3.out" }),
            y: gsap.quickTo(curve, "y", { duration: 1.2, ease: "power3.out" }),
          }
        : null;

      const onMove = (e: MouseEvent) => {
        if (!root.current) return;
        const r = root.current.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / r.width;
        const dy = (e.clientY - cy) / r.height;
        sparkles.forEach((_, i) => {
          const amp = 18 + (i % 3) * 4;
          quickSparkles[i].x(dx * amp);
          quickSparkles[i].y(dy * amp);
        });
        badges.forEach((_, i) => {
          const amp = 8 + (i % 2) * 4;
          quickBadges[i].x(dx * amp);
          quickBadges[i].y(dy * amp);
        });
        if (quickCurve) {
          quickCurve.x(dx * 14);
          quickCurve.y(dy * 14);
        }
      };

      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
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
          <span ref={callsRef} style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
            0
          </span>
          <span ref={pctRef} style={{ fontSize: 12, fontWeight: 600, color: "#1a9d4b" }}>
            +0%
          </span>
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

    </div>
  );
}
