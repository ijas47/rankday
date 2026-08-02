"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/icons";

const stats: Array<{ num: string; unit: string; label: string }> = [
  { num: "16", unit: "years", label: "Of B2B go-to-market work behind the playbook" },
  { num: "8", unit: "markets", label: "UAE, UK, US, Canada, Australia, Singapore, Ireland, NZ" },
  { num: "90", unit: "days", label: "From kickoff to top 3 rankings and AI citations" },
  { num: "8", unit: "/mo", label: "Max new clients per month, so the timeline holds" },
];

const beliefs: Array<[string, string]> = [
  ["The website is the easy part. The ranking and the citations are the work.", "pink"],
  ["90 days is enough if the work starts on day 1 and the scope is honest.", "peach"],
  ["Reports are for agencies. Results are for clients.", "yellow"],
  ["One price, one timeline, no add-ons.", "mint"],
  ["If you're not ranking, we haven't finished.", "lilac"],
];

function StatNum({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target]);

  return (
    <span
      ref={ref}
      className="stat-num"
      style={{ fontSize: "clamp(40px, 4.8vw, 64px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1, fontFamily: "var(--display)" }}
    >
      {value}
    </span>
  );
}

export function AboutClient() {
  return (
    <div className="page-enter">
      <section style={{ padding: "56px 0 72px" }}>
        <div className="container">
          <div className="r-about">
            <div data-reveal>
              <h1 className="h-display" style={{ fontSize: "clamp(40px, 5vw, 78px)" }}>
                The website is the <span className="it">easy</span> part.
              </h1>
              <p className="lede" style={{ marginTop: 26, color: "var(--ink-2)" }}>
                rankday was started by <strong>Ijas Abdulla</strong> after 16 years building go-to-market
                machines for B2B companies across adtech, proptech, SaaS and AI.
              </p>
              <p className="body lg" style={{ marginTop: 18 }}>
                The pattern never changed: strong businesses with a weak online presence, paying agencies
                that took six months to deliver what should take three.
              </p>
              <p style={{ marginTop: 26, fontSize: "clamp(19px, 2.1vw, 26px)", lineHeight: 1.4, color: "var(--ink)", letterSpacing: "-0.015em", fontWeight: 600, maxWidth: "36ch" }}>
                The game has changed. Buyers don&apos;t just Google anymore. They ask{" "}
                <span className="serif" style={{ color: "var(--purple)" }}>ChatGPT, Perplexity and Claude.</span>{" "}
                rankday exists to get your business cited by both.
              </p>
            </div>

            <div data-reveal data-reveal-delay="0.1" className="about-portrait">
              <Image
                src="/ijas.jpg"
                alt="Ijas Abdulla, founder of rankday"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
              <div className="about-portrait-tag">
                <span>Founder</span>
                Ijas Abdulla
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 0 64px" }}>
        <div className="container">
          <div className="card r-stats">
            {stats.map((s, i) => (
              <div key={s.label} style={{ padding: "0 28px", borderLeft: i > 0 ? "1px solid var(--hairline)" : "none" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <StatNum target={Number(s.num)} />
                  <span style={{ fontSize: 16, color: "var(--purple)", fontWeight: 600, letterSpacing: "-0.01em" }}>{s.unit}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", margin: "12px 0 0", lineHeight: 1.4, maxWidth: 200 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">How we work.</h2>
          </div>

          <div data-reveal-stagger className="r-2">
            <div className="card card-pink" style={{ padding: 40, minHeight: 220 }}>
              <p className="kicker">Our team</p>
              <p style={{ fontSize: 21, color: "var(--ink)", lineHeight: 1.4, letterSpacing: "-0.015em", margin: "16px 0 0", fontWeight: 600 }}>
                Small team. <span className="serif" style={{ color: "var(--purple)" }}>Direct contact</span> with the people doing the work, not account managers. Async by default, calls only when needed.
              </p>
            </div>
            <div className="card card-purple" style={{ padding: 40, minHeight: 220 }}>
              <p className="kicker" style={{ color: "rgba(255,255,255,0.7)" }}>Our cap</p>
              <p style={{ fontSize: 21, color: "#fff", lineHeight: 1.4, letterSpacing: "-0.015em", margin: "16px 0 0", fontWeight: 600 }}>
                We take a maximum of <span className="serif">8 new clients per month</span> so we can guarantee the timeline. If we&apos;re full, you join the waitlist or get pointed to someone we trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">What we believe.</h2>
          </div>

          <ol data-reveal-stagger className="belief-list">
            {beliefs.map(([b], i) => (
              <li key={b} className="belief-item">
                <span className="belief-k">{String(i + 1).padStart(2, "0")}</span>
                <p className="belief-text">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}>
              <span className="serif">Start</span> your 90 days.
            </h2>
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-light">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
