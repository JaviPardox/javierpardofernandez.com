import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScrollTo";
import { playPattern, stopMusic } from "../utils/music";
import { EIGHT_BIT_PATTERN, EIGHT_BIT_BPM } from "../components/music";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string | null>(
    location.pathname === '/blog' || /^\/articles\/\d+$/.test(location.pathname)
    ? 'blog' 
    : location.pathname === '/'
    ? 'home'
    : null
  );
  const [isMdViewport, setIsMdViewport] = useState(window.innerWidth >= 768);
  const [isLgViewport, setIsLgViewport] = useState(window.innerWidth >= 1024);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const showBlog = false;

  const handleMusicToggle = async () => {
    if (isMusicPlaying) {
      stopMusic();
      setIsMusicPlaying(false);
    } else {
        await playPattern(EIGHT_BIT_PATTERN, EIGHT_BIT_BPM);
        setIsMusicPlaying(true);
    }
  };

  const closeNavbar = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300); // Ensure it closes after the animation completes
  }, []);

  const handleClickOutside = useCallback(
    (event: Event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as HTMLElement)
      ) {
        closeNavbar();
      }
    },
    [menuRef, closeNavbar]
  );

  // Hook to make sure the highlighting stays consistent when navigating
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveLink("home");
    }
    else if (location.pathname === "/blog" || /^\/articles\/\d+$/.test(location.pathname)) {
      setActiveLink("blog");
    }
    else {
      setActiveLink(null);
    }

  }, [location.pathname])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const html = document.documentElement;
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling
      html.classList.add('no-scroll');
      document.body.classList.add('no-scroll');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      setTimeout(() => setIsAnimating(true), 0); // Delay to trigger open transition
    } else {
      setIsAnimating(false); // Reset when closing
      
      // Restore scrolling
      html.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      // Cleanup on unmount
      html.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };

  }, [isOpen]);

  useEffect(() => {
    // Function to close menu on large screen
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        closeNavbar();
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, closeNavbar]);

  const navigate = useNavigate();
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLElement>,
    linkName: string
  ) => {
    event.preventDefault(); // Prevent default anchor behavior

    const currentPath = window.location.pathname;

    if (linkName === "home") {
      if (currentPath !== "/") {
        setActiveLink("home");
        navigate("/");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "auto" });
        }, 200);  // Transition time
      } else {
        if (isSafari) {
          smoothScrollTo(0, 600);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    } else if (linkName === "blog") {
      if (currentPath !== "/blog") {
        setActiveLink("blog");
        navigate("/blog");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "auto" });
        }, 200);  // Transition time
      } else {
        if (isSafari) {
          smoothScrollTo(0, 600);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    } else {
      if (currentPath !== "/") {
        navigate("/");
        waitForElementToRender(linkName); // Observe and scroll after navigation
      } else {
        scrollToSection(linkName); // Directly scroll if already on "/"
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop;

      //console.log(`Scrolling to ${sectionId}:`, {
      //  offsetTop: elementPosition,
      //  scrollTo: elementPosition - offset,
      //});
      if (isSafari) {
        const distance = Math.abs(elementPosition - offset - window.scrollY);
        const duration = Math.min(1000, Math.max(300, distance * 0.5));
        smoothScrollTo(elementPosition - offset, duration);
      } else {
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
    }
    else {
      console.warn(`Element with ID '${sectionId}' not found.`);
    }
  };

  const waitForElementToRender = (sectionId: string) => {
    const observer = new MutationObserver(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        //console.log(`Target section ${sectionId} rendered.`);
        observer.disconnect();
        
        let positions: number[] = [];
        let checkCount = 0;
        const maxChecks = 15;
        const requiredStableChecks = 3;
        
        const checkPosition = () => {
          const currentPosition = element.offsetTop;
          positions.push(currentPosition);
          //console.log(`Check ${checkCount + 1}: Position for ${sectionId}:`, currentPosition);
          
          // Check if last N positions are the same
          const lastPositions = positions.slice(-requiredStableChecks);
          const isStable = lastPositions.length >= requiredStableChecks && 
                          lastPositions.every(pos => pos === lastPositions[0]);
          
          if (isStable) {
            //console.log(`Position stabilized for ${sectionId} at:`, currentPosition);
            scrollToSection(sectionId);
          } else if (checkCount < maxChecks) {
            checkCount++;
            setTimeout(checkPosition, 50);
          } else {
            //console.warn(`Position didn't fully stabilize for ${sectionId}, using last position:`, currentPosition);
            scrollToSection(sectionId);
          }
        };
        
        setTimeout(checkPosition, 100);
      }
    });
  
    // Observe changes in the DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  
    //console.warn(`Observer started for ${sectionId}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Only applies when at home
      if (window.location.pathname !== "/") return;

      const sections = ["home", "offer", "experience", "records"];
      let maxVisibleSection = "home";
      let maxVisibleArea = 0;

      // Fixing home highlighting
      const homeThreshold = 350;
      const scrollPosition = window.scrollY;

      // If we're near the top, always show home as active
      if (scrollPosition < homeThreshold) {
        setActiveLink("home");
        return;
      }

      sections.forEach((section) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, window.innerHeight) - 
                              Math.max(rect.top, 0);
          
          if (visibleHeight > maxVisibleArea) {
            maxVisibleArea = visibleHeight;
            maxVisibleSection = section;
          }
        }
      });

      setActiveLink(maxVisibleSection);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Check if the user scrolled more than 50px
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMdViewport(window.innerWidth >= 768);
      setIsLgViewport(window.innerWidth >= 1024);
    };

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <nav
      style={{
        position: 'fixed',
        left: 0,
        zIndex: 50,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: isMdViewport ? '0' : '10%',
        paddingTop: scrolled ? '1rem' : '1.5rem',
        paddingBottom: scrolled ? '1rem' : '1.5rem',
        transition: 'padding 0.3s ease-in-out',
        overflow: 'visible',
        background: 'rgba(24, 24, 27, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        //borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }}
    >
      <div style={{
        position: 'absolute',
        left: isLgViewport ? '23.5%' : '10%',
      }}>
        <img
          src="/jpf-logo-transparent.png"
          alt="Javier Pardo Fernandez Logo"
          style={{
            width: '40px',
            height: '40px',
            objectFit: 'contain',
            marginRight: '1rem',
            cursor: 'pointer'
          }}
          onClick={(e) => handleLinkClick(e, "home")}
        />
      </div>
      <div className="w-full flex md:justify-center justify-end">
        <div 
          className="inline-block rounded-full pl-5 pr-4 py-0.5 text-sm font-light text-zinc-200 transition-all duration-300"
          style={{
            background: 'rgba(24, 24, 27, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className={`relative block transition hover:text-teal-400 px-1.5 py-2 nav-link ${
                  activeLink === "home" ? "text-teal-400" : ""
                }`}
                onClick={(e) => handleLinkClick(e, "home")}
              >
                Home
                <span
                  className={`absolute inset-x-0 -bottom-[0.2rem] h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0 transition-opacity duration-300 ease-in-out ${
                    activeLink === "home" ? "opacity-100" : "opacity-0"
                  }`}
                ></span>
              </Link>
              <Link
                to="/"
                className={`relative block transition hover:text-teal-400 px-1.5 py-2 nav-link ${
                  activeLink === "offer" ? "text-teal-400" : ""
                }`}
                onClick={(e) => handleLinkClick(e, "offer")}
              >
                Offer
                <span
                  className={`absolute inset-x-0 -bottom-[0.2rem] h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0 transition-opacity duration-300 ease-in-out ${
                    activeLink === "offer" ? "opacity-100" : "opacity-0"
                  }`}
                ></span>
              </Link>
              <Link
                to="/"
                className={`relative block transition hover:text-teal-400 px-1.5 py-2 nav-link ${
                  activeLink === "experience" ? "text-teal-400" : ""
                }`}
                onClick={(e) => handleLinkClick(e, "experience")}
              >
                Experience
                <span
                  className={`absolute inset-x-0 -bottom-[0.2rem] h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0 transition-opacity duration-300 ease-in-out ${
                    activeLink === "experience" ? "opacity-100" : "opacity-0"
                  }`}
                ></span>
              </Link>
              <Link
                to="/"
                className={`relative block transition hover:text-teal-400 px-1.5 py-2 nav-link ${
                  activeLink === "records" ? "text-teal-400" : ""
                }`}
                onClick={(e) => handleLinkClick(e, "records")}
              >
                Records
                <span
                  className={`absolute inset-x-0 -bottom-[0.2rem] h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0 transition-opacity duration-300 ease-in-out ${
                    activeLink === "records" ? "opacity-100" : "opacity-0"
                  }`}
                ></span>
              </Link>
              {showBlog && (
                <>
                  <Link
                    to="/blog"
                    className={`relative block transition hover:text-teal-400 px-1.5 py-2 nav-link ${
                      activeLink === "blog" ? "text-teal-400" : ""
                    }`}
                    onClick={(e) => handleLinkClick(e, "blog")}
                  >
                    Blog
                    <span
                      className={`absolute inset-x-0 -bottom-[0.2rem] h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0 transition-opacity duration-300 ease-in-out ${
                        activeLink === "blog" ? "opacity-100" : "opacity-0"
                      }`}
                    ></span>
                  </Link>
                </>
              )}
            </div>
            <div className="md:hidden py-2 flex items-center gap-3">
              {/* Music Toggle Button - Mobile */}
              <button
                onClick={handleMusicToggle}
                className={`p-1.5 rounded-full transition-all duration-200 ${
                  isMusicPlaying 
                    ? 'text-teal-400 hover:text-teal-300' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                style={{
                  background: 'rgba(39, 39, 42, 0.6)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
                }}
                title={isMusicPlaying ? 'Stop 8-bit music' : 'Play 8-bit music'}
              >
                {isMusicPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M18.54 5.46a9 9 0 0 1 0 13.07" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M16 9l6 6" />
                    <path d="M22 9l-6 6" />
                  </svg>
                )}
              </button>
              
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  setTimeout(() => setIsAnimating(true), 0);
                }}
                className="text-zinc-200 flex items-center focus:outline-none hover:text-teal-400"
              >
                {isOpen ? "Menu" : "Menu"}
                <svg
                  viewBox="0 0 8 6"
                  aria-hidden="true"
                  className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-400"
                >
                  <path
                    d="M1.75 1.75 4 4.25l2.25-2.5"
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Music Toggle Button - Desktop */}
      <div className="hidden md:block" style={{
        position: 'absolute',
        right: isLgViewport ? '23.5%' : '10%',
      }}>
        <button
          onClick={handleMusicToggle}
          className={`p-2 rounded-full transition-all duration-200 ${
            isMusicPlaying 
              ? 'text-teal-400 hover:text-teal-300' 
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          style={{
            background: 'rgba(39, 39, 42, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease',
          }}
          title={isMusicPlaying ? 'Stop 8-bit music' : 'Play 8-bit music'}
        >
          {isMusicPlaying ? (
            // Minimal speaker with sound waves (playing)
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M18.54 5.46a9 9 0 0 1 0 13.07" />
            </svg>
          ) : (
            // Minimal muted speaker with X
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M16 9l6 6" />
              <path d="M22 9l-6 6" />
            </svg>
          )}
        </button>
      </div>
    </nav>
    {isOpen && (
          <div
            ref={menuRef}
            className={`mx-auto px-4 py-8 rounded-3xl mt-8 mx-3 transition-all duration-300 ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
            style={{
              position: 'fixed',
              top: '5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 52,
              background: 'rgba(24, 24, 27, 1)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.3)',
              width: 'calc(100vw - 2rem)',
              maxWidth: '400px',
            }}
          >
            <div className="flex flex-row-reverse items-center justify-between px-4">
              <button
                aria-label="Close menu"
                className="-m-1 p-1"
                type="button"
                onClick={() => closeNavbar()}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
                >
                  <path
                    d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Navigation
              </h2>
            </div>
            <div className="flex flex-col space-y-3 text-zinc-200 pt-6 pl-4">
              <Link
                to="/"
                className="text-sm hover:text-teal-400"
                onClick={(e) => {
                  handleLinkClick(e, "home");
                  closeNavbar();
                }}
              >
                Home
              </Link>
              <span className="block h-px mr-4 bg-zinc-100/5"></span>
              <Link
                to="/"
                className="text-sm hover:text-teal-400"
                onClick={(e) => {
                  handleLinkClick(e, "offer");
                  closeNavbar();
                }}
              >
                Offer
              </Link>
              <span className="block h-px mr-4 bg-zinc-100/5"></span>
              <Link
                to="/"
                className="text-sm hover:text-teal-400"
                onClick={(e) => {
                  handleLinkClick(e, "experience");
                  closeNavbar();
                }}
              >
                Experience
              </Link>
              <span className="block h-px mr-4 bg-zinc-100/5"></span>
              <Link
                to="/"
                className="text-sm hover:text-teal-400"
                onClick={(e) => {
                  handleLinkClick(e, "records");
                  closeNavbar();
                }}
              >
                Records
              </Link>
              {showBlog && (
                <>
                  <span className="block h-px mr-4 bg-zinc-100/5"></span>
                  <Link
                    to="/blog"
                    className="text-sm hover:text-teal-400"
                    onClick={(e) => {
                      handleLinkClick(e, "blog");
                      closeNavbar()}}
                  >
                    Blog
                  </Link>
                </>
              )}
            </div>
          </div>
    )}
    {isOpen && (
      <div
        className={`fixed inset-0 transition-all duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          backgroundColor: 'rgba(0,0,0,0.6)',
          WebkitBackdropFilter: 'blur(16px)',
          backdropFilter: 'blur(16px)',
          zIndex: 51,
        }}
      />
    )}
    </>
  );
};

export default Navbar;
