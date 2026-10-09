import { NextResponse } from "next/server";
import { PORTFOLIO_DATA } from "@/data/portfolio";

// Dynamically generate the System Prompt for Gemini/LLM based on central Portfolio Data
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

  return `You are the highly professional, energetic, and intelligent AI Assistant for ${p.name}. Your name is "Ask Me". Your goal is to answer questions about ${p.name}'s professional background, technical skills, projects, rates, and availability in an accurate, highly positive, expert, and persuasive manner.

About ${p.name}:
- Name: ${p.name}
- Title: ${p.role}
- Experience: Over ${p.experienceYears} years of professional freelancing, with ${p.deployedCount}+ successful web and mobile app deployments for clients worldwide.
- Career Journey: Started developing in ${p.startedYear}. ${p.bioIntro} ${p.bioDetail} ${p.jobSearchStatus}

Technical Expertise:
${s.marquee.join(", ")}

Services Provided:
${servicesList}

Featured Projects:
${projectsList}

Pricing & Value:
- Premium Interactive Landing Page: ${b.pricing.landingPage} (high-conversion UX, sub-second load speeds, custom animations).
- Custom Full-Stack Web App / SaaS: ${b.pricing.webApp} (scalable architecture, secure backend, database integration).
- Monthly Retainers: ${b.pricing.retainer}.
- Guaranteed Lighthouse score of 95+ and ${b.warrantyDays}-day free post-launch support/maintenance.

Delivery Timelines:
- Premium Landing Pages: Delivered in 7 days.
- Full Stack / SaaS: 2-3 weeks (10-day expedited option available).

Key Highlights:
- NDA: 100% willing to sign NDAs before project discussion.
- Timezone: Based in India (IST, UTC+5:30), 24/7 availability to overlap with US, UK, EU, or AU client timezones.
- Figma Integration: Builds pixel-perfect responsive code directly from Figma, Adobe XD, or Sketch designs.
- Support: Includes ${b.warrantyDays} days of free post-launch maintenance.

Style and Guidelines:
- Tone: Highly positive, professional, confident, polite, and welcoming.
- Accuracy: State exact figures and details (3+ years experience, 50+ deployments, 7-day landing pages, 30-day warranty).
- Formatting: Use clean markdown (bolding, bullet points, numbered lists) for maximum readability.
- Call to Action: Positively encourage the user to fill out the Contact form at the bottom of the page for custom quotes and project discussions.`;
};

