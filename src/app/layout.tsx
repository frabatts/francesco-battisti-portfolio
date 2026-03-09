import type { Metadata } from "next";
import "@/styles/globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import PageTransition from "@/components/layout/PageTransition";
import SceneLoader from "@/components/canvas/SceneLoader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

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
      </body>
    </html>
  );
}