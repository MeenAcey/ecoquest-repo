"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HangingGems from "@/components/HangingGems";
import FloatingDiamonds from "@/components/FloatingDiamonds";
import AmbientGlows from "@/components/AmbientGlows";

export default function AboutPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const degradationData = [
    { material: "Glass Bottle / Jar", time: "1,000,000+ Years", impact: "Low toxicity, high space & endless recycling potential", rarity: "Rare" },
    { material: "PET Plastic Water Bottle", time: "450 - 500 Years", impact: "Decomposes into toxic microplastics that enter food chains", rarity: "Common" },
    { material: "Aluminum Soda Can", time: "200 - 250 Years", impact: "High energy cost to smelt virgin ore; saves 95% energy when recycled", rarity: "Rare" },
    { material: "Plastic Shopping Bag", time: "20 - 100 Years", impact: "Severe threat to marine life; blocks drainage networks", rarity: "Common" },
    { material: "Corrugated Cardboard Box", time: "2 - 6 Months", impact: "Biodegradable, releases methane in anaerobic landfills without air", rarity: "Common" },
    { material: "Lithium-Ion / Alkaline Battery", time: "100+ Years", impact: "Leaches lead, cadmium, and sulfuric acid into ground water", rarity: "Legendary" },
    { material: "E-Waste / Circuit Boards", time: "Indefinite", impact: "Contains hazardous heavy metals & reclaimable precious gold/copper", rarity: "Epic" },
  ];

  const faqs = [
    {
      q: "What is the core objective of the EcoQuest Transmutation Matrix?",
      a: "EcoQuest turns everyday waste management into an engaging, gamified science experience. By scanning and cataloging discarded items, operatives learn the exact chemical properties of materials, receive bespoke upcycling routines, and accumulate planetary XP."
    },
    {
      q: "How does the AI identify materials and assign rarity grades?",
      a: "The neural scanner evaluates image features, object classifications, and multimodal visual reasoning via Qwen VL. Materials are mapped to rarity tiers based on their environmental hazard index and reclamation difficulty: Common (organic/paper/PET), Rare (metals/glass), Epic (electronics/machinery), and Legendary (hazardous/chemical/battery cells)."
    },
    {
      q: "What is the difference between Recycling and Upcycling?",
      a: "Recycling breaks down physical waste into raw base matter (often requiring industrial energy). Upcycling creatively converts existing discarded artifacts into higher-value functional items (like planter pots, rustic lanterns, and organizer caddies) with zero industrial footprint."
    },
    {
      q: "Are scanned items saved permanently in my personal terminal?",
      a: "Yes! Every scanned artifact is stored in your local databank archives and synced with the central repository. You can search, filter by material, and sort your lifetime collection anytime via the Archives view."
    }
  ];

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 relative overflow-hidden text-[#ece5d8]"
      style={{ background: "#0e0f1a", fontFamily: "'Crimson Text', serif" }}
    >
      <HangingGems />
      <FloatingDiamonds />
      <AmbientGlows />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .hoyo-title { font-family: 'Cinzel', serif; }
        .hoyo-serif { font-family: 'Crimson Text', serif; }
        .about-card {
          border: 1px solid #3d4460;
          background: rgba(24,27,42,0.85);
          backdrop-blur: 8px;
          clip-path: polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px));
        }
      `}</style>

      <div className="w-full max-w-5xl z-10 flex flex-col gap-10 pb-16">

        {/* Page Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#d3bc8e]" />
            <span className="hoyo-title text-[#d3bc8e] tracking-[0.3em] text-[10px] sm:text-xs font-bold">
              PLANETARY COMPENDIUM
            </span>
            <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#d3bc8e]" />
          </div>
          <h1
            className="hoyo-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider"
            style={{
              background: "linear-gradient(180deg,#fff 0%,#ece5d8 40%,#a08040 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Lore & Eco Knowledge
          </h1>
          <p className="hoyo-serif text-sm sm:text-base italic text-[#a6a9b2] max-w-2xl leading-relaxed">
            "Every shard of discarded matter carries the memory of Earth’s energy. By observing, cataloging, and transmuting our waste, we restore balance to the biosphere."
          </p>
        </div>

        {/* Section 1: The Initiative */}
        <div className="about-card p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#3d4460]/60 pb-3">
            <span className="text-[#ffd700] text-base">✦</span>
            <h2 className="hoyo-title text-base sm:text-lg text-[#ece5d8] font-bold tracking-wider">
              PROJECT TERRABYTE & THE TRANSMUTATION ENGINE
            </h2>
          </div>
          <p className="hoyo-serif text-sm sm:text-base text-[#a6a9b2] leading-relaxed">
            In our modern epoch, billions of tons of polymer, metallic alloys, and electrochemical compounds accumulate in landfills and oceans. <strong className="text-[#ece5d8]">EcoQuest</strong> bridges cutting-edge computer vision with environmental science, empowering everyday operatives to scan objects, analyze their degradation life cycles, and execute creative zero-waste upcycling.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-black/30 p-4 border border-[#2e3347] rounded-xs text-center">
              <span className="hoyo-title text-xl font-bold text-[#ffd700] block">450+ Yrs</span>
              <span className="hoyo-serif text-xs text-[#a6a9b2]">Avg Plastic Bottle Life</span>
            </div>
            <div className="bg-black/30 p-4 border border-[#2e3347] rounded-xs text-center">
              <span className="hoyo-title text-xl font-bold text-[#7bb3f0] block">95%</span>
              <span className="hoyo-serif text-xs text-[#a6a9b2]">Energy Saved via Recycling Metal</span>
            </div>
            <div className="bg-black/30 p-4 border border-[#2e3347] rounded-xs text-center">
              <span className="hoyo-title text-xl font-bold text-[#d3bc8e] block">100%</span>
              <span className="hoyo-serif text-xs text-[#a6a9b2]">Endless Recyclability of Pure Glass</span>
            </div>
          </div>
        </div>

        {/* Section 2: Material Degradation Timeline Table */}
        <div className="about-card p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#3d4460]/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[#ffd700] text-base">◈</span>
              <h2 className="hoyo-title text-base sm:text-lg text-[#ece5d8] font-bold tracking-wider">
                MATERIAL DEGRADATION TIMELINE
              </h2>
            </div>
            <span className="hoyo-title text-[9px] tracking-wider text-[#d3bc8e] hidden sm:inline">
              SOURCE: GLOBAL ECO DATA
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#141622] text-[#d3bc8e] hoyo-title tracking-wider text-[10px] border-b border-[#3d4460]">
                  <th className="p-3">MATERIAL ARTIFACT</th>
                  <th className="p-3">DEGRADATION TIME</th>
                  <th className="p-3">ENVIRONMENTAL HAZARD & PROFILE</th>
                  <th className="p-3">RARITY TIER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3d4460]/30 hoyo-serif">
                {degradationData.map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-[#ece5d8] hoyo-title text-xs">{row.material}</td>
                    <td className="p-3 text-[#ffd700] font-bold">{row.time}</td>
                    <td className="p-3 text-[#a6a9b2] leading-relaxed max-w-sm">{row.impact}</td>
                    <td className="p-3">
                      <span className={`hoyo-title text-[10px] font-bold ${
                        row.rarity === "Legendary"
                          ? "text-[#ffd700]"
                          : row.rarity === "Epic"
                          ? "text-[#c77dff]"
                          : row.rarity === "Rare"
                          ? "text-[#7bb3f0]"
                          : "text-[#a0a0a0]"
                      }`}>
                        {row.rarity.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Interactive FAQ Section */}
        <div className="about-card p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#3d4460]/60 pb-3">
            <span className="text-[#ffd700] text-base">⚒</span>
            <h2 className="hoyo-title text-base sm:text-lg text-[#ece5d8] font-bold tracking-wider">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#3d4460] bg-[#141622]/80 rounded-xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex justify-between items-center gap-4 hover:bg-white/5 transition-colors focus:outline-none"
                  >
                    <span className="hoyo-title text-xs sm:text-sm font-bold text-[#ece5d8] tracking-wide">
                      {faq.q}
                    </span>
                    <span className="text-[#d3bc8e] font-mono text-base flex-shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-[#3d4460]/40 p-4 bg-black/20"
                      >
                        <p className="hoyo-serif text-sm text-[#a6a9b2] leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: System Architecture & Technical Specifications */}
        <div className="about-card p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#3d4460]/60 pb-3">
            <span className="text-[#ffd700] text-base">⚡</span>
            <h2 className="hoyo-title text-base sm:text-lg text-[#ece5d8] font-bold tracking-wider">
              TECHNICAL SPECIFICATIONS & ARCHITECTURE
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs hoyo-serif">
            <div className="bg-black/30 p-4 border border-[#2e3347] rounded-xs flex flex-col gap-1.5">
              <span className="hoyo-title text-[10px] text-[#d3bc8e] font-bold tracking-widest">FRONTEND LAYER</span>
              <p className="text-[#a6a9b2]">
                Next.js App Router with React 19, TypeScript, Tailwind CSS responsive utilities, and Framer Motion spring physics.
              </p>
            </div>
            <div className="bg-black/30 p-4 border border-[#2e3347] rounded-xs flex flex-col gap-1.5">
              <span className="hoyo-title text-[10px] text-[#d3bc8e] font-bold tracking-widest">NEURAL SCANNER API</span>
              <p className="text-[#a6a9b2]">
                Asynchronous Next.js REST API routes (`/api/analyze`, `/api/items`) integrated with Roboflow Qwen VL vision-language models and multi-tier fallbacks.
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Link href="/scanner">
              <button className="hero-btn">
                ⚡ LAUNCH MATERIAL SCANNER
              </button>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
