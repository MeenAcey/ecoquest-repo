"use client";
import { useEffect, useState } from "react";
import { getXP, getRank, RANK_THRESHOLDS } from "@/lib/xp";
import { motion } from "framer-motion";

const RANK_KEYS = Object.keys(RANK_THRESHOLDS);

export default function PlayerStats({ compact = false }: { compact?: boolean }) {
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState("Seedling");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setXp(getXP());
    setRank(getRank());
  }, []);

  if (!mounted) return null;

  const rankIndex = RANK_KEYS.indexOf(rank);
  const prevThreshold = rankIndex > 0 ? RANK_THRESHOLDS[RANK_KEYS[rankIndex - 1]] : 0;
  const nextThreshold = RANK_THRESHOLDS[rank] ?? 100;
  const nextRank = RANK_KEYS[rankIndex + 1] ?? "Max Rank";
  const xpInLevel = xp - prevThreshold;
  const totalXPPerLevel = nextThreshold - prevThreshold;
  const xpProgress = nextRank === "Max Rank" ? 100 : Math.min((xpInLevel / totalXPPerLevel) * 100, 100);

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-[#141622]/90 border border-[#3d4460] px-3 py-1 rounded-full text-xs">
        <span className="hoyo-title text-[9px] tracking-widest text-[#a6a9b2]">{rank.toUpperCase()}</span>
        <span className="w-1 h-1 bg-[#d3bc8e] rounded-full" />
        <span className="hoyo-title text-[#ffd700] font-bold">{xp} XP</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#181b2a]/90 border border-[#3d4460] p-4 rounded-sm flex flex-col gap-2 relative overflow-hidden shadow-lg">
      <div className="flex justify-between items-center z-10 relative">
        <div>
          <span className="hoyo-title text-[9px] tracking-[2px] text-[#6b7280]">OPERATIVE RANK</span>
          <h3 className="hoyo-title text-base sm:text-lg text-[#ece5d8] leading-tight font-bold">{rank.toUpperCase()}</h3>
        </div>
        <div className="text-right">
          <span className="hoyo-title text-[9px] tracking-[2px] text-[#6b7280]">TOTAL XP</span>
          <div className="hoyo-title text-base sm:text-lg text-[#ffd700] leading-tight font-bold">{xp} XP</div>
        </div>
      </div>

      <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-white/5 relative z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${xpProgress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#a8904f] via-[#ffd700] to-[#d3bc8e]"
        />
      </div>

      <div className="flex justify-between text-[9px] text-[#6b7280] hoyo-title tracking-wider z-10 relative">
        <span>{rank.toUpperCase()}</span>
        <span className="text-[#d3bc8e]">{xpInLevel} / {totalXPPerLevel} XP</span>
        <span>{nextRank.toUpperCase()}</span>
      </div>
    </div>
  );
}
