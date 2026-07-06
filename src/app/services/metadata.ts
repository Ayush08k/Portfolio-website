import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";

export const metadata: Metadata = {
  title: "Freelance Web & Mobile App Development Services — 50% OFF | Shipped in 7 Days",
  description:
    "Custom Next.js websites, full stack web portals, and iOS/Android mobile apps shipped in 7 days at 50% off. Start with a free consultation and get an instant estimate!",
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
    title: "Freelance Web & Mobile App Development Services — 50% OFF | Shipped in 7 Days",
    description:
      "Custom Next.js websites, full stack web portals, and iOS/Android mobile apps shipped in 7 days at 50% off. Start with a free consultation and get an instant estimate!",
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
    title: "Freelance Web & Mobile App Development Services — 50% OFF | Shipped in 7 Days",
    description:
      "Custom Next.js websites, full stack web portals, and iOS/Android mobile apps shipped in 7 days at 50% off. Start with a free consultation and get an instant estimate!",
    images: [`${siteUrl}/myprofile.png`],
    creator: "@Ayush08k",
  },
  alternates: {
    canonical: "/services",
  },
};
