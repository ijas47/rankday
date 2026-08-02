"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, animate, useInView } from "framer-motion";
import { Icon } from "./icons";
import { easeOut } from "@/lib/motion";

const engines = ["ChatGPT", "Perplexity", "Claude", "Google AI", "Gemini"];

/** Counts a rank down to 1 — the one authored motion moment of the page. */
function RankClimb() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [rank, setRank] = useState(reduce ? 1 : 9);

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(9, 1, {
      duration: 1.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.5,
      onUpdate: (v) => setRank(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  const atTop = rank <= 3;

  return (
    <div className="rankboard" ref={ref}>
      <div className="rankboard-head">
        <span className="rankboard-q">
          <Icon.Search />
          plumber near me — Dubai
        </span>
        <span className="rankboard-live">
          <span className="rankboard-dot" /> live
        </span>
      </div>

      <div className="rankboard-rows">
        <div className={`rankrow you ${atTop ? "won" : ""}`}>
          <span className="rankrow-pos">{rank}</span>
          <div className="rankrow-body">
            <span className="rankrow-name">
              Your business
              {atTop && (
                <motion.span
                  className="rankrow-badge"
                  initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  Top 3
                </motion.span>
              )}
            </span>
            <span className="rankrow-meta">4.9 · 287 reviews · rank-day.com</span>
          </div>
          <span className="rankrow-trend">{atTop ? "▲ #1" : `▲ ${9 - rank}`}</span>
        </div>

        {[
          { pos: 2, name: "Riverside Plumbing", meta: "4.6 · 142 reviews" },
          { pos: 3, name: "Quick Fix Co.", meta: "4.5 · 96 reviews" },
        ].map((r) => (
          <div key={r.pos} className="rankrow ghost">
            <span className="rankrow-pos">{r.pos}</span>
            <div className="rankrow-body">
              <span className="rankrow-name">{r.name}</span>
              <span className="rankrow-meta">{r.meta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rankboard-cite">
        <span className="rankboard-cite-label">Cited in AI answers</span>
        <div className="rankboard-cite-engines">
          {engines.map((e) => (
            <span key={e} className="cite-chip">{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeHero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 18, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  return (
    <section className="home-hero">
      <div className="container">
        <div className="hero-grid">
          <motion.div variants={container} initial="hidden" animate="show" className="hero-copy">
            <motion.h1 variants={item} className="h-display hero-head">
              Rank top&nbsp;3.
              <br />
              Get cited by <span className="it">AI</span>.
              <br />
              In ninety&nbsp;days.
            </motion.h1>

            <motion.p variants={item} className="lede hero-lede">
              We rebuild your website, rank it in Google&rsquo;s top three for the keywords you name,
              and get your business cited by ChatGPT, Perplexity and Claude. One fixed price. No retainer.
            </motion.p>

            <motion.div variants={item} className="hero-actions">
              <a
                href="https://wa.me/971565981209"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Start your 90 days
                <span className="btn-icon"><Icon.Arrow /></span>
              </a>
              <Link className="btn btn-light" href="/how-it-works">
                How it works
                <span className="btn-icon"><Icon.Arrow /></span>
              </Link>
            </motion.div>

            <motion.dl variants={item} className="hero-proofbar">
              <div>
                <dt>Top&nbsp;3</dt>
                <dd>guaranteed on 90% of agreed keywords, or we keep working free</dd>
              </div>
              <div>
                <dt>1 price</dt>
                <dd>fixed for the full 90-day build — no monthly retainer</dd>
              </div>
              <div>
                <dt>16 yrs</dt>
                <dd>founder experience across SEO &amp; B2B growth</dd>
              </div>
            </motion.dl>
          </motion.div>

          <motion.div
            className="hero-artifact"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: easeOut, delay: 0.15 }}
          >
            <RankClimb />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
