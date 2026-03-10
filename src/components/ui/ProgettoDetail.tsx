"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap/config";

interface DettagliProgetto {
  categoria: string;
  anno: number;
  descrizioneBreve: string;
  urlProgetto: string;
}

interface ProgettoDetailProps {
  progetto: {
    id: string;
    title: string;
    slug: string;
    content: string;
    featuredImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    dettagliProgetto: DettagliProgetto;
  };
}

export default function ProgettoDetail({ progetto }: ProgettoDetailProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        titleRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          metaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 2rem 4rem",
          borderBottom: "1px solid var(--color-border)",
          position: "relative",
        }}
      >
        <Link
          href="/progetti"
          style={{
            position: "absolute",
            top: "7rem",
            left: "2rem",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.4,
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
        >
          {"<- Progetti"}
        </Link>

        <div style={{ overflow: "hidden", marginBottom: "3rem" }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 10vw, 10rem)",
              lineHeight: 0.9,
              opacity: 0,
            }}
          >
            {progetto.title}
          </h1>
        </div>

        <div
          ref={metaRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, auto)",
            gap: "4rem",
            opacity: 0,
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.4,
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Categoria
            </span>
            <span style={{ fontSize: "0.9rem" }}>
              {progetto.dettagliProgetto.categoria}
            </span>
          </div>

          <div>
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.4,
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Anno
            </span>
            <span style={{ fontSize: "0.9rem" }}>
              {progetto.dettagliProgetto.anno}
            </span>
          </div>

          <div>
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.4,
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Link
            </span>
            <a
              href={progetto.dettagliProgetto.urlProgetto}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.9rem",
                color: "var(--color-accent)",
                borderBottom: "1px solid var(--color-accent)",
                paddingBottom: "0.1rem",
              }}
            >
              Visita il sito
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "6rem 2rem", maxWidth: "800px" }}>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.8,
            opacity: 0.7,
            marginBottom: "3rem",
          }}
        >
          {progetto.dettagliProgetto.descrizioneBreve}
        </p>

        {progetto.content && (
          <div
            ref={contentRef}
            style={{ fontSize: "1rem", lineHeight: 1.8, opacity: 0.6 }}
            dangerouslySetInnerHTML={{ __html: progetto.content }}
          />
        )}
      </section>
    </main>
  );
}