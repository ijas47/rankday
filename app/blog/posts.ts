import type { BlogPostMeta } from "@/components/blog-post-layout";

export const posts: BlogPostMeta[] = [
  {
    slug: "seo-vs-aeo-vs-geo",
    title: "SEO vs AEO vs GEO: what's the difference, and why all three matter",
    description: "SEO ranks you on Google. AEO gets you cited by ChatGPT and Perplexity. GEO optimises for generative AI search. This is the full breakdown of how the three disciplines differ, where they overlap, and why a business that only does SEO in 2026 is losing buyers to competitors who do all three.",
    publishedAt: "2026-05-22",
    readTime: "9 min",
    category: "AEO / GEO",
  },
  {
    slug: "how-long-does-seo-take",
    title: "How long does SEO take to work? Honest timelines for 2026",
    description: "Most SEO agencies will not give you a straight answer on timelines. Here is one. With a clean site, focused content, and scoped keywords, top 3 rankings are possible in 90 days. Competitive terms take longer. Here is the breakdown by domain age, competition level, and budget.",
    publishedAt: "2026-05-22",
    readTime: "8 min",
    category: "SEO",
  },
  {
    slug: "how-much-does-seo-cost",
    title: "How much does SEO cost in 2026? Every pricing model explained",
    description: "SEO pricing ranges from $300 monthly retainers to $50,000 enterprise contracts. The price has almost nothing to do with the results. Here is what each pricing model actually buys you, and how to know when you are overpaying.",
    publishedAt: "2026-05-22",
    readTime: "10 min",
    category: "Agency",
  },
  {
    slug: "how-to-choose-an-seo-agency",
    title: "How to choose an SEO agency: 12 questions to ask before you sign",
    description: "Most SEO agencies will not survive your second meeting if you ask the right questions. Here are the 12 questions that separate agencies that deliver from agencies that bill. Use these in your shortlist calls.",
    publishedAt: "2026-05-22",
    readTime: "9 min",
    category: "Agency",
  },
  {
    slug: "what-is-geo-generative-engine-optimization",
    title: "What is GEO (Generative Engine Optimization)?",
    description: "GEO is the practice of optimising content so generative AI engines pull from it when answering user questions. It overlaps with AEO but focuses specifically on the generative aspect: how AI engines compose answers from your content, not just whether they cite you.",
    publishedAt: "2026-05-22",
    readTime: "7 min",
    category: "AEO / GEO",
  },
  {
    slug: "will-ai-replace-google-search",
    title: "Will AI replace Google search? The honest answer for 2026",
    description: "AI assistants now handle queries Google used to dominate. But Google is also embedding AI directly into search. Here is what the data actually shows about the shift, what it means for your traffic, and how to adapt before your competitors do.",
    publishedAt: "2026-05-22",
    readTime: "8 min",
    category: "AEO / GEO",
  },
  {
    slug: "why-isnt-my-website-ranking-on-google",
    title: "Why isn't my website ranking on Google? 9 most common reasons",
    description: "If your business is not on the first page for the searches your buyers run, it is almost always one of these nine reasons. Most are fixable in under 30 days. Here is the diagnostic order.",
    publishedAt: "2026-05-22",
    readTime: "9 min",
    category: "SEO",
  },
  {
    slug: "do-i-need-a-new-website-for-seo",
    title: "Do I need a new website for SEO? When to rebuild vs optimise",
    description: "A new website is one of the fastest ways to fix bad SEO, but it is also one of the most expensive mistakes if your existing site is fundamentally fine. Here is how to tell which side you are on, and what to do about it.",
    publishedAt: "2026-05-22",
    readTime: "7 min",
    category: "Web Design",
  },
];

export function getPost(slug: string): BlogPostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}
