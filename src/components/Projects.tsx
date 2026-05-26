"use client";

import { motion } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const projects = PORTFOLIO_DATA.projects;

export default function Projects() {
  return (
    <section id="projects" className="section container">
      <h2 className="section-title">Featured Work</h2>

      <div className="projects-list-container">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={i % 2 === 0 ? "project-row" : "project-row reversed"}
          >
            {/* Project Content */}
            <div className="project-content">
              <p className="project-overline">Featured Project</p>
              <h3 className="project-title">{project.title}</h3>
              
              <div className="glass-card project-card-desc">
                <p style={{ fontSize: "14px", lineHeight: "1.6" }}>{project.description}</p>
              </div>
              
              <ul className="project-tech-list">
                {project.tech.map(t => (
                  <li key={t} className="project-tech-item">{t}</li>
                ))}
              </ul>
              
              <div className="project-links">
                {project.github && project.github !== "#" && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-icon">
                    <Code size={20} />
                  </a>
                )}
                {project.link && project.link !== "#" && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-icon">
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div className="project-image-wrapper">
              <div 
                className="project-image-bg" 
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>
              <div className="project-image-overlay"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
