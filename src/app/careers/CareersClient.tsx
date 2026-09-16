"use client";

import { useState } from "react";
import { 
  MapPin, 
  Clock, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  X, 
  FileText, 
  ArrowRight,
  BrainCircuit
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  ctcRange: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  featured?: boolean;
}

const JOB_OPENINGS: JobOpening[] = [
  {
    id: "ai-ml-developer",
    title: "AI / ML Engineer",
    department: "AI & Innovation",
    location: "Remote (Global / India)",
    type: "Full-Time",
    experience: "2–5 Years",
    ctcRange: "",
    featured: true,
    description: "We are seeking a high-caliber AI / ML Engineer to architect, fine-tune, and deploy cutting-edge Large Language Models (LLMs), RAG pipelines, and autonomous agent workflows across our client portfolio.",
    responsibilities: [
      "Design and implement scalable RAG (Retrieval-Augmented Generation) systems using LangChain, LlamaIndex, and Vector DBs (Pinecone, Qdrant).",
      "Fine-tune open-source models (Llama 3, Mistral, Qwen) using PyTorch, LoRA, and QLoRA for domain-specific production tasks.",
      "Integrate multimodal AI APIs (Google Gemini, OpenAI GPT-4o, Claude 3.5 Sonnet) into Next.js and Node.js microservices.",
      "Optimize inference latency and streaming performance on edge environments and cloud GPU clusters."
    ],
    requirements: [
      "Solid proficiency in Python, TypeScript/JavaScript, and REST/gRPC API design.",
      "Hands-on experience with PyTorch/TensorFlow, Hugging Face ecosystem, and Vector Databases.",
      "Demonstrated experience building production-grade LLM applications, RAG pipelines, or autonomous agent frameworks.",
      "Strong understanding of prompt engineering, function calling, structured output schemas, and token budget management."
    ],
    skills: ["Python", "PyTorch", "LLMs", "LangChain", "Vector DBs", "Next.js", "OpenAI / Gemini", "RAG"]
  }
];

