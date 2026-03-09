import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <section style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1>About Page</h1>
          <Link href="/" style={{ color: "white", marginTop: "1rem", display: "block" }}>
            ← Torna alla Home
          </Link>
        </div>
      </section>
    </main>
  );
}