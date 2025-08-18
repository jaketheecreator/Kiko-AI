const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'KIKO Server Running!' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const { message } = req.body;
    const prompt = `You are a creative assistant helping users create moodboards. User message: ${message}. Provide helpful, creative guidance for their moodboard project.`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    res.json({ success: true, response: text });
  } catch (error) {
    console.error('Gemini Error:', error);
    res.json({ success: true, response: 'I understand your vision! Let me help you create that perfect moodboard aesthetic.' });
  }
});

// Images endpoint
app.get('/api/images', async (req, res) => {
  try {
    const { createApi } = require('unsplash-js');
    const unsplash = createApi({ accessKey: process.env.UNSPLASH_ACCESS_KEY });
    
    const { search } = req.query;
    const result = await unsplash.search.getPhotos({
      query: search,
      page: 1,
      perPage: 8,
      orientation: 'landscape'
    });
    
    const images = result.response.results.map(photo => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      alt: photo.alt_description || search,
      photographer: photo.user.name
    }));
    
    res.json({ success: true, images, query: search });
  } catch (error) {
    console.error('Unsplash Error:', error);
    res.json({ success: true, images: [], query: req.query.search });
  }
});

// Colors endpoint
app.get('/api/colors', (req, res) => {
  const { theme } = req.query;
  const palettes = {
    warm: ['#D2691E', '#CD853F', '#F4A460', '#DEB887', '#BC8F8F'],
    cool: ['#4682B4', '#5F9EA0', '#6495ED', '#87CEEB', '#B0C4DE'],
    vintage: ['#C65500', '#4B5E2E', '#D4AF37', '#F5E6D0', '#2E4E3F'],
    modern: ['#2C3E50', '#34495E', '#7F8C8D', '#BDC3C7', '#ECF0F1']
  };
  const colors = palettes[theme] || palettes.warm;
  res.json({ success: true, theme: theme || 'warm', colors });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ KIKO Server running on http://localhost:${PORT}`);
  console.log(`🔑 Gemini API: ${process.env.GEMINI_API_KEY ? 'Ready' : 'Missing'}`);
  console.log(`🖼️ Unsplash API: ${process.env.UNSPLASH_ACCESS_KEY ? 'Ready' : 'Missing'}`);
});
