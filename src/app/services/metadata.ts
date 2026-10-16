import type { Metadata } from "next";
import { CANONICAL_DOMAIN, getCanonicalUrl } from "@/lib/siteConfig";

const siteUrl = CANONICAL_DOMAIN;

export const metadata: Metadata = {
  title: "Cheapest Web & App Dev Services — 50% OFF | Websites $75 · Apps $300",
  description:
    "⭐ World's cheapest freelance developer — 50% OFF all services. Websites from $75, iOS apps from $300, Android apps from $300, web apps from $500. Free quote in 24h. Hire now!",
  keywords: [
    // ── Cheapest Service Keywords ──────────────────────────────────────────
    "cheapest web development service",
    "cheapest website developer",
    "cheapest app development service",
    "cheapest ios app development",
    "cheapest android app development",
    "cheapest web application development",
    "cheapest mobile app development",
    "cheapest full stack development",
    "cheapest react native development",
    "cheapest next.js development",
    "cheapest saas development",
    "cheapest ecommerce website",
    "cheapest shopify developer",
    // ── Affordable Service Keywords ────────────────────────────────────────
    "affordable web development services",
    "affordable app development services",
    "affordable ios app development",
    "affordable android app development",
    "low cost web development india",
    "low cost app development india",
    "budget friendly web developer",
    "discount web development",
    "50% off web development",
    "50% off app development",
    "web development under 100 dollars",
    "app development under 500 dollars",
    // ── Core Service Keywords ──────────────────────────────────────────────
    "web development services",
    "mobile app development services",
    "freelance developer services",
    "hire full stack developer",
    "react native app development",
    "next.js development services",
    "custom software development",
    "ecommerce website development",
    "saas development services",
    "ai integration services",
    "hire remote developer india",
    "freelance web developer india",
    "ios app developer for hire",
    "android app developer for hire",
    "web app developer for hire",
    "full stack developer for hire india",
    "react developer services india",
    "next.js developer services india",
  ],
  openGraph: {
    title: "Cheapest Web & App Dev Services — 50% OFF | Websites $75 · Apps $300",
    description:
      "⭐ World's cheapest freelance developer — 50% OFF. Websites from $75, iOS apps from $300, Android apps from $300. Free consultation. Hire now!",
    url: getCanonicalUrl("/services"),
    siteName: "Best Freelancer",
    images: [
      {
        url: `${siteUrl}/myprofile.png`,
        width: 1200,
        height: 630,
        alt: "Ayush Kumar — Web & Mobile App Development Services",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheapest Web & App Dev Services — 50% OFF | Websites $75 · Apps $300",
    description:
      "⭐ Cheapest freelance developer — 50% OFF. Websites from $75, iOS/Android apps from $300, web apps from $500. Free quote in 24h. Hire now!",
    images: [`${siteUrl}/myprofile.png`],
    creator: "@Ayush08k",
  },
  alternates: {
    canonical: getCanonicalUrl("/services"),
  },
};
