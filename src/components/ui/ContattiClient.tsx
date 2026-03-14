"use client";

import { useState } from "react";
import { useReveal } from "@/animations/useReveal";
import { useIsMobile } from "@/hooks/useIsMobile";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormFields {
  "your-name": string;
  "your-surname": string;
  "your-email": string;
  "your-message": string;
  "acceptance-privacy": boolean;
}

interface FormErrors {
  "your-name"?: string;
  "your-surname"?: string;
  "your-email"?: string;
  "your-message"?: string;
  "acceptance-privacy"?: string;
}

const CF7_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  ? process.env.NEXT_PUBLIC_WORDPRESS_API_URL.replace("/graphql", "") +
    "/wp-json/contact-form-7/v1/contact-forms/35/feedback"
  : "http://localhost:10043/wp-json/contact-form-7/v1/contact-forms/35/feedback";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields["your-name"] || fields["your-name"].trim().length < 2) {
    errors["your-name"] = "Il nome deve contenere almeno 2 caratteri";
  }
  if (!fields["your-surname"] || fields["your-surname"].trim().length < 2) {
    errors["your-surname"] = "Il cognome deve contenere almeno 2 caratteri";
  }
  if (!fields["your-email"] || !EMAIL_REGEX.test(fields["your-email"])) {
    errors["your-email"] = "Inserisci un indirizzo email valido";
  }
  if (!fields["your-message"] || fields["your-message"].trim().length < 10) {
    errors["your-message"] = "Il messaggio deve contenere almeno 10 caratteri";
  }
  if (!fields["acceptance-privacy"]) {
    errors["acceptance-privacy"] = "Devi accettare la Privacy Policy per procedere";
  }
  return errors;
}

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "0.7rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
  fontFamily: "var(--font-body)",
  marginBottom: "0.5rem",
};

const ERROR_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  color: "var(--color-accent)",
  marginTop: "0.4rem",
  fontFamily: "var(--font-body)",
};

const BASE_INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid var(--color-border)",
  outline: "none",
  padding: "0.85rem 1rem",
  fontSize: "1rem",
  fontFamily: "var(--font-body)",
  color: "var(--color-fg)",
  transition: "border-color 0.2s ease, background 0.2s ease",
  borderRadius: 0,
  minHeight: "48px",
};

