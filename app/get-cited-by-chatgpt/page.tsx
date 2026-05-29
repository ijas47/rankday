import type { Metadata } from "next";
import { pageMeta, faqPageSchema, type FaqItem } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "How to Get Your Business Cited by ChatGPT and AI Search",
  description:
    "ChatGPT, Perplexity, and Claude cite specific businesses when buyers ask for recommendations. Here is how to become one of those businesses.",
  path: "/get-cited-by-chatgpt",
});

const signals = [
  { num: "01", title: "Clear, direct content", body: "LLMs favor pages that answer questions directly. A dental clinic page that says 'We are a dental clinic in Dubai offering implants, cleanings, and orthodontics' is more citable than one that says 'We are passionate about smiles.' Direct answers get cited. Vague copy does not." },
  { num: "02", title: "Schema markup", body: "JSON-LD structured data is the machine-readable layer that tells AI crawlers exactly what your business does. Without it, an LLM has to guess from your prose. With Organization, LocalBusiness, and Service schema applied, it knows." },
  { num: "03", title: "Directory and review platform presence", body: "ChatGPT and Perplexity are trained heavily on G2, Clutch, Yelp, Trustpilot, TripAdvisor, Healthgrades, and dozens of category-specific directories. A business missing from these platforms is less citable than a business present on 30 of them." },
  { num: "04", title: "Consistent brand signals", body: "Your business name, address, phone number, and category must be identical across every platform it appears on. Inconsistency is a trust signal failure. LLMs weight consistency heavily when deciding which business to name." },
  { num: "05", title: "Third-party editorial mentions", body: "A mention in an industry publication, a comparison site, or a credible blog carries more weight than a self-published claim. LLMs weight sources they were trained to trust. Getting placed in those sources is the work." },
];

const faqs: FaqItem[] = [
  {
    q: "How do AI engines like ChatGPT decide which businesses to cite?",
    a: "They generate answers from a model trained on structured, consistent, and credible information. The businesses that get named are the ones present across directories, review platforms, and publications, with clear content and consistent brand details everywhere they appear.",
  },
  {
    q: "Why isn't my business showing up in ChatGPT answers?",
    a: "Usually because of a thin citation footprint: vague website content, no schema markup, little directory presence, or inconsistent business details across platforms. AI engines cite sources they were trained to trust, and a business they have barely seen is hard to trust.",
  },
  {
    q: "Does ChatGPT search the live web?",
    a: "Not by default. Most answers are generated from training data rather than real-time search. That is why being present in the sources the model was trained on matters more than ranking a single page on Google.",
  },
  {
    q: "How long until my business appears in AI answers?",
    a: "Most businesses start appearing within 4 to 12 weeks of structured AEO work. It depends on how competitive your category is and how many of the five citation signals are already in place.",
  },
  {
    q: "What is the single biggest factor in getting cited?",
    a: "Presence across the directories and review platforms LLMs are trained on, combined with consistent business details everywhere you appear. A business listed in 30 relevant places is far more citable than one listed in 3.",
  },
  {
    q: "Can I get cited by ChatGPT without paying for ads?",
    a: "Yes. AI citations are earned through content structure, schema, directory presence, and third-party mentions, not paid placement. There is no ad slot inside an AI-generated answer.",
  },
];

export default function GetCitedByChatGPTPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <span className="eyebrow">AI Citation Strategy</span>
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 960, margin: "18px auto 0", fontSize: "clamp(32px, 4vw, 56px)" }}>
            How to get your business cited by <span className="it">ChatGPT</span>, Perplexity, and Claude.
          </h1>
          <p className="lede" data-reveal style={{ marginTop: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            When someone asks ChatGPT "what's the best accountant in Manchester" or "which SEO agency guarantees rankings," it names specific businesses. Here is what determines whether yours is one of them.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="card card-ink" style={{ padding: "48px 56px" }}>
            <p style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "#fff", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em", maxWidth: 800 }}>
              LLMs do not search the web in real time. They generate answers from a model trained on structured, consistent, credible information. Getting cited means being present in the sources that model was trained on.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">The five signals that drive AI citations.</h2>
            <p className="body lg" style={{ maxWidth: 560 }}>
              These are the factors Rankday works on in every 90-day engagement. Not theory. The actual work.
            </p>
          </div>

          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {signals.map((s) => (
              <div key={s.num} className="card" style={{ padding: 32, display: "flex", gap: 24, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--purple)", fontWeight: 700, flexShrink: 0, paddingTop: 3, minWidth: 28 }}>/{s.num}</span>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>{s.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, margin: "10px 0 0" }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger className="r-2">
            <div className="card card-pink" style={{ padding: 40 }}>
              <p className="kicker">How long it takes</p>
              <p style={{ fontSize: 22, color: "var(--ink)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.015em", marginTop: 16 }}>
                Most businesses start appearing in AI answers within 4 to 12 weeks of structured AEO work.
              </p>
              <p className="body" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                The timeline depends on how competitive your category is and how many of the five signals are already in place. A business with no directory presence and no schema starts from zero. A business with 20 directory listings and clean schema moves faster.
              </p>
            </div>

            <div className="card card-mint" style={{ padding: 40 }}>
              <p className="kicker">What you can check right now</p>
              <p style={{ fontSize: 22, color: "var(--ink)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.015em", marginTop: 16 }}>
                Open ChatGPT or Perplexity. Ask for the best businesses in your category and city.
              </p>
              <p className="body" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                If your business does not appear, you have an AEO gap. If your competitors appear and you do not, the gap is costing you clients today. The businesses named in that answer did not get there by accident.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Which AI engines matter most.</h2>
          </div>
          <div data-reveal-stagger className="r-cards-5">
            {[
              { name: "ChatGPT", color: "#10a37f", note: "200M+ weekly users. Strongest for local business and B2B queries." },
              { name: "Perplexity", color: "#20808d", note: "Pulls from live web. High weight on directories and publications." },
              { name: "Claude", color: "#c96442", note: "Anthropic's model. Strong for professional services and B2B." },
              { name: "Google AI", color: "#4285f4", note: "AI Overviews appear above organic results. Pulling from indexed content." },
              { name: "Gemini", color: "#1a73e8", note: "Google's standalone LLM. Growing fast in mobile search." },
            ].map((ai) => (
              <div key={ai.name} className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, minHeight: 160 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 99, background: ai.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>{ai.name}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>{ai.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={faqPageSchema(faqs)} />
      <FaqSection
        heading="AI citation questions, answered."
        intro="What businesses ask most about getting cited by ChatGPT and other AI engines."
        items={faqs}
      />

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}>
              We track your citations <span className="serif">weekly.</span>
            </h2>
            <a href="https://calendly.com/ijas-rank-day/30min" target="_blank" rel="noopener noreferrer" className="btn btn-light">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
