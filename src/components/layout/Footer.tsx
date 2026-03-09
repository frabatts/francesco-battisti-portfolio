"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "4rem 2rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "2rem",
        alignItems: "end",
      }}
    >
      {/* Logo + tagline */}
      <div>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2rem",
            letterSpacing: "0.05em",
            display: "block",
            marginBottom: "1rem",
          }}
        >
          STUDIO
        </Link>
        <p
          style={{
            fontSize: "0.75rem",
            opacity: 0.4,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1.6,
          }}
        >
          Digital experiences
          <br />
          that move people.
        </p>
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.5,
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Copyright */}
      <div style={{ textAlign: "right" }}>
        <p
          style={{
            fontSize: "0.7rem",
            opacity: 0.3,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          © {year} Studio
          <br />
          All rights reserved
        </p>
      </div>
    </footer>
  );
}