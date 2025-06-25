# Font Fixer (Node.js/Electron)

A cross-platform desktop app to copy ascender/descender from OS/2 to hhea table in font files.

## Features
- Cross-platform (macOS, Windows, Linux)
- Drag-and-drop or browse to select font files
- Backs up the original font before modifying
- Supports .ttf and .otf fonts

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the app:**
   ```bash
   npx electron .
   ```

## Usage
- Drag a .ttf or .otf font file onto the window, or click "Browse" to select one.
- The app will copy the ascender/descender from the OS/2 table to the hhea table (with correct sign conversion), and save a backup as `yourfont.ttf.backup`.
- Status messages will appear at the bottom.

## How it works
- Ascender: `hhea.ascender = OS/2.usWinAscent`
- Descender: `hhea.descender = -OS/2.usWinDescent` (note the sign)
- Both tables use FUnits, so no unit conversion is needed.

## Troubleshooting
- If you see errors about missing tables, the font may not be standard or supported.
- If you get permission errors, try running Electron as administrator (Windows) or with `sudo` (macOS/Linux, not recommended unless necessary).

## License
MIT # font-metrix-fixer
