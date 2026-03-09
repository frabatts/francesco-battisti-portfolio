import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/all";

// Registra tutti i plugin GSAP in un unico posto
gsap.registerPlugin(ScrollTrigger, Flip);

// Configurazione defaults globali
gsap.defaults({
  ease: "power2.out",
  duration: 0.8,
});

// ScrollTrigger — impostazioni base
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger, Flip };