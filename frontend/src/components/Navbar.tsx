import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScrollTo"

const Navbar: React.FC = () => {
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
      html.classList.add('no-scroll');
      document.body.classList.add('no-scroll');
      setTimeout(() => setIsAnimating(true), 0); // Delay to trigger open transition
    } else {
      setIsAnimating(false); // Reset when closing
      html.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    }

    return () => {
      html.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    };

  }, [isOpen, html.classList]);

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

      console.log(`Scrolling to ${sectionId}:`, {
        offsetTop: elementPosition,
        scrollTo: elementPosition - offset,
      });
      if (isSafari) {
        smoothScrollTo(elementPosition - offset, 600);
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
        console.log(`Target section ${sectionId} rendered.`);
        observer.disconnect();
        scrollToSection(sectionId);
      }
    });
  
    // Observe changes in the DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  
    console.warn(`Observer started for ${sectionId}`);
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
        paddingTop: scrolled ? '1.25rem' : '2rem',
        paddingBottom: scrolled ? '1.25rem' : '2rem',
        transition: 'padding 0.3s ease-in-out',
        overflow: 'hidden',
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
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(24, 24, 27, 1), rgba(24, 24, 27, 0.6), rgba(24, 24, 27, 0))',
        opacity: scrolled ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        pointerEvents: 'none', // Ensure it doesn't interfere with clicks
        zIndex: -1,
      }}
    />
      <div className="w-full flex md:justify-center justify-end">
        <div className="inline-block bg-zinc-800/90 rounded-full pl-5 pr-4 py-0.5 ring-1 ring-white/10 text-sm font-light text-zinc-200 hover:ring-white/20">
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
            </div>
            <div className="md:hidden py-2">
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className={`fixed inset-0 z-40 transition-all duration-300 px-5p ${
            isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-100"
          }`}
          style={{
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            backgroundColor: 'rgba(0,0,0,0.5)',
            WebkitBackdropFilter: 'blur(4px)',
            backdropFilter: 'blur(3px)',
          }}
        >
          <div
            ref={menuRef}
            className={`mx-auto px-4 py-8 rounded-3xl bg-zinc-900 ring-1 ring-zinc-800 mt-8 mx-3 transition-all duration-300 ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
