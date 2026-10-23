/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ── Prevent trailing-slash variants from causing redirect chains ───────
  trailingSlash: false,

  // ── Compiler: strip console.log in production for smaller bundles ─────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // ── Redirects: Enforce canonical www domain ──────────────────────────────────
  // Catches non-www → www at the Next.js routing level (backup for middleware).
  // Google Search Console was reporting "Redirect error" on non-www URLs.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "freelanceayush.com" }],
        destination: "https://www.freelanceayush.com/:path*",
        permanent: true, // 308 Permanent Redirect
      },
    ];
  },

  // ── Custom Headers for SEO & Sitemap Caching ────────────────────────────────
  async headers() {
    return [
      {
        // Cache the dynamic sitemap for 1 hour on CDN to prevent cold starts
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
        ],
      },
      {
        // Cache robots.txt for 1 day
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Cache the static fallback sitemap for 1 day
        source: "/static-sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
        ],
      },
      {
        // Aggressive caching for all static assets (JS, CSS, images, fonts)
        source: "/:path*.(js|css|png|jpg|jpeg|webp|avif|svg|ico|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
