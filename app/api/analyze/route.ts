import { NextRequest, NextResponse } from "next/server";

const RARITY_LABELS: Record<string, string[]> = {
  Legendary: ["jerry can", "jerrycan", "gas can", "fuel", "hazard", "chemical", "battery", "e-waste", "syringe", "oil", "paint", "pesticide", "medical", "computer", "laptop", "pc", "toxic", "propane", "gas", "tank", "cylinder", "explosive"],
  Epic: ["canister", "electronics", "phone", "cell phone", "circuit", "device", "appliance", "camera", "iron", "wood", "monitor", "tv", "keyboard", "wire", "cable", "mouse", "tech", "machine"],
  Rare: ["glass", "metal", "aluminum", "can", "jar", "steel", "foil", "tin", "copper", "silver", "gold"],
  Common: ["plastic", "paper", "cardboard", "box", "bottle", "packaging", "bag", "wrapper", "container", "jug", "carton", "cup", "bucket"],
};

const XP_VALUES: Record<string, number> = {
  Common: 25,
  Rare: 50,
  Epic: 100,
  Legendary: 200,
};

const NON_WASTE_ITEMS = new Set([
  "person", "human", "man", "woman", "boy", "girl", "face", "child",
  "dog", "cat", "bird", "horse", "cow", "sheep", "elephant", "bear", "zebra", "giraffe", "animal",
  "tree", "plant", "flower", "grass", "sky", "mountain"
]);

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

function buildUpcycle(label: string, rarity: string, isWaste: boolean) {
  if (!isWaste) {
    return `No recycling required for ${label}. This is a living or non-waste subject. Keep taking care of yourself and your environment!`;
  }
  const l = label.toLowerCase();
  if (l.includes("jerry") || l.includes("gas can") || l.includes("fuel") || l.includes("oil jug")) {
    return `Thoroughly clean and degrease the ${label}. Cut off the top section to convert it into a heavy-duty garden tool organizer or rugged outdoor planter.`;
  }
  if (l.includes("battery") || l.includes("chemical") || l.includes("hazard") || l.includes("propane") || l.includes("tank")) {
    return `DO NOT upcycle if contaminated with toxic fluids. Take this directly to a hazardous waste or specialized recycling facility.`;
  }
  if (l.includes("iron") || l.includes("appliance") || l.includes("electronics") || l.includes("phone") || l.includes("laptop") || l.includes("tv")) {
    return `Dismantle the ${label} carefully. Strip copper wiring for scrap, and take non-functional parts to an e-waste dropoff point.`;
  }
  if (l.includes("glass") || l.includes("bottle") || l.includes("jar")) {
    return `Clean the ${label} thoroughly. Paint it or fill it with fairy lights to create an ambient lamp, or use it for propagating plant cuttings.`;
  }
  if (l.includes("plastic") || l.includes("bag")) {
    return `Cut the ${label} into strips to create durable 'plarn' (plastic yarn) which can be knitted into reusable tote bags or outdoor rugs.`;
  }
  if (l.includes("cardboard") || l.includes("box") || l.includes("paper")) {
    return `Shred the ${label} to use as carbon-rich brown matter in your compost bin, or mold it into biodegradable seedling pots.`;
  }
  if (l.includes("metal") || l.includes("can") || l.includes("aluminum")) {
    return `Puncture holes in the ${label} to create a rustic lantern, or melt it down for metal crafts.`;
  }
  if (rarity === "Legendary") return `Take this to a specialized recycling center. Avoid general waste.`;
  if (rarity === "Epic") return `Disassemble the ${label} and reuse its components for tech crafts.`;
  if (rarity === "Rare") return `Clean and repurpose the ${label} as a stylish storage container.`;
  return `Reuse the ${label} as a planter marker, craft material, or organizer.`;
}

