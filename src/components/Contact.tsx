"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export interface EstimatorData {
  hasEstimate: boolean;
  projectType: string;
  screens: number;
  addOns: string;
  budget: string;
  timeline: string;
}

interface ContactProps {
  estimatorData?: EstimatorData;
}

export default function Contact({ estimatorData }: ContactProps = {}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const defaultMessage = estimatorData?.hasEstimate
    ? `Hey Ayush, I just estimated a project using your calculator! Here is the scope I designed:\n\n` +
      `- Base Platform: ${estimatorData.projectType}\n` +
      `- Screens/Pages: ${estimatorData.screens}\n` +
      `- Custom Add-Ons: ${estimatorData.addOns}\n` +
      `- Est. Price Range: ${estimatorData.budget}\n` +
      `- Est. Timeline: ${estimatorData.timeline}\n\n` +
      `Let's discuss this project!`
    : "";

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
    <section id="contact" className="section container" style={{ textAlign: "center", maxWidth: "680px" }}>
      <p style={{
        color: "var(--accent-cyan)",
        fontFamily: "'Fira Code', monospace",
        fontSize: "14px",
        marginBottom: "16px",
        letterSpacing: "0.05em"
      }}>
        ~ contact_me
      </p>

      <h2 style={{
        fontSize: "clamp(36px, 5vw, 56px)",
        marginBottom: "20px",
        fontWeight: 800,
        letterSpacing: "-0.03em"
      }}>
        Get In Touch
      </h2>

      <p style={{
        marginBottom: "45px",
        color: "var(--text-secondary)",
        fontSize: "16px",
        lineHeight: "1.7"
      }}>
        Ready to take your digital product to the next level? Drop your project specs below. My inbox is always active for select high-end freelance opportunities and team roles. Let's build something brilliant together!
      </p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card"
          style={{
            border: "1px solid rgba(16, 185, 129, 0.3)",
            background: "rgba(9, 13, 22, 0.8)",
            padding: "40px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px", color: "#10b981" }}>
            <CheckCircle2 size={44} />
          </div>
          <h3 style={{ color: "#10b981", fontSize: "20px", marginBottom: "10px" }}>Message Transmitted!</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "14.5px" }}>
            Thank you for reaching out. Ayush's mail server has successfully queued your message. You will receive a direct reply within a few hours.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", textAlign: "left" }}>
          <div className="contact-form-row">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              required
              className="contact-input"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email Address"
              required
              className="contact-input"
            />
          </div>
          <div className="contact-form-row">
            <input 
              name="country" 
              type="text" 
              placeholder="Your Country" 
              required 
              className="contact-input"
            />
            <input 
              name="bestTime" 
              type="text" 
              placeholder="Best Time to Contact" 
              required 
              className="contact-input"
            />
          </div>
          <input 
            name="whatsapp" 
            type="tel" 
            placeholder="WhatsApp Number" 
            required 
            className="contact-input"
          />
          <textarea
            name="message"
            placeholder="Outline your project goals, timelines, and budget..."
            rows={5}
            required
            className="contact-input contact-textarea"
            defaultValue={defaultMessage}
          ></textarea>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary"
            style={{
              alignSelf: "center",
              marginTop: "20px",
              padding: "1rem 2.5rem",
              gap: "8px"
            }}
          >
            {status === "loading" ? (
              "Transmitting..."
            ) : (
              <>
                Say Hello
                <Send size={15} />
              </>
            )}
          </button>

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                color: "#f87171",
                fontSize: "14px",
                marginTop: "15px",
                width: "100%"
              }}
            >
              <AlertCircle size={16} />
              <span>Network error occurred. Please try again or reach out directly.</span>
            </motion.div>
          )}
        </form>
      )}
    </section>
  );
}
