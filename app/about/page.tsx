"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@/components/icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

export default function AboutPage() {
  const statsRef = useRef<HTMLDivElement | null>(null);

  // Count-up numbers when stat band enters viewport
  useEffect(() => {
    if (!statsRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(statsRef.current.querySelectorAll(".stat-num")) as HTMLElement[];

    if (reduce) return;

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const target = Number(el.dataset.target);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 40px", textAlign: "center" }}>
        <div className="container">
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 1100, margin: "0 auto" }}>
            About <span className="it">Rankday.</span>
          </h1>
        </div>
      </section>

      <section style={{ padding: "32px 0 64px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "center" }}>
            <div data-reveal style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, height: 520, position: "relative" }}>
              <div className="arch arch-image" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                    padding: "10px 16px",
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 12,
                    whiteSpace: "nowrap",
                  }}
                >
                  <p style={{ fontSize: 10, color: "var(--muted)", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Founder</p>
                  <p style={{ fontSize: 14, color: "var(--ink)", margin: "3px 0 0", fontWeight: 700, letterSpacing: "-0.005em" }}>Ijas Abdulla</p>
                </div>
              </div>
              <div className="arch arch-image cool" style={{ marginTop: 56 }} data-parallax="0.4" />
            </div>

            <div data-reveal data-reveal-delay="0.1">
              <p className="body lg" style={{ color: "var(--ink-2)" }}>
                Rankday was started by <strong>Ijas Abdulla</strong> after 16 years of building go-to-market machines for B2B companies across adtech, proptech, SaaS, and AI.
              </p>
              <p className="body lg" style={{ marginTop: 22, color: "var(--ink-2)" }}>
                The pattern was always the same: great businesses with terrible online presence, paying agencies that took six months to deliver what should take three.
              </p>
              <p style={{ marginTop: 28, fontSize: "clamp(20px, 2.2vw, 28px)", lineHeight: 1.35, color: "var(--ink)", letterSpacing: "-0.015em", fontWeight: 700 }}>
                The game has changed. Buyers don&apos;t just Google anymore. They ask <span className="serif" style={{ color: "var(--purple)" }}>ChatGPT, Perplexity, and Claude.</span> Rankday exists to make sure your business gets cited by both.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 0 64px" }}>
        <div className="container">
          <div ref={statsRef} className="card" style={{ padding: "40px 48px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ padding: "0 28px", borderLeft: i > 0 ? "1px solid var(--hairline)" : "none" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span
                    className="stat-num"
                    data-target={s.num}
                    style={{ fontSize: "clamp(40px, 4.8vw, 64px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1 }}
                  >
                    0
                  </span>
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
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56, alignItems: "end", marginBottom: 40 }}>
            <h2 className="h1">How we work.</h2>
          </div>

          <div data-reveal-stagger style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
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
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56, alignItems: "end", marginBottom: 40 }}>
            <h2 className="h1">What we believe.</h2>
          </div>

          <div data-reveal-stagger style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {beliefs.map(([b, tone], i) => (
              <div
                key={b}
                className={`card card-${tone}`}
                style={{ padding: 28, minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink)", opacity: 0.5 }}>
                  / {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0, lineHeight: 1.35, letterSpacing: "-0.005em" }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple" style={{ padding: "56px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            <h2 className="h1" style={{ color: "#fff" }}>
              <span className="serif">Start</span> your 90 days.
            </h2>
            <Link href="/pricing" className="btn btn-light">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
