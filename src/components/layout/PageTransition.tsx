"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap/config";
import { useTransition } from "@/context/TransitionContext";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const { setIsTransitioning, particleIntensityRef } = useTransition();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.fromTo(content, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 });
      return;
    }

    const tl = gsap.timeline({
      onStart: () => setIsTransitioning(true),
      onComplete: () => setIsTransitioning(false),
    });

    tl
      // Vortice si addensa lentamente
      .to(particleIntensityRef, {
        current: 1,
        duration: 1.8,
        ease: "sine.inOut",
      })
      // Contenuto sfuma
      .to(content, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      }, "-=0.8")
      // Pausa al culmine
      .to({}, { duration: 0.15 })
      // Reset intensity — particelle già in posizione
      .set(particleIntensityRef, { current: 0 })
      // Contenuto nuova pagina entra
      .fromTo(content,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );

    return () => { tl.kill(); };
  }, [pathname]);

  return (
    <div ref={contentRef}>
      {children}
    </div>
  );
}