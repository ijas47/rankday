import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { AboutClient } from "./about-client";

export const metadata: Metadata = pageMeta({
  title: "About rankday. Founded by Ijas Abdulla.",
  description:
    "rankday is a 90-day SEO and AI citation agency built by Ijas Abdulla after 16 years of B2B go-to-market work across adtech, proptech, SaaS, and AI. Small team. Direct contact. One price.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutClient />;
}
