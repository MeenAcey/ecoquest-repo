import { NextRequest, NextResponse } from "next/server";

const RARITY_LABELS: Record<string, string[]> = {
  Legendary: ["hazard", "chemical", "battery", "e-waste", "syringe", "oil", "paint", "pesticide", "medical", "computer", "laptop", "pc", "toxic", "propane", "gas", "tank", "cylinder", "explosive"],
  Epic: ["electronics", "phone", "circuit", "device", "appliance", "camera", "iron", "wood", "monitor", "tv", "keyboard", "wire", "cable", "mouse", "tech", "machine"],
  Rare: ["glass", "metal", "aluminum", "can", "jar", "steel", "foil", "tin", "copper", "silver", "gold"],
  Common: ["plastic", "paper", "cardboard", "box", "bottle", "packaging", "bag", "wrapper", "container", "jug", "carton", "cup", "canister", "bucket"],
};

const XP_VALUES: Record<string, number> = {
  Common: 25,
  Rare: 50,
  Epic: 100,
  Legendary: 200,
};

function normalizeLabel(label: string) {
  return label.trim().toLowerCase();
}

function detectRarity(labels: string[]) {
  const lower = labels.map(normalizeLabel);
  for (const rarity of ["Legendary", "Epic", "Rare", "Common"]) {
    if (RARITY_LABELS[rarity].some((tag) => lower.some(l => l.includes(tag)))) {
      return rarity;
    }
  }
  return "Common";
}

function buildUpcycle(label: string, rarity: string) {
  const l = label.toLowerCase();
  if (l.includes("battery") || l.includes("chemical") || l.includes("hazard") || l.includes("propane") || l.includes("gas") || l.includes("tank")) {
    return `DO NOT upcycle. Take this directly to a hazardous waste or specialized recycling facility to prevent toxic leaks or explosions.`;
  }
  if (l.includes("iron") || l.includes("appliance") || l.includes("electronics")) {
    return `Dismantle the ${label} carefully. You can strip the copper wiring for scrap, and use the metal housing as a retro planter or bookend.`;
  }
  if (l.includes("glass") || l.includes("bottle") || l.includes("jar")) {
    return `Clean the ${label} thoroughly. Paint it or fill it with fairy lights to create a beautiful ambient lamp, or use it for propagating plant cuttings.`;
  }
  if (l.includes("plastic") || l.includes("bag")) {
    return `Cut the ${label} into strips to create durable 'plarn' (plastic yarn) which can be knitted into reusable tote bags or outdoor rugs.`;
  }
  if (l.includes("cardboard") || l.includes("box") || l.includes("paper")) {
    return `Shred the ${label} to use as carbon-rich brown matter in your compost bin, or mold it into biodegradable seedling pots.`;
  }
  if (l.includes("metal") || l.includes("can") || l.includes("aluminum")) {
    return `Puncture holes in the ${label} to create a rustic lantern, or melt it down if you have a DIY forge.`;
  }
  if (rarity === "Legendary") return `Take this to a specialized recycling center. Avoid general waste.`;
  if (rarity === "Epic") return `Disassemble the ${label} and reuse its components for tech crafts.`;
  if (rarity === "Rare") return `Clean and repurpose the ${label} as a stylish storage container.`;
  return `Reuse the ${label} as a planter marker, craft material, or organizer.`;
}

function getEcoFact(label: string, rarity: string) {
  const l = label.toLowerCase();
  if (l.includes("battery")) return "Batteries contain heavy metals like lead and cadmium which can contaminate soil and water if thrown in regular trash.";
  if (l.includes("propane") || l.includes("tank") || l.includes("gas") || l.includes("cylinder")) return "Pressurized tanks are highly dangerous in standard waste trucks. They can explode when crushed.";
  if (l.includes("plastic")) return "A single plastic bottle can take up to 450 years to decompose in a landfill. Recycling it saves significant oil resources.";
  if (l.includes("glass")) return "Glass is 100% recyclable and can be recycled endlessly without loss in quality or purity.";
  if (l.includes("cardboard") || l.includes("paper")) return "Recycling 1 ton of cardboard saves 46 gallons of oil and 9 cubic yards of landfill space.";
  if (l.includes("electronics") || l.includes("appliance") || l.includes("iron")) return "E-waste is the fastest-growing waste stream globally. Proper recycling recovers valuable metals like gold, silver, and copper.";
  if (l.includes("aluminum") || l.includes("can")) return "Recycling a single aluminum can saves enough energy to power a TV for 3 hours.";
  
  if (rarity === "Legendary") return "Hazardous materials need special disposal and should never enter normal waste streams.";
  if (rarity === "Epic") return "Electronics contain valuable metals that must be recovered through proper e-waste recycling.";
  if (rarity === "Rare") return "Materials like glass and metal are highly recyclable and have endless lifecycles.";
  return "Reducing and reusing items is always better for the environment than recycling or disposing of them.";
}

