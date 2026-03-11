import type { Metadata } from "next";
import "@/styles/globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import PageTransition from "@/components/layout/PageTransition";
import SceneLoader from "@/components/canvas/SceneLoader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { TransitionProvider } from "@/context/TransitionContext";

export const metadata: Metadata = {
  title: {
    default: "Francesco Battisti — WordPress Developer",
    template: "%s | Francesco Battisti",
  },
  description: "WordPress Developer freelance. Realizzo siti web e e-commerce su misura per PMI, startup e agenzie.",
  keywords: ["wordpress developer", "siti web", "e-commerce", "woocommerce", "freelance", "italia"],
  authors: [{ name: "Francesco Battisti" }],
  creator: "Francesco Battisti",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Francesco Battisti",
    title: "Francesco Battisti — WordPress Developer",
    description: "WordPress Developer freelance. Realizzo siti web e e-commerce su misura per PMI, startup e agenzie.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Francesco Battisti — WordPress Developer",
    description: "WordPress Developer freelance. Realizzo siti web e e-commerce su misura per PMI, startup e agenzie.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body suppressHydrationWarning>
        <TransitionProvider>
          <LenisProvider>
            <CustomCursor />
            <SceneLoader />
            <div id="content">
              <Header />
              <PageTransition>
                {children}
              </PageTransition>
              <Footer />
            </div>
          </LenisProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}