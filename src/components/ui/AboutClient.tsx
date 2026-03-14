"use client";

import Link from "next/link";
import { useReveal } from "@/animations/useReveal";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAnimatedBorder } from "@/animations/useAnimatedBorder";

const PROCESSO = [
  { step: "01", label: "Brief" },
  { step: "02", label: "Mockup Figma" },
  { step: "03", label: "Sviluppo" },
  { step: "04", label: "Deploy" },
];

const VALORI = [
  {
    numero: "01",
    titolo: "Esperienza Utente",
    descrizione: "Ogni scelta di design parte dall'utente finale. Navigazione intuitiva, gerarchie chiare e micro-interazioni che rendono l'esperienza memorabile.",
  },
  {
    numero: "02",
    titolo: "Personalizzazione",
    descrizione: "Nessun template uguale all'altro. Ogni progetto viene costruito su misura, integrando le esigenze del cliente con le best practice del settore.",
  },
  {
    numero: "03",
    titolo: "Performance",
    descrizione: "Velocità, Core Web Vitals e ottimizzazione SEO non sono optional. Sono il punto di partenza di ogni sito che realizzo.",
  },
];

const STACK = [
  {
    categoria: "Progettazione",
    tools: ["Asana", "Slack", "Figma"],
    wip: false,
    nota: null,
  },
  {
    categoria: "Page Builder",
    tools: ["Elementor Pro"],
    wip: false,
    nota: null,
  },
  {
    categoria: "Sviluppo",
    tools: ["WordPress", "WooCommerce", "PHP", "JavaScript", "HTML", "CSS"],
    wip: false,
    nota: null,
  },
  {
    categoria: "SEO & Analytics",
    tools: ["SEO", "GA4", "GTM", "GSC", "Screaming Frog"],
    wip: false,
    nota: null,
  },
  {
    categoria: "Ricerca & Innovazione",
    tools: ["WordPress Headless", "WPGraphQL", "Next.js", "GSAP", "Tailwind CSS"],
    wip: true,
    nota: "Stack in fase di esplorazione attiva. Questo sito è il primo progetto headless.",
  },
  {
    categoria: "AI & Vibe Coding",
    tools: ["Claude AI", "Claude Code"],
    wip: true,
    nota: "Integrazione AI nel workflow di sviluppo per prototipazione rapida e qualità elevata.",
  },
];

const ESPERIENZE = [
  {
    azienda: "Rovi Spazio Creativo",
    ruolo: "WordPress Developer",
    periodo: "Gen 2026 — Presente",
    tipo: "Roviano · ETS / Coworking",
  },
  {
    azienda: "Making",
    ruolo: "WordPress Developer",
    periodo: "Ago 2025 — Presente",
    tipo: "Roma · Ibrido",
  },
  {
    azienda: "arimaslab",
    ruolo: "Web Designer / WordPress Developer",
    periodo: "Feb 2023 — Ago 2025",
    tipo: "Carsoli · Ibrido",
  },
  {
    azienda: "Consorzio Innovo",
    ruolo: "Web Designer / WordPress Developer",
    periodo: "Lug 2020 — Feb 2023",
    tipo: "Guidonia · In sede",
  },
];

