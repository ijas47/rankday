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
    ];
  },
};

export default nextConfig;
