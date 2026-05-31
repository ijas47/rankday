"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/partners", label: "Partners" },
  { href: "/tools", label: "Free Tools" },
  { href: "/industries", label: "Industries" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const el = navRef.current;
      if (!el) return;
      el.style.boxShadow = y > 8 ? "0 12px 36px rgba(74,43,240,0.10)" : "0 8px 30px rgba(74,43,240,0.06)";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll while mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  return (
    <>
      <div className="nav-wrap">
        <nav className="nav container" ref={navRef}>
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
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm nav-cta">
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
        </nav>
      </div>

      {/* Mobile menu sheet */}
      <div className={`mobile-sheet ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
        <div className="mobile-sheet-inner" onClick={(e) => e.stopPropagation()}>
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`mobile-sheet-link ${active ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
                <span style={{ display: "inline-flex", color: "var(--purple)" }}>
                  <Icon.Arrow style={{ width: 18, height: 18 }} />
                </span>
              </Link>
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
        </div>
      </div>
    </>
  );
}
