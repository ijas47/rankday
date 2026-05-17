"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Icon } from "@/components/icons";

const faqs = [
  {
    q: "Why 90 days? Most SEO agencies say it takes 6 months or more.",
    a: "Most agencies are billing you for 6 months. With a clean website rebuild, proper technical setup, focused content, and a scoped keyword list we both agree on, 90 days is enough. We've systemized the playbook.",
  },
  {
    q: 'What does "90% of keywords" mean exactly?',
    a: "In week 1, we research your category and agree on a list of target keywords. The list is fixed in writing before work starts. You're paying for top 3 rankings on 90% of that list, not 90% of every keyword you can think of. This protects both of us.",
  },
  {
    q: "What if I'm not ranking for 90% by day 90?",
    a: "We keep working at no extra cost until you are. This is why we scope keywords carefully in week 1. We don't accept keywords we can't deliver.",
  },
  {
    q: "What is AEO and why does it matter?",
    a: 'AEO stands for Answer Engine Optimization. It\'s the discipline of making your business cite-able by ChatGPT, Perplexity, Claude, Google AI Overviews, and other AI tools. When someone asks "what are the best dental clinics in Dubai" or "which CRM should a small SaaS use," LLMs answer with specific business names. AEO is how you become one of those names. By 2026, more buyers research through AI than through Google for many categories. Ranking on Google alone isn\'t enough anymore.',
  },
  {
    q: "How do you actually get a business cited by ChatGPT or Perplexity?",
    a: "LLMs pull from authoritative sources, structured content, and consistent third-party mentions. We structure your site for citation (clear answers, schema, source data), get you placed in the comparison sites and directories LLMs pull from, and earn mentions in industry publications. It's not magic, it's just hard work most agencies aren't doing yet.",
  },
  {
    q: "Can I keep my existing website?",
    a: "Sometimes. If your site has decent technical foundations, we'll reposition and restructure it. If it doesn't, we rebuild. We tell you which in week 1, no upsell game.",
  },
  {
    q: "Who owns the website?",
    a: "You do. Domain, content, code. All yours. If you leave us, you take everything.",
  },
  {
    q: "Do I need to write the content?",
    a: "No. We write it. You approve it.",
  },
  {
    q: "What CMS do you use?",
    a: "Next.js for the site, Sanity for the content. You get a clean editor login if you ever want to update anything. Hosted on Vercel for speed.",
  },
  {
    q: "Can you guarantee number 1 on Google?",
    a: "No, and run from anyone who does. We guarantee top 3 for 90% of your agreed keywords, which is where 75% of clicks happen anyway.",
  },
  {
    q: "What if my market is super competitive?",
    a: 'We tell you in week 1 if it is. Sometimes the answer is "this keyword needs 6 months, here\'s a faster path." We\'d rather lose the deal than over-promise.',
  },
  {
    q: "Why is this cheaper than agencies quoting $15,000+?",
    a: "We're a small team. No account managers, no 40-slide reports, no sales staff. The price reflects the work, not the overhead.",
  },
  {
    q: "What languages do you work in?",
    a: "English primarily. Arabic available for UAE and GCC clients at no extra cost.",
  },
  {
    q: "How do I get started?",
    a: "WhatsApp, email, or book a 15-minute call. Whichever is easiest. We respond within a few hours during business days.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <h1 className="h-display" data-reveal style={{ maxWidth: 1100, margin: "0 auto" }}>
            Questions buyers <span className="it">actually</span> ask.
          </h1>
        </div>
      </section>

      <section style={{ padding: "32px 0 64px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2.4fr", gap: 32, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <div data-reveal className="card card-lilac" style={{ padding: 28 }}>
                <p style={{ fontSize: 17, color: "var(--ink)", margin: 0, lineHeight: 1.45, fontWeight: 600, letterSpacing: "-0.005em" }}>
                  Got a different one? <span className="serif" style={{ color: "var(--purple)" }}>Send us a WhatsApp.</span>
                </p>
                <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
                  <button className="btn btn-primary btn-sm">
                    <Icon.WhatsApp /> WhatsApp
                  </button>
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
              WhatsApp, email, or book a 15-minute call. Whichever is easiest. We respond within a few hours during business days.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
              <button className="btn btn-primary">
                WhatsApp{" "}
                <span className="btn-icon">
                  <Icon.WhatsApp />
                </span>
              </button>
              <button className="btn btn-light">
                <Icon.Mail /> Email
              </button>
              <button className="btn btn-light">
                <Icon.Phone /> Book a call
              </button>
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
