"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap/config";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 400;
      setVisible((prev) => {
        if (prev === shouldShow) return prev;
        return shouldShow;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    if (visible) {
      gsap.fromTo(
        btn,
        { opacity: 0, y: 20, pointerEvents: "none" },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", pointerEvents: "auto" }
      );
    } else {
      gsap.to(btn, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [visible]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label="Torna su"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "44px",
        height: "44px",
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg)",
        color: "var(--color-fg)",
        cursor: "pointer",
        zIndex: 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        pointerEvents: "none",
        fontFamily: "var(--font-display)",
        fontSize: "1.2rem",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-fg)";
        e.currentTarget.style.color = "var(--color-bg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-bg)";
        e.currentTarget.style.color = "var(--color-fg)";
      }}
    >
      ↑
    </button>
  );
}
