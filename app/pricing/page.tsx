import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PricingClient } from "./pricing-client";

export const metadata: Metadata = pageMeta({
  title: "SEO Pricing. Flat Rate, No Contracts.",
  description:
    "Standard from $4,900. Growth from $7,900. Commerce (Shopify/ecom) from $9,900. Commerce Scale from $14,900. Website or store, Google top-3, and AI citations in 90 days. One fixed price.",
  path: "/pricing",
});

export default function PricingPage() {
  return <PricingClient />;
}
