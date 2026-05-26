"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Mobile Application Developer",
  "Web Developer",
  "Full Stack Developer"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 10vw",
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.2fr) 400px",
        gap: "40px",
        alignItems: "center",
        width: "100%"
      }}>
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: "clamp(14px, 5vw, 16px)", marginBottom: "20px" }}
          >
            Hello,
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: "clamp(30px, 5vw, 50px)",
              color: "var(--text-white)",
              lineHeight: 1.1,
              marginBottom: "10px"
            }}
          >
            I am Ayush Kumar, a
          </motion.h1>

          <div style={{ height: "clamp(25px, 5vw, 55px)", overflow: "hidden", marginBottom: "30px" }}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  fontSize: "clamp(20px, 4vw, 38px)",
                  color: "var(--accent)",
                  lineHeight: 1,
                  whiteSpace: "nowrap"
                }}
              >
                {roles[roleIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              maxWidth: "540px",
              color: "var(--text-secondary)",
              fontSize: "18px",
              marginBottom: "50px"
            }}
          >
            I’m a versatile engineer specializing in App Development, Web Development, and Full Stack Development. I focus on building high-end, human-centered products that scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a href="#projects" className="btn-primary" style={{ fontSize: "16px", padding: "1.25rem 2rem" }}>
              Check out my work!
            </a>
          </motion.div>
        </div>

        {/* Hero Image Section - Fixed Size */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            position: "relative",
            width: "400px",
            height: "400px",
            aspectRatio: "1",
            justifySelf: "center",
            flexShrink: 0
          }}
        >
          <div style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px dashed var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "15px"
          }}>
            <div style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "var(--bg-secondary)",
              backgroundImage: `url('/ayush_profile_placeholder.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 0 50px rgba(100, 255, 218, 0.2)"
            }}></div>
          </div>
          {/* Decorative floating elements */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            style={{ position: "absolute", top: "10%", right: "0", background: "var(--bg-tertiary)", padding: "10px 20px", borderRadius: "20px", fontSize: "12px", border: "1px solid var(--accent)", zIndex: 10 }}
          >
            Mobile Expert
          </motion.div>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            style={{ position: "absolute", bottom: "15%", left: "-10%", background: "var(--bg-tertiary)", padding: "10px 20px", borderRadius: "20px", fontSize: "12px", border: "1px solid var(--accent)", zIndex: 10 }}
          >
            Full Stack Pro
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={{ position: "absolute", top: "50%", right: "-15%", background: "var(--accent)", color: "var(--bg-primary)", padding: "10px 20px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", zIndex: 10, boxShadow: "0 0 20px var(--accent)" }}
          >
            Open for Full-Time
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
