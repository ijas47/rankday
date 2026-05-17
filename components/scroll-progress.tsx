"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!fillRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(fillRef.current, { scaleX: 0, transformOrigin: "left center" });
      if (reduce) {
        gsap.set(fillRef.current, { scaleX: 1 });
        return;
      }
      gsap.to(fillRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: () => document.documentElement.scrollHeight - window.innerHeight,
          scrub: 0.25,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 100,
        pointerEvents: "none",
        background: "rgba(74,43,240,0.08)",
      }}
    >
      <div
        ref={fillRef}
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, var(--purple), #ff8a4c, var(--purple-2))",
          backgroundSize: "200% 100%",
          animation: "progressShine 4s linear infinite",
        }}
      />
    </div>
  );
}
