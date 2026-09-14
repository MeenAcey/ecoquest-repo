import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.ROBOFLOW_API_KEY || "Q5DFhCOqiU8w0i8gxbl4";
    const workspace = process.env.ROBOFLOW_WORKSPACE || "meena-anood";
    const workflowId = process.env.ROBOFLOW_OCR_WORKFLOW_ID || process.env.ROBOFLOW_WORKFLOW_ID_A || "easyocr-demo";

    let extractedText = "";

    // 1. Primary OCR via Roboflow easyocr-demo workflow
    try {
      const rfRes = await fetch(
        `https://serverless.roboflow.com/${workspace}/workflows/${workflowId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: apiKey,
            inputs: {
              image: { type: "url", value: `data:${mimeType || "image/jpeg"};base64,${imageBase64}` }
            }
          })
        }
      );

      if (rfRes.ok) {
        const data = await rfRes.json();
        
        function findText(obj: any): string[] {
          let results: string[] = [];
          if (typeof obj === 'string') {
            const trimmed = obj.trim();
            if (
              trimmed.length > 0 &&
              !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmed) &&
              !trimmed.startsWith('http') &&
              !trimmed.startsWith('data:')
            ) {
              results.push(trimmed);
            }
          } else if (Array.isArray(obj)) {
            for (const item of obj) results.push(...findText(item));
          } else if (typeof obj === 'object' && obj !== null) {
            for (const key in obj) {
              if (key === 'image' || key.includes('base64') || key === 'time' || key === 'api_key') continue;
              results.push(...findText(obj[key]));
            }
          }
          return results;
        }

        const texts = findText(data);
        if (texts.length > 0) {
          extractedText = texts.join(" ");
        }
      }
    } catch (rfErr) {
      console.warn("Roboflow EasyOCR fetch error:", rfErr);
    }

    // 2. Fallback OCR via Imagga if configured and Roboflow OCR was empty
    if (!extractedText && process.env.IMAGGA_API_KEY && process.env.IMAGGA_API_SECRET) {
      try {
        const imageBuffer = Buffer.from(imageBase64, 'base64');
        const formData = new FormData();
        const blob = new Blob([imageBuffer], { type: mimeType || 'image/jpeg' });
        formData.append('image', blob);

        const ocrRes = await fetch('https://api.imagga.com/v2/text', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${Buffer.from(`${process.env.IMAGGA_API_KEY}:${process.env.IMAGGA_API_SECRET}`).toString('base64')}`
          },
          body: formData
        });

        if (ocrRes.ok) {
          const ocrResult = await ocrRes.json();
          if (ocrResult.result?.text) {
            const raw = ocrResult.result.text;
            extractedText = typeof raw === 'string' ? raw : (raw.english || raw.raw || '');
          }
        }
      } catch (imgErr) {
        console.warn("Imagga OCR fallback error:", imgErr);
      }
    }

    return NextResponse.json({
      success: true,
      extractedText: extractedText.trim(),
    });

  } catch (error: any) {
    console.error("OCR API Error:", error);
    return NextResponse.json({
      error: error.message || "Failed to extract text",
      success: false
    }, { status: 500 });
  }
}