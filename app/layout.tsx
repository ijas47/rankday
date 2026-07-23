import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { ReferralAttribution } from "@/components/referral-attribution";
import { MetaPixel } from "@/components/meta-pixel";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "rankday | SEO Agency. Top 3 Rankings + AI Citations in 90 Days.",
    template: "%s | rankday",
  },
  description:
    "rankday rebuilds your website, ranks it on Google, and gets your business cited by ChatGPT, Perplexity, and Claude. Fixed price. 90 days. Top-3 guarantee.",
  metadataBase: new URL("https://www.rank-day.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
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
        alt: "rankday. Top 3 on Google. Cited by AI. In 90 days.",
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
  "@id": "https://www.rank-day.com/#organization",
  name: "rankday",
  alternateName: ["rank-day", "rank day", "rank-day.com", "rankday agency"],
  legalName: "rankday",
  url: "https://www.rank-day.com",
  description: "rankday is a 90-day done-for-you SEO and AEO agency. We rebuild your website, rank it on Google, and get your business cited by ChatGPT, Perplexity, Claude, and Google AI. One fixed price, top-3 ranking guarantee on 90% of agreed keywords, no retainer.",
  founder: {
    "@type": "Person",
    "@id": "https://www.rank-day.com/#ijas-abdulla",
    name: "Ijas Abdulla",
    sameAs: ["https://x.com/ijas47", "https://www.instagram.com/ranl_day/"],
  },
  sameAs: [
    "https://x.com/ijas47",
    "https://www.instagram.com/ranl_day/",
    "https://www.rank-day.com",
  ],
  areaServed: ["IN", "AE", "GB", "US", "CA", "AU", "SG", "IE", "NZ"],
  serviceType: [
    "Search Engine Optimization",
    "Answer Engine Optimization",
    "Generative Engine Optimization",
    "Web Design",
    "AI Citation Building",
  ],
  knowsAbout: [
    "SEO",
    "AEO",
    "GEO",
    "Answer Engine Optimization",
    "Generative Engine Optimization",
    "AI Citations",
    "ChatGPT SEO",
    "Perplexity optimization",
    "Google AI Overviews",
  ],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "90-Day SEO & AEO Services",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Standard Plan — $4,900 USD",
        price: "4900",
        priceCurrency: "USD",
        itemOffered: {
          "@type": "Service",
          name: "Website Rebuild + SEO + AEO — Standard (up to 7 pages, 15 keywords)",
        },
      },
      {
        "@type": "Offer",
        name: "Growth Plan — $7,900 USD",
        price: "7900",
        priceCurrency: "USD",
        itemOffered: {
          "@type": "Service",
          name: "Website Rebuild + SEO + AEO — Growth (up to 12 pages, 30 keywords)",
        },
      },
    ],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.rank-day.com/#ijas-abdulla",
  name: "Ijas Abdulla",
  url: "https://www.rank-day.com/about",
  jobTitle: "Founder",
  worksFor: {
    "@type": "Organization",
    "@id": "https://www.rank-day.com/#organization",
    name: "rankday",
  },
  description: "Founder of rankday. 16 years of B2B go-to-market experience across adtech, proptech, SaaS, and AI.",
  knowsAbout: [
    "Search Engine Optimization",
    "Answer Engine Optimization",
    "Generative Engine Optimization",
    "B2B Go-to-Market",
    "AI Search",
    "SaaS Growth",
  ],
  sameAs: [
    "https://x.com/ijas47",
    "https://www.instagram.com/ranl_day/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.rank-day.com/#website",
  name: "rankday",
  alternateName: ["rank-day", "rank day", "rank-day.com"],
  url: "https://www.rank-day.com",
  description: "rankday is a 90-day SEO and AI citation agency at rank-day.com.",
  publisher: {
    "@type": "Organization",
    "@id": "https://www.rank-day.com/#organization",
    name: "rankday",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.rank-day.com/",
    },
  ],
};

// HowTo schema for 90-day process (AEO/SEO extractable)
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How rankday Delivers Top 3 Rankings + AI Citations in 90 Days",
  description: "Step-by-step process to rebuild your website, rank on Google, and get cited by AI engines.",
  step: [
    {
      "@type": "HowToStep",
      name: "Week 1: Foundations + Site Rebuild",
      text: "Audit your current website, search presence, and AI visibility. Agree on keywords. Design and ship new 5-12 page mobile-first site with 95+ Core Web Vitals and branding.",
    },
    {
      "@type": "HowToStep",
      name: "Week 2: Launch + Technical Setup",
      text: "Site goes live. Apply schema markup. Submit sitemap. Install Search Console, analytics, rebuild Google Business Profile. Optimize directories and listings.",
    },
    {
      "@type": "HowToStep",
      name: "Weeks 2-7: Content + Signals",
      text: "Publish 4-8 content pages targeting agreed keywords. Structure for Google and LLM citation. Build citations, earn backlinks, collect reviews, list in directories LLMs use.",
    },
    {
      "@type": "HowToStep",
      name: "Weeks 8-12: Rank, Refine, Get Cited",
      text: "Monitor rankings and AI visibility (ChatGPT, Perplexity, Claude, Google AI). Double down on performing keywords. Iterate until top 3 for 90% of keywords and cited in AI answers.",
    },
  ],
  totalTime: "P90D",
  supply: [
    { "@type": "HowToSupply", name: "Agreed keyword list" },
    { "@type": "HowToSupply", name: "Business details and assets" },
  ],
  tool: [
    { "@type": "HowToTool", name: "rankday team and process" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${instrumentSerif.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
      <MetaPixel />
      <Script id="ms-clarity-init" strategy="lazyOnload">
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
        <ReferralAttribution />
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
