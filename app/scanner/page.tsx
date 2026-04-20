"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ItemCard from "@/components/ItemCard";
import { getXP, getRank, addXP, RANK_THRESHOLDS } from "@/lib/xp";

const RANK_KEYS = Object.keys(RANK_THRESHOLDS);

function HangingGems() {
  const gems = [
    { left: "4%", threadH: 60, size: 14, delay: 0 },
    { left: "12%", threadH: 100, size: 10, delay: 0.8 },
    { left: "20%", threadH: 45, size: 18, delay: 1.5 },
    { left: "78%", threadH: 80, size: 12, delay: 0.3 },
    { left: "86%", threadH: 55, size: 16, delay: 1.1 },
    { left: "93%", threadH: 110, size: 10, delay: 2.0 },
    { left: "7%", threadH: 140, size: 8, delay: 2.5 },
    { left: "88%", threadH: 135, size: 9, delay: 1.8 },
  ];

  return (
    <>
      {gems.map((g, i) => (
        <motion.div
          key={i}
          style={{ position: "absolute", top: 0, left: g.left, display: "flex", flexDirection: "column", alignItems: "center", transformOrigin: "top center", zIndex: 1 }}
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 3.5 + i * 0.2, delay: g.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{ width: 1, height: g.threadH, background: "linear-gradient(180deg,rgba(211,188,142,0.08),rgba(211,188,142,0.3),rgba(211,188,142,0.08))" }} />
          <div style={{ width: g.size, height: g.size, transform: "rotate(45deg)", border: "1px solid rgba(211,188,142,0.55)", background: "rgba(211,188,142,0.05)", position: "relative", flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: 2, border: "1px solid rgba(211,188,142,0.18)" }} />
            <div style={{ position: "absolute", borderRadius: "50%", width: g.size * 3, height: g.size * 3, top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(-45deg)", background: "radial-gradient(circle,rgba(211,188,142,0.12) 0%,transparent 70%)" }} />
          </div>
        </motion.div>
      ))}
    </>
  );
}

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState("image/jpeg");
  const [result, setResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [xp, setXP] = useState(0);
  const [rank, setRank] = useState("Seedling");
  const [levelUp, setLevelUp] = useState(false);

  useEffect(() => {
    const newXP = getXP();
    const newRank = getRank();
    if (xp > 0 && newRank !== rank) {
      setLevelUp(true);
      setTimeout(() => setLevelUp(false), 4000);
    }
    setXP(newXP);
    setRank(newRank);
  }, [result]);

  const rankIndex = RANK_KEYS.indexOf(rank);
  const prevThreshold = rankIndex > 0 ? RANK_THRESHOLDS[RANK_KEYS[rankIndex - 1]] : 0;
  const nextThreshold = RANK_THRESHOLDS[rank] ?? 100;
  const nextRank = RANK_KEYS[rankIndex + 1] ?? "Max Rank";
  const xpInLevel = xp - prevThreshold;
  const totalXPPerLevel = nextThreshold - prevThreshold;
  const xpProgress = nextRank === "Max Rank" ? 100 : Math.min((xpInLevel / totalXPPerLevel) * 100, 100);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMimeType(file.type);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage((reader.result as string).split(",")[1]);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleScan = async () => {
    if (!image) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: image, mimeType }),
      });

      const payload = await res.json();
      if (!res.ok || payload.error) {
        setErrorMessage(payload.error || "Scan failed. Try again!");
        setResult(null);
      } else {
        const normalizedResult = {
          ...payload,
          xp: Number(payload.xp || 0),
          itemName: payload.itemName || payload.name || "Unknown Artifact",
          material: payload.material || "Recyclable Artifact",
          rarity: payload.rarity || "Common",
          description: payload.description || "No description available.",
          upcycleRecipe: payload.upcycleRecipe || "No upcycle idea could be generated.",
          ecoFact: payload.ecoFact || "No eco fact available.",
        };

        setResult(normalizedResult);
        const addedXP = Number(normalizedResult.xp || 0);
        if (addedXP > 0) {
          addXP(addedXP);
          setXP(getXP());
          setRank(getRank());
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Scan failed. Try again!");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "#0e0f1a", fontFamily: "'Crimson Text', serif", color: "#ece5d8" }}>

      <Link href="/" className="absolute top-6 left-6 z-20">
        <button className="return-btn">
          <span className="text-lg leading-none mt-[-2px]">‹</span> RETURN
        </button>
      </Link>

      {/* Hanging gems */}
      <HangingGems />

      {/* Floating diamonds */}
      {[
        { left: "15%", size: 8, dur: 12, delay: 0 },
        { left: "25%", size: 5, dur: 16, delay: 3 },
        { left: "70%", size: 10, dur: 14, delay: 1.5 },
        { left: "82%", size: 6, dur: 18, delay: 5 },
        { left: "60%", size: 5, dur: 17, delay: 2 },
      ].map((d, i) => (
        <motion.div key={i}
          style={{ position: "absolute", left: d.left, top: -20, width: d.size, height: d.size, transform: "rotate(45deg)", border: "1px solid rgba(211,188,142,0.4)", background: "rgba(211,188,142,0.04)", zIndex: 1 }}
          animate={{ y: [0, 800], opacity: [0, 0.8, 0.6, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Ambient glows */}
      <div className="absolute top-[-20%] left-[-15%] w-[50%] h-[50%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(52,211,153,0.07) 0%,transparent 65%)" }} />
      <div className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[50%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 65%)" }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .hoyo-title { font-family: 'Cinzel', serif; }
        .hoyo-serif { font-family: 'Crimson Text', serif; }
        .genshin-card {
          background: linear-gradient(160deg, #1e2235 0%, #181b2a 50%, #141620 100%);
          border: 1.5px solid #3d4460;
          box-shadow: 0 0 0 1px rgba(211,188,142,0.08), 0 30px 70px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.03);
          clip-path: polygon(0 12px,12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px));
        }
        .card-inner {
          border: 1px solid #2e3347;
          margin: 4px;
          padding: 20px;
          clip-path: polygon(0 10px,10px 0,calc(100% - 10px) 0,100% 10px,100% calc(100% - 10px),calc(100% - 10px) 100%,10px 100%,0 calc(100% - 10px));
        }
        .rank-badge {
          background: linear-gradient(135deg,#d3bc8e,#a8904f);
          color: #1a1208;
          font-size: 9px; padding: 2px 10px;
          font-weight: 700; letter-spacing: 1px;
          clip-path: polygon(8px 0%,calc(100% - 8px) 0%,100% 50%,calc(100% - 8px) 100%,8px 100%,0% 50%);
          display: inline-block; margin-top: 6px;
        }
        .xp-bar-fill {
          background: linear-gradient(90deg,#c9a227,#fde68a,#d3bc8e);
          height: 100%; border-radius: 2px; position: relative;
          transition: width 0.8s ease;
        }
        .xp-bar-fill::after {
          content: ''; position: absolute; right: 0; top: 0; bottom: 0;
          width: 4px; background: rgba(255,255,255,0.8); border-radius: 2px;
        }
        .upload-zone {
          border: 1px solid rgba(211,188,142,0.2);
          background: rgba(0,0,0,0.3);
          clip-path: polygon(0 6px,6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px));
          transition: all 0.3s; cursor: pointer; position: relative;
        }
        .upload-zone:hover { border-color: rgba(211,188,142,0.6); background: rgba(211,188,142,0.03); }
        .upload-zone:hover .upload-icon { border-color: rgba(211,188,142,0.8); color: #d3bc8e; }
        .upload-icon {
          width: 48px; height: 48px;
          border: 1.5px solid rgba(211,188,142,0.3);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; color: rgba(211,188,142,0.35);
          transition: all 0.3s;
        }
        .corner { position: absolute; width: 14px; height: 14px; border-color: rgba(211,188,142,0.35); border-style: solid; }
        .corner.tl { top:8px; left:8px; border-width:1px 0 0 1px; }
        .corner.tr { top:8px; right:8px; border-width:1px 1px 0 0; }
        .corner.bl { bottom:8px; left:8px; border-width:0 0 1px 1px; }
        .corner.br { bottom:8px; right:8px; border-width:0 1px 1px 0; }
        .return-btn {
          background: rgba(236,229,216,0.1); color: #ece5d8; border: none;
          font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700;
          letter-spacing: 2px; padding: 10px 18px; cursor: pointer;
          clip-path: polygon(12px 0%,calc(100% - 12px) 0%,100% 50%,calc(100% - 12px) 100%,12px 100%,0% 50%);
          transition: all 0.2s; display: flex; align-items: center; gap: 6px;
        }
        .return-btn:hover { background: #ece5d8; color: #1c1f2c; transform: scale(1.05); }
        .scan-btn {
          background: #ece5d8; color: #1c1f2c; border: none;
          font-family: 'Cinzel', serif; font-size: 11px; font-weight: 700;
          letter-spacing: 3px; padding: 13px; width: 100%; cursor: pointer;
          clip-path: polygon(12px 0%,calc(100% - 12px) 0%,100% 50%,calc(100% - 12px) 100%,12px 100%,0% 50%);
          transition: all 0.2s;
        }
        .scan-btn:hover:not(:disabled) { background: #fff; transform: scale(1.02); box-shadow: 0 0 20px rgba(236,229,216,0.3); }
        .scan-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .info-block {
          background: rgba(0,0,0,0.4); border: 1px solid #2e3347; padding: 10px 12px;
          clip-path: polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px));
        }
        .divider { height: 1px; background: linear-gradient(90deg,transparent,#4a5366,transparent); }
        .rarity-common { color: #a0a0a0; }
        .rarity-rare { color: #7bb3f0; }
        .rarity-epic { color: #c77dff; }
        .rarity-legendary { color: #ffd700; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="genshin-card w-full max-w-[440px] relative z-10"
      >
        <div className="absolute inset-0 bg-[#d3bc8e] opacity-15 blur-[60px] pointer-events-none rounded-2xl" />
        <div className="card-inner flex flex-col gap-5 relative z-10">

          {/* Header */}
          {/* Grouped XP and Level Status */}
          <div className="info-block relative overflow-hidden flex flex-col gap-3" style={{ background: "linear-gradient(180deg, rgba(30,34,53,0.8), rgba(24,27,42,0.9))" }}>
            <div className="flex justify-between items-center z-10 relative">
              <div>
                <div className="hoyo-title text-[9px] tracking-[2px] text-[#6b7280] mb-1">LEVEL INDICATOR</div>
                <div className="hoyo-title text-[20px] text-[#ece5d8] leading-none">{rank.toUpperCase()}</div>
              </div>
              <div className="text-right">
                {result && result.xp > 0 ? (
                  <>
                    <div className="hoyo-title text-[9px] tracking-[2px] text-[#6b7280] mb-1">XP POINTS GAINED</div>
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="hoyo-title text-[20px] text-[#ffd700] leading-none">
                      +{result.xp} XP
                    </motion.div>
                  </>
                ) : (
                  <>
                    <div className="hoyo-title text-[9px] tracking-[2px] text-[#6b7280] mb-1">LIFETIME XP</div>
                    <div className="hoyo-title text-[20px] text-[#d3bc8e] leading-none">{xp}</div>
                  </>
                )}
              </div>
            </div>

            <div className="z-10 relative">
              <div className="bg-black/50 h-[4px] rounded-sm overflow-hidden border border-white/[0.03]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="xp-bar-fill"
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="hoyo-title text-[9px] text-[#3d4255] tracking-[1px]">{rank.toUpperCase()}</span>
                <span className="hoyo-title text-[10px] text-[#d3bc8e]">{xpInLevel} / {totalXPPerLevel}</span>
                <span className="hoyo-title text-[9px] text-[#3d4255] tracking-[1px]">{nextRank.toUpperCase()}</span>
              </div>
            </div>

            <AnimatePresence>
              {levelUp && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#ffd700]/15 flex flex-col items-center justify-center backdrop-blur-[2px] z-20 border border-[#ffd700]/30 rounded-sm"
                >
                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="hoyo-title text-[#ffd700] text-[22px] font-bold tracking-[4px] drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]"
                  >
                    LEVEL UP!
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Upload */}
          <div>
            <div className="hoyo-title text-[9px] tracking-[3px] text-[#6b7280] text-center mb-3">✦ MATERIAL IDENTIFICATION ✦</div>
            <label className="upload-zone h-[148px] flex flex-col items-center justify-center gap-3 block">
              <div className="corner tl" /><div className="corner tr" />
              <div className="corner bl" /><div className="corner br" />
              {image ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full h-full p-2"
                >
                  <div className="w-full h-full relative rounded-sm overflow-hidden border border-[rgba(211,188,142,0.3)]">
                    <img
                      src={`data:${mimeType};base64,${image}`}
                      alt="Material Preview"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
                      <div className="hoyo-title text-[#d3bc8e] text-[10px] tracking-widest drop-shadow-md">✦ MATERIAL READY ✦</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="upload-icon">+</div>
                  <div className="hoyo-title text-[11px] tracking-[3px] text-[#6b7280]">TAP TO PROVIDE MATERIAL</div>
                  <div className="hoyo-serif text-[11px] text-[#3d4255] italic">Any artifact or item accepted</div>
                </>
              )}
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleUpload} />
            </label>
          </div>



          {/* Scan Button */}
          <button className="scan-btn" onClick={handleScan} disabled={!image || loading}>
            {loading ? "⟳  ANALYZING PATH..." : "⚡  BEGIN TRANSMUTATION"}
          </button>

          {/* Another Scan Button */}
          {result && !loading && (
            <motion.button
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => {
                setImage(null);
                setResult(null);
                setErrorMessage(null);
              }}
              className="w-full text-center py-2 text-[#d3bc8e] hover:text-[#fff] hoyo-title text-[10px] tracking-[3px] transition-colors border border-transparent hover:border-[rgba(211,188,142,0.3)] rounded-sm"
            >
              ⟲ ANOTHER SCAN
            </motion.button>
          )}

          {/* Result */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="info-block"
                style={{ borderColor: "#eab308", background: "rgba(234,179,8,0.12)" }}
              >
                <div className="hoyo-title text-[10px] tracking-[3px] text-[#ffd700] mb-2">SCAN ERROR</div>
                <div className="hoyo-serif text-[12px] text-[#f8f1d8]">{errorMessage}</div>
              </motion.div>
            )}

            {result && !errorMessage && (
              <motion.div
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 15 }}
                className="flex flex-col gap-3"
                style={{ transformOrigin: "center", background: "rgba(0,0,0,0.3)", border: "1px solid #4a5366", padding: 16, clipPath: "polygon(0 6px,6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px))" }}
              >
                <div>
                  <div className={`hoyo-title text-[10px] tracking-[4px] font-bold rarity-${result.rarity?.toLowerCase()}`}>
                    {"★".repeat(result.rarity === "Legendary" ? 5 : result.rarity === "Epic" ? 4 : result.rarity === "Rare" ? 3 : 2)} {result.rarity?.toUpperCase()}
                  </div>
                  <div className="hoyo-title text-[22px] font-bold text-[#ece5d8] mt-1 mb-2">{result.itemName || "Unknown Artifact"}</div>
                  <div className="hoyo-serif text-[15px] font-bold text-[#ece5d8]">
                    <span className="text-[#a6a9b2] font-normal">Type of Waste Detected:</span> {result.material || "Recyclable Artifact"}
                  </div>
                  <div className="hoyo-serif text-[15px] font-bold text-[#ffd700] mt-1">
                    <span className="text-[#a6a9b2] font-normal">XP Points Worth:</span> +{result.xp || 0} XP
                  </div>
                </div>
                <div className="divider" />
                <div className="hoyo-serif text-[15px] font-semibold text-[#ece5d8] italic leading-relaxed">{result.description || "No description available."}</div>
                <div className="info-block">
                  <div className="hoyo-title text-[10px] tracking-[3px] text-[#6b7280] mb-2 font-bold">⚒ CRAFTING RECIPE</div>
                  <div className={`text-[16px] font-bold rarity-${result.rarity?.toLowerCase()}`}>{result.upcycleRecipe || "No upcycle idea could be generated."}</div>
                </div>
                <div className="info-block">
                  <div className="hoyo-title text-[10px] tracking-[3px] text-[#6b7280] mb-2 font-bold">◈ ECO KNOWLEDGE</div>
                  <div className="hoyo-serif text-[15px] font-semibold text-[#ece5d8] italic leading-relaxed">{result.ecoFact || "No eco fact available."}</div>
                </div>


              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>

      <div className="hoyo-title text-[10px] tracking-[4px] text-[#8b92a5] text-center flex flex-col items-center gap-1.5 mt-8 z-10 relative">
        <span className="text-[#ece5d8] opacity-80">TERRABYTE</span>
        <div>
          <span style={{ display: "inline-block", width: 6, height: 6, background: "#d3bc8e", transform: "rotate(45deg)", opacity: 0.6, margin: "0 6px", verticalAlign: "middle" }} />
          ECOQUEST • EARTH DAY 2026
          <span style={{ display: "inline-block", width: 6, height: 6, background: "#d3bc8e", transform: "rotate(45deg)", opacity: 0.6, margin: "0 6px", verticalAlign: "middle" }} />
        </div>
      </div>
    </main>
  );
}