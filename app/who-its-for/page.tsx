import Link from "next/link";
import { Icon } from "@/components/icons";
import {
  LocalIllust,
  B2BIllust,
  HospIllust,
} from "@/components/page-icons";

const goodFit = [
  {
    title: "Local service businesses",
    body: 'Clinics, salons, restaurants, contractors, gyms, real estate brokers, law firms, accountants, home services. Anyone whose customers search "near me."',
    tone: "pink",
    illust: <LocalIllust />,
  },
  {
    title: "B2B and professional services",
    body: "SaaS companies, agencies, consultancies, B2B service providers. Anyone whose buyers Google your category and ask ChatGPT for recommendations before booking a demo.",
    tone: "lilac",
    illust: <B2BIllust />,
  },
  {
    title: "Hospitality and experiences",
    body: "Hotels, holiday rentals, tour operators, event venues. Anyone selling something a buyer researches before they spend.",
    tone: "mint",
    illust: <HospIllust />,
  },
];

const notFit = [
  "Businesses without a clear category or product",
  "Anyone expecting #1 on Google for a single brand-new keyword in a competitive market",
  "Businesses that won't sign off on keyword scope in week 1",
  "Anyone looking for paid ads management or social media",
];

const marketTiles: Array<[string, string]> = [
  ["UAE", "pink"],
  ["UK", "peach"],
  ["US", "yellow"],
  ["Canada", "mint"],
  ["Australia", "lilac"],
  ["Singapore", "pink"],
  ["Ireland", "peach"],
  ["New Zealand", "mint"],
];

export default function WhoItsForPage() {
  return (
    <div className="page-enter">
      <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
        <div className="container">
          <h1 className="h-display" data-reveal-text style={{ maxWidth: 1100, margin: "0 auto" }}>
            Built for businesses that need to <span className="it">be found.</span>
          </h1>
          <p className="lede" data-reveal data-reveal-delay="0.1" style={{ marginTop: 28, maxWidth: 780, marginLeft: "auto", marginRight: "auto" }}>
            Rankday works for any business with a website, something to sell, and buyers who search before they decide.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">A good fit.</h2>
          </div>

          <div data-reveal-stagger className="r-2">
            {goodFit.map((f, i) => (
              <div key={f.title} className={`card card-${f.tone}`} style={{ padding: 0, minHeight: 260, display: "grid", gridTemplateColumns: "1fr auto", overflow: "hidden" }}>
                <div style={{ padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink)", opacity: 0.5 }}>
                      / {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 style={{ marginTop: 14, fontSize: 22, color: "var(--ink)", fontWeight: 700, letterSpacing: "-0.015em" }}>{f.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 12, lineHeight: 1.5, marginBottom: 0 }}>{f.body}</p>
                  </div>
                  <span className="check-mark" style={{ marginTop: 18, width: 24, height: 24 }}>
                    <Icon.Check />
                  </span>
                </div>
                <div style={{ width: 140, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>{f.illust}</div>
              </div>
            ))}
          </div>

          <p
            data-reveal
            style={{
              marginTop: 40,
              fontSize: "clamp(20px, 2.2vw, 28px)",
              lineHeight: 1.4,
              color: "var(--ink-2)",
              letterSpacing: "-0.01em",
              textAlign: "center",
              maxWidth: 900,
              marginLeft: "auto",
              marginRight: "auto",
              fontWeight: 500,
            }}
          >
            If you have keywords you want to rank for and customers who research before they buy, <span className="serif" style={{ color: "var(--purple)" }}>we can get you found.</span>
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal-stagger className="r-aside-rev">
            <div className="card card-ink" style={{ padding: 40 }}>
              <p className="kicker" style={{ color: "rgba(255,255,255,0.5)" }}>Not a fit</p>
              <p style={{ fontSize: 22, color: "#fff", fontWeight: 700, letterSpacing: "-0.015em", marginTop: 16, lineHeight: 1.3 }}>
                If you fall outside this list, <span className="serif">don&apos;t sign up.</span> We&apos;ll both regret it.
              </p>
            </div>

            <div className="card" style={{ padding: 40 }}>
              <div>
                {notFit.map((t) => (
                  <div className="check" key={t}>
                    <span className="xmark">
                      <Icon.X />
                    </span>
                    <span style={{ fontSize: 16 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div data-reveal className="r-header">
            <h2 className="h1">Markets we serve.</h2>
            <p className="body lg" style={{ maxWidth: 540 }}>
              UAE, UK, US, Canada, Australia, Singapore, Ireland, New Zealand. Everywhere else case-by-case. <strong>Async-first by design.</strong>
            </p>
          </div>

          <div data-reveal-stagger className="r-cards-4">
            {marketTiles.map(([m, tone], i) => (
              <div
                key={m}
                className={`card card-${tone}`}
                style={{ padding: "28px", minHeight: 130, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink)", opacity: 0.5 }}>
                  / {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--ink)", letterSpacing: "-0.02em" }}>{m}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 32px 64px" }}>
        <div className="container" style={{ padding: 0 }}>
          <div data-reveal className="band-purple r-band">
            <h2 className="h1" style={{ color: "#fff" }}>
              <span className="serif">Start</span> your 90 days.
            </h2>
            <Link href="/pricing" className="btn btn-light">
              Start your 90 days <span className="btn-icon"><Icon.Arrow /></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
