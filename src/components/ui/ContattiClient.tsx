"use client";

import Link from "next/link";
import { useReveal } from "@/animations/useReveal";

const INFO = [
  {
    label: "Email",
    valore: "info@francescobattisti.com",
    href: "mailto:info@francescobattisti.com",
  },
  {
    label: "LinkedIn",
    valore: "francesco-battisti",
    href: "https://www.linkedin.com/in/francesco-battisti/",
  },
  {
    label: "P.IVA",
    valore: "18203611001",
    href: null,
  },
];

export default function ContattiClient() {
  const heroRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.2 });
  const infoRef = useReveal<HTMLDivElement>({ direction: "up", stagger: 0.1 });
  const formRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.2 });

  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "12rem 2rem 4rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div ref={heroRef}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              opacity: 0.5,
              fontFamily: "var(--font-body)",
              marginBottom: "2rem",
            }}
          >
            Contatti
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 12vw, 13rem)",
              lineHeight: 0.9,
              marginBottom: "3rem",
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
              opacity: 0.6,
              maxWidth: "500px",
              fontWeight: 300,
            }}
          >
            Raccontami il tuo progetto.
          </p>
        </div>
      </section>
      {/* ── PLACEHOLDER FORM ── */}
      <section style={{ padding: "8rem 2rem" }}>
        <div ref={formRef}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              opacity: 0.5,
              fontFamily: "var(--font-body)",
              marginBottom: "4rem",
            }}
          >
            Scrivimi
          </p>

          {/* Placeholder form — sarà sostituito con CF7 */}
          <div
            style={{
              border: "1px solid var(--color-border)",
              padding: "4rem",
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
                opacity: 0.4,
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