export default function ContattiClient() {
  const heroRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.2 });
  const formRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.3 });

  const isMobile = useIsMobile();

  const [fields, setFields] = useState<FormFields>({
    "your-name": "",
    "your-surname": "",
    "your-email": "",
    "your-message": "",
    "acceptance-privacy": false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFields((prev) => ({ ...prev, [name]: newValue } as FormFields));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name as keyof FormErrors];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validateForm(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("loading");
    try {
      const fd = new FormData();
      fd.append("_wpcf7", "35");
      fd.append("_wpcf7_version", "5.9");
      fd.append("_wpcf7_locale", "it_IT");
      fd.append("_wpcf7_unit_tag", "wpcf7-f35-p1-o1");
      fd.append("your-name", fields["your-name"]);
      fd.append("your-surname", fields["your-surname"]);
      fd.append("your-email", fields["your-email"]);
      fd.append("your-message", fields["your-message"]);
      if (fields["acceptance-privacy"]) {
        fd.append("acceptance-privacy", "1");
      }
      const res = await fetch(CF7_ENDPOINT, { method: "POST", body: fd });
      const data = (await res.json()) as {
        status: string;
        message?: string;
        invalid_fields?: { message: string }[];
      };
      if (data.status === "mail_sent") {
        setStatus("success");
      } else {
        const msg =
          data.message ??
          data.invalid_fields?.[0]?.message ??
          "Si è verificato un errore. Riprova.";
        setErrorMessage(msg);
        setStatus("error");
      }
    } catch {
      setErrorMessage("Errore di connessione. Controlla la tua rete e riprova.");
      setStatus("error");
    }
  }

  function inputStyle(fieldName: string): React.CSSProperties {
    const isFocused = focusedField === fieldName;
    return {
      ...BASE_INPUT_STYLE,
      border: `1px solid ${isFocused ? "var(--color-accent)" : "var(--color-border)"}`,
      background: isFocused ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
    };
  }

  return (
    <main>
      <style>{`
        input::placeholder,
        textarea::placeholder {
          color: var(--color-text-muted);
          opacity: 0.5;
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: isMobile ? "50vh" : "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile ? "7rem 1.25rem 2.5rem" : "12rem 2rem 4rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div ref={heroRef}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              marginBottom: "1.5rem",
            }}
          >
            Contatti
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile
                ? "clamp(2.5rem, 10vw, 7rem)"
                : "clamp(3rem, 12vw, 13rem)",
              lineHeight: 0.9,
              marginBottom: isMobile ? "2rem" : "3rem",
            }}
          >
            Hai un
            <br />
            progetto
            <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px var(--color-muted)",
              }}
            >
              in mente?
            </span>
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "0.75rem" : "2rem",
              alignItems: isMobile ? "flex-start" : "center",
            }}
          >
            <a
              href="mailto:info@francescobattisti.com"
              style={{
                fontSize: "0.9rem",
                letterSpacing: "0.05em",
                color: "var(--color-fg)",
                fontFamily: "var(--font-body)",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              info@francescobattisti.com
            </a>
            {!isMobile && (
              <span
                style={{
                  color: "var(--color-border)",
                  fontSize: "0.85rem",
                  userSelect: "none",
                }}
              >
                ·
              </span>
            )}
            <a
              href="https://www.linkedin.com/in/francesco-battisti/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-body)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-fg)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-muted)")
              }
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section style={{ padding: isMobile ? "2.5rem 1.25rem 5rem" : "4rem 2rem 8rem" }}>
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-body)",
            marginBottom: isMobile ? "2rem" : "4rem",
          }}
        >
          Scrivimi
        </p>

        <div ref={formRef} style={{ maxWidth: "640px", margin: "0 auto" }}>
          {status === "success" ? (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                padding: isMobile ? "3rem 1.5rem" : "6rem 4rem",
                border: "1px solid var(--color-border)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isMobile
                    ? "clamp(3rem, 14vw, 5rem)"
                    : "clamp(3rem, 6vw, 6rem)",
                  lineHeight: 1,
                }}
              >
                Messaggio inviato.
              </p>
              <a
                href="/"
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-body)",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-fg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-muted)")
                }
              >
                ← Torna alla home
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                {/* Nome + Cognome */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? "1.75rem" : "1.5rem",
                  }}
                >
                  {/* Nome */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="your-name" style={LABEL_STYLE}>
                      Nome
                    </label>
                    <input
                      id="your-name"
                      name="your-name"
                      type="text"
                      value={fields["your-name"]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("your-name")}
                      onBlur={() => setFocusedField(null)}
                      style={inputStyle("your-name")}
                      autoComplete="given-name"
                    />
                    {errors["your-name"] && (
                      <span style={ERROR_STYLE}>{errors["your-name"]}</span>
                    )}
                  </div>

                  {/* Cognome */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="your-surname" style={LABEL_STYLE}>
                      Cognome
                    </label>
                    <input
                      id="your-surname"
                      name="your-surname"
                      type="text"
                      value={fields["your-surname"]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("your-surname")}
                      onBlur={() => setFocusedField(null)}
                      style={inputStyle("your-surname")}
                      autoComplete="family-name"
                    />
                    {errors["your-surname"] && (
                      <span style={ERROR_STYLE}>{errors["your-surname"]}</span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="your-email" style={LABEL_STYLE}>
                    Email
                  </label>
                  <input
                    id="your-email"
                    name="your-email"
                    type="email"
                    value={fields["your-email"]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("your-email")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle("your-email")}
                    autoComplete="email"
                  />
                  {errors["your-email"] && (
                    <span style={ERROR_STYLE}>{errors["your-email"]}</span>
                  )}
                </div>

                {/* Messaggio */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="your-message" style={LABEL_STYLE}>
                    Messaggio
                  </label>
                  <textarea
                    id="your-message"
                    name="your-message"
                    rows={5}
                    value={fields["your-message"]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("your-message")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...inputStyle("your-message"),
                      resize: "vertical",
                      minHeight: "120px",
                    }}
                  />
                  {errors["your-message"] && (
                    <span style={ERROR_STYLE}>{errors["your-message"]}</span>
                  )}
                </div>

                {/* Privacy */}
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="acceptance-privacy"
                      checked={fields["acceptance-privacy"]}
                      onChange={handleChange}
                      style={{
                        marginTop: "0.15rem",
                        accentColor: "var(--color-fg)",
                        width: "16px",
                        height: "16px",
                        flexShrink: 0,
                        cursor: "pointer",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-text-muted)",
                        fontFamily: "var(--font-body)",
                        lineHeight: 1.6,
                      }}
                    >
                      Ho letto e accetto la{" "}
                      <a
                        href="https://www.iubenda.com/privacy-policy/34436341"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--color-accent)",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {errors["acceptance-privacy"] && (
                    <span style={{ ...ERROR_STYLE, marginTop: "0.5rem" }}>
                      {errors["acceptance-privacy"]}
                    </span>
                  )}
                </div>

                {/* Error globale CF7 */}
                {status === "error" && errorMessage && (
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-body)",
                      padding: "1rem",
                      border: "1px solid var(--color-accent)",
                      lineHeight: 1.6,
                    }}
                  >
                    {errorMessage}
                  </p>
                )}

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="cta-magnetic"
                    style={{
                      display: "inline-block",
                      width: isMobile ? "100%" : "auto",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--color-bg)",
                      backgroundColor: "var(--color-fg)",
                      padding: "1rem 3rem",
                      border: "none",
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      opacity: status === "loading" ? 0.6 : 1,
                      transition: "opacity 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (status !== "loading")
                        e.currentTarget.style.opacity = "0.8";
                    }}
                    onMouseLeave={(e) => {
                      if (status !== "loading")
                        e.currentTarget.style.opacity = "1";
                    }}
                  >
                    {status === "loading" ? "Invio in corso..." : "Invia →"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
