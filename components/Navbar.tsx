"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getXP, getRank } from "@/lib/xp";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState("Seedling");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setXp(getXP());
    setRank(getRank());

    const handleStorageChange = () => {
      setXp(getXP());
      setRank(getRank());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/", icon: "◈" },
    { name: "Scanner", href: "/scanner", icon: "⚡" },
    { name: "Archives", href: "/history", icon: "📚" },
    { name: "About Lore", href: "/about", icon: "✦" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0e0f1a]/85 backdrop-blur-md border-b border-[#3d4460]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand / Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-sm bg-[#1c1f2c] border border-[#d3bc8e]/60 flex items-center justify-center text-[#d3bc8e] text-sm font-bold shadow-[0_0_12px_rgba(211,188,142,0.2)] group-hover:scale-105 transition-transform">
              ✦
            </div>
            <div className="flex flex-col">
              <span className="hoyo-title text-base sm:text-lg font-bold tracking-wider text-[#ece5d8] group-hover:text-[#ffd700] transition-colors leading-none">
                ECOQUEST
              </span>
              <span className="hoyo-title text-[8px] tracking-[3px] text-[#a6a9b2]">
                TRANSMUTATION MATRIX
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-sm hoyo-title text-xs tracking-[2px] transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "text-[#ffd700] bg-[#d3bc8e]/10 border border-[#d3bc8e]/40 shadow-[0_0_10px_rgba(211,188,142,0.15)] font-bold"
                      : "text-[#a6a9b2] hover:text-[#ece5d8] hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className="text-[10px] opacity-70">{link.icon}</span>
                  {link.name.toUpperCase()}
                </Link>
              );
            })}
          </div>

          {/* Player Stats Pill & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {mounted && (
              <div className="hidden sm:flex items-center gap-2 bg-[#181b2a] border border-[#3d4460] px-3 py-1 rounded-full text-xs shadow-inner">
                <span className="hoyo-title text-[9px] tracking-wider text-[#6b7280]">RANK</span>
                <span className="hoyo-title text-[10px] font-bold text-[#ece5d8]">{rank.toUpperCase()}</span>
                <span className="w-1 h-1 bg-[#d3bc8e] rounded-full" />
                <span className="hoyo-title text-[11px] font-bold text-[#ffd700]">+{xp} XP</span>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-sm text-[#d3bc8e] hover:bg-[#1c1f2c] border border-[#3d4460] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-[#3d4460] bg-[#141622] px-4 pt-2 pb-4 space-y-2 shadow-2xl"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-sm hoyo-title text-xs tracking-[2px] transition-colors ${
                    isActive
                      ? "text-[#ffd700] bg-[#d3bc8e]/15 border border-[#d3bc8e]/40 font-bold"
                      : "text-[#ece5d8] hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.name.toUpperCase()}
                </Link>
              );
            })}

            {mounted && (
              <div className="pt-2 mt-2 border-t border-[#3d4460]/50 flex justify-between items-center px-4 text-xs">
                <span className="hoyo-title text-[#a6a9b2]">CURRENT RANK: {rank.toUpperCase()}</span>
                <span className="hoyo-title text-[#ffd700] font-bold">{xp} XP</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
