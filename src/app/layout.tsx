import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Ayush Kumar | Full Stack & Mobile Developer",
  description: "Portfolio of Ayush Kumar — Full Stack & Mobile App Developer. 3+ years of experience, 50+ apps shipped.",
  keywords: ["Ayush Kumar", "Full Stack Developer", "Mobile Developer", "React", "Next.js", "Portfolio"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
