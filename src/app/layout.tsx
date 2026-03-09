import type { Metadata } from "next";
import "@/styles/globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import PageTransition from "@/components/layout/PageTransition";
import SceneLoader from "@/components/canvas/SceneLoader";

export const metadata: Metadata = {
  title: {
    default: "My WP Theme",
    template: "%s | My WP Theme",
  },
  description: "WordPress Headless Theme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body suppressHydrationWarning>
        <LenisProvider>
          {/* Canvas Three.js — dietro tutto */}
          <SceneLoader />

          {/* Contenuto pagina */}
          <div id="content">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}