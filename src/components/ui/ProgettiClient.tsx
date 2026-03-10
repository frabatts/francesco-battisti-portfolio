"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

interface Progetto {
  id: string;
  title: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  dettagliProgetto: {
    categoria: string;
    anno: number;
    descrizioneBreve: string;
    urlProgetto: string;
  };
}

export default function ProgettiClient({ progetti }: { progetti: Progetto[] }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Titolo entrata
      gsap.fromTo(
        titleRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // Lista progetti con stagger
      if (listRef.current) {
        const items = listRef.current.querySelectorAll(".progetto-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 2rem 4rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.4,
            marginBottom: "1rem",
            fontFamily: "var(--font-body)",
          }}
        >
          Portfolio
        </div>
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
            Progetti
          </h1>
        </div>
      </section>

      {/* Lista progetti */}
      <section style={{ padding: "4rem 2rem" }} ref={listRef}>
        {progetti.length === 0 ? (
          <p style={{ opacity: 0.4, fontSize: "0.9rem" }}>
            Nessun progetto trovato.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {progetti.map((progetto, index) => (
              <Link
                key={progetto.id}
                href={`/progetti/${progetto.slug}`}
                className="progetto-item"
                style={{
                  display: "grid",
                  gridTemplateColumns: "4rem 1fr auto",
                  alignItems: "center",
                  gap: "2rem",
                  padding: "2.5rem 0",
                  borderBottom: "1px solid var(--color-border)",
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {/* Index */}
                <span
                  style={{
                    fontSize: "0.7rem",
                    opacity: 0.3,
                    letterSpacing: "0.1em",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Info */}
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {progetto.title}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      opacity: 0.4,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {progetto.dettagliProgetto.categoria}
                  </span>
                </div>

                {/* Anno */}
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    opacity: 0.3,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {progetto.dettagliProgetto.anno}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}