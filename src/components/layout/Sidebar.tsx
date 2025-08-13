import React from 'react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: '📁', label: 'My Boards', active: false },
    { icon: '🎨', label: 'Moodboards', active: true },
    { icon: '✨', label: 'Inspirations', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
  ];

  return (
    <div className="w-64 bg-white rounded-r-2xl shadow-lg p-6">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">O</span>
        </div>
        <span className="text-2xl font-bold text-black">KIKO</span>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-colors ${
              item.active
                ? 'bg-kiko-green text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar; 