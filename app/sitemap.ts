import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rank-day.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/who-its-for`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/what-is-aeo`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/get-cited-by-chatgpt`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/seo-agency-dubai`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
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
  ];
}
