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
    // High-intent hire queries (most valuable for conversions)
    "freelance near me",
    "hire freelance",
    "freelancer site",
    "best freelancer",
    "best full stack dev",
    "best full stack developer",
    "best full satack dev",
    "hire ayush",
    "ayush freelancer",
    "hire freelance developer India",
    "hire full stack developer",
    "hire react developer",
    "hire next.js developer",
    "hire react native developer",
    "hire mobile app developer India",
    "hire web developer India",
    "hire node.js developer",
    "hire typescript developer",
    "freelance developer for hire",
    "freelance web developer for hire",
    "affordable freelance developer",
    "remote developer for hire",
    // Name-based brand queries
    "Ayush",
    "Ayush Kumar",
    "Ayush Kumar developer",
    "Ayush Kumar portfolio",
    "Ayush Kumar full stack developer",
    "Ayush Kumar freelancer",
    "Ayush Kumar React developer",
    "Ayush Kumar Next.js developer",
    "Ayush Kumar India",
    "Ayush08k",
    // Role + location queries
    "freelance developer India",
    "freelance full stack developer India",
    "freelance web developer India",
    "freelance mobile developer India",
    "freelance react developer India",
    "freelance node.js developer India",
    "Indian full stack developer",
    "Indian mobile app developer",
    "remote developer India",
    "best freelance developer India",
    "top freelance developer India",
    // Technology-specific
    "full stack developer",
    "full stack web developer",
    "react developer",
    "next.js developer",
    "react native developer",
    "expo developer",
    "typescript developer",
    "node.js developer",
    "javascript developer",
    "nestjs developer",
    "mongodb developer",
    "mern stack developer",
    "frontend developer",
    "backend developer",
    "api developer",
    "rest api developer",
    "graphql developer",
    // Mobile app specific
    "mobile app developer",
    "ios app developer",
    "android app developer",
    "cross platform app developer",
    "react native freelancer",
    "expo freelancer",
    // Niche / service-specific
    "shopify developer",
    "wordpress developer",
    "e-commerce developer",
    "saas developer",
    "startup developer",
    "mvp developer",
    "ui ux developer",
    "ai integration developer",
    "openai api developer",
    "llm integration developer",
    "firebase developer",
    "supabase developer",
    "postgresql developer",
    // Portfolio / credibility
    "developer portfolio",
    "full stack developer portfolio",
    "react developer portfolio 2025",
    "best developer portfolio",
    "software engineer portfolio",
    "top developer 2025",
    "top freelancer 2025",

    // --- High-Intent Trending Freelancer Search Queries (100+ new keywords) ---
    "find freelance developers",
    "best site to hire developers",
    "how to hire a programmer",
    "hire coder online",
    "hire remote software engineer",
    "freelance programmer for hire",
    "hire software developer freelancer",
    "freelance coding services",
    "hire contract developer",
    "hire dedicated developer",
    "on demand software developers",
    "outsource web development",
    "hire remote development team",
    "freelance web designer near me",
    "hire full stack web developer",
    "hire remote full stack dev",
    "best full stack programmer",
    "hire javascript engineer",
    "hire typescript engineer",
    "hire nodejs developer",
    "hire nextjs developer",
    "hire reactjs developer",
    "freelance react dev",
    "freelance nextjs dev",
    "hire freelance frontend developer",
    "hire freelance backend developer",
    "freelance mern stack developer",
    "hire nestjs developer",
    "hire mongodb developer",
    "hire postgresql developer",
    "hire full stack developer remote",
    "full stack web development freelancer",
    "hire mobile app developer",
    "hire react native developer remote",
    "hire expo developer remote",
    "freelance react native developer",
    "freelance mobile app developer",
    "hire ios developer freelancer",
    "hire android developer freelancer",
    "outsource mobile app development",
    "hire cross platform app developer",
    "custom mobile app developer",
    "hire app developer for startup",
    "best react native freelance developer",
    "hire ai developer",
    "hire openai developer",
    "freelance ai integration expert",
    "hire llm integration developer",
    "hire chatgpt api developer",
    "freelance ai chatbot developer",
    "ai web development freelancer",
    "hire generative ai developer",
    "openai integration freelancer",
    "hire prompt engineering developer",
    "hire saas developer",
    "hire mvp developer for startup",
    "freelance saas development",
    "freelance mern stack developer",
    "freelance mvp builder",
    "hire shopify developer freelance",
    "hire stripe integration developer",
    "freelance ecommerce web developer",
    "hire custom web app developer",
    "rapid mvp development services",
    "startup product developer freelance",
    "hire seo optimization expert",
    "freelance core web vitals developer",
    "website page speed optimization expert",
    "hire developer to improve page speed",
    "technical seo freelancer",
    "lighthouse score optimization developer",
    "hire developer india",
    "best freelance developer from india",
    "hire remote indian developers",
    "freelance developer rates india",
    "hire affordable software developer",
    "hire budget friendly web developer",
    "hire remote developer usa timezone",
    "freelance developer english speaking",
    "hire software developer hourly",
    "hire project based developer",
    "hire freelance web engineer",
    "hire app coder",
    "hire full time contract developer",
    "hire frontend engineer remote",
    "hire backend engineer remote",
    "find app developer for hire",
    "hire programming freelancer",
    "freelance software engineering services",
    "independent software developer for hire",
    "hire react native programmer",
    "hire nextjs programmer",
    "hire nodejs programmer",
    "hire web designer coder",
    "freelance developer portfolio nextjs",
    "outsource custom software development",
    "hire fullstack engineer",
    "hire freelance coder",
    "hire professional web developer",
    "custom software development freelancer",
    "hire api developer freelance",
    "freelance socket io developer",
    "freelance typescript programmer",
    "hire next.js expert",
    "hire react native expert",
    "hire expo app expert",
    "hire full stack web design expert",
    "hire mobile app design expert",
    "remote web dev for hire",
    "remote app dev for hire",

    // --- Global Target Markets (USD, GBP, CAD, EUR, etc. higher than INR) ---
    // USA / America
    "hire freelance developer usa",
    "remote software developer united states",
    "hire nextjs developer usa",
    "react native freelancer united states",
    "best freelance web developer new york",
    "hire full stack developer san francisco",
    "hire remote app developer california",
    "freelance react developer texas",
    "remote nextjs developer boston",
    "hire software programmer chicago",
    "full stack developer los angeles",
    "hire remote developer washington",
    "freelance web developer seattle",
    "hire mobile app developer miami",
    "remote web developer austin",
    "hire nodejs developer usa",
    "freelance developer nyc",
    "hire software developer silicon valley",
    "affordable remote developers usa",
    "hire freelance programmer in usd",
    "american companies hiring indian developers",
    "hire contract software engineer usa",
    "remote full stack dev usa",
    "hire next.js expert united states",
    "react native mobile app developer usa",
    "hire remote web dev us timezone",
    "hire freelance coder us dollar",
    "startup mvp developer usa",
    "outsource software development to india from usa",
    "hire remote software programmer america",
    "hire freelance web designer usa",
    "hire full stack web developer usd",
    "hire reactjs developer usa",
    "react native developer for hire usa",
    "hire ai integration developer united states",

    // United Kingdom / England
    "hire freelance developer uk",
    "remote software developer united kingdom",
    "hire nextjs developer london",
    "react native freelancer uk",
    "best freelance web developer england",
    "hire full stack developer manchester",
    "hire remote app developer birmingham",
    "freelance react developer uk",
    "remote nextjs developer london",
    "hire software programmer leeds",
    "full stack developer glasgow",
    "hire remote developer uk timezone",
    "freelance web developer edinburgh",
    "hire mobile app developer uk",
    "remote web developer bristol",
    "hire nodejs developer uk",
    "freelance developer london",
    "hire software developer united kingdom",
    "affordable remote developers uk",
    "hire freelance programmer in gbp",
    "uk companies hiring indian developers",
    "hire contract software engineer uk",
    "remote full stack dev uk",
    "hire next.js expert london",
    "react native mobile app developer uk",
    "hire remote web dev uk",
    "hire freelance coder british pound",
    "startup mvp developer uk",
    "outsource software development to india from uk",
    "hire remote software programmer uk",

    // Canada
    "hire freelance developer canada",
    "remote software developer canada",
    "hire nextjs developer toronto",
    "react native freelancer canada",
    "best freelance web developer vancouver",
    "hire full stack developer montreal",
    "hire remote app developer calgary",
    "freelance react developer canada",
    "remote nextjs developer ottawa",
    "hire software programmer edmonton",
    "full stack developer canada",
    "hire remote developer canada timezone",
    "freelance web developer toronto",
    "hire mobile app developer canada",
    "remote web developer vancouver",
    "hire nodejs developer canada",
    "freelance developer toronto",
    "affordable remote developers canada",
    "hire freelance programmer in cad",
    "canadian companies hiring indian developers",
    "hire contract software engineer canada",
    "remote full stack dev canada",
    "hire next.js expert canada",
    "react native mobile app developer canada",
    "outsource software development to india from canada",

    // Europe (Eurozone + Switzerland)
    "hire freelance developer europe",
    "remote software developer europe",
    "hire nextjs developer germany",
    "react native freelancer france",
    "best freelance web developer switzerland",
    "hire full stack developer netherlands",
    "hire remote app developer amsterdam",
    "freelance react developer berlin",
    "remote nextjs developer paris",
    "hire software programmer zurich",
    "full stack developer dublin",
    "hire remote developer europe timezone",
    "freelance web developer geneva",
    "hire mobile app developer ireland",
    "remote web developer germany",
    "hire nodejs developer europe",
    "freelance developer munich",
    "affordable remote developers europe",
    "hire freelance programmer in eur",
    "european companies hiring indian developers",
    "hire contract software engineer switzerland",
    "remote full stack dev germany",
    "hire next.js expert europe",
    "react native mobile app developer switzerland",
    "hire remote web dev europe",
    "hire freelance coder swiss franc",
    "startup mvp developer germany",
    "outsource software development to india from europe",
    "hire remote software programmer germany",
    "freelance developer brussels",

    // Australia & New Zealand
    "hire freelance developer australia",
    "remote software developer new zealand",
    "hire nextjs developer sydney",
    "react native freelancer melbourne",
    "best freelance web developer auckland",
    "hire full stack developer brisbane",
    "hire remote app developer perth",
    "freelance react developer australia",
    "remote nextjs developer wellington",
    "hire software programmer australia",
    "full stack developer new zealand",
    "hire remote developer australia timezone",
    "freelance web developer sydney",
    "hire mobile app developer melbourne",
    "outsource software development to india from australia",

    // Middle East & Singapore
    "hire freelance developer singapore",
    "remote software developer dubai",
    "hire nextjs developer uae",
    "react native freelancer singapore",
    "best freelance web developer qatar",
    "hire full stack developer saudi arabia",
    "hire remote app developer abu dhabi",
    "freelance react developer singapore",
    "remote nextjs developer dubai",
    "hire software programmer kuwait",
    "full stack developer riyadh",
    "hire remote developer singapore",
    "freelance web developer dubai",
    "hire mobile app developer saudi",
    "outsource software development to india from uae",

    // --- Project Pricing & Scope Estimator Keywords ---
    "project pricing estimator tool",
    "interactive cost calculator web development",
    "remote developer project budget estimator",
    "freelance software cost calculator",
    "how much does a full stack app cost",
    "estimate cost of mobile app development",
    "landing page cost estimator",
    "ai integration pricing freelance",
    "e-commerce website budget calculator",
    "saas portal development cost estimator",
    "stripe payments integration freelance cost",
    "priority rush delivery freelance developer",
    "react native app cost estimate calculator",
    "freelancer estimate tool",
    "calculate project budget remote developer",
    "custom cms setup cost estimate",
    "wordpress developer hourly rates calculator",
    "shopify store development pricing estimator",
    "software project scope planner",
    "app development timeline estimator",
    "website project delivery duration calculator",
    "cost of custom dashboard development",
    "hire developer project cost breakdown",
    "pricing calculator for mobile app development",
    "full stack developer quote generator",
    "freelancer project pricing matrix",
    "custom app developer quote estimator",
    "dynamic pricing model freelance developer",
    "freelance website estimator tool online",
    "best freelance cost estimator",
    "budget helper tool for startup mvp",
    "cost to build mvp app freelancer",
    "outsource mvp budget estimator",
    "nextjs development cost calculator",
    "nodejs backend api price estimate",
    "ai agent integration pricing remote coder",
    "rag application development pricing freelancer",
    "generative ai chatbot scope calculator",
    "dashboard builder project rate estimator",
    "stripe connect dev cost estimate",
    "e-commerce online shop pricing guide",
    "web dev cost planner tool",
    "custom software estimation tool",
    "software developer pricing estimator",
    "app scope calculator online",
    "cost of hiring freelance app developer",
    "dynamic app budget planning",
    "fast delivery web developer rates",
    "urgent project delivery cost freelancer",
    "express app development freelance price",
    "remote developer rates estimator",
    "estimate project timeline and price",
    "project cost estimator for startups",

    // --- Cheap & Budget-Friendly Developer Keywords ---
    "cheap web developer",
    "cheap app developer",
    "cheap freelance coder",
    "cheap full stack developer",
    "cheap nextjs developer",
    "cheap react native developer",
    "cheap mobile app development",
    "cheap website builder developer",
    "cheap software engineer freelance",
    "low cost web developer",
    "low cost app developer",
    "low cost freelance programmer",
    "low cost full stack dev",
    "low cost mobile app development",
    "affordable web developer near me",
    "affordable app developer near me",
    "affordable freelance coder",
    "affordable custom software development",
    "budget friendly web developer",
    "budget friendly app developer",
    "budget web development services",
    "budget mobile app development",
    "value for money web developer",
    "value for money app developer",
    "cheap remote developer",
    "cheap developer india",
    "cheap full stack developer india",
    "cheap web developer for startups",
    "cheap app developer for startups",
    "cheap mvp developer",
    "cheap software development company",
    "cheap freelance software engineer",
    "cheap nodejs developer",
    "cheap react developer",
    "affordable nextjs developer freelance",
    "affordable react native developer freelance",
    "low price website developer",
    "low price mobile app developer",
    "inexpensive web developer",
    "inexpensive app developer",
    "best cheap web developer",
    "best cheap app developer",
    "cheap frontend developer",
    "cheap backend developer",
    "cheap e-commerce developer",
    "cheap shopify developer",
    "affordable startup mvp builder",
    "hire cheap programmer online",
    "hire cheap web dev remote",
    "hire cheap mobile app coder",
    "cheap freelance programmer rates",
    "affordable remote full stack developer",

    // --- Short & General Freelance Search Tags ---
    "freelance",
    "freelancer",
    "freelancing",
    "best freelance",
    "best freelancer",
    "cheap freelance",
    "cheap freelancer",
    "hire freelance",
    "hire freelancer",
    "find freelance",
    "find freelancer",
    "top freelance",
    "top freelancer",
    "pro freelance",
    "pro freelancer",
    "remote freelance",
    "remote freelancer",
    "independent freelance",
    "independent freelancer",
    "freelance dev",
    "freelance coder",
    "freelance programmer",
    "freelancer dev",
    "freelancer coder",
    "freelancer programmer",
    "best freelance dev",
    "best freelance coder",
    "best freelance programmer",
    "cheap freelance dev",
    "cheap freelance coder",
    "cheap freelance programmer",
    "affordable freelance",
    "affordable freelancer",
    "affordable freelance dev",
    "affordable freelance coder",
    "affordable freelance programmer",
    "hire freelance dev",
    "hire freelance coder",
    "hire freelance programmer",
    "hire remote freelance",
    "hire remote freelancer",
    "freelancer for hire",
    "freelancer site",
    "freelancer website",
    "freelancer online",
    "local freelancer",
    "freelance developer near me",
    "hire top freelancer",
    "freelance software dev",
    "freelancer app developer",
    "freelancer web developer",
    "best freelance service",

    // --- Services Page Specific Keywords ---
    "full stack development services",
    "web development services india",
    "mobile app development services",
    "custom software development services",
    "react development services",
    "next.js development services",
    "ui ux design and development services",
    "api development and integration services",
    "saas application development services",
    "ai powered web development services",
    "e-commerce development services india",
    "startup web development services",
    "freelance development services for businesses",
    "enterprise software development freelancer",
    "website redesign services",
    "website speed optimization services",
    "landing page design and development services",
    "web app development company alternative",
    "best development services for small business",
    "full service freelance web developer",

    // --- Blog & Technical Content Keywords ---
    "react native development blog",
    "next.js tutorials for beginners",
    "full stack developer blog 2025",
    "web development tips india",
    "javascript best practices blog",
    "typescript developer blog",
    "nodejs rest api tutorial",
    "freelance developer journey blog",
    "how to build a saas app tutorial",
    "react native vs flutter comparison",
    "nextjs vs gatsby comparison",
    "mern stack tutorial 2025",
    "expo react native tutorial 2025",
    "ai integration tutorial openai",
    "build a portfolio site nextjs tutorial",
    "best tech stack for startups 2025",
    "freelance tips for developers india",
    "how to hire a freelance developer guide",
    "web performance optimization tutorial",
    "build fullstack app with nextjs nodejs",

    // --- Case Study & Portfolio Keywords ---
    "freelance developer case study",
    "react native app case study",
    "nextjs web app case study",
    "saas dashboard case study portfolio",
    "e-commerce project case study",
    "ai chatbot project showcase",
    "mobile app portfolio case study",
    "real world projects developer portfolio",
    "startup app development case study",
    "full stack developer project examples",
    "live web app project showcase",
    "developer case study portfolio 2025",
    "ayush kumar project case study",
    "react native project portfolio 2025",
    "nextjs project showcase portfolio",
    "custom ai integration project example",
    "stripe payment integration case study",
    "cms dashboard development case study",
    "portfolio with live project demos",
    "full stack web app case study india",

    // --- Pricing Estimator & Indian Market Keywords ---
    "web development cost in india 2025",
    "how much does a freelance developer charge in india",
    "mobile app development cost india rupees",
    "freelance developer rates india inr",
    "affordable app development for indian startups",
    "web development budget calculator india",
    "software project cost estimator india",
    "negotiate freelance developer price india",
    "indian startup app development cost",
    "best affordable freelance developer for india",
    "development cost calculator for indian businesses",
    "custom web app price india",
    "hire developer at inr rates",
    "freelance developer price negotiation india",
    "low cost app development india 2025",

    // --- About / Personal Brand Keywords ---
    "who is ayush kumar developer",
    "ayush kumar freelance web developer india",
    "ayush kumar react native developer",
    "ayush kumar next.js expert",
    "best indian freelance developer 2025",
    "top rated freelance developer india portfolio",
    "experienced full stack developer freelance",
    "reliable freelance developer india",
    "passionate software engineer portfolio",
    "professional freelance developer about page",
    "hire experienced react developer india",
    "hire professional mobile app developer india",

    // --- 2025 Trending Tech & Niche Keywords ---
    "vercel deployment nextjs developer",
    "supabase postgres freelance developer",
    "pocketbase developer freelance",
    "trpc nextjs developer for hire",
    "bun runtime developer freelance",
    "shadcn ui developer for hire",
    "framer motion animation developer",
    "threejs 3d web developer freelance",
    "webrtc developer freelance india",
    "websocket real time app developer",
    "rag pipeline developer freelance",
    "langchain developer for hire",
    "pinecone vector database developer",
    "clerk auth integration developer",
    "next-auth developer freelance india",

    // --- Personal Brand Name Variations (High-Intent Identity Searches) ---
    "ayush",
    "ayush freelance",
    "freelance ayush",
    "ayush dev",
    "ayush developer",
    "ayush coder",
    "ayush programmer",
    "ayush web developer",
    "ayush app developer",
    "ayush full stack",
    "ayush kumar dev",
    "ayush kumar coder",
    "ayush kumar portfolio 2025",
    "ayush kumar web dev",
    "ayush kumar app dev",
    "ayush kumar mobile dev",
    "ayush kumar software engineer",
    "ayush kumar react",
    "ayush kumar nextjs",
    "ayush kumar node",
    "ayush kumar typescript",
    "ayush kumar expo",
    "ayush kumar mern",
    "ayush08k github",
    "ayush08k portfolio",
    "freelance ayush kumar",
    "hire ayush kumar",
    "hire ayush",
    "ayush freelance developer",
    "ayush freelancer india"
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
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Gurugram University",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
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
        item: `${siteUrl}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Contact",
        item: `${siteUrl}/#contact`,
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

        {/* ─── Canonical & Alternate ───────────────────────── */}
        <link rel="canonical" href={siteUrl} />

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
