"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section container" style={{ textAlign: "center", maxWidth: "600px" }}>
      <p style={{ color: "var(--accent)", fontFamily: "monospace", marginBottom: "20px" }}>What’s Next?</p>
      <h2 style={{ fontSize: "clamp(40px, 5vw, 60px)", marginBottom: "20px" }}>Get In Touch</h2>
      <p style={{ marginBottom: "50px" }}>
        Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
      </p>

      {status === "success" ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card">
          <h3 style={{ color: "var(--accent)" }}>Message Sent!</h3>
          <p>Thank you for reaching out. I'll get back to you soon.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", textAlign: "left" }}>
          <div className="contact-form-row">
            <input 
              name="name" 
              type="text" 
              placeholder="Name" 
              required 
              style={{ flex: 1, padding: "1rem", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--bg-tertiary)", color: "var(--text-white)", borderRadius: "4px" }}
            />
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              required 
              style={{ flex: 1, padding: "1rem", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--bg-tertiary)", color: "var(--text-white)", borderRadius: "4px" }}
            />
          </div>
          <div className="contact-form-row">
            <input 
              name="location" 
              type="text" 
              placeholder="Where are you from?" 
              style={{ flex: 1, padding: "1rem", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--bg-tertiary)", color: "var(--text-white)", borderRadius: "4px" }}
            />
            <input 
              name="bestTime" 
              type="text" 
              placeholder="Best time to contact?" 
              style={{ flex: 1, padding: "1rem", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--bg-tertiary)", color: "var(--text-white)", borderRadius: "4px" }}
            />
          </div>
          <textarea 
            name="message" 
            placeholder="Your Message" 
            rows={5} 
            required 
            style={{ padding: "1rem", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--bg-tertiary)", color: "var(--text-white)", borderRadius: "4px", resize: "none" }}
          ></textarea>
          <button 
            type="submit" 
            disabled={status === "loading"}
            className="btn-primary" 
            style={{ alignSelf: "center", marginTop: "20px" }}
          >
            {status === "loading" ? "Sending..." : "Say Hello"}
          </button>
          {status === "error" && <p style={{ color: "#ff4d4d", textAlign: "center" }}>Something went wrong. Please try again.</p>}
        </form>
      )}
    </section>
  );
}