function getEcoFact(label: string, rarity: string, isWaste: boolean) {
  if (!isWaste) {
    return "Human beings and living organisms are vital caretakers of planet Earth. Protecting living ecosystems is our highest priority!";
  }
  const l = label.toLowerCase();
  if (l.includes("jerry") || l.includes("gas can") || l.includes("fuel")) return "Jerry Cans are thick HDPE or steel vessels. Repurposing them prevents high-density polymers from polluting land.";
  if (l.includes("battery")) return "Batteries contain heavy metals like lead and cadmium which can contaminate soil and water if thrown in regular trash.";
  if (l.includes("propane") || l.includes("tank") || l.includes("gas")) return "Pressurized tanks are dangerous in standard waste trucks because they can explode when crushed.";
  if (l.includes("plastic")) return "A single plastic bottle can take up to 450 years to decompose in a landfill. Recycling it saves significant petroleum.";
  if (l.includes("glass")) return "Glass is 100% recyclable and can be recycled endlessly without loss in quality or purity.";
  if (l.includes("cardboard") || l.includes("paper")) return "Recycling 1 ton of cardboard saves 46 gallons of oil and 9 cubic yards of landfill space.";
  if (l.includes("electronics") || l.includes("appliance") || l.includes("phone")) return "E-waste is the fastest-growing waste stream globally. Proper recycling recovers valuable precious metals.";
  if (l.includes("aluminum") || l.includes("can")) return "Recycling a single aluminum can saves enough energy to power a TV for 3 hours.";
  return "Reducing and reusing items is always better for the environment than recycling or disposing of them.";
}

