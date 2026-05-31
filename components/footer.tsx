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
            <a href="https://calendly.com/ijas-rank-day/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Start your 90 days{" "}
              <span className="btn-icon">
                <Icon.Arrow />
              </span>
            </a>
            <a href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <Icon.WhatsApp /> WhatsApp
            </a>
            <a className="btn btn-light" href="https://calendly.com/ijas-rank-day/30min" target="_blank" rel="noopener noreferrer">
              <Icon.Phone /> Book a call
            </a>
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
            <Link className="footer-link" href="/partners">Partners</Link>
            <Link className="footer-link" href="/tools/aeo-score" style={{ fontWeight: 700 }}>
              Free AEO Check
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  background: "rgba(124,92,255,0.25)",
                  color: "#fff",
                  padding: "2px 6px",
                  borderRadius: 99,
                }}
              >
                Free
              </span>
            </Link>
            <Link className="footer-link" href="/tools/llms-txt" style={{ fontWeight: 700 }}>
              llms.txt Generator
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  background: "rgba(124,92,255,0.25)",
                  color: "#fff",
                  padding: "2px 6px",
                  borderRadius: 99,
                }}
              >
                Free
              </span>
            </Link>
            <Link className="footer-link" href="/who-its-for">Who it&apos;s for</Link>
            <Link className="footer-link" href="/faq">FAQ</Link>
            <Link className="footer-link" href="/about">About</Link>
            <Link className="footer-link" href="/what-is-aeo">What is AEO</Link>
            <Link className="footer-link" href="/get-cited-by-chatgpt">Get cited by ChatGPT</Link>
            <Link className="footer-link" href="/blog" style={{ fontWeight: 700 }}>Blog</Link>
          </div>

          <div>
            <h5>Industries</h5>
            <Link className="footer-link" href="/seo-for-saas">SEO for SaaS</Link>
            <Link className="footer-link" href="/seo-for-law-firms">SEO for law firms</Link>
            <Link className="footer-link" href="/seo-for-clinics">SEO for clinics</Link>
            <Link className="footer-link" href="/seo-for-plumbers">SEO for plumbers</Link>
            <Link className="footer-link" href="/seo-for-electricians">SEO for electricians</Link>
            <Link className="footer-link" href="/seo-for-contractors">SEO for contractors</Link>
            <Link className="footer-link" href="/seo-for-interior-designers">SEO for interior designers</Link>
            <Link className="footer-link" href="/seo-for-fit-out-companies">SEO for fit out companies</Link>
            <Link className="footer-link" href="/seo-for-facilities-management">SEO for FM companies</Link>
            <Link className="footer-link" href="/seo-for-maid-services">SEO for maid services</Link>
            <Link className="footer-link" href="/industries" style={{ fontWeight: 700 }}>All industries</Link>
          </div>

          <div>
            <h5>Locations</h5>
            <Link className="footer-link" href="/seo-agency-dubai">SEO agency Dubai</Link>
            <Link className="footer-link" href="/best-seo-agency-dubai">Best SEO agency Dubai</Link>
            <Link className="footer-link" href="/best-web-design-agency-dubai">Best web design agency Dubai</Link>
            <Link className="footer-link" href="/best-aeo-agency-dubai">Best AEO agency Dubai</Link>
            <Link className="footer-link" href="/best-geo-agency-dubai">Best GEO agency Dubai</Link>
            <Link className="footer-link" href="/seo-agency-uk">SEO agency UK</Link>
            <Link className="footer-link" href="/seo-agency-us">SEO agency US</Link>
            <Link className="footer-link" href="/locations" style={{ fontWeight: 700 }}>All locations</Link>

            <h5 style={{ marginTop: 24 }}>Contact</h5>
            <a className="footer-link" href="https://wa.me/971565981209" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a className="footer-link" href="mailto:sales@rank-day.com">sales@rank-day.com</a>
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
        </div>

        <div className="footer-bottom">
          <div>© rankday 2026</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a className="footer-link" style={{ padding: 0 }}>Privacy</a>
            <a className="footer-link" style={{ padding: 0 }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
