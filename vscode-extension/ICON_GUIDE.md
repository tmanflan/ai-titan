# Icon Assets Guide

## Overview
This guide explains the icon assets used in the AI Titan DeepSeek Agent VS Code extension.

## Icon Files

### Required Files
- **`images/icon.png`** - Main extension icon (128x128 recommended)
  - Used in VS Code Marketplace listing
  - Displayed in Extensions panel
  - Referenced in `package.json`

### Optional Files (Your PNG Assets)
- **`images/icon-32x32.png`** - Small icon for toolbars and compact views
  - Perfect for status bar indicators
  - Used in small UI elements
  
- **`images/icon-256x256.png`** - High-resolution icon for detailed views
  - Used in extension details page
  - Better quality for high-DPI displays
  - Marketplace gallery images

### Source Files
- **`images/icon.svg`** - Vector source file
  - Scalable source for generating PNG files
  - Maintains quality at any size

## Technical Requirements

### VS Code Marketplace Standards
- **Format**: PNG (required)
- **Main Icon Size**: 128x128 pixels (recommended)
- **Background**: Transparent preferred
- **Color Depth**: 24-bit or 32-bit
- **Compression**: Optimized for web

### Your PNG Assets (32x32 & 256x256)
- **32x32**: Perfect for small UI elements, toolbars, status indicators
- **256x256**: Ideal for high-resolution displays, detailed views, marketplace gallery
- **Quality**: High contrast for both dark and light VS Code themes
- **Optimization**: Compressed for fast loading

## Usage in Extension

### package.json Configuration
```json
{
  "icon": "images/icon.png",
  "galleryBanner": {
    "color": "#1e1e1e",
    "theme": "dark"
  }
}
```

### Build Process
The `build-vsix.ps1` script automatically:
1. Checks for all icon files
2. Validates PNG format
3. Reports missing optional icons
4. Packages icons into VSIX

## Best Practices

### Design Guidelines
- **Simplicity**: Clear, recognizable design at small sizes
- **Contrast**: Works well on both dark and light backgrounds
- **Branding**: Consistent with AI Titan brand identity
- **Scalability**: Readable at 16x16 and crisp at 256x256

### File Optimization
- Use PNG compression tools (TinyPNG, ImageOptim)
- Remove unnecessary metadata
- Test visibility on different backgrounds
- Ensure crisp edges at target sizes

## Marketplace Impact

### Visual Appeal
- High-quality icons improve download rates
- Professional appearance builds trust
- Consistent branding across all sizes
- Better discoverability in marketplace

### SEO Benefits
- Proper icon sizing improves marketplace ranking
- Professional presentation increases user engagement
- Brand recognition through consistent iconography

## Troubleshooting

### Common Issues
- **Blurry icons**: Ensure exact pixel dimensions (no scaling)
- **Poor contrast**: Test on both dark/light VS Code themes
- **Large file size**: Optimize PNG compression
- **Missing icons**: Build script will report missing files

### Validation
Run the build script to validate all icon assets:
```powershell
.\build-vsix.ps1
```

The script will report:
- ✅ Found icons
- ⚠️ Missing required icons
- ℹ️ Missing optional icons

## Converting SVG to PNG

If you need to generate PNG files from the SVG source:

### Online Tools
- [CloudConvert](https://cloudconvert.com/svg-to-png)
- [Convertio](https://convertio.co/svg-png/)
- [Online-Convert](https://image.online-convert.com/convert-to-png)

### Command Line (ImageMagick)
```bash
# Generate different sizes
magick icon.svg -resize 32x32 icon-32x32.png
magick icon.svg -resize 128x128 icon.png
magick icon.svg -resize 256x256 icon-256x256.png
```

### Adobe Tools
- **Illustrator**: Export As → PNG → Set dimensions
- **Photoshop**: Save for Web → PNG-24 → Set size

---

**Note**: Your 32x32 and 256x256 PNG files are perfectly sized for VS Code extension requirements!