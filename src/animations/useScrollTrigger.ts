"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

interface ScrollTriggerOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export function useScrollAnimation(
  animationFn: (element: HTMLElement) => gsap.core.Timeline | gsap.core.Tween,
  options: ScrollTriggerOptions = {}
) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const animation = animationFn(element);

      ScrollTrigger.create({
        trigger: options.trigger || element,
        start: options.start || "top 80%",
        end: options.end || "bottom 20%",
        scrub: options.scrub,
        pin: options.pin,
        markers: options.markers || false,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
        animation,
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return elementRef;
}