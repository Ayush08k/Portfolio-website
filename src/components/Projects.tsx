"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, ExternalLink, FolderGit2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const projects = PORTFOLIO_DATA.projects;

export default function Projects() {
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
    <section id="projects" className="section container">
      <h2 className="section-title">
        <span className="gradient-text-cyan">Featured Projects</span>
      </h2>

      <div className="projects-list-container">
        {projects.map((project, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={project.title}
              initial={isMobile ? undefined : { opacity: 0, y: 60 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={isMobile ? undefined : { once: true, margin: "-100px" }}
              transition={isMobile ? undefined : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={isEven ? "project-row" : "project-row reversed"}
            >
              {/* Project Content */}
              <div className="project-content">
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <FolderGit2 size={15} style={{ color: "var(--accent-cyan)" }} />
                  <p className="project-overline">FEATURED CASE STUDY</p>
                </div>
                
                <h3 className="project-title" style={{ whiteSpace: "pre-line", color: "var(--text-white)" }}>
                  {project.title}
                </h3>
                
                {/* Glassmorphic Project Card Description */}
                <div className="glass-card project-card-desc">
                  <p style={{ fontSize: "14.5px", lineHeight: "1.7", color: "var(--text-primary)" }}>
                    {project.description}
                  </p>
                </div>
                
                {/* Tech Pills */}
                <ul className="project-tech-list">
                  {project.tech.map(t => (
                    <li key={t} className="project-tech-item">
                      {t}
                    </li>
                  ))}
                </ul>
                
                {/* Interactive Action Links */}
                <div className="project-links">
                  {project.github && project.github !== "#" && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link-icon"
                      aria-label="View Github Repository"
                    >
                      <Code size={18} />
                    </a>
                  )}
                  {project.link && project.link !== "#" && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link-icon"
                      aria-label="Visit Live Demo Url"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Visual Canvas Overlay */}
              <motion.div 
                whileHover={isMobile ? undefined : { scale: 1.01 }}
                className="project-image-wrapper"
              >
                <div 
                  className="project-image-bg" 
                  style={{ 
                    backgroundImage: `url("${encodeURI(project.image)}")`,
                    backgroundPosition: "center"
                  }}
                ></div>
                <div className="project-image-overlay"></div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
