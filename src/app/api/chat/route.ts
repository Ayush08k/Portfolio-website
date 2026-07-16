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
      keywords: ["hello", "hi", "hey", "greetings", "yo", "who are you", "what is your name", "about yourself", "who is ayush", "tell me about", "introduce"],
      reply: `Looking for the best freelancer to bring your project to life? You are at the right place!

Hi, this is Ayush. I have been a freelancer for the last 3 years and have successfully delivered 50+ projects that are currently live and in use.

I am **Ask Me**, Ayush's AI Copilot. How can I help you today? You can ask me about his technical skills, project rates, delivery times, timezone availability, or how to get started!`
    },
    {
      name: "availability",
      keywords: ["available", "availability", "free", "schedule", "timing", "calendar", "full time", "full-time", "hire", "job", "opportunity", "opening", "contract", "freelance"],
      reply: `${p.name} has exciting availability depending on your project needs:

• **Full-Time Opportunities**: ${b.availability.fullTime}
• **Freelance Contracts**: ${b.availability.freelance}
• **Location & Timezone**: Based in **India**, available **24/7 as per project needs** to align with your team's local timezone.

To lock in a discovery slot or discuss full-time hiring, please submit your details in the **Contact form** at the bottom of the page!`
    },
    {
      name: "techstack",
      keywords: ["stack", "tech", "technology", "skills", "languages", "frameworks", "react", "next", "node", "typescript", "javascript", "backend", "frontend", "database", "sql", "nosql", "cloud", "aws"],
      reply: `${p.name} possesses an elite, comprehensive technical skill set spanning the entire digital product lifecycle:

${servicesList}

He specializes in building solid, production-grade applications that scale beautifully while delivering top-tier UI/UX.`
    },
    {
      name: "rates",
      keywords: ["rate", "rates", "cost", "costing", "price", "pricing", "budget", "money", "quote", "charge", "charges", "estimate", "fee", "fees", "how much"],
      reply: `${p.name} provides highly value-driven, fixed-scope project rates rather than unpredictable hourly billing. Here is a typical pricing guide:

• **Premium Interactive Landing Page**: ${b.pricing.landingPage} (Built for ultra-high conversion, speed, and premium micro-animations)
• **Custom Full-Stack Web Application / SaaS**: ${b.pricing.webApp}
• **Development Retainers**: ${b.pricing.retainer} for ongoing priority updates.

**Every project includes**:
✔ Comprehensive cross-device and responsive testing
✔ Extreme speed audits (Google Lighthouse 95+ score)
✔ A solid **30-day post-launch warranty & maintenance support**

I highly recommend filling out the **Contact form** below with your requirements so ${p.name} can send you a detailed, custom proposal!`
    },
    {
      name: "projects",
      keywords: ["project", "projects", "portfolio", "work", "featured", "examples", "built", "created", "done", "developed", "show me"],
      reply: `${p.name} has designed and deployed over ${p.deployedCount} websites and applications. Here are some of his recent featured works:

${projectsList}

*Note: To protect client confidentiality, ${p.name} does not display commercial source codes on public portals. However, you can check his open-source replicas and featured repositories directly in the **Featured Work** section above!*`
    },
    {
      name: "ecommerce",
      keywords: ["ecommerce", "e-commerce", "shopify", "store", "shop", "online store", "sales", "stripe", "payment"],
      reply: `${p.name} is highly experienced in creating premium, high-converting e-commerce experiences:

• **Shopify Development**: Custom Liquid theme coding, third-party app integrations, custom checkout setups, and setting up high-converting, blazing-fast storefronts.
• **Headless E-Commerce**: Connecting React/Next.js frontends to Shopify, BigCommerce, or Stripe APIs for bespoke, ultra-fast buyer experiences.
• **Security & Payments**: Integrating trusted payment gateways (Stripe, PayPal, Razorpay) with robust cart management and transaction workflows.

If you want to launch a modern store that loads in milliseconds and maximizes conversions, drop a line via the **Contact form** below!`
    },
    {
      name: "mobile",
      keywords: ["mobile", "app", "apps", "ios", "android", "phone", "react native", "expo", "vanguard", "native"],
      reply: `${p.name} is a specialist in mobile development, delivering high-performance iOS and Android applications:

• **Cross-Platform React Native & Expo**: Writes single-codebase apps that run smoothly on both platforms, saving development costs and time.
• **Capabilities**: Real-time notifications, local databases, biometric authentication, wearable device synchronization, maps, and offline support.

Have a mobile app idea? Reach out using the **Contact form** and let's bring it to life!`
    },
    {
      name: "ai",
      keywords: ["ai", "chat", "bot", "chatbot", "automation", "workflows", "llm", "intelligence", "agent", "meta", "openai", "gpt"],
      reply: `${p.name} is at the forefront of AI and automation integration, bringing modern intelligence to digital platforms:

• **LLM Integrations**: Connecting applications to OpenAI (GPT), Google Gemini, or Meta AI to enable smart assistants, dynamic chatbots, and intelligent search.
• **Workflow Automation**: Automating repetitive business tasks, connecting third-party platforms via custom APIs, and building background scrapers/sync jobs.
• **Prompt Engineering**: Designing optimized prompt flows to ensure AI models respond accurately and securely.

He built this very AI chatbot you are chatting with! He can deploy similar custom AI features tailored for your business.`
    },
    {
      name: "delivery",
      keywords: ["delivery", "timeline", "how long", "weeks", "days", "how fast", "fast", "speed", "duration", "timeframe", "turnaround", "urgency", "urgent"],
      reply: `${p.name} delivers high-quality work extremely fast:

• **Landing Pages**: Typically delivered in **7 days**.
• **Full Stack Projects**: Typically takes **2-3 weeks**, but can be fast-tracked to **10 days or even faster** depending on project complexity.

If you have a tight deadline, please mention it in the **Contact form** below and we will do our best to accommodate it!`
    },
    {
      name: "faq",
      keywords: ["nda", "support", "maintenance", "timezone", "location", "india", "figma", "design", "adobe", "xd", "post-launch", "post launch", "warranty"],
      reply: `Here are answers to some of the most common questions about working with ${p.name}:

• **Post-Launch Support**: Yes, ${p.name} provides **30 days of free post-launch maintenance and support** on every project to guarantee perfect operation.
• **Non-Disclosure Agreement (NDA)**: Yes, we are absolutely happy to sign an NDA before you share any confidential project details.
• **Location & Timezone**: Based in **India**, and fully available **24/7 as per project needs** to coordinate smoothly across US and global time zones.
• **Design Assets**: Yes, he works seamlessly with existing UI design files from **Figma, Adobe XD, Sketch, and Photoshop**.`
    },
    {
      name: "contact",
      keywords: ["contact", "email", "form", "start", "process", "roadmap", "meet", "call", "touch", "reach out", "message", "hire you"],
      reply: `Starting a project with ${p.name} is incredibly seamless and structured:

1. **Discovery & Brief**: Fill out the **Contact form** below to describe your objectives.
2. **Strategy & Mockup**: ${p.name} drafts a Figma mockup and a crystal-clear, fixed-price proposal.
3. **Active Development**: Dynamic milestones with live interactive preview links updated every few days.
4. **Launch & Support**: Deployment to high-performance cloud hosts, followed by a **30-day free post-launch support period**.

Let's get started—go ahead and fill out the Contact form below!`
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

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // 1. Convert message history to Google Gemini API structures
      // Skip the greeting template to keep model conversation focused on relevant entries
      const filteredMessages = messages.filter(m => m.id !== "greeting");
      const contents = filteredMessages.map((msg) => ({
        role: msg.sender === "bot" ? "model" : "user",
        parts: [{ text: msg.text }],
      }));

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [{ text: getSystemPrompt() }],
              },
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800,
              },
            }),
          }
        );

        if (response.ok) {
          const resData = await response.json();
          const replyText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ reply: replyText });
          }
        }
        
        console.warn("Gemini API call failed or returned empty content. Falling back to local classifier.");
      } catch (err) {
        console.error("Gemini API invocation error:", err);
      }
    }

    // 2. Fallback to advanced local rule-based intent engine
    const localReply = classifyQueryLocally(userQuery);
    return NextResponse.json({ reply: localReply });
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
