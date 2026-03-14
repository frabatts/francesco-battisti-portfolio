import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

export function useAnimatedBorder<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { scaleX: 0, transformOrigin: "left" });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1,
        duration: 1,
        ease: "power3.inOut",
        transformOrigin: "left",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}
