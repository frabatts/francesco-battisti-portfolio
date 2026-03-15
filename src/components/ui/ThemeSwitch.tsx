"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap/config";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const wrapperRef = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    if (!wrapperRef.current) {
      toggleTheme();
      return;
    }
    gsap.to(wrapperRef.current, {
      scale: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        toggleTheme();
        requestAnimationFrame(() => {
          if (wrapperRef.current) {
            gsap.fromTo(
              wrapperRef.current,
              { scale: 0 },
              { scale: 1, duration: 0.2, ease: "back.out(2)" }
            );
          }
        });
      },
    });
  };

  return (
    <button
      onClick={handleClick}
      aria-label={theme === "dark" ? "Attiva tema chiaro" : "Attiva tema scuro"}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0.5rem",
        color: "var(--color-text-muted)",
        transition: "color 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
    >
      <span ref={wrapperRef} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {theme === "dark" ? (
          /* Sole */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="8" cy="8" r="3" fill="currentColor" />
            <line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="8" x2="3" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="13" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3.05" y1="3.05" x2="4.46" y2="4.46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="11.54" y1="11.54" x2="12.95" y2="12.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12.95" y1="3.05" x2="11.54" y2="4.46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="4.46" y1="11.54" x2="3.05" y2="12.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          /* Luna */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M13.5 10.5C12.5 11 11.3 11.3 10 11.3C6.5 11.3 3.7 8.5 3.7 5C3.7 3.7 4 2.5 4.5 1.5C2.2 2.5 0.5 4.7 0.5 7.3C0.5 11.1 3.6 14.2 7.4 14.2C10 14.2 12.2 12.7 13.5 10.5Z"
              fill="currentColor"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
