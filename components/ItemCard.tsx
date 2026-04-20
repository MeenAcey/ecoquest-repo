import React from 'react';

type ItemData = {
  itemName: string;
  material: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  description: string;
  upcycleRecipe: string;
  xp: number;
  ecoFact: string;
};

export default function ItemCard({ data }: { data: ItemData }) {
  // Pastel/Watercolor Rarity Scale
  const rarityConfig = {
    Common: { color: "text-[#8BA19A]", bg: "bg-[#8BA19A]/10", border: "border-[#8BA19A]/30", icon: "✦" },
    Rare: { color: "text-[#6B8EAD]", bg: "bg-[#6B8EAD]/10", border: "border-[#6B8EAD]/30", icon: "✦✦" },
    Epic: { color: "text-[#987DA3]", bg: "bg-[#987DA3]/10", border: "border-[#987DA3]/30", icon: "✦✦✦" },
    Legendary: { color: "text-[#CCA677]", bg: "bg-[#CCA677]/15", border: "border-[#CCA677]/50", icon: "✦✦✦✦✦" },
  };

  const currentRarity = rarityConfig[data.rarity] || rarityConfig.Common;

  return (
    <div className="mt-8 w-full max-w-2xl bg-parchment rounded-sm animate-enter relative p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      <div className="border-ornate p-8 flex flex-col relative bg-white/40">
        <div className="border-ornate-inner"></div>

        {/* Decorative Top Flourish */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[10px] bg-parchment px-4 z-10">
          <svg className="w-8 h-4 text-[var(--gold)]" viewBox="0 0 50 20" fill="none"><path d="M25 0 L50 20 L0 20 Z" fill="currentColor" opacity="0.3"/><path d="M25 5 L40 20 L10 20 Z" fill="currentColor"/></svg>
        </div>
        
        {/* Header Segment */}
        <div className="flex flex-col items-center mb-10 text-center relative z-10">
            {/* Styled Tag */}
            <div className={`mb-5 px-6 py-1 ${currentRarity.bg} ${currentRarity.border} border rounded-[1px] relative overflow-hidden`}>
               <span className={`text-[10px] font-bold uppercase tracking-[0.4em] relative z-10 ${currentRarity.color}`}>
                 {data.rarity} {currentRarity.icon}
               </span>
            </div>
            <h2 className="text-3xl font-bold text-stamp tracking-[0.05em] uppercase px-4 mb-3">
              {data.itemName}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-[var(--gold)] opacity-40"></span>
              <p className="text-[10px] font-bold text-[#A69380] uppercase tracking-[0.4em]">{data.material}</p>
              <span className="w-12 h-[1px] bg-[var(--gold)] opacity-40"></span>
            </div>
        </div>

        {/* Content Segment */}
        <div className="mb-10 px-8 text-center relative z-10">
          <p className="italic text-[#5E5247] text-[15px] leading-relaxed tracking-wide relative inline-block">
            <span className="absolute -left-6 -top-2 text-3xl text-[var(--gold)] opacity-30 font-serif leading-none">"</span>
            {data.description}
            <span className="absolute -right-6 -bottom-4 text-3xl text-[var(--gold)] opacity-30 font-serif leading-none">"</span>
          </p>
        </div>

        {/* Data Sections */}
        <div className="flex flex-col md:flex-row gap-5 mb-4 relative z-10">
          <div className="flex-1 bg-white/60 p-6 border border-[#E5D7C5] relative">
            {/* Corner pins */}
            <div className="absolute top-2 left-2 w-1 h-1 bg-[var(--gold)]/50 rounded-full"></div>
            <div className="absolute top-2 right-2 w-1 h-1 bg-[var(--gold)]/50 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-[var(--gold)]/50 rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-[var(--gold)]/50 rounded-full"></div>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[var(--gold)] text-xs">✦</span>
              <h3 className="font-bold text-[10px] text-stamp tracking-[0.3em] uppercase">Upcycle Routine</h3>
              <span className="text-[var(--gold)] text-xs">✦</span>
            </div>
            <p className="text-xs text-[#7A6C5D] text-center leading-relaxed">{data.upcycleRecipe}</p>
          </div>

          <div className="w-full md:w-1/3 bg-white/60 p-6 border border-[#E5D7C5] flex flex-col justify-center items-center relative">
            <div className="absolute top-2 left-2 w-1 h-1 bg-[var(--gold)]/50 rounded-full"></div>
            <div className="absolute top-2 right-2 w-1 h-1 bg-[var(--gold)]/50 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-[var(--gold)]/50 rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-[var(--gold)]/50 rounded-full"></div>
            
            <div className="text-[9px] font-bold text-[#A69380] uppercase tracking-[0.3em] mb-2">XP Yield</div>
            <div className="text-4xl font-serif text-[#4A3C31] flex items-baseline gap-1">
              <span className="text-xl text-[var(--gold)] font-sans">+</span>
              {data.xp}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-5 border-t border-dashed border-[#CCA677]/40 flex justify-center text-center relative z-10">
           <div>
             <div className="text-[8px] font-bold text-[#7A6C5D] uppercase tracking-[0.4em] mb-2">— Log Entry —</div>
             <p className="text-[11px] text-[#A69380] italic leading-relaxed">{data.ecoFact}</p>
           </div>
        </div>

      </div>
    </div>
  );
}
