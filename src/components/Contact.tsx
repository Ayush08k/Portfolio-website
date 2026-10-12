"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { EstimatorData } from "@/components/PricingEstimator";

export interface ContactProps {
  estimatorData?: EstimatorData;
  setEstimatorData?: React.Dispatch<React.SetStateAction<EstimatorData>>;
}

export default function Contact({ estimatorData, setEstimatorData }: ContactProps = {}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleClearEstimate = () => {
    setIsEditing(false);
    if (setEstimatorData) {
      setEstimatorData({
        hasEstimate: false,
        projectType: "",
        screens: 0,
        addOns: "",
        budget: "",
        timeline: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        e.currentTarget.reset();
        setMessage("");
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-wrap">
          <div className="reveal">
            <p className="section-label" style={{ textAlign: "center" }}>Let's Talk</p>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.7", textAlign: "center", marginTop: "16px" }}>
              Ready to build something extraordinary? I'm open to freelance contracts and full-time opportunities. Drop a message — I reply within a few hours.
            </p>
          </div>
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card"
              style={{
                border: "1px solid rgba(16, 185, 129, 0.3)",
                background: "rgba(9, 13, 22, 0.8)",
                padding: "40px",
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
            <form className="contact-form card-glow reveal" style={{ transitionDelay: "0.1s" }} onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label>YOUR NAME</label>
                  <input name="name" type="text" required placeholder="Your Name" className="input" />
                </div>
                <div>
                  <label>YOUR EMAIL</label>
                  <input name="email" type="email" required placeholder="your@email.com" className="input" />
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label>YOUR COUNTRY</label>
                  <input name="country" type="text" required placeholder="Country" className="input" />
                </div>
                <div>
                  <label>BEST TIME TO CONTACT</label>
                  <input name="bestTime" type="text" required placeholder="Evening (5‑8 PM)" className="input" />
                </div>
              </div>
              <input name="whatsapp" type="tel" required placeholder="WhatsApp Number" className="input" />
              <textarea
                name="message"
                placeholder="Describe your project, budget, and timeline..."
                rows={5}
                required
                className="textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="btn-primary btn-glow" disabled={status === "loading"} style={{ alignSelf: "center", marginTop: "20px", padding: "1rem 2.5rem", gap: "8px" }}>
                {status === "loading" ? "Sending..." : "Say Hello"} <Send size={15} />
              </button>
              {status === "error" && (
                <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "15px" }}>Network error occurred. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
