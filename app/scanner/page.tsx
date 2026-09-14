"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ItemCard from "@/components/ItemCard";
import HangingGems from "@/components/HangingGems";
import FloatingDiamonds from "@/components/FloatingDiamonds";
import AmbientGlows from "@/components/AmbientGlows";
import Loading from "@/components/Loading";
import { getXP, getRank, addXP, RANK_THRESHOLDS } from "@/lib/xp";
import { saveToHistory } from "@/lib/history";

const RANK_KEYS = Object.keys(RANK_THRESHOLDS);

export default function ScannerPage() {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState("image/jpeg");
  const [result, setResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [xp, setXP] = useState(0);
  const [rank, setRank] = useState("Seedling");
  const [levelUp, setLevelUp] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setXP(getXP());
    setRank(getRank());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const newXP = getXP();
    const newRank = getRank();
    if (xp > 0 && newRank !== rank) {
      setLevelUp(true);
      const timer = setTimeout(() => setLevelUp(false), 4000);
      return () => clearTimeout(timer);
    }
    setXP(newXP);
    setRank(newRank);
  }, [result, mounted]);

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
    setMimeType(file.type || "image/jpeg");
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      const base64 = res.includes(",") ? res.split(",")[1] : res;
      setImage(base64);
      setResult(null);
      setErrorMessage(null);
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
        setErrorMessage(payload.error || "Unable to retrieve the data. Please try again.");
        setResult(null);
      } else {
        const normalizedResult = {
          itemName: payload.itemName || payload.name || "Identified Artifact",
          material: payload.material || "Recyclable Material",
          rarity: (payload.rarity || "Common") as "Common" | "Rare" | "Epic" | "Legendary",
          description: payload.description || "Identified physical artifact.",
          upcycleRecipe: payload.upcycleRecipe || "Repurpose this item responsibly to reduce environmental impact.",
          xp: Number(payload.xp || 25),
          ecoFact: payload.ecoFact || "Every recycled item preserves vital resources.",
          timestamp: Date.now(),
          isWaste: payload.isWaste !== false,
        };

        setResult(normalizedResult);

        // Save scan result to history
        try {
          saveToHistory(normalizedResult);
        } catch (e) {
          console.warn("Could not save to history:", e);
        }

        // Add XP and refresh rank
        if (normalizedResult.xp > 0) {
          addXP(normalizedResult.xp);
          setXP(getXP());
          setRank(getRank());
        }
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage("Unable to retrieve the data. Please check your connection and try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setErrorMessage(null);
  };

  if (!mounted) return null;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 relative overflow-hidden"
      style={{ background: "#0e0f1a", fontFamily: "'Crimson Text', serif", color: "#ece5d8" }}
    >
      <HangingGems />
      <FloatingDiamonds />
      <AmbientGlows />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .hoyo-title { font-family: 'Cinzel', serif; }
        .hoyo-serif { font-family: 'Crimson Text', serif; }
        .genshin-card {
          background: linear-gradient(160deg, #1e2235 0%, #181b2a 50%, #141620 100%);
          border: 1.5px solid #3d4460;
          box-shadow: 0 0 0 1px rgba(211,188,142,0.08), 0 30px 70px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.03);
          clip-path: polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px));
        }
        .card-inner {
          border: 1px solid #2e3347;
          margin: 4px;
          padding: 16px;
          clip-path: polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px));
        }
        @media (min-width: 640px) {
          .card-inner {
            padding: 22px;
          }
        }
        .xp-bar-fill {
          background: linear-gradient(90deg, #c9a227, #fde68a, #d3bc8e);
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
          clip-path: polygon(0 6px, 6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px));
          transition: all 0.3s; cursor: pointer; position: relative;
        }
        .upload-zone:hover { border-color: rgba(211,188,142,0.6); background: rgba(211,188,142,0.03); }
        .upload-zone:hover .upload-icon { border-color: rgba(211,188,142,0.8); color: #d3bc8e; }
        .upload-icon {
          width: 44px; height: 44px;
          border: 1.5px solid rgba(211,188,142,0.3);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; color: rgba(211,188,142,0.35);
          transition: all 0.3s;
        }
        .corner { position: absolute; width: 14px; height: 14px; border-color: rgba(211,188,142,0.35); border-style: solid; }
        .corner.tl { top:8px; left:8px; border-width:1px 0 0 1px; }
        .corner.tr { top:8px; right:8px; border-width:1px 1px 0 0; }
        .corner.bl { bottom:8px; left:8px; border-width:0 0 1px 1px; }
        .corner.br { bottom:8px; right:8px; border-width:0 1px 1px 0; }
        .scan-btn {
          background: #ece5d8; color: #1c1f2c; border: none;
          font-family: 'Cinzel', serif; font-size: 11px; font-weight: 700;
          letter-spacing: 3px; padding: 13px; width: 100%; cursor: pointer;
          clip-path: polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%);
          transition: all 0.2s;
        }
        .scan-btn:hover:not(:disabled) { background: #fff; transform: scale(1.02); box-shadow: 0 0 20px rgba(236,229,216,0.3); }
        .scan-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .info-block {
          background: rgba(0,0,0,0.4); border: 1px solid #2e3347; padding: 10px 12px;
          clip-path: polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px));
        }
      `}</style>

      {/* Main Container */}
      <div className="w-full max-w-lg lg:max-w-4xl xl:max-w-5xl z-10 flex flex-col items-center">
        
        {/* Title / Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
            <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#d3bc8e]" />
            <span className="hoyo-title text-[#d3bc8e] tracking-[0.3em] text-[10px] sm:text-xs font-bold">
              TRANSMUTATION MATRIX
            </span>
            <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#d3bc8e]" />
          </div>
          <h1
            className="hoyo-title text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider"
            style={{
              background: "linear-gradient(180deg,#fff 0%,#ece5d8 40%,#a08040 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Material Scanner
          </h1>
        </motion.div>

        {/* Dynamic Layout: Single Column for Scanner vs Dual-Column with Result Card on large screens */}
        <div className={`w-full ${result ? "grid grid-cols-1 lg:grid-cols-2 gap-6 items-start" : "max-w-md mx-auto"}`}>
          
          {/* Scanner Input Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="genshin-card w-full relative"
          >
            <div className="absolute inset-0 bg-[#d3bc8e] opacity-15 blur-[60px] pointer-events-none rounded-2xl" />
            <div className="card-inner flex flex-col gap-4 sm:gap-5 relative z-10">

              {/* Grouped XP and Level Status */}
              <div
                className="info-block relative overflow-hidden flex flex-col gap-2.5 sm:gap-3"
                style={{ background: "linear-gradient(180deg, rgba(30,34,53,0.8), rgba(24,27,42,0.9))" }}
              >
                <div className="flex justify-between items-center z-10 relative">
                  <div>
                    <div className="hoyo-title text-[9px] tracking-[2px] text-[#6b7280] mb-1">LEVEL INDICATOR</div>
                    <div className="hoyo-title text-lg sm:text-[20px] text-[#ece5d8] leading-none">{rank.toUpperCase()}</div>
                  </div>
                  <div className="text-right">
                    {result && result.xp > 0 ? (
                      <>
                        <div className="hoyo-title text-[9px] tracking-[2px] text-[#6b7280] mb-1">XP POINTS GAINED</div>
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="hoyo-title text-lg sm:text-[20px] text-[#ffd700] leading-none"
                        >
                          +{result.xp} XP
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <div className="hoyo-title text-[9px] tracking-[2px] text-[#6b7280] mb-1">LIFETIME XP</div>
                        <div className="hoyo-title text-lg sm:text-[20px] text-[#d3bc8e] leading-none">{xp}</div>
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
                    <span className="hoyo-title text-[8px] sm:text-[9px] text-[#4a5366] tracking-[1px]">{rank.toUpperCase()}</span>
                    <span className="hoyo-title text-[9px] sm:text-[10px] text-[#d3bc8e]">{xpInLevel} / {totalXPPerLevel}</span>
                    <span className="hoyo-title text-[8px] sm:text-[9px] text-[#4a5366] tracking-[1px]">{nextRank.toUpperCase()}</span>
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
                        className="hoyo-title text-[#ffd700] text-xl sm:text-[22px] font-bold tracking-[4px] drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]"
                      >
                        LEVEL UP!
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Upload Zone */}
              <div>
                <div className="hoyo-title text-[8px] sm:text-[9px] tracking-[3px] text-[#6b7280] text-center mb-2 sm:mb-3">
                  ✦ MATERIAL IDENTIFICATION ✦
                </div>
                <label className="upload-zone h-36 sm:h-[150px] flex flex-col items-center justify-center gap-2 sm:gap-3 block">
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
                          <div className="hoyo-title text-[#d3bc8e] text-[9px] sm:text-[10px] tracking-widest drop-shadow-md">
                            ✦ MATERIAL READY (CLICK TO CHANGE) ✦
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <div className="upload-icon">+</div>
                      <div className="hoyo-title text-[10px] sm:text-[11px] tracking-[3px] text-[#6b7280]">
                        TAP TO PROVIDE MATERIAL
                      </div>
                      <div className="hoyo-serif text-[10px] sm:text-[11px] text-[#4a5366] italic">
                        Upload file or capture photo
                      </div>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                  />
                </label>

                {/* Quick Action Buttons for Photo vs File */}
                <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-[11px]">
                  <div className="flex gap-2 w-full">
                    <label className="flex-1 text-center cursor-pointer text-[#d3bc8e] hover:text-white px-2.5 py-1.5 bg-black/40 border border-[#3d4460] hover:border-[#d3bc8e] rounded-sm hoyo-title text-[9px] tracking-wider transition-all">
                      📁 FILE SELECT
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUpload}
                      />
                    </label>
                    <label className="flex-1 text-center cursor-pointer text-[#d3bc8e] hover:text-white px-2.5 py-1.5 bg-black/40 border border-[#3d4460] hover:border-[#d3bc8e] rounded-sm hoyo-title text-[9px] tracking-wider transition-all">
                      📷 TAKE PHOTO
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Scan Button */}
              <button
                className="scan-btn"
                onClick={handleScan}
                disabled={!image || loading}
              >
                {loading ? "⟳  ANALYZING ARTIFACT..." : "⚡  BEGIN TRANSMUTATION"}
              </button>

              {/* Reset / Actions */}
              {result && !loading && (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2 text-[#d3bc8e] hover:text-[#fff] hoyo-title text-[10px] tracking-[2px] transition-colors border border-[rgba(211,188,142,0.2)] hover:border-[rgba(211,188,142,0.5)] rounded-sm text-center"
                  >
                    ⟲ ANOTHER SCAN
                  </button>
                  <Link
                    href="/history"
                    className="flex-1 py-2 text-[#ece5d8] hover:text-[#d3bc8e] hoyo-title text-[10px] tracking-[2px] transition-colors border border-[#3d4460] hover:border-[#d3bc8e]/40 rounded-sm text-center"
                  >
                    ◈ VIEW ARCHIVES
                  </Link>
                </div>
              )}

              {/* Loading Indicator */}
              {loading && <Loading text="ANALYZING ARTIFACT..." subtext="Accessing neural transmutation network" />}

              {/* Error Message with Retry */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="info-block border border-red-500/40 bg-red-950/20 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="hoyo-title text-[10px] tracking-[3px] text-[#ff6b6b]">
                        SCAN ERROR
                      </span>
                      <button
                        onClick={handleScan}
                        className="hoyo-title text-[9px] text-[#ffd700] underline hover:text-white"
                      >
                        RETRY ⟲
                      </button>
                    </div>
                    <div className="hoyo-serif text-[12px] sm:text-[13px] text-[#f8d7da]">
                      {errorMessage}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

          {/* Result Card using ItemCard component */}
          <AnimatePresence>
            {result && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col gap-3"
              >
                <div className="flex items-center justify-between px-1">
                  <span className="hoyo-title text-[10px] tracking-[3px] text-[#d3bc8e]">
                    IDENTIFIED ARTIFACT
                  </span>
                  <span className="hoyo-serif text-[11px] text-[#6b7280] italic">
                    Saved to local archives
                  </span>
                </div>
                <ItemCard data={result} />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </main>
  );
}