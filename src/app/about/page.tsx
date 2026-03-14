import type { Metadata } from "next";
import AboutClient from "@/components/ui/AboutClient";

export const metadata: Metadata = {
  title: "Chi sono",
  description: "WordPress Developer freelance con 10 anni di esperienza. Realizzo siti web e e-commerce su misura con attenzione al dettaglio, performance e UX.",
  openGraph: {
    title: "Chi sono | Francesco Battisti",
    description: "WordPress Developer freelance con 10 anni di esperienza. Realizzo siti web e e-commerce su misura con attenzione al dettaglio, performance e UX.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chi sono | Francesco Battisti",
    description: "WordPress Developer freelance con 10 anni di esperienza. Realizzo siti web e e-commerce su misura con attenzione al dettaglio, performance e UX.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}