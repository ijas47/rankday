"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";

type Phase = { week: string; pct: number; title: string };

export function Timeline({ phases }: { phases: Phase[] }) {
  const reduce = useReducedMotion();

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--hairline)",
        borderRadius: 24,
        padding: "36px 40px 28px",
        boxShadow: "var(--shadow-sm)",
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
        <motion.div
          className="tl-fill"
          style={{
            position: "absolute",
            top: 24,
            left: 0,
            width: "100%",
            height: 8,
            background: "linear-gradient(90deg, var(--purple), var(--purple-2))",
            borderRadius: 99,
            transformOrigin: "left center",
          }}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: easeOut }}
        />

        {phases.map((p, i) => {
          const isFirst = i === 0;
          const isLast = i === phases.length - 1;
          const left = isFirst ? "4px" : isLast ? "calc(100% - 24px)" : `calc(${p.pct}% - 12px)`;
          return (
            <motion.div
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
              initial={reduce ? false : { scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.1, ease: easeOut }}
            >
              {i + 1}
            </motion.div>
          );
        })}
      </div>

      <div className="tl-labels" style={{ position: "relative", height: 56, marginTop: 12 }}>
        {phases.map((p, i) => {
          const isFirst = i === 0;
          const isLast = i === phases.length - 1;
          const left = isFirst ? "4px" : isLast ? "calc(100% - 24px)" : `calc(${p.pct}% - 12px)`;
          const transform = isFirst
            ? "translateX(0)"
            : isLast
              ? "translateX(-100%) translateX(28px)"
              : "translateX(-50%) translateX(14px)";
          const textAlign = isFirst ? ("left" as const) : isLast ? ("right" as const) : ("center" as const);
          return (
            <motion.div
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
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.25 + i * 0.08, ease: easeOut }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "var(--purple)",
                  margin: 0,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontFamily: "var(--mono)",
                }}
              >
                {p.week}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--ink)",
                  margin: "4px 0 0",
                  fontWeight: 700,
                  letterSpacing: "-0.005em",
                  lineHeight: 1.25,
                }}
              >
                {p.title}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
