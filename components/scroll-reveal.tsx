"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Mounts once. On every route change it re-scans the DOM for elements with:
 *   data-reveal             fade + rise once when entering viewport
 *   data-reveal-stagger     same, but staggers direct children
 *   data-reveal-text        splits text into words and staggers them in
 *   data-reveal-y="40"      override rise distance
 *   data-reveal-delay="0.1" override start delay (seconds)
 *   data-float              gentle perpetual y-float (used on hero badges/sparkles)
 *   data-parallax="0.4"     subtle scroll-based parallax
 */

function splitWordsRecursive(parent: Element) {
  const fragments: Node[] = [];
  Array.from(parent.childNodes).forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent ?? "";
      const parts = text.split(/(\s+)/);
      parts.forEach((part) => {
        if (part === "") return;
        if (/^\s+$/.test(part)) {
          fragments.push(document.createTextNode(part));
        } else {
          const mask = document.createElement("span");
          mask.className = "word-mask";
          mask.style.display = "inline-block";
          mask.style.overflow = "hidden";
          mask.style.verticalAlign = "bottom";
          mask.style.paddingBottom = "0.15em";

          const inner = document.createElement("span");
          inner.className = "word-reveal";
          inner.style.display = "inline-block";
          inner.style.willChange = "transform, opacity";
          inner.textContent = part;

          mask.appendChild(inner);
          fragments.push(mask);
        }
      });
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as Element;
      splitWordsRecursive(el);
      fragments.push(el);
    } else {
      fragments.push(child);
    }
  });
  while (parent.firstChild) parent.removeChild(parent.firstChild);
  fragments.forEach((f) => parent.appendChild(f));
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set("[data-reveal], [data-reveal-stagger] > *, .word-reveal", { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const y = Number(el.dataset.revealY ?? 28);
        const delay = Number(el.dataset.revealDelay ?? 0);
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((wrap) => {
        const kids = Array.from(wrap.children) as HTMLElement[];
        const y = Number(wrap.dataset.revealY ?? 22);
        gsap.fromTo(
          kids,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-text]").forEach((el) => {
        if (el.dataset.revealSplit !== "true") {
          el.dataset.revealSplit = "true";
          splitWordsRecursive(el);
        }
        const words = el.querySelectorAll<HTMLElement>(".word-reveal");
        gsap.fromTo(
          words,
          { yPercent: 130, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.04,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
        const amp = Number(el.dataset.floatAmp ?? 8);
        const dur = Number(el.dataset.floatDur ?? 3.6);
        gsap.to(el, {
          y: `+=${amp}`,
          duration: dur,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.25,
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax ?? 0.2);
        gsap.to(el, {
          yPercent: -10 * speed,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 200);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
