# Testing Instructions for EcoQuest Project

This document provides instructions on how to test run the EcoQuest project and check its functionalities.

## Prerequisites

- Node.js installed (version 18 or higher recommended)
- npm or yarn package manager

## Setup and Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Open the Application**:
   - Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
   - The application should load the main page

## Testing Functionalities

### Main Page
- Visit the root page (`/`) to see the main interface
- Check for any interactive elements, animations (using Framer Motion), and styling (Tailwind CSS)

### Scanner Feature
- Navigate to `/scanner` to access the scanner page
- Test any scanning functionalities (if implemented)
- Check for UI components like ItemCard

### API Endpoints
- The project includes an API route at `/api/analyze`
- You can test this by making requests to `http://localhost:3000/api/analyze`
- Use tools like Postman or curl to send requests

### XP System
- Check the `lib/xp.ts` file for XP-related logic
- Test any XP calculations or features in the app

### Components
- Verify that components like `ItemCard.tsx` render correctly
- Check for any TypeScript errors or linting issues

## Additional Commands

- **Build for Production**:
  ```bash
  npm run build
  ```

- **Start Production Server**:
  ```bash
  npm run start
  ```

- **Run Linter**:
  ```bash
  npm run lint
  ```

## Troubleshooting

- If the server doesn't start, ensure all dependencies are installed
- Check for any console errors in the browser developer tools
- Verify that the Google Generative AI key (if used) is properly configured (see `studyspace-finder-6aeecf3aaf6e.json`)

## Notes

- The app uses Next.js 16, React 19, and TypeScript
- Tailwind CSS is used for styling
- Framer Motion for animations
- Google Generative AI integration