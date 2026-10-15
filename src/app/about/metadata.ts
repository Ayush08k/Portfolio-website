import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.freelanceayush.com";

export const metadata: Metadata = {
  title: "About Ayush Kumar — India's Cheapest Freelance Web & App Developer | 50% OFF",
  description:
    "Meet Ayush Kumar — India's most affordable freelance developer. Cheapest web developer, iOS app dev & Android app dev with 3+ years experience, 50+ shipped projects, 5★ reviews. 50% OFF all services!",
  keywords: [
    // ── Cheapest / About Keywords ──────────────────────────────────────────
    "cheapest freelancer india",
    "cheapest web developer india",
    "cheapest app developer india",
    "cheapest ios developer india",
    "cheapest android developer india",
    "most affordable freelance developer",
    "affordable freelance developer india",
    "best cheap web developer india",
    "low cost freelance developer india",
    "budget web developer india",
    "cheapest full stack developer india",
    "cheapest mobile app developer india",
    // ── Identity / Hire Keywords ───────────────────────────────────────────
    "about ayush kumar",
    "ayush kumar developer",
    "hire ayush kumar",
    "ayush kumar freelancer",
    "ayush kumar web developer",
    "ayush kumar app developer",
    "ayush kumar india",
    "freelance developer india",
    "full stack developer india",
    "react native developer india",
    "next.js developer india",
    // ── Trust / Proof Keywords ─────────────────────────────────────────────
    "trusted freelance developer india",
    "5 star freelance developer",
    "top rated freelance developer india",
    "experienced freelance developer india",
    "professional freelance developer india",
    "freelance developer 50 plus projects",
    "mca developer india",
    "gurugram university developer",
    // ── Long-Tail About Keywords ───────────────────────────────────────────
    "hire affordable full stack developer india",
    "cheap full stack developer hire india",
    "best freelance developer india 2025 2026",
    "freelance web developer story india",
    "indie developer india portfolio",
    "software developer gurugram india",
    "remote developer india cheap rates",
    "hire cheap developer india",
    "ayush kumar freelanceayush",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Ayush Kumar — India's Cheapest Freelance Web & App Developer | 50% OFF",
    description:
      "Meet Ayush Kumar — cheapest freelance web & app developer in India. 3+ years experience, 50+ shipped projects, 5★ reviews. Websites from $75, apps from $300. 50% OFF!",
    url: `${siteUrl}/about`,
    siteName: "Best Freelancer",
    images: [
      {
        url: `${siteUrl}/myprofile.png`,
        width: 1200,
        height: 630,
        alt: "Ayush Kumar — India's Cheapest Freelance Developer | 50% OFF All Services",
        type: "image/png",
      },
    ],
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ayush Kumar — India's Cheapest Freelance Web & App Developer",
    description:
      "Cheapest freelance developer in India — 50% OFF. 3+ years experience, 50+ projects shipped, 5★ rated. Websites from $75, apps from $300. Hire me!",
    images: [`${siteUrl}/myprofile.png`],
    creator: "@Ayush08k",
  },
};
