type PillSpec = { dot: string; label: string };

const defaultItems: PillSpec[] = [
  { dot: "var(--purple)", label: "5 to 12 page website + branding" },
  { dot: "#10a37f", label: "Top 3 on Google for 90% of keywords" },
  { dot: "#ff8a4c", label: "Cited by ChatGPT, Claude, Perplexity" },
];

export function BundlePills({ items = defaultItems, align = "center" }: { items?: PillSpec[]; align?: "center" | "left" }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        justifyContent: align === "center" ? "center" : "flex-start",
        flexWrap: "wrap",
      }}
    >
      {items.map((item) => (
        <span
          key={item.label}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            background: "rgba(255,255,255,0.7)",
            border: "1px solid var(--hairline)",
            borderRadius: 99,
            fontSize: 13,
            fontWeight: 600,
            color: "var(--ink)",
            letterSpacing: "-0.005em",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: 99, background: item.dot, flexShrink: 0 }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