export default function AboutClient() {
  const heroBorderRef = useAnimatedBorder<HTMLDivElement>();
  const heroRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.2 });
  const bioRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.1 });
  const valoriRef = useReveal<HTMLDivElement>({ direction: "up", stagger: 0.1 });
  const stackRef = useReveal<HTMLDivElement>({ direction: "up", stagger: 0.08 });
  const esperienzRef = useReveal<HTMLDivElement>({ direction: "up", stagger: 0.1 });
  const ctaRef = useReveal<HTMLDivElement>({ direction: "fade", delay: 0.2 });

  const isMobile = useIsMobile();

  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: isMobile ? "50vh" : "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile ? "7rem 1.25rem 2.5rem" : "12rem 2rem 4rem",
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
            About
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 14vw, 11rem)",
              lineHeight: 0.9,
              marginBottom: isMobile ? "2rem" : "3rem",
            }}
          >
            Francesco
            <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px var(--color-muted)" }}>
              Battisti
            </span>
          </h1>

          {/* Processo — 2x2 su mobile, 4 colonne su desktop */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
              borderTop: "1px solid var(--color-border)",
              borderLeft: "1px solid var(--color-border)",
            }}
          >
            {PROCESSO.map((item) => (
              <div
                key={item.step}
                style={{
                  padding: isMobile ? "1rem" : "1.2rem 1.5rem",
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
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.15em",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {item.step}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: isMobile ? "1.1rem" : "clamp(1rem, 2vw, 1.4rem)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          ref={heroBorderRef}
          style={{ height: "1px", backgroundColor: "var(--color-border)", marginTop: "2.5rem" }}
        />
      </section>

      {/* ── BIO ── */}
      <section
        style={{
          padding: isMobile ? "3rem 1.25rem" : "8rem 2rem",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
          gap: isMobile ? "1.5rem" : "6rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Biografia
          </p>
        </div>

        <div ref={bioRef} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <p
            style={{
              fontSize: isMobile ? "1rem" : "clamp(1rem, 1.5vw, 1.25rem)",
              lineHeight: 1.7,
              color: "var(--color-fg)",
              fontWeight: 300,
            }}
          >
Ho sempre voluto creare esperienze web speciali e uniche. Il mio avvicinamento allo sviluppo web ha cambiato molte cose e da allora cerco di spingere ogni progetto verso nuovi orizzonti, mettendo sempre al primo posto qualità e prestazioni.
Nel corso degli anni ho collaborato — e collaboro tuttora — con diverse agenzie, un'esperienza che mi ha permesso di sviluppare un approccio al web development attento non solo alla qualità tecnica, ma anche alle dinamiche di posizionamento organico e crescita digitale.          </p>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "var(--color-text-muted)",
              fontWeight: 300,
            }}
          >
Lavoro a stretto contatto con i clienti per trasformare la loro visione in un progetto concreto — dal mockup Figma allo sviluppo del tema WordPress personalizzato, fino al deploy finale. Realizzo siti web e e-commerce ad alte prestazioni, completamente ottimizzati per SEO e pensati per supportare la crescita digitale del business.          </p>
        </div>
      </section>

      {/* ── VALORI ── */}
      <section
        style={{
          padding: isMobile ? "3rem 1.25rem" : "8rem 2rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
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
          Metodologia
        </p>

        <div
          ref={valoriRef}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "var(--color-border)",
          }}
        >
          {VALORI.map((v) => (
            <div
              key={v.numero}
              style={{
                backgroundColor: "var(--color-bg)",
                padding: isMobile ? "2rem 1.25rem" : "3rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.15em",
                  fontFamily: "var(--font-body)",
                }}
              >
                {v.numero}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isMobile ? "1.8rem" : "clamp(1.5rem, 2.5vw, 2.2rem)",
                  lineHeight: 1,
                }}
              >
                {v.titolo}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-text-muted)",
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
      <section
        style={{
          padding: isMobile ? "3rem 1.25rem" : "8rem 2rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
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
          Stack & strumenti
        </p>

        <div ref={stackRef} style={{ display: "flex", flexDirection: "column" }}>
          {STACK.map((gruppo, index) => (
            <div
              key={gruppo.categoria}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "220px 1fr",
                gap: isMobile ? "0.75rem" : "2rem",
                padding: isMobile ? "1.75rem 0" : "2.5rem 0",
                borderBottom: index < STACK.length - 1 ? "1px solid var(--color-border)" : "none",
                alignItems: "flex-start",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", paddingTop: isMobile ? 0 : "0.4rem" }}>
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
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
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    In evoluzione
                  </span>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem 1rem" }}>
                  {gruppo.tools.map((tool) => (
                    <span
                      key={tool}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: isMobile ? "1.3rem" : "clamp(1.2rem, 2vw, 1.8rem)",
                        letterSpacing: "0.05em",
                        color: gruppo.wip ? "var(--color-text-muted)" : "var(--color-fg)",
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
                      color: "var(--color-text-muted)",
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

      {/* ── ESPERIENZE ── */}
      <section
        style={{
          padding: isMobile ? "3rem 1.25rem" : "8rem 2rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
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
          Esperienze
        </p>

        <div ref={esperienzRef} style={{ display: "flex", flexDirection: "column" }}>
          {ESPERIENZE.map((exp, index) => (
            <div
              key={exp.azienda}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "220px 1fr auto",
                gap: isMobile ? "0.4rem" : "2rem",
                padding: isMobile ? "1.75rem 0" : "2.5rem 0",
                borderBottom: index < ESPERIENZE.length - 1 ? "1px solid var(--color-border)" : "none",
                alignItems: isMobile ? "flex-start" : "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {exp.periodo}
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: isMobile ? "1.6rem" : "clamp(1.5rem, 2.5vw, 2.2rem)",
                    lineHeight: 1,
                  }}
                >
                  {exp.azienda}
                </span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {exp.ruolo}
                  {isMobile && exp.tipo && (
                    <span style={{ marginLeft: "0.5rem", opacity: 0.6 }}>· {exp.tipo}</span>
                  )}
                </span>
              </div>

              {/* Tipo — solo desktop */}
              {!isMobile && exp.tipo && (
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-body)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {exp.tipo}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: isMobile ? "4rem 1.25rem" : "8rem 2rem",
          textAlign: "center",
        }}
      >
        <div ref={ctaRef}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-body)",
            }}
          >
            Lavoriamo insieme
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "clamp(3rem, 16vw, 5rem)" : "clamp(3rem, 8vw, 8rem)",
              lineHeight: 0.9,
              marginBottom: "2.5rem",
            }}
          >
            Hai un progetto?
          </h2>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
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
                color: "var(--color-text-muted)",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              Vedi i progetti →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}