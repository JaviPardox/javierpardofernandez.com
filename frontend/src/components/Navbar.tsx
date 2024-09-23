import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-6 z-50 flex justify-center">
      <div className="inline-block bg-zinc-800/90 rounded-full px-5 py-0.5 ring-1 ring-white/10 text-sm font-light text-zinc-200">
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-teal-400 px-1.5 py-2">Home</Link>
            <Link to="/about" className="hover:text-teal-400 px-1.5 py-2">About</Link>
            <Link to="/portfolio" className="hover:text-teal-400 px-1.5 py-2">Portfolio</Link>
            <Link to="/contact" className="hover:text-teal-400 px-1.5 py-2">Contact</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-openai-light focus:outline-none">
              {isOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-openai-dark bg-opacity-90 z-40">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-2xl hover:text-white" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/about" className="text-2xl hover:text-white" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/portfolio" className="text-2xl hover:text-white" onClick={() => setIsOpen(false)}>Portfolio</Link>
              <Link to="/contact" className="text-2xl hover:text-white" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;