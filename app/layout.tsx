import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollProgress } from "@/components/scroll-progress";

export const metadata: Metadata = {
  title: "Rankday. 90 days. One price.",
  description:
    "Top 3 on Google for 90% of your keywords. Recommended by ChatGPT and Perplexity. In 90 days. Or we keep working free.",
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
