"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export type ItemData = {
  id?: string;
  itemName: string;
  material: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  description: string;
  upcycleRecipe: string;
  xp: number;
  ecoFact: string;
  timestamp?: number;
  isWaste?: boolean;
};

export default function ItemCard({ data, onDelete }: { data: ItemData; onDelete?: () => void }) {
  const [copied, setCopied] = useState(false);

  const rarityStyles = {
    Common: {
      tagColor: "text-[#a0a0a0]",
      borderColor: "border-[#a0a0a0]/30",
      bgGlow: "bg-[#a0a0a0]/5",
      starCount: 2,
      label: "COMMON",
    },
    Rare: {
      tagColor: "text-[#7bb3f0]",
      borderColor: "border-[#7bb3f0]/30",
      bgGlow: "bg-[#7bb3f0]/5",
      starCount: 3,
      label: "RARE",
    },
    Epic: {
      tagColor: "text-[#c77dff]",
      borderColor: "border-[#c77dff]/30",
      bgGlow: "bg-[#c77dff]/5",
      starCount: 4,
      label: "EPIC",
    },
    Legendary: {
      tagColor: "text-[#ffd700]",
      borderColor: "border-[#ffd700]/40",
      bgGlow: "bg-[#ffd700]/10",
      starCount: 5,
      label: "LEGENDARY",
    },
  };

  const style = rarityStyles[data.rarity] || rarityStyles.Common;

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(
        `Artifact: ${data.itemName}\nMaterial: ${data.material}\nRarity: ${data.rarity}\nUpcycle: ${data.upcycleRecipe}\nEco Fact: ${data.ecoFact}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={`w-full bg-[#181b2a]/95 border ${style.borderColor} ${style.bgGlow} p-4 sm:p-6 rounded-sm relative overflow-hidden flex flex-col gap-4 shadow-2xl backdrop-blur-sm`}
      style={{
        clipPath: "polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))",
      }}
    >
      {/* Corner Decorative Pins */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-[#d3bc8e]/40 rotate-45" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#d3bc8e]/40 rotate-45" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-[#d3bc8e]/40 rotate-45" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#d3bc8e]/40 rotate-45" />

      {/* Header with Rarity, Date, Actions */}
      <div className="flex justify-between items-start border-b border-[#3d4460]/60 pb-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className={`hoyo-title text-xs font-bold tracking-[2px] ${style.tagColor}`}>
              {"★".repeat(style.starCount)} {style.label}
            </span>
          </div>
          <h3 className="hoyo-title text-lg sm:text-xl font-bold text-[#ece5d8] mt-0.5 tracking-wide">
            {data.itemName}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-[#a6a9b2] hover:text-[#ff6b6b] p-1 text-xs transition-colors"
              title="Delete from archives"
            >
              🗑
            </button>
          )}
          <button
            onClick={handleCopy}
            className="text-[10px] tracking-wider hoyo-title bg-[#141622] hover:bg-[#d3bc8e]/20 text-[#d3bc8e] px-2.5 py-1 rounded border border-[#3d4460] transition-colors"
          >
            {copied ? "COPIED! ✓" : "SHARE 📋"}
          </button>
        </div>
      </div>

      {/* Material & XP Yield Pill */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-black/30 p-2 border border-[#2e3347] rounded-xs">
          <span className="hoyo-title text-[9px] tracking-wider text-[#6b7280] block">TYPE DETECTED</span>
          <span className="hoyo-serif font-bold text-[#ece5d8] truncate block">{data.material}</span>
        </div>
        <div className="bg-black/30 p-2 border border-[#2e3347] rounded-xs text-right">
          <span className="hoyo-title text-[9px] tracking-wider text-[#6b7280] block">XP VALUE</span>
          <span className="hoyo-title font-bold text-[#ffd700] block">+{data.xp} XP</span>
        </div>
      </div>

      {/* Description */}
      <p className="hoyo-serif text-sm italic text-[#d3bc8e]/90 leading-relaxed bg-black/20 p-2.5 border-l-2 border-[#d3bc8e]/60 rounded-r-xs">
        "{data.description}"
      </p>

      {/* Crafting / Upcycling Recipe */}
      <div className="bg-black/40 p-3 border border-[#2e3347] rounded-xs flex flex-col gap-1">
        <span className="hoyo-title text-[9px] tracking-[2px] text-[#a6a9b2] font-bold flex items-center gap-1">
          ⚒ CRAFTING & UPCYCLE ROUTINE
        </span>
        <p className="hoyo-serif text-xs text-[#ece5d8] leading-relaxed">
          {data.upcycleRecipe}
        </p>
      </div>

      {/* Eco Knowledge Log */}
      <div className="bg-black/40 p-3 border border-[#2e3347] rounded-xs flex flex-col gap-1">
        <span className="hoyo-title text-[9px] tracking-[2px] text-[#d3bc8e] font-bold flex items-center gap-1">
          ◈ ECO LOG ENTRY
        </span>
        <p className="hoyo-serif text-xs text-[#a6a9b2] italic leading-relaxed">
          {data.ecoFact}
        </p>
      </div>

      {/* Timestamp footer if available */}
      {data.timestamp && (
        <div className="text-[9px] tracking-widest text-[#6b7280] hoyo-title text-right pt-1">
          ARCHIVED: {new Date(data.timestamp).toLocaleDateString()} at {new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </motion.div>
  );
}