// Enriched local intents engine for instant, accurate, positive responses
const getLocalIntents = () => {
  const p = PORTFOLIO_DATA.personal;
  const b = PORTFOLIO_DATA.businessGuides;

  return [
    {
      name: "greetings",
      keywords: ["hello", "hi", "hey", "greetings", "yo", "who are you", "what is your name", "about yourself", "who is ayush", "tell me about", "introduce", "professional background", "experience", "background", "who built this", "developer", "qualification", "education", "bio"],
      reply: `Hi there! 👋 Welcome to Ayush's portfolio.

**Ayush** is a Full Stack & Mobile App Developer with **3+ years of professional freelancing experience**, having successfully designed, built, and deployed **50+ production applications** for clients worldwide across diverse industries.

He began his engineering journey in **2018** and specializes in delivering high-end, scalable digital experiences — from sleek, high-conversion marketing landing pages to complex SaaS platforms, mobile apps, and AI-powered systems.

I am **Ask Me**, Ayush's AI Copilot. I can answer any questions regarding his tech stack, project pricing, delivery speed, availability, or portfolio works. How can I assist you today?`
    },
    {
      name: "availability",
      keywords: ["available", "availability", "free", "schedule", "timing", "calendar", "full time", "full-time", "hire", "job", "opportunity", "opening", "contract", "freelance", "startups", "agencies", "enterprise", "custom enterprise contracts", "when can you start", "part time", "part-time", "open to work"],
      reply: `Ayush is currently **available** for select, high-impact project engagements! 🟢

• **Freelance & Contract Work**: ${b.availability.freelance}
• **Full-Time Opportunities**: ${b.availability.fullTime}
• **Timezone Flexibility**: Based in **India (IST, UTC+5:30)**, and fully flexible to align with **US, UK, European, or Australian timezones** as per project requirements.
• **Client Partnerships**: Frequently collaborates with early-stage **startups**, established **design agencies**, and **enterprise clients** on fixed-scope and retainer contracts.

Would you like to lock in a timeline or discuss your project scope? Please fill out the **Contact form** at the bottom of this page for a rapid personal response!`
    },
    {
      name: "techstack",
      keywords: ["stack", "tech", "technology", "skills", "languages", "frameworks", "react", "next", "node", "typescript", "javascript", "backend", "frontend", "database", "sql", "nosql", "cloud", "aws", "python", "java", "golang", "rust", "graphql", "tailwind", "css", "html", "git", "docker"],
      reply: `Ayush commands a comprehensive, production-tested tech stack covering every layer of modern software development:

**Frontend & Web UI**
• React 19, Next.js (App Router, SSR, SSG), TypeScript, JavaScript (ES6+), Vanilla CSS, Tailwind CSS, Framer Motion, GSAP animations

**Mobile Development**
• React Native, Expo SDK, Kotlin (Android Native), Jetpack Compose

**Backend & APIs**
• Node.js, Express.js, NestJS, Spring Boot, Java, Go, Rust, RESTful APIs, GraphQL, Socket.IO

**Databases & Storage**
• PostgreSQL, MongoDB, MySQL, Firebase, Supabase, Prisma ORM, Sequelize, SQLite

**AI & Automation**
• Google Gemini API, OpenAI (GPT-4), Meta AI, LangChain, Pinecone (Vector RAG), Hugging Face

**Cloud & DevOps**
• AWS (EC2, S3, Lambda), Vercel, Docker, CI/CD Pipelines

He specializes in building **scalable, production-grade applications** combining breathtaking UI/UX with robust backend architecture.`
    },
    {
      name: "rates",
      keywords: ["rate", "rates", "cost", "costing", "price", "pricing", "budget", "money", "quote", "charge", "charges", "estimate", "fee", "fees", "how much", "expensive", "cheap", "payment terms"],
      reply: `Ayush provides **transparent, fixed-scope pricing** with zero hidden fees — ensuring complete clarity from day one:

• **Premium Interactive Landing Page**: **${b.pricing.landingPage}**
  *(High-conversion UX, custom animations, mobile responsive, sub-second load times)*
• **Custom Full-Stack Web App / SaaS**: **${b.pricing.webApp}**
  *(End-to-end architecture, database integration, authentication, scalable backend)*
• **Ongoing Monthly Retainers**: **${b.pricing.retainer}**

**Included with every project:**
✔ 100% responsive, cross-device tested UI
✔ Guaranteed Google Lighthouse performance score of **95+**
✔ **${b.warrantyDays}-day free post-launch warranty and maintenance**
✔ Clean, documented, hand-over-ready codebase

To receive a detailed proposal tailored to your specific project, fill out the **Contact form** at the bottom of the page — Ayush reviews every inquiry personally!`
    },
    {
      name: "projects",
      keywords: ["project", "projects", "portfolio", "work", "featured", "examples", "built", "created", "done", "developed", "show me", "case study", "case studies", "previous work"],
      reply: `Ayush has successfully deployed **50+ live websites and applications** across Web, Mobile, AI, E-Commerce, and SaaS. Here are top highlights:

**Web & SaaS Applications**
• **Gurugram University Attendance System** — MERN Stack portal serving 10,000+ students with dynamic scheduling and CSV report generation. *(React, Node.js, MongoDB)*
• **JLM Tournaments** — Real-time gaming tournament platform with live brackets and leaderboards. *(React, Vite, Supabase, Express)*

**Mobile Applications**
• **Feedo** — B2B mobile feedback platform featuring offline sync, real-time NPS scoring, and Socket.IO alerts. *(React Native, Expo, NestJS)*
• **Music Player App** — High-performance streaming app with adaptive album-art themes and offline playback. *(React Native, Expo)*

**AI & Automation**
• **AI Chatbot for E-Commerce** — RAG-powered shopping assistant resolving 70% of support tickets automatically. *(LangChain, OpenAI GPT-4, Pinecone)*
• **AI Code Reviewer** — GitHub PR reviewer using Google Gemini for automated code quality checks. *(Node.js, Gemini API, Docker)*

**E-Commerce**
• **Starbucks 3D Storefront** — Immersive product configurator built with WebGL, Three.js, and GSAP.

*Explore the **Featured Work** section on this page to view live demos and open-source code!*`
    },
    {
      name: "ecommerce",
      keywords: ["ecommerce", "e-commerce", "shopify", "store", "shop", "online store", "sales", "stripe", "payment", "cart", "checkout"],
      reply: `Ayush brings deep, hands-on expertise in building high-converting E-Commerce platforms:

• **Shopify Development**: Custom Liquid theme coding, automated checkout workflows, third-party app integrations, and speed optimization.
• **Headless E-Commerce**: Connecting Next.js or React frontends to Shopify or custom backends loading in under 1 second.
• **Custom Full-Stack Stores**: Complete storefronts built with Next.js, PostgreSQL, Supabase, and Stripe — featuring SSR, live inventory tracking, and order fulfillment.
• **Secure Payment Gateways**: Stripe Elements integration supporting Apple Pay, Google Pay, and credit cards with webhook verification.

Ready to launch or upgrade your online store? Drop your goals in the **Contact form** below for an immediate consultation!`
    },
    {
      name: "mobile",
      keywords: ["mobile", "app", "apps", "ios", "android", "phone", "react native", "expo", "kotlin", "native", "app store", "play store"],
      reply: `Ayush specializes in developing high-performance, production-ready mobile applications for both iOS and Android:

• **Cross-Platform (React Native & Expo)**: Single-codebase efficiency delivering native performance and smooth 60 FPS UI.
• **Native Android (Kotlin & Jetpack Compose)**: Built dedicated native Android solutions for clients requiring platform-specific power.
• **Advanced Capabilities**: Offline database sync, push notifications, WebRTC video/audio calls, WebSocket feeds, biometric auth, and payment integrations.
• **App Quality**: Consistently achieves **99.94% crash-free rates** and startup times **under 1.5 seconds**.

Have a mobile app idea? Reach out through the **Contact form** below to turn it into reality!`
    },
    {
      name: "ai",
      keywords: ["ai", "chat", "bot", "chatbot", "automation", "workflows", "llm", "intelligence", "agent", "meta", "openai", "gpt", "gemini", "langchain", "rag", "hugging face", "machine learning"],
      reply: `Ayush is an expert at integrating modern AI capabilities into real-world business applications:

• **LLM Integrations**: Custom applications powered by Google Gemini, OpenAI (GPT-4), Meta AI, and Hugging Face Transformers.
• **RAG Systems**: Retrieval-Augmented Generation pipelines using LangChain and Pinecone vector databases for context-accurate AI responses.
• **Automated Workflows**: Intelligent ticketing, PR code review bots, automated sentiment analysis, and OCR document extraction.
• **Custom Conversational Copilots**: Building bespoke AI assistants — just like this **Ask Me** copilot!

He can deploy similar custom AI features tailored specifically to your business needs. Share your vision in the **Contact form** below!`
    },
    {
      name: "delivery",
      keywords: ["delivery", "timeline", "how long", "weeks", "days", "how fast", "fast", "speed", "duration", "timeframe", "turnaround", "urgency", "urgent", "deadline"],
      reply: `Ayush is renowned for delivering top-tier work with impressive speed and precision:

• **Premium Landing Pages**: Delivered in **7 days** — fully responsive, animated, SEO-optimized, and production-ready.
• **Full-Stack Web Apps / SaaS**: Delivered in **2 to 3 weeks** (with a fast-tracked **10-day delivery option** for urgent launches).
• **Mobile Applications**: Delivered according to clear, milestone-based schedules.

All deliverables include rigorous cross-device testing, a Google Lighthouse audit (95+ score), and a **${b.warrantyDays}-day free post-launch support window**.

If you have an urgent deadline, state it in the **Contact form** below — Ayush is very accommodating with fast turnarounds!`
    },
    {
      name: "figma",
      keywords: ["figma", "figma design", "figma ui", "adobe xd", "sketch", "figma ui designs", "build websites directly from figma", "design files", "ui design"],
      reply: `Yes! Ayush excels at translating **Figma, Adobe XD, and Sketch** designs into pixel-perfect, responsive code! ✨

• **Pixel-Perfect Accuracy**: Every padding, font size, color palette, and layout constraint is replicated with 100% fidelity.
• **Interactive Micro-Animations**: Enhances static design files with smooth Framer Motion or GSAP scroll animations.
• **Clean Component Architecture**: Converts Figma design systems into modular, reusable React and Next.js components.

Have a Figma mockup ready? Send the link via the **Contact form** below for a fast feasibility review and fixed quote!`
    },
    {
      name: "maintenance",
      keywords: ["free post-launch maintenance", "maintenance", "post-launch", "post launch", "warranty", "support", "free support", "bug fixes", "post launch support"],
      reply: `Every project delivered by Ayush comes with **${b.warrantyDays} days of free post-launch support and maintenance**! 🛡️

• **Bug Warranty**: Instant fixes for any technical bug or edge case discovered post-deployment at zero extra charge.
• **Optimization & Audits**: Final tuning for Google Lighthouse performance, SEO meta tags, and hosting configurations.
• **Handover & Training**: Full documentation and guidance so you or your team can manage the platform effortlessly.
• **Ongoing Retainers**: Flexible monthly maintenance packages available after the warranty period.

Your investment is completely risk-free! Fill out the **Contact form** below to get started.`
    },
    {
      name: "nda",
      keywords: ["nda", "non-disclosure", "security", "confidentiality", "privacy", "code ownership", "ip ownership", "intellectual property", "confidential"],
      reply: `Ayush holds client confidentiality and security in the highest regard 🔒

• **NDA Protection**: 100% happy to sign a Non-Disclosure Agreement before reviewing sensitive project specifications or designs.
• **100% Source Code Ownership**: Full intellectual property (IP) and source code ownership is transferred to you upon launch.
• **Enterprise Security**: Implements strict security practices including HTTP-only cookies, sanitized API endpoints, and encrypted database connections.

Need an NDA signed today? Contact Ayush through the **Contact form** below!`
    },
    {
      name: "why_hire",
      keywords: ["why hire", "why choose", "best developer", "benefits", "advantages", "differentiators", "why ayush", "qualities", "strengths", "reasons to hire", "competitive advantage"],
      reply: `Here is why clients and companies choose Ayush for their key projects: 🌟

1. **Proven Track Record**: 3+ years of freelancing with 50+ successful live deployments across 5+ industries.
2. **Uncompromising Quality & Speed**: 95+ Google Lighthouse scores, fast 7-day landing page turnarounds, and sub-second load times.
3. **End-to-End Expertise**: Master of full-stack web, mobile (iOS/Android), backend databases, cloud infrastructure, and AI automation.
4. **Client-First Communication**: Transparent progress updates, live preview links, and 24/7 timezone availability.
5. **Zero Risk**: Backed by a **30-day free warranty** and 100% code ownership.

Ready to elevate your project? Fill out the **Contact form** below to initiate your collaboration!`
    },
    {
      name: "contact",
      keywords: ["contact", "email", "form", "start", "process", "roadmap", "meet", "call", "touch", "reach out", "message", "hire you", "get started", "book a call", "consultation", "how do we get started"],
      reply: `Starting a project with Ayush is simple and structured: 🚀

1. **Discovery & Brief**: Fill out the **Contact form** at the bottom of this page detailing your goals and vision.
2. **Proposal & Strategy (Within 24 Hours)**: Ayush reviews your requirements and sends a clear fixed-price proposal and delivery roadmap.
3. **Active Development**: Coding starts with live, interactive preview links updated every few days so you stay in full control.
4. **Launch & Support**: Deployment to your domain followed by **30 days of free post-launch maintenance**.

**Current Availability**: 🟢 Open for new engagements! Fill out the **Contact form** below to begin!`
    }
  ];
};

