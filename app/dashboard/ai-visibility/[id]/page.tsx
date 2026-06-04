import type { Metadata } from "next";
import { AiVisibilityDashboard } from "./visibility-dashboard";

export const metadata: Metadata = {
  title: "AI Visibility Report",
  robots: { index: false, follow: false },
};

export default function AiVisibilityProjectPage({ params }: { params: { id: string } }) {
  return <AiVisibilityDashboard projectId={params.id} />;
}
