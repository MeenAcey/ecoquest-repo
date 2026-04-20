# Project Setup Checklist

## Prerequisites
- [ ] Node.js installed (run `node --version` in PowerShell)
- [ ] npm installed (run `npm --version` in PowerShell)
- [ ] PowerShell execution policy fixed (see solutions below)

## Dependency Installation
- [ ] `npm install` completes without errors
- [ ] `node_modules/` folder exists
- [ ] `package-lock.json` exists

## Environment & Configuration
- [ ] `.env.local` file exists (if required by the project)
- [ ] TypeScript dependencies installed
- [ ] ESLint configured (eslint.config.mjs present)
- [ ] Next.js configured (next.config.ts present)

## Build & Run
- [ ] `npm run build` completes without errors
- [ ] `npm run dev` starts development server
- [ ] App accessible at `http://localhost:3000`

## Additional Checks
- [ ] Git initialized (if using version control)
- [ ] All required API keys/secrets configured

---

## Fixing PowerShell Execution Policy

### Option 1: Bypass for Current Session (Temporary - Recommended First Try)
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```
Then run:
```powershell
npm install
```
This only affects the current PowerShell window and resets when you close it.

### Option 2: Use Command Prompt Instead (Quick Fix)
Open **Command Prompt (cmd)** instead of PowerShell and run:
```cmd
npm install
```

### Option 3: Permanently Change Execution Policy (Not Recommended)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
This allows local scripts to run. Be aware this is a system-wide change.

### Option 4: Use Windows Terminal with Bypass
In Windows Terminal, go to Settings → PowerShell profile and add:
```json
"commandline": "powershell.exe -ExecutionPolicy Bypass"
```

---

## What to Do Next
1. Try **Option 1** above (temporary bypass)
2. Run `npm install`
3. Go through the checklist above
4. Run `npm run dev` to start the development server
