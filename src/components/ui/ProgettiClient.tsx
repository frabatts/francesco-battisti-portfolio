"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Progetto } from "@/types/wordpress";

export default function ProgettiClient({ progetti }: { progetti: Progetto[] }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

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
          minHeight: isMobile ? "40vh" : "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile ? "7rem 1.25rem 2.5rem" : "0 2rem 4rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
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
              fontSize: "clamp(3rem, 14vw, 10rem)",
              lineHeight: 0.9,
              opacity: 0,
            }}
          >
            Progetti
          </h1>
        </div>
      </section>

      {/* Lista progetti */}
      <section
        style={{ padding: isMobile ? "2rem 1.25rem" : "4rem 2rem" }}
        ref={listRef}
      >
        {progetti.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
            Nessun progetto trovato.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {progetti.map((progetto) => (
              <Link
                key={progetto.id}
                href={`/progetti/${progetto.slug}`}
                className="progetto-item"
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
                  alignItems: "center",
                  gap: isMobile ? "0.5rem" : "2rem",
                  padding: isMobile ? "1.75rem 0" : "2.5rem 0",
                  borderBottom: "1px solid var(--color-border)",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const title = e.currentTarget.querySelector(".proj-title") as HTMLElement;
                  const cat = e.currentTarget.querySelector(".proj-cat") as HTMLElement;
                  const anno = e.currentTarget.querySelector(".proj-anno") as HTMLElement;
                  if (title) title.style.color = "var(--color-accent)";
                  if (cat) cat.style.color = "var(--color-accent)";
                  if (anno) anno.style.color = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  const title = e.currentTarget.querySelector(".proj-title") as HTMLElement;
                  const cat = e.currentTarget.querySelector(".proj-cat") as HTMLElement;
                  const anno = e.currentTarget.querySelector(".proj-anno") as HTMLElement;
                  if (title) title.style.color = "var(--color-fg)";
                  if (cat) cat.style.color = "var(--color-text-muted)";
                  if (anno) anno.style.color = "var(--color-text-muted)";
                }}
              >
                <div>
                  <span
                    className="proj-title"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: isMobile ? "1.8rem" : "clamp(1.5rem, 3vw, 2.5rem)",
                      display: "block",
                      marginBottom: "0.4rem",
                      color: "var(--color-fg)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {progetto.title}
                  </span>
                  <span
                    className="proj-cat"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-muted)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {progetto.dettagliProgetto.categoria}
                    {isMobile && (
                      <span style={{ marginLeft: "0.75rem" }}>
                        · {progetto.dettagliProgetto.anno}
                      </span>
                    )}
                  </span>
                </div>

                {!isMobile && (
                  <span
                    className="proj-anno"
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.1em",
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--font-body)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {progetto.dettagliProgetto.anno}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}