"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate } from "framer-motion";
import { easeOut } from "@/lib/motion";

/**
 * Site-wide motion layer (Framer Motion).
 * data-reveal | data-reveal-stagger | data-reveal-text | data-float
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    if (reduce) {
      document
        .querySelectorAll("[data-reveal], [data-reveal-stagger] > *, [data-reveal-text]")
        .forEach((el) => {
          const node = el as HTMLElement;
          node.style.opacity = "1";
          node.style.transform = "none";
          node.style.filter = "none";
        });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);

          if (el.hasAttribute("data-reveal-stagger")) {
            const kids = Array.from(el.children) as HTMLElement[];
            const y = Number(el.dataset.revealY ?? 18);
            kids.forEach((kid, i) => {
              kid.style.opacity = "0";
              kid.style.transform = `translateY(${y}px) scale(0.98)`;
              const controls = animate(
                kid,
                { opacity: 1, y: 0, scale: 1 },
                { duration: 0.48, ease: easeOut, delay: i * 0.055 }
              );
              cleanups.push(() => controls.stop());
            });
            return;
          }

          if (el.hasAttribute("data-reveal-text")) {
            el.style.opacity = "0";
            el.style.transform = "translateY(28px) scale(0.97)";
            el.style.filter = "blur(4px)";
            const controls = animate(
              el,
              { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
              { duration: 0.85, ease: easeOut, delay: 0.06 }
            );
            cleanups.push(() => controls.stop());
            return;
          }

          if (el.hasAttribute("data-reveal")) {
            const y = Number(el.dataset.revealY ?? 22);
            const delay = Number(el.dataset.revealDelay ?? 0);
            el.style.opacity = "0";
            el.style.transform = `translateY(${y}px) scale(0.98)`;
            const controls = animate(
              el,
              { opacity: 1, y: 0, scale: 1 },
              { duration: 0.55, ease: easeOut, delay }
            );
            cleanups.push(() => controls.stop());
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    document
      .querySelectorAll("[data-reveal], [data-reveal-stagger], [data-reveal-text]")
      .forEach((el) => {
        const node = el as HTMLElement;
        if (node.hasAttribute("data-reveal-stagger")) {
          Array.from(node.children).forEach((kid) => {
            (kid as HTMLElement).style.opacity = "0";
          });
        } else {
          node.style.opacity = "0";
        }
        observer.observe(node);
      });

    document.querySelectorAll<HTMLElement>("[data-float]").forEach((el, i) => {
      const amp = Number(el.dataset.floatAmp ?? 8);
      const dur = Number(el.dataset.floatDur ?? 3.4);
      const controls = animate(
        el,
        { y: [0, amp, 0] },
        {
          duration: dur,
          ease: "easeInOut",
          repeat: Infinity,
          delay: i * 0.2,
        }
      );
      cleanups.push(() => controls.stop());
    });

    cleanups.push(() => observer.disconnect());
    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
