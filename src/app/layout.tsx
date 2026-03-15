import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import PageTransition from "@/components/layout/PageTransition";
import SceneLoader from "@/components/canvas/SceneLoader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { TransitionProvider } from "@/context/TransitionContext";
import { ThemeProvider } from "@/context/ThemeContext";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

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
    <html lang="it" className={`${bebasNeue.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <TransitionProvider>
            <LenisProvider>
              <CustomCursor />
              <ScrollToTop />
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
        </ThemeProvider>
      </body>
    </html>
  );
}