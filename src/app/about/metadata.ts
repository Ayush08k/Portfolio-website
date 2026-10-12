import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.freelanceayush.com";

export const metadata: Metadata = {
  title: "About Ayush Kumar — Freelance Full Stack & Mobile App Developer",
  description:
    "Learn about Ayush Kumar, a freelance Full Stack Developer and Mobile App Developer from India with 3+ years of experience. MCA from Gurugram University, 50+ projects shipped worldwide.",
  keywords: [
    "about ayush kumar",
    "freelance developer india",
    "full stack developer background",
    "ayush kumar developer",
    "freelance web developer story",
    "hire ayush kumar",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Ayush Kumar — Freelance Full Stack & Mobile App Developer",
    description:
      "Learn about Ayush Kumar, a freelance Full Stack Developer from India with 3+ years of experience and 50+ projects shipped.",
    url: `${siteUrl}/about`,
    siteName: "Freelance Ayush",
    images: [
      {
        url: `${siteUrl}/myprofile.png`,
        width: 1200,
        height: 630,
        alt: "Ayush Kumar — Freelance Developer",
        type: "image/png",
      },
    ],
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ayush Kumar — Freelance Full Stack Developer",
    description:
      "Freelance Full Stack & Mobile App Developer from India. 3+ years experience, 50+ projects shipped.",
    images: [`${siteUrl}/myprofile.png`],
    creator: "@Ayush08k",
  },
};