export default function CareersClient() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    gender: "",
    role: "",
    experience: "",
    currentCtc: "",
    expectedCtc: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [submitError, setSubmitError] = useState("");

  const handleOpenApplyModal = (job: JobOpening) => {
    setSelectedJob(job);
    setFormData((prev) => ({ ...prev, role: job.title }));
    setIsModalOpen(true);
    setIsSubmitted(false);
    setResumeError("");
    setSubmitError("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setSubmitError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setResumeError("Only PDF files (.pdf) are allowed.");
        setResumeFile(null);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setResumeError("File size must be under 10MB.");
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
      setResumeError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      setResumeError("Uploading your resume (.pdf) is compulsory.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Convert resume file to Base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
      });
      reader.readAsDataURL(resumeFile);
      const resumeBase64 = await base64Promise;

      const payload = {
        ...formData,
        resumeFileName: resumeFile.name,
        resumeBase64: resumeBase64,
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.error || "Failed to submit application.");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        gender: "",
        role: "",
        experience: "",
        currentCtc: "",
        expectedCtc: "",
      });
      setResumeFile(null);
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError(err.message || "An error occurred while submitting your application. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="careers-page">
      {/* Background Orbs */}
      <div className="orb orb-1" style={{ top: "-10%", left: "15%", opacity: 0.15 }} />
      <div className="orb orb-2" style={{ top: "40%", right: "10%", opacity: 0.12 }} />

      <header className="careers-hero container">
        <span className="section-label" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <BrainCircuit size={16} className="text-cyan" /> Join Our High-Performance Team
        </span>
        <h1 className="careers-title">
          Build the Future of <span className="gradient-text">AI & Software Engineering</span>
        </h1>
        <p className="careers-subtitle">
          We ship cutting-edge web apps, AI systems, and mobile products for ambitious startups worldwide. Explore open roles and build your career with us.
        </p>
      </header>

      <main className="container careers-main">
        <div className="openings-section-header">
          <h2>Open Positions ({JOB_OPENINGS.length})</h2>
          <p>All roles are remote-friendly with competitive compensation and rapid growth potential.</p>
        </div>

        <div className="jobs-list">
          {JOB_OPENINGS.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`job-card glass-card ${job.featured ? "featured-job" : ""}`}
            >
              {job.featured && (
                <div className="featured-tag">
                  <Sparkles size={13} /> Featured Opening
                </div>
              )}

              <div className="job-card-header">
                <div>
                  <span className="job-department">{job.department}</span>
                  <h3 className="job-title">{job.title}</h3>
                </div>

                {/* Apply Now Button with Rotating Glow animation (.btn-glow) */}
                <button
                  onClick={() => handleOpenApplyModal(job)}
                  className="btn-primary btn-glow"
                  data-hover
                  style={{ cursor: "pointer" }}
                >
                  <span>Apply Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="job-meta-row">
                <span className="job-meta-item">
                  <MapPin size={14} /> {job.location}
                </span>
                <span className="job-meta-item">
                  <Clock size={14} /> {job.type} • Experience: {job.experience}
                </span>
              </div>

              <p className="job-desc">{job.description}</p>

              <div className="job-details-grid">
                <div className="job-column">
                  <h4>Key Responsibilities</h4>
                  <ul>
                    {job.responsibilities.map((res, i) => (
                      <li key={i}>{res}</li>
                    ))}
                  </ul>
                </div>

                <div className="job-column">
                  <h4>Requirements & Qualifications</h4>
                  <ul>
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="job-skills-row">
                <span className="skills-label">Required Tech Stack:</span>
                {job.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* ── APPLY NOW MODAL DIALOG ────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && selectedJob && (
          <div className="modal-backdrop-overlay">
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />

            <motion.div
              className="career-modal-container"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <button 
                onClick={handleCloseModal} 
                className="modal-close-btn" 
                aria-label="Close form modal"
                type="button"
              >
                <X size={20} />
              </button>

              {isSubmitted ? (
                <div className="submission-success-view">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={48} className="text-emerald" />
                  </div>
                  <h3>Application Submitted Successfully!</h3>
                  <p>
                    Thank you for applying for the <strong>{selectedJob.title}</strong> role. Our engineering team will review your details and PDF resume. We will contact you via email shortly.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="btn-primary"
                    style={{ marginTop: "20px" }}
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <>
                  <div className="modal-header-text">
                    <span className="modal-subhead">Job Application</span>
                    <h2 className="modal-title">Apply for {selectedJob.title}</h2>
                    <p className="modal-desc">
                      Please fill in all compulsory fields and upload your resume (.pdf) from your device.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="career-apply-form">
                    <div className="form-grid-2col">
                      {/* Full Name */}
                      <div className="form-group">
                        <label>
                          Full Name <span className="required-star">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      {/* Email Address */}
                      <div className="form-group">
                        <label>
                          Email Address <span className="required-star">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="form-group">
                        <label>
                          Phone / WhatsApp Number <span className="required-star">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      {/* Country */}
                      <div className="form-group">
                        <label>
                          Country of Residence <span className="required-star">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. India / United States"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        />
                      </div>

                      {/* Gender */}
                      <div className="form-group">
                        <label>
                          Gender <span className="required-star">*</span>
                        </label>
                        <select
                          required
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                          <option value="" disabled>Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Non-Binary">Non-Binary</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>

                      {/* Role Applying For */}
                      <div className="form-group">
                        <label>
                          Role Applying For <span className="required-star">*</span>
                        </label>
                        <select
                          required
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                          {JOB_OPENINGS.map((j) => (
                            <option key={j.id} value={j.title}>
                              {j.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Total Experience */}
                      <div className="form-group">
                        <label>
                          Total Experience (Years) <span className="required-star">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 3.5 Years"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        />
                      </div>

                      {/* Current CTC */}
                      <div className="form-group">
                        <label>
                          Current CTC (in LPA) <span className="required-star">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 12 LPA"
                          value={formData.currentCtc}
                          onChange={(e) => setFormData({ ...formData, currentCtc: e.target.value })}
                        />
                      </div>

                      {/* Expected CTC */}
                      <div className="form-group">
                        <label>
                          Expected CTC (in LPA) <span className="required-star">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 18 LPA"
                          value={formData.expectedCtc}
                          onChange={(e) => setFormData({ ...formData, expectedCtc: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Resume Upload (.pdf compulsory) */}
                    <div className="form-group file-upload-group" style={{ marginTop: "16px" }}>
                      <label>
                        Upload Resume (.pdf only) <span className="required-star">*</span>
                      </label>
                      <div className={`file-drop-area ${resumeFile ? "file-selected" : ""}`}>
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          required
                          onChange={handleFileChange}
                          id="resume-file-input"
                          className="file-input-element"
                        />
                        <label htmlFor="resume-file-input" className="file-drop-label">
                          {resumeFile ? (
                            <div className="selected-file-info">
                              <FileText size={24} className="text-cyan" />
                              <div>
                                <span className="file-name">{resumeFile.name}</span>
                                <span className="file-size">
                                  ({(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)
                                </span>
                              </div>
                              <span className="file-change-badge">Change File</span>
                            </div>
                          ) : (
                            <div className="drop-prompt">
                              <Upload size={24} className="text-cyan" />
                              <span>Click to browse or drop your resume (.pdf) here</span>
                              <span className="file-hint">Compulsory format: PDF (Max 10MB)</span>
                            </div>
                          )}
                        </label>
                      </div>
                      {resumeError && <p className="form-error-msg">{resumeError}</p>}
                    </div>

                    <div className="modal-submit-row">
                      {submitError && (
                        <p className="form-error-msg" style={{ marginBottom: "12px", textAlign: "center" }}>
                          {submitError}
                        </p>
                      )}
                      {/* Submit Button with Rotating Glow animation (.btn-glow) */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary btn-glow submit-app-btn"
                        style={{ width: "100%", justifyContent: "center", cursor: "pointer" }}
                      >
                        {isSubmitting ? (
                          <span>Sending Application & Resume...</span>
                        ) : (
                          <>
                            <span>Submit Compulsory Application</span>
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .careers-page {
          min-height: 100vh;
          background: #000000;
          color: #f8fafc;
          padding: 120px 0 100px;
          position: relative;
        }

        .careers-hero {
          text-align: center;
          max-width: 860px;
          margin-bottom: 60px;
        }

        .careers-title {
          font-size: clamp(32px, 5vw, 54px);
          font-weight: 800;
          margin: 16px 0 20px;
          line-height: 1.15;
        }

        .careers-subtitle {
          font-size: clamp(15px, 2vw, 18px);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .openings-section-header {
          margin-bottom: 32px;
        }

        .openings-section-header h2 {
          font-size: 26px;
          margin-bottom: 6px;
        }

        .openings-section-header p {
          color: var(--text-secondary);
          font-size: 14.5px;
        }

        .jobs-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .job-card {
          padding: 32px;
          position: relative;
          border-radius: 20px;
        }

        .featured-job {
          border-color: rgba(0, 242, 254, 0.25);
          background: linear-gradient(135deg, rgba(0, 242, 254, 0.03) 0%, rgba(255, 255, 255, 0.015) 100%);
        }

        .featured-tag {
          position: absolute;
          top: -12px;
          right: 28px;
          background: linear-gradient(135deg, var(--violet) 0%, var(--blue) 100%);
          color: #fff;
          font-size: 11.5px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        .job-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .job-department {
          font-size: 12px;
          font-weight: 700;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .job-title {
          font-size: 24px;
          font-weight: 700;
          margin-top: 4px;
        }

        .job-meta-row {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          font-size: 13.5px;
          color: var(--text-secondary);
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .job-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ctc-highlight {
          color: #10b981;
          font-weight: 600;
        }

        .job-desc {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .job-details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        @media (min-width: 768px) {
          .job-details-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .job-column h4 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--white);
        }

        .job-column ul {
          padding-left: 18px;
          font-size: 13.5px;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .job-skills-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .skills-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-right: 4px;
        }

        .skill-pill {
          font-size: 12px;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--accent-cyan);
          padding: 4px 10px;
          border-radius: 6px;
        }

        /* Modal Styles */
        .modal-backdrop-overlay {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(12px, 3vw, 24px);
        }

        .modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
        }

        .career-modal-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 860px; /* Wider on PC/Desktop! */
          max-height: 85vh; /* Scrollable modal */
          overflow-y: auto;
          background: #040407 !important; /* Pitch-black solid dark background - zero text bleed */
          border: 1px solid rgba(0, 242, 254, 0.35);
          border-radius: 24px;
          padding: clamp(24px, 4vw, 44px);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.98), 0 0 50px rgba(0, 242, 254, 0.15);
        }

        /* Custom Scrollbar for Modal */
        .career-modal-container::-webkit-scrollbar {
          width: 8px;
        }
        .career-modal-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }
        .career-modal-container::-webkit-scrollbar-thumb {
          background: rgba(0, 242, 254, 0.35);
          border-radius: 8px;
        }
        .career-modal-container::-webkit-scrollbar-thumb:hover {
          background: var(--accent-cyan);
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 50;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(0, 242, 254, 0.4);
          color: var(--accent-cyan);
          transform: scale(1.06);
        }

        .modal-header-text {
          margin-bottom: 24px;
        }

        .modal-subhead {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent-cyan);
          letter-spacing: 0.05em;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 800;
          margin: 4px 0 8px;
        }

        .modal-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
        }

        .form-grid-2col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 600px) {
          .form-grid-2col {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
        }

        .required-star {
          color: #ef4444;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          background: rgba(18, 18, 24, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .form-group select option {
          background: #09090b;
          color: #fff;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.15);
        }

        .file-drop-area {
          position: relative;
          border: 2px dashed rgba(0, 242, 254, 0.25);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          background: rgba(0, 242, 254, 0.02);
          transition: all 0.2s ease;
        }

        .file-drop-area.file-selected {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.03);
        }

        .file-input-element {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        .file-drop-label {
          cursor: pointer;
        }

        .drop-prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-size: 13.5px;
          color: var(--text-secondary);
        }

        .file-hint {
          font-size: 12px;
          color: var(--muted);
        }

        .selected-file-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .file-name {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          display: block;
        }

        .file-size {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .file-change-badge {
          font-size: 11px;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 8px;
          border-radius: 6px;
          color: var(--accent-cyan);
        }

        .form-error-msg {
          font-size: 12.5px;
          color: #ef4444;
          margin-top: 6px;
        }

        .modal-submit-row {
          margin-top: 24px;
        }

        .submission-success-view {
          text-align: center;
          padding: 30px 10px;
        }

        .success-icon-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        .submission-success-view h3 {
          font-size: 22px;
          margin-bottom: 12px;
        }

        .submission-success-view p {
          font-size: 14.5px;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 480px;
          margin: 0 auto;
        }
      ` }} />
    </div>
  );
}
