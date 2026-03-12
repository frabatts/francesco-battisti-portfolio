"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/animations/useReveal";

export default function ContattiClient() {
  const heroRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.2 });
  const formRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.2 });

  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: isMobile ? "50vh" : "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile ? "7rem 1.25rem 2.5rem" : "12rem 2rem 4rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div ref={heroRef}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              marginBottom: "1.5rem",
            }}
          >
            Contatti
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "clamp(3rem, 16vw, 6rem)" : "clamp(3rem, 12vw, 13rem)",
              lineHeight: 0.9,
              marginBottom: isMobile ? "2rem" : "3rem",
            }}
          >
            Hai un
            <br />
            progetto
            <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px var(--color-muted)",
              }}
            >
              in mente?
            </span>
          </h1>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--color-text-muted)",
              maxWidth: "500px",
              fontWeight: 300,
            }}
          >
            Iniziamo.
          </p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section style={{ padding: isMobile ? "3rem 1.25rem" : "8rem 2rem" }}>
        <div ref={formRef}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              marginBottom: isMobile ? "2rem" : "4rem",
            }}
          >
            Scrivimi
          </p>

          <div
            style={{
              border: "1px solid var(--color-border)",
              padding: isMobile ? "2rem 1.25rem" : "4rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--color-text-muted)",
                letterSpacing: "0.08em",
                fontFamily: "var(--font-body)",
              }}
            >
              Form di contatto in arrivo
            </p>
            <a
              href="mailto:info@francescobattisti.com"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-bg)",
                backgroundColor: "var(--color-fg)",
                padding: "1rem 2.5rem",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Scrivimi via email →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}