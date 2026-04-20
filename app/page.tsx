"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getXP, getRank } from "@/lib/xp";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState("");

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
    <main className="min-h-screen bg-[#0e0f1a] flex flex-col items-center justify-center p-4 font-serif text-[#ece5d8] relative overflow-hidden">

      {/* Player Stats Bubble - fixed, follows scroll */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black/60 border border-[#4a5366] rounded-full px-4 py-2 backdrop-blur-md"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)" }}
      >
        <div className="flex flex-col text-right">
          <span className="hoyo-title text-[10px] tracking-widest text-[#a6a9b2]">{rank ? rank.toUpperCase() : "..."}</span>
          <span className="hoyo-title text-[14px] text-[#d3bc8e]">{xp} XP</span>
        </div>
        <div className="w-8 h-8 rounded-full border border-[#d3bc8e] bg-[#1c1f2c] flex items-center justify-center text-[#d3bc8e] text-xs">
          ✦
        </div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        .hoyo-title { font-family: 'Cinzel', serif; }
        .hoyo-serif { font-family: 'Crimson Text', serif; }
        .hero-btn {
          background: rgba(28,31,44,0.6);
          border: 1px solid #d3bc8e;
          color: #d3bc8e;
          padding: 16px 40px;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          letter-spacing: 4px;
          font-size: 12px;
          clip-path: polygon(16px 0%,calc(100% - 16px) 0%,100% 50%,calc(100% - 16px) 100%,16px 100%,0% 50%);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .hero-btn:hover {
          background: rgba(211,188,142,0.1);
          color: #fff;
          border-color: #fff;
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(211,188,142,0.2);
        }
        .feature-box {
          border: 1px solid #4a5366;
          background: rgba(28,31,44,0.8);
          clip-path: polygon(0 8px,8px 0,calc(100% - 8px) 0,100% 8px,100% calc(100% - 8px),calc(100% - 8px) 100%,8px 100%,0 calc(100% - 8px));
          transition: border-color 0.5s;
        }
        .feature-box:hover { border-color: #d3bc8e; }
        .star-particle {
          position: absolute;
          width: 2px; height: 2px;
          background: #d3bc8e;
          border-radius: 50%;
          box-shadow: 0 0 10px 2px rgba(211,188,142,0.5);
        }
        .hanging-gem {
          position: absolute;
          top: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-origin: top center;
          z-index: 1;
        }
        .gem-thread {
          width: 1px;
          background: linear-gradient(180deg,rgba(211,188,142,0.08),rgba(211,188,142,0.3),rgba(211,188,142,0.08));
        }
        .gem-shape {
          transform: rotate(45deg);
          border: 1px solid rgba(211,188,142,0.55);
          background: rgba(211,188,142,0.05);
          position: relative;
          flex-shrink: 0;
        }
        .gem-shape::after {
          content: '';
          position: absolute;
          inset: 2px;
          border: 1px solid rgba(211,188,142,0.18);
        }
      `}</style>

      {/* Ambient glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(52,211,153,0.1) 0%,transparent 70%)" }} />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%)" }} />
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(211,188,142,0.05) 0%,transparent 70%)" }} />

      {/* Hanging gems */}
      {[
        { left: "3%", threadH: 70, size: 14, dur: 3.8 },
        { left: "10%", threadH: 110, size: 10, dur: 4.2 },
        { left: "18%", threadH: 50, size: 18, dur: 3.5 },
        { left: "76%", threadH: 90, size: 12, dur: 4.0 },
        { left: "84%", threadH: 60, size: 16, dur: 3.6 },
        { left: "92%", threadH: 120, size: 10, dur: 4.5 },
        { left: "6%", threadH: 150, size: 8, dur: 5.0 },
        { left: "89%", threadH: 140, size: 9, dur: 4.8 },
        { left: "95%", threadH: 55, size: 13, dur: 3.9 },
      ].map((g, i) => (
        <motion.div
          key={i}
          className="hanging-gem"
          style={{ left: g.left }}
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: g.dur, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="gem-thread" style={{ height: g.threadH }} />
          <div className="gem-shape" style={{ width: g.size, height: g.size }}>
            <div style={{ position: "absolute", borderRadius: "50%", width: g.size * 3, height: g.size * 3, top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(-45deg)", background: "radial-gradient(circle,rgba(211,188,142,0.12) 0%,transparent 70%)" }} />
          </div>
        </motion.div>
      ))}

      {/* Floating diamonds */}
      {[
        { left: "22%", size: 7, dur: 14, delay: 0 },
        { left: "38%", size: 5, dur: 18, delay: 4 },
        { left: "55%", size: 9, dur: 13, delay: 2 },
        { left: "68%", size: 5, dur: 17, delay: 6 },
        { left: "45%", size: 4, dur: 20, delay: 9 },
      ].map((d, i) => (
        <motion.div
          key={i}
          style={{ position: "absolute", left: d.left, top: -20, width: d.size, height: d.size, transform: "rotate(45deg)", border: "1px solid rgba(211,188,142,0.35)", background: "rgba(211,188,142,0.04)", zIndex: 1, pointerEvents: "none" }}
          animate={{ y: [0, 900], opacity: [0, 0.7, 0.5, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

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

      {/* Content */}
      <div className="z-10 w-full max-w-4xl text-center flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6 flex items-center justify-center gap-4"
        >
          <span className="w-16 h-px" style={{ background: "linear-gradient(to right,transparent,#d3bc8e)" }} />
          <span className="hoyo-title text-[#d3bc8e] tracking-[0.4em] text-xs font-bold">PROJECT INITIATIVE</span>
          <span className="w-16 h-px" style={{ background: "linear-gradient(to left,transparent,#d3bc8e)" }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="hoyo-title text-6xl md:text-8xl font-bold tracking-wider mb-8"
          style={{ background: "linear-gradient(180deg,#fff 0%,#ece5d8 40%,#a08040 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textShadow: "none" }}
        >
          EcoQuest
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hoyo-serif text-[#a6a9b2] text-lg md:text-xl italic max-w-2xl leading-relaxed mb-16 px-4"
        >
          "Commune with the discarded artifacts of our world. Reveal their latent potential,
          upcycle fragments into profound tools, and ascend the ranks from a mere Seedling to Earth Champion."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-24"
        >
          <Link href="/scanner">
            <button className="hero-btn">
              INITIATE NEURAL UPLINK
            </button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 max-w-5xl mx-auto">
          {[
            { title: "Identify", icon: "◈", desc: "Scan mundane materials via uplink to uncover their hidden elemental rarity." },
            { title: "Upcycle", icon: "⚒", desc: "Discover ancient synthesizer recipes for physical transmutation and repurpose." },
            { title: "Ascend", icon: "✦", desc: "Gain planetary experience to evolve your rank in the databank hierarchy." },
          ].map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 + i * 0.2 }}
              className="feature-box p-8 text-center flex flex-col items-center justify-center gap-4 cursor-default min-h-[220px]"
            >
              <div className="w-12 h-12 border border-[#4a5366] rounded-full flex items-center justify-center text-[#d3bc8e] text-xl">
                {feat.icon}
              </div>
              <h3 className="hoyo-title text-sm tracking-widest text-[#ece5d8] font-bold">{feat.title.toUpperCase()}</h3>
              <p className="hoyo-serif text-[#6b7280] italic text-[15px] leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="mt-16 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 text-left px-4"
        >
          {/* Instructions */}
          <div className="feature-box p-8 flex flex-col gap-4">
            <h3 className="hoyo-title text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-3 mb-2">HOW TO OPERATE</h3>
            <ol className="hoyo-serif text-[#a6a9b2] italic text-[16px] leading-relaxed list-decimal list-inside space-y-3">
              <li><strong className="text-[#ece5d8]">Initiate Neural Uplink</strong> to access the scanner interface.</li>
              <li><strong className="text-[#ece5d8]">Provide a Photo</strong> of the discarded material you wish to analyze.</li>
              <li><strong className="text-[#ece5d8]">Begin Transmutation</strong> and let the AI scan the item.</li>
              <li><strong className="text-[#ece5d8]">Receive Insights</strong> including the material type, upcycle recipe, and XP.</li>
              <li><strong className="text-[#ece5d8]">Accumulate XP</strong> to ascend your global rank!</li>
            </ol>
          </div>

          {/* Rarity Guide */}
          <div className="feature-box p-8 flex flex-col gap-4">
            <h3 className="hoyo-title text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-3 mb-2">RARITY REWARDS</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center bg-black/20 p-3 border border-[#2e3347] rounded-sm">
                <div className="flex flex-col gap-0.5">
                  <span className="hoyo-title tracking-widest text-[14px]" style={{ color: "#a0a0a0" }}>★★ COMMON</span>
                  <span className="hoyo-serif text-[12px] italic text-[#6b7280]">Plastic, Paper, Cardboard, Box</span>
                </div>
                <span className="hoyo-title text-[#d3bc8e]">25 XP</span>
              </div>
              <div className="flex justify-between items-center bg-black/20 p-3 border border-[#2e3347] rounded-sm">
                <div className="flex flex-col gap-0.5">
                  <span className="hoyo-title tracking-widest text-[14px]" style={{ color: "#7bb3f0" }}>★★★ RARE</span>
                  <span className="hoyo-title text-[10px] tracking-widest text-[#6b7280]">Glass, Metal, Aluminum, Can</span>
                </div>
                <span className="hoyo-title text-[#d3bc8e]">50 XP</span>
              </div>
              <div className="flex justify-between items-center bg-black/20 p-3 border border-[#2e3347] rounded-sm">
                <div className="flex flex-col gap-0.5">
                  <span className="hoyo-title tracking-widest text-[14px]" style={{ color: "#c77dff" }}>★★★★ EPIC</span>
                  <span className="hoyo-title text-[10px] tracking-widest text-[#6b7280]">Electronics, Phone, Wood, Iron</span>
                </div>
                <span className="hoyo-title text-[#d3bc8e]">100 XP</span>
              </div>
              <div className="flex justify-between items-center bg-black/20 p-3 border border-[#2e3347] rounded-sm">
                <div className="flex flex-col gap-0.5">
                  <span className="hoyo-title tracking-widest text-[14px]" style={{ color: "#ffd700" }}>★★★★★ LEGENDARY</span>
                  <span className="hoyo-title text-[10px] tracking-widest text-[#6b7280]">Battery, Chemical, Hazard, PC</span>
                </div>
                <span className="hoyo-title text-[#ffd700]">200 XP</span>
              </div>
            </div>
          </div>

          {/* Rank Guide */}
          <div className="feature-box p-8 flex flex-col gap-4">
            <h3 className="hoyo-title text-lg tracking-widest text-[#ece5d8] border-b border-[#4a5366] pb-3 mb-2">RANK ASCENSION</h3>
            <div className="flex flex-col gap-2">
              {[
                { name: "SEEDLING", xp: "0 XP", color: "#a0a0a0" },
                { name: "SAPLING", xp: "100 XP", color: "#7bb3f0" },
                { name: "GROVE KEEPER", xp: "300 XP", color: "#c77dff" },
                { name: "FOREST GUARDIAN", xp: "600 XP", color: "#ffd700" },
                { name: "EARTH CHAMPION", xp: "1000 XP", color: "#ff8c00" },
                { name: "GAIA LEGEND", xp: "2000 XP", color: "#ff4500" }
              ].map((r) => (
                <div key={r.name} className="flex justify-between items-center bg-black/20 p-2.5 border border-[#2e3347] rounded-sm">
                  <span className="hoyo-title tracking-widest text-[13px]" style={{ color: r.color }}>{r.name}</span>
                  <span className="hoyo-title text-[#d3bc8e] text-[11px]">{r.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="mt-16 hoyo-title text-[10px] tracking-[4px] text-[#8b92a5] flex flex-col items-center gap-1.5"
        >
          <span className="text-[#ece5d8] opacity-80">TERRABYTE</span>
          <div>
            <span style={{ display: "inline-block", width: 5, height: 5, background: "#d3bc8e", transform: "rotate(45deg)", opacity: 0.6, margin: "0 8px", verticalAlign: "middle" }} />
            ECOQUEST • EARTH DAY 2026
            <span style={{ display: "inline-block", width: 5, height: 5, background: "#d3bc8e", transform: "rotate(45deg)", opacity: 0.6, margin: "0 8px", verticalAlign: "middle" }} />
          </div>
        </motion.div>

      </div>
    </main>
  );
}