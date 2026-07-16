import { NextResponse } from "next/server";
import { PORTFOLIO_DATA } from "@/data/portfolio";

// Dynamically generate the System Prompt for Gemini based on central Portfolio Data
const getSystemPrompt = () => {
  const p = PORTFOLIO_DATA.personal;
  const s = PORTFOLIO_DATA.skills;
  const b = PORTFOLIO_DATA.businessGuides;
  
  const projectsList = PORTFOLIO_DATA.projects.map((proj) => {
    return `- ${proj.title.replace(/\n/g, " ")}: ${proj.description} Tech: ${proj.tech.join(", ")}.${proj.github && proj.github !== "#" ? ` GitHub: ${proj.github}` : ""}${proj.link && proj.link !== "#" ? ` Demo: ${proj.link}` : ""}`;
  }).join("\n");

  const servicesList = PORTFOLIO_DATA.services.map((ser) => {
    return `- ${ser.name}: ${ser.description}`;
  }).join("\n");

  return `You are the highly professional and intelligent AI Assistant for ${p.name}. Your name is "Ask Me". Your goal is to answer questions about ${p.name}'s professional background, skills, projects, rates, and availability in a sleek, expert, and persuasive manner. You want to convince potential clients, recruiters, and collaborators that ${p.name} is the top-tier talent they need.

About ${p.name}:
- Name: ${p.name}
- Title: ${p.role}
- Experience: Over ${p.experienceYears} years of professional freelancing, with ${p.deployedCount}+ successful web and mobile app deployments for clients worldwide.
- Career Goal: ${p.bioIntro} ${p.bioDetail} ${p.jobSearchStatus}

Technical Expertise (Full list of tools/languages/frameworks):
${s.marquee.join(", ")}

Services Provided:
${servicesList}

Featured Projects (Source codes available on GitHub):
${projectsList}
*Note: ${p.name} respects client confidentiality; live commercial project source code is kept private, but open-source replicas and featured products demonstrate full production capabilities.

Freelance Rates & Business Guide:
- Premium Interactive Landing Page: ${b.pricing.landingPage} (focused on high conversion, extreme speed, and micro-animations).
- Custom Full-Stack Web App / SaaS: ${b.pricing.webApp} (end-to-end, high scalability, solid architecture).
- Retainers & Custom Contracts: ${b.pricing.retainer}.
*Every project includes rigorous testing, Google Lighthouse speed audits, and a comprehensive ${b.warrantyDays}-day warranty.

Delivery Speed & Timelines:
- Premium Landing Pages: Delivered in **7 days**.
- Full Stack / SaaS Projects: Typically takes **2-3 weeks**, but can deliver in **10 days or even faster** depending on requirements.

Support, NDA & Location FAQ:
- Post-Launch Support: **30 days of free maintenance and support** on all projects.
- NDA: Happy to sign an **NDA** before discussing project details.
- Location & Availability: Based in **India**, available **24/7 as per project needs** to align with client timezones.
- Design Files: Can work seamlessly with existing design files (**Figma, Adobe XD, Sketch**, etc.).

Style and Tone:
- Professional, articulate, intelligent, and polite. Keep the tone premium.
- Answer queries directly and avoid bloated preambles.
- Use markdown formatting (bolding, bullet points, numbered lists, clean headers) to make responses beautiful, easy to scan, and incredibly readable.
- If the guest's question is vague, answer it with confidence while guiding them to the specific value ${p.name} brings.
- Be proactive in urging the user to hire ${p.name}, request a custom quote, or fill out the Contact form at the bottom of the page. Say things like "I highly recommend filling out the Contact form below so ${p.name} can review your project goals directly!"`;
};

