"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Marquee({ items, speed = 40 }: { items: string[]; speed?: number }) {
  const reduce = useReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div className="marquee-band" aria-hidden={!reduce}>
      <motion.div
        className="marquee-track"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduce
            ? undefined
            : {
                duration: speed,
                ease: "linear",
                repeat: Infinity,
              }
        }
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-item">
            {item}
            <span className="marquee-sep" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
