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

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set("[data-reveal], [data-reveal-stagger] > *, [data-reveal-text]", {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        clearProps: "all",
      });
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

      // Headline reveal. Single-element entrance with a slight scale + blur clear.
      gsap.utils.toArray<HTMLElement>("[data-reveal-text]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.95;

        const from = { y: 40, opacity: 0, scale: 0.96, filter: "blur(6px)" };
        const to = {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
        };

        if (inView) {
          gsap.fromTo(el, from, { ...to, delay: 0.1 });
        } else {
          gsap.fromTo(el, from, {
            ...to,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        }
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