function classifyQueryLocally(query: string): string {
  const lowerQuery = query.toLowerCase().trim();
  const cleanQuery = lowerQuery.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ").replace(/\s+/g, " ");
  const intents = getLocalIntents();
  
  let bestIntent = "default";
  let maxScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      const lowerKw = kw.toLowerCase().trim();
      const cleanKw = lowerKw.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ").replace(/\s+/g, " ");

      // 1. Phrase match reward for multi-word or hyphenated keywords
      if (cleanKw.includes(" ")) {
        if (cleanQuery.includes(cleanKw)) {
          score += 4;
        }
      } else {
        // 2. Exact word boundary regex match
        const escapedKw = lowerKw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const kwRegex = new RegExp(`\\b${escapedKw}\\b`, 'i');
        if (kwRegex.test(cleanQuery)) {
          score += 2;
        } else if (cleanQuery.includes(lowerKw) && lowerKw.length >= 4) {
          score += 1;
        }
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent.name;
    }
  }

  // High-quality positive fallback if query falls below match threshold
  if (maxScore < 1.5) {
    const p = PORTFOLIO_DATA.personal;
    return `That's a fantastic question! ${p.name} specializes in creating bespoke, high-performance digital solutions across Web Development, Mobile Apps, AI Integrations, and Custom SaaS.

To ensure you get the exact, detailed answer tailored to your specific requirements, I highly recommend leaving your message or project ideas in the **Contact form** right below this chat window. ${p.name} reviews every inquiry personally and will get back to you within a few hours!`;
  }

  const match = intents.find((i) => i.name === bestIntent);
  return match ? match.reply : "";
}

// Optional Gemini REST call if GEMINI_API_KEY environment variable is configured
async function queryGeminiApi(userQuery: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const systemPrompt = getSystemPrompt();
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: userQuery }]
          }
        ]
      })
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (candidateText && typeof candidateText === "string" && candidateText.trim().length > 0) {
        return candidateText.trim();
      }
    }
  } catch (err) {
    console.warn("Gemini API call failed or timed out, using local classifier fallback:", err);
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const latestUserMessage = messages[messages.length - 1];
    const userQuery = latestUserMessage.text || "";

    // 1. Try Gemini API first if configured
    const geminiReply = await queryGeminiApi(userQuery);
    if (geminiReply) {
      return NextResponse.json({ reply: geminiReply });
    }

    // 2. Fall back to hyper-accurate local intent classifier
    const localReply = classifyQueryLocally(userQuery);
    return NextResponse.json({ reply: localReply });
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

