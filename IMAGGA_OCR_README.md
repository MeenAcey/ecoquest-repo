# Roboflow Waste Detection Integration

## Overview
EcoQuest now supports Roboflow's waste detection model to identify waste types in images. This provides accurate object detection for recycling and upcycling suggestions.

## Features
- **OCR Toggle**: Enable/disable OCR text detection in the scanner UI
- **Label Detection**: Google Vision detects objects and materials in the image
- **Confidence Scoring**: Shows OCR confidence levels
- **Fallback Support**: If text detection fails, the route still returns a label-based item result

## API Endpoints

### `/api/ocr` - Direct OCR Processing
Extracts text from images using IMAGGA AI (optional route if you still want direct text-only extraction).

**Request:**
```json
{
  "imageBase64": "base64_encoded_image_data",
  "mimeType": "image/jpeg"
}
```

**Response:**
```json
{
  "success": true,
  "extractedText": "Extracted text content",
  "confidence": 0.95,
  "rawResult": { /* Full IMAGGA response */ }
}
```

### `/api/analyze` - Waste Detection Analysis
Uses Roboflow waste detection model to identify waste types and return the scanner result.

**Request:**
```json
{
  "imageBase64": "base64_encoded_image_data",
  "mimeType": "image/jpeg",
  "useOCR": true
}
```

**Response:**
```json
{
  "itemName": "Plastic Bottle",
  "material": "Plastic",
  "rarity": "Common",
  "description": "Detected waste type: Plastic Bottle using Roboflow waste detection.",
  "upcycleRecipe": "Reuse the Plastic Bottle as a planter marker, craft material, or organizer.",
  "xp": 25,
  "ecoFact": "Plastic and paper are common, so reuse them to reduce waste before recycling.",
  "detectedClasses": ["plastic", "bottle"],
  "ocrData": {
    "extractedText": "",
    "confidence": null
  }
}
```

## Environment Variables
Add to your `.env.local`:
```
ROBOFLOW_API_KEY=your_roboflow_api_key_here
```

Get your API key from [Roboflow](https://app.roboflow.com/).
Then save your Google service account JSON in a secure location, for example `.gcloud/service-account.json`, and do not commit it to git.

## Usage
1. Upload an image in the scanner
2. Check "Enable OCR Text Extraction" if you want text analysis
3. Click "BEGIN TRANSMUTATION"
4. View results including any extracted text

## Benefits
- **Better Accuracy**: Text labels help identify items more precisely
- **Enhanced Context**: Product names, ingredients, and labels provide additional analysis data
- **Flexible Processing**: OCR is optional - works with or without text extraction
- **Confidence Metrics**: Know how reliable the text extraction was

## Testing
Test with images containing text like:
- Product labels
- Packaging with text
- Documents
- Signs with writing

The system gracefully handles images without text by falling back to visual-only analysis.