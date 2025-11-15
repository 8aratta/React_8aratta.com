import React from 'react';
import { mergeStyles } from '@fluentui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navigation from './components/Navigation';

const navClass = mergeStyles({
  padding: '1rem',
  background: '#f0f0f0',
  marginBottom: '2rem',
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
});

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
