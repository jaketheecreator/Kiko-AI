import React, { useState } from 'react';

const CustomPrompt: React.FC = () => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      console.log('Generating moodboard for:', prompt);
      // TODO: Implement moodboard generation
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center space-x-4">
          {/* Attachment Button */}
          <button
            type="button"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <span className="text-gray-600">📎</span>
          </button>

                     {/* Image Upload Button */}
           <button
             type="button"
             className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
           >
             <span className="text-gray-600">📷</span>
           </button>

                     {/* Input Field */}
           <input
             type="text"
             value={prompt}
             onChange={(e) => setPrompt(e.target.value)}
             placeholder="Type your prompt here..."
             className="flex-1 px-4 py-2 text-lg border-none outline-none bg-transparent"
           />

                     {/* Send Button */}
           <button
             type="submit"
             className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
             disabled={!prompt.trim()}
           >
             <span className="text-white">▶️</span>
           </button>
        </div>
      </form>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          Built with Love from Amana
        </p>
      </div>
    </div>
  );
};

export default CustomPrompt; 