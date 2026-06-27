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

  const announcementText = "⚡ LIMITED SLOTS: 50% OFF all projects this month — Landing pages from $75, full apps from $300. Book your free consultation now! ⚡";

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
