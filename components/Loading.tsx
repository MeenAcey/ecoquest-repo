"use client";
import { motion } from "framer-motion";

interface LoadingProps {
  text?: string;
  subtext?: string;
}

export default function Loading({ text = "ANALYZING ARTIFACT MATRIX...", subtext = "Decoding material composition & elemental signatures" }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center gap-4">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer Rotating Diamond Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute inset-0 border-2 border-dashed border-[#d3bc8e]/50 rounded-sm"
          style={{ transform: "rotate(45deg)" }}
        />
        {/* Inner Counter Rotating Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="absolute inset-2 border border-[#d3bc8e]/80"
          style={{ transform: "rotate(45deg)" }}
        />
        {/* Center Pulsing Spark */}
        <motion.div
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-[#ffd700] text-xl font-bold select-none drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
        >
          ✦
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <h4 className="hoyo-title text-sm tracking-[3px] text-[#ece5d8] font-bold">
          {text}
        </h4>
        <p className="hoyo-serif text-xs italic text-[#a6a9b2]">
          {subtext}
        </p>
      </div>
    </div>
  );
}
