"use client";

import { useEffect } from "react";

const COOKIE_NAME = "rd_ref";
const COOKIE_DAYS = 90;
const WHATSAPP_HOST = "wa.me";

function writeCookie(code: string) {
  const maxAge = COOKIE_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(code)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function readCookie() {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  return match ? decodeURIComponent(match.split("=")[1] || "") : "";
}

function cleanCode(value: string | null) {
  if (!value) return "";
  return value.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 48);
}

export function ReferralAttribution() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = cleanCode(params.get("rd_ref") || params.get("ref"));

    if (code) {
      writeCookie(code);
      window.localStorage.setItem(COOKIE_NAME, code);
    }

    const stored = code || readCookie() || cleanCode(window.localStorage.getItem(COOKIE_NAME));
    if (!stored) return;

    const applyToLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>(`a[href*="${WHATSAPP_HOST}"]`).forEach((anchor) => {
        try {
          const url = new URL(anchor.href);
          const existing = url.searchParams.get("text");
          const referralText = `Referral code: ${stored}`;
          if (existing && !existing.includes(referralText)) {
            url.searchParams.set("text", `${existing} ${referralText}`);
          } else if (!existing) {
            url.searchParams.set("text", `Hi, I want to start my 90 days with rankday. ${referralText}`);
          }
          anchor.href = url.toString();
        } catch {
          // Leave malformed links unchanged.
        }
      });
    };

    applyToLinks();
    const observer = new MutationObserver(applyToLinks);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
