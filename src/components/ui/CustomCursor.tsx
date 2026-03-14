"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/config";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Nascondi cursor nativo
    document.body.style.cursor = "none";

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Cursor dot — segue immediatamente
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "none",
      });

      // Follower — segue con ritardo
      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    // Hover su link e bottoni — delegazione eventi sul document
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as Element).closest("a, button");
      if (!target) return;
      gsap.to(follower, { scale: 2.5, opacity: 0.15, duration: 0.3, ease: "power2.out" });
      gsap.to(cursor, { scale: 0, duration: 0.2 });
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as Element).closest("a, button");
      if (!target) return;
      gsap.to(follower, { scale: 1, opacity: 0.5, duration: 0.3, ease: "power2.out" });
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Dot centrale */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "var(--color-fg)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />

      {/* Cerchio follower */}
      <div
        ref={followerRef}
        style={{
          position: "fixed",
          top: -20,
          left: -20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid var(--color-fg)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0.5,
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}