import React, { useState, useEffect } from 'react';

// Import assets with fallback handling
import sampleIcon from '../../assets/icons/sample-icon.svg';

interface AssetLoaderProps {
  imagePath?: string;
  iconPath?: string;
  altText?: string;
  className?: string;
}

const AssetLoader: React.FC<AssetLoaderProps> = ({
  imagePath,
  iconPath = sampleIcon,
  altText = 'Asset',
  className = ''
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);
  const [iconError, setIconError] = useState(false);

  // Handle image loading with fallback
  useEffect(() => {
    if (imagePath) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
      img.src = imagePath;
    }
  }, [imagePath]);

  // Handle icon loading with fallback
  useEffect(() => {
    if (iconPath) {
      const img = new Image();
      img.onload = () => setIconLoaded(true);
      img.onerror = () => setIconError(true);
      img.src = iconPath;
    }
  }, [iconPath]);

  return (
    <div className={`asset-loader ${className}`}>
      {/* Image Display */}
      {imagePath && (
        <div className="image-container">
          {imageLoaded && !imageError ? (
            <img 
              src={imagePath} 
              alt={altText}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          ) : imageError ? (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Image not found</span>
            </div>
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Loading...</span>
            </div>
          )}
        </div>
      )}

      {/* Icon Display */}
      {iconPath && (
        <div className="icon-container mt-4">
          {iconLoaded && !iconError ? (
            <img 
              src={iconPath} 
              alt="Icon"
              className="w-8 h-8"
            />
          ) : iconError ? (
            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">!</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-xs text-gray-400">...</span>
            </div>
          )}
        </div>
      )}

      {/* Asset Information */}
      <div className="mt-2 text-sm text-gray-600">
        <p>Image Path: {imagePath || 'Not provided'}</p>
        <p>Icon Path: {iconPath || 'Not provided'}</p>
        <p>Status: {imageError ? 'Image Error' : imageLoaded ? 'Image Loaded' : 'Image Loading'}</p>
      </div>
    </div>
  );
};

export default AssetLoader; 