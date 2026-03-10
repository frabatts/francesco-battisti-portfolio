"use client";

import Link from "next/link";
import { useReveal } from "@/animations/useReveal";

const STACK = [
  {
    categoria: "Progettazione",
    tools: ["Asana", "Slack", "Figma"],
    wip: false,
  },
  {
    categoria: "Page Builder",
    tools: ["Elementor Pro"],
    wip: false,
  },
  {
    categoria: "Sviluppo",
    tools: ["WordPress", "WooCommerce", "PHP", "JavaScript", "HTML", "CSS"],
    wip: false,
  },
  {
    categoria: "SEO & Analytics",
    tools: ["SEO", "GA4", "GTM", "GSC", "Screaming Frog"],
    wip: false,
  },
  {
    categoria: "Ricerca & Innovazione",
    tools: ["WordPress Headless", "WPGraphQL", "Next.js", "GSAP", "Tailwind CSS"],
    wip: true,
    nota: "Esploro approcci moderni allo sviluppo web: architetture headless, animazioni avanzate e performance al limite.",
  },
  {
    categoria: "AI & Vibe Coding",
    tools: ["Claude AI", "Cursor"],
    wip: true,
    nota: "Integro l'AI nel workflow di sviluppo per prototipare più velocemente e costruire esperienze più sofisticate.",
  },
];

const VALORI = [
  {
    numero: "01",
    titolo: "Esperienza Utente",
    descrizione: "Siti progettati per un'esperienza fluida e intuitiva. Interazioni e animazioni accompagnano l'utente durante la navigazione.",
  },
  {
    numero: "02",
    titolo: "Personalizzazione",
    descrizione: "Ogni progetto è sviluppato su misura in modalità responsive, con completa libertà di design e funzionalità su qualsiasi dispositivo.",
  },
  {
    numero: "03",
    titolo: "Performance",
    descrizione: "Ottimizzo ogni elemento per raggiungere standard elevati di SEO, accessibilità, velocità di caricamento e Core Web Vitals.",
  },
];

const PROCESSO = [
  { step: "01", label: "Brief" },
  { step: "02", label: "Mockup Figma" },
  { step: "03", label: "Sviluppo" },
  { step: "04", label: "Deploy" },
];

export default function AboutClient() {
  const heroRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.2 });
  const bioRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.1 });
  const valoriRef = useReveal<HTMLDivElement>({ direction: "up", stagger: 0.1 });
  const stackRef = useReveal<HTMLDivElement>({ direction: "up", stagger: 0.08 });
  const ctaRef = useReveal<HTMLDivElement>({ direction: "fade", delay: 0.2 });

  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "60vh",
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
            Chi sono
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 10vw, 11rem)",
              lineHeight: 0.9,
              marginBottom: "3rem",
            }}
          >
            Francesco
            <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px var(--color-muted)",
              }}
            >
              Battisti
            </span>
          </h1>

          {/* Processo */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid var(--color-border)",
              borderLeft: "1px solid var(--color-border)",
            }}
          >
            {PROCESSO.map((item) => (
              <div
                key={item.step}
                style={{
                  flex: 1,
                  padding: "1.2rem 1.5rem",
                  borderRight: "1px solid var(--color-border)",
                  borderBottom: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    opacity: 0.5,
                    letterSpacing: "0.15em",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {item.step}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1rem, 2vw, 1.4rem)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIO ── */}
      <section
        style={{
          padding: "8rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "6rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              opacity: 0.5,
              fontFamily: "var(--font-body)",
            }}
          >
            Biografia
          </p>
        </div>

        <div ref={bioRef} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <p
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              lineHeight: 1.7,
              opacity: 0.9,
              fontWeight: 300,
            }}
          >
            Ho sempre voluto creare esperienze web speciali e uniche. Il mio avvicinamento allo sviluppo web ha cambiato molte cose per me e da allora cerco di spingere il mio lavoro verso nuovi orizzonti con ogni progetto, mettendo sempre al primo posto la qualità e le prestazioni.
          </p>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.8,
              opacity: 0.7,
              fontWeight: 300,
            }}
          >
            Lavoro a stretto contatto con i clienti per trasformare la loro visione in un progetto concreto — dal mockup Figma allo sviluppo del tema WordPress personalizzato, fino al deploy finale. Creo siti web e e-commerce ad alte prestazioni, completamente ottimizzati per SEO e strategie di crescita digitale.
          </p>
        </div>
      </section>

      {/* ── VALORI ── */}
      <section style={{ padding: "8rem 2rem", borderBottom: "1px solid var(--color-border)" }}>
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
          Il mio approccio
        </p>

        <div
          ref={valoriRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "var(--color-border)",
          }}
        >
          {VALORI.map((v) => (
            <div
              key={v.numero}
              style={{
                backgroundColor: "var(--color-bg)",
                padding: "3rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  opacity: 0.5,
                  letterSpacing: "0.15em",
                  fontFamily: "var(--font-body)",
                }}
              >
                {v.numero}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                  lineHeight: 1,
                }}
              >
                {v.titolo}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.75,
                  lineHeight: 1.7,
                }}
              >
                {v.descrizione}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STACK ── */}
      <section style={{ padding: "8rem 2rem", borderBottom: "1px solid var(--color-border)" }}>
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
          Stack & strumenti
        </p>

        <div ref={stackRef} style={{ display: "flex", flexDirection: "column" }}>
          {STACK.map((gruppo, index) => (
            <div
              key={gruppo.categoria}
              style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: "2rem",
                padding: "2.5rem 0",
                borderBottom: index < STACK.length - 1 ? "1px solid var(--color-border)" : "none",
                alignItems: "flex-start",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingTop: "0.4rem" }}>
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    opacity: 0.5,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {gruppo.categoria}
                </span>
                {gruppo.wip && (
                  <span
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      opacity: 0.8,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    In evoluzione
                  </span>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem" }}>
                  {gruppo.tools.map((tool) => (
                    <span
                      key={tool}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                        letterSpacing: "0.05em",
                        opacity: gruppo.wip ? 0.6 : 1,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                {gruppo.nota && (
                  <p
                    style={{
                      fontSize: "0.85rem",
                      opacity: 0.6,
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      maxWidth: "500px",
                    }}
                  >
                    {gruppo.nota}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "8rem 2rem", textAlign: "center" }}>
        <div ref={ctaRef}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              opacity: 0.5,
              marginBottom: "2rem",
              fontFamily: "var(--font-body)",
            }}
          >
            Lavoriamo insieme
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 8rem)",
              lineHeight: 0.9,
              marginBottom: "3rem",
            }}
          >
            Hai un progetto?
          </h2>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", alignItems: "center" }}>
            <Link
              href="/contatti"
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
              Scrivimi
            </Link>
            <Link
              href="/progetti"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.55,
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
            >
              Vedi i progetti →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}