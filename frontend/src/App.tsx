import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ResponsiveCenterLayout from './components/ResponsiveCenterLayout';
import Home from './pages/Home';
import Blog from './pages/Blog';


const App: React.FC = () => {
  return (
    <Router>
      <ResponsiveCenterLayout>
            <div className="pt-1">
              <Navbar />
              <main className="p-4 sm:p-6 lg:p-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<Blog />} />
                </Routes>
              </main>
            </div>
      </ResponsiveCenterLayout>
    </Router>
  );
}

export default App;