# ♦ ECOQUEST ♦

> **Waste Detection & Upcycling RPG**  
> Developed by **TerraByte** · Earth Day 2026  
> *Turning today's waste into tomorrow's treasures.*

---

## ✦ Overview

**EcoQuest** is a web application designed to gamify the process of recycling and upcycling. By leveraging AI vision models, EcoQuest identifies waste items from uploaded images, categorizes them by rarity, and provides creative upcycling recipes—all while rewarding the user with experience points (XP) to ascend through environmental ranks.

---

## ✦ Key Features

- **AI Vision Analysis**: Powered by **Roboflow's Florence-2** model for precise object detection and material identification.
- **RPG Progression**: 
    - **Rarity System**: Items classified as Common, Rare, Epic, or Legendary.
    - **XP Rewards**: Earn XP for every scan based on item rarity.
    - **Rank Ascension**: Climb from *Seedling* to *Gaia Legend*.
- **Creative Upcycling**: Generates contextual "Transmutation Recipes" for your waste.
- **OCR Integration**: Optional text extraction for product labels and packaging context.
- **Persistent Stats**: Your rank and XP are saved locally in your browser.

---

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **AI Vision** | Roboflow Serverless Workflows (Florence-2) |
| **Persistence** | Browser `localStorage` |
| **Language** | TypeScript |

---

## ✦ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ecoquest
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your Roboflow API key:
   ```env
   ROBOFLOW_API_KEY=your_roboflow_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## ✦ Testing & Scripts

- **Development**: `npm run dev` - Starts the dev server with hot-reloading.
- **Linting**: `npm run lint` - Runs ESLint to check for code quality and patterns.
- **Building**: `npm run build` - Creates a production-ready build.
- **Production**: `npm run start` - Starts the production server after building.

---

## ✦ Vision Integration Details

EcoQuest uses the **Roboflow Workflows** API. When an image is uploaded:
1. The image is processed by the **Florence-2** model.
2. A material-aware prompt guides the AI to determine the item's properties.
3. The result is parsed for keywords to determine rarity and generate eco-facts.
4. If **OCR** is enabled, the system extracts text from the image to provide additional context for the analysis.

---

## ✦ Developed by TerraByte
♦ **ECOQUEST • EARTH DAY 2026** ♦
