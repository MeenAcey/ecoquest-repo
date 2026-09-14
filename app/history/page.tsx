"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getHistory, deleteHistoryItem, clearHistory, getArchiveStats } from "@/lib/history";
import { ScannedItem } from "@/lib/catalog";
import ItemCard from "@/components/ItemCard";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/Loading";
import HangingGems from "@/components/HangingGems";
import FloatingDiamonds from "@/components/FloatingDiamonds";
import AmbientGlows from "@/components/AmbientGlows";

export default function HistoryPage() {
  const [items, setItems] = useState<ScannedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters & State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const fetchItems = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      // Fetch from API asynchronously
      const res = await fetch(`/api/items?sort=${sortBy}`);
      if (res.ok) {
        const apiData = await res.json();
        // Merge with local storage history to preserve user's scans
        const localItems = getHistory();
        const combinedMap = new Map<string, ScannedItem>();
        
        // Local user scans first
        localItems.forEach(i => combinedMap.set(i.id, i));
        // Server catalog items
        if (apiData.data && Array.isArray(apiData.data)) {
          apiData.data.forEach((i: ScannedItem) => {
            if (!combinedMap.has(i.id)) combinedMap.set(i.id, i);
          });
        }
        
        setItems(Array.from(combinedMap.values()));
      } else {
        // Fallback to local storage
        setItems(getHistory());
      }
    } catch (err: any) {
      console.warn("API retrieval error, falling back to local archives:", err);
      // Fallback
      const local = getHistory();
      if (local && local.length > 0) {
        setItems(local);
      } else {
        setErrorMessage("Unable to retrieve the data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = (id: string) => {
    const updated = deleteHistoryItem(id);
    setItems(updated);
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all archived artifacts?")) {
      clearHistory();
      setItems([]);
    }
  };

  // Filter & Search Logic
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.upcycleRecipe.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRarity =
      selectedRarity === "all" ||
      item.rarity.toLowerCase() === selectedRarity.toLowerCase();

    const matchesMaterial =
      selectedMaterial === "all" ||
      item.material.toLowerCase().includes(selectedMaterial.toLowerCase());

    return matchesSearch && matchesRarity && matchesMaterial;
  });

  // Sorting Logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "newest") return b.timestamp - a.timestamp;
    if (sortBy === "oldest") return a.timestamp - b.timestamp;
    if (sortBy === "xp-high") return b.xp - a.xp;
    if (sortBy === "xp-low") return a.xp - b.xp;
    if (sortBy === "name-asc") return a.itemName.localeCompare(b.itemName);
    if (sortBy === "name-desc") return b.itemName.localeCompare(a.itemName);
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage) || 1;
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = getArchiveStats(items);

  const materialsList = [
    "all",
    "Plastic",
    "Glass",
    "Metal",
    "Cardboard",
    "Electronics",
  ];

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 relative overflow-hidden text-[#ece5d8]"
      style={{ background: "#0e0f1a", fontFamily: "'Crimson Text', serif" }}
    >
      <HangingGems />
      <FloatingDiamonds />
      <AmbientGlows />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .hoyo-title { font-family: 'Cinzel', serif; }
        .hoyo-serif { font-family: 'Crimson Text', serif; }
        .pill-btn {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          padding: 6px 14px;
          border-radius: 2px;
          border: 1px solid #3d4460;
          background: rgba(20,22,34,0.6);
          color: #a6a9b2;
          transition: all 0.2s;
          cursor: pointer;
        }
        .pill-btn:hover {
          border-color: #d3bc8e;
          color: #ece5d8;
        }
        .pill-btn.active {
          background: rgba(211,188,142,0.15);
          border-color: #d3bc8e;
          color: #ffd700;
          font-weight: bold;
          box-shadow: 0 0 10px rgba(211,188,142,0.15);
        }
      `}</style>

      <div className="w-full max-w-6xl z-10 flex flex-col gap-6">

        {/* Page Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#d3bc8e]" />
            <span className="hoyo-title text-[#d3bc8e] tracking-[0.3em] text-[10px] sm:text-xs font-bold">
              DATABANK ARCHIVES
            </span>
            <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#d3bc8e]" />
          </div>
          <h1
            className="hoyo-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider"
            style={{
              background: "linear-gradient(180deg,#fff 0%,#ece5d8 40%,#a08040 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Artifact Archives
          </h1>
          <p className="hoyo-serif text-sm sm:text-base italic text-[#a6a9b2] max-w-xl">
            Explore and inspect all transmuted materials, analyze recycling blueprints, and review historical eco logs.
          </p>
        </div>

        {/* Statistics Summary Bar */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#181b2a]/90 border border-[#3d4460] p-4 rounded-sm shadow-xl backdrop-blur-sm">
          <div className="flex flex-col items-center sm:items-start p-2 border-r border-[#3d4460]/40 last:border-none">
            <span className="hoyo-title text-[9px] tracking-wider text-[#6b7280]">TOTAL ARTIFACTS</span>
            <span className="hoyo-title text-xl font-bold text-[#ece5d8]">{stats.totalItems}</span>
          </div>
          <div className="flex flex-col items-center sm:items-start p-2 border-r border-[#3d4460]/40 last:border-none">
            <span className="hoyo-title text-[9px] tracking-wider text-[#6b7280]">ARCHIVED XP</span>
            <span className="hoyo-title text-xl font-bold text-[#ffd700]">+{stats.totalXP} XP</span>
          </div>
          <div className="flex flex-col items-center sm:items-start p-2 border-r border-[#3d4460]/40 last:border-none">
            <span className="hoyo-title text-[9px] tracking-wider text-[#6b7280]">LEGENDARY ITEMS</span>
            <span className="hoyo-title text-xl font-bold text-[#ffd700]">{stats.rarityCounts.Legendary}</span>
          </div>
          <div className="flex flex-col items-center sm:items-start p-2">
            <span className="hoyo-title text-[9px] tracking-wider text-[#6b7280]">COMMON & RARE</span>
            <span className="hoyo-title text-xl font-bold text-[#7bb3f0]">
              {stats.rarityCounts.Common + stats.rarityCounts.Rare}
            </span>
          </div>
        </div>

        {/* Interactive Search Bar */}
        <div className="w-full">
          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            count={filteredItems.length}
            placeholder="Search by artifact name, polymer, metal, upcycle routine, keyword..."
          />
        </div>

        {/* Filter & Sort Controls Row */}
        <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#141622]/80 border border-[#3d4460] p-4 rounded-sm backdrop-blur-sm">
          
          {/* Rarity Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="hoyo-title text-[9px] tracking-wider text-[#6b7280] mr-1">RARITY:</span>
            {["all", "Common", "Rare", "Epic", "Legendary"].map((r) => (
              <button
                key={r}
                onClick={() => {
                  setSelectedRarity(r);
                  setCurrentPage(1);
                }}
                className={`pill-btn ${selectedRarity === r ? "active" : ""}`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Material & Sorting Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Material Dropdown */}
            <div className="flex items-center gap-1">
              <span className="hoyo-title text-[9px] tracking-wider text-[#6b7280]">MATERIAL:</span>
              <select
                value={selectedMaterial}
                onChange={(e) => {
                  setSelectedMaterial(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by material"
                className="bg-[#181b2a] border border-[#3d4460] text-[#ece5d8] text-xs px-2.5 py-1.5 rounded-sm focus:border-[#d3bc8e] focus:outline-none hoyo-serif"
              >
                {materialsList.map((m) => (
                  <option key={m} value={m} className="bg-[#181b2a]">
                    {m === "all" ? "All Materials" : m}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1">
              <span className="hoyo-title text-[9px] tracking-wider text-[#6b7280]">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort artifacts"
                className="bg-[#181b2a] border border-[#3d4460] text-[#ece5d8] text-xs px-2.5 py-1.5 rounded-sm focus:border-[#d3bc8e] focus:outline-none hoyo-serif"
              >
                <option value="newest" className="bg-[#181b2a]">Newest Scanned</option>
                <option value="oldest" className="bg-[#181b2a]">Oldest Scanned</option>
                <option value="xp-high" className="bg-[#181b2a]">Highest XP</option>
                <option value="xp-low" className="bg-[#181b2a]">Lowest XP</option>
                <option value="name-asc" className="bg-[#181b2a]">Name (A-Z)</option>
                <option value="name-desc" className="bg-[#181b2a]">Name (Z-A)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-[#3d4460] rounded-sm overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-2.5 py-1 text-xs transition-colors ${
                  viewMode === "grid" ? "bg-[#d3bc8e]/20 text-[#ffd700]" : "text-[#a6a9b2] hover:text-white"
                }`}
                title="Grid View"
              >
                ⊞ Grid
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-2.5 py-1 text-xs transition-colors ${
                  viewMode === "table" ? "bg-[#d3bc8e]/20 text-[#ffd700]" : "text-[#a6a9b2] hover:text-white"
                }`}
                title="Table View"
              >
                ☰ Table
              </button>
            </div>

            {/* Clear Filter / Clear Archives */}
            {(searchQuery || selectedRarity !== "all" || selectedMaterial !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRarity("all");
                  setSelectedMaterial("all");
                  setCurrentPage(1);
                }}
                className="text-[10px] tracking-wider text-[#d3bc8e] hover:text-white underline hoyo-title"
              >
                RESET FILTERS
              </button>
            )}

          </div>

        </div>

        {/* Loading State */}
        {loading && <Loading text="RETRIEVING ARCHIVES..." subtext="Querying databank records" />}

        {/* Error Handling Banner */}
        <AnimatePresence>
          {errorMessage && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full bg-red-950/40 border border-red-500/40 p-4 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
            >
              <div>
                <span className="hoyo-title text-xs text-[#ff6b6b] font-bold block">
                  NETWORK DATA RETRIEVAL NOTICE
                </span>
                <span className="hoyo-serif text-sm text-[#f8d7da]">
                  {errorMessage}
                </span>
              </div>
              <button
                onClick={fetchItems}
                className="hoyo-title text-xs tracking-wider bg-red-900/60 hover:bg-red-800 text-white px-4 py-1.5 border border-red-500/50 rounded-sm transition-colors"
              >
                RETRY ⟲
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty Search / Empty Archives State */}
        {!loading && sortedItems.length === 0 && (
          <div className="w-full bg-[#181b2a]/60 border border-[#3d4460] p-12 text-center rounded-sm flex flex-col items-center gap-4">
            <div className="w-16 h-16 border border-[#d3bc8e]/40 rounded-full flex items-center justify-center text-[#d3bc8e] text-2xl">
              ◈
            </div>
            <h3 className="hoyo-title text-lg font-bold text-[#ece5d8]">
              NO MATCHING ARTIFACTS FOUND
            </h3>
            <p className="hoyo-serif text-sm italic text-[#a6a9b2] max-w-md">
              {searchQuery || selectedRarity !== "all" || selectedMaterial !== "all"
                ? "No artifacts match your active filter parameters. Try adjusting your query or resetting filters."
                : "Your archives are currently empty. Use the neural scanner to begin analyzing discarded materials."}
            </p>
            <div className="flex gap-3">
              {searchQuery || selectedRarity !== "all" || selectedMaterial !== "all" ? (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedRarity("all");
                    setSelectedMaterial("all");
                  }}
                  className="pill-btn active"
                >
                  CLEAR ALL FILTERS
                </button>
              ) : (
                <Link href="/scanner">
                  <button className="pill-btn active">
                    ⚡ OPEN MATERIAL SCANNER
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* DATA DISPLAY: Grid View */}
        {!loading && sortedItems.length > 0 && viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {paginatedItems.map((item) => (
                <ItemCard
                  key={item.id}
                  data={item}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* DATA DISPLAY: Table View */}
        {!loading && sortedItems.length > 0 && viewMode === "table" && (
          <div className="w-full overflow-x-auto bg-[#181b2a]/95 border border-[#3d4460] rounded-sm shadow-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#141622] border-b border-[#3d4460] text-[#d3bc8e] hoyo-title tracking-wider text-[10px]">
                  <th className="p-3">ARTIFACT NAME</th>
                  <th className="p-3">MATERIAL</th>
                  <th className="p-3">RARITY</th>
                  <th className="p-3">XP YIELD</th>
                  <th className="p-3">UPCYCLE ROUTINE</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3d4460]/40 hoyo-serif">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-[#ece5d8] hoyo-title text-xs">
                      {item.itemName}
                    </td>
                    <td className="p-3 text-[#a6a9b2]">{item.material}</td>
                    <td className="p-3">
                      <span className={`hoyo-title font-bold text-[10px] ${
                        item.rarity === "Legendary"
                          ? "text-[#ffd700]"
                          : item.rarity === "Epic"
                          ? "text-[#c77dff]"
                          : item.rarity === "Rare"
                          ? "text-[#7bb3f0]"
                          : "text-[#a0a0a0]"
                      }`}>
                        {item.rarity.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-[#ffd700] font-bold">+{item.xp} XP</td>
                    <td className="p-3 text-[#ece5d8]/80 max-w-xs truncate" title={item.upcycleRecipe}>
                      {item.upcycleRecipe}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-[#a6a9b2] hover:text-[#ff6b6b] p-1 transition-colors"
                        title="Delete entry"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && sortedItems.length > itemsPerPage && (
          <div className="w-full flex items-center justify-between border-t border-[#3d4460]/50 pt-4 text-xs hoyo-title">
            <div className="text-[#6b7280]">
              SHOWING {(currentPage - 1) * itemsPerPage + 1} TO{" "}
              {Math.min(currentPage * itemsPerPage, sortedItems.length)} OF{" "}
              {sortedItems.length} ARTIFACTS
            </div>
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="pill-btn disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ‹ PREV
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`pill-btn ${currentPage === pageNum ? "active" : ""}`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pill-btn disabled:opacity-30 disabled:cursor-not-allowed"
              >
                NEXT ›
              </button>
            </div>
          </div>
        )}

        {/* Archive Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#3d4460]/30 text-xs">
          <Link href="/scanner">
            <button className="pill-btn active">
              ⚡ SCAN MORE ARTIFACTS
            </button>
          </Link>
          
          {items.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-[#6b7280] hover:text-[#ff6b6b] text-[10px] hoyo-title tracking-wider transition-colors"
            >
              PURGE ARCHIVES DATABASE ⚠️
            </button>
          )}
        </div>

      </div>
    </main>
  );
}
