import Link from "next/link";
import { Icon } from "@/components/icons";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  category: "SEO" | "AEO / GEO" | "Web Design" | "Agency";
};

export function BlogArticleSchema({ meta }: { meta: BlogPostMeta }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt || meta.publishedAt,
    author: {
      "@type": "Person",
      name: "Ijas Abdulla",
    },
    publisher: {
      "@type": "Organization",
      name: "rankday",
      url: "https://www.rank-day.com",
    },
    mainEntityOfPage: `https://www.rank-day.com/blog/${meta.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

export function BlogPostLayout({
  meta,
  children,
}: {
  meta: BlogPostMeta;
  children: React.ReactNode;
}) {
  return (
    <div className="page-enter">
      <BlogArticleSchema meta={meta} />

      <section style={{ padding: "32px 0 32px" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)", textDecoration: "none", marginBottom: 24 }}>
            ← All posts
          </Link>
          <span className="eyebrow">{meta.category}</span>
          <h1 className="h-display" data-reveal-text style={{ marginTop: 16, fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-0.025em" }}>
            {meta.title}
          </h1>
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 20, fontSize: 13, color: "var(--muted)", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              By Ijas Abdulla
            </span>
            <span>·</span>
            <span style={{ fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {formatDate(meta.publishedAt)}
            </span>
            <span>·</span>
            <span style={{ fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {meta.readTime} read
            </span>
          </div>
        </div>
      </section>

      <article style={{ padding: "16px 0 64px" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="blog-content">{children}</div>
        </div>
      </article>

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0, maxWidth: 1080 }}>
          <div data-reveal className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}>
              Ready to <span className="serif">rank?</span>
            </h2>
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-light">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }).toUpperCase();
}

// Markdown-style inline components for blog content
export const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 22px" }}>{children}</p>
);

export const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: "clamp(22px, 2.6vw, 30px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em", margin: "44px 0 18px", lineHeight: 1.25 }}>{children}</h2>
);

export const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.015em", margin: "32px 0 14px", lineHeight: 1.3 }}>{children}</h3>
);

export const UL = ({ children }: { children: React.ReactNode }) => (
  <ul style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 22px", paddingLeft: 24 }}>{children}</ul>
);

export const OL = ({ children }: { children: React.ReactNode }) => (
  <ol style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 22px", paddingLeft: 24 }}>{children}</ol>
);

export const LI = ({ children }: { children: React.ReactNode }) => (
  <li style={{ margin: "0 0 10px" }}>{children}</li>
);

export const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: "var(--ink)", fontWeight: 700 }}>{children}</strong>
);

export const Callout = ({ children, tone = "lilac" }: { children: React.ReactNode; tone?: "lilac" | "pink" | "peach" | "mint" }) => (
  <div className={`card card-${tone}`} style={{ padding: "24px 28px", margin: "28px 0", fontSize: 16, lineHeight: 1.55, color: "var(--ink)", fontWeight: 500 }}>
    {children}
  </div>
);

export const Quote = ({ children }: { children: React.ReactNode }) => (
  <blockquote style={{
    fontFamily: "var(--serif, 'Instrument Serif', serif)",
    fontStyle: "italic",
    fontSize: "clamp(20px, 2.4vw, 28px)",
    lineHeight: 1.4,
    color: "var(--purple)",
    margin: "32px 0",
    padding: "0 0 0 24px",
    borderLeft: "3px solid var(--purple)",
    letterSpacing: "-0.01em",
  }}>
    {children}
  </blockquote>
);

export const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} style={{ color: "var(--purple)", textDecoration: "underline", textDecorationThickness: 1, textUnderlineOffset: 3 }}>
    {children}
  </Link>
);
