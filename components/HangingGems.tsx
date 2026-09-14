"use client";
import { motion } from "framer-motion";

export default function HangingGems() {
  const gems = [
    { left: "3%", threadH: 70, size: 14, dur: 3.8 },
    { left: "10%", threadH: 110, size: 10, dur: 4.2 },
    { left: "18%", threadH: 50, size: 18, dur: 3.5 },
    { left: "76%", threadH: 90, size: 12, dur: 4.0 },
    { left: "84%", threadH: 60, size: 16, dur: 3.6 },
    { left: "92%", threadH: 120, size: 10, dur: 4.5 },
    { left: "6%", threadH: 150, size: 8, dur: 5.0 },
    { left: "89%", threadH: 140, size: 9, dur: 4.8 },
    { left: "95%", threadH: 55, size: 13, dur: 3.9 },
  ];

  return (
    <div className="absolute inset-x-0 top-0 h-40 pointer-events-none overflow-hidden z-10">
      {gems.map((g, i) => (
        <motion.div
          key={i}
          className="absolute top-0 flex flex-col items-center"
          style={{ left: g.left, transformOrigin: "top center" }}
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: g.dur, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-px"
            style={{
              height: g.threadH,
              background: "linear-gradient(180deg,rgba(211,188,142,0.08),rgba(211,188,142,0.3),rgba(211,188,142,0.08))",
            }}
          />
          <div
            className="relative flex-shrink-0"
            style={{
              width: g.size,
              height: g.size,
              transform: "rotate(45deg)",
              border: "1px solid rgba(211,188,142,0.55)",
              background: "rgba(211,188,142,0.05)",
            }}
          >
            <div className="absolute inset-[2px] border border-[rgba(211,188,142,0.18)]" />
            <div
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                width: g.size * 3,
                height: g.size * 3,
                transform: "translate(-50%,-50%) rotate(-45deg)",
                background: "radial-gradient(circle,rgba(211,188,142,0.12) 0%,transparent 70%)",
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
