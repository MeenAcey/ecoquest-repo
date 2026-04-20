# EcoQuest — Changelog

> Developed by **TerraByte** · Earth Day 2026
> Current Version: **v0.2.1**

---

## [v0.2.1] — Session 2 · 2026-04-20

### ✨ New Features

#### Florence-2 Text Prompt Query
- Added a `prompt` and `text` input to the Roboflow Workflows API payload.
- Florence-2 now receives a guided instruction when analyzing an image:
  *"Identify the item. What material could it be? Based on our rarity classes (Common, Rare, Epic, Legendary), determine the exp gained, ways to recycle the object, and determine the eco-knowledge."*
- This nudges the vision model to return richer, more material-aware descriptions.
- Downstream game logic (rarity detection, XP, eco-facts, upcycle recipes) continues to work reliably via keyword-matching as a fallback.

#### Card Flip Animation on Scan Result
- The scan result panel now performs a **3D horizontal card flip** (`rotateY: 90 → 0`) using a spring animation when results appear after scanning.
- Exit animation also flips out (`rotateY: 0 → -90`) for a polished feel.

#### Yellowish Glow Behind Scanner Card
- Added an ambient gold/amber radial glow (`#d3bc8e`) positioned directly behind the scanner card using an absolutely-positioned blurred div.
- Gives the main card a premium "golden aura" look.

#### Player Stats Bubble (Home Page)
- Added a floating **Player Stats Bubble** on the home page showing the user's current **Rank** and **Lifetime XP**.
- Uses `position: fixed` so it follows the user as they scroll down the page.
- Positioned at the **bottom-right** corner of the screen.
- Styled with a blurred glass background, gold border, and the `✦` icon to match the app's HoYoverse aesthetic.
- Animates in from below on page load.

#### Rank Ascension Table (Home Page)
- Added a new **"RANK ASCENSION"** info box to the home page info grid.
- Displays all 6 ranks with the exact XP required to unlock each one:
  | Rank | XP Required |
  |---|---|
  | Seedling | 0 XP |
  | Sapling | 100 XP |
  | Grove Keeper | 300 XP |
  | Forest Guardian | 600 XP |
  | Earth Champion | 1000 XP |
  | Gaia Legend | 2000 XP |
- Home page info grid updated from **2 columns** to **3 columns** (`lg:grid-cols-3`) to accommodate the new box.

#### TerraByte Footer
- Added the group name **TERRABYTE** to the footer of both the **Home page** and the **Scanner page**.
- Displayed above the `♦ ECOQUEST • EARTH DAY 2026 ♦` event line.
- On the **Scanner page**, the footer was moved **outside of the card** to sit correctly at the bottom of the page as a true page footer.

---

### 🛠️ Fixes & Improvements

#### Text Readability Improvements (Scanner Result Panel)
- Enlarged all text in the scan result panel for better readability.
- **Item name** bumped from `18px` to `22px` and set to `font-bold`.
- **Type of Waste / XP** bumped from `13px` to `15px` with `font-bold`.
- **Description** bumped from `13px` to `15px` with `font-semibold`.
- **Crafting Recipe** bumped from `14px` to `16px` with `font-bold`.
- **Eco Knowledge** bumped from `13px` to `15px` with `font-semibold`.
- Section labels (CRAFTING RECIPE, ECO KNOWLEDGE) bumped from `8px` to `10px` with `font-bold`.
- XP display now shows a `+` prefix (e.g. `+25 XP`) for clarity.

#### Footer Visibility
- Footer text color updated from dark/invisible `#2e3347` to visible `#8b92a5`.
- Group name "TERRABYTE" uses a brighter `#ece5d8` color.
- Diamond accent opacity increased from `0.25–0.3` to `0.6`.
- Font size bumped from `8px` to `10px`.

#### Scanner Page Layout Fix
- Scanner page `<main>` changed from `flex items-center` to `flex flex-col items-center` to correctly stack the card and the footer vertically.

---

## [v0.1.0] — Session 1 · 2026-04-19

### ✨ New Features

#### Roboflow Florence-2 Integration
- Connected to the Roboflow Serverless Workflows API using the `florence2-base-demo` workflow.
- Image is sent as a `base64` string; Florence-2 returns a descriptive text caption.
- A recursive string extractor parses the longest meaningful string from the API response, skipping base64 blobs and URLs.

#### Rarity & XP System
- Implemented a keyword-based rarity detection system across 4 tiers:
  - **Common** (25 XP): Plastic, Paper, Cardboard, etc.
  - **Rare** (50 XP): Glass, Metal, Aluminum, etc.
  - **Epic** (100 XP): Electronics, Phone, Wood, Iron, etc.
  - **Legendary** (200 XP): Battery, Chemical, Hazard, E-waste, etc.

#### Persistent XP & Rank (localStorage)
- XP is stored and retrieved from `localStorage` under the key `ecoquest_xp`.
- Rank is calculated from cumulative XP using the `RANK_THRESHOLDS` table.
- XP and Rank persist across page refreshes and browser sessions.

#### Level-Up Animation
- A `LEVEL UP!` overlay banner animates over the XP bar when the user crosses a rank threshold after a successful scan.

#### Upcycle Recipe & Eco-Fact Engine
- `buildUpcycle()` function generates a contextual, creative recycling suggestion based on the detected material and rarity.
- `getEcoFact()` function returns a relevant environmental fact for the scanned material.

#### Back Button & Another Scan
- Added a styled **RETURN** button (top-left of scanner) using the HoYoverse clip-path button style.
- Added an **⟲ ANOTHER SCAN** button that resets the image and result state for a new scan session.

#### HoYoverse UI Theme
- Full dark fantasy aesthetic using `Cinzel` (title) and `Crimson Text` (body) Google Fonts.
- Animated hanging gems, floating diamond particles, and star particles across both pages.
- Clip-path octagons used on cards, buttons, and info blocks for a premium RPG feel.
- Ambient radial glows (green, purple, gold) for atmospheric depth.

#### Home Page Sections
- **HOW TO OPERATE** — step-by-step user guide.
- **RARITY REWARDS** — color-coded rarity tiers with XP values and example materials.
- **RANK ASCENSION** — full rank ladder with XP thresholds.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| AI Vision | Roboflow Workflows (Florence-2) |
| Persistence | Browser `localStorage` |
| Fonts | Google Fonts (Cinzel, Crimson Text) |
