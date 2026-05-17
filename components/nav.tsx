"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Icon } from "./icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/who-its-for", label: "Who it's for" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const el = navRef.current;
      if (!el) return;
      el.style.boxShadow = y > 8 ? "0 12px 36px rgba(74,43,240,0.10)" : "0 8px 30px rgba(74,43,240,0.06)";
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="nav-wrap">
      <nav className="nav container" ref={navRef}>
        <Link className="nav-logo" href="/">
          <span className="nav-logo-mark">R</span>
          <span>rankday.</span>
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
          <Link href="/pricing" className="btn btn-primary btn-sm">
            Start your 90 days
            <span className="btn-icon">
              <Icon.Arrow />
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
