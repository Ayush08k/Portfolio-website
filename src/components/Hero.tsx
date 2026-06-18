"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowRight, Code2, Cpu, Smartphone } from "lucide-react";

const roles = [
  "Full Stack Web Developer",
  "iOS & Android App Developer",
  "Hiring Agent Copilot Integrator"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-container">
      <div className="hero-grid">
        <div className="hero-text-content">
          {/* Status Badge */}
          <motion.div
            initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "100px",
              background: "rgba(6, 182, 212, 0.06)",
              border: "1px solid rgba(6, 182, 212, 0.15)",
              marginBottom: "24px",
            }}
          >
            <span style={{ 
              width: "6px", 
              height: "6px", 
              borderRadius: "50%", 
              backgroundColor: "var(--accent-cyan)",
              boxShadow: "0 0 8px var(--accent-cyan)",
              display: "inline-block"
            }} />
            <span style={{ 
              fontSize: "12px", 
              fontWeight: 600, 
              color: "var(--accent-cyan)", 
              fontFamily: "'Fira Code', monospace" 
            }}>
              AVAILABLE FOR HIRE
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            style={{ 
              color: "var(--text-secondary)", 
              fontFamily: "'Fira Code', monospace", 
              fontSize: "14px", 
              marginBottom: "16px",
              letterSpacing: "0.05em"
            }}
          >
            ~ hello_world
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              color: "var(--text-white)",
              lineHeight: 1.1,
              marginBottom: "15px",
              fontWeight: 800,
              letterSpacing: "-0.03em"
            }}
          >
            I am <span className="gradient-text">Ayush Kumar</span>
          </motion.h1>

          {/* Dynamic Role Switcher */}
          <div style={{ height: "clamp(30px, 5vw, 60px)", overflow: "hidden", marginBottom: "35px" }}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={roles[roleIndex]}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={isMobile ? { opacity: 0, y: 0 } : { opacity: 0, y: -25 }}
                transition={isMobile ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: "clamp(20px, 4vw, 36px)",
                  color: "var(--text-primary)",
                  lineHeight: 1.2,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.02em"
                }}
              >
                Specialized in <span style={{ color: "var(--accent-cyan)" }}>{roles[roleIndex]}</span>
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Short Intro Bio */}
          <motion.p
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
            style={{
              maxWidth: "560px",
              color: "var(--text-secondary)",
              fontSize: "clamp(15px, 2vw, 17px)",
              lineHeight: "1.7",
              marginBottom: "45px"
            }}
          >
            I build responsive, high-performance, and beautifully interactive digital architectures that scale. Combining modern web frameworks with native app environments to deliver absolute quality.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
            style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}
          >
            <a href="#projects" className="btn-primary">
              Explore Projects
              <ArrowRight size={16} style={{ marginLeft: "8px" }} />
            </a>
            <a href="#contact" className="btn-secondary">
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Cyber Holographic Avatar / Profile Display */}
        <motion.div
          initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
          className="hero-image-wrapper"
        >
          <div className="hero-dashed-ring">
            <div className="hero-profile-pic"></div>
          </div>
          
          {/* Glass floating 3D elements */}
          <motion.div
            animate={isMobile ? { y: 0 } : { y: [0, -10, 0] }}
            transition={isMobile ? { duration: 0 } : { repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="floating-tag tag-top-right floating-tag-cyan"
          >
            <Smartphone size={15} style={{ color: "var(--accent-cyan)" }} />
            <span>Mobile Expert</span>
            <span className="floating-tag-dot" />
          </motion.div>

          <motion.div
            animate={isMobile ? { y: 0 } : { y: [0, 12, 0] }}
            transition={isMobile ? { duration: 0 } : { repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="floating-tag tag-bottom-left floating-tag-purple"
          >
            <Terminal size={15} style={{ color: "var(--accent-purple)" }} />
            <span>Full Stack Pro</span>
            <span className="floating-tag-dot" />
          </motion.div>

          <motion.div
            animate={isMobile ? { scale: 1 } : { scale: [1, 1.05, 1] }}
            transition={isMobile ? { duration: 0 } : { repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="floating-tag tag-middle-right"
          >
            <Cpu size={15} style={{ color: "#10b981" }} />
            <span style={{ color: "#10b981" }}>Active Coding</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