// Dynamically generate fallback intents from central Portfolio Data
const getLocalIntents = () => {
  const p = PORTFOLIO_DATA.personal;
  const b = PORTFOLIO_DATA.businessGuides;

  const projectsList = PORTFOLIO_DATA.projects.map((proj, idx) => {
    return `${idx + 1}. **${proj.title.replace(/\n/g, " ")}**\n   ${proj.description}\n   *Tech: ${proj.tech.join(", ")}*${proj.github && proj.github !== "#" ? `\n   *GitHub: [${proj.title.split('\n')[0]}](${proj.github})*` : ""}`;
  }).join("\n\n");

  const servicesList = PORTFOLIO_DATA.services.map((ser) => {
    return `• **${ser.name}**: ${ser.description}`;
  }).join("\n");

  return [
    {
      name: "greetings",
      keywords: ["hello", "hi", "hey", "greetings", "yo", "who are you", "what is your name", "about yourself", "who is ayush", "tell me about", "introduce", "professional background", "experience", "background"],
      reply: `Hi there! 👋 Welcome to Ayush's portfolio.

**Ayush** is a Full Stack & Mobile App Developer with **3+ years of professional freelancing experience**, having successfully designed, developed, and deployed **50+ live websites and mobile applications** for clients across diverse industries.

He started his development journey in **2018** and has since built a sharp expertise in delivering high-performance, production-grade digital products — from sleek marketing landing pages to complex SaaS portals and AI-integrated systems.

I am **Ask Me**, Ayush's AI Copilot. I can help you learn about his tech stack, project pricing, delivery timelines, availability, or how to get started. What would you like to know?`
    },
    {
      name: "availability",
      keywords: ["available", "availability", "free", "schedule", "timing", "calendar", "full time", "full-time", "hire", "job", "opportunity", "opening", "contract", "freelance", "startups", "agencies", "enterprise", "custom enterprise contracts"],
      reply: `${p.name} is currently available for select, high-quality engagements. Here is a breakdown:

• **Freelance Contracts**: ${b.availability.freelance}
• **Full-Time Opportunities**: ${b.availability.fullTime}
• **Timezone**: Based in **India (IST, UTC+5:30)**, and fully flexible to align with **US, UK, EU, or AU client timezones** as per project needs.

${p.name} collaborates with early-stage **startups**, established **design agencies**, and **enterprise clients** on both fixed-scope and ongoing retainer contracts.

To lock in a discovery call or discuss your specific requirements, please fill out the **Contact form** at the bottom of this page!`
    },
    {
      name: "techstack",
      keywords: ["stack", "tech", "technology", "skills", "languages", "frameworks", "react", "next", "node", "typescript", "javascript", "backend", "frontend", "database", "sql", "nosql", "cloud", "aws"],
      reply: `${p.name} commands a comprehensive, production-tested tech stack covering the full development lifecycle:

**Frontend & UI**
• React, Next.js, TypeScript, JavaScript (ES6+), Vanilla CSS, Tailwind CSS, Framer Motion, GSAP

**Mobile Development**
• React Native, Expo, Kotlin (Android), Jetpack Compose

**Backend & APIs**
• Node.js, Express.js, NestJS, REST APIs, Spring Boot, Rust, Go

**Databases & Storage**
• MongoDB, PostgreSQL, MySQL, Firebase, Supabase, Prisma, Sequelize, SQLite

**AI & Automation**
• Meta AI, OpenAI (GPT-4), Google Gemini, LangChain, Hugging Face Transformers

**Cloud & DevOps**
• AWS (EC2, S3, Lambda, ECS), Vercel, Docker, Kubernetes

**E-Commerce**
• Shopify (Liquid), Stripe API, WordPress

He specializes in building **scalable, production-grade applications** that merge stunning UI/UX with robust, secure backend engineering.`
    },
    {
      name: "rates",
      keywords: ["rate", "rates", "cost", "costing", "price", "pricing", "budget", "money", "quote", "charge", "charges", "estimate", "fee", "fees", "how much"],
      reply: `${p.name} offers transparent, fixed-scope pricing — no surprise hourly billing:

• **Premium Interactive Landing Page**: **${b.pricing.landingPage}**
  *(High-conversion design, micro-animations, mobile-optimized, blazing fast)*
• **Custom Full-Stack Web App / SaaS**: **${b.pricing.webApp}**
  *(End-to-end architecture, scalable database, polished UI/UX)*
• **Ongoing Retainers**: ${b.pricing.retainer}

**Every project includes:**
✔ Fully responsive, cross-device tested UI
✔ Google Lighthouse performance score of **95+**
✔ **${b.warrantyDays}-day free post-launch warranty and maintenance**
✔ Clean, documented, hand-over-ready codebase

To get a detailed custom proposal for your specific project, fill out the **Contact form** at the bottom of the page — Ayush reviews every inquiry personally!`
    },
    {
      name: "projects",
      keywords: ["project", "projects", "portfolio", "work", "featured", "examples", "built", "created", "done", "developed", "show me"],
      reply: `${p.name} has successfully deployed **50+ websites and applications** across Web, Mobile, AI, E-Commerce, and SaaS categories. Here are some notable highlights:

**Web & SaaS**
• **Gurugram University Attendance System** — MERN Stack portal for 10,000+ students with automated scheduling and CSV report generation. *(React, Node.js, MongoDB)*
• **JLM Tournaments** — Real-time gaming tournament platform with live brackets and leaderboards. *(React, Vite, Supabase, Express)*

**Mobile Apps**
• **Feedo** — B2B mobile feedback platform with offline sync, real-time NPS scoring, and Socket.IO alerts. *(React Native, Expo, NestJS)*
• **Music Player App** — Full-featured streaming app with adaptive album-art themes and offline playback. *(React Native, Expo, Redux Toolkit)*

**AI Projects**
• **AI Chatbot for E-Commerce** — RAG-powered support assistant resolving 70% of tickets instantly. *(LangChain, OpenAI GPT-4, Pinecone)*
• **AI Code Reviewer** — GitHub-integrated PR reviewer using Google Gemini for automated code feedback. *(Node.js, Gemini API, Docker)*

**E-Commerce**
• **Starbucks 3D Website** — Immersive 3D product configurator with WebGL, GSAP, and React Three Fiber.
• **Clothing E-Commerce** — Full Next.js fashion storefront with Stripe payments and admin analytics.

*Client confidentiality is strictly maintained — commercial source code is kept private. Open-source replicas are available in the **Featured Work** section above!*`
    },
    {
      name: "ecommerce",
      keywords: ["ecommerce", "e-commerce", "shopify", "store", "shop", "online store", "sales", "stripe", "payment"],
      reply: `${p.name} has deep, hands-on expertise in building high-converting e-commerce experiences:

• **Shopify Development**: Custom Liquid theme development, third-party app integrations, automated checkout workflows, and performance-optimized storefronts built for conversion.
• **Headless E-Commerce**: Connecting Next.js or React frontends to Shopify, or custom backends for bespoke buyer experiences that load in under 1 second.
• **Full-Stack Stores**: Built complete e-commerce platforms from scratch using Next.js, PostgreSQL, Supabase, and Stripe — featuring server-side rendering (SSR), live inventory tracking, and real-time order fulfillment.
• **Secure Payments**: Stripe Elements integration supporting Apple Pay, Google Pay, and standard credit cards with secure webhook-based transaction handling.

Have a store idea or need to upgrade an existing one? Drop your requirements in the **Contact form** below!`
    },
    {
      name: "mobile",
      keywords: ["mobile", "app", "apps", "ios", "android", "phone", "react native", "expo", "kotlin", "native"],
      reply: `${p.name} specializes in building high-performance, production-ready mobile applications for both iOS and Android:

• **React Native & Expo** *(Cross-platform)*: Writes single-codebase apps that run natively on both platforms — used for Feedo, Music Player, FitQuest, and more.
• **Kotlin & Jetpack Compose** *(Native Android)*: Built LocalBite (food delivery), CryptoPulse (crypto tracker), and TaskFlow (Kanban organizer) as full native Android applications.
• **Capabilities include**: Offline sync (AsyncStorage, SQLite, Realm), push notifications, biometric auth, WebRTC video calls, real-time WebSocket feeds, background audio, maps, and wearable device integration.
• **App Quality**: Consistently achieves crash-free rates above **99.94%** and startup times under **1.5 seconds** across deployed apps.

Have a mobile app idea? Reach out through the **Contact form** below and let's bring it to life!`
    },
    {
      name: "ai",
      keywords: ["ai", "chat", "bot", "chatbot", "automation", "workflows", "llm", "intelligence", "agent", "meta", "openai", "gpt", "gemini", "langchain"],
      reply: `${p.name} is experienced in integrating modern AI capabilities into real-world digital products:

• **LLM Integrations**: OpenAI (GPT-4), Google Gemini, Meta AI, and Hugging Face Transformers — used for chatbots, code reviewers, content generators, and smart assistants.
• **RAG Systems**: Built Retrieval-Augmented Generation pipelines using LangChain and Pinecone for context-aware, accurate AI responses (e.g., AI E-Commerce Chatbot resolving 70% of support tickets autonomously).
• **AI Features Built**: Smart medical image diagnosis, sentiment analysis platforms, predictive maintenance dashboards, expense tracking OCR, and AI-powered business analytics.
• **Workflow Automation**: Background scraper workers, automated ticketing, BullMQ job queues, and API orchestration pipelines.
• **Prompt Engineering**: Crafting optimized prompt flows ensuring AI models respond accurately, safely, and on-brand.

He built this very chatbot you are interacting with! He can deploy similar custom AI features tailored specifically for your business needs.`
    },
    {
      name: "delivery",
      keywords: ["delivery", "timeline", "how long", "weeks", "days", "how fast", "fast", "speed", "duration", "timeframe", "turnaround", "urgency", "urgent"],
      reply: `${p.name} is known for delivering high-quality work at impressive speed:

• **Premium Landing Pages**: Delivered in **7 days** — fully responsive, animated, SEO-optimized, and production-ready.
• **Full-Stack Web Apps / SaaS Projects**: Typically **2–3 weeks**, with the possibility of a fast-tracked **10-day delivery** depending on project scope and complexity.
• **Mobile Applications**: Timeline discussed based on feature set during the discovery phase.

All deliverables include thorough cross-device testing, a Lighthouse performance audit, and a **${b.warrantyDays}-day free post-launch support window**.

If you have a tight deadline, please mention it clearly in the **Contact form** below — Ayush is very accommodating with urgent timelines!`
    },
    {
      name: "faq",
      keywords: ["nda", "support", "maintenance", "timezone", "location", "india", "figma", "design", "adobe", "xd", "post-launch", "post launch", "warranty", "figma UI designs", "figma design", "build websites directly from figma", "free post-launch maintenance"],
      reply: `Here are the most common questions about working with ${p.name}:

• **Post-Launch Support**: Yes — every project includes **${b.warrantyDays} days of free post-launch maintenance and support** to ensure smooth operation after go-live.
• **NDA**: Absolutely. ${p.name} is happy to sign a **Non-Disclosure Agreement (NDA)** before any confidential project details are shared.
• **Location & Timezone**: Based in **India (IST, UTC+5:30)** — fully available **24/7 as per project needs**, coordinating smoothly with US, UK, EU, and AU time zones.
• **Design Files**: Works seamlessly with existing UI assets from **Figma, Adobe XD, Sketch, and Photoshop**. He can build pixel-perfect implementations directly from your Figma designs.
• **Codebase Handover**: A clean, well-documented codebase is delivered at project completion for full client ownership.`
    },
    {
      name: "contact",
      keywords: ["contact", "email", "form", "start", "process", "roadmap", "meet", "call", "touch", "reach out", "message", "hire you", "get started"],
      reply: `Starting a project with ${p.name} is straightforward and well-structured:

1. **Discovery & Brief** — Fill out the **Contact form** at the bottom of this page describing your goals, timeline, and budget.
2. **Strategy & Mockup** — ${p.name} reviews your brief and responds personally, often sharing a Figma mockup or a crystal-clear fixed-price proposal within 24 hours.
3. **Active Development** — Work begins with live, interactive preview links updated every few days, ensuring full visibility and control throughout.
4. **Launch & Support** — Deployment to high-performance hosting, followed by a **${b.warrantyDays}-day free post-launch support period**.

**Current Availability**: ${b.availability.freelance}

Go ahead and fill out the **Contact form** below — Ayush personally reviews every message and responds promptly!`
    }
  ];
};

