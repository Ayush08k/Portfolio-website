export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  github?: string;
}

export interface Service {
  name: string;
  iconName: string; // Used to dynamically choose lucide icons or reference in UI
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
      title: "Gurugram University\nAttendance Management System",
      description: "Faculty can track and mark student attendance with real-time class scheduling and automated reminders, while students access a personal dashboard to monitor their attendance history, grades, and university updates. Additionally, administrators can manage users and resources while viewing detailed analytics to effectively oversee overall university performance.",
      tech: ["HTML", "CSS", "Vite", "React", "Node.js", "Express.js", "Tailwind", "JavaScript", "MongoDB"],
      image: "/super.png"
    },
    {
      title: "Aura Creative Studio",
      description: "A minimalist portfolio for a creative agency featuring smooth page transitions, high-quality media handling, and dynamic content delivery.",
      tech: ["React", "GSAP", "Framer Motion", "Sanity.io"],
      link: "#",
      github: "#",
      image: "/aura.png"
    },
    {
      title: "JLM Tournaments: An Online Tournament\n Organisation Platform",
      description: "A robust platform for organizing gaming tournaments featuring a sophisticated modal interface, event filtering, live match viewing, dynamic leaderboards, and comprehensive profile/notification workflows.",
      tech: ["React", "Vite", "Supabase", "Express JS", "JavaScript", "Tailwind CSS"],
      link: "https://github.com/Ayush08k/jlm-tournament",
      github: "https://github.com/Ayush08k/jlm-tournament",
      image: "/jlm.png"
    },
    {
      title: "Vanguard Fitness App",
      description: "A premium fitness tracking application with personalized workout plans, social features, and deep integration with wearable health devices.",
      tech: ["React Native", "Expo", "Node.js", "PostgreSQL"],
      link: "#",
      github: "#",
      image: "/vanguard.png"
    },
    {
      title: "Lumina Art Gallery",
      description: "An immersive virtual art gallery experience featuring high-resolution artwork previews, artist profiles, and secure NFT purchasing.",
      tech: ["Three.js", "React", "Web3.js", "Solidity"],
      link: "#",
      github: "#",
      image: "/lumina.png"
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
