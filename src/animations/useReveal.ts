"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

type RevealDirection = "up" | "down" | "left" | "right" | "fade";

interface RevealOptions {
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  distance?: number;
  stagger?: number;
  start?: string;
}

export function useReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      direction = "up",
      duration = 0.8,
      delay = 0,
      distance = 40,
      stagger = 0,
      start = "top 85%",
    } = options;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: "power3.out",
    };

    switch (direction) {
      case "up":
        fromVars.y = distance;
        toVars.y = 0;
        break;
      case "down":
        fromVars.y = -distance;
        toVars.y = 0;
        break;
      case "left":
        fromVars.x = distance;
        toVars.x = 0;
        break;
      case "right":
        fromVars.x = -distance;
        toVars.x = 0;
        break;
      case "fade":
        break;
    }

    const ctx = gsap.context(() => {
      // Se ha figli, anima i figli con stagger
      const targets = stagger > 0 ? el.children : el;

      gsap.fromTo(targets, fromVars, {
        ...toVars,
        stagger: stagger > 0 ? stagger : undefined,
        scrollTrigger: {
          trigger: el,
          start,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}