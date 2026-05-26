"use client";

import { motion } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";

const projects = [
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
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section container">
      <h2 className="section-title">Featured Work</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              alignItems: "center"
            }}
          >
            {/* Project Content */}
            <div style={{
              gridArea: "1 / 1 / -1 / 7",
              zIndex: 2,
              gridColumn: i % 2 === 0 ? "1 / 8" : "6 / -1",
              textAlign: i % 2 === 0 ? "left" : "right",
              pointerEvents: "none" // Allow clicks to pass through to the image underneath if needed
            }}>
              <p style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: "13px", marginBottom: "10px" }}>Featured Project</p>
              <h3 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", marginBottom: "20px", pointerEvents: "auto", lineHeight: "1.3", whiteSpace: "pre-line" }}>{project.title}</h3>
              <div className="glass-card" style={{
                padding: "25px",
                marginBottom: "20px",
                maxWidth: "550px",
                marginLeft: i % 2 === 0 ? "0" : "auto"
              }}>
                <p style={{ fontSize: "14px" }}>{project.description}</p>
              </div>
              <ul style={{
                display: "flex",
                gap: "15px",
                justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                flexWrap: "wrap",
                fontFamily: "monospace",
                fontSize: "13px",
                marginBottom: "20px"
              }}>
                {project.tech.map(t => (
                  <li key={t} style={{
                    flexBasis: t === "MongoDB" ? "100%" : "auto",
                    textAlign: i % 2 === 0 ? "left" : "right"
                  }}>{t}</li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "20px", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end", pointerEvents: "auto" }}>
                {project.github && project.github !== "#" && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-white)", transition: "var(--transition)" }}>
                    <Code size={20} />
                  </a>
                )}
                {project.link && project.link !== "#" && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-white)", transition: "var(--transition)" }}>
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div style={{
              gridArea: "1 / 6 / -1 / -1",
              height: "400px",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "4px",
              gridColumn: i % 2 === 0 ? "6 / -1" : "1 / 8",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(100, 255, 218, 0.1)"
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "left",
                opacity: 0.6,
                transition: "var(--transition)",
                filter: "grayscale(100%) contrast(1.2)"
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.filter = "grayscale(0%) contrast(1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.6";
                  e.currentTarget.style.filter = "grayscale(100%) contrast(1.2)";
                }}
              ></div>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "var(--accent)",
                opacity: 0.1,
                mixBlendMode: "screen",
                pointerEvents: "none"
              }}></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
