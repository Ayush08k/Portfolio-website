"use client";

import { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import PricingEstimator, { EstimatorData } from "@/components/PricingEstimator";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Calculator, Sparkles, HelpCircle } from "lucide-react";

export default function EstimatorPage() {
  const [estimatorData, setEstimatorData] = useState<EstimatorData>({
    hasEstimate: false,
    projectType: "",
    screens: 0,
    addOns: "",
    budget: "",
    timeline: "",
  });

  const handleProceedEstimate = (data: EstimatorData) => {
    setEstimatorData(data);
    
    // Smooth scroll down to contact form
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <>
      {/* Page Wrapper */}
      <div className="estimator-page-wrapper" style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: "120px" }}>
        
        {/* Background Cyber Orbs */}
        <div className="case-orb orb orb-1" style={{ top: "10%", left: "15%", opacity: 0.15 }} />
        <div className="case-orb orb orb-2" style={{ top: "40%", right: "10%", opacity: 0.12 }} />
        <div className="case-orb orb orb-3" style={{ bottom: "20%", left: "25%", opacity: 0.1 }} />

        {/* Dynamic Page Intro Header */}
        <header className="container" style={{ marginBottom: "60px", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "100px",
              background: "rgba(124, 58, 237, 0.06)",
              border: "1px solid rgba(124, 58, 237, 0.15)",
              marginBottom: "20px"
            }}
          >
            <Sparkles size={14} style={{ color: "var(--accent-purple)" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--accent-purple)", fontFamily: "'Fira Code', monospace", letterSpacing: "0.05em" }}>
              INTERACTIVE TOOLBOX
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: "clamp(38px, 6vw, 68px)",
              color: "var(--text-white)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: "800px",
              margin: "0 auto 20px"
            }}
          >
            Project Cost & <span className="gradient-text">Timeline Estimator</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "var(--text-secondary)",
              lineHeight: "1.7",
              maxWidth: "600px",
              margin: "0 auto"
            }}
          >
            Select your platform, customize subpages count, choose advanced feature integrations, and receive an automated budget and timeline scope instantly.
          </motion.p>
        </header>

        {/* Pricing Estimator Core Component */}
        <main className="container" id="main-content" role="main" style={{ marginBottom: "80px" }}>
          <PricingEstimator onProceed={handleProceedEstimate} />

          {/* FAQ Accordion Section for pricing */}
          <section className="glass-card" style={{ padding: "40px", borderRadius: "24px", marginTop: "80px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" }}>
              <HelpCircle size={24} style={{ color: "var(--accent-cyan)" }} />
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-white)" }}>Pricing & Scope FAQ</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h3 style={{ fontSize: "16px", color: "var(--text-white)", fontWeight: 600, marginBottom: "8px" }}>How accurate are these estimate values?</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Our estimates represent historical project averages for standard design complexity and core features. We use fixed-cost milestone bidding after scoping. Special customized additions can raise or lower the final budget.
                </p>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px" }}>
                <h3 style={{ fontSize: "16px", color: "var(--text-white)", fontWeight: 600, marginBottom: "8px" }}>Are localized rates available for startups & Indian clients?</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Yes! We understand the constraints of regional bootstrapping. If you are an early-stage startup or local Indian business, let's schedule a kickoff call to structure a customized proposal matching your target budget.
                </p>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px" }}>
                <h3 style={{ fontSize: "16px", color: "var(--text-white)", fontWeight: 600, marginBottom: "8px" }}>How are payment schedules divided?</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Payments are typically structured across three key project phases: a 30% kickoff deposit, 40% halfway milestone approval (upon design/backend architecture deployment), and 30% final sign-off transfer.
                </p>
              </div>
            </div>
          </section>

          {/* Standalone Lead Form Section */}
          <AnimatePresence>
            {estimatorData.hasEstimate && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                style={{ marginTop: "100px" }}
              >
                <div style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "rgba(16, 185, 129, 0.05)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  maxWidth: "680px",
                  margin: "0 auto 40px",
                  textAlign: "center"
                }}>
                  <p style={{ color: "#10b981", fontSize: "14.5px", fontWeight: 600, margin: 0 }}>
                    ✔ Project Scope Saved! Fill in your contact info below to book your kickoff consultation.
                  </p>
                </div>

                <Contact estimatorData={estimatorData} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </>
  );
}
