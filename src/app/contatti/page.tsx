import type { Metadata } from "next";
import ContattiClient from "@/components/ui/ContattiClient";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Hai un progetto in mente? Contattami per discuterne insieme. WordPress Developer freelance disponibile per siti web, e-commerce e collaborazioni con agenzie.",
};

export default function ContattiPage() {
  return <ContattiClient />;
}