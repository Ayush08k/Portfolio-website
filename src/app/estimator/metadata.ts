import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";

export const metadata: Metadata = {
  title: "Free Project Cost Calculator — Estimate Your Web or App Budget Instantly",
  description:
    "Get an instant quote for your web app, mobile app, or SaaS project. Interactive cost calculator with real-time pricing. Landing pages from $150, apps from $600. Try it free →",
  keywords: [
    "web development cost calculator",
    "app development cost estimator",
    "website price calculator",
    "project cost estimator",
    "software development budget",
    "freelance developer pricing",
    "mobile app development cost",
    "saas development cost",
    "web app quote calculator",
    "free project estimate",
  ],
  openGraph: {
    title: "Free Project Cost Calculator — Estimate Your Web or App Budget Instantly",
    description:
      "Get an instant quote for your web app, mobile app, or SaaS project. Landing pages from $150, apps from $600. Try it free →",
    url: `${siteUrl}/estimator`,
    siteName: "Freelancer Ayush",
    images: [
      {
        url: `${siteUrl}/myprofile.png`,
        width: 1200,
        height: 630,
        alt: "Free Project Cost Calculator — Instant Web & App Development Quotes",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Project Cost Calculator — Estimate Your Web or App Budget Instantly",
    description:
      "Get an instant quote for your web app, mobile app, or SaaS project. Landing pages from $150, apps from $600. Try it free →",
    images: [`${siteUrl}/myprofile.png`],
    creator: "@Ayush08k",
  },
  alternates: {
    canonical: "/estimator",
  },
};
