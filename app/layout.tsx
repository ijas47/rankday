import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollProgress } from "@/components/scroll-progress";

export const metadata: Metadata = {
  title: {
    default: "rankday | SEO Agency. Top 3 Rankings + AI Citations in 90 Days.",
    template: "%s | rankday",
  },
  description:
    "rankday rebuilds your website, ranks it on Google, and gets your business cited by ChatGPT, Perplexity, and Claude. Fixed price. 90 days. Top-3 guarantee.",
  metadataBase: new URL("https://www.rank-day.com"),
  openGraph: {
    type: "website",
    siteName: "rankday",
    title: "rankday | SEO Agency. Top 3 Rankings + AI Citations in 90 Days.",
    description:
      "rankday rebuilds your website, ranks it on Google, and gets your business cited by ChatGPT, Perplexity, and Claude. Fixed price. 90 days. Top-3 guarantee.",
    url: "https://www.rank-day.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "rankday — Top 3 on Google. Cited by AI. In 90 days.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "rankday | SEO Agency. Top 3 Rankings + AI Citations in 90 Days.",
    description:
      "A new website, top-3 Google rankings, and AI citations. One fixed price. 90-day guarantee.",
    images: ["/og-image.png"],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "rankday",
  alternateName: ["rank-day", "rank day", "rank-day.com", "rankday Agency"],
  legalName: "rankday",
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "rankday",
  alternateName: ["rank-day", "rank day", "rank-day.com"],
  url: "https://www.rank-day.com",
  description: "rankday is a 90-day SEO and AI citation agency at rank-day.com.",
  publisher: {
    "@type": "Organization",
    name: "rankday",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Z9ZNM6G5N4"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Z9ZNM6G5N4');
        `}
      </Script>
      <Script id="ms-clarity-init" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wu87tvych7");
        `}
      </Script>
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
