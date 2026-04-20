import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.IMAGGA_API_KEY;
    const apiSecret = process.env.IMAGGA_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json({
        error: "Missing IMAGGA_API_KEY or IMAGGA_API_SECRET. Please set both in .env.local"
      }, { status: 401 });
    }

    const { imageBase64, mimeType } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // IMAGGA OCR API endpoint
    const ocrUrl = `https://api.imagga.com/v2/text`;

    // Create form data for IMAGGA API
    const formData = new FormData();
    // Convert base64 to blob
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    const blob = new Blob([imageBuffer], { type: mimeType });
    formData.append('image', blob);

    // Make request to IMAGGA OCR API
    const response = await fetch(ocrUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('IMAGGA OCR API Error:', response.status, errorData);
      return NextResponse.json({
        error: `IMAGGA OCR API error: ${response.status}`,
        details: errorData
      }, { status: response.status });
    }

    const ocrResult = await response.json();

    // Extract text from IMAGGA response
    let extractedText = '';

    if (ocrResult.result && ocrResult.result.text) {
      // IMAGGA returns text in different formats, extract the most relevant text
      const textResult = ocrResult.result.text as any;
      extractedText = textResult.english || textResult.raw || '';

      // If it's an object with annotations, extract text from annotations
      if (typeof extractedText === 'object' && extractedText && (extractedText as any).annotations) {
        extractedText = (extractedText as any).annotations
          .map((annotation: any) => annotation.text)
          .join(' ');
      }
    }

    return NextResponse.json({
      success: true,
      extractedText: extractedText.trim(),
      confidence: ocrResult.result?.confidence || null,
      rawResult: ocrResult
    });

  } catch (error: any) {
    console.error("IMAGGA OCR Error:", error);
    return NextResponse.json({
      error: error.message || "Failed to extract text with IMAGGA OCR",
      success: false
    }, { status: 500 });
  }
}