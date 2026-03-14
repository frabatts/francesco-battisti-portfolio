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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Entrata header
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
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
          opacity: 0,
        }}
      >
        {/* Logo — mix-blend-mode: difference */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem",
            letterSpacing: "0.05em",
            color: "#ffffff",
            mixBlendMode: "difference",
            transition: "opacity 0.3s ease",
            zIndex: 110,
            position: "relative",
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
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = "var(--color-fg)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.color = "var(--color-text-muted)";
                      }}
                    >
                      {item.label}
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

      {/* Overlay menu mobile fullscreen — sfondo scuro */}
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

        {/* Info fondo overlay */}
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