function toTitleCase(value: string) {
  if (!value) return "";
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType, useOCR = false } = await req.json();
    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.ROBOFLOW_API_KEY;
    const workspace = process.env.ROBOFLOW_WORKSPACE;
    const workflowId = process.env.ROBOFLOW_WORKFLOW_ID;
    
    if (!apiKey || !workspace || !workflowId) {
      return NextResponse.json({ error: "Missing Roboflow credentials" }, { status: 500 });
    }

    // Convert base64 to data URL for Roboflow
    const dataUrl = `data:${mimeType};base64,${imageBase64}`;

    // Call Roboflow Workflows API with proper format
    const response = await fetch(
      `https://serverless.roboflow.com/${workspace}/workflows/${workflowId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          inputs: {
            image: {
              type: "base64",
              value: imageBase64,
            },
            prompt: "Identify the item. What material could it be (the most prominent material in the image)? Based on our rarity classes (Common, Rare, Epic, Legendary), determine the exp gained, ways to recycle the object, and determine the eco-knowledge.",
            text: "Identify the item. What material could it be (the most prominent material in the image)? Based on our rarity classes (Common, Rare, Epic, Legendary), determine the exp gained, ways to recycle the object, and determine the eco-knowledge."
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Roboflow API Error:", response.status, errorText);
      console.error("API Key used:", apiKey?.substring(0, 5) + "...");
      return NextResponse.json(
        { 
          error: `Roboflow API error: ${response.status}`,
          details: errorText,
          debug: `Check API key validity and model access at https://app.roboflow.com/`
        }, 
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log("Roboflow Workflows Response:", JSON.stringify(result, null, 2));

    // Helper to recursively extract strings to find the Florence-2 caption
    function extractAllStrings(obj: any): string[] {
      let strings: string[] = [];
      if (typeof obj === 'string') {
        // Skip base64-like strings or URLs (no spaces, very long, or start with http)
        if (obj.length > 50 && !obj.includes(' ')) return strings;
        if (obj.startsWith('http') || obj.startsWith('data:')) return strings;
        strings.push(obj);
      } else if (Array.isArray(obj)) {
        for (const item of obj) strings.push(...extractAllStrings(item));
      } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
          if (key === 'image' || key.includes('base64') || key === 'time' || key === 'api_key') continue;
          strings.push(...extractAllStrings(obj[key]));
        }
      }
      return strings;
    }

    const allStrings = extractAllStrings(result);
    // Florence-2 output is typically a long descriptive string
    const caption = allStrings.sort((a, b) => b.length - a.length)[0] || "Unknown item";
    const captionLower = caption.toLowerCase();

    // Analyze caption for keywords
    const commonWasteKeywords = [
      ...RARITY_LABELS.Legendary, ...RARITY_LABELS.Epic, ...RARITY_LABELS.Rare, ...RARITY_LABELS.Common
    ];
    const detectedLabels = commonWasteKeywords.filter(kw => captionLower.includes(kw));

    let primaryLabel = "Waste Material";
    if (detectedLabels.length > 0) {
      primaryLabel = toTitleCase(detectedLabels[0]);
    } else {
      // Smart Fallback: Try to extract a clean noun phrase from the description
      const words = caption.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");
      let startIndex = 0;
      if (words.length > 0 && ["a", "an", "the"].includes(words[0].toLowerCase())) {
        startIndex = 1;
      }
      const stopWords = ["on", "in", "with", "at", "and", "of", "for", "to", "over", "under", "next"];
      let nounWords = [];
      for (let i = startIndex; i < words.length; i++) {
        if (stopWords.includes(words[i].toLowerCase())) break;
        nounWords.push(words[i]);
        if (nounWords.length >= 3) break; // keep it short
      }
      primaryLabel = nounWords.length > 0 ? toTitleCase(nounWords.join(" ")) : "Waste Material";
    }

    const rarity = detectRarity(detectedLabels.length > 0 ? detectedLabels : [primaryLabel.toLowerCase()]);
    const xp = XP_VALUES[rarity] || 25;

    return NextResponse.json({
      itemName: primaryLabel,
      material: primaryLabel,
      rarity,
      description: `Analysis: "${caption}"`,
      upcycleRecipe: buildUpcycle(primaryLabel, rarity),
      xp,
      ecoFact: getEcoFact(primaryLabel, rarity),
      detectedClasses: detectedLabels,
      extractedText: null,
      ocrData: null,
    });
  } catch (error: any) {
    console.error("Roboflow Analyze Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze image" }, { status: 500 });
  }
}