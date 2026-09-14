import { ScannedItem, STARTER_ARCHIVES } from "./catalog";

const STORAGE_KEY = "ecoquest_history";

export function getHistory(): ScannedItem[] {
  if (typeof window === "undefined") return STARTER_ARCHIVES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with starter archive items on first visit
      localStorage.setItem(STORAGE_KEY, JSON.stringify(STARTER_ARCHIVES));
      return STARTER_ARCHIVES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : STARTER_ARCHIVES;
  } catch (e) {
    console.warn("Failed to load history from localStorage:", e);
    return STARTER_ARCHIVES;
  }
}

export function saveToHistory(item: Omit<ScannedItem, "id" | "timestamp"> & { id?: string; timestamp?: number }): ScannedItem {
  if (typeof window === "undefined") {
    return { ...item, id: `item-${Date.now()}`, timestamp: Date.now() };
  }
  try {
    const current = getHistory();
    const newItem: ScannedItem = {
      id: item.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      itemName: item.itemName || "Unknown Artifact",
      material: item.material || "Recyclable Material",
      rarity: item.rarity || "Common",
      description: item.description || "Identified item.",
      upcycleRecipe: item.upcycleRecipe || "Repurpose responsibly.",
      xp: Number(item.xp || 25),
      ecoFact: item.ecoFact || "Every recycled item preserves planet resources.",
      timestamp: item.timestamp || Date.now(),
      detectedClasses: item.detectedClasses,
      extractedText: item.extractedText,
      isWaste: item.isWaste !== false,
    };

    // Prepend new item
    const updated = [newItem, ...current.filter(i => i.id !== newItem.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newItem;
  } catch (e) {
    console.warn("Failed to save to history:", e);
    return { ...item, id: `item-${Date.now()}`, timestamp: Date.now() };
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Failed to clear history:", e);
  }
}

export function deleteHistoryItem(id: string): ScannedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getHistory();
    const filtered = current.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (e) {
    console.warn("Failed to delete history item:", e);
    return [];
  }
}

export function getArchiveStats(items: ScannedItem[]) {
  const totalItems = items.length;
  const totalXP = items.reduce((acc, curr) => acc + (curr.xp || 0), 0);
  
  const rarityCounts = {
    Common: items.filter(i => i.rarity === "Common").length,
    Rare: items.filter(i => i.rarity === "Rare").length,
    Epic: items.filter(i => i.rarity === "Epic").length,
    Legendary: items.filter(i => i.rarity === "Legendary").length,
  };

  const materialCounts = items.reduce((acc, curr) => {
    const mat = curr.material || "Other";
    acc[mat] = (acc[mat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalItems,
    totalXP,
    rarityCounts,
    materialCounts,
  };
}
