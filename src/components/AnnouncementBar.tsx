"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnnouncementBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (isHome) {
      document.body.classList.add("has-announcement");
    } else {
      document.body.classList.remove("has-announcement");
    }
    return () => {
      document.body.classList.remove("has-announcement");
    };
  }, [isHome]);

  if (!isHome) return null;

  const announcementText = "🔥 SPECIAL OFFER: Get 50% OFF on all projects currently! Limited booking slots available for this month. Get a free proposal today! 🚀";

  return (
    <div className="announcement-bar" role="complementary" aria-label="Announcement">
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
