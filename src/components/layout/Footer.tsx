"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "Chi sono", href: "/about" },
  { label: "Progetti", href: "/progetti" },
  { label: "Blog", href: "/blog" },
  { label: "Contatti", href: "/contatti" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {/* Riga superiore: Logo + Nav + LinkedIn */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* Logo + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              letterSpacing: "0.05em",
              color: "var(--color-fg)",
            }}
          >
            FB
          </Link>
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.4,
              fontFamily: "var(--font-body)",
            }}
          >
            WordPress Developer
          </span>
        </div>

        {/* Nav links */}
        <nav>
          <ul
            style={{
              display: "flex",
              gap: "2rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
              flexWrap: "wrap",
            }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    opacity: 0.5,
                    transition: "opacity 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/francesco-battisti/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.5,
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
        >
          LinkedIn →
        </a>
      </div>

      {/* Riga inferiore: P.IVA + Privacy + Copyright */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
          borderTop: "1px solid var(--color-border)",
          paddingTop: "1.5rem",
        }}
      >
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.35,
              fontFamily: "var(--font-body)",
            }}
          >
            P.IVA 18203611001
          </span>
          <a
            href="mailto:info@francescobattisti.com"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.35,
              fontFamily: "var(--font-body)",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
          >
            info@francescobattisti.com
          </a>
          <a
            href="https://www.iubenda.com/privacy-policy/34436341"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.35,
              fontFamily: "var(--font-body)",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
          >
            Privacy Policy
          </a>
        </div>

        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.35,
            fontFamily: "var(--font-body)",
          }}
        >
          © {year} Francesco Battisti
        </span>
      </div>
    </footer>
  );
}