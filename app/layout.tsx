import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollProgress } from "@/components/scroll-progress";

export const metadata: Metadata = {
  title: {
    default: "Rankday | SEO Agency. Top 3 Rankings + AI Citations in 90 Days.",
    template: "%s | Rankday",
  },
  description:
    "Rankday rebuilds your website, ranks it on Google, and gets your business cited by ChatGPT, Perplexity, and Claude. Fixed price. 90 days. Top-3 guarantee.",
  metadataBase: new URL("https://www.rank-day.com"),
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rankday",
  url: "https://www.rank-day.com",
  description:
    "90-day SEO and AI citation agency. We rebuild your website, rank it on Google, and get you cited by ChatGPT, Perplexity, and Claude.",
  founder: {
    "@type": "Person",
    name: "Ijas Abdulla",
  },
  areaServed: ["AE", "GB", "US", "CA", "AU", "SG", "IE", "NZ"],
  serviceType: ["Search Engine Optimization", "Answer Engine Optimization", "Web Design"],
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <ScrollProgress />
        <div className="shell">
          <Nav />
          <main>{children}</main>
          <Footer />
        </div>
        <ScrollReveal />
      </body>
    </html>
  );
}
