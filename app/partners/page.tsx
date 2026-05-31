import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "rankday referral partner program. Earn $500 per client.",
  description:
    "Refer qualified businesses to rankday and earn $500 USD when they become a paying client. Clear tracking, partner links, pitch assets, deal registration, and payout rules.",
  path: "/partners",
});

const applyMailto =
  "mailto:sales@rank-day.com?subject=rankday%20referral%20partner%20application&body=Name%3A%0ACompany%3A%0AWebsite%3A%0ALinkedIn%3A%0AWho%20can%20you%20refer%3F%0AHow%20did%20you%20hear%20about%20rankday%3F";

const dealMailto =
  "mailto:sales@rank-day.com?subject=rankday%20deal%20registration&body=Partner%20name%3A%0APartner%20code%3A%0AProspect%20company%3A%0AProspect%20website%3A%0AProspect%20contact%3A%0AWhy%20they%20are%20a%20fit%3A%0AIntro%20status%3A";

const whatsapp =
  "https://wa.me/971565981209?text=I%20want%20to%20join%20the%20rankday%20referral%20partner%20program.";

const partnerKit = [
  "Your referral link: rank-day.com/r/your-code",
  "Deal registration template for warm intros",
  "One-page rankday offer summary",
  "7-slide partner pitch deck outline",
  "WhatsApp, email, and LinkedIn intro scripts",
  "Best-fit client checklist",
  "Portfolio and proof links",
  "Objection handling and FAQ",
];

const statusRows = [
  ["registered", "A partner submits a lead or the prospect clicks their referral link."],
  ["accepted", "rankday confirms the prospect is not already in the pipeline."],
  ["contacted", "The prospect has received a direct follow-up or warm intro reply."],
  ["call booked", "A discovery call is scheduled with the prospect."],
  ["proposal sent", "The prospect has received scope, pricing, and next steps."],
  ["won pending", "The prospect has signed or verbally agreed, but qualification is not complete."],
  ["qualified", "The first invoice is paid and the 14-day cancellation window has passed."],
  ["paid", "The $500 referral reward has been paid."],
];

const scripts = [
  {
    label: "short WhatsApp intro",
    text: "Saw your site and thought of rankday. They do a 90-day website, SEO, and AI citation sprint for businesses that want to rank on Google and show up in AI answers. Want me to intro you?",
  },
  {
    label: "email intro",
    text: "I know the founder of rankday. They rebuild your website, rank it on Google, and help you get cited by AI tools like ChatGPT and Perplexity in 90 days. It is a fixed-price sprint, not a monthly retainer. Worth a look if search visibility is a priority.",
  },
  {
    label: "qualified handoff",
    text: "This looks like a fit for rankday because they already have a website, sell a clear service, and would benefit from Google rankings plus AI citations. I am happy to make a warm intro.",
  },
];

const deck = [
  "What rankday does",
  "Who it is for",
  "Why Google and AI search matter now",
  "What clients get in 90 days",
  "Pricing: Standard $4,900 and Growth $7,900",
  "Referral reward: $500 per qualified customer",
  "How to refer with a link, intro, or deal registration",
];

const proofLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "90-day process" },
  { href: "/who-its-for", label: "Who it is for" },
  { href: "/get-cited-by-chatgpt", label: "AI citation work" },
  { href: "/tools/aeo-score", label: "Free AEO check" },
  { href: "/industries", label: "Industry pages" },
];

const terms = [
  "Reward is $500 USD for each referred client who becomes a qualified paying customer.",
  "A qualified customer has paid the first invoice, completed kickoff, and passed the 14-day cancellation or refund window.",
  "Referral attribution lasts 90 days from first tracked click or accepted deal registration.",
  "Manual deal registration wins when it is accepted before another partner or channel has an existing active opportunity.",
  "Self-referrals, spam, paid ad bidding on rankday brand terms, coupon sites, and misleading claims are not eligible.",
  "Partners must not promise guaranteed number one rankings, guaranteed AI mentions for every query, or represent themselves as rankday employees.",
  "Payouts are reviewed monthly and paid by bank transfer, PayPal, Wise, or another approved method.",
  "Tax forms or invoice details may be required before payout, depending on the partner location and total payments.",
];

