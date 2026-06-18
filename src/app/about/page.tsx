"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Briefcase, Cpu, Terminal, Laptop, ShieldCheck, Heart, Layers, MessageSquare, Code2, Sparkles, Send } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Timeline Data
  const timelineData = [
    {
      year: "2024 - Present",
      title: "MCA Pursuing & Freelancing",
      institution: "Gurugram University",
      description: "Pursuing a Master of Computer Applications (MCA) at Gurugram University while running a freelance practice, designing and developing custom web applications and mobile platforms for international clients.",
      icon: <Briefcase size={18} />,
      color: "var(--accent-cyan)",
    },
    {
      year: "2023",
      title: "Skills Development",
      institution: "Self-Guided / Projects",
      description: "Dedicated to mastering advanced web development, expanding technical capabilities, learning modern framework architectures, and diving deeper into full-stack technologies.",
      icon: <Code2 size={18} />,
      color: "#A855F7",
    },
    {
      year: "2020 - 2023",
      title: "BCA from Maharshi Dayanand University",
      institution: "Maharshi Dayanand University",
      description: "Completed Bachelor of Computer Applications (BCA) degree with a focus on core software development principles, databases, data structures, and programming paradigms.",
      icon: <BookOpen size={18} />,
      color: "#3B82F6",
    },
  ];

  const setupData = {
    hardware: [
      { label: "Processor", value: "AMD Ryzen 5 5500U (6 Cores, 12 Threads)" },
      { label: "Memory", value: "16GB DDR4 RAM" },
      { label: "Storage", value: "512GB NVMe PCIe M.2 SSD" },
      { label: "Display", value: "Single 24\" FHD IPS Monitor (75Hz)" },
    ],
    software: [
      { label: "Operating System", value: "Windows 11 Home + WSL 2 (Ubuntu 22.04 LTS)" },
      { label: "IDE", value: "VS Code (Custom Tokyo Night / JetBrains Mono font)" },
      { label: "Terminal", value: "Windows Terminal (Powershell Core + Oh-My-Posh)" },
      { label: "Design Tools", value: "Figma (UI/UX), Excalidraw (Architecture planning)" },
    ],
  };

  // Client Collaboration Workflow Data
  const workflowSteps = [
    {
      step: "01",
      title: "Discovery & Estimator scoping",
      desc: "We align on your project goals. Clients use our custom pricing estimator to outline screens and requirements, giving us a clear cost frame instantly.",
      icon: <MessageSquare size={20} />,
    },
    {
      step: "02",
      title: "Architecture & Wireframes",
      desc: "I plan your system architecture including database schemas, server functions, and layout wireframes in Figma to ensure a visual agreement.",
      icon: <Layers size={20} />,
    },
    {
      step: "03",
      title: "Milestone-based Sprints",
      desc: "Code is delivered iteratively. Clients get access to a private Github repository and staging links (Vercel/Expo Go) to review live progress weekly.",
      icon: <Terminal size={20} />,
    },
    {
      step: "04",
      title: "Verified Delivery & Deployment",
      desc: "Comprehensive testing, page load optimization (targeting 90+ Lighthouse/Core Vitals), hosting configuration, and full code handoff.",
      icon: <ShieldCheck size={20} />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="about-page">
      {/* Background gradients */}
      <div className="orb orb-1" style={{ top: "-5%", left: "5%", opacity: 0.12 }} />
      <div className="orb orb-2" style={{ top: "40%", right: "8%", opacity: 0.1 }} />
      <div className="orb orb-3" style={{ bottom: "5%", left: "15%", opacity: 0.15 }} />

      <motion.header
        initial={isMobile ? undefined : { opacity: 0, y: -20 }}
        animate={isMobile ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="about-header container"
      >
        <div className="header-title-row">
          <Link href="/" className="back-btn-logo" data-hover aria-label="Back to Home">
            <ArrowLeft size={20} />
          </Link>

          <div className="about-hero-content">
            <span className="section-label">Professional Profile</span>
            <h1 className="about-title">
              Behind the <span className="gradient-cyan-blue">Terminal</span>
            </h1>
          </div>
        </div>

        <p className="about-subtitle">
          A dedicated software development journey bridging rigorous academic foundations at Gurugram University (MCA) and Maharshi Dayanand University (BCA) with over 3 years of active, hands-on freelance experience. Passionate about architecting scalable systems, building clean user interfaces, and optimizing application performance, I have successfully shipped over 50+ web and mobile solutions to clients globally.
        </p>
      </motion.header>

      <motion.main
        variants={isMobile ? undefined : containerVariants}
        initial={isMobile ? undefined : "hidden"}
        animate={isMobile ? undefined : "visible"}
        className="container about-main-grid"
      >
        {/* Timeline Column */}
        <motion.section variants={itemVariants} className="about-section timeline-section">
          <h2 className="about-section-heading">Interactive Timeline</h2>
          <div className="timeline-container">
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-badge" style={{ background: item.color }}>
                  {item.icon}
                </div>
                <div className="timeline-content glass-card">
                  <div className="timeline-header">
                    <span className="timeline-year" style={{ color: item.color }}>{item.year}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <small className="timeline-inst">{item.institution}</small>
                  </div>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Setup & Collaboration Columns */}
        <div className="about-right-col">
          {/* Setup section */}
          <motion.section variants={itemVariants} className="about-section glass-card setup-card">
            <h2 className="sidebar-heading">
              <Cpu size={18} /> My Developer Setup
            </h2>
            
            <div className="setup-tabs">
              <div className="setup-group">
                <h3 className="setup-group-title"><Laptop size={14} /> Hardware Spec</h3>
                <div className="setup-list">
                  {setupData.hardware.map((spec, i) => (
                    <div key={i} className="setup-item">
                      <span className="setup-label">{spec.label}</span>
                      <strong className="setup-val">{spec.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="setup-group" style={{ marginTop: "24px" }}>
                <h3 className="setup-group-title"><Terminal size={14} /> Software Env</h3>
                <div className="setup-list">
                  {setupData.software.map((spec, i) => (
                    <div key={i} className="setup-item">
                      <span className="setup-label">{spec.label}</span>
                      <strong className="setup-val">{spec.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Workflow Section */}
          <motion.section variants={itemVariants} className="about-section workflow-section">
            <h2 className="about-section-heading" style={{ fontSize: "20px", marginBottom: "16px" }}>Collaboration Workflow</h2>
            <div className="workflow-steps-list">
              {workflowSteps.map((step, idx) => (
                <div key={idx} className="workflow-step-card glass-card">
                  <div className="workflow-step-num">{step.step}</div>
                  <div className="workflow-step-body">
                    <h4 className="workflow-step-title">{step.title}</h4>
                    <p className="workflow-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Core Values / Call to Action */}
          <motion.section variants={itemVariants} className="about-section glass-card cta-sidebar-card">
            <h3 className="sidebar-heading" style={{ border: "none", padding: 0, marginBottom: "8px" }}>
              <Heart size={18} className="text-cyan" /> Ready to Build?
            </h3>
            <p className="cta-sidebar-desc">
              I collaborate with businesses and agencies worldwide to construct performance-first digital assets. Let's discuss your roadmap.
            </p>
            <Link href="/#contact" className="sidebar-cta-btn" data-hover>
              Get in Touch <Send size={14} style={{ marginLeft: "6px" }} />
            </Link>
          </motion.section>
        </div>
      </motion.main>

      {/* Styled JSX */}
      <style>{`
        .about-page {
          min-height: 100vh;
          background: #030014;
          color: #f8fafc;
          padding: 120px 0 120px;
          position: relative;
          overflow-x: hidden;
        }

        .about-header {
          margin-bottom: 48px;
        }

        .back-btn-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          margin-bottom: 24px;
          text-decoration: none;
        }

        .back-btn-logo:hover {
          background: rgba(0, 242, 254, 0.08);
          border-color: rgba(0, 242, 254, 0.3);
          color: var(--accent-cyan);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.15);
          transform: translateX(-3px);
        }

        .header-title-row {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .header-title-row .back-btn-logo {
          margin-bottom: 0;
          flex-shrink: 0;
        }

        .header-title-row .about-hero-content {
          margin-top: 0;
        }

        .about-hero-content {
          margin-top: 16px;
        }

        .about-title {
          font-size: clamp(36px, 5vw, 54px);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 8px;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .about-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 800px;
        }

        .about-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }

        @media (min-width: 1024px) {
          .about-main-grid {
            grid-template-columns: 7fr 5fr;
          }
        }

        .about-section-heading {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 32px;
          position: relative;
          padding-left: 14px;
          color: var(--text-white);
        }

        .about-section-heading::before {
          content: "";
          position: absolute;
          left: 0;
          top: 4px;
          bottom: 4px;
          width: 4px;
          background: var(--accent-cyan);
          border-radius: 4px;
        }

        /* Timeline Styles */
        .timeline-container {
          position: relative;
          padding-left: 20px;
          border-left: 1.5px dashed rgba(255, 255, 255, 0.1);
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .timeline-item {
          position: relative;
        }

        .timeline-badge {
          position: absolute;
          left: -40px;
          top: 12px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #030014;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
        }

        .timeline-content {
          padding: 24px;
          transition: all 0.3s ease;
        }

        .timeline-content:hover {
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(0, 242, 254, 0.05);
          transform: translateX(4px);
        }

        .timeline-header {
          margin-bottom: 12px;
        }

        .timeline-year {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 700;
          display: block;
          margin-bottom: 4px;
        }

        .timeline-title {
          font-size: 19px;
          font-weight: 700;
          color: var(--text-white);
        }

        .timeline-inst {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .timeline-desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Right column */
        .about-right-col {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .sidebar-heading {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--text-white);
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 12px;
        }

        .setup-card {
          padding: 24px;
        }

        .setup-group-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .setup-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .setup-item {
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          padding-bottom: 6px;
        }

        .setup-label {
          font-size: 11px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .setup-val {
          font-size: 13.5px;
          color: var(--text-white);
          margin-top: 2px;
        }

        /* Workflow Steps */
        .workflow-steps-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .workflow-step-card {
          display: flex;
          gap: 20px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .workflow-step-card:hover {
          border-color: rgba(0, 242, 254, 0.15);
          box-shadow: 0 4px 20px rgba(0, 242, 254, 0.05);
          transform: translateY(-2px);
        }

        .workflow-step-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 28px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.05);
          line-height: 1;
        }

        .workflow-step-card:hover .workflow-step-num {
          color: var(--accent-cyan);
        }

        .workflow-step-body {
          flex: 1;
        }

        .workflow-step-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 6px;
        }

        .workflow-step-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .cta-sidebar-card {
          padding: 24px;
          background: linear-gradient(135deg, rgba(0, 242, 254, 0.03) 0%, rgba(3, 0, 20, 0.95) 100%);
          border-color: rgba(0, 242, 254, 0.15);
        }

        .cta-sidebar-desc {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .sidebar-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background: linear-gradient(135deg, var(--violet) 0%, var(--blue) 100%);
          color: var(--white);
          font-size: 14.5px;
          font-weight: 700;
          text-decoration: none;
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.2);
          transition: all 0.2s ease;
        }

        .sidebar-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.35);
        }

        .sidebar-cta-btn:focus,
        .sidebar-cta-btn:active {
          outline: none !important;
          background: linear-gradient(135deg, var(--violet) 0%, var(--blue) 100%) !important;
          color: var(--white) !important;
        }

        .gradient-cyan-blue {
          background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
