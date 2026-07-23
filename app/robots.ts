import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User"], allow: "/" },
      { userAgent: ["ClaudeBot", "anthropic-ai", "Claude-Web"], allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "Diffbot", allow: "/" },
    ],
    sitemap: "https://www.rank-day.com/sitemap.xml",
  };
}