function SectionTitle({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: React.ReactNode;
  body: string;
}) {
  return (
    <div data-reveal className="r-header">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 className="h1">{title}</h2>
      </div>
      <p className="body lg" style={{ maxWidth: 680, margin: 0 }}>
        {body}
      </p>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 56px", position: "relative" }}>
        <div className="container">
          <div className="r-hero">
            <div>
              <span className="eyebrow" data-reveal>
                Referral partners
              </span>
              <h1 className="h-display" data-reveal-text style={{ maxWidth: 760, marginTop: 18 }}>
                Earn $500 when you refer a <span className="it">rankday</span> client.
              </h1>
              <p className="lede" data-reveal style={{ maxWidth: 620, marginTop: 22 }}>
                Introduce businesses that need a better website, Google rankings, and AI citations. If they become a qualified paying client, you get paid.
              </p>
              <div data-reveal style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
                <a href={applyMailto} className="btn btn-primary">
                  Apply for a partner code <span className="btn-icon"><Icon.Arrow /></span>
                </a>
                <a href={dealMailto} className="btn btn-light">
                  Register a deal <span className="btn-icon"><Icon.Arrow /></span>
                </a>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <Icon.WhatsApp /> WhatsApp
                </a>
              </div>
            </div>

            <div data-reveal className="card card-purple" style={{ padding: 40, minHeight: 520, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
              <div>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.72)", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Partner snapshot
                </p>
                <p style={{ margin: "22px 0 0", color: "#fff", fontSize: "clamp(64px, 8vw, 112px)", lineHeight: 0.9, letterSpacing: "-0.05em", fontWeight: 800 }}>
                  $500
                </p>
                <p style={{ margin: "12px 0 0", color: "rgba(255,255,255,0.86)", fontSize: 18, lineHeight: 1.5 }}>
                  Paid for every qualified client you refer.
                </p>
              </div>
              <div style={{ display: "grid", gap: 10, marginTop: 36 }}>
                {[
                  ["90 days", "Referral attribution window"],
                  ["$4,900+", "Client package price"],
                  ["14 days", "Qualification review window"],
                ].map(([value, label]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "16px 18px", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 16, background: "rgba(255,255,255,0.08)" }}>
                    <span style={{ fontSize: 15, color: "rgba(255,255,255,0.76)" }}>{label}</span>
                    <strong style={{ fontSize: 20, color: "#fff", letterSpacing: "-0.02em" }}>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <SectionTitle
            kicker="Program"
            title={<>Simple reward. Clear rules. First-party tracking.</>}
            body="This is built for warm introductions from operators, consultants, designers, marketers, founders, and existing clients. No third-party affiliate platform is required."
          />

          <div data-reveal-stagger className="r-cards-4">
            {[
              ["1", "Get your partner code", "Approved partners receive a unique code and referral link like rank-day.com/r/your-code."],
              ["2", "Share or register", "Use your link for broad sharing or register a warm intro before making the introduction."],
              ["3", "Track the lead", "Every lead moves through a visible status from registered to paid."],
              ["4", "Get paid", "Once the client qualifies, the $500 payout is added to the next monthly payout run."],
            ].map(([num, title, body]) => (
              <div className="card" key={title} style={{ minHeight: 250 }}>
                <span className="card-num">/ {num}</span>
                <h3 className="h3">{title}</h3>
                <p className="body" style={{ margin: "14px 0 0" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionTitle
            kicker="Best fit"
            title={<>Who partners should refer.</>}
            body="The best referrals are businesses with a clear offer, a live website, and a reason to care about search visibility now."
          />

          <div data-reveal-stagger className="r-2">
            <div className="card card-lilac" style={{ padding: 40 }}>
              <h3 className="h2">Good referrals</h3>
              <div style={{ marginTop: 22 }}>
                {[
                  "Local service businesses with strong margins.",
                  "B2B SaaS teams that rely too much on paid acquisition.",
                  "Agencies, consultants, clinics, law firms, real estate, hospitality, and professional services.",
                  "Businesses willing to invest $4,900 to $7,900 in a 90-day sprint.",
                  "Teams that want a better website, Google rankings, and AI citations together.",
                ].map((item) => (
                  <div className="check" key={item}>
                    <span className="check-mark"><Icon.Check /></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-pink" style={{ padding: 40 }}>
              <h3 className="h2">Poor fit</h3>
              <div style={{ marginTop: 22 }}>
                {[
                  "Pre-revenue businesses with no budget.",
                  "Businesses looking for cheap link packages or one-off blog posts.",
                  "Teams that need paid ads, social media management, or a broad agency retainer.",
                  "Businesses expecting guaranteed number one rankings or instant AI visibility.",
                  "Prospects already in active conversation with rankday.",
                ].map((item) => (
                  <div className="check" key={item}>
                    <span className="xmark"><Icon.X /></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionTitle
            kicker="Tracking"
            title={<>PartnerStack-style visibility without PartnerStack.</>}
            body="The program uses first-party referral links, manual deal registration, UTM tracking, and a simple lead status model."
          />

          <div data-reveal className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="r-pricing-table" style={{ background: "var(--ink)", color: "#fff", padding: "16px 28px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.72 }}>Status</div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.72, gridColumn: "span 2" }}>What it means</div>
            </div>
            {statusRows.map(([status, meaning], i) => (
              <div key={status} className="r-pricing-table" style={{ padding: "18px 28px", borderTop: i === 0 ? "none" : "1px solid var(--hairline)", alignItems: "center" }}>
                <div style={{ color: "var(--purple)", fontSize: 14, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>{status}</div>
                <div style={{ gridColumn: "span 2", color: "var(--ink-2)", fontSize: 15, lineHeight: 1.5 }}>{meaning}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionTitle
            kicker="Partner kit"
            title={<>Everything partners need to refer with confidence.</>}
            body="Approved partners get the same practical assets they would expect from a hosted affiliate platform, but kept inside a lightweight rankday operating system."
          />

          <div data-reveal-stagger className="r-cards-4">
            {partnerKit.map((item) => (
              <div className="card card-paper" key={item} style={{ minHeight: 150 }}>
                <span className="check-mark" style={{ marginBottom: 18 }}><Icon.Check /></span>
                <p style={{ margin: 0, color: "var(--ink)", fontWeight: 700, lineHeight: 1.4 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger className="r-2">
            <div className="card card-mint" style={{ padding: 40 }}>
              <p className="kicker">Pitch scripts</p>
              <h2 className="h2" style={{ marginTop: 14 }}>Copy partners can use.</h2>
              <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
                {scripts.map((script) => (
                  <div key={script.label} style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: 16, padding: 18 }}>
                    <p style={{ margin: 0, color: "var(--purple)", fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>{script.label}</p>
                    <p style={{ margin: "10px 0 0", color: "var(--ink-2)", lineHeight: 1.55, fontSize: 15 }}>{script.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-peach" style={{ padding: 40 }}>
              <p className="kicker">Pitch deck</p>
              <h2 className="h2" style={{ marginTop: 14 }}>7-slide partner deck.</h2>
              <ol style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "grid", gap: 10, counterReset: "deck" }}>
                {deck.map((slide, index) => (
                  <li key={slide} style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: 12, alignItems: "center", padding: "12px 14px", background: "rgba(255,255,255,0.62)", borderRadius: 14 }}>
                    <span style={{ width: 32, height: 32, borderRadius: 99, background: "var(--purple)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, fontFamily: "var(--mono)" }}>{index + 1}</span>
                    <span style={{ color: "var(--ink)", fontWeight: 700 }}>{slide}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionTitle
            kicker="Proof links"
            title={<>Links partners can send.</>}
            body="These pages help a prospect understand the offer, pricing, process, and AI search angle before a warm intro."
          />

          <div data-reveal-stagger className="r-cards-3">
            {proofLinks.map((link) => (
              <Link className="card" key={link.href} href={link.href} style={{ padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <span style={{ fontWeight: 800, color: "var(--ink)" }}>{link.label}</span>
                <span className="btn-icon" style={{ width: 36, height: 36, borderRadius: 99, background: "var(--purple)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon.Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionTitle
            kicker="Terms"
            title={<>Program rules and payout policy.</>}
            body="The rules are intentionally clear so partners know what qualifies, what does not, and when payouts happen."
          />

          <div data-reveal className="card" style={{ padding: 40 }}>
            <div style={{ display: "grid", gap: 4 }}>
              {terms.map((term) => (
                <div className="check" key={term}>
                  <span className="check-mark"><Icon.Check /></span>
                  <span>{term}</span>
                </div>
              ))}
            </div>
            <p className="body" style={{ margin: "24px 0 0", fontSize: 14 }}>
              This page is a program summary, not tax or legal advice. Payout requirements can vary by partner location and business structure.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple r-band">
            <div>
              <p style={{ color: "rgba(255,255,255,0.72)", margin: "0 0 12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 12 }}>
                Ready to refer
              </p>
              <h2 className="h1" style={{ color: "#fff" }}>
                Get your partner code.
              </h2>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={applyMailto} className="btn btn-light">
                Apply now <span className="btn-icon"><Icon.Arrow /></span>
              </a>
              <a href={dealMailto} className="btn btn-primary" style={{ background: "#fff", color: "var(--purple)" }}>
                Register a deal <span className="btn-icon" style={{ background: "var(--purple)", color: "#fff" }}><Icon.Arrow /></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
