"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ReadingProgress() {
  const [width, setWidth] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(Math.min(progress, 100));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: isMobile ? "1.5px" : "2px",
        width: `${width}%`,
        backgroundColor: "var(--color-accent)",
        zIndex: 200,
        pointerEvents: "none",
        transformOrigin: "left",
        transition: "width 0.05s linear",
      }}
    />
  );
}