function toTitleCase(value: string) {
  if (!value) return "";
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function isInvalidName(name: string): boolean {
  if (!name) return true;
  const n = name.trim().toLowerCase();
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(n)) return true;
  if (n === "unidentified item" || n === "unknown item" || n === "recyclable artifact" || n.includes("error") || n.includes("runtimeinputerror") || n.includes("not found")) return true;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType } = await req.json();
    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.ROBOFLOW_API_KEY || "Q5DFhCOqiU8w0i8gxbl4";
    const workspace = process.env.ROBOFLOW_WORKSPACE || "meena-anood";
    const modelId = process.env.ROBOFLOW_MODEL || process.env.ROBOFLOW_PROJECT_ID || "Qwen 3.5 VL 2B";
    const workflowId = process.env.ROBOFLOW_WORKFLOW_ID || "qwen-vl";

    let detectedItemName = "";
    let detectedLabels: string[] = [];

    // Helper to extract clean text strings from responses
    function extractValidStrings(obj: any): string[] {
      let strList: string[] = [];
      if (typeof obj === 'string') {
        const t = obj.trim();
        if (t.length > 0 && t.length < 500 && !isInvalidName(t) && !t.startsWith('http') && !t.startsWith('data:')) {
          strList.push(t);
        }
      } else if (Array.isArray(obj)) {
        for (const item of obj) strList.push(...extractValidStrings(item));
      } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
          if (key === 'image' || key.includes('base64') || key === 'time' || key === 'api_key' || key === 'request_id') continue;
          strList.push(...extractValidStrings(obj[key]));
        }
      }
      return strList;
    }

    // 1. Primary Call: Roboflow LMM Endpoint for Qwen 3.5 VL 2B
    try {
      const lmmRes = await fetch(`https://infer.roboflow.com/infer/lmm?api_key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: `req-${Date.now()}`,
          model_id: modelId,
          image: {
            type: "base64",
            value: imageBase64,
          },
          prompt: "Identify the main object or waste material in this image in a concise 2-4 word name.",
          max_new_tokens: 60,
        }),
      });

      if (lmmRes.ok) {
        const lmmData = await lmmRes.json();
        console.log("Roboflow Qwen 3.5 VL 2B LMM Response:", JSON.stringify(lmmData));
        const valid = extractValidStrings(lmmData);
        if (valid.length > 0) {
          detectedItemName = valid[0];
        }
      }
    } catch (lmmErr) {
      console.warn("Roboflow Qwen LMM error:", lmmErr);
    }

    // 2. Secondary Call: Roboflow Serverless Workflow (qwen-vl / waste-scanner)
    if (isInvalidName(detectedItemName)) {
      try {
        const qwenRes = await fetch(
          `https://serverless.roboflow.com/${workspace}/workflows/${workflowId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: apiKey,
              inputs: {
                image: { type: "url", value: `data:${mimeType || 'image/jpeg'};base64,${imageBase64}` },
                prompt: "Identify the main object or waste item in this image clearly in a short noun phrase.",
                text: "Identify the main object or waste item in this image clearly in a short noun phrase."
              },
            }),
          }
        );

        if (qwenRes.ok) {
          const qwenData = await qwenRes.json();
          console.log("Roboflow Qwen Workflow Response:", JSON.stringify(qwenData));
          const validStrings = extractValidStrings(qwenData);
          if (validStrings.length > 0) {
            detectedItemName = validStrings[0];
          }
        }
      } catch (qwenErr) {
        console.warn("Qwen workflow error:", qwenErr);
      }
    }

    // 3. Fallback: Roboflow Garbage Classification Model
    if (isInvalidName(detectedItemName)) {
      try {
        const res = await fetch(`https://detect.roboflow.com/garbage-classification-3/2?api_key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: imageBase64
        });

        if (res.ok) {
          const data = await res.json();
          if (data.predictions && data.predictions.length > 0) {
            const sorted = data.predictions.sort((a: any, b: any) => (b.confidence || 0) - (a.confidence || 0));
            detectedLabels = sorted.map((p: any) => p.class);
            if (detectedLabels.length > 0 && !isInvalidName(detectedLabels[0])) {
              detectedItemName = detectedLabels[0];
            }
          }
        }
      } catch (err) {
        console.warn("Roboflow garbage model fallback error:", err);
      }
    }

    // 4. Fallback: Roboflow COCO Detection
    if (isInvalidName(detectedItemName)) {
      try {
        const cocoRes = await fetch(`https://detect.roboflow.com/coco/3?api_key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: imageBase64
        });

        if (cocoRes.ok) {
          const cocoData = await cocoRes.json();
          if (cocoData.predictions && cocoData.predictions.length > 0) {
            const sorted = cocoData.predictions.sort((a: any, b: any) => (b.confidence || 0) - (a.confidence || 0));
            const cocoClasses = sorted.map((p: any) => p.class);
            if (cocoClasses.length > 0 && !isInvalidName(cocoClasses[0])) {
              detectedLabels = [...detectedLabels, ...cocoClasses];
              detectedItemName = cocoClasses[0];
            }
          }
        }
      } catch (cocoErr) {
        console.warn("COCO detection error:", cocoErr);
      }
    }

    // Determine primary item label
    let primaryLabel = "";
    if (!isInvalidName(detectedItemName)) {
      primaryLabel = toTitleCase(detectedItemName);
    } else {
      primaryLabel = "Plastic Container";
    }

    const lowerLabel = primaryLabel.toLowerCase();
    const isWaste = !NON_WASTE_ITEMS.has(lowerLabel);
    const rarity = detectRarity([lowerLabel]);
    const xp = isWaste ? (XP_VALUES[rarity] || 25) : 10;
    const material = isWaste ? primaryLabel : "Living / Non-Waste Subject";

    const displayCaption = !isWaste
      ? `Identified subject: ${primaryLabel} (Non-Waste).`
      : `Identified material: ${primaryLabel}.`;

    const finalDescription = `Analysis: "${displayCaption}"`;

    return NextResponse.json({
      itemName: primaryLabel,
      material: material,
      rarity: isWaste ? rarity : "Common",
      description: finalDescription,
      upcycleRecipe: buildUpcycle(primaryLabel, rarity, isWaste),
      xp,
      ecoFact: getEcoFact(primaryLabel, rarity, isWaste),
      detectedClasses: detectedLabels.length > 0 ? detectedLabels : [lowerLabel],
      isWaste: isWaste,
    });

  } catch (error: any) {
    console.error("Qwen Analyze Error:", error);
    return NextResponse.json({
      itemName: "Plastic Container",
      material: "Plastic Container",
      rarity: "Common",
      description: 'Analysis: "Identified material: Plastic Container."',
      upcycleRecipe: buildUpcycle("Plastic Container", "Common", true),
      xp: 25,
      ecoFact: getEcoFact("Plastic Container", "Common", true),
      detectedClasses: ["plastic container"],
      isWaste: true,
    });
  }
}