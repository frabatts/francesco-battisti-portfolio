"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap/config";
import DOMPurify from "isomorphic-dompurify";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Post } from "@/types/wordpress";
import { useAnimatedBorder } from "@/animations/useAnimatedBorder";

export default function BlogClient({ posts }: { posts: Post[] }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const heroBorderRef = useAnimatedBorder<HTMLDivElement>();
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      if (listRef.current) {
        const items = listRef.current.querySelectorAll("li");
        // Su mobile mostra subito senza ScrollTrigger
        if (isMobile) {
          gsap.set(items, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            items,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: listRef.current,
                start: "top 80%",
              },
            }
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
          minHeight: isMobile ? "40vh" : "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile ? "7rem 1.25rem 2.5rem" : "0 2rem 4rem",
        }}
      >
        <div
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            marginBottom: "1rem",
            fontFamily: "var(--font-body)",
          }}
        >
          Articoli
        </div>
        <div style={{ overflow: "hidden" }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 14vw, 10rem)",
              lineHeight: 0.9,
              opacity: 0,
            }}
          >
            Blog
          </h1>
        </div>
        <div
          ref={heroBorderRef}
          style={{ height: "1px", backgroundColor: "var(--color-border)", marginTop: "2.5rem" }}
        />
      </section>

      {/* ── LISTA POST ── */}
      <section style={{ padding: isMobile ? "2rem 1.25rem" : "4rem 2rem" }}>
        {posts.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
            Nessun articolo trovato.
          </p>
        ) : (
          <ul ref={listRef} style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {posts.map((post) => (
              <li
                key={post.id}
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
                    alignItems: "center",
                    gap: isMobile ? "0.4rem" : "2rem",
                    padding: isMobile ? "1.5rem 0" : "2.5rem 0",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const title = e.currentTarget.querySelector(".post-title") as HTMLElement;
                    const excerpt = e.currentTarget.querySelector(".post-excerpt") as HTMLElement;
                    const date = e.currentTarget.querySelector(".post-date") as HTMLElement;
                    if (title) title.style.color = "var(--color-accent)";
                    if (excerpt) excerpt.style.color = "var(--color-accent)";
                    if (date) date.style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    const title = e.currentTarget.querySelector(".post-title") as HTMLElement;
                    const excerpt = e.currentTarget.querySelector(".post-excerpt") as HTMLElement;
                    const date = e.currentTarget.querySelector(".post-date") as HTMLElement;
                    if (title) title.style.color = "var(--color-fg)";
                    if (excerpt) excerpt.style.color = "var(--color-text-muted)";
                    if (date) date.style.color = "var(--color-text-muted)";
                  }}
                >
                  <div>
                    <span
                      className="post-title"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: isMobile ? "1.8rem" : "clamp(1.5rem, 3vw, 2.5rem)",
                        display: "block",
                        marginBottom: "0.4rem",
                        color: "var(--color-fg)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {post.title}
                    </span>
                    <span
                      className="post-excerpt"
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.5,
                        display: "block",
                        transition: "color 0.3s ease",
                      }}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt) }}
                    />
                  </div>

                  <span
                    className="post-date"
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.1em",
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--font-body)",
                      transition: "color 0.3s ease",
                      marginTop: isMobile ? "0.5rem" : "0",
                    }}
                  >
                    {new Date(post.date).toLocaleDateString("it-IT", {
                      year: "numeric",
                      month: "short",
                    })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}