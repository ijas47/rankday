"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Icon } from "@/components/icons";
import { faqs } from "./faq-data";

export function FAQClient() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 1100, margin: "0 auto" }}>
            Questions buyers <span className="it">actually</span> ask.
          </h1>
        </div>
      </section>

      <section style={{ padding: "32px 0 64px" }}>
        <div className="container">
          <div className="r-faq">
            <div className="sticky-aside">
              <div data-reveal className="card card-lilac" style={{ padding: 28 }}>
                <p style={{ fontSize: 17, color: "var(--ink)", margin: 0, lineHeight: 1.45, fontWeight: 600, letterSpacing: "-0.005em" }}>
                  Got a different one? <span className="serif" style={{ color: "var(--purple)" }}>Send us a WhatsApp.</span>
                </p>
                <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
                  <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
                    <Icon.WhatsApp /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div data-reveal className="card" style={{ padding: 8 }}>
              {faqs.map((f, i) => (
                <FAQItem
                  key={i}
                  idx={i}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                  q={f.q}
                  a={f.a}
                  last={i === faqs.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 0 64px" }}>
        <div className="container">
          <div data-reveal className="card card-mint" style={{ padding: 56, textAlign: "center" }}>
            <h2 className="h1">
              How do I get <span className="it">started?</span>
            </h2>
            <p className="body lg" style={{ marginTop: 20, maxWidth: 600, marginLeft: "auto", marginRight: "auto", color: "var(--ink-2)" }}>
              WhatsApp or email. Whichever is easiest. We respond within a few hours during business days.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
              <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                WhatsApp{" "}
                <span className="btn-icon">
                  <Icon.WhatsApp />
                </span>
              </a>
              <a className="btn btn-light" href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer">
                <Icon.WhatsApp /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({
  idx,
  q,
  a,
  isOpen,
  onToggle,
  last,
}: {
  idx: number;
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  last: boolean;
}) {
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    const el = bodyRef.current;
    if (isOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.32,
          ease: "power2.out",
          onComplete: () => {
            el.style.height = "auto";
          },
        }
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.22, ease: "power2.in" });
    }
  }, [isOpen]);

  return (
    <div style={{ borderBottom: last ? "none" : "1px solid var(--hairline)", padding: "20px 24px" }}>
      <button
        onClick={onToggle}
        style={{
          all: "unset",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              color: isOpen ? "var(--purple)" : "var(--muted-2)",
              flexShrink: 0,
              transition: "color .18s var(--ease)",
            }}
          >
            / {String(idx + 1).padStart(2, "0")}
          </span>
          <h3
            style={{
              fontSize: "clamp(17px, 1.6vw, 21px)",
              color: "var(--ink)",
              fontWeight: 600,
              margin: 0,
              letterSpacing: "-0.01em",
              lineHeight: 1.35,
              textAlign: "left",
            }}
          >
            {q}
          </h3>
        </div>
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: 99,
            border: `1px solid ${isOpen ? "var(--purple)" : "var(--hairline)"}`,
            background: isOpen ? "var(--purple)" : "transparent",
            color: isOpen ? "#fff" : "var(--ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all .18s var(--ease)",
          }}
        >
          {isOpen ? <Icon.Minus /> : <Icon.Plus />}
        </span>
      </button>
      <div ref={bodyRef} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
        <div style={{ marginTop: 16, marginLeft: 48, maxWidth: 800, paddingBottom: 4 }}>
          <p className="body lg" style={{ color: "var(--ink-2)" }}>{a}</p>
        </div>
      </div>
    </div>
  );
}
