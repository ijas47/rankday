"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { Icon } from "./icons";
import { easeDrawer, easeOut } from "@/lib/motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/results", label: "Results" },
  { href: "/pricing", label: "Pricing" },
  { href: "/partners", label: "Partners" },
  { href: "/tools", label: "Free Tools" },
  { href: "/industries", label: "Industries" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setElevated(y > 10);
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <div className="nav-wrap">
        <motion.nav
          className="nav container"
          style={{
            boxShadow: elevated
              ? "0 14px 40px rgba(74,43,240,0.12)"
              : "0 8px 28px rgba(74,43,240,0.06)",
          }}
          initial={reduce ? false : { y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <Link className="nav-logo" href="/" aria-label="rankday home">
            <span className="logo-rank">rank</span>
            <span className="logo-day">day</span>
            <span className="logo-dot">.</span>
          </Link>

          <div className="nav-links">
            {links.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link key={l.href} href={l.href} className={active ? "active" : ""}>
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="nav-right">
            <a
              href="https://wa.me/971565981209"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm nav-cta"
            >
              Start your 90 days
              <span className="btn-icon">
                <Icon.Arrow />
              </span>
            </a>
            <button
              className="nav-burger"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={menuOpen ? "burger-line open-1" : "burger-line"} />
              <span className={menuOpen ? "burger-line open-2" : "burger-line"} />
              <span className={menuOpen ? "burger-line open-3" : "burger-line"} />
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="mobile-sheet open"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: easeOut }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="mobile-sheet-inner"
              initial={reduce ? false : { opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: easeDrawer }}
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((l, i) => {
                const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <motion.div
                    key={l.href}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.25, ease: easeOut }}
                  >
                    <Link
                      href={l.href}
                      className={`mobile-sheet-link ${active ? "active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {l.label}
                      <span style={{ display: "inline-flex", color: "var(--purple)" }}>
                        <Icon.Arrow style={{ width: 18, height: 18 }} />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
              <a
                href="https://wa.me/971565981209"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: 16, width: "100%", justifyContent: "space-between" }}
                onClick={() => setMenuOpen(false)}
              >
                Start your 90 days
                <span className="btn-icon">
                  <Icon.Arrow />
                </span>
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
