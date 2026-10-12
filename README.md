# Ayush Kumar — Developer Portfolio & Digital Hub 🚀

[![Live Website](https://img.shields.io/badge/Live%20Website-freelanceayush.com-7C3AED?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.freelanceayush.com)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.6%20(Turbopack)-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

> A modern, high-performance portfolio, blog, interactive pricing estimator, and client onboarding platform for **Ayush Kumar** — Full Stack & Mobile App Developer with 3+ years of freelancing experience and 50+ delivered projects.

---

## 🌟 Highlights & Key Features

- ⚡ **Ultra-Fast Next.js 16 (Turbopack)**: Hybrid Static Site Generation (SSG) with 111+ pre-rendered routes, optimized for sub-second page loads.
- 🧮 **Interactive Scope & Pricing Estimator**:
  - Live cost & delivery timeline calculation for Landing Pages, Web Apps, Mobile Apps, 3D Sites, E-Commerce, and AI Integrations.
  - Multi-currency support (USD / INR toggle).
  - Seamless handover: selecting services and clicking "Proceed" saves configuration in `sessionStorage` and redirects to the pre-filled contact form on the home page.
- 📝 **Full-Featured Tech Blog**:
  - 40+ in-depth tech and hardware comparison articles with rich SEO metadata and OpenGraph support.
- 💼 **Case Studies & Projects Showcase**:
  - Dynamic showcase featuring client projects, architectural breakdowns, live demos, and tech stacks.
- 🎨 **Modern Cyber-Themed UI/UX**:
  - Dynamic aurora glow effects, custom 3D rotating earth, GSAP scroll-triggered animations, interactive bento grids, and glassmorphic micro-interactions.
- 🔍 **Search Engine Optimization (SEO)**:
  - Canonical URL management, automated dynamic `sitemap.xml`, fine-tuned `robots.txt`, and structured metadata schemas for Google Search Console indexing.
- 📬 **Interactive Lead Generation**:
  - Real-time contact messaging and job applicant forms with transactional email integrations powered by Resend.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS Design System with CSS Custom Properties, Glassmorphism, and Responsive Grids
- **Animations**: [GSAP](https://greensock.com/gsap/) (ScrollTrigger) & [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email Service**: [Resend](https://resend.com/) API
- **Deployment**: [Vercel](https://vercel.com/) with Custom Domain (`freelanceayush.com`)

---

## 📂 Project Structure

```text
├── public/                 # Static assets (images, icons, logos, fonts)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── about/          # About story & background
│   │   ├── api/            # Serverless endpoints (contact, chat, apply)
│   │   ├── blog/           # Blog listing & dynamic [slug] articles
│   │   ├── careers/        # Career openings & application pipeline
│   │   ├── estimator/      # Dedicated Project Cost & Timeline Estimator
│   │   ├── projects/       # Projects listing & dynamic [slug] case studies
│   │   ├── services/       # Core service offerings
│   │   ├── speed/          # Performance benchmarks & site speed metrics
│   │   ├── layout.tsx      # Root layout, metadataBase, canonicals & navbar
│   │   ├── page.tsx        # Homepage (Hero, About, Skills, Projects, Contact)
│   │   ├── robots.ts       # Dynamic robots.txt generator
│   │   └── sitemap.ts      # Dynamic sitemap.xml generator
│   ├── components/         # Modular UI components (Navbar, PricingEstimator, etc.)
│   └── data/               # Structured data stores (portfolio, blog, reviews)
└── next.config.mjs         # Next.js build and caching configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or newer
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ayush08k/Portfolio-website.git
   cd Portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SITE_URL=https://www.freelanceayush.com
   NEXT_PUBLIC_APP_NAME="Ayush Kumar Portfolio"
   RESEND_API_KEY=your_resend_api_key_here
   CONTACT_RECEIVER_EMAIL=your_email@example.com
   ```

4. Run the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## 🤝 Services & Booking

Available for select freelance contracts, MVP builds, full-stack consulting, and full-time opportunities.

- 🌐 **Live Website**: [freelanceayush.com](https://www.freelanceayush.com)
- 💼 **LinkedIn**: [linkedin.com/in/ayush08k](https://www.linkedin.com/in/ayush08k/)
- 💻 **GitHub**: [github.com/Ayush08k](https://github.com/Ayush08k)
- 🐦 **X (Twitter)**: [@aayush08k](https://x.com/aayush08k)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
