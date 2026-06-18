"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Terminal, Cpu, Award, Zap } from "lucide-react";

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="about" className="section container">
      <h2 className="section-title">
        <span className="gradient-text-cyan">About Me</span>
      </h2>
      
      <div className="about-grid">
        {/* Left Column - Cyber System Matrix card */}
        <motion.div 
          initial={isMobile ? undefined : { opacity: 0, x: -30 }}
          whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
          viewport={isMobile ? undefined : { once: true }}
          transition={{ duration: 0.6 }}
          className="about-image-wrapper"
        >
          <div className="glass-card" style={{ padding: "30px", border: "1px solid rgba(6, 182, 212, 0.15)", background: "rgba(9, 13, 22, 0.7)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <Terminal size={18} style={{ color: "var(--accent-cyan)" }} />
              <span style={{ fontSize: "12px", fontFamily: "'Fira Code', monospace", fontWeight: 600, color: "var(--text-white)" }}>
                SYSTEM_METRICS.sh
              </span>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Cpu size={16} style={{ color: "var(--accent-cyan)" }} />
                <div>
                  <p style={{ fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase" }}>Specialization</p>
                  <p style={{ fontSize: "14px", color: "var(--text-white)", fontWeight: 600 }}>Web / App Solutions</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Award size={16} style={{ color: "var(--accent-purple)" }} />
                <div>
                  <p style={{ fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase" }}>Experience</p>
                  <p style={{ fontSize: "14px", color: "var(--text-white)", fontWeight: 600 }}>{PORTFOLIO_DATA.personal.experienceYears}+ Years Commercial</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Zap size={16} style={{ color: "#10b981" }} />
                <div>
                  <p style={{ fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase" }}>Deployments</p>
                  <p style={{ fontSize: "14px", color: "var(--text-white)", fontWeight: 600 }}>{PORTFOLIO_DATA.personal.deployedCount}+ Digital Products</p>
                </div>
              </div>
            </div>

            {/* Micro-terminal styling */}
            <div style={{ 
              marginTop: "25px", 
              padding: "12px", 
              background: "rgba(0, 0, 0, 0.3)", 
              borderRadius: "8px", 
              border: "1px solid rgba(255,255,255,0.05)",
              fontFamily: "'Fira Code', monospace",
              fontSize: "11px",
              color: "#6b7280"
            }}>
              <p style={{ color: "#a855f7" }}><span style={{ color: "var(--accent-cyan)" }}>$</span> npm run load</p>
              <p style={{ color: "#10b981" }}>✔ ayush_profile loaded</p>
              <p style={{ color: "#eab308" }}>✔ core_stack compiled</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Narrative Bio */}
        <motion.div 
          initial={isMobile ? undefined : { opacity: 0, x: 30 }}
          whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
          viewport={isMobile ? undefined : { once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="about-text-content"
        >
          <p style={{ marginBottom: "18px", fontSize: "16px", lineHeight: "1.7", color: "var(--text-primary)" }}>
            Hello! My name is <strong style={{ color: "var(--text-white)" }}>{PORTFOLIO_DATA.personal.name}</strong> and I enjoy building digital creations that solve real-world problems. With over <strong style={{ color: "var(--accent-cyan)" }}>{PORTFOLIO_DATA.personal.experienceYears} years of freelance experience</strong>, I have deployed over <strong style={{ color: "var(--accent-cyan)" }}>{PORTFOLIO_DATA.personal.deployedCount}+ responsive websites and native mobile apps</strong> globally.
          </p>
          <p style={{ marginBottom: "18px", fontSize: "15px", lineHeight: "1.7" }}>
            {PORTFOLIO_DATA.personal.bioDetail}
          </p>
          <p style={{ marginBottom: "25px", fontSize: "15px", fontWeight: "600", color: "var(--text-white)", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", animation: "pulse 1.5s infinite alternate" }} />
            {PORTFOLIO_DATA.personal.jobSearchStatus}
          </p>
          
          <p style={{ fontSize: "14px", fontFamily: "'Fira Code', monospace", color: "var(--text-white)", marginBottom: "15px" }}>
            // Technologies I rely on daily:
          </p>
          
          <ul className="about-skills-list">
            {PORTFOLIO_DATA.skills.recent.map(skill => (
              <motion.li 
                whileHover={isMobile ? undefined : { x: 5, color: "var(--accent-cyan)" }}
                key={skill} 
                className="about-skill-item"
              >
                <span className="about-skill-bullet">▹</span>
                {skill}
              </motion.li>
            ))}
          </ul>

          <p className="about-disclaimer">
            Disclaimer: The engineering files and case studies featured in the projects section represent active design architectures with source code available on GitHub. In accordance with strict NDA and customer privacy guidelines, private production repositories are not presented in this public catalog.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
