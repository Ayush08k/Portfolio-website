export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  github?: string;
  slug: string;
  category: "Web" | "Mobile" | "AI" | "E-Commerce" | "SaaS";
  longDescription: string;
  lighthouseMetrics?: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  mobileMetrics?: {
    startupTime: string;
    bundleSize: string;
    crashFreeRate: string;
    fps: number;
  };
  features: string[];
  architecture: {
    description: string;
    diagram?: string;
    database: string;
    hosting: string;
  };
  gallery: string[];
  challenge?: {
    problem: string;
    solution: string;
  };
  seoTags?: string[];
}

export interface Service {
  name: string;
  iconName: string;
  description: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Ayush",
    role: "Full Stack & Mobile App Developer",
    experienceYears: 3,
    deployedCount: 50,
    startedYear: 2018,
    bioIntro: "Hello! My name is Ayush and I enjoy creating things that live on the internet. I have been freelancing for over 3 years, during which I have successfully deployed 50+ websites and mobile applications for a diverse range of clients.",
    bioDetail: "My interest in development started back in 2018. My main focus these days is building high-end, high-performance digital experiences that scale.",
    jobSearchStatus: "I am currently seeking a full-time opportunity where I can contribute my skills to an innovative team.",
  },
  skills: {
    recent: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Node.js", "React Native", "Expo", "Java", "REST API", "Vanilla CSS", "MongoDB", "Firebase", "WordPress"],
    marquee: [
      "React", "Next.js", "TypeScript", "Node.js", "React Native", "Expo", "Java",
      "REST API", "Vanilla CSS", "MongoDB", "Firebase", "WordPress", "Shopify",
      "Tailwind", "Framer Motion", "GSAP", "Prisma", "PostgreSQL", "Meta AI",
      "MySQL", "Supabase", "NoSQL", "Bootstrap", "SpringBoot", "Rust", "Go"
    ]
  },
  services: [
    {
      name: "Web Development",
      description: "Crafting high-performance, responsive websites with modern frameworks like Next.js, React, and sophisticated CSS architectures."
    },
    {
      name: "App Development",
      description: "Building seamless, cross-platform mobile applications using React Native and Expo for a native-like experience on iOS and Android."
    },
    {
      name: "Full Stack Development",
      description: "Designing end-to-end solutions, from scalable backend architectures and databases to polished, user-centric frontend interfaces."
    },
    {
      name: "WordPress Development",
      description: "Developing custom, high-converting WordPress themes and plugins with a focus on speed, SEO, and user-friendly content management."
    },
    {
      name: "AI Integration (Meta AI)",
      description: "Integrating cutting-edge AI capabilities and automation workflows into digital products to enhance user engagement and efficiency."
    },
    {
      name: "E-Commerce (Shopify)",
      description: "Creating premium, high-converting Shopify stores with custom liquid development and deep integration of third-party apps."
    }
  ],
  projects: [
    {
      title: "Gurugram University Attendance System",
      description: "Faculty can track and mark student attendance with real-time class scheduling and automated reminders, while students access a personal dashboard to monitor their attendance history, grades, and university updates.",
      tech: ["React", "Node.js", "Express.js", "Tailwind CSS", "JavaScript", "MongoDB"],
      image: "/project images/super.png",
      slug: "attendance-system",
      category: "Web",
      longDescription: "This attendance system was designed and built to digitize Gurugram University's legacy paper-based attendance workflows. The platform hosts three distinct portals: an Admin Console for managing courses/schedules, a Faculty Interface for marking attendance with quick checkbox grids, and a student dashboard for viewing attendance percentages and progress. Security is handled via JWT and HTTP-only cookies, ensuring that grade and attendance logs remain tamper-proof.",
      lighthouseMetrics: {
        performance: 96,
        accessibility: 98,
        bestPractices: 95,
        seo: 100
      },
      features: [
        "Interactive grid for rapid bulk attendance marking",
        "Low-attendance threshold warning triggers automated student emails",
        "Dynamic calendar scheduler preventing room double-bookings",
        "CSV report generator exporting university records with one click"
      ],
      architecture: {
        description: "The application uses React on the frontend, using custom state management to handle multi-step workflows. The backend is built with Node.js and Express, implementing a RESTful API structure with controllers, services, and middlewares. Data is stored in MongoDB, utilizing complex indexing on student roll numbers to fetch logs fast.",
        database: "MongoDB (Mongoose ODM)",
        hosting: "AWS EC2 & Vercel"
      },
      gallery: ["/project images/super.png"],
      challenge: {
        problem: "The university's manual attendance tracking involved paper sheets for over 10,000 students, causing massive data entry errors, delayed warning reports for low attendance, and frequent scheduling conflicts.",
        solution: "Built a centralized Next.js/MERN portal with automated background cron jobs that calculate attendance thresholds nightly. Integrated custom calendar conflict-resolution algorithms to prevent room double-bookings, reducing admin overhead by 85%."
      },
      seoTags: [
        "Gurugram University Attendance System",
        "MERN Stack University Portal",
        "Automated Attendance Tracker",
        "NextJS Student Faculty Dashboard",
        "Academic scheduling conflict resolution"
      ]
    },
    {
      title: "Feedo",
      description: "A comprehensive feedback collection and customer satisfaction platform. It allows businesses to deploy surveys, perform automated sentiment analysis, and visualize user analytics via a dynamic dashboard.",
      tech: ["React Native", "Expo SDK 54", "TypeScript", "NativeWind", "NestJS", "MongoDB", "Socket.IO", "Jest"],
      link: "#",
      github: "#",
      image: "/feedo.png",
      slug: "feedo",
      category: "Mobile",
      longDescription: "Feedo is a business-to-business mobile-first feedback platform. It enables companies to generate customizable satisfaction feedback surveys on the fly and monitor responses in real-time. By leveraging Socket.IO, customer support teams can view responses as they hit the database, instantly triggering follow-up notifications for unsatisfied clients. Feedo also includes offline sync capabilities using AsyncStorage, allowing sales reps to record feedback during trade shows without internet connectivity.",
      mobileMetrics: {
        startupTime: "1.2s",
        bundleSize: "4.2 MB",
        crashFreeRate: "99.98%",
        fps: 60
      },
      features: [
        "Offline survey mode with automatic queue-based local storage sync",
        "Natural language processing backend identifying customer sentiment",
        "Real-time feedback dashboard widgets displaying live NPS scores",
        "Custom survey builder supporting multiple input types (Likert scale, text, NPS)"
      ],
      architecture: {
        description: "A cross-platform app developed with React Native and Expo, styled using NativeWind (Tailwind CLI for mobile). The app talks to a high-performance NestJS backend through both REST endpoints and WebSockets (Socket.IO). Data analytics are aggregated asynchronously via background workers, saving main database execution threads.",
        database: "MongoDB & Redis Caching",
        hosting: "Heroku & Vercel"
      },
      gallery: ["/feedo.png"],
      challenge: {
        problem: "Collecting customer feedback at low-connectivity trade shows and retail stores resulted in data loss, and standard surveys failed to highlight urgent customer complaints for support teams.",
        solution: "Developed an offline-first sync queue using React Native AsyncStorage that stores survey submissions locally and syncs them automatically when connection is restored. Integrated a NestJS NLP sentiment analysis pipeline that flags negative responses and alerts support agents via Socket.IO instantly."
      },
      seoTags: [
        "Feedo Mobile Survey App",
        "React Native Offline Sync",
        "Expo customer feedback dashboard",
        "NestJS sentiment analysis NLP",
        "Real-time NPS tracker socket.io"
      ]
    },
    {
      title: "JLM Tournaments",
      description: "A robust platform for organizing gaming tournaments featuring a sophisticated modal interface, event filtering, live match viewing, dynamic leaderboards, and comprehensive profile workflows.",
      tech: ["React", "Vite", "Supabase", "Express JS", "JavaScript", "Tailwind CSS"],
      link: "#",
      github: "#",
      image: "/jlm.png",
      slug: "jlm-tournaments",
      category: "Web",
      longDescription: "JLM Tournaments is a real-time gaming hub for competitive players. Organizers can create double-elimination, single-elimination, or round-robin brackets. Supabase Realtime handles score synchronizations, allowing viewers to see match progressions and bracket updates live without reloading. The website is optimized for lightning-fast loads using Vite and optimized code-splitting.",
      lighthouseMetrics: {
        performance: 98,
        accessibility: 95,
        bestPractices: 98,
        seo: 100
      },
      features: [
        "Dynamic bracket rendering with live score updates",
        "Tournament filters based on game type, price pool, and date",
        "User notification hub displaying matchmaking alerts",
        "Leaderboard profiles tracking player wins, losses, and tournament history"
      ],
      architecture: {
        description: "React SPA optimized with Vite. Data synchronization uses Supabase's PostgreSQL Realtime subscriptions. Authenticaton and user sessions are handled by Supabase Auth with custom middleware in Express JS to authorize premium features.",
        database: "PostgreSQL (via Supabase)",
        hosting: "Vercel & Supabase Edge Functions"
      },
      gallery: ["/jlm.png"],
      challenge: {
        problem: "Managing real-time tournament brackets for hundreds of concurrent players caused race conditions in score updates and bracket progression, leading to inconsistent standings.",
        solution: "Implemented Supabase Realtime subscriptions with optimistic locking on score updates. Built a custom bracket progression engine that validates match results server-side before advancing players, eliminating race conditions and ensuring leaderboard accuracy."
      },
      seoTags: [
        "JLM Gaming Tournament Platform",
        "Supabase Realtime bracket system",
        "React Vite esports platform",
        "Live leaderboard gaming dashboard",
        "Double elimination bracket generator"
      ]
    },
    {
      title: "Music Player App",
      description: "A sleek cross-platform music streaming and media player application featuring offline playback, custom playlist queue management, interactive audio visualization, and dynamic adaptive background themes.",
      tech: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "Node.js", "Express.js"],
      link: "#",
      github: "#",
      image: "/music.png",
      slug: "music-player",
      category: "Mobile",
      longDescription: "A full-featured mobile music streaming app designed with a focus on immersive aesthetics. The player UI reads album art color signatures dynamically, matching the background gradient to the active track. Includes sophisticated background playback service handling, allowing users to lock their screens while listening.",
      mobileMetrics: {
        startupTime: "1.5s",
        bundleSize: "6.8 MB",
        crashFreeRate: "99.95%",
        fps: 58
      },
      features: [
        "Adaptive styling extracting palette colors from album art in real-time",
        "Secure local caching for songs enabling full offline playback",
        "Dynamic queue controller with swipe-to-remove and drag-to-reorder features",
        "Interactive frequency visualizer using React Native Reanimated"
      ],
      architecture: {
        description: "Expo-based React Native app using Redux Toolkit for offline persistent state. The backend uses Node.js and Express to serve media streams over chunked HTTP responses, allowing immediate audio playback with minimal buffering.",
        database: "PostgreSQL & local SQLite cache",
        hosting: "AWS S3 & VPS"
      },
      gallery: ["/music.png"],
      challenge: {
        problem: "Background audio playback on both iOS and Android required platform-specific handling, and extracting dominant colors from album art in real-time caused UI jank on lower-end devices.",
        solution: "Built a custom background audio service using Expo AV with lock-screen controls and notification integration. Implemented a Web Worker-based color extraction algorithm that processes album art off the main thread, maintaining 60 FPS animations even on budget devices."
      },
      seoTags: [
        "React Native Music Player App",
        "Expo audio streaming mobile",
        "Redux Toolkit offline music app",
        "Album art color extraction React Native",
        "Background playback Expo AV"
      ]
    },
    {
      title: "E-Commerce Platform",
      description: "A high-performance e-commerce platform featuring lightning-fast product filtering, secure checkout integrated with Stripe, automated inventory tracking, and a responsive customer dashboard.",
      tech: ["Next.js", "React", "Node.js", "PostgreSQL", "Supabase", "Stripe API", "Tailwind CSS"],
      link: "#",
      github: "#",
      image: "/e-commerce.png",
      slug: "ecommerce-platform",
      category: "E-Commerce",
      longDescription: "This high-performance storefront was designed to maximize checkout conversions. Leveraging Next.js Server Components, the store ranks exceptionally high on technical SEO and loads in under 1 second. Payments are handled securely using Stripe Elements, supporting Apple Pay, Google Pay, and standard credit cards. The admin dashboard provides instant updates on daily sales, inventory volumes, and product page analytics.",
      lighthouseMetrics: {
        performance: 99,
        accessibility: 100,
        bestPractices: 97,
        seo: 100
      },
      features: [
        "Next.js Server Side Rendering (SSR) for instantaneous page loading",
        "Stripe webhook integrations securely fulfilling transactions in background",
        "Intelligent product filter panels updating queries instantly without page refreshes",
        "Real-time database triggers updating store inventory counts after every checkout"
      ],
      architecture: {
        description: "Built using Next.js App Router for server components and optimal performance. Data layer uses Supabase's PostgreSQL with optimized views. Stripe webhook routes verify signatures and update user transaction states securely.",
        database: "PostgreSQL (via Supabase)",
        hosting: "Vercel & Supabase Cloud"
      },
      gallery: ["/e-commerce.png"],
      challenge: {
        problem: "Product filtering with hundreds of SKUs caused slow database queries, and Stripe webhook race conditions occasionally led to duplicate order fulfillment or missed inventory decrements.",
        solution: "Optimized PostgreSQL queries with composite indexes and materialized views for filter combinations. Implemented idempotent Stripe webhook handlers with signature verification and database-level advisory locks to prevent duplicate processing, achieving sub-100ms checkout completion."
      },
      seoTags: [
        "Next.js E-Commerce Platform",
        "Stripe payment integration case study",
        "Supabase PostgreSQL online store",
        "Server Components SSR storefront",
        "Real-time inventory management system"
      ]
    },
    {
      title: "Starbucks 3D Website",
      description: "An immersive e-commerce experience featuring interactive 3D cup customizations, physics-based fluid animations, and high-performance asset compression.",
      tech: ["React", "Three.js", "React Three Fiber", "GSAP", "Tailwind CSS", "Vite"],
      link: "#",
      github: "#",
      image: "/project images/starbucks.png",
      slug: "starbucks-3d",
      category: "E-Commerce",
      longDescription: "This project was built when I was learning how to make 3D websites, serving as a comprehensive hands-on study of WebGL, shaders, camera movements, and 3D coordinate space on the web. It is an interactive 3D landing page and e-commerce experience celebrating the craft of Starbucks coffee. Built with React Three Fiber, users can manipulate a high-fidelity 3D cup model in real-time, customizing cup sizes, fluid fills, sleeve designs, and ingredient layers. The application orchestrates camera movements using GSAP ScrollTrigger to guide users through a sensory narrative, driving user engagement and product conversions.",
      lighthouseMetrics: {
        performance: 98,
        accessibility: 97,
        bestPractices: 99,
        seo: 100
      },
      features: [
        "Real-time 3D product rendering with custom materials, lighting, and shadow casting",
        "Interactive customizers for cup sizes (tall, grande, venti), liquid textures, and toppings",
        "Performance-optimized GLTF models compressed to under 900KB using Draco compression",
        "Responsive layout dynamically adjusting camera targets and viewport FOV for mobile users"
      ],
      architecture: {
        description: "A modular frontend SPA structured around a React Three Fiber canvas viewport. The 3D scene loads optimized meshes compressed via the Draco pipeline and stores user configurations in local state, triggering synchronized UI updates.",
        database: "LocalStorage",
        hosting: "Vercel & Cloudinary CDN"
      },
      gallery: ["/project images/starbucks.png"],
      challenge: {
        problem: "Rendering complex 3D meshes and high-res textures caused low frame rates (~15 FPS) and memory leaks on mobile browsers, making the page laggy and causing crashes.",
        solution: "Compressed textures to 1K WebP, applied Draco compression reducing model file size by 94%, and built an adaptive performance scaler that dynamically decreases anti-aliasing and pixel ratio on lower-spec mobile devices."
      },
      seoTags: [
        "Starbucks 3D Website",
        "React Three Fiber Starbucks",
        "Three.js E-Commerce Customizer",
        "Draco Mesh Compression WebGL",
        "3D Web Development Learning Project",
        "React Three Fiber Tutorial Example",
        "WebGL Mobile Optimization Guide",
        "GSAP ScrollTrigger 3D Animation",
        "Interactive 3D Product Configurator",
        "How to build 3D websites",
        "Vite React Three Fiber Starter",
        "Blender texture baking WebGL",
        "Nextjs 3D landing page design",
        "Performance optimization WebGL mobile",
        "3D cup customizer React",
        "Starbucks 3D design case study",
        "3D web development portfolio Ayush",
        "Three.js mobile frame rate fix",
        "VRAM optimization web 3D",
        "Creative frontend developer portfolio 3D"
      ]
    },
    {
      title: "Clothing E commerce Website",
      description: "A premium clothing and fashion e-commerce storefront featuring interactive style selectors, dynamic collection pages, secure checkout flows, and user-friendly order tracking.",
      tech: ["TypeScript", "Next.js", "React 19", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "MongoDB", "Stripe API"],
      link: "#",
      github: "#",
      image: "/project images/E-commerce.png",
      slug: "clothing-ecommerce",
      category: "E-Commerce",
      longDescription: "Clothing E-commerce Website is a next-generation fashion retail storefront built to deliver an immersive and lightning-fast shopping experience. By combining Next.js Server Components with Framer Motion, it offers smooth micro-interactions, responsive lookbooks, and clean animations that mirror high-end fashion brands. It integrates a secure payment gateway with Stripe, implements automated order processing, and has a full-featured administrator dashboard for inventory management and sales analytics.",
      lighthouseMetrics: {
        performance: 98,
        accessibility: 99,
        bestPractices: 96,
        seo: 100
      },
      features: [
        "Interactive fashion lookbook with zoomable details and outfit selectors",
        "Robust cart management and persistent wishlist with smooth animative feedback",
        "Custom checkout experience powered by Stripe Elements and secure billing",
        "Dynamic collection filtering based on size, color, brand, and price range"
      ],
      architecture: {
        description: "Designed with Next.js App Router for server-rendered page optimization and dynamic search query updates. The checkout pipeline uses Stripe API webhooks to handle payments asynchronously and updates inventory status in a scalable MongoDB database.",
        database: "MongoDB (via Mongoose)",
        hosting: "Vercel & Render"
      },
      gallery: ["/project images/E-commerce.png"],
      challenge: {
        problem: "Rendering high-resolution product imagery and multi-layered collection page filters led to slow first-contentful-paint (FCP) times and layout shifts on mobile devices.",
        solution: "Implemented Next.js Image optimization with blur-up placeholders, cached database queries with Redis, and deferred non-critical component loading using React Suspense."
      },
      seoTags: [
        "Clothing E-Commerce Website",
        "Next.js Fashion Storefront",
        "Framer Motion E-Commerce",
        "Stripe Payment Gateway React"
      ]
    },

    /* ─── AI PROJECTS (10 Projects) ───────────────────────── */
    {
      title: "Integrated AI Chatbot for E-Commerce",
      description: "An intelligent virtual assistant integrated into an existing online storefront, leveraging Retrieval-Augmented Generation (RAG) and customer purchase history to handle order queries, product searches, and FAQs.",
      tech: ["React", "Node.js", "LangChain", "OpenAI GPT-4", "Pinecone DB", "MongoDB", "Express"],
      image: "/project images/chatbot for ecommerce.png",
      slug: "ai-ecommerce-chatbot",
      category: "AI",
      longDescription: "This project showcases the integration of a cutting-edge AI customer support agent into a legacy Shopify/custom MERN storefront. Utilizing Retrieval-Augmented Generation (RAG), the bot retrieves product availability, store policies, and user purchase histories, answering natural language queries and processing refunds or order cancellations with minimal human intervention. Data security is strictly preserved, and conversational state is synced using Redis caching.",
      lighthouseMetrics: { performance: 95, accessibility: 97, bestPractices: 98, seo: 100 },
      features: [
        "Conversational shopping assistant showing product listings directly in chat",
        "Semantic search indexing entire product catalogs for fast discovery",
        "Secure integration with order shipping endpoints to provide tracking updates",
        "Automatic escalations to live human support agents upon sentiment detection"
      ],
      architecture: {
        description: "Built with Node.js and Express backend wrapping OpenAI API, managing context size via LangChain buffers. Conversational history and vector embeddings are stored in Pinecone and MongoDB.",
        database: "MongoDB & Pinecone Vector DB",
        hosting: "AWS ECS & Vercel"
      },
      gallery: ["/project images/chatbot for ecommerce.png"],
      challenge: {
        problem: "The online storefront struggled with a high volume of repetitive support queries regarding order tracking and product recommendations, leading to slow response times and cart abandonment.",
        solution: "Built a LangChain-powered RAG chatbot utilizing OpenAI's GPT-4 and Pinecone vector database. It securely accesses live Shopify order tracking APIs and semantically searches the catalog, resolving 70% of support tickets instantly and boosting conversion rates by 18%."
      },
      seoTags: ["AI Chatbot E-Commerce Integration", "MERN Stack AI Assistant", "Retrieval-Augmented Generation chatbot", "OpenAI GPT-4 Shopify integration"]
    },
    {
      title: "Smart Recommendation Engine",
      description: "A real-time predictive analytics system analyzing user browsing history, purchase patterns, and visual traits to recommend products.",
      tech: ["Python", "FastAPI", "TensorFlow", "Next.js", "PostgreSQL", "Redis", "TypeScript"],
      image: "/project images/smart recommendation.png",
      slug: "smart-recommendation-engine",
      category: "AI",
      longDescription: "This recommendation engine processes live telemetry streams from online storefronts. By deploying collaborative filtering algorithms alongside deep learning models in TensorFlow, it generates hyper-personalized product listings, upsell recommendations, and customized newsletters that boost average order values by up to 25%.",
      lighthouseMetrics: { performance: 97, accessibility: 96, bestPractices: 95, seo: 100 },
      features: [
        "Dynamic feed personalization updating within 150 milliseconds",
        "Visual-similarity analysis suggesting items based on upload images",
        "A/B testing dashboard for marketers to compare algorithm success rates",
        "Background data worker pre-aggregating user purchase matrices"
      ],
      architecture: {
        description: "Python FastAPI acts as the ML inference server. Telemetry events flow into Redis Streams before processing. Front-end is rendered via Next.js with optimized static skeleton loading.",
        database: "PostgreSQL & Redis Cache",
        hosting: "AWS SageMaker & Vercel"
      },
      gallery: ["/project images/smart recommendation.png"],
      seoTags: ["Smart Recommendation Engine AI", "TensorFlow Product Recommendations", "FastAPI Machine Learning model", "NextJS predictive personalization"]
    },
    {
      title: "Real-time AI Business Dashboard",
      description: "A command center dashboard that digests multi-channel business metrics, forecasting sales and generating automated PDF insights via AI.",
      tech: ["Next.js", "Chart.js", "Express.js", "OpenAI API", "AWS Lambda", "PostgreSQL", "TypeScript"],
      image: "/project images/ai business dashboard.png",
      slug: "realtime-ai-dashboard",
      category: "AI",
      longDescription: "A unified enterprise intelligence console. It ingests financial data, advertising metrics, and site analytics, compiling them into a beautiful web dashboard. The built-in GPT-4 agent generates monthly performance insights and alerts managers of anomalies or sudden traffic dips in plain language.",
      lighthouseMetrics: { performance: 94, accessibility: 98, bestPractices: 96, seo: 100 },
      features: [
        "Real-time data visualization widgets using Chart.js with responsive resizing",
        "Predictive cash-flow forecasting graphs using Prophet ML libraries",
        "One-click PDF reporting containing AI-authored executive summaries",
        "Instant Slack notification integrations for security and budget alerts"
      ],
      architecture: {
        description: "Next.js App Router for frontend portals. The analytical engine resides in serverless AWS Lambda functions triggered by Cron schedules or API Gateway triggers.",
        database: "PostgreSQL (RDS)",
        hosting: "AWS Lambda & Vercel"
      },
      gallery: ["/project images/ai business dashboard.png"],
      seoTags: ["Real-time AI Business Dashboard", "Chart.js analytical dashboard", "GPT-4 automated business insights", "Serverless Next.js AWS Lambda dashboard"]
    },
    {
      title: "AI-Driven Customer Sentiment Analyzer",
      description: "A social media and feedback monitoring tool performing real-time sentiment analysis, categorizing feedback into positive/negative alerts.",
      tech: ["React", "NestJS", "Hugging Face Transformers", "PostgreSQL", "Socket.IO", "TypeScript"],
      image: "/project images/customer sentiment analyzer.png",
      slug: "ai-sentiment-analyzer",
      category: "AI",
      longDescription: "This SaaS tool tracks brand mentions across social media networks, customer reviews, and forums. It evaluates customer moods using natural language processing (NLP) pipelines, displaying live feedback streams with color-coded sentiment tags.",
      lighthouseMetrics: { performance: 96, accessibility: 95, bestPractices: 98, seo: 100 },
      features: [
        "Live sentiment feed updating via WebSockets (Socket.IO)",
        "Keyword extraction highlighting trending problems or features",
        "Automated support ticket generation for highly negative feedback",
        "Multi-language support for international customer bases"
      ],
      architecture: {
        description: "React client connected to a NestJS gateway. Sentiment classification runs on a microservice wrapping Hugging Face Transformers models.",
        database: "PostgreSQL & Redis",
        hosting: "DigitalOcean Kubernetes"
      },
      gallery: ["/project images/customer sentiment analyzer.png"],
      seoTags: ["AI Sentiment Analyzer", "Hugging Face NLP React", "NestJS sentiment classification", "Socket.IO customer service feedback"]
    },
    {
      title: "Smart Expense Tracker & Invoice Parser",
      description: "An AI-powered personal and business finance tracker utilizing OCR to scan invoices and automatically categorize expenses.",
      tech: ["React Native", "Expo", "Tesseract OCR", "OpenAI API", "Node.js", "Supabase", "TypeScript"],
      image: "/project images/expense tracker.png",
      slug: "ai-expense-tracker",
      category: "AI",
      longDescription: "Smart Expense Tracker is a cross-platform mobile application designed to simplify expense tracking for freelancers. Users photograph paper receipts, and the app extracts dates, merchant names, tax breakdowns, and final totals, saving them to tax-ready directories.",
      mobileMetrics: { startupTime: "1.3s", bundleSize: "5.5 MB", crashFreeRate: "99.97%", fps: 60 },
      features: [
        "AI OCR receipt scanning with automatic line-item parsing",
        "Automated tax category mapping matching local tax requirements",
        "Offline receipts queue syncing to Supabase database upon connection",
        "Visual expense breakdown charts with exportable CSV spreadsheets"
      ],
      architecture: {
        description: "Mobile app built using React Native and Expo. Optical character recognition (OCR) is performed via Tesseract and OpenAI Vision endpoints on a secure Node.js backend.",
        database: "Supabase Database (PostgreSQL)",
        hosting: "Vercel & Supabase Cloud"
      },
      gallery: ["/project images/expense tracker.png"],
      seoTags: ["Smart Expense Tracker Mobile", "Expo OCR receipt scanner", "AI Invoice parser app", "React Native finance dashboard"]
    },
    {
      title: "AI Code Reviewer & Assistant",
      description: "A developer tool integrated with GitHub Webhooks that automatically comments on pull requests, reviewing code style, security flaws, and performance bugs.",
      tech: ["Node.js", "GitHub API", "Google Gemini API", "TypeScript", "Express", "Docker"],
      image: "/project images/ai code review.png",
      slug: "ai-code-reviewer",
      category: "AI",
      longDescription: "An AI coding assistant that plugs directly into developer pipelines. It intercepts GitHub Pull Request payloads, inspects file changes line-by-line, and utilizes the Google Gemini API to write review comments highlighting code smells, syntax issues, and potential SQL injection paths.",
      lighthouseMetrics: { performance: 98, accessibility: 99, bestPractices: 100, seo: 100 },
      features: [
        "GitHub integration with secure webhook signature validation",
        "AI code feedback identifying memory leaks and logical bugs",
        "Custom rule definitions tailoring review strictness to match company standards",
        "Markdown response formatting featuring syntax-highlighted code recommendations"
      ],
      architecture: {
        description: "An Express server written in TypeScript. It parses Git diff format strings, requests feedback from Google Gemini, and makes updates to PR threads using the Octokit library.",
        database: "Redis Cache",
        hosting: "AWS Fargate (Docker)"
      },
      gallery: ["/project images/ai code review.png"],
      seoTags: ["AI Code Reviewer GitHub", "Gemini API pull request assistant", "Automated code reviewer webhook", "TypeScript developer pipeline tool"]
    },
    {
      title: "Automated AI Content Generator",
      description: "A dashboard for marketing agencies to batch-generate SEO-optimized blog posts, social graphics, and email campaigns from single prompts.",
      tech: ["Next.js", "Tailwind CSS", "OpenAI DALL-E 3", "GPT-4", "Prisma", "PostgreSQL", "TypeScript"],
      image: "/project images/ai content generator.png",
      slug: "ai-content-generator",
      category: "AI",
      longDescription: "A multi-tenant SaaS dashboard for digital agencies. It automates content production workflows by taking a single product premise and converting it into structured blog articles, email subject lines, and matching visual assets.",
      lighthouseMetrics: { performance: 97, accessibility: 98, bestPractices: 95, seo: 100 },
      features: [
        "Comprehensive content calendar showing scheduled blog drafts",
        "Built-in rich text editor featuring AI sentence expansions and rephrasing",
        "Image generator utilizing DALL-E 3 with pre-set brand style templates",
        "Direct export integrations to WordPress, Webflow, and Shopify blogs"
      ],
      architecture: {
        description: "Built with Next.js App Router and Prisma. Multi-tenant database schemas isolate customer documents. External asset rendering is handled asynchronously via backend queues.",
        database: "PostgreSQL & Redis Queue",
        hosting: "Vercel & Render"
      },
      gallery: ["/project images/ai content generator.png"],
      seoTags: ["Automated AI Content Generator", "NextJS marketing copy tool", "DALL-E 3 social graphics SaaS", "Prisma multi-tenant AI generator"]
    },
    {
      title: "Smart Medical Image Diagnosis Assistant",
      description: "A machine learning tool detecting abnormalities in X-ray and MRI scans, providing probability highlights for radiologists.",
      tech: ["React", "Python", "Flask", "PyTorch", "OpenCV", "Docker", "AWS S3"],
      image: "/project images/medical diagnosis.png",
      slug: "smart-medical-diagnosis",
      category: "AI",
      longDescription: "This medical image viewer and analyzer processes dicom and image files to suggest regions of interest. By leveraging PyTorch Convolutional Neural Networks (CNNs), it detects abnormalities such as fractures or lung nodules, ranking them by confidence scores.",
      lighthouseMetrics: { performance: 94, accessibility: 97, bestPractices: 99, seo: 100 },
      features: [
        "Web DICOM viewer supporting canvas zooms, pan settings, and contrast filters",
        "Heatmap visualizer showing ML focus coordinates (Grad-CAM visualization)",
        "Patient data masking to comply with HIPAA healthcare security regulations",
        "PDF audit reports detailing detected issues and probabilities"
      ],
      architecture: {
        description: "React client utilizing custom HTML5 canvas rendering. Flask serves as the backend gateway, delegating heavy neural network calculations to PyTorch nodes.",
        database: "PostgreSQL & MinIO storage",
        hosting: "AWS ECS with GPU clusters"
      },
      gallery: ["/project images/medical diagnosis.png"],
      seoTags: ["Smart Medical Diagnosis AI", "React DICOM viewer pathology", "PyTorch medical image CNN", "HIPAA compliant Flask backend"]
    },
    {
      title: "AI Predictive Maintenance Platform",
      description: "An IoT sensor analytics dashboard using LSTM neural networks to predict mechanical failures in manufacturing machinery.",
      tech: ["React", "InfluxDB", "Node.js", "Python TensorFlow", "WebSockets", "TypeScript"],
      image: "/project images/ai predictive.png",
      slug: "ai-predictive-maintenance",
      category: "AI",
      longDescription: "An industrial IoT dashboard designed for factory engineers. The platform connects to vibration and temperature sensors, analyzing historical trends to identify mechanical wear and estimate remaining useful life (RUL) before failures happen.",
      lighthouseMetrics: { performance: 95, accessibility: 95, bestPractices: 98, seo: 100 },
      features: [
        "Real-time sensor graphs rendering 100+ points per second via canvas rendering",
        "Predictive health scores calculating machinery decay rates",
        "Automated service ticket creation linked to enterprise maintenance tools",
        "Secure device registry managing IoT tokens and device credentials"
      ],
      architecture: {
        description: "Node.js WebSocket server streams telemetry data from IoT hubs. Historical analytics are queries from InfluxDB time-series storage, feeding predictions via TensorFlow microservices.",
        database: "InfluxDB & MongoDB",
        hosting: "Google Cloud IoT Core & GKE"
      },
      gallery: ["/project images/ai predictive.png"],
      seoTags: ["AI Predictive Maintenance IoT", "InfluxDB real-time telemetry dashboard", "TensorFlow LSTM factory prediction", "WebSocket IoT sensor monitoring"]
    },
    {
      title: "Intelligent Travel Itinerary Planner",
      description: "A personalized travel agent app that uses constraints (budget, interests, weather) to construct multi-day travel itineraries.",
      tech: ["React Native", "Expo", "Mapbox", "Next.js API", "OpenAI API", "Firebase", "TypeScript"],
      image: "/project images/ai travel planner.png",
      slug: "ai-travel-planner",
      category: "AI",
      longDescription: "A smart mobile travel companion app. The user inputs their destination, length of stay, budget constraints, and active interests, and the app leverages AI to arrange flights, hotels, and a daily itinerary mapped on interactive maps.",
      mobileMetrics: { startupTime: "1.4s", bundleSize: "6.2 MB", crashFreeRate: "99.96%", fps: 60 },
      features: [
        "AI itinerary engine calculating optimal routes to prevent backtracking",
        "Interactive travel mapping powered by Mapbox with offline maps support",
        "Live local weather integrations altering suggested plans dynamically",
        "Co-traveler sync letting multiple users collaborate on lists in real-time"
      ],
      architecture: {
        description: "Developed using React Native with Mapbox APIs. The optimization algorithms and AI requests are executed inside Next.js serverless API routes connected to Firebase Auth.",
        database: "Firebase Firestore",
        hosting: "Vercel & Google Cloud Functions"
      },
      gallery: ["/project images/ai travel planner.png"],
      seoTags: ["Intelligent Travel Planner AI", "Expo Mapbox travel routing", "React Native AI itinerary planner", "Firebase Firestore real-time trip planner"]
    },

    /* ─── ANDROID / MOBILE PROJECTS (10 Projects) ─────────── */
    {
      title: "FitQuest Gym Tracker",
      description: "A gamified workout tracker with customizable routines, weight tracking graphs, and peer challenges.",
      tech: ["React Native", "Expo SDK 54", "SQLite", "Redux Toolkit", "Reanimated", "TypeScript"],
      image: "/project images/gym tracker.png",
      slug: "fitquest-gym-tracker",
      category: "Mobile",
      longDescription: "FitQuest is an offline-first fitness logging mobile application. Users earn experience points and badges by completing workouts and maintaining weightlifting routines. High-performance charts show progression over time, keeping users motivated.",
      mobileMetrics: { startupTime: "1.1s", bundleSize: "4.5 MB", crashFreeRate: "99.99%", fps: 60 },
      features: [
        "Detailed exercise history tracking with rest timers and sound alerts",
        "Offline-first architecture storing data in local SQLite schemas",
        "Animated badges and progression maps utilizing React Native Reanimated",
        "Data export and backup utilities saving history to Google Drive"
      ],
      architecture: {
        description: "A mobile React Native application managed via Expo. Local database migrations are structured through SQLite Expo databases, while state management resides in Redux Toolkit.",
        database: "SQLite (Expo Database)",
        hosting: "Google Play Store"
      },
      gallery: ["/project images/gym tracker.png"],
      seoTags: ["FitQuest Gym Tracker", "React Native fitness game", "SQLite offline workout app", "Expo Reanimated mobile exercise log"]
    },
    {
      title: "LocalBite Food Delivery App",
      description: "A hyper-local food discovery and delivery app connecting users directly with home-chefs and local bakers.",
      tech: ["Android SDK", "Kotlin", "Jetpack Compose", "Firebase", "Google Maps API", "Stripe"],
      image: "/project images/localbite.png",
      slug: "localbite-food-delivery",
      category: "Mobile",
      longDescription: "LocalBite supports community micro-economies by allowing local chefs to list homemade specialties, set order deadlines, and coordinate local deliveries or pickups. It handles order states, location tracking, and mobile billing.",
      mobileMetrics: { startupTime: "1.4s", bundleSize: "5.8 MB", crashFreeRate: "99.95%", fps: 59 },
      features: [
        "Native map layouts displaying active food listings near the user's location",
        "Stripe payments integrated natively through Google Pay frameworks",
        "Dynamic push notifications alerting customers when food is ready for delivery",
        "Review profiles displaying chef health ratings and client feedbacks"
      ],
      architecture: {
        description: "A native Android project built in Kotlin and Jetpack Compose. Utilizes Firebase Auth for user management, Firestore for live database updates, and Stripe SDK for billing.",
        database: "Firebase Firestore",
        hosting: "Google Play Store & Firebase Cloud"
      },
      gallery: ["/project images/localbite.png"],
      seoTags: ["LocalBite Food Delivery Kotlin", "Jetpack Compose home chef app", "Firebase Firestore native Android map", "Stripe payment SDK Kotlin"]
    },
    {
      title: "LearnLoom Flashcards",
      description: "An offline-first spaced repetition learning app designed for medical and law students.",
      tech: ["React Native", "Expo", "Realm DB", "TypeScript", "Chart.js"],
      image: "/project images/learnloom.png",
      slug: "learnloom-flashcards",
      category: "Mobile",
      longDescription: "LearnLoom makes memorization easy by applying SuperMemo spaced repetition algorithms. Designed for heavy study workloads, students can write card decks containing custom images, code snippets, and text highlights, testing themselves on-the-go.",
      mobileMetrics: { startupTime: "1.2s", bundleSize: "4.8 MB", crashFreeRate: "99.98%", fps: 60 },
      features: [
        "Spaced repetition scheduling optimizing review timings based on past answers",
        "Offline database storing millions of high-definition study cards in Realm DB",
        "Rich text cards supporting markdown notation and inline LaTeX formulas",
        "Study analytics graphs tracing daily targets, study times, and retention rates"
      ],
      architecture: {
        description: "Expo application using Realm DB for high-speed local data reads. UI is constructed using React Native Paper with optimized layout rendering to prevent battery drains.",
        database: "Realm DB & Local Storage",
        hosting: "Google Play Store"
      },
      gallery: ["/project images/learnloom.png"],
      seoTags: ["LearnLoom Flashcards Mobile", "Spaced repetition study app Expo", "Realm DB React Native study cards", "Offline first medical flashcards"]
    },
    {
      title: "ParkSmart Finder",
      description: "A real-time parking spot reservation and navigation mobile app using street camera feeds.",
      tech: ["Kotlin", "Jetpack Compose", "Node.js", "Socket.IO", "PostgreSQL", "Google Maps"],
      image: "/project images/parksmart.png",
      slug: "parksmart-finder",
      category: "Mobile",
      longDescription: "ParkSmart guides drivers to available parking locations within crowded city centers. Using computer vision alerts from street webcams, the system detects open slots, updates maps, and allows drivers to reserve spots.",
      mobileMetrics: { startupTime: "1.5s", bundleSize: "7.2 MB", crashFreeRate: "99.94%", fps: 57 },
      features: [
        "Real-time parking vacancy maps updating dynamically via WebSockets",
        "GPS turn-by-turn navigation guided by Google Maps SDK",
        "QR code validation scanner letting users enter parking garages instantly",
        "Dynamic booking timers triggering parking overtime reminder warnings"
      ],
      architecture: {
        description: "Kotlin Android client communicating with a Node.js Express server. Real-time slot availability is managed via Socket.IO connections and spatial database calculations.",
        database: "PostgreSQL with PostGIS extensions",
        hosting: "Google Play Store & Heroku"
      },
      gallery: ["/project images/parksmart.png"],
      seoTags: ["ParkSmart Finder Android", "Kotlin Jetpack Compose maps", "Socket.IO real-time parking app", "PostGIS spatial parking query"]
    },
    {
      title: "HabitForge Habit Tracker",
      description: "A minimal daily habit tracker with streaks, home screen widgets, and interactive notifications.",
      tech: ["React Native", "Expo", "SQLite", "Reanimated", "Node.js", "Push Notifications"],
      image: "/project images/habitforge.png",
      slug: "habitforge-tracker",
      category: "Mobile",
      longDescription: "HabitForge helps users build good routines through a clean, distraction-free interface. It lets users define micro-habits, schedule interactive notifications, and display streak progress with custom widgets.",
      mobileMetrics: { startupTime: "1.1s", bundleSize: "3.9 MB", crashFreeRate: "99.99%", fps: 60 },
      features: [
        "Clean, modern interface designed with custom dark modes and animations",
        "Native Android widgets showing active habits on the home screen",
        "Interactive notifications allowing completion directly from lock screens",
        "Encrypted database sync backups storing progress securely in cloud drives"
      ],
      architecture: {
        description: "React Native Expo client implementing SQLite local storage and background notification handlers. Widgets are developed using native Kotlin wrappers linked via Expo modules.",
        database: "SQLite & local SQLite cache",
        hosting: "Google Play Store"
      },
      gallery: ["/project images/habitforge.png"],
      seoTags: ["HabitForge Habit Tracker", "React Native habit streaks app", "Expo interactive lockscreen notification", "Android widget Kotlin React Native"]
    },
    {
      title: "TaskFlow Team Organizer",
      description: "A mobile Kanban board app styled for developers on-the-go with real-time push updates.",
      tech: ["Kotlin", "Jetpack Compose", "Firebase Firestore", "Android SDK", "Coroutines"],
      image: "/project images/taskflow.png",
      slug: "taskflow-team-organizer",
      category: "Mobile",
      longDescription: "TaskFlow brings the flexibility of kanban cards to the mobile layout. Developers can review backlogs, assign cards, change statuses with drag-and-drop actions, and comment on tasks within active threads.",
      mobileMetrics: { startupTime: "1.3s", bundleSize: "5.1 MB", crashFreeRate: "99.96%", fps: 58 },
      features: [
        "Drag-and-drop task items designed natively for mobile viewports",
        "Real-time task synchronization across users via Firebase bindings",
        "Custom filter controls sorting cards by project, assignee, and priority",
        "Activity feed displaying commit logs and pull requests from GitHub"
      ],
      architecture: {
        description: "Native Android application built in Kotlin, using Jetpack Compose for UI components. Coroutines manage database fetches, and Firestore handles live sync.",
        database: "Firebase Firestore",
        hosting: "Google Play Store & Firebase Hosting"
      },
      gallery: ["/project images/taskflow.png"],
      seoTags: ["TaskFlow Team Organizer", "Kotlin kanban board app", "Android Jetpack Compose drag drop", "Firebase project management Android"]
    },
    {
      title: "Whisper Chat App",
      description: "A secure, end-to-end encrypted chat application utilizing the Signal protocol for private messaging.",
      tech: ["React Native", "Expo", "WebRTC", "SQLite", "Node.js", "Socket.IO", "TypeScript"],
      image: "/project images/whisper chat.png",
      slug: "whisper-chat-app",
      category: "Mobile",
      longDescription: "Whisper guarantees privacy by implementing the Signal double-ratchet encryption protocol. All messages, voice notes, and media are encrypted locally before transmission, ensuring that no interceptor can read logs.",
      mobileMetrics: { startupTime: "1.4s", bundleSize: "6.5 MB", crashFreeRate: "99.97%", fps: 60 },
      features: [
        "End-to-end encryption with secure key verification codes",
        "Peer-to-peer audio and video calls powered by WebRTC connections",
        "Disappearing messages disappearing from all devices after set timers",
        "Biometric security gates requiring fingerprint scans upon openings"
      ],
      architecture: {
        description: "React Native with custom native modules for crypto libraries. Node.js backend handles signaling for WebRTC and relays offline messages.",
        database: "SQLite (with SQLCipher encryption)",
        hosting: "Google Play Store & VPS"
      },
      gallery: ["/project images/whisper chat.png"],
      seoTags: ["Whisper Encrypted Chat", "React Native Signal Protocol", "WebRTC mobile video calling", "SQLite SQLCipher secure chat"]
    },
    {
      title: "CryptoPulse Tracker",
      description: "A beautiful cryptocurrency portfolio tracker with price widgets, alert thresholds, and news curation.",
      tech: ["Kotlin", "Android SDK", "Jetpack Compose", "Room Database", "Retrofit", "Coingecko API"],
      image: "/project images/crypto tracker.png",
      slug: "cryptopulse-tracker",
      category: "Mobile",
      longDescription: "CryptoPulse allows traders to track their portfolios across multiple chains. It connects to cryptocurrency data sources, displaying live token values, tracking gains/losses, and alerting users of market movements.",
      mobileMetrics: { startupTime: "1.2s", bundleSize: "4.7 MB", crashFreeRate: "99.98%", fps: 60 },
      features: [
        "Live token price feeds using WebSockets with automatic background reconnects",
        "Price alert thresholds triggering push notifications during price shifts",
        "Interactive candle charts displaying token trends over custom timeframes",
        "Wallet integrations calculating balances across public blockchain addresses"
      ],
      architecture: {
        description: "Kotlin project utilizing MVVM architecture. Retrofit fetches HTTP payloads, Room Database caches history offline, and Kotlin flows stream websocket updates.",
        database: "Room Database (SQLite)",
        hosting: "Google Play Store"
      },
      gallery: ["/project images/crypto tracker.png"],
      seoTags: ["CryptoPulse Tracker Android", "Kotlin Room database crypto", "Jetpack Compose candle charts", "Coingecko API wallet tracker"]
    },
    {
      title: "EcoTrack Carbon Counter",
      description: "An app letting users record their daily travel and food choices to calculate and offset their carbon footprint.",
      tech: ["React Native", "Expo", "Supabase", "Node.js", "Mapbox", "TypeScript"],
      image: "/project images/ecotrack.png",
      slug: "ecotrack-carbon-counter",
      category: "Mobile",
      longDescription: "EcoTrack gamifies carbon offset goals by analyzing travel habits, utility invoices, and meal logs. Users track their carbon savings, compete in community challenges, and purchase offsets from certified tree-planting initiatives.",
      mobileMetrics: { startupTime: "1.3s", bundleSize: "5.2 MB", crashFreeRate: "99.95%", fps: 58 },
      features: [
        "GPS travel analyzer calculating transit carbon scores in real-time",
        "Offset checkout flows linked to certified forestry projects via Stripe",
        "Daily lifestyle logging with dietary impact scores",
        "Weekly progress summaries with exportable climate certificates"
      ],
      architecture: {
        description: "A cross-platform React Native app powered by Supabase Auth and Database. The transit tracking runs in the background using native location services.",
        database: "Supabase (PostgreSQL)",
        hosting: "Google Play Store & Supabase Cloud"
      },
      gallery: ["/project images/ecotrack.png"],
      seoTags: ["EcoTrack Carbon Counter", "React Native carbon tracker", "Supabase mobile offset checker", "Expo location tracking app"]
    },
    {
      title: "BookShelf Library & Reader",
      description: "An ebook reader and cataloging app with EPUB support, reading highlights, and audio narration.",
      tech: ["Android SDK", "Kotlin", "Room Database", "Retrofit", "ExoPlayer", "Jetpack Compose"],
      image: "/project images/bookself.png",
      slug: "bookshelf-reader",
      category: "Mobile",
      longDescription: "BookShelf is a native Android e-reader. It renders EPUB books with custom page layout options, manages digital collections, and generates natural-sounding audio narratives from text components.",
      mobileMetrics: { startupTime: "1.4s", bundleSize: "6.9 MB", crashFreeRate: "99.96%", fps: 60 },
      features: [
        "Advanced EPUB rendering engines featuring font adjustments and night theme options",
        "Text-to-speech engine powered by native voice synthesis resources",
        "Highlight and annotations manager with automated export sync",
        "Reading target counters encouraging users to read daily"
      ],
      architecture: {
        description: "Kotlin application structured around Clean Architecture principles. It uses Room database to store reading bookmarks, and Retrofit to fetch online library metadata.",
        database: "Room Database",
        hosting: "Google Play Store"
      },
      gallery: ["/project images/bookself.png"],
      seoTags: ["BookShelf Reader Android", "Kotlin EPUB viewer", "Android text to speech book reader", "Room database book organizer"]
    },

    /* ─── WEB DEVELOPER PROJECTS (10 Projects) ────────────── */
    {
      title: "Interactive Coding Sandbox",
      description: "A browser-based code editor and previewer executing HTML, CSS, and JS in a secure iframe sandbox.",
      tech: ["React", "Monaco Editor", "Tailwind CSS", "Vite", "Web Workers", "TypeScript"],
      image: "/project images/coding sandbox.png",
      slug: "interactive-code-sandbox",
      category: "Web",
      longDescription: "An online sandbox for web developers. It runs code on-the-fly inside isolated iframes, providing console feedback and preview screens. Web Workers compile code templates, ensuring that infinite loops won't crash the editor.",
      lighthouseMetrics: { performance: 98, accessibility: 95, bestPractices: 99, seo: 100 },
      features: [
        "Monaco Editor integration supporting autocompletion and error highlights",
        "Secure iframe sandbox preventing code scripts from accessing parent documents",
        "Multi-file project tabs with mock node-modules imports",
        "One-click code sharing generating copyable configuration links"
      ],
      architecture: {
        description: "Vite React application utilizing Monaco Editor instances. Compilation of files and ES modules resolution are executed in the browser via dedicated Web Workers.",
        database: "LocalStorage & URL State",
        hosting: "Vercel & Netlify"
      },
      gallery: ["/project images/coding sandbox.png"],
      seoTags: ["Interactive Coding Sandbox", "Monaco Editor React component", "Iframe sandboxed code previewer", "Web Workers Javascript compiler"]
    },
    {
      title: "DevDock Documentation Platform",
      description: "A lightning-fast MDX markdown docs platform with versioning, instant global search, and clean design.",
      tech: ["Next.js", "MDX", "Algolia Search", "Tailwind CSS", "TypeScript", "Vercel"],
      image: "/project images/devdock.png",
      slug: "devdock-docs-platform",
      category: "Web",
      longDescription: "DevDock helps software teams ship product documentation fast. It parses MDX files into pages, styling tables and code blocks automatically. Algolia indexes pages, delivering search results as the user types.",
      lighthouseMetrics: { performance: 100, accessibility: 100, bestPractices: 98, seo: 100 },
      features: [
        "Markdown MDX reader rendering dynamic React components inside blogs",
        "Algolia instant search index updating with every documentation change",
        "Git version control selectors allowing users to switch between release versions",
        "Interactive API playgrounds letting users execute test requests directly"
      ],
      architecture: {
        description: "Next.js Static Site Generation (SSG) with ISR (Incremental Static Regeneration). Content is parsed from MDX files using Unified and Remark compiler chains.",
        database: "Git Repository & Algolia Index",
        hosting: "Vercel & GitHub Actions"
      },
      gallery: ["/project images/devdock.png"],
      seoTags: ["DevDock Docs Platform", "NextJS MDX documentation", "Algolia search static site documentation", "Unified compiler markdown React"]
    },
    {
      title: "Vibrant Agency Portfolio",
      description: "A highly interactive 3D WebGL agency landing page featuring fluid cursor trails and smooth scrolling.",
      tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "Three.js", "Canvas API"],
      image: "/project images/agency portfolio.png",
      slug: "vibrant-agency-portfolio",
      category: "Web",
      longDescription: "A creative landing page built to push the limits of modern browser capabilities. It merges WebGL scenes, custom shader textures, and GSAP scroll triggers, building a memorable sensory narrative for visiting users.",
      lighthouseMetrics: { performance: 96, accessibility: 98, bestPractices: 99, seo: 100 },
      features: [
        "Three.js rendering pipelines displaying custom particle systems",
        "Interactive fluid simulations reacting to mouse coordinates",
        "GSAP scroll triggers animating text typography and layout cards",
        "Accessible DOM structures retaining compatibility with screen reader tools"
      ],
      architecture: {
        description: "Pure vanilla JavaScript organized with modular ES6 classes. Scene renderers utilize custom fragment shaders compiled in GPU buffers to preserve rendering speed.",
        database: "None (Static Website)",
        hosting: "GitHub Pages & Cloudflare CDN"
      },
      gallery: ["/project images/agency portfolio.png"],
      seoTags: ["Vibrant Agency Portfolio", "Threejs WebGL portfolio template", "GSAP ScrollTrigger creative page", "Custom fragment shader interactive canvas"]
    },
    {
      title: "GitVisual Pull Request Reviewer",
      description: "A web app generating visual branch graphs and diff trees to simplify GitHub code reviews.",
      tech: ["React", "TypeScript", "GitHub REST API", "D3.js", "Node.js", "Express"],
      image: "/project images/gitvisual.png",
      slug: "gitvisual-pr-reviewer",
      category: "Web",
      longDescription: "GitVisual offers an interactive alternative to GitHub's file diff lists. It processes change histories, mapping files onto D3 radial graphs. Code files are colored based on change size, highlighting risky commits.",
      lighthouseMetrics: { performance: 97, accessibility: 96, bestPractices: 98, seo: 100 },
      features: [
        "Interactive D3 file dependency graphs displaying file changes visually",
        "GitHub API integrations syncing repository structures instantly",
        "Code metrics analyzers highlighting complex files that lack unit tests",
        "Team comment boards supporting inline threads and approval checkpoints"
      ],
      architecture: {
        description: "React client connected to a secure Express server. The backend retrieves branch payloads, computes change complexities, and pipes JSON responses to D3 canvas widgets.",
        database: "Redis Cache",
        hosting: "Render & Vercel"
      },
      gallery: ["/project images/gitvisual.png"],
      seoTags: ["GitVisual PR Reviewer", "D3js code change visualizer", "GitHub REST API developer dashboard", "React Git diff graph"]
    },
    {
      title: "Zenith Headless Blog CMS",
      description: "A headless blog system with a visual editor, media library, and static site generator webhooks.",
      tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "AWS S3", "GraphQL", "TypeScript"],
      image: "/project images/zenith.png",
      slug: "zenith-blog-cms",
      category: "Web",
      longDescription: "Zenith offers a headless editing environment for writers. Content creators draft blogs within block-based visual editors, while developers query content via high-speed GraphQL endpoints for static pages.",
      lighthouseMetrics: { performance: 95, accessibility: 98, bestPractices: 96, seo: 100 },
      features: [
        "Block-style content editor allowing drag-and-drop text and media layouts",
        "S3 media uploader automatically resizing images into responsive sizes",
        "Static site generator webhooks triggering rebuilding on Vercel and Netlify",
        "GraphQL schema query builders displaying instant data structure previews"
      ],
      architecture: {
        description: "NestJS GraphQL backend serving data schemas from MongoDB. Media uploads flow into AWS S3 using signed upload URLs, reducing API load.",
        database: "MongoDB (Mongoose Schema)",
        hosting: "AWS ECS & Vercel"
      },
      gallery: ["/project images/zenith.png"],
      seoTags: ["Zenith Headless Blog CMS", "NestJS GraphQL blog engine", "AWS S3 media library CMS", "MongoDB NextJS block editor"]
    },
    {
      title: "AssetHub Digital Asset Manager",
      description: "A portal for designers to store, tag, convert, and collaborate on heavy asset files.",
      tech: ["React", "Node.js", "Express.js", "PostgreSQL", "Cloudinary", "AWS S3", "TypeScript"],
      image: "/project images/assethub.png",
      slug: "assethub-digital-asset",
      category: "Web",
      longDescription: "AssetHub enables design teams to index visual libraries. Users upload PNGs, SVGs, and heavy video clips, tag them using AI recognition, and convert them to web formats (WebP, MP4) directly in the browser.",
      lighthouseMetrics: { performance: 94, accessibility: 97, bestPractices: 96, seo: 100 },
      features: [
        "Drag-and-drop asset uploader handling bulk uploads up to 500MB",
        "AI auto-tagger detecting objects and colors within uploaded imagery",
        "Image converter pipelines outputting WebP and SVG exports instantly",
        "Collaborative share links managing download limits and access passcodes"
      ],
      architecture: {
        description: "React client with Express backend. Image processing pipelines use Sharp and FFmpeg binary instances running inside Docker containers, keeping queues moving.",
        database: "PostgreSQL & Redis",
        hosting: "DigitalOcean droplets"
      },
      gallery: ["/project images/assethub.png"],
      seoTags: ["AssetHub Digital Asset Manager", "Sharp image conversion React", "AWS S3 bulk media uploader", "PostgreSQL file indexing SaaS"]
    },
    {
      title: "MindMap Collaborative Brainstormer",
      description: "A collaborative mind-mapping tool with real-time pointer sharing and auto-save canvas.",
      tech: ["Next.js", "React Flow", "Supabase Realtime", "Tailwind CSS", "TypeScript"],
      image: "/project images/mindmap.png",
      slug: "mindmap-brainstormer",
      category: "Web",
      longDescription: "MindMap brings brainstorming sessions online. Users construct node-based mind maps on infinite canvases. Supabase synchronizes changes, showing team cursor coordinates and text edits as they happen.",
      lighthouseMetrics: { performance: 98, accessibility: 96, bestPractices: 99, seo: 100 },
      features: [
        "Infinite node drawing canvas utilizing React Flow library wrappers",
        "Real-time team cursor coordinates showing presence using Supabase channels",
        "Automatic database saves syncing maps locally before pushing cloud updates",
        "Canvas export utilities outputting high-definition PNG and PDF maps"
      ],
      architecture: {
        description: "Next.js App Router project leveraging React Flow for canvas calculations. Collaborative state and locks are managed using Supabase Realtime subscriptions.",
        database: "PostgreSQL (Supabase)",
        hosting: "Vercel & Supabase Cloud"
      },
      gallery: ["/project images/mindmap.png"],
      seoTags: ["MindMap Brainstormer", "React Flow infinite canvas", "Supabase Realtime cursor sharing", "Collaborative design dashboard NextJS"]
    },
    {
      title: "StatLink Link Shortener",
      description: "An enterprise URL shortener with geo-location tracking, QR codes, and performance graphs.",
      tech: ["Next.js", "Redis", "PostgreSQL", "Chart.js", "Tailwind CSS", "TypeScript"],
      image: "/project images/statlink.png",
      slug: "statlink-link-shortener",
      category: "Web",
      longDescription: "StatLink provides marketing teams with secure URL aliases. When clicked, it logs browser properties, referring sites, and geo-locations, routing users to their destination within milliseconds.",
      lighthouseMetrics: { performance: 99, accessibility: 100, bestPractices: 99, seo: 100 },
      features: [
        "Fast link redirections executing in under 12 milliseconds using Redis routing",
        "Detailed click analytics charts tracking browser categories and locations",
        "Dynamic QR code generator tool creating downloadable graphics for printing",
        "Custom domain support letting users connect their company domains easily"
      ],
      architecture: {
        description: "Built with Next.js edge functions. Redirections are resolved at the network edge from Redis. Analytical logs are aggregated asynchronously, saving database IOPS.",
        database: "PostgreSQL & Redis DB",
        hosting: "Vercel & Upstash Redis"
      },
      gallery: ["/project images/statlink.png"],
      seoTags: ["StatLink Link Shortener", "Redis Edge URL routing", "NextJS URL redirection dashboard", "ChartJS analytics short links"]
    },
    {
      title: "CollabEdit Realtime Editor",
      description: "An online rich text editor allowing simultaneous document editing with cursor presence.",
      tech: ["React", "Quill.js", "Yjs", "WebSockets", "Express.js", "TypeScript"],
      image: "/project images/collabedit.png",
      slug: "collabedit-realtime-editor",
      category: "Web",
      longDescription: "CollabEdit replicates the collaborative writing features of Google Docs. Using conflict-free replicated data types (CRDTs), it resolves typing overlaps without requiring central coordination, keeping document states aligned.",
      lighthouseMetrics: { performance: 96, accessibility: 97, bestPractices: 98, seo: 100 },
      features: [
        "Rich text formatting tools powered by Quill editor configurations",
        "Conflict-free editor syncing utilizing Yjs document protocols",
        "User presence markers tracking typing selections on the page",
        "Document export formats downloading files in Word, PDF, or HTML"
      ],
      architecture: {
        description: "A React app communicating with an Express websocket gateway. Document sync state runs using Y-Websockets, executing CRDT resolution algorithms on the client.",
        database: "SQLite (document history)",
        hosting: "Render droplet & Vercel"
      },
      gallery: ["/project images/collabedit.png"],
      seoTags: ["CollabEdit Realtime Editor", "QuillJS collaborative editor", "Yjs CRDT text synchronization", "WebSocket Express text editor"]
    },
    {
      title: "Apex Task Board",
      description: "A sleek project management tool inspired by Linear with shortcuts, fast navigation, and dark styling.",
      tech: ["React", "Redux Toolkit", "Tailwind CSS", "Node.js", "MongoDB", "TypeScript"],
      image: "/project images/apex.png",
      slug: "apex-task-board",
      category: "Web",
      longDescription: "Apex is built for developers who favor keyboard-centric interfaces. With full keyboard shortcuts, command menus, and high-performance list filters, developers can search and manage tasks without clicking.",
      lighthouseMetrics: { performance: 99, accessibility: 98, bestPractices: 97, seo: 100 },
      features: [
        "Command palettes (Ctrl+K menu) allowing rapid task changes via typing",
        "Keyboard shortcut layouts navigating the board without trackpad clicks",
        "Optimized list scroll lists displaying thousands of tasks without lagging",
        "Custom status columns letting teams configure software sprint workflows"
      ],
      architecture: {
        description: "React client utilizing custom state hooks. Node.js backend serves task queries optimized with index structures on MongoDB rollouts.",
        database: "MongoDB (Mongoose ODM)",
        hosting: "AWS EC2 & Vercel"
      },
      gallery: ["/project images/apex.png"],
      seoTags: ["Apex Task Board", "Linear alternative React dashboard", "Command palette Ctrl K search", "MongoDB MERN developer board"]
    },

    /* ─── SAAS PROJECTS (10 Projects) ─────────────────────── */
    {
      title: "InvoiceFlow SaaS",
      description: "A automated client invoicing and subscription billing platform for freelance agencies and consulting firms.",
      tech: ["Next.js", "Stripe Billing", "Node.js", "Express.js", "PostgreSQL", "Prisma", "TypeScript"],
      image: "/project images/invoiceflow.png",
      slug: "invoiceflow-saas",
      category: "SaaS",
      longDescription: "InvoiceFlow automates invoicing pipelines for professional service firms. It handles recurring billing schedules, sends reminders to clients automatically, and matches bank accounts to settle ledger balances.",
      lighthouseMetrics: { performance: 98, accessibility: 99, bestPractices: 96, seo: 100 },
      features: [
        "Automated PDF invoice generation and direct client emailing",
        "Subscription billing portals powered by Stripe billing frameworks",
        "Payment tracking widgets showing overdue logs and monthly revenue logs",
        "Multi-currency conversion tables processing global client invoices"
      ],
      architecture: {
        description: "Built with Next.js App Router and Prisma. Stripe webhook subscriptions handle invoice states, updating tables inside a secure PostgreSQL cluster.",
        database: "PostgreSQL (Prisma ORM)",
        hosting: "Vercel & Supabase Cloud"
      },
      gallery: ["/project images/invoiceflow.png"],
      challenge: {
        problem: "Professional service agencies struggled with manual PDF generation, late payments, and the overhead of matching bank transfers to outstanding bills across multiple currencies.",
        solution: "Architected a Next.js invoice engine integrated with Stripe Billing. It automatically compiles and emails cryptographic, tamper-proof PDF invoices, handles automated dunning email campaigns for late fees, and syncs account ledger balances in real-time, reducing late payments by 40%."
      },
      seoTags: ["InvoiceFlow SaaS Billing", "Stripe billing NextJS platform", "Prisma PostgreSQL invoice engine", "Automated freelance invoice generator"]
    },
    {
      title: "PagePulse Analytics",
      description: "A privacy-friendly, lightweight web analytics platform tracking traffic, referrers, and goals in real-time.",
      tech: ["Next.js", "ClickHouse", "Node.js", "Redis", "Tailwind CSS", "TypeScript"],
      image: "/project images/pagepulse.png",
      slug: "pagepulse-analytics-saas",
      category: "SaaS",
      longDescription: "PagePulse offers a lightweight alternative to Google Analytics. It tracks page views, user sessions, and custom conversion events without deploying tracking cookies, remaining compliant with GDPR regulations.",
      lighthouseMetrics: { performance: 99, accessibility: 98, bestPractices: 100, seo: 100 },
      features: [
        "Lightweight tracking script weighing less than 1KB, preserving page speed",
        "Real-time traffic analytics graphs displaying active users on the page",
        "Privacy-oriented architecture tracking visitors without cookie footprints",
        "Goal tracking filters monitoring sign-up conversions and click rates"
      ],
      architecture: {
        description: "A high-volume Next.js ingest endpoint. Logs are written to Redis buffers before being flushed into ClickHouse database rows, maintaining system capacity.",
        database: "ClickHouse (OLAP) & Redis",
        hosting: "AWS EC2 & Vercel"
      },
      gallery: ["/project images/pagepulse.png"],
      seoTags: ["PagePulse Analytics SaaS", "GDPR compliant web analytics", "ClickHouse high volume analytics NextJS", "Lightweight tracking script dashboard"]
    },
    {
      title: "MailBlast Email Marketer",
      description: "A self-hosted email newsletter platform managing list segments, campaign builders, and tracking.",
      tech: ["Next.js", "Node.js", "Amazon SES", "PostgreSQL", "Redis", "BullMQ", "TypeScript"],
      image: "/project images/mailblast.png",
      slug: "mailblast-email-saas",
      category: "SaaS",
      longDescription: "MailBlast provides companies with marketing newsletter control. It imports lists, constructs templates in block editors, and sends messages via Amazon SES, reducing monthly marketing costs.",
      lighthouseMetrics: { performance: 96, accessibility: 98, bestPractices: 95, seo: 100 },
      features: [
        "Visual drag-and-drop newsletter builder outputting clean email CSS templates",
        "Email delivery pipelines powered by Amazon SES integrations",
        "Real-time campaign analytics charts tracking open rates and click stats",
        "Smart segmentation filters sorting contacts by activity histories"
      ],
      architecture: {
        description: "Next.js client with a Node.js worker backend. Task queues managed via BullMQ and Redis ensure bulk email sending is processed smoothly without memory leaks.",
        database: "PostgreSQL & Redis queue",
        hosting: "AWS ECS & Vercel"
      },
      gallery: ["/project images/mailblast.png"],
      seoTags: ["MailBlast Email Marketer", "Amazon SES newsletter SaaS", "BullMQ background worker NextJS", "Drag drop email editor React"]
    },
    {
      title: "SiteGuard Uptime Monitor",
      description: "A monitoring service checking HTTP/TCP endpoints every minute, alerting via SMS, Slack, or email.",
      tech: ["React", "NestJS", "Redis", "PostgreSQL", "Twilio", "SendGrid", "TypeScript"],
      image: "/project images/siteguard.png",
      slug: "siteguard-uptime-saas",
      category: "SaaS",
      longDescription: "SiteGuard monitors company websites for downtime. It executes request checks, logs response latency, and sends instant alerts via Twilio and Slack if error status codes are returned.",
      lighthouseMetrics: { performance: 97, accessibility: 96, bestPractices: 98, seo: 100 },
      features: [
        "Continuous site uptime monitoring intervals running every 60 seconds",
        "Multi-channel warning alerts integrated with Slack, SMS, and email templates",
        "Response time tracking graphs monitoring global connection speeds",
        "Public status page builders displaying service uptime history for users"
      ],
      architecture: {
        description: "NestJS scheduler node executing parallel request probes. Monitoring tasks are cached in Redis to maintain fast polling intervals.",
        database: "PostgreSQL & Redis",
        hosting: "DigitalOcean Droplet & Vercel"
      },
      gallery: ["/project images/siteguard.png"],
      seoTags: ["SiteGuard Uptime Monitor", "NestJS cron service checks", "Twilio API SMS downtime warning", "Uptime status page SaaS"]
    },
    {
      title: "DocuSigner PDF Contract Platform",
      description: "A SaaS platform enabling companies to upload contracts, place signature fields, and request signatures.",
      tech: ["Next.js", "PDF-lib", "Node.js", "Express.js", "MongoDB", "AWS S3", "TypeScript"],
      image: "/project images/docusigner.png",
      slug: "docusigner-contract-saas",
      category: "SaaS",
      longDescription: "DocuSigner streamlines signing workflows. Users upload PDF documents, drag dynamic signing areas onto sheets, and invite signers, receiving email notifications when signatures are completed.",
      lighthouseMetrics: { performance: 95, accessibility: 98, bestPractices: 98, seo: 100 },
      features: [
        "PDF form drawer placing signing boxes and text fields on canvas layers",
        "Cryptographic signature validation sealing documents against tampering",
        "Automated signing reminders emailing signers until signatures are completed",
        "Audit trail logs recording user IPs and timestamps for validation"
      ],
      architecture: {
        description: "Next.js App Router for frontend operations. Document canvases utilize custom PDF-lib rendering pipelines, and signed files are stored in AWS S3 buckets.",
        database: "MongoDB (Mongoose ODM)",
        hosting: "AWS ECS & Vercel"
      },
      gallery: ["/project images/docusigner.png"],
      seoTags: ["DocuSigner PDF SaaS", "PDF lib canvas drawing signatures", "AWS S3 contract locker", "Secure document audit trail"]
    },
    {
      title: "TaskSync Enterprise CRM",
      description: "A client relationship management portal with pipeline workflows, lead scoring, and meeting schedules.",
      tech: ["React", "NestJS", "PostgreSQL", "Supabase", "Google Calendar API", "TypeScript"],
      image: "/project images/tasksync.png",
      slug: "tasksync-crm-saas",
      category: "SaaS",
      longDescription: "TaskSync helps sales teams organize lead pipelines. It logs client interactions, scores lead profiles using business metrics, and syncs team calendars to coordinate client appointments.",
      lighthouseMetrics: { performance: 96, accessibility: 97, bestPractices: 96, seo: 100 },
      features: [
        "Drag-and-drop lead pipeline boards displaying sales funnel stages",
        "Automatic calendar booking systems syncing with Google Calendar APIs",
        "Lead profiling pages organizing contact histories and chat logs",
        "Sales target progress widgets calculating monthly deal metrics"
      ],
      architecture: {
        description: "React client styled with Tailwind. The NestJS backend integrates OAuth workflows to connect user Google calendars and sync availability data.",
        database: "PostgreSQL (Supabase)",
        hosting: "Supabase & Vercel"
      },
      gallery: ["/project images/tasksync.png"],
      seoTags: ["TaskSync Enterprise CRM", "NestJS Google Calendar API CRM", "Sales pipeline drag drop React", "Supabase PostgreSQL client dashboard"]
    },
    {
      title: "FormForge Form Builder",
      description: "A SaaS to build beautiful, custom contact forms and host them with secure endpoints, exporting responses.",
      tech: ["Next.js", "Tailwind CSS", "PostgreSQL", "Prisma", "Resend API", "TypeScript"],
      image: "/project images/formforge.png",
      slug: "formforge-builder-saas",
      category: "SaaS",
      longDescription: "FormForge enables users to publish forms without programming. Users assemble form inputs in visual builders, embed forms on their websites, and route submitted answers directly to email boxes.",
      lighthouseMetrics: { performance: 98, accessibility: 99, bestPractices: 97, seo: 100 },
      features: [
        "Visual drag-and-drop form uploader offering customizable input fields",
        "Embeddable iframe forms matching existing site styles automatically",
        "Email notifications powered by Resend APIs sending submissions",
        "Response analysis tools summarizing feedback percentages and scores"
      ],
      architecture: {
        description: "Next.js App Router project leveraging Prisma. HTML inputs are sanitized on server routes before being recorded in PostgreSQL rows.",
        database: "PostgreSQL (Prisma ORM)",
        hosting: "Vercel & Supabase Cloud"
      },
      gallery: ["/project images/formforge.png"],
      seoTags: ["FormForge Form Builder", "NextJS drag drop form editor", "Resend API email contact notifications", "Prisma Postgres form submissions"]
    },
    {
      title: "SocialPulse Scheduler",
      description: "A multi-channel social media publisher allowing users to schedule and preview posts for X, LinkedIn, and Instagram.",
      tech: ["Next.js", "Node.js", "Buffer API", "PostgreSQL", "Redis", "BullMQ", "TypeScript"],
      image: "/project images/social.png",
      slug: "socialpulse-scheduler-saas",
      category: "SaaS",
      longDescription: "SocialPulse consolidates social postings. Users compile message campaigns, preview layouts across platforms, and schedule drafts, letting the platform release updates to networks automatically.",
      lighthouseMetrics: { performance: 95, accessibility: 97, bestPractices: 96, seo: 100 },
      features: [
        "Unified social media publisher scheduling posts to multiple accounts",
        "Visual layout previews displaying post formats before publication",
        "Queue-based posting pipelines handling network rate limit errors",
        "Engagement tracker charts recording post likes, retweets, and comments"
      ],
      architecture: {
        description: "Next.js frontend. Scheduled posting logic is managed via Node.js worker threads using Redis queues to trigger API calls at correct times.",
        database: "PostgreSQL & Redis DB",
        hosting: "AWS ECS & Vercel"
      },
      gallery: ["/project images/social.png"],
      seoTags: ["SocialPulse Scheduler SaaS", "NextJS Buffer api social compiler", "BullMQ social queue Redis", "Multi channel scheduler dashboard"]
    },
    {
      title: "KubeDash Kubernetes Monitor",
      description: "A developer dashboard aggregating logs, resource usage, and health states of Kubernetes clusters.",
      tech: ["Next.js", "Kubernetes API", "Prometheus", "Grafana", "Node.js", "TypeScript"],
      image: "/project images/kube.png",
      slug: "kubedash-k8s-saas",
      category: "SaaS",
      longDescription: "KubeDash offers system administrators visual control of cloud environments. It aggregates pod states, tracks CPU utilization, and streams deployment log files directly to developer screens.",
      lighthouseMetrics: { performance: 98, accessibility: 97, bestPractices: 98, seo: 100 },
      features: [
        "Pod state grid visualizing container statuses and warning indicators",
        "System metrics graphs streaming CPU and memory usage logs in real-time",
        "Terminal console streaming active container log files to browsers",
        "Deployment editor validation checking YAML syntax schemas"
      ],
      architecture: {
        description: "Next.js dashboard connected to Kubernetes cluster API keys. Node.js backend endpoints fetch statistics from Prometheus clusters and cache dashboard telemetry.",
        database: "Redis Cache",
        hosting: "EKS (Elastic Kubernetes Service)"
      },
      gallery: ["/project images/kube.png"],
      seoTags: ["KubeDash Kubernetes Dashboard", "NextJS Kubernetes api terminal logs", "Prometheus container metrics dashboard", "EKS container state monitor"]
    },
    {
      title: "SupportGenie Ticketing",
      description: "A multi-agent support ticketing hub integrating emails, chats, and FAQs into a single inbox.",
      tech: ["React", "Node.js", "Socket.IO", "PostgreSQL", "Sequelize", "AWS S3", "TypeScript"],
      image: "/project images/support.png",
      slug: "supportgenie-ticketing-saas",
      category: "SaaS",
      longDescription: "SupportGenie organizes customer inquiries. It consolidates support tickets from chat widgets and email routes, tracks agent response times, and suggests answers using built-in knowledge bases.",
      lighthouseMetrics: { performance: 95, accessibility: 98, bestPractices: 97, seo: 100 },
      features: [
        "Unified inbox collecting customer chats and email templates in one log",
        "Real-time ticket updates syncing state changes via Socket.IO webhooks",
        "Internal notes system letting agents collaborate on tricky tickets",
        "SLA timer indicators warning agents of ticket expiration periods"
      ],
      architecture: {
        description: "React client connected to a Node.js Express server. Ticket distribution is managed using worker queues, and chat streams synchronize using Socket.IO.",
        database: "PostgreSQL (Sequelize ORM)",
        hosting: "AWS EC2 & Vercel"
      },
      gallery: ["/project images/support.png"],
      seoTags: ["SupportGenie Support Ticketing", "Socket.IO helpdesk chat React", "Sequelize Postgres ticket manager", "Unified client service dashboard"]
    }
  ] as Project[],
  businessGuides: {
    pricing: {
      landingPage: "$75 USD (50% Special Discount Applied - Regular $150)",
      webApp: "$300 USD (50% Special Discount Applied - Regular $600)",
      retainer: "Available upon discussion"
    },
    warrantyDays: 30,
    availability: {
      freelance: "Open for select high-end freelance contracts starting next month! He has the bandwidth for 1 large-scale application (or SaaS portal) and 1 custom marketing/landing page.",
      fullTime: "Seeking a full-time opportunity where he can contribute his skills to an innovative team."
    }
  }
};
