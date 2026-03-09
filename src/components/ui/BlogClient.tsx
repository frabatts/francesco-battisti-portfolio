"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export default function BlogClient({ posts }: { posts: Post[] }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Titolo entrata
      gsap.fromTo(
        titleRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // Lista post con stagger
      if (listRef.current) {
        const items = listRef.current.querySelectorAll("li");
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 2rem 4rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.4,
            marginBottom: "1rem",
            fontFamily: "var(--font-body)",
          }}
        >
          Journal
        </div>
        <div style={{ overflow: "hidden" }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 10vw, 10rem)",
              lineHeight: 0.9,
              opacity: 0,
            }}
          >
            Latest Work
          </h1>
        </div>
      </section>

      {/* Post list */}
      <section style={{ padding: "4rem 2rem" }}>
        {posts.length === 0 ? (
          <p style={{ opacity: 0.4, fontSize: "0.9rem" }}>
            Nessun articolo trovato.
          </p>
        ) : (
          <ul ref={listRef} style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {posts.map((post, index) => (
              <li
                key={post.id}
                style={{
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "4rem 1fr auto",
                    alignItems: "center",
                    gap: "2rem",
                    padding: "2rem 0",
                    transition: "opacity 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {/* Index */}
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.7rem",
                      opacity: 0.3,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Title + excerpt */}
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                        display: "block",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {post.title}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        opacity: 0.4,
                        lineHeight: 1.5,
                        display: "block",
                      }}
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  </div>

                  {/* Date */}
                  <span
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.1em",
                      opacity: 0.3,
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
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