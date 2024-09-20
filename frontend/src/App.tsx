// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-openai-dark text-openai-light">
      <div className="fixed inset-0 bg-gray-900 -z-10 max-w-7xl mx-auto"></div>
        <div className="min-h-screen bg-gray-900 max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="pt-4">
              <Navbar />
              <main className="p-4 sm:p-6 lg:p-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;