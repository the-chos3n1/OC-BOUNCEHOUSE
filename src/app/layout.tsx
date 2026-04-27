import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteConfig } from "@/content/site";

const geistSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} · Orange County bounce house rentals`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${display.variable}`}>
      <body className="relative min-h-dvh font-sans text-base leading-relaxed">
        <a
          href="#main-content"
          className="absolute left-4 top-0 z-[100] -translate-y-24 rounded-md bg-card px-4 py-2 text-sm font-medium text-foreground shadow-md transition-transform focus:translate-y-4 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
