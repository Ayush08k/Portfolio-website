import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Freelancer Ayush | Web Developer & Designer",
  description: "Portfolio of Ayush, a freelance web developer specializing in high-end, high-performance web experiences.",
  keywords: ["Freelancer", "Ayush", "Web Developer", "Designer", "Portfolio", "Next.js", "React"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
