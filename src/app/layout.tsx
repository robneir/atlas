import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3, Noto_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { TopBar } from "@/components/layout/TopBar";
import { SearchWrapper } from "@/components/layout/SearchModal";
import { OnboardingWrapper } from "@/components/onboarding/OnboardingWrapper";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Atlas — Explore the History of Everything",
  description:
    "An open-source, community-driven platform where anyone can explore, contribute, and discover the history of everything.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSans.variable} ${notoSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
          <ThemeProvider>
            <AuthProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[999] focus:rounded-md focus:bg-[var(--atlas-accent)] focus:px-4 focus:py-2 focus:text-white focus:font-semibold focus:text-sm"
              >
                Skip to main content
              </a>
              <OnboardingWrapper />
              <TopBar />
              <SearchWrapper />
              <main id="main-content" className="pt-[54px]">{children}</main>
            </AuthProvider>
          </ThemeProvider>
        </body>
    </html>
  );
}
