import { Metadata } from "next";
import SpeedClient from "./SpeedClient";

export const metadata: Metadata = {
  title: "Speed Showcase & Performance Audits | Ayush Kumar",
  description: "View verified Google Lighthouse scores and Core Web Vitals audits. Get 50% off high-performance Next.js websites and mobile apps. 100% money-back guarantee.",
  keywords: [
    "Fast Freelance Developer",
    "Next.js Speed Optimization",
    "Core Web Vitals Specialist",
    "Google Lighthouse 100 Score",
    "High Performance Web Developer",
    "Freelance React Performance Expert",
    "Sub-second load times",
    "Zero Upfront Payments Developer",
    "Ayush Kumar Portfolio Speed"
  ],
  openGraph: {
    title: "Speed Showcase & Performance Audits | Ayush Kumar",
    description: "View verified Google Lighthouse scores and Core Web Vitals audits. Get 50% off high-performance Next.js websites and mobile apps. 100% money-back guarantee.",
    type: "website"
  }
};

export default function SpeedPage() {
  return <SpeedClient />;
}
