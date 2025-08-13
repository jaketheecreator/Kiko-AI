# Assets Directory

This directory contains all static assets for the KIKO Moodboard Generator.

## Structure

```
src/assets/
├── images/          # Moodboard images and photos
│   ├── sample-moodboard.jpg
│   ├── retro-vibe.jpg
│   ├── soft-dreamy.jpg
│   ├── futuristic-glow.jpg
│   └── playful-pop.jpg
├── icons/           # UI icons and graphics
│   ├── sample-icon.svg
│   ├── moodboard-icon.svg
│   ├── palette-icon.svg
│   └── font-icon.svg
└── README.md        # This file
```

## Usage

### Importing Assets

```typescript
// Import an icon
import sampleIcon from '../../assets/icons/sample-icon.svg';

// Import an image
import sampleImage from '../../assets/images/sample-moodboard.jpg';
```

### Using the AssetLoader Component

```typescript
import { AssetLoader } from '../components/ui';

<AssetLoader
  imagePath="/path/to/image.jpg"
  iconPath="/path/to/icon.svg"
  altText="Description"
  className="custom-styles"
/>
```

### Using Asset Utilities

```typescript
import { getAssetPath, validateAsset } from '../utils/assetUtils';

// Get asset path with fallback
const path = getAssetPath({
  path: '/path/to/asset.jpg',
  fallback: '/fallback.jpg',
  alt: 'Description'
});

// Validate if asset exists
const exists = await validateAsset('/path/to/asset.jpg');
```

## File Types Supported

- **Images**: JPG, PNG, GIF, WebP
- **Icons**: SVG, PNG
- **Other**: Any web-safe format

## Best Practices

1. Use descriptive filenames
2. Keep file sizes reasonable for web use
3. Use appropriate formats (SVG for icons, WebP for photos when possible)
4. Always provide alt text for accessibility
5. Use the AssetLoader component for consistent error handling
6. Organize assets by type and purpose

## Adding New Assets

1. Place the file in the appropriate subdirectory
2. Update the `ASSET_PATHS` constant in `utils/assetUtils.ts` if needed
3. Import and use in your components
4. Test with the AssetDemo component to ensure proper loading 