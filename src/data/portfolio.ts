export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  github?: string;
  slug: string;
  category: "Web" | "Mobile" | "AI" | "E-Commerce";
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
      image: "/super.png",
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
      gallery: ["/super.png"]
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
      gallery: ["/feedo.png"]
    },
    {
      title: "JLM Tournaments",
      description: "A robust platform for organizing gaming tournaments featuring a sophisticated modal interface, event filtering, live match viewing, dynamic leaderboards, and comprehensive profile workflows.",
      tech: ["React", "Vite", "Supabase", "Express JS", "JavaScript", "Tailwind CSS"],
      link: "https://github.com/Ayush08k/jlm-tournament",
      github: "https://github.com/Ayush08k/jlm-tournament",
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
      gallery: ["/jlm.png"]
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
      gallery: ["/music.png"]
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
      gallery: ["/e-commerce.png"]
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
    }
  ] as Project[],
  businessGuides: {
    pricing: {
      landingPage: "$1,500 – $3,000",
      webApp: "$5,000+",
      retainer: "Available upon discussion"
    },
    warrantyDays: 30,
    availability: {
      freelance: "Open for select high-end freelance contracts starting next month! He has the bandwidth for 1 large-scale application (or SaaS portal) and 1 custom marketing/landing page.",
      fullTime: "Seeking a full-time opportunity where he can contribute his skills to an innovative team."
    }
  }
};
