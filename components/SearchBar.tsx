"use client";
import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  count?: number;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search archives by name, material, or keyword...",
  count,
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-[#d3bc8e]/60 text-sm pointer-events-none select-none">
          🔍
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#141622]/90 border border-[#3d4460] focus:border-[#d3bc8e] text-[#ece5d8] placeholder-[#6b7280] text-sm pl-10 pr-20 py-2.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d3bc8e]/50 transition-all hoyo-serif shadow-inner"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-14 text-xs text-[#a6a9b2] hover:text-white px-1.5 py-0.5 rounded transition-colors"
            title="Clear search"
          >
            ✕
          </button>
        )}
        {typeof count === "number" && (
          <span className="absolute right-3 text-[10px] tracking-wider text-[#d3bc8e] font-mono bg-black/40 px-2 py-0.5 border border-[#3d4460] rounded-xs select-none">
            {count} found
          </span>
        )}
      </div>
    </div>
  );
}
