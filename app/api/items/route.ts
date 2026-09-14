import { NextRequest, NextResponse } from "next/server";
import { STARTER_ARCHIVES, ScannedItem } from "@/lib/catalog";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() || "";
    const rarity = searchParams.get("rarity") || "";
    const material = searchParams.get("material") || "";
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);

    let items: ScannedItem[] = [...STARTER_ARCHIVES];

    // Filter by search query
    if (query) {
      items = items.filter(
        item =>
          item.itemName.toLowerCase().includes(query) ||
          item.material.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.upcycleRecipe.toLowerCase().includes(query)
      );
    }

    // Filter by rarity
    if (rarity && rarity !== "all") {
      items = items.filter(item => item.rarity.toLowerCase() === rarity.toLowerCase());
    }

    // Filter by material
    if (material && material !== "all") {
      items = items.filter(item => item.material.toLowerCase().includes(material.toLowerCase()));
    }

    // Sort items
    if (sort === "newest") {
      items.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sort === "oldest") {
      items.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sort === "xp-high") {
      items.sort((a, b) => b.xp - a.xp);
    } else if (sort === "xp-low") {
      items.sort((a, b) => a.xp - b.xp);
    } else if (sort === "name-asc") {
      items.sort((a, b) => a.itemName.localeCompare(b.itemName));
    } else if (sort === "name-desc") {
      items.sort((a, b) => b.itemName.localeCompare(a.itemName));
    }

    const total = items.length;
    const startIndex = (page - 1) * limit;
    const paginatedItems = items.slice(startIndex, startIndex + limit);
    const totalPages = Math.ceil(total / limit) || 1;

    return NextResponse.json({
      success: true,
      data: paginatedItems,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Unable to retrieve the data. Please try again.", details: error.message },
      { status: 500 }
    );
  }
}
