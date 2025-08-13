import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import MoodboardPage from './components/MoodboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/moodboard" element={<MoodboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
