import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";
const siteName = "Ayush Kumar — Portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  title: {
    default: "Ayush Kumar | Best Freelance Full Stack Dev & Mobile App Developer for Hire",
    template: "%s | Ayush Kumar — Best Freelance Full Stack Dev",
  },
  description:
    "Ayush Kumar — Top Freelance Full Stack & Mobile App Developer. Specializing in high-performance web applications, React Native mobile apps, and AI integrations. Hire me today for custom, scalable software.",
  keywords: [
    "Ayush Kumar",
    "freelance full stack developer",
    "hire full stack developer India",
    "React developer",
    "Next.js developer",
    "React Native developer",
    "mobile app developer",
    "web developer portfolio",
    "freelance web developer",
    "Node.js developer",
    "TypeScript developer",
    "3D web developer",
    "Three.js developer",
    "MERN stack developer",
    "AI integration developer",
    "freelance developer India",
  ],
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
    title: "Ayush Kumar | Best Freelance Full Stack Dev & Mobile App Developer for Hire",
    description:
      "Ayush Kumar — Top Freelance Full Stack & Mobile App Developer. Specializing in high-performance web applications, React Native mobile apps, and AI integrations. Hire me today for custom, scalable software.",
    url: siteUrl,
    siteName,
    images: [
      {
        url: `${siteUrl}/myprofile.png`,
        width: 1200,
        height: 630,
        alt: "Ayush Kumar — Best Freelance Full Stack Dev & Mobile App Developer for Hire",
        type: "image/png",
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
    title: "Ayush Kumar | Best Freelance Full Stack Dev & Mobile App Developer for Hire",
    description:
      "Ayush Kumar — Top Freelance Full Stack & Mobile App Developer. Specializing in high-performance web applications, React Native mobile apps, and AI integrations. Hire me today for custom, scalable software.",
    images: [`${siteUrl}/myprofile.png`],
    creator: "@Ayush08k",
    site: "@Ayush08k",
  },
  verification: {
    google: "ie5C0Pvhl5RFbLloNTI7fXPBaxOEwiQBB5rfFBw_qlM",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  // ─── Schema: Person ───────────────────────────────────────────────────
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Ayush Kumar",
    givenName: "Ayush",
    familyName: "Kumar",
    url: siteUrl,
    image: {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#personImage`,
      url: `${siteUrl}/myprofile.png`,
      width: 800,
      height: 800,
      caption: "Ayush Kumar — Freelance Full Stack & Mobile App Developer from India",
    },
    jobTitle: "Freelance Full Stack Developer & Mobile App Developer",
    description:
      "Ayush Kumar is an expert freelance full stack developer and mobile app developer from India, specializing in React, Next.js, React Native, Node.js, TypeScript, NestJS, and AI integrations. He has 3+ years of experience and has shipped 50+ web and mobile applications for clients worldwide.",
    email: "ayushkumar2467@gmail.com",
    nationality: "Indian",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    sameAs: [
      "https://github.com/Ayush08k",
      "https://www.linkedin.com/in/ayush08k/",
      "https://www.instagram.com/ayush08.k/",
      "https://x.com/aayush08k",
    ],
    knowsAbout: [
      "Full Stack Web Development",
      "Mobile App Development",
      "React.js",
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "NestJS",
      "Express.js",
      "REST API Development",
      "MongoDB",
      "PostgreSQL",
      "Firebase",
      "Supabase",
      "UI/UX Design",
      "AI Integration",
      "LLM Integration",
      "Performance Optimization",
      "SEO Optimization",
      "E-Commerce Development",
      "Shopify Development",
      "WordPress Development",
      "Software Testing",
      "MERN Stack",
      "Database Design",
      "Vercel Deployment",
      "Socket.IO",
      "Framer Motion",
      "Tailwind CSS",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Freelance Full Stack Developer",
      occupationLocation: { "@type": "Country", name: "India" },
      estimatedSalary: {
        "@type": "MonetaryAmountDistribution",
        name: "Freelance Hourly Rate",
        currency: "USD",
        median: 35,
        minValue: 20,
        maxValue: 60,
      },
      skills:
        "React, Next.js, React Native, Node.js, TypeScript, NestJS, MongoDB, PostgreSQL, AI/ML, UI/UX, Tailwind CSS, Framer Motion",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Maharshi Dayanand University",
        address: { "@type": "PostalAddress", addressCountry: "IN" },
      },
      {
        "@type": "EducationalOrganization",
        name: "Gurugram University",
        address: { "@type": "PostalAddress", addressCountry: "IN" },
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Self-Employed / Freelance",
    },
    award: "50+ successful projects delivered worldwide",
    numberOfEmployees: 1,
  };

  // ─── Schema: ProfessionalService (hire-intent) ────────────────────────
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: "Ayush Kumar — Freelance Development Services",
    alternateName: "Ayush Kumar Developer",
    description:
      "Expert freelance development services by Ayush Kumar — Full Stack Web Development, Mobile App Development (iOS & Android via React Native), AI/ML Integration, UI/UX Design, SEO Optimization, Performance Tuning, E-Commerce (Shopify/Next.js), WordPress, and SaaS Development. Competitive pricing and fast delivery worldwide.",
    url: siteUrl,
    image: `${siteUrl}/myprofile.png`,
    logo: `${siteUrl}/logo.png`,
    founder: { "@id": `${siteUrl}/#person` },
    areaServed: "Worldwide",
    availableLanguage: ["English", "Hindi"],
    priceRange: "$20–$60/hr",
    currenciesAccepted: "USD, INR",
    paymentAccepted: "PayPal, Bank Transfer, Wise",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Freelance Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Stack Web Development",
            description:
              "End-to-end web applications built with React, Next.js, Node.js, TypeScript, and MongoDB/PostgreSQL. High performance, SEO-ready, and responsive.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description:
              "Cross-platform iOS and Android mobile apps using React Native and Expo with smooth animations and offline support.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI & Machine Learning Integration",
            description:
              "Integrate OpenAI, LLMs, and AI/ML models into web and mobile applications for intelligent automation and features.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce Development",
            description:
              "Custom Shopify stores and Next.js e-commerce platforms with Stripe integration, inventory management, and SEO optimization.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Performance & SEO Optimization",
            description:
              "Website auditing, Core Web Vitals improvement, Lighthouse optimization, structured data, and page speed enhancements for higher Google rankings.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design & Development",
            description:
              "Pixel-perfect, premium UI/UX design implementation with Framer Motion animations and Tailwind CSS for exceptional user experiences.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "WordPress & Shopify Development",
            description:
              "Custom WordPress theme and plugin development and Shopify Liquid customization for high-converting business websites.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SaaS & Startup MVP Development",
            description:
              "Rapid prototyping and production-ready SaaS application development for startups, featuring scalable architecture and fast time-to-market.",
          },
        },
      ],
    },
  };

  // ─── Schema: Organization (site logo structured data) ──────────────────
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Ayush Kumar",
    alternateName: "Ayush Kumar Portfolio",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/logo.png`,
    description: "Ayush Kumar — Top Freelance Full Stack & Mobile App Developer. Building custom, high-performance web and mobile apps.",
    sameAs: [
      "https://github.com/Ayush08k",
      "https://www.linkedin.com/in/ayush08k/",
      "https://www.instagram.com/ayush08.k/",
      "https://x.com/aayush08k"
    ]
  };

  // ─── Schema: WebSite (sitelinks search box & site name) ──────────────────
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Ayush Kumar",
    alternateName: ["Ayush Kumar Portfolio", "Freelance Ayush"],
    description:
      "Ayush Kumar — Top Freelance Full Stack & Mobile App Developer. Specializing in high-performance web applications, React Native mobile apps, and AI integrations. Hire me today for custom, scalable software.",
    author: { "@id": `${siteUrl}/#person` },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: { "@id": `${siteUrl}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // ─── Schema: BreadcrumbList ───────────────────────────────────────────
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Services",
        item: `${siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "About",
        item: `${siteUrl}/about`,
      },
    ],
  };

  // ─── Schema: FAQPage (FAQ snippets in Google results) ─────────────────
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I hire Ayush Kumar as a freelance developer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can hire Ayush Kumar by visiting his portfolio at ${siteUrl.replace(/^https?:\/\//, "")} and using the Contact form to describe your project, budget, and timeline. He typically responds within a few hours.`,
        },
      },
      {
        "@type": "Question",
        name: "What technologies does Ayush Kumar specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ayush Kumar specializes in React, Next.js, React Native, Expo, Node.js, NestJS, TypeScript, MongoDB, PostgreSQL, Tailwind CSS, Framer Motion, and AI/ML integrations using OpenAI and LLMs.",
        },
      },
      {
        "@type": "Question",
        name: "Does Ayush Kumar work with international clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Ayush Kumar works with clients worldwide. He is based in India and is available for remote freelance work for clients across the US, UK, Europe, Australia, and beyond.",
        },
      },
      {
        "@type": "Question",
        name: "How much does Ayush Kumar charge for freelance development?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ayush Kumar offers competitive freelance rates starting from $20/hr, with project-based pricing also available. Landing pages start at $600, full stack web apps from $1,000, mobile apps from $2,000, e-commerce from $1,500, and AI integrations from $1,600. Try our new interactive Project Pricing & Scope Estimator on the site for a dynamic quote.",
        },
      },
      {
        "@type": "Question",
        name: "Can Ayush Kumar build mobile apps?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Ayush Kumar is an expert React Native and Expo developer who builds high-quality cross-platform iOS and Android mobile applications with smooth UI/UX, offline support, and real-time features.",
        },
      },
      {
        "@type": "Question",
        name: "Is Ayush Kumar available for full-time roles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Ayush Kumar is actively seeking full-time opportunities where he can contribute his full stack and mobile development expertise to an innovative product team.",
        },
      },
    ],
  };

  // ─── Schema: Review/AggregateRating ──────────────────────────────────
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: "Ayush Kumar — Freelance Developer",
    url: siteUrl,
    image: `${siteUrl}/myprofile.png`,
    description: "Expert freelance Full Stack and Mobile App Developer available for hire worldwide.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "10",
      reviewCount: "10",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Sarah Jenkins" },
        reviewBody:
          "Ayush built our Next.js web app ahead of schedule at a remarkably low cost. The SEO improvements he made really boosted our search traffic. Definitely hiring him again!",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Amit Sharma" },
        reviewBody:
          "Ayush built a really clean e-commerce site for us. He handled everything perfectly on time and his pricing was very fair. Super happy with the final product.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Rohan Malhotra" },
        reviewBody:
          "Ayush did a complete site audit, optimized our theme, and fixed our SEO. The site loads instantly now and our conversion rate went up significantly.",
      },
    ],
  };

  return (
    <html lang="en" prefix="og: https://ogp.me/ns#">
      <head>
        {/* ─── Core PWA & Device Meta ──────────────────────── */}
        <meta name="theme-color" content="#050816" />
        <meta name="color-scheme" content="dark" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ayush Kumar Dev" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="application-name" content="Ayush Kumar Portfolio" />

        {/* ─── Geo & Language ──────────────────────────────── */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="geo.position" content="28.6139;77.2090" />
        <meta name="ICBM" content="28.6139, 77.2090" />
        <meta name="language" content="English" />
        <meta httpEquiv="content-language" content="en-US" />

        {/* ─── Crawl Hints ─────────────────────────────────── */}
        <meta name="revisit-after" content="3 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />

        {/* ─── Authorship & Copyright ──────────────────────── */}
        <meta name="author" content="Ayush Kumar" />
        <meta name="copyright" content={`© ${new Date().getFullYear()} Ayush Kumar`} />
        <meta name="designer" content="Ayush Kumar" />
        <meta name="owner" content="Ayush Kumar" />
        <meta name="reply-to" content="ayushkumar2467@gmail.com" />
        <meta name="url" content={siteUrl} />
        <meta name="identifier-URL" content={siteUrl} />
        <meta name="category" content="Software Development, Freelance Development, Web Apps, Mobile Apps" />
        <meta name="classification" content="Business" />
        <meta name="subject" content="Freelance Full Stack and Mobile App Development" />
        <meta name="summary" content="Ayush Kumar is a freelance Full Stack and Mobile App Developer from India, specializing in React, Next.js, React Native, Node.js, and TypeScript." />
        <meta name="abstract" content="Expert freelance developer available for hire globally, with 3+ years experience and 50+ shipped products." />

        {/* ─── Referrer & Link Policy ──────────────────────── */}
        <meta name="referrer" content="origin-when-cross-origin" />

        {/* ─── Fonts Preconnect (performance = better CWV = better rankings) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Canonical is handled per-page via Next.js metadata alternates */}

        {/* ─── Social Profiles (rel=me helps E-E-A-T) ─────── */}
        <link rel="me" href="https://github.com/Ayush08k" />
        <link rel="me" href="https://www.linkedin.com/in/ayush08k/" />

        {/* ─── Schema.org JSON-LD ──────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      </head>
      <body>
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
