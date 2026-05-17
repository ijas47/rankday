"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Marquee({ items, speed = 60 }: { items: string[]; speed?: number }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Track contains the items twice. Animate -50% so the loop is seamless.
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: speed,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [speed]);

  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
        padding: "24px 0",
        background: "rgba(255,255,255,0.45)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: 48,
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 48,
              fontSize: "clamp(28px, 3.6vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
            }}
          >
            {item}
            <span style={{ color: "var(--purple)", fontSize: "0.7em" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
