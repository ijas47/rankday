import type { MetadataRoute } from "next";
import { posts } from "./blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rank-day.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/who-its-for`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/what-is-aeo`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/get-cited-by-chatgpt`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ai-visibility-tracker`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/seo-agency-dubai`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/best-seo-agency-dubai`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/best-web-design-agency-dubai`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/best-aeo-agency-dubai`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/best-geo-agency-dubai`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/seo-agency-uk`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/seo-agency-us`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/seo-for-saas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/seo-for-law-firms`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/seo-for-clinics`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/seo-for-plumbers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/seo-for-electricians`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/seo-for-contractors`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/seo-for-interior-designers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/seo-for-fit-out-companies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/seo-for-facilities-management`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/seo-for-maid-services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/website-seo-audit`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/store-seo-audit`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/aeo-score`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/llms-txt`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(`${post.updatedAt}T00:00:00`) : new Date(`${post.publishedAt}T00:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
