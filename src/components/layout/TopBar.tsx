import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-white px-8 py-4 border-b border-gray-200">
      <div className="flex justify-end items-center space-x-4">
        {/* Create New Button */}
        <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
          <span className="text-white text-xl">+</span>
        </button>

        {/* Credits */}
        <div className="bg-kiko-yellow px-4 py-2 rounded-full flex items-center space-x-2">
          <span className="text-black font-medium">0/1000</span>
          <span className="text-black">💎</span>
        </div>

        {/* Dark Mode Toggle */}
        <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="text-gray-600">☀️</span>
        </button>

        {/* User Profile */}
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-medium">👤</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 