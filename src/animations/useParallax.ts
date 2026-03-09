"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

interface ParallaxOptions {
  speed?: number; // positivo = scende, negativo = sale
  start?: string;
  end?: string;
}

export function useParallax<T extends HTMLElement>(options: ParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { speed = 0.3, start = "top bottom", end = "bottom top" } = options;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -10 * speed * 10 },
        {
          yPercent: 10 * speed * 10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}