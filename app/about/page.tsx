import type { Metadata } from "next";
import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "About Rankday. Founded by Ijas Abdulla.",
  description:
    "Rankday is a 90-day SEO and AI citation agency built by Ijas Abdulla after 16 years of B2B go-to-market work across adtech, proptech, SaaS, and AI. Small team. Direct contact. One price.",
};

export default function AboutPage() {
  return <AboutClient />;
}
