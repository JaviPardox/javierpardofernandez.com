import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-openai-dark z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">Your Name</div>
          <div className="hidden md:flex space-x-4 mx-auto">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/portfolio" className="hover:text-white">Portfolio</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-openai-light focus:outline-none">
              {isOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-openai-dark bg-opacity-80 backdrop-blur-sm z-40">
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