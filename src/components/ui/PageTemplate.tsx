"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap/config";
import DOMPurify from "isomorphic-dompurify";
import { useIsMobile } from "@/hooks/useIsMobile";

interface PageTemplateProps {
  title: string;
  content: string;
  date?: string;
}

export default function PageTemplate({ title, content, date }: PageTemplateProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut", delay: 0.1, transformOrigin: "left" }
      );

      // Su mobile mostra contenuto subito
      if (contentRef.current) {
        if (isMobile) {
          gsap.set(contentRef.current, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
          );
        }
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: isMobile ? "50vh" : "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile ? "7rem 1.25rem 2.5rem" : "0 2rem 4rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Link
          href="/blog"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-body)",
            marginBottom: "2rem",
            display: "inline-block",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          ← Blog
        </Link>

        <div
          ref={lineRef}
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "var(--color-border)",
            marginBottom: "2rem",
          }}
        />

        <div style={{ overflow: "hidden" }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "clamp(2rem, 10vw, 5rem)" : "clamp(3rem, 8vw, 8rem)",
              lineHeight: 0.95,
              opacity: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {date && (
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              marginTop: "1.5rem",
            }}
          >
            {new Date(date).toLocaleDateString("it-IT", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </section>

      {/* ── CONTENUTO ── */}
      <section
        style={{
          padding: isMobile ? "3rem 1.25rem 5rem" : "6rem 2rem 8rem",
          maxWidth: "760px",
        }}
      >
        <div
          ref={contentRef}
          className="blog-content"
          style={{
            fontSize: isMobile ? "0.95rem" : "1rem",
            lineHeight: 1.85,
            color: "var(--color-text-muted)",
            opacity: 0,
          }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
      </section>

      {/* ── CSS contenuto blog ── */}
      <style>{`
        .blog-content h2 {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          color: var(--color-fg);
          margin: 3rem 0 1rem;
          line-height: 1;
        }
        .blog-content h3 {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          color: var(--color-fg);
          margin: 2rem 0 0.75rem;
          line-height: 1;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
          color: var(--color-text-muted);
        }
        .blog-content a {
          color: var(--color-accent);
          border-bottom: 1px solid var(--color-accent);
          padding-bottom: 0.1rem;
          transition: opacity 0.3s ease;
        }
        .blog-content a:hover {
          opacity: 0.7;
        }
        .blog-content ul, .blog-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--color-text-muted);
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        .blog-content blockquote {
          border-left: 2px solid var(--color-accent);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: var(--color-text-muted);
        }
        .blog-content code {
          font-family: monospace;
          font-size: 0.85rem;
          background: var(--color-muted);
          padding: 0.2rem 0.4rem;
          border-radius: 2px;
          color: var(--color-accent);
        }
        .blog-content pre {
          background: var(--color-muted);
          padding: 1.5rem;
          border-radius: 4px;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        .blog-content img {
          width: 100%;
          height: auto;
          margin: 2rem 0;
        }
        .blog-content strong {
          color: var(--color-fg);
          font-weight: 500;
        }
      `}</style>
    </main>
  );
}