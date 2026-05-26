"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section container">
      <h2 className="section-title">About Me</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "50px", alignItems: "start" }}>
        <motion.div 
          whileHover={{ x: 5, y: -5 }}
          style={{ position: "relative", maxWidth: "300px" }}
        >
          <div style={{ 
            position: "relative", 
            width: "100%", 
            aspectRatio: "1", 
            borderRadius: "4px",
            backgroundColor: "var(--accent)",
            zIndex: 1
          }}>
            <div style={{ 
              width: "100%", 
              height: "100%", 
              borderRadius: "4px", 
              backgroundColor: "var(--bg-secondary)",
              backgroundImage: `url('/ayush_profile_placeholder.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "multiply",
              filter: "grayscale(100%) contrast(1)",
              transition: "var(--transition)"
            }}></div>
          </div>
          <div style={{ 
            position: "absolute", 
            top: "20px", 
            left: "-20px", 
            width: "100%", 
            height: "100%", 
            border: "2px solid var(--accent)", 
            borderRadius: "4px",
            zIndex: 0,
            transition: "var(--transition)"
          }}></div>
        </motion.div>

        <div>
          <p style={{ marginBottom: "15px" }}>
            Hello! My name is Ayush and I enjoy creating things that live on the internet. I have been <strong style={{ color: "var(--accent)" }}>freelancing for over 3 years</strong>, during which I have successfully <strong style={{ color: "var(--accent)" }}>deployed 50+ websites and mobile applications</strong> for a diverse range of clients.
          </p>
          <p style={{ marginBottom: "15px" }}>
            My interest in development started back in 2018. My main focus these days is building high-end, high-performance digital experiences that scale.
          </p>
          <p style={{ marginBottom: "15px", fontWeight: "600", color: "var(--text-white)" }}>
            I am currently <span style={{ color: "var(--accent)" }}>seeking a full-time opportunity</span> where I can contribute my skills to an innovative team.
          </p>
          <p>Here are a few technologies I’ve been working with recently:</p>
          <ul style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(100px, 150px))", gap: "0 10px", padding: "0", margin: "20px 0 0 0", listStyle: "none" }}>
            {["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Node.js", "React Native", "Expo", "Java", "REST API", "Vanilla CSS", "MongoDB", "Firebase", "WordPress"].map(skill => (
              <li key={skill} style={{ position: "relative", marginBottom: "10px", paddingLeft: "15px", fontSize: "13px", fontFamily: "monospace" }}>
                <span style={{ color: "var(--accent)", position: "absolute", left: "0" }}>▹</span>
                {skill}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "30px", fontSize: "14px", color: "var(--text-secondary)", fontStyle: "italic", borderLeft: "2px solid var(--accent)", paddingLeft: "15px" }}>
            Note: The projects shown in the following section are for demonstration purposes only, with source code available on GitHub. To respect the privacy and confidentiality of my clients, I do not display live commercial projects or private client source code here.
          </p>
        </div>
      </div>
    </section>
  );
}
