"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap/config";
import { ScrollTrigger } from "@/lib/gsap/config";

interface Page {
  id: string;
  title: string;
  slug: string;
}

export default function HomeClient({ pages }: { pages: Page[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power3.inOut", transformOrigin: "left" }
      )
        .fromTo(
          titleRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );

      // Marquee scroll
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
      {/* Hero */}
      <section
        ref={heroRef}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 2rem 4rem",
          position: "relative",
        }}
      >
        {/* Line */}
        <div
          ref={lineRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "2rem",
            right: "2rem",
            height: "1px",
            backgroundColor: "var(--color-border)",
          }}
        />

        {/* Label top right */}
        <div
          style={{
            position: "absolute",
            top: "8rem",
            right: "2rem",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.4,
            fontFamily: "var(--font-body)",
          }}
        >
          Creative Studio — Est. 2024
        </div>

        {/* Main title */}
        <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 14vw, 16rem)",
              lineHeight: 0.9,
              color: "var(--color-fg)",
              opacity: 0,
            }}
          >
            We Create
            <br />
            <span style={{ color: "var(--color-accent)" }}>Experiences</span>
          </h1>
        </div>

        {/* Subtitle row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <p
            ref={subtitleRef}
            style={{
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.5,
              maxWidth: "300px",
              lineHeight: 1.6,
            }}
          >
            Digital experiences that move people — branding, web, motion.
          </p>

          <Link
            href="/about"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              letterSpacing: "0.1em",
              color: "var(--color-accent)",
              borderBottom: "1px solid var(--color-accent)",
              paddingBottom: "0.2rem",
            }}
          >
            Discover →
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <section
        style={{
          padding: "4rem 0",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        <div
          ref={marqueeRef}
          style={{
            display: "flex",
            gap: "4rem",
            whiteSpace: "nowrap",
            width: "200%",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: i % 2 === 0 ? "var(--color-fg)" : "transparent",
                WebkitTextStroke:
                  i % 2 !== 0 ? "1px var(--color-muted)" : "none",
                letterSpacing: "0.05em",
              }}
            >
              BRANDING — WEB DESIGN — MOTION —&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* Pages section */}
      {pages.length > 0 && (
        <section style={{ padding: "8rem 2rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1px",
              backgroundColor: "var(--color-border)",
            }}
          >
            {pages.map((page) => (
              <Link
                key={page.id}
                href={`/${page.slug}`}
                style={{
                  backgroundColor: "var(--color-bg)",
                  padding: "3rem 2rem",
                  display: "block",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#111")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--color-bg)")
                }
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    display: "block",
                    marginBottom: "1rem",
                  }}
                >
                  {page.title}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    opacity: 0.4,
                  }}
                >
                  /{page.slug} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer spacer */}
      <section style={{ height: "20vh" }} />
    </main>
  );
}