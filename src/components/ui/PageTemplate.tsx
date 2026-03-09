"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

interface PageTemplateProps {
  title: string;
  content: string;
}

export default function PageTemplate({ title, content }: PageTemplateProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrata titolo
      gsap.fromTo(
        titleRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // Linea
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut", delay: 0.1, transformOrigin: "left" }
      );

      // Contenuto con ScrollTrigger
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll("p, h2, h3, ul, ol");

        paragraphs.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Page Hero */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 2rem 4rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* Label */}
        <div
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.4,
            marginBottom: "2rem",
            fontFamily: "var(--font-body)",
          }}
        >
          Page
        </div>

        {/* Line */}
        <div
          ref={lineRef}
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "var(--color-border)",
            marginBottom: "2rem",
          }}
        />

        {/* Title */}
        <div style={{ overflow: "hidden" }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 10vw, 10rem)",
              lineHeight: 0.9,
              opacity: 0,
            }}
          >
            {title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section
        style={{
          padding: "6rem 2rem",
          maxWidth: "800px",
        }}
      >
        <div
          ref={contentRef}
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            opacity: 0.8,
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>
    </main>
  );
}