import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import "./globals.css";
import HydrationWrapper from "@/components/HydrationWrapper";

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoQuest | Event Menu",
  description: "HoYoverse-style item scanner. Scan trash, earn XP.",
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
        className="min-h-full flex flex-col text-[#3E3228] bg-[#2C2623]"
        suppressHydrationWarning={true}
      >
        <HydrationWrapper>
          {children}
        </HydrationWrapper>
      </body>
    </html>
  );
}
