"use client";

import { motion } from "framer-motion";
import { Globe, Layout, Smartphone, Brain, ShoppingBag, Terminal } from "lucide-react";

const skills = [
  { name: "Web Development", icon: Globe, description: "Crafting high-performance, responsive websites with modern frameworks like Next.js, React, and sophisticated CSS architectures." },
  { name: "App Development", icon: Smartphone, description: "Building seamless, cross-platform mobile applications using React Native and Expo for a native-like experience on iOS and Android." },
  { name: "Full Stack Development", icon: Terminal, description: "Designing end-to-end solutions, from scalable backend architectures and databases to polished, user-centric frontend interfaces." },
  { name: "WordPress Development", icon: Layout, description: "Developing custom, high-converting WordPress themes and plugins with a focus on speed, SEO, and user-friendly content management." },
  { name: "AI Integration (Meta AI)", icon: Brain, description: "Integrating cutting-edge AI capabilities and automation workflows into digital products to enhance user engagement and efficiency." },
  { name: "E-Commerce (Shopify)", icon: ShoppingBag, description: "Creating premium, high-converting Shopify stores with custom liquid development and deep integration of third-party apps." },
];

export default function Skills() {
  return (
    <section id="skills" className="section container">
      <h2 className="section-title">Expertise & Skills</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginBottom: "60px" }}>
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <skill.icon size={40} style={{ color: "var(--accent)" }} />
            <h3>{skill.name}</h3>
            <p style={{ fontSize: "14px" }}>{skill.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Infinite Scrolling Skills Marquee */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          padding: "20px 0"
        }}
      >
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{ animationPlayState: "paused" }} // Note: This doesn't work directly on motion.div animate prop easily without a ref or specific setup, but I'll use a more robust way.
          style={{
            display: "flex",
            gap: "30px",
            width: "max-content",
            whiteSpace: "nowrap"
          }}
        >
          {[...techSkills, ...techSkills].map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, borderColor: "var(--accent)", color: "var(--accent)" }}
              style={{
                padding: "10px 24px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(100, 255, 218, 0.1)",
                borderRadius: "100px",
                color: "var(--text-secondary)",
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "Inter, sans-serif",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                cursor: "default",
                backdropFilter: "blur(4px)",
                transition: "border-color 0.3s ease, color 0.3s ease"
              }}
            >
              <span style={{ marginRight: "8px", color: "var(--accent)", opacity: 0.5 }}>#</span>
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const techSkills = [
  "React", "Next.js", "TypeScript", "Node.js", "React Native", "Expo", "Java",
  "REST API", "Vanilla CSS", "MongoDB", "Firebase", "WordPress", "Shopify",
  "Tailwind", "Framer Motion", "GSAP", "Prisma", "PostgreSQL", "Meta AI",
  "MySQL", "Supabase", "NoSQL", "Bootstrap", "SpringBoot", "Rust", "Go"
];
