import React from 'react';

interface VibeCard {
  id: string;
  title: string;
  description: string;
  colors: string[];
  images: string[];
}

const VibeCards: React.FC = () => {
  const vibeCards: VibeCard[] = [
    {
      id: 'retro',
      title: 'Retro Vibe',
      description: 'Bold colors, funky fonts, and vintage cool.',
      colors: ['#90EE90', '#2D5A27', '#696969', '#D2B48C', '#8B4513'],
      images: ['🚗', '🏛️', '👗', '📻', '🎬']
    },
    {
      id: 'dreamy',
      title: 'Soft & Dreamy',
      description: 'Pastels, glow, and cloud-like calm.',
      colors: ['#FFB6C1', '#FFDAB9', '#FFFFE0', '#E6E6FA', '#FF69B4'],
      images: ['☁️', '🌸', '💫', '🌈', '🦋']
    },
    {
      id: 'earthy',
      title: 'Earthy Tones',
      description: 'Warm neutrals, natural textures, and calm vibes.',
      colors: ['#2D5A27', '#8B4513', '#D2B48C', '#696969', '#000000'],
      images: ['🌿', '🍄', '🪵', '🌱', '🪨']
    },
    {
      id: 'playful',
      title: 'Playful Pop',
      description: 'Bright colors, bouncy shapes, and good energy.',
      colors: ['#2D5A27', '#8B4513', '#D2B48C', '#696969', '#FFFF00'],
      images: ['🦆', '🎨', '🎈', '🌈', '⭐']
    }
  ];

  // Only show first 3 cards to match design
  const visibleCards = vibeCards.slice(0, 3);

  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {visibleCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            {/* Image Collage */}
            <div className="grid grid-cols-3 gap-2 mb-4 h-32">
              {card.images.map((image, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg flex items-center justify-center text-2xl"
                >
                  {image}
                </div>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">
              {card.description}
            </p>

            {/* Color Palette */}
            <div className="flex space-x-2">
              {card.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VibeCards; 