"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Phase = { week: string; pct: number; title: string };

export function Timeline({ phases }: { phases: Phase[] }) {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const fill = root.current!.querySelector(".tl-fill") as HTMLElement | null;
      const nodes = Array.from(root.current!.querySelectorAll(".tl-node")) as HTMLElement[];
      if (!fill) return;

      if (reduce) {
        gsap.set(fill, { scaleX: 1 });
        gsap.set(nodes, { scale: 1, opacity: 1 });
        return;
      }

      gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(nodes, { scale: 0.6, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.to(fill, { scaleX: 1, duration: 1.4 }).to(nodes, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12 }, "-=1.0");
    }, root);

    return () => ctx.revert();
  }, [phases]);

  return (
    <div
      ref={root}
      style={{
        background: "#fff",
        border: "1px solid var(--hairline)",
        borderRadius: 24,
        padding: "36px 40px 28px",
      }}
    >
      <div style={{ position: "relative", height: 56 }}>
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 0,
            right: 0,
            height: 8,
            background: "var(--purple-tint)",
            borderRadius: 99,
          }}
        />
        <div
          className="tl-fill"
          style={{
            position: "absolute",
            top: 24,
            left: 0,
            width: "100%",
            height: 8,
            background: "linear-gradient(90deg, var(--purple), var(--purple-2))",
            borderRadius: 99,
          }}
        />

        {phases.map((p, i) => {
          const isFirst = i === 0;
          const isLast = i === phases.length - 1;
          const left = isFirst ? "4px" : isLast ? "calc(100% - 24px)" : `calc(${p.pct}% - 12px)`;
          return (
            <div
              key={i}
              className="tl-node"
              style={{
                position: "absolute",
                left,
                top: 14,
                width: 28,
                height: 28,
                borderRadius: 99,
                background: "#fff",
                border: "3px solid var(--purple)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--purple)",
                fontFamily: "var(--mono)",
                zIndex: 2,
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>

      {/* Labels: absolutely positioned on desktop, flex row on mobile */}
      <div className="tl-labels" style={{ position: "relative", height: 56, marginTop: 12 }}>
        {phases.map((p, i) => {
          const isFirst = i === 0;
          const isLast = i === phases.length - 1;
          const left = isFirst ? "4px" : isLast ? "calc(100% - 24px)" : `calc(${p.pct}% - 12px)`;
          const transform = isFirst ? "translateX(0)" : isLast ? "translateX(-100%) translateX(28px)" : "translateX(-50%) translateX(14px)";
          const textAlign = isFirst ? ("left" as const) : isLast ? ("right" as const) : ("center" as const);
          return (
            <div
              key={i}
              className="tl-label"
              style={{
                position: "absolute",
                top: 0,
                left,
                transform,
                width: 160,
                textAlign,
              }}
            >
              <p style={{ fontSize: 11, color: "var(--purple)", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
                {p.week}
              </p>
              <p style={{ fontSize: 14, color: "var(--ink)", margin: "4px 0 0", fontWeight: 700, letterSpacing: "-0.005em", lineHeight: 1.25 }}>{p.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
