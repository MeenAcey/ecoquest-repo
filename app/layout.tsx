import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import "./globals.css";
import HydrationWrapper from "@/components/HydrationWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayerStats from "@/components/PlayerStats";

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoQuest | Scan. Upcycle. Ascend.",
  description:
    "A gamified waste identification app. Scan items, discover upcycling recipes, earn XP, and climb the ranks from Seedling to Gaia Legend.",
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
        className="min-h-full flex flex-col bg-[#0e0f1a]"
        suppressHydrationWarning={true}
      >
        <HydrationWrapper>
          <Navbar />
          {children}
          <Footer />
          <PlayerStats />
        </HydrationWrapper>
      </body>
    </html>
  );
}
