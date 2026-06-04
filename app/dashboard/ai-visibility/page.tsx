import type { Metadata } from "next";
import { AiVisibilityLogin } from "./visibility-login";

export const metadata: Metadata = {
  title: "AI Visibility Dashboard",
  robots: { index: false, follow: false },
};

export default function AiVisibilityDashboardLoginPage() {
  return <AiVisibilityLogin />;
}
