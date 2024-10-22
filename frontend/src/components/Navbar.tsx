import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeLink, setActiveLink] = useState<string | null>("home");
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsAnimating(true), 0); // Delay to trigger open transition
    } else {
      setIsAnimating(false); // Reset when closing
    }
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

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    linkName: string
  ) => {
    event.preventDefault(); // Prevent default anchor behavior

    if (linkName === "home") {
      setActiveLink("home"); //añadir un poco de delay a estas dos opciones?
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } else if (linkName === "blog") {
      setActiveLink("blog");
      navigate("/blog");
      return;
    } else {
      navigate("/");
      setTimeout(() => {
        if (linkName === "offer") {
          window.scrollTo({
            top: document.getElementById("offer")?.offsetTop || 0,
            behavior: "smooth",
          });
        } else if (linkName === "experience") {
          window.scrollTo({
            top: document.getElementById("experience")?.offsetTop || 0,
            behavior: "smooth",
          });
        }
      }, 300); // Delay to allow for navigation to complete
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.location.pathname === "/blog") return;
      const sections = ["home", "offer", "experience"];
      let currentSection = "home";

      sections.forEach((section) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      });

      setActiveLink(currentSection);
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

  return (
    <nav className={`fixed left-0 z-50 w-full md:pr-0 pr-10p transition-all duration-300 ${scrolled ? 'bg-zinc-800/30 backdrop-blur-lg py-4 top-0' : 'bg-transparent top-7'}`}>
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
          className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-all duration-300 px-10p ${
            isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-100"
          }`}
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
              <span className="block h-px mr-4 bg-gradient-to-r from-teal-400/40 via-teal-400/20 to-teal-400/40"></span>
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
              <span className="block h-px mr-4 bg-gradient-to-r from-teal-400/40 via-teal-400/20 to-teal-400/40"></span>
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
              <span className="block h-px mr-4 bg-gradient-to-r from-teal-400/40 via-teal-400/20 to-teal-400/40"></span>
              <Link
                to="/blog"
                className="text-sm hover:text-teal-400"
                onClick={() => closeNavbar()}
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
