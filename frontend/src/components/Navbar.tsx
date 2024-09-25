import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const closeNavbar = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300); // Ensure it closes after the animation completes
  }, []);
  

  const handleClickOutside = useCallback((event: Event) => {
    if (menuRef.current && !menuRef.current.contains(event.target as HTMLElement)) {
      closeNavbar(); 
    }
  }, [menuRef, closeNavbar]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsAnimating(true), 0);  // Delay to trigger open transition
    } else {
      setIsAnimating(false);  // Reset when closing
    }
  }, [isOpen]);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, linkName: string) => {
    if (activeLink !== linkName) {
      setActiveLink(linkName);
    }
  };

  return (
    <nav className="sticky top-6 z-50 flex">
      <div className="w-full flex md:justify-center justify-end">
        <div className="inline-block bg-zinc-800/90 rounded-full pl-5 pr-4 py-0.5 ring-1 ring-white/10 text-sm font-light text-zinc-200 hover:ring-white/20">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex space-x-4">
              <Link to="/" className={`relative block transition hover:text-teal-400 px-1.5 py-2 nav-link ${activeLink === 'home' ? 'text-teal-400' : ''}`} onClick={(e) => handleLinkClick(e, 'home')}>
              Home
              <span className={`absolute inset-x-0 -bottom-[0.2rem] h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0 transition-opacity duration-300 ease-in-out ${activeLink === 'home' ? 'opacity-100' : 'opacity-0'}`}></span>
              </Link>
              <Link to="/about" className={`relative block transition hover:text-teal-400 px-1.5 py-2 nav-link ${activeLink === 'about' ? 'text-teal-400' : ''}`} onClick={(e) => handleLinkClick(e, 'about')}>
              About
              <span className={`absolute inset-x-0 -bottom-[0.2rem] h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0 transition-opacity duration-300 ease-in-out ${activeLink === 'about' ? 'opacity-100' : 'opacity-0'}`}></span>
              </Link>
              <Link to="/portfolio" className={`relative block transition hover:text-teal-400 px-1.5 py-2 nav-link ${activeLink === 'portfolio' ? 'text-teal-400' : ''}`} onClick={(e) => handleLinkClick(e, 'portfolio')}>
              Portfolio
              <span className={`absolute inset-x-0 -bottom-[0.2rem] h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0 transition-opacity duration-300 ease-in-out ${activeLink === 'portfolio' ? 'opacity-100' : 'opacity-0'}`}></span>
              </Link>
              <Link to="/contact" className={`relative block transition hover:text-teal-400 px-1.5 py-2 nav-link ${activeLink === 'contact' ? 'text-teal-400' : ''}`} onClick={(e) => handleLinkClick(e, 'contact')}>
              Contact
              <span className={`absolute inset-x-0 -bottom-[0.2rem] h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0 transition-opacity duration-300 ease-in-out ${activeLink === 'contact' ? 'opacity-100' : 'opacity-0'}`}></span>
              </Link>
            </div>
            <div className="md:hidden py-2">
              <button onClick={() => { setIsOpen(!isOpen); setTimeout(() => setIsAnimating(true), 0);}} className="text-zinc-200 flex items-center focus:outline-none hover:text-teal-400">
                {isOpen ? 'Menu' : 'Menu'}
                <svg viewBox="0 0 8 6" aria-hidden="true" className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-400">
                  <path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-all duration-300 ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-100'
          }`}
        >          
          <div ref={menuRef}
            className={`container mx-auto px-4 py-8 rounded-3xl bg-zinc-900 ring-1 ring-zinc-800 mt-8 transition-all duration-300 ${
              isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
          <div className="flex flex-row-reverse items-center justify-between px-4">
              <button aria-label="Close menu" className="-m-1 p-1" type="button" onClick={() => closeNavbar()}>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-zinc-500 dark:text-zinc-400">
                  <path d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Navigation</h2>
            </div>
            <div className="flex flex-col space-y-3 text-zinc-200 pt-6 pl-4">
              <Link to="/" className="text-sm hover:text-teal-400" onClick={() => closeNavbar()}>Home</Link>
              <span className="block h-px mr-4 bg-gradient-to-r from-teal-400/40 via-teal-400/20 to-teal-400/40"></span>
              <Link to="/about" className="text-sm hover:text-teal-400" onClick={() => closeNavbar()}>About</Link>
              <span className="block h-px mr-4 bg-gradient-to-r from-teal-400/40 via-teal-400/20 to-teal-400/40"></span>
              <Link to="/portfolio" className="text-sm hover:text-teal-400" onClick={() => closeNavbar()}>Portfolio</Link>
              <span className="block h-px mr-4 bg-gradient-to-r from-teal-400/40 via-teal-400/20 to-teal-400/40"></span>
              <Link to="/contact" className="text-sm hover:text-teal-400" onClick={() => closeNavbar()}>Contact</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;