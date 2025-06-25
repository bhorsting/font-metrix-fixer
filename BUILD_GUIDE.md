# Font Fixer - Build Guide

This guide explains how to build the Font Fixer app for Windows and Linux platforms.

## Prerequisites

### For Windows builds:
- **On macOS/Linux**: No additional setup required (cross-compilation works)
- **On Windows**: No additional setup required

### For Linux builds:
- **On macOS**: No additional setup required (cross-compilation works)
- **On Windows**: No additional setup required
- **On Linux**: No additional setup required

## Build Commands

### Build for specific platforms:

```bash
# Build for Windows only
npm run build:win

# Build for Linux only  
npm run build:linux

# Build for macOS only
npm run build:mac

# Build for all platforms
npm run build:all
```

### Build for current platform only:
```bash
npm run build
```

## Build Outputs

After building, you'll find the following files in the `dist/` directory:

### Windows Builds:
- `Font Fixer Setup.exe` - NSIS installer (recommended for distribution)
- `Font Fixer.exe` - Portable executable (no installation required)

### Linux Builds:
- `Font Fixer-x.x.x.AppImage` - AppImage (portable, works on most Linux distributions)
- `font-fixer_x.x.x_amd64.deb` - Debian package (for Ubuntu/Debian-based systems)

### macOS Builds:
- `Font Fixer-x.x.x.dmg` - DMG installer

## Distribution

### Windows:
- **For end users**: Distribute `Font Fixer Setup.exe` - it's a proper installer
- **For portable use**: Distribute `Font Fixer.exe` - users can run it without installation

### Linux:
- **For most users**: Distribute the `.AppImage` file - it's portable and works on most distributions
- **For Ubuntu/Debian**: Distribute the `.deb` package for easy installation via package manager

## Troubleshooting

### Common Issues:

1. **Build fails with "electron-builder not found"**
   ```bash
   npm install --save-dev electron-builder
   ```

2. **Build fails with permission errors (Linux)**
   ```bash
   sudo chmod +x dist/Font\ Fixer-x.x.x.AppImage
   ```

3. **Windows build fails on non-Windows systems**
   - This is normal for some complex dependencies
   - Try building on a Windows machine or use a CI/CD service

4. **Linux AppImage doesn't run**
   - Make sure it's executable: `chmod +x Font\ Fixer-x.x.x.AppImage`
   - Some distributions require additional libraries

### Platform-Specific Notes:

**Windows:**
- The NSIS installer creates a proper Windows application with start menu entry
- The portable version can be run from any location without installation

**Linux:**
- AppImage is the most universal format - works on most distributions
- Debian package integrates with the system package manager
- Users may need to make AppImage executable: `chmod +x Font\ Fixer-x.x.x.AppImage`

## Advanced Configuration

### Customizing the build:

You can modify the `build` section in `package.json` to:
- Change the app icon
- Modify installer settings
- Add code signing
- Change output formats

### Example customizations:

```json
{
  "build": {
    "win": {
      "icon": "build/icon.ico",
      "requestedExecutionLevel": "asInvoker"
    },
    "linux": {
      "icon": "build/icon.png"
    }
  }
}
```

## Code Signing (Optional)

For production distribution, consider code signing:

### Windows:
- Purchase a code signing certificate
- Add certificate path to build configuration

### macOS:
- Requires Apple Developer account
- Add certificate and provisioning profile

### Linux:
- Usually not required for open source applications

## Automated Builds

For continuous integration, you can use:
- GitHub Actions
- GitLab CI
- Jenkins
- Azure DevOps

These services can automatically build for all platforms when you push code changes. 