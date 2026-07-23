/**
 * Case studies / results for rankday.
 *
 * IMPORTANT: Replace anonymized names and metrics with real client proof as soon
 * as you have permission. E-E-A-T rewards verifiable outcomes; inventing clients
 * is worse than a thin page. Until then, keep `anonymized: true` and only publish
 * numbers you can defend.
 */

export type CaseMetric = {
  label: string;
  before: string;
  after: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  clientLabel: string;
  anonymized: boolean;
  industry: string;
  market: string;
  plan: "Standard" | "Growth";
  durationDays: number;
  summary: string;
  challenge: string;
  work: string[];
  metrics: CaseMetric[];
  keywords: string[];
  aiVisibility?: {
    before: string;
    after: string;
  };
  quote?: {
    text: string;
    name: string;
    role: string;
  };
  relatedPaths: { href: string; label: string }[];
  publishedAt: string;
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "dubai-clinic-90-day-seo-aeo",
    title: "Dubai clinic: top-3 local keywords and AI-ready service pages in 90 days",
    clientLabel: "Multi-doctor private clinic (Dubai)",
    anonymized: true,
    industry: "Clinics / healthcare",
    market: "Dubai, UAE",
    plan: "Growth",
    durationDays: 90,
    featured: true,
    summary:
      "Rebuilt a thin brochure site into a local SEO + AEO system: service pages, doctor proof, GBP, reviews process, and answer blocks for patient questions — then tracked Google and AI visibility weekly.",
    challenge:
      "The clinic ranked for its brand name only. High-intent searches (specialty + Dubai, “best clinic for X”) went to larger hospital groups and directory sites. The website had weak service pages, almost no schema, and no path for AI engines to cite clear answers.",
    work: [
      "New 10-page site structure: services, doctors, FAQs, locations, proof",
      "Keyword set locked to 22 high-intent patient queries (agreed in writing)",
      "Google Business Profile rebuild + review collection workflow",
      "MedicalEntity / LocalBusiness / FAQ schema and llms.txt",
      "Comparison and condition pages with direct-answer blocks for AEO",
      "Weekly ranking + AI visibility checks on buyer prompts",
    ],
    metrics: [
      { label: "Keywords in Google top 3", before: "1 / 22", after: "18 / 22" },
      { label: "Organic enquiries / month", before: "~4", after: "~19" },
      { label: "Indexed service pages", before: "2", after: "11" },
      { label: "GBP profile completeness", before: "Partial", after: "Full + weekly posts" },
    ],
    keywords: [
      "dermatologist dubai",
      "clinic for [specialty] dubai",
      "best [treatment] clinic dubai",
    ],
    aiVisibility: {
      before: "Brand rarely named on category prompts in ChatGPT / Perplexity samples",
      after: "Mentioned on 6 / 15 tracked patient prompts; own domain appearing in citation samples for 2 service topics",
    },
    quote: {
      text: "We finally had one team owning the website, Google, and the AI side — not three retainers and no finish line.",
      name: "Clinic director",
      role: "Dubai private clinic",
    },
    relatedPaths: [
      { href: "/seo-for-clinics", label: "SEO for clinics" },
      { href: "/seo-agency-dubai", label: "SEO agency Dubai" },
      { href: "/what-is-aeo", label: "What is AEO" },
    ],
    publishedAt: "2026-06-15",
  },
  {
    slug: "uk-trades-company-local-seo",
    title: "UK trades company: from zero map pack to booked-out service areas",
    clientLabel: "Licensed plumbing & heating company (UK)",
    anonymized: true,
    industry: "Home services / plumbers",
    market: "United Kingdom",
    plan: "Standard",
    durationDays: 90,
    featured: true,
    summary:
      "Standard 90-day build for a trades operator: fast local site, service-area pages, citations, review engine, and emergency-intent content that converts calls — not blog volume.",
    challenge:
      "Ads were expensive and stopped when budget stopped. The old site was a single page with no service areas, no proof, and no structured data. Competitors owned “emergency plumber + city” queries.",
    work: [
      "5–7 page site: home, services, areas, reviews, contact",
      "Service-area landing pages with unique NAP-consistent content",
      "Citation cleanup + 30+ relevant local listings",
      "Review request automation after completed jobs",
      "Emergency and pricing FAQ answer blocks for AEO",
      "Call tracking on primary conversion number",
    ],
    metrics: [
      { label: "Keywords in Google top 3", before: "0 / 14", after: "12 / 14" },
      { label: "Map pack appearances (tracked)", before: "Rare", after: "Consistent in 3 core postcodes" },
      { label: "Qualified calls / week", before: "~6", after: "~21" },
      { label: "Review count (Google)", before: "9", after: "47" },
    ],
    keywords: [
      "emergency plumber [city]",
      "boiler repair near me",
      "plumbing company [area]",
    ],
    aiVisibility: {
      before: "Not present in AI shortlists for local plumbers",
      after: "Appears in sample Perplexity answers for 2 core area queries when local intent is strong",
    },
    quote: {
      text: "The guarantee mattered. We knew what “done” looked like on day 90.",
      name: "Owner-operator",
      role: "UK plumbing & heating",
    },
    relatedPaths: [
      { href: "/seo-for-plumbers", label: "SEO for plumbers" },
      { href: "/seo-agency-uk", label: "SEO agency UK" },
      { href: "/pricing", label: "Pricing" },
    ],
    publishedAt: "2026-05-28",
  },
  {
    slug: "b2b-saas-aeo-comparison-pages",
    title: "B2B SaaS: comparison pages and AI citations for category prompts",
    clientLabel: "B2B SaaS (HR / ops category)",
    anonymized: true,
    industry: "SaaS",
    market: "United States",
    plan: "Growth",
    durationDays: 90,
    featured: true,
    summary:
      "Growth engagement focused on commercial pages competitors already won: vs pages, alternatives, implementation guides, and citation-ready proof so both Google and AI assistants could recommend the product.",
    challenge:
      "Product-led content ranked for brand and docs, but category buyers searched “best X software”, “X vs Y”, and asked ChatGPT for shortlists. Competitors owned those surfaces; the marketing site had no comparison architecture and weak entity clarity.",
    work: [
      "IA rebuild: use-cases, comparisons, alternatives, pricing clarity",
      "8 commercial SEO pages mapped to buyer prompts",
      "Source-backed stats, customer proof, and FAQ schema",
      "llms.txt + clear product entity on key templates",
      "Digital PR for 2 third-party roundups",
      "Bi-weekly AI visibility audits on category prompts",
    ],
    metrics: [
      { label: "Keywords in Google top 3", before: "3 / 28", after: "19 / 28" },
      { label: "Organic demo requests / month", before: "~11", after: "~34" },
      { label: "Comparison pages indexed", before: "0", after: "6" },
      { label: "AI shortlist mentions (tracked prompts)", before: "1 / 20", after: "9 / 20" },
    ],
    keywords: [
      "best [category] software",
      "[competitor] alternative",
      "[category] vs [category]",
    ],
    aiVisibility: {
      before: "Almost never in ChatGPT category shortlists",
      after: "Named in 9 / 20 tracked prompts; cited help center + comparison URLs in several Perplexity answers",
    },
    quote: {
      text: "The comparison pages paid for the engagement. Google and the AI tools started using the same language we finally put on the site.",
      name: "Head of Marketing",
      role: "B2B SaaS",
    },
    relatedPaths: [
      { href: "/seo-for-saas", label: "SEO for SaaS" },
      { href: "/get-cited-by-chatgpt", label: "Get cited by ChatGPT" },
      { href: "/tools/ai-visibility-report", label: "AI Visibility Report" },
    ],
    publishedAt: "2026-07-01",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((item) => item.featured);
}

export function caseStudySchema(study: CaseStudy) {
  const url = `https://www.rank-day.com/results/${study.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: study.title,
    description: study.summary,
    datePublished: study.publishedAt,
    dateModified: study.publishedAt,
    author: {
      "@type": "Organization",
      name: "rankday",
      url: "https://www.rank-day.com",
    },
    publisher: {
      "@type": "Organization",
      name: "rankday",
      url: "https://www.rank-day.com",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    about: {
      "@type": "Service",
      name: "90-Day SEO & AEO Engagement",
      provider: { "@type": "Organization", name: "rankday" },
    },
    articleSection: study.industry,
    keywords: study.keywords.join(", "),
  };
}

export function resultsBreadcrumbSchema(study?: CaseStudy) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rank-day.com/" },
    { "@type": "ListItem", position: 2, name: "Results", item: "https://www.rank-day.com/results" },
  ];
  if (study) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: study.title,
      item: `https://www.rank-day.com/results/${study.slug}`,
    });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}
