"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap/config";
import DOMPurify from "isomorphic-dompurify";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { ProgettoFull } from "@/types/wordpress";
import ReadingProgress from "@/components/ui/ReadingProgress";

export default function ProgettoDetail({ progetto }: { progetto: ProgettoFull }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
      <ReadingProgress />
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: isMobile ? "50vh" : "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile ? "7rem 1.25rem 2.5rem" : "0 2rem 4rem",
          position: "relative",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Link
          href="/progetti"
          style={{
            position: "absolute",
            top: isMobile ? "5rem" : "7rem",
            left: isMobile ? "1.25rem" : "2rem",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          ← Progetti
        </Link>

        <div style={{ overflow: "hidden", marginBottom: isMobile ? "2rem" : "3rem" }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "clamp(2.5rem, 12vw, 6rem)" : "clamp(3rem, 10vw, 10rem)",
              lineHeight: 0.9,
              opacity: 0,
            }}
          >
            {progetto.title}
          </h1>
        </div>

        {/* Meta info */}
        <div
          ref={metaRef}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, auto)",
            gap: isMobile ? "1.5rem" : "4rem",
            opacity: 0,
          }}
        >
          <div>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)", display: "block", marginBottom: "0.5rem" }}>
              Categoria
            </span>
            <span style={{ fontSize: "0.9rem" }}>
              {progetto.dettagliProgetto.categoria}
            </span>
          </div>

          <div>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)", display: "block", marginBottom: "0.5rem" }}>
              Anno
            </span>
            <span style={{ fontSize: "0.9rem" }}>
              {progetto.dettagliProgetto.anno}
            </span>
          </div>

          {progetto.dettagliProgetto.urlProgetto && (
            <div>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)", display: "block", marginBottom: "0.5rem" }}>
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
          )}
        </div>
      </section>

      {/* ── CONTENUTO ── */}
      <section
        style={{
          padding: isMobile ? "3rem 1.25rem 4rem" : "6rem 2rem",
          maxWidth: "800px",
        }}
      >
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.1rem",
            lineHeight: 1.8,
            color: "var(--color-text-muted)",
            marginBottom: "3rem",
          }}
        >
          {progetto.dettagliProgetto.descrizioneBreve}
        </p>

        {progetto.content && (
          <div
            ref={contentRef}
            style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--color-text-muted)" }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(progetto.content) }}
          />
        )}
      </section>
    </main>
  );
}