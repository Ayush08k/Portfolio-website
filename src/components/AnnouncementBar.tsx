"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnnouncementBar() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("has-announcement");
    return () => {
      document.body.classList.remove("has-announcement");
    };
  }, [pathname]);

  const announcementText = "🔥 WORLD'S CHEAPEST FREELANCER — 50% OFF ALL SERVICES: Websites $75 · iOS Apps $300 · Android Apps $300 · Web Apps $500 · LIMITED SLOTS — Book FREE Consultation Now! 🔥";

  return (
    <div className="announcement-bar" role="complementary" aria-label="Special Offer: 50% OFF — Cheapest Freelance Web & App Developer">
      <div className="announcement-track">
        <span>{announcementText}</span>
        <span className="separator">•</span>
        <span>{announcementText}</span>
        <span className="separator">•</span>
        <span>{announcementText}</span>
        <span className="separator">•</span>
        <span>{announcementText}</span>
        <span className="separator">•</span>
      </div>
    </div>
  );
}
