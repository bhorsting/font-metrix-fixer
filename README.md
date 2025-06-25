# Font Fixer

Font Fixer is a cross-platform desktop app that repairs font files by synchronizing the ascender/descender values in the hhea table with those in the OS/2 table. This is useful for fixing vertical metrics issues in TTF/OTF fonts, especially for web and design use.

---

## Features
- **Fixes ascender/descender values** in font files (TTF/OTF)
- **Automatic backup** of original font before modification
- **Cross-platform**: Works on macOS, Windows, and Linux
- **Simple GUI** built with Electron

---

## Installation

### Pre-built Binaries
Download the latest release for your platform from the [Releases](https://github.com/bhorsting/font-fixer/releases) page:
- **Windows:** `Font Fixer Setup.exe` (installer) or `Font Fixer.exe` (portable)
- **macOS:** `Font Fixer-x.x.x.dmg`
- **Linux:** `Font Fixer-x.x.x.AppImage` (portable) or `font-fixer_x.x.x_amd64.deb`

### From Source
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/font-fixer.git
   cd font-fixer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app in development mode:
   ```bash
   npm start
   ```

---

## Usage
1. Launch Font Fixer.
2. Click the button to select a font file (`.ttf` or `.otf`).
3. The app will:
   - Read the font
   - Copy ascender/descender values from the OS/2 table to the hhea table
   - Save a backup of the original font (`.backup` extension)
   - Write the fixed font as a new file (`.fixed.ttf` or `.fixed.otf`)
4. A success message will show the changes and file locations.

---

## Building

### Build for your current platform
```bash
npm run build
```

### Build for all platforms (macOS, Windows, Linux)
```bash
npm run build:all
```

### Build for a specific platform
```bash
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

See [BUILD_GUIDE.md](./BUILD_GUIDE.md) for more details.

---

## Troubleshooting
- **Linux build errors:** Ensure `homepage`, `author.email`, and `maintainer` are set in `package.json`.
- **AppImage not executable:** Run `chmod +x Font\ Fixer-x.x.x.AppImage`.
- **Windows build fails on macOS/Linux:** Some advanced features may require building on Windows or using CI.
- **Missing dependencies:** Run `npm install` to ensure all dependencies are present.

---

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit and push (`git commit -am 'Add new feature' && git push`)
5. Open a pull request

---

## License
MIT

---

## Credits
- Built with [Electron](https://electronjs.org/) and [opentype.js](https://github.com/opentypejs/opentype.js)

---

## Contact
For questions or support, open an issue on GitHub

## What's New
- Initial release of Font Fixer
- Cross-platform support (Windows, macOS, Linux)
- Fixes font ascender/descender values by copying from OS/2 to hhea tables
- Automatic backup of original fonts

## Downloads
- **Windows:** Use "Font Fixer Setup 1.0.0.exe" for installation or "Font Fixer 1.0.0.exe" for portable use
- **macOS:** Use "Font Fixer-1.0.0.dmg" for Intel Macs or "Font Fixer-1.0.0-arm64.dmg" for Apple Silicon
- **Linux:** Use "Font Fixer-1.0.0.AppImage" for most distributions or "font-fixer_1.0.0_amd64.deb" for Ubuntu/Debian
