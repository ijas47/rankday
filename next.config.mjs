/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // Permanent (308) apex -> www so Google consolidates signals to one host.
        source: "/:path*",
        has: [{ type: "host", value: "rank-day.com" }],
        destination: "https://www.rank-day.com/:path*",
        permanent: true,
      },
      {
        // SEO Spider was merged into the Website SEO Audit tool.
        source: "/tools/seo-spider",
        destination: "/tools/website-seo-audit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
