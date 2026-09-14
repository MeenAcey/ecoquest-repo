"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getXP, getRank } from "@/lib/xp";
import HangingGems from "@/components/HangingGems";
import FloatingDiamonds from "@/components/FloatingDiamonds";
import AmbientGlows from "@/components/AmbientGlows";
import PlayerStats from "@/components/PlayerStats";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState("Seedling");

  useEffect(() => {
    setMounted(true);
    setXp(getXP());
    setRank(getRank());
  }, []);

  if (!mounted) return null;

  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.floor(Math.random() * 100)}vw`,
    top: `${Math.floor(Math.random() * 100)}vh`,
    scale: Math.random() * 1 + 0.5,
    xDrift: `${(Math.random() - 0.5) * 50}%`,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <main className="min-h-screen bg-[#0e0f1a] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-serif text-[#ece5d8] relative overflow-hidden">
      
      {/* Visual background components */}
      <HangingGems />
      <FloatingDiamonds />
      <AmbientGlows />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .hoyo-title { font-family: 'Cinzel', serif; }
        .hoyo-serif { font-family: 'Crimson Text', serif; }
        .hero-btn {
          background: rgba(28,31,44,0.7);
          border: 1.5px solid #d3bc8e;
          color: #d3bc8e;
          padding: 14px 32px;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          letter-spacing: 3px;
          font-size: 11px;
          clip-path: polygon(14px 0%, calc(100% - 14px) 0%, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0% 50%);
          transition: all 0.3s;
          cursor: pointer;
        }
        .hero-btn:hover {
          background: #d3bc8e;
          color: #0e0f1a;
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(211,188,142,0.4);
        }
        .hero-btn-secondary {
          background: rgba(20,22,34,0.6);
          border: 1px solid #4a5366;
          color: #ece5d8;
          padding: 14px 28px;
          font-family: 'Cinzel', serif;
          font-weight: 600;
          letter-spacing: 2px;
          font-size: 11px;
          clip-path: polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%);
          transition: all 0.3s;
        }
        .hero-btn-secondary:hover {
          border-color: #d3bc8e;
          color: #ffd700;
          background: rgba(211,188,142,0.1);
        }
        .feature-box {
          border: 1px solid #3d4460;
          background: rgba(24,27,42,0.85);
          backdrop-blur: 8px;
          clip-path: polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px));
          transition: all 0.4s ease;
        }
        .feature-box:hover {
          border-color: #d3bc8e;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .star-particle {
          position: absolute;
          width: 2px; height: 2px;
          background: #d3bc8e;
          border-radius: 50%;
          box-shadow: 0 0 10px 2px rgba(211,188,142,0.5);
        }
      `}</style>

      {/* Star particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="star-particle"
            style={{ left: p.left, top: p.top, scale: p.scale }}
            animate={{ y: ["0%", "-1000%"], x: ["0%", p.xDrift], opacity: [0, 0.8, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="z-10 w-full max-w-5xl text-center flex flex-col items-center pt-8 sm:pt-12 pb-16">

        {/* Initiative Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 flex items-center justify-center gap-3 sm:gap-4"
        >
          <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#d3bc8e]" />
          <span className="hoyo-title text-[#d3bc8e] tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs font-bold">
            TERRABYTE INITIATIVE
          </span>
          <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#d3bc8e]" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hoyo-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-6"
          style={{
            background: "linear-gradient(180deg,#fff 0%,#ece5d8 40%,#a08040 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          EcoQuest
        </motion.h1>

        {/* Subtitle Lore */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hoyo-serif text-[#a6a9b2] text-base sm:text-lg md:text-xl italic max-w-2xl leading-relaxed mb-8 px-4"
        >
          "Commune with the discarded artifacts of our world. Reveal their latent potential,
          upcycle fragments into profound tools, and ascend the ranks from a mere Seedling to Earth Champion."
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full max-w-md px-4"
        >
          <Link href="/scanner" className="w-full sm:w-auto">
            <button className="hero-btn w-full sm:w-auto">
              ⚡ INITIATE SCANNER
            </button>
          </Link>
          <Link href="/history" className="w-full sm:w-auto">
            <button className="hero-btn-secondary w-full sm:w-auto">
              📚 VIEW ARCHIVES
            </button>
          </Link>
        </motion.div>

        {/* Live Operative Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-lg mb-16 px-4"
        >
          <PlayerStats />
        </motion.div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 mb-16">
          {[
            { title: "Identify", icon: "◈", desc: "Scan everyday discarded items to decode their material composition and environmental rarity." },
            { title: "Upcycle", icon: "⚒", desc: "Discover bespoke synthesizer recipes to repurpose waste into functional tools and art." },
            { title: "Ascend", icon: "✦", desc: "Gain planetary experience points (XP) to evolve your rank in the global eco databank." },
          ].map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 + i * 0.2 }}
              className="feature-box p-6 sm:p-8 text-center flex flex-col items-center justify-center gap-3 cursor-default"
            >
              <div className="w-12 h-12 border border-[#4a5366] rounded-full flex items-center justify-center text-[#d3bc8e] text-xl bg-[#141622]">
                {feat.icon}
              </div>
              <h3 className="hoyo-title text-sm tracking-[2px] text-[#ece5d8] font-bold">{feat.title.toUpperCase()}</h3>
              <p className="hoyo-serif text-[#a6a9b2] italic text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Guides & Tables Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 text-left px-4"
        >
          {/* Instructions */}
          <div className="feature-box p-6 sm:p-8 flex flex-col gap-4">
            <h3 className="hoyo-title text-base sm:text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-3">
              OPERATING PROTOCOL
            </h3>
            <ol className="hoyo-serif text-[#a6a9b2] italic text-sm leading-relaxed list-decimal list-inside space-y-2.5">
              <li><strong className="text-[#ece5d8]">Initiate Scanner</strong> to access the transmutation camera.</li>
              <li><strong className="text-[#ece5d8]">Upload or Snap</strong> a clear image of any recyclable item.</li>
              <li><strong className="text-[#ece5d8]">Run Neural Scan</strong> to extract material and text data.</li>
              <li><strong className="text-[#ece5d8]">Harvest Recipes & XP</strong> and add items to your archives.</li>
              <li><strong className="text-[#ece5d8]">Ascend Ranks</strong> toward Earth Champion status!</li>
            </ol>
          </div>

          {/* Rarity Guide */}
          <div className="feature-box p-6 sm:p-8 flex flex-col gap-4">
            <h3 className="hoyo-title text-base sm:text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-3">
              RARITY CLASSIFICATION
            </h3>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center bg-black/30 p-2.5 border border-[#2e3347] rounded-xs">
                <div>
                  <span className="hoyo-title tracking-wider text-xs font-bold text-[#a0a0a0]">★★ COMMON</span>
                  <span className="hoyo-serif text-[11px] italic text-[#6b7280] block">Plastic, Paper, Cardboard, Box</span>
                </div>
                <span className="hoyo-title text-[#d3bc8e] font-bold text-xs">+25 XP</span>
              </div>
              <div className="flex justify-between items-center bg-black/30 p-2.5 border border-[#2e3347] rounded-xs">
                <div>
                  <span className="hoyo-title tracking-wider text-xs font-bold text-[#7bb3f0]">★★★ RARE</span>
                  <span className="hoyo-serif text-[11px] italic text-[#6b7280] block">Glass, Metal, Aluminum, Tin</span>
                </div>
                <span className="hoyo-title text-[#d3bc8e] font-bold text-xs">+50 XP</span>
              </div>
              <div className="flex justify-between items-center bg-black/30 p-2.5 border border-[#2e3347] rounded-xs">
                <div>
                  <span className="hoyo-title tracking-wider text-xs font-bold text-[#c77dff]">★★★★ EPIC</span>
                  <span className="hoyo-serif text-[11px] italic text-[#6b7280] block">Electronics, Phone, Appliance</span>
                </div>
                <span className="hoyo-title text-[#d3bc8e] font-bold text-xs">+100 XP</span>
              </div>
              <div className="flex justify-between items-center bg-black/30 p-2.5 border border-[#2e3347] rounded-xs">
                <div>
                  <span className="hoyo-title tracking-wider text-xs font-bold text-[#ffd700]">★★★★★ LEGENDARY</span>
                  <span className="hoyo-serif text-[11px] italic text-[#6b7280] block">Battery, Hazard, Propane Tank</span>
                </div>
                <span className="hoyo-title text-[#ffd700] font-bold text-xs">+200 XP</span>
              </div>
            </div>
          </div>

          {/* Rank Guide */}
          <div className="feature-box p-6 sm:p-8 flex flex-col gap-4">
            <h3 className="hoyo-title text-base sm:text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-3">
              ASCENSION HIERARCHY
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { name: "SEEDLING", xp: "0 XP", color: "#a0a0a0" },
                { name: "SAPLING", xp: "100 XP", color: "#7bb3f0" },
                { name: "GROVE KEEPER", xp: "300 XP", color: "#c77dff" },
                { name: "FOREST GUARDIAN", xp: "600 XP", color: "#ffd700" },
                { name: "EARTH CHAMPION", xp: "1000 XP", color: "#ff8c00" },
                { name: "GAIA LEGEND", xp: "2000 XP", color: "#ff4500" },
              ].map((r) => (
                <div key={r.name} className="flex justify-between items-center bg-black/30 p-2 border border-[#2e3347] rounded-xs">
                  <span className="hoyo-title tracking-wider text-xs font-bold" style={{ color: r.color }}>
                    {r.name}
                  </span>
                  <span className="hoyo-title text-[#d3bc8e] text-xs">{r.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}