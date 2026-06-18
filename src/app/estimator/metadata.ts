import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";

export const metadata: Metadata = {
  title: "Interactive Project Cost & Timeline Estimator | Ayush Kumar",
  description:
    "Estimate your custom web development, SaaS platform, or mobile app budget and timeline in real-time with our interactive quote calculator. Direct, transparent project rates with special startup and regional pricing.",
  keywords: [
    // ── Calculator Core Keywords ───────────────────────────────────────────
    "web development cost calculator",
    "mobile app development cost calculator",
    "project cost estimator tool",
    "website price calculator",
    "app development budget estimator",
    "software cost estimation calculator",
    "interactive quote calculator",
    "estimate saas development cost",
    "calculate web design price",
    "freelance developer pricing calculator",

    // ── Technology / Specification Focus ──────────────────────────────────
    "next.js app cost estimator",
    "react native app pricing tool",
    "custom cms development price",
    "stripe integration cost",
    "ai chatbot development cost",
    "database setup timeline",
    "saas mvp cost estimate",
    "admin dashboard budget calculator",
    "custom spline 3d animation cost",

    // ── Intent & Localization ──────────────────────────────────────────────
    "hire freelance developer pricing",
    "affordable web development rates",
    "startup mvp budget estimator",
    "regional developer rates india",
    "freelance developer fixed price quotes",
    "rapid prototyping budget calculator",
    "transparent software project estimate"
  ],
  openGraph: {
    title: "Interactive Project Cost & Timeline Estimator — Ayush Kumar",
    description:
      "Design your custom web or mobile application scope in real-time. Calculate instant transparent estimates for SaaS, mobile apps, e-commerce, and AI integrations.",
    url: `${siteUrl}/estimator`,
    siteName: "Ayush Kumar — Portfolio",
    images: [
      {
        url: `${siteUrl}/myprofile.png`,
        width: 1200,
        height: 630,
        alt: "Ayush Kumar — Interactive Project Cost & Timeline Estimator Dashboard",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Project Cost & Timeline Estimator — Ayush Kumar",
    description:
      "Calculate your custom software project cost and timeline in seconds. Transparent, real-time quote generation with zero surprises.",
    images: [`${siteUrl}/myprofile.png`],
    creator: "@Ayush08k",
  },
  alternates: {
    canonical: "/estimator",
  },
};
