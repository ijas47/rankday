"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      className="scroll-progress-track"
      aria-hidden
    >
      <motion.div
        className="scroll-progress-fill"
        style={{ scaleX: reduce ? 1 : scaleX, transformOrigin: "0% 50%" }}
      />
    </div>
  );
}
