"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Layout, Smartphone, Brain, ShoppingBag, Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const ICON_MAP: Record<string, any> = {
  "Web Development": Globe,
  "App Development": Smartphone,
  "Full Stack Development": Terminal,
  "WordPress Development": Layout,
  "AI Integration (Meta AI)": Brain,
  "E-Commerce (Shopify)": ShoppingBag,
};

const skills = PORTFOLIO_DATA.services.map(service => ({
  name: service.name,
  icon: ICON_MAP[service.name] || Globe,
  description: service.description
}));

const techSkills = PORTFOLIO_DATA.skills.marquee;

export default function Skills() {
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
    <section id="skills" className="section container">
      <h2 className="section-title">
        <span className="gradient-text-cyan">Expertise & Services</span>
      </h2>

      {/* Grid of core expertise services */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
        gap: "24px", 
        marginBottom: "80px" 
      }}>
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              initial={isMobile ? undefined : { opacity: 0, y: 30 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={isMobile ? undefined : { once: true }}
              transition={isMobile ? undefined : { duration: 0.5, delay: i * 0.08 }}
              className="glass-card"
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "1.2rem",
                border: "1px solid rgba(255, 255, 255, 0.05)"
              }}
            >
              {/* Icon Container with glowing background */}
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                background: "rgba(6, 182, 212, 0.05)",
                border: "1px solid rgba(6, 182, 212, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-cyan)",
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.05)"
              }}>
                <Icon size={26} />
              </div>
              
              <h3 style={{ fontSize: "19px", color: "var(--text-white)", fontWeight: 700 }}>
                {skill.name}
              </h3>
              
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                {skill.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Infinite Scrolling Skills Marquee Section */}
      <div style={{ 
        textAlign: "center", 
        marginBottom: "30px" 
      }}>
        <p style={{ 
          fontSize: "13px", 
          fontFamily: "'Fira Code', monospace", 
          color: "var(--text-secondary)",
          letterSpacing: "0.05em",
          marginBottom: "15px"
        }}>
          // FULL_TECH_STACK_INVENTORY
        </p>
      </div>

      <div
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          padding: "24px 0",
          background: "rgba(9, 13, 22, 0.3)",
          borderTop: "1px solid rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center"
        }}
      >
        {/* Style block for GPU accelerated marquee on mobile */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes mobileMarquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-33.333%, 0, 0); }
          }
          .mobile-marquee-animated {
            animation: mobileMarquee 45s linear infinite !important;
          }
        `}} />

        {/* Left & Right ambient fade elements */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100px",
          height: "100%",
          background: "linear-gradient(90deg, var(--bg-primary) 0%, transparent 100%)",
          zIndex: 10,
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100px",
          height: "100%",
          background: "linear-gradient(270deg, var(--bg-primary) 0%, transparent 100%)",
          zIndex: 10,
          pointerEvents: "none"
        }} />

        <motion.div
          animate={isMobile ? undefined : { x: [0, -2000] }}
          transition={isMobile ? undefined : {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear"
            }
          }}
          className={isMobile ? "mobile-marquee-animated" : ""}
          style={{
            display: "flex",
            gap: "24px",
            width: "max-content",
            whiteSpace: "nowrap"
          }}
        >
          {/* Duplicate the array to ensure seamless infinite looping */}
          {[...techSkills, ...techSkills, ...techSkills].map((skill, i) => (
            <div
              key={i}
              style={{
                padding: "10px 24px",
                background: "rgba(9, 13, 22, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "100px",
                color: "var(--text-primary)",
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "Inter, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "default",
                backdropFilter: "blur(8px)",
                transition: "all 0.3s ease"
              }}
            >
              <span style={{ color: "var(--accent-cyan)", opacity: 0.7, fontWeight: 600 }}>#</span>
              {skill}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
