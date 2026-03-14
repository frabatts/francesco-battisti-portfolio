"use client";

import { useEffect, useRef, useState } from "react";
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

const CTA_LETTERS = "Iniziamo.".split("");

export default function HomeClient({ progetti }: { progetti: Progetto[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaTitleRef = useRef<HTMLHeadingElement>(null);

  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const arrowRefs = useRef<HTMLSpanElement[]>([]);

  const serviziRef = useReveal<HTMLDivElement>({ direction: "up", stagger: 0.12 });

  const [marqueePaused, setMarqueePaused] = useState(false);
  const isMobile = useIsMobile();

  // Hero animation (once)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(
        line1Ref.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power3.inOut", transformOrigin: "left" }
      )
        .fromTo(
          titleRef.current?.querySelectorAll("[data-word]") ?? [],
          { yPercent: 100 },
          { yPercent: 0, stagger: 0.08, duration: 0.9, ease: "power3.out" },
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
    });

    return () => ctx.revert();
  }, []);

  // CTA title split animation (dipende da isMobile)
  useEffect(() => {
    if (!ctaTitleRef.current) return;
    const letterSpans = ctaTitleRef.current.querySelectorAll("[data-letter]");
    if (!letterSpans.length) return;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        gsap.fromTo(
          letterSpans,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaTitleRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          letterSpans,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaTitleRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isMobile]);

  const handleCardEnter = (i: number) => {
    if (isMobile) return;
    const num = numberRefs.current[i];
    const arrow = arrowRefs.current[i];
    if (!num || !arrow) return;
    gsap.to(num, { yPercent: -100, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(arrow, { yPercent: 0, opacity: 1, duration: 0.3, ease: "power2.out", delay: 0.05 });
  };

  const handleCardLeave = (i: number) => {
    if (isMobile) return;
    const num = numberRefs.current[i];
    const arrow = arrowRefs.current[i];
    if (!num || !arrow) return;
    gsap.to(num, { yPercent: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(arrow, { yPercent: 100, opacity: 0, duration: 0.3, ease: "power2.in" });
  };

  return (
    <main>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

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

        <div style={{ marginBottom: "1.5rem" }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 14vw, 10rem)",
              lineHeight: 0.95,
              color: "var(--color-fg)",
            }}
          >
            <span style={{ overflow: "hidden", display: "block" }}>
              <span data-word style={{ display: "inline-block" }}>Francesco</span>
            </span>
            <span style={{ overflow: "hidden", display: "block" }}>
              <span data-word style={{ display: "inline-block" }}>Battisti</span>
            </span>
            <span style={{ overflow: "hidden", display: "block", color: "var(--color-accent)" }}>
              <span data-word style={{ display: "inline-block" }}>WordPress</span>
            </span>
            <span style={{ overflow: "hidden", display: "block" }}>
              <span
                data-word
                style={{
                  display: "inline-block",
                  color: "transparent",
                  WebkitTextStroke: "1px var(--color-muted)",
                }}
              >
                Developer
              </span>
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
        onMouseEnter={() => { if (!isMobile) setMarqueePaused(true); }}
        onMouseLeave={() => { if (!isMobile) setMarqueePaused(false); }}
      >
        <div
          style={{
            display: "flex",
            gap: "2rem",
            whiteSpace: "nowrap",
            width: "200%",
            animation: "marqueeScroll 20s linear infinite",
            animationPlayState: marqueePaused ? "paused" : "running",
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
          {SERVIZI.map((servizio, i) => (
            <div
              key={servizio.numero}
              onMouseEnter={() => handleCardEnter(i)}
              onMouseLeave={() => handleCardLeave(i)}
              style={{
                backgroundColor: "var(--color-bg)",
                padding: isMobile ? "2rem 1.25rem" : "3rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Numero + Freccia */}
              <div
                style={{
                  position: "relative",
                  height: "1.1rem",
                  overflow: "hidden",
                }}
              >
                <span
                  ref={(el) => { if (el) numberRefs.current[i] = el; }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    fontSize: "0.7rem",
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.15em",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {servizio.numero}
                </span>
                <span
                  ref={(el) => { if (el) arrowRefs.current[i] = el; }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    fontSize: "0.7rem",
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.15em",
                    fontFamily: "var(--font-body)",
                    opacity: 0,
                    transform: "translateY(100%)",
                  }}
                >
                  →
                </span>
              </div>

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
        <div>
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
            ref={ctaTitleRef}
            aria-label="Iniziamo."
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "clamp(2.5rem, 12vw, 4rem)" : "clamp(3rem, 8vw, 8rem)",
              lineHeight: 0.9,
              marginBottom: "2.5rem",
            }}
          >
            {CTA_LETTERS.map((letter, i) => (
              <span
                key={i}
                data-letter
                style={{ display: "inline-block", opacity: 0 }}
              >
                {letter}
              </span>
            ))}
          </h2>
          <Link
            href="/contatti"
            className="cta-magnetic"
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
