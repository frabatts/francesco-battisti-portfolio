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

    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "none" });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power2.out" });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest("a, button")) return;

      gsap.to(follower, { scale: 2.5, opacity: 0.15, duration: 0.3, ease: "power2.out" });
      gsap.to(cursor, { scale: 0, duration: 0.2 });
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest("a, button")) return;

      gsap.to(follower, { scale: 1, opacity: 0.5, duration: 0.3, ease: "power2.out" });
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    // Magnetic effect sui bottoni .cta-magnetic
    const magneticEls: Element[] = [];

    const setupMagnetic = () => {
      const els = document.querySelectorAll(".cta-magnetic");
      els.forEach((el) => {
        if (magneticEls.includes(el)) return;
        magneticEls.push(el);

        const onMagneticMove = (ev: Event) => {
          const me = ev as MouseEvent;
          const rect = (el as HTMLElement).getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = me.clientX - cx;
          const dy = me.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 80;

          if (dist < maxDist) {
            const strength = 1 - dist / maxDist;
            gsap.to(el, {
              x: dx * strength * 0.4,
              y: dy * strength * 0.4,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };

        const onMagneticLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        };

        el.addEventListener("mousemove", onMagneticMove);
        el.addEventListener("mouseleave", onMagneticLeave);
      });
    };

    const observer = new MutationObserver(() => setupMagnetic());
    observer.observe(document.body, { childList: true, subtree: true });
    setupMagnetic();

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.body.style.cursor = "auto";
      observer.disconnect();
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
