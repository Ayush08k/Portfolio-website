import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayushkumar.dev";

export const metadata: Metadata = {
  title: {
    default: "Ayush Kumar | Freelance Full Stack & Mobile App Developer — Expert Web & AI Solutions",
    template: "%s | Ayush Kumar — Developer",
  },
  description:
    "Hire Ayush Kumar, an expert freelance Full Stack Developer, Mobile App Developer & AI/ML enthusiast from India. 3+ years building React, Next.js, React Native, Expo, Node.js & TypeScript apps. Delivering premium UI/UX design, API development, app testing, and end-to-end product engineering. Available for freelance projects worldwide.",
  keywords: [
    // Name-based
    "Ayush Kumar",
    "Ayush Kumar Portfolio",
    "Ayush Kumar Developer",
    "Ayush Kumar Freelancer",
    "Ayush Kumar Full Stack",
    "Ayush Kumar React Developer",
    "Ayush Kumar India",
    // Role-based
    "Freelance Developer",
    "Freelance Full Stack Developer",
    "Freelance Web Developer",
    "Freelance App Developer",
    "Freelance Mobile Developer",
    "Freelance React Developer",
    "Freelance Next.js Developer",
    "Expert Coder",
    "Expert Developer",
    "Expert Software Engineer",
    "Expert Web Developer",
    "Expert App Developer",
    // Technology-based
    "Full Stack Developer",
    "Mobile App Developer",
    "React Developer",
    "Next.js Developer",
    "React Native Developer",
    "Expo Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    // Specialization
    "UI UX Designer",
    "UI UX Developer",
    "Product Designer",
    "App Designer",
    "Web Designer",
    "Software Designer",
    "Performance Optimizer",
    "Web Optimization Expert",
    "Website Speed Optimization",
    "SEO Optimization Developer",
    // AI/ML
    "AI Developer",
    "ML Developer",
    "AI ML Engineer",
    "Artificial Intelligence Developer",
    "Machine Learning Engineer",
    "AI App Developer",
    "AI Integration Developer",
    "LLM Developer",
    "ChatGPT Developer",
    "OpenAI Developer",
    // Testing
    "App Tester",
    "Software Tester",
    "QA Engineer",
    "Quality Assurance Developer",
    "Test Driven Developer",
    // E-Commerce
    "E-Commerce Developer",
    "Shopify Developer",
    "Online Store Developer",
    "E-Commerce App Developer",
    // Location
    "Developer India",
    "Freelance Developer India",
    "Indian Software Developer",
    "Remote Developer India",
    "Best Freelance Developer India",
    // General
    "Hire Developer",
    "Hire Full Stack Developer",
    "Hire App Developer",
    "Hire React Developer",
    "Best Developer Portfolio",
    "Top Developer 2024",
    "Top Developer 2025",
    "Software Engineer Portfolio",
    "Full Stack Engineer",
    "MERN Stack Developer",
    "REST API Developer",
    "Cross Platform App Developer",
    "SaaS Developer",
    "Startup Developer",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Ayush Kumar", url: siteUrl }],
  creator: "Ayush Kumar",
  publisher: "Ayush Kumar",
  category: "technology",
  classification: "Software Development, Web Development, Mobile App Development",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Ayush Kumar | Expert Freelance Full Stack, Mobile App & AI Developer",
    description:
      "Expert freelance developer Ayush Kumar — building React, Next.js, React Native & Node.js applications. AI/ML integrations, UI/UX design, app testing & optimization. 3+ years, 50+ apps shipped. Available for freelance & full-time roles.",
    url: siteUrl,
    siteName: "Ayush Kumar — Developer Portfolio",
    images: [
      {
        url: "/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Ayush Kumar - Expert Freelance Full Stack & Mobile App Developer",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "profile",
    firstName: "Ayush",
    lastName: "Kumar",
    username: "Ayush08k",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Kumar | Freelance Full Stack, Mobile App & AI Developer",
    description:
      "Expert freelance developer — React, Next.js, React Native, Node.js, AI/ML. 3+ years, 50+ apps shipped. Hire me for your next project!",
    images: ["/profile.jpeg"],
    creator: "@ayushkumar",
    site: "@ayushkumar",
  },
  verification: {
    // Add your Google Search Console verification code here after verifying
    // google: "your-google-site-verification-code",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Schema: Person
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Ayush Kumar",
    url: siteUrl,
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}/profile.jpeg`,
      width: 800,
      height: 800,
      caption: "Ayush Kumar - Freelance Full Stack & Mobile App Developer",
    },
    jobTitle: "Freelance Full Stack & Mobile App Developer",
    description:
      "Expert freelance software developer specializing in React, Next.js, React Native, Node.js, TypeScript, AI/ML integrations, UI/UX design, and app optimization. Available for web development, mobile app development, and AI-powered application projects worldwide.",
    email: "ayushkumar2467@gmail.com",
    nationality: "Indian",
    sameAs: ["https://github.com/Ayush08k"],
    knowsAbout: [
      "Full Stack Web Development",
      "Mobile App Development",
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "REST API Development",
      "UI/UX Design",
      "AI ML Integration",
      "Performance Optimization",
      "E-Commerce Development",
      "Software Testing",
      "MERN Stack",
      "Database Design",
      "Cloud Deployment",
      "Freelance Development",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Freelance Full Stack Developer",
      occupationLocation: {
        "@type": "Country",
        name: "India",
      },
      estimatedSalary: {
        "@type": "MonetaryAmountDistribution",
        name: "Freelance Rate",
        currency: "USD",
        median: 35,
      },
      skills: "React, Next.js, React Native, Node.js, TypeScript, AI/ML, UI/UX",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Indian Educational Institution",
    },
  };

  // Schema: ProfessionalService (for hire-intent searches)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: "Ayush Kumar — Freelance Development Services",
    description:
      "Professional freelance development services including Full Stack Web Development, Mobile App Development (iOS & Android), AI/ML Integration, UI/UX Design, App Testing, Performance Optimization, and E-Commerce solutions.",
    url: siteUrl,
    image: `${siteUrl}/profile.jpeg`,
    founder: { "@id": `${siteUrl}/#person` },
    areaServed: "Worldwide",
    availableLanguage: ["English", "Hindi"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Stack Web Development",
            description: "End-to-end web applications using React, Next.js, Node.js, and TypeScript.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "Cross-platform iOS and Android apps using React Native and Expo.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI & ML Integration",
            description: "Integrating AI/ML models, LLMs, and intelligent features into web and mobile apps.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design & Development",
            description: "Premium UI/UX design and pixel-perfect frontend implementation.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Performance Optimization",
            description: "Website and app performance auditing, SEO optimization, and speed improvements.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce Development",
            description: "Full-featured online store and e-commerce platform development.",
          },
        },
      ],
    },
  };

  // Schema: WebSite (for sitelinks search box)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Ayush Kumar Portfolio",
    description: "Official portfolio website of Ayush Kumar — Expert Freelance Full Stack & Mobile App Developer",
    author: { "@id": `${siteUrl}/#person` },
    inLanguage: "en-US",
    copyrightYear: 2025,
  };

  return (
    <html lang="en" prefix="og: https://ogp.me/ns#">
      <head>
        <meta name="theme-color" content="#050816" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
