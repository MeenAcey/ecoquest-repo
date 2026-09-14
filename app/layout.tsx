import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import "./globals.css";
import HydrationWrapper from "@/components/HydrationWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoQuest | Material Scanner & Transmutation Matrix",
  description: "HoYoverse-inspired environmental item scanner. Decode discarded materials, upcycle artifacts, earn XP, and preserve Earth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ptSerif.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body
        className="min-h-full flex flex-col text-[#ece5d8] bg-[#0e0f1a] selection:bg-[#d3bc8e]/30 selection:text-[#ffd700]"
        suppressHydrationWarning={true}
      >
        <HydrationWrapper>
          <Navbar />
          <div className="flex-1 flex flex-col pt-16">
            {children}
          </div>
          <Footer />
        </HydrationWrapper>
      </body>
    </html>
  );
}
