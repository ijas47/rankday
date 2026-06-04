import type { Metadata } from "next";
import { AiVisibilityAdmin } from "./visibility-admin";

export const metadata: Metadata = {
  title: "AI Visibility Admin",
  robots: { index: false, follow: false },
};

export default function AiVisibilityAdminPage() {
  return <AiVisibilityAdmin />;
}
