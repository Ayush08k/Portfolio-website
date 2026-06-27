import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";

export const metadata: Metadata = {
  title: "Web & Mobile App Development Services — 50% OFF | From $150",
  description:
    "Landing pages from $150, full stack apps from $600, mobile apps from $750. 50+ projects shipped, 5★ reviews. React, Next.js, React Native. Get a free quote today.",
  keywords: [
    "web development services",
    "mobile app development services",
    "freelance developer services",
    "hire full stack developer",
    "affordable web development",
    "react native app development",
    "next.js development services",
    "custom software development",
    "ecommerce website development",
    "saas development services",
    "ai integration services",
    "hire remote developer",
  ],
  openGraph: {
    title: "Web & Mobile App Development Services — 50% OFF | From $150",
    description:
      "Landing pages from $150, full stack apps from $600, mobile apps from $750. 50+ projects shipped, 5★ reviews. Get a free quote today.",
    url: `${siteUrl}/services`,
    siteName: "Freelancer Ayush",
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
    title: "Web & Mobile App Development Services — 50% OFF | From $150",
    description:
      "Landing pages from $150, full stack apps from $600, mobile apps from $750. 50+ projects shipped, 5★ reviews. Get a free quote today.",
    images: [`${siteUrl}/myprofile.png`],
    creator: "@Ayush08k",
  },
  alternates: {
    canonical: "/services",
  },
};
