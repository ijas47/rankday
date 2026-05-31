import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { posts } from "./posts";

export const metadata: Metadata = pageMeta({
  title: "Blog. SEO, AEO, GEO, and Website Insights from rankday.",
  description:
    "Practical, honest writing on SEO, Answer Engine Optimization, Generative Engine Optimization, and the website rebuild work that actually moves rankings. From rankday, the 90-day SEO and AI citation agency.",
  path: "/blog",
});

const categoryColors: Record<string, string> = {
  SEO: "pink",
  "AEO / GEO": "peach",
  "Web Design": "yellow",
  Agency: "mint",
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogIndexPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">rankday Blog</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            How to <span className="it">actually</span> rank on Google and get cited by AI.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            Honest writing on SEO, AEO, and the website work that drives rankings. The playbook rankday uses with every client, written down.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`card card-${categoryColors[post.category] || "lilac"}`}
                style={{
                  padding: 32,
                  textDecoration: "none",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 24,
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--purple)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>·</span>
                    <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      {formatDate(post.publishedAt)}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>·</span>
                    <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.3 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, margin: "12px 0 0", maxWidth: 720 }}>
                    {post.description}
                  </p>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", color: "var(--purple)", flexShrink: 0 }}>
                  <Icon.Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
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
