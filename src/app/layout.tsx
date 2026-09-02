import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wovenest Living — Furniture for a Warmer Home",
    template: "%s | Wovenest Living",
  },
  description:
    "Wovenest Living is a demo furniture showcase — premium sofas, chairs, tables, beds, lighting and decor, designed for a warmer, slower kind of home.",
  keywords: [
    "furniture",
    "sofa",
    "home decor",
    "interior design",
    "Wovenest Living",
  ],
  openGraph: {
    title: "Wovenest Living — Furniture for a Warmer Home",
    description:
      "Premium sofas, chairs, tables, beds, lighting and decor — a demo furniture showcase by Ataullah Mesbah.",
    url: siteUrl,
    siteName: "Wovenest Living",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wovenest Living — Furniture for a Warmer Home",
    description:
      "Premium sofas, chairs, tables, beds, lighting and decor — a demo furniture showcase.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <SmoothScrollProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
