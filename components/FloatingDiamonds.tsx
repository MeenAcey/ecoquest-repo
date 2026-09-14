"use client";
import { motion } from "framer-motion";

export default function FloatingDiamonds() {
  const diamonds = [
    { left: "12%", size: 7, dur: 14, delay: 0 },
    { left: "28%", size: 5, dur: 18, delay: 4 },
    { left: "52%", size: 9, dur: 13, delay: 2 },
    { left: "74%", size: 6, dur: 17, delay: 6 },
    { left: "88%", size: 5, dur: 20, delay: 8 },
    { left: "42%", size: 4, dur: 22, delay: 10 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {diamonds.map((d, i) => (
        <motion.div
          key={i}
          className="absolute border border-[rgba(211,188,142,0.35)] bg-[rgba(211,188,142,0.04)]"
          style={{
            left: d.left,
            top: -20,
            width: d.size,
            height: d.size,
            transform: "rotate(45deg)",
          }}
          animate={{ y: [0, 1000], opacity: [0, 0.7, 0.5, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
