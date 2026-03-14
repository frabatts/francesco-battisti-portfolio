"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap/config";
import { useIsMobile } from "@/hooks/useIsMobile";
import { normalizeUrl } from "@/lib/utils";

interface MenuItem {
  id: string;
  label: string;
  url: string;
}

export default function HeaderInner({ menuItems }: { menuItems: MenuItem[] }) {
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const logoOverlayRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const [logoColor, setLogoColor] = useState<string>("var(--color-fg)");

  const activeLineRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const hoverLineRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Logo adattivo: osserva sezioni con data-theme="light"
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-theme='light']");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.intersectionRatio >= 0.5);
        setLogoColor(anyVisible ? "var(--color-bg)" : "var(--color-fg)");
      },
      { threshold: [0, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  // Entrata logo overlay (fuori dall'header per permettere mix-blend-mode)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoOverlayRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Anima l'indicatore pagina attiva al mount e al cambio pathname
  useEffect(() => {
    menuItems.forEach((item) => {
      const isActive = pathname === normalizeUrl(item.url);
      const line = activeLineRefs.current.get(item.id);
      if (!line) return;
      if (isActive) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.4, ease: "power3.out", transformOrigin: "left" }
        );
      }
    });
  }, [pathname, menuItems]);

  const handleLinkEnter = useCallback((id: string) => {
    const line = hoverLineRefs.current.get(id);
    if (!line) return;
    gsap.to(line, { scaleX: 1, duration: 0.3, ease: "power3.out", transformOrigin: "left" });
  }, []);

  const handleLinkLeave = useCallback((id: string) => {
    const line = hoverLineRefs.current.get(id);
    if (!line) return;
    gsap.to(line, { scaleX: 0, duration: 0.25, ease: "power3.out", transformOrigin: "right" });
  }, []);

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current;
    const links = navLinksRef.current?.querySelectorAll("li");
    if (!overlay) return;

    gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        gsap.set(overlay, { display: "none" });
      },
    })
      .to(links || [], { opacity: 0, y: -16, duration: 0.25, ease: "power2.in", stagger: 0.04 })
      .to(overlay, { opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.1");
  }, []);

  // Chiudi menu al cambio pagina
  useEffect(() => {
    if (isOpen) handleClose();
  }, [pathname, handleClose]);

  // Blocca scroll quando menu aperto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    const overlay = overlayRef.current;
    const links = navLinksRef.current?.querySelectorAll("li");
    if (!overlay || !links) return;

    gsap.timeline()
      .set(overlay, { display: "flex", opacity: 0 })
      .to(overlay, { opacity: 1, duration: 0.5, ease: "power2.out" })
      .fromTo(
        links,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.07 },
        "-=0.2"
      );
  };

  return (
    <>
      <header
        ref={headerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isMobile ? "1.5rem 1.25rem" : "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo originale — invisibile, mantiene lo spazio e il click */}
        <Link
          href="/"
          aria-label="Homepage"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem",
            letterSpacing: "0.05em",
            color: logoColor,
            zIndex: 110,
            position: "relative",
            display: "inline-block",
            opacity: 0,
            pointerEvents: "all",
          }}
        >
          FB
        </Link>

        {/* Nav desktop */}
        {!isMobile && (
          <nav>
            <ul
              style={{
                display: "flex",
                gap: "2.5rem",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {menuItems.map((item) => {
                const isActive = pathname === normalizeUrl(item.url);
                return (
                  <li key={item.id}>
                    <Link
                      href={normalizeUrl(item.url)}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8rem",
                        fontWeight: 300,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                        transition: "color 0.3s ease",
                        display: "inline-block",
                        paddingBottom: "4px",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = "var(--color-fg)";
                          handleLinkEnter(item.id);
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = "var(--color-text-muted)";
                          handleLinkLeave(item.id);
                        }
                      }}
                    >
                      {item.label}

                      {/* Indicatore pagina attiva */}
                      {isActive && (
                        <div
                          ref={(el) => {
                            if (el) activeLineRefs.current.set(item.id, el);
                            else activeLineRefs.current.delete(item.id);
                          }}
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "1px",
                            backgroundColor: "var(--color-accent)",
                            transform: "scaleX(0)",
                            transformOrigin: "left",
                          }}
                        />
                      )}

                      {/* Hover underline */}
                      {!isActive && (
                        <div
                          ref={(el) => {
                            if (el) hoverLineRefs.current.set(item.id, el);
                            else hoverLineRefs.current.delete(item.id);
                          }}
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "1px",
                            backgroundColor: "var(--color-fg)",
                            transform: "scaleX(0)",
                            transformOrigin: "left",
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Hamburger / Close — mobile */}
        {isMobile && (
          <button
            onClick={isOpen ? handleClose : handleOpen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              zIndex: 110,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "flex-end",
            }}
            aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-fg)",
                  transition: "color 0.3s ease",
                }}
              >
                Chiudi
              </span>
            ) : (
              <>
                <span style={{ display: "block", width: "24px", height: "1px", backgroundColor: "var(--color-fg)" }} />
                <span style={{ display: "block", width: "16px", height: "1px", backgroundColor: "var(--color-fg)" }} />
              </>
            )}
          </button>
        )}
      </header>

      {/* Logo overlay — fixed, fuori dall'header per mix-blend-mode: difference */}
      <span
        ref={logoOverlayRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "1.5rem",
          left: isMobile ? "1.25rem" : "2rem",
          zIndex: 150,
          fontFamily: "var(--font-display)",
          fontSize: "1.6rem",
          letterSpacing: "0.05em",
          color: "#ffffff",
          mixBlendMode: "difference",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        FB
      </span>

      {/* Overlay menu mobile fullscreen */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          zIndex: 90,
          backgroundColor: "var(--color-bg)",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "8rem 1.25rem 4rem",
          opacity: 0,
        }}
      >
        <ul
          ref={navLinksRef}
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {menuItems.map((item) => {
            const isActive = pathname === normalizeUrl(item.url);
            return (
              <li key={item.id}>
                <Link
                  href={normalizeUrl(item.url)}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(3rem, 12vw, 7rem)",
                    lineHeight: 1,
                    color: isActive ? "var(--color-accent)" : "var(--color-fg)",
                    display: "block",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Francesco Battisti
          </span>
          <a
            href="https://www.linkedin.com/in/francesco-battisti/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </>
  );
}
