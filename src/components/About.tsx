"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="section container">
      <h2 className="section-title">About Me</h2>
      
      <div className="about-grid">
        <motion.div 
          whileHover={{ x: 5, y: -5 }}
          className="about-image-wrapper"
        >
          <div className="about-image-ring">
            <div className="about-profile-pic"></div>
          </div>
          <div className="about-image-border"></div>
        </motion.div>

        <div className="about-text-content">
          <p style={{ marginBottom: "15px" }}>
            Hello! My name is {PORTFOLIO_DATA.personal.name} and I enjoy creating things that live on the internet. I have been <strong style={{ color: "var(--accent)" }}>freelancing for over {PORTFOLIO_DATA.personal.experienceYears} years</strong>, during which I have successfully <strong style={{ color: "var(--accent)" }}>deployed {PORTFOLIO_DATA.personal.deployedCount}+ websites and mobile applications</strong> for a diverse range of clients.
          </p>
          <p style={{ marginBottom: "15px" }}>
            {PORTFOLIO_DATA.personal.bioDetail}
          </p>
          <p style={{ marginBottom: "15px", fontWeight: "600", color: "var(--text-white)" }}>
            {PORTFOLIO_DATA.personal.jobSearchStatus}
          </p>
          <p>Here are a few technologies I’ve been working with recently:</p>
          <ul className="about-skills-list">
            {PORTFOLIO_DATA.skills.recent.map(skill => (
              <li key={skill} className="about-skill-item">
                <span className="about-skill-bullet">▹</span>
                {skill}
              </li>
            ))}
          </ul>
          <p className="about-disclaimer">
            Note: The projects shown in the following section are for demonstration purposes only, with source code available on GitHub. To respect the privacy and confidentiality of my clients, I do not display live commercial projects or private client source code here.
          </p>
        </div>
      </div>
    </section>
  );
}
