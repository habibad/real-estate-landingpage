import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elyse-residence.com"),
  title: "ELYSE | Holistic Luxury In Perfect Harmony",
  description:
    "Welcome to Elyse Residence, where timeless design, wellness-focused living and cultural enrichment converge in order to create an unparalleled sanctuary of elegance and serenity.",
  keywords: ["Elyse", "Luxury Real Estate", "Duplex Residences", "Wellness Living", "Architecture"],
  openGraph: {
    title: "ELYSE | Holistic Luxury Residences",
    description: "Where timeless design, wellness-focused living and cultural enrichment converge.",
    images: [{ url: "/images/hero-villa-v2.jpg" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${plusJakarta.variable} bg-[#0c0d0e] text-white selection:bg-neutral-800 selection:text-white antialiased`}
    >
      <body className="bg-[#0c0d0e] text-[#ededed] font-sans overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
