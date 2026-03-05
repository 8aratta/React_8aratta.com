import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Workspace from './pages/Workspace/Workspace';
import Travel from './pages/Travel/Travel';
import { Navigation, ThemeToggle } from './components';
import { ThemeProvider } from './contexts';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navigation />
        <ThemeToggle isMobile={true} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/travel" element={<Travel />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
