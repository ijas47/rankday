import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ToolsClient } from "./tools-client";

export const metadata: Metadata = pageMeta({
  title: "Free Tools. Check Your AI Search Visibility.",
  description:
    "Free tools from rankday: AI Visibility Report (ChatGPT, Perplexity, Gemini), AEO Score, website SEO audit, store audit, and llms.txt generator. No signup.",
  path: "/tools",
});

export default function ToolsPage() {
  return <ToolsClient />;
}
