import type { FaqItem } from "@/lib/seo";

/**
 * Server-rendered FAQ block. Renders the questions and answers into the HTML so
 * the text is visible to users and crawlers, and matches any FAQPage schema
 * built from the same items.
 */
export function FaqSection({
  heading = "Common questions.",
  intro,
  items,
}: {
  heading?: string;
  intro?: string;
  items: FaqItem[];
}) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div data-reveal className="r-header">
          <h2 className="h1">{heading}</h2>
          {intro ? (
            <p className="body lg" style={{ maxWidth: 560 }}>
              {intro}
            </p>
          ) : null}
        </div>

        <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 820 }}>
          {items.map((item) => (
            <div key={item.q} className="card" style={{ padding: 28 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>
                {item.q}
              </h3>
              <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, margin: "10px 0 0" }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
