"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap/config";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animazione entrata — ogni volta che cambia la route
  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    const tl = gsap.timeline();

    // Overlay esce verso l'alto
    tl.set(overlay, { yPercent: 0 })
      .to(overlay, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
      })
      // Contenuto entra
      .fromTo(
        content,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      {/* Overlay di transizione */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000",
          zIndex: 100,
          transform: "translateY(-100%)",
        }}
      />

      {/* Contenuto pagina */}
      <div ref={contentRef}>
        {children}
      </div>
    </>
  );
}