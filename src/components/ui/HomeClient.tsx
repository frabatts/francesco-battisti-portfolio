"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";
import { useReveal } from "@/animations/useReveal";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Progetto } from "@/types/wordpress";

const SERVIZI = [
  {
    numero: "01",
    titolo: "Siti WordPress",
    descrizione: "Temi custom, Elementor Pro, ACF. Dal design al deploy, ogni progetto è costruito su misura.",
    tag: "WordPress · Elementor · ACF",
  },
  {
    numero: "02",
    titolo: "E-commerce",
    descrizione: "Negozi WooCommerce ottimizzati per convertire. Veloci, sicuri e facili da gestire.",
    tag: "WooCommerce · Pagamenti · UX",
  },
  {
    numero: "03",
    titolo: "Manutenzione",
    descrizione: "Aggiornamenti, backup giornalieri, sicurezza e supporto continuativo.",
    tag: "Backup · Sicurezza · Supporto",
  },
];

export default function HomeClient({ progetti }: { progetti: Progetto[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const serviziRef = useReveal<HTMLDivElement>({ direction: "up", stagger: 0.12 });
  const ctaSezioneRef = useReveal<HTMLDivElement>({ direction: "fade", delay: 0.2 });

  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(
        line1Ref.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power3.inOut", transformOrigin: "left" }
      )
        .fromTo(
          titleRef.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          line2Ref.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut", transformOrigin: "left" },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );

      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          height: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile ? "5rem 1.25rem 2.5rem" : "8rem 2rem 4rem",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: isMobile ? "5rem" : "8rem",
            right: isMobile ? "1.25rem" : "2rem",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          © {new Date().getFullYear()}
        </div>

        <div
          ref={line1Ref}
          style={{
            position: "absolute",
            top: "50%",
            left: isMobile ? "1.25rem" : "2rem",
            right: isMobile ? "1.25rem" : "2rem",
            height: "1px",
            backgroundColor: "var(--color-border)",
          }}
        />

        <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 14vw, 10rem)",
              lineHeight: 0.95,
              color: "var(--color-fg)",
              opacity: 0,
            }}
          >
            Francesco
            <br />
            Battisti
            <br />
            <span style={{ color: "var(--color-accent)" }}>WordPress</span>
            <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px var(--color-muted)" }}>
              Developer
            </span>
          </h1>
        </div>

        <div
          ref={line2Ref}
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "var(--color-border)",
            marginBottom: isMobile ? "1.5rem" : "2rem",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            gap: isMobile ? "1.5rem" : "2rem",
          }}
        >
          <p
            ref={subtitleRef}
            style={{
              fontSize: "0.9rem",
              letterSpacing: "0.04em",
              opacity: 0,
              maxWidth: "420px",
              lineHeight: 1.7,
              color: "var(--color-text-muted)",
            }}
          >
            {isMobile ? (
              <>
                Realizzo siti web e e-commerce WordPress su misura per PMI, startup e agenzie.
                <br />
                Qualità, performance e attenzione al dettaglio.
              </>
            ) : (
              <>
                Realizzo siti web e e-commerce WordPress su misura per PMI, startup e agenzie.{" "}
                Qualità, performance e attenzione al dettaglio.
              </>
            )}
          </p>

          <div
            ref={ctaRef}
            style={{
              opacity: 0,
              display: "flex",
              gap: isMobile ? "1.5rem" : "2rem",
              alignItems: "center",
            }}
          >
            <Link
              href="/progetti"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                letterSpacing: "0.1em",
                color: "var(--color-accent)",
                borderBottom: "1px solid var(--color-accent)",
                paddingBottom: "0.2rem",
                whiteSpace: "nowrap",
              }}
            >
              Vedi i progetti →
            </Link>
            <Link
              href="/contatti"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                whiteSpace: "nowrap",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              Contattami
            </Link>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section
        style={{
          padding: "2rem 0",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        <div
          ref={marqueeRef}
          style={{
            display: "flex",
            gap: "2rem",
            whiteSpace: "nowrap",
            width: "200%",
          }}
        >
          {["WORDPRESS", "E-COMMERCE", "SEO", "PERFORMANCE", "WORDPRESS", "E-COMMERCE", "SEO", "PERFORMANCE"].map((testo, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 5vw, 4rem)",
                color: i % 2 === 0 ? "var(--color-fg)" : "transparent",
                WebkitTextStroke: i % 2 !== 0 ? "1px var(--color-fg)" : "none",
                letterSpacing: "0.05em",
                marginRight: "2rem",
              }}
            >
              {testo}
            </span>
          ))}
        </div>
      </section>

      {/* ── SERVIZI ── */}
      <section style={{ padding: isMobile ? "4rem 1.25rem" : "8rem 2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: isMobile ? "2.5rem" : "4rem",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Servizi e Soluzioni
          </span>
          <Link
            href="/about"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
          >
            Chi sono →
          </Link>
        </div>

        <div
          ref={serviziRef}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "var(--color-border)",
          }}
        >
          {SERVIZI.map((servizio) => (
            <div
              key={servizio.numero}
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
                {servizio.numero}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isMobile ? "2rem" : "clamp(1.8rem, 3vw, 2.8rem)",
                  lineHeight: 1,
                }}
              >
                {servizio.titolo}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {servizio.descrizione}
              </p>
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {servizio.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section
        style={{
          padding: isMobile ? "4rem 1.25rem" : "8rem 2rem",
          borderTop: "1px solid var(--color-border)",
          textAlign: "center",
        }}
      >
        <div ref={ctaSezioneRef}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-body)",
            }}
          >
            Hai un progetto in mente?
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "clamp(2.5rem, 12vw, 4rem)" : "clamp(3rem, 8vw, 8rem)",
              lineHeight: 0.9,
              marginBottom: "2.5rem",
            }}
          >
            Iniziamo.
          </h2>
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
        </div>
      </section>
    </main>
  );
}