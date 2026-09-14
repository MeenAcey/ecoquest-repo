export interface ScannedItem {
  id: string;
  itemName: string;
  material: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  description: string;
  upcycleRecipe: string;
  xp: number;
  ecoFact: string;
  timestamp: number;
  detectedClasses?: string[];
  extractedText?: string | null;
  isWaste?: boolean;
}

export const STARTER_ARCHIVES: ScannedItem[] = [
  {
    id: "arch-001",
    itemName: "HDPE Milk Jug",
    material: "Plastic",
    rarity: "Common",
    description: "High-density polyethylene container previously holding dairy liquid. Robust and weather-resistant polymer.",
    upcycleRecipe: "Rinse thoroughly and slice off the bottom to fashion a miniature greenhouse dome for garden seedling sprouts.",
    xp: 25,
    ecoFact: "HDPE is one of the easiest plastics to recycle, requiring 88% less energy than producing new raw plastic.",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3,
    isWaste: true,
  },
  {
    id: "arch-002",
    itemName: "Amber Glass Beverage Bottle",
    material: "Glass",
    rarity: "Rare",
    description: "Vitreous silica vessel designed to protect photosensitive beverages from ultraviolet radiation.",
    upcycleRecipe: "Fill with micro LED fairy lights and wrap with jute twine to craft an ambient luminary for study desks.",
    xp: 50,
    ecoFact: "Glass is 100% endlessly recyclable without any degradation in structural purity or clarity.",
    timestamp: Date.now() - 1000 * 60 * 60 * 18,
    isWaste: true,
  },
  {
    id: "arch-003",
    itemName: "Lithium Polymer Power Unit",
    material: "Electronics",
    rarity: "Legendary",
    description: "Hazardous electrochemical cell with dense energy capacity. Contains reactive lithium salts and heavy metals.",
    upcycleRecipe: "DO NOT dismantle or puncture. Package safely in non-conductive wrap and deliver to an authorized e-waste reclamation hub.",
    xp: 200,
    ecoFact: "Recycling 1 million laptop batteries recovers enough cobalt, nickel, and copper to power 100+ electric vehicles.",
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    isWaste: true,
  },
  {
    id: "arch-004",
    itemName: "Corrugated Shipping Carton",
    material: "Cardboard",
    rarity: "Common",
    description: "Fluted cellulose container designed for shock absorption during planetary logistics transit.",
    upcycleRecipe: "Shred into strips for carbon-rich organic compost bedding or lay flat under mulch for biodegradable weed suppression.",
    xp: 25,
    ecoFact: "Recycling 1 ton of corrugated cardboard prevents 9 cubic yards of landfill congestion and saves 17 trees.",
    timestamp: Date.now() - 1000 * 60 * 60 * 6,
    isWaste: true,
  },
  {
    id: "arch-005",
    itemName: "Pressed Aluminum Soda Can",
    material: "Metal",
    rarity: "Rare",
    description: "Ultra-lightweight alloy vessel with hermetic seal. Infinitely recyclable with high thermal conductivity.",
    upcycleRecipe: "Punch decorative geometric perforations into the cylinder to fashion a rustic outdoor tealight candle holder.",
    xp: 50,
    ecoFact: "An aluminum can can be recycled and back on grocery store shelves as a brand new can within 60 days.",
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    isWaste: true,
  },
  {
    id: "arch-006",
    itemName: "Printed Circuit Motherboard",
    material: "Electronics",
    rarity: "Epic",
    description: "Fiberglass substrate embedded with copper traces, microchips, and gold-plated contact pins.",
    upcycleRecipe: "Cut into precise geometric coasters or keychains, seal edges with epoxy, and preserve aesthetic techno-artifacts.",
    xp: 100,
    ecoFact: "One metric ton of computer circuit boards contains 40 to 800 times more gold than a metric ton of natural gold ore.",
    timestamp: Date.now() - 1000 * 60 * 30,
    isWaste: true,
  },
];
