import Link from "next/link";
import { Icon } from "./icons";

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="r-footer-cta">
          <div>
            <h2
              style={{
                fontSize: "clamp(36px, 6vw, 84px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontWeight: 700,
                color: "#fff",
                margin: 0,
                fontFamily: "var(--sans)",
              }}
            >
              Start your <span className="serif" style={{ color: "#fff" }}>90 days.</span>
            </h2>
          </div>

          <div className="footer-cta-buttons" style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Link href="/pricing" className="btn btn-primary">
              Start your 90 days{" "}
              <span className="btn-icon">
                <Icon.Arrow />
              </span>
            </Link>
            <button className="btn btn-light">
              <Icon.WhatsApp /> WhatsApp
            </button>
            <button className="btn btn-light">
              <Icon.Mail /> Email
            </button>
            <button className="btn btn-light">
              <Icon.Phone /> Book a call
            </button>
          </div>
        </div>

        <div className="footer-grid r-footer-grid">
          <div>
            <div className="nav-logo dark" style={{ marginBottom: 18 }}>
              <span className="logo-rank">rank</span>
              <span className="logo-day">day</span>
              <span className="logo-dot">.</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, maxWidth: 360, color: "rgba(255,255,255,0.78)", margin: 0 }}>
              Websites, SEO, and AEO for businesses that need to be found.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6, maxWidth: 360, color: "#fff", margin: "10px 0 0", fontWeight: 500 }}>
              90 days. One price. Done.
            </p>
          </div>

          <div>
            <h5>Pages</h5>
            <Link className="footer-link" href="/">Home</Link>
            <Link className="footer-link" href="/how-it-works">How it works</Link>
            <Link className="footer-link" href="/pricing">Pricing</Link>
            <Link className="footer-link" href="/who-its-for">Who it&apos;s for</Link>
            <Link className="footer-link" href="/faq">FAQ</Link>
            <Link className="footer-link" href="/about">About</Link>
            <Link className="footer-link" href="/ai-info-page">
              AI info page
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  background: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.8)",
                  padding: "2px 6px",
                  borderRadius: 99,
                }}
              >
                For LLMs
              </span>
            </Link>
          </div>

          <div>
            <h5>Contact</h5>
            <a className="footer-link">WhatsApp</a>
            <a className="footer-link" href="mailto:sales@rank-day.com">sales@rank-day.com</a>
            <a className="footer-link">Book a call</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© Rankday 2026</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a className="footer-link" style={{ padding: 0 }}>Privacy</a>
            <a className="footer-link" style={{ padding: 0 }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