function classifyQueryLocally(query: string): string {
  const lowerQuery = query.toLowerCase();
  // Remove basic punctuation to help word boundaries and word matching
  const cleanQuery = lowerQuery.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ");
  const intents = getLocalIntents();
  
  let bestIntent = "default";
  let maxScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      // Escape special regex characters in keywords
      const escapedKw = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      // Create word boundary regex
      const kwRegex = new RegExp(`\\b${escapedKw}\\b`, 'i');
      if (kwRegex.test(cleanQuery)) {
        score += 2; // Exact match reward
      } else {
        // Partial token matching for misspelled words or variations
        const words = cleanQuery.split(/\s+/);
        for (const word of words) {
          if (word.length > 3 && kw.includes(word)) {
            score += 0.5;
          }
        }
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent.name;
    }
  }

  // If match score is too low, use standard fallback
  if (maxScore < 1) {
    const p = PORTFOLIO_DATA.personal;
    return `That's a fantastic question! ${p.name} specializes in creating bespoke, high-performance digital products that merge stunning visual design with rock-solid, secure backend engineering.

Since this AI Copilot has general knowledge, I highly recommend sharing your specific ideas or questions in the **Contact form** at the bottom of the page. ${p.name} is exceptionally responsive and will get back to you personally within a few hours to discuss your goals!`;
  }

  const match = intents.find((i) => i.name === bestIntent);
  return match ? match.reply : "";
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const latestUserMessage = messages[messages.length - 1];
    const userQuery = latestUserMessage.text;

    // Always use the hardcoded local classifier for replies
    const localReply = classifyQueryLocally(userQuery);
    return NextResponse.json({ reply: localReply });
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
