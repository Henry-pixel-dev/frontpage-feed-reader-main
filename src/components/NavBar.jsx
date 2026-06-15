import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from "react-router-dom";
import NavLogo from "./NavLogo";
import NavSignUp from "./NavSignUp";
import NavSignIn from "./NavSignIn";
import SearchBar from "./SearchBar";
import AddButton from "./AddButton";
import NavLinks from "./NavLinks";
import HamburgerButton from "./HamburgerButton";

const NavBar = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isAuth = location.pathname === "/signup" || location.pathname === "/signin";
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(prev => !prev);
  const navHeight = navRef.current?.offsetHeight ?? 56;

  if (isAuth) {
    return (
      <nav
        aria-label="Main navigation"
        className="sticky top-0 z-50 border-b border-light-border-subtle bg-light-bg-primary/95 font-sans backdrop-blur-sm dark:border-dark-border dark:bg-dark-bg-primary/90"
      >
        <div className="mx-auto flex max-w-container-page items-center px-6 py-3">
          <Link
            to="/"
            aria-label="Frontpage home"
            className="flex size-8 items-center justify-center rounded-md bg-light-text-primary font-serif text-lg italic text-white transition-opacity hover:opacity-80 active:opacity-70 dark:bg-dark-text-primary dark:text-dark-bg-primary"
          >
            f
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="sticky top-0 z-50 border-b border-light-border-subtle bg-light-bg-primary/95 font-sans backdrop-blur-sm dark:border-dark-border dark:bg-dark-bg-primary/90"
      >
        <div className="mx-auto flex max-w-container-page items-center justify-between px-6 py-3">

          <NavLogo />

          {/* Desktop: Nav Links */}
          {!isLanding && (
            <div className="hidden md:flex items-center space-x-6">
              <NavLinks />
            </div>
          )}

          <div className="flex items-center gap-3">
            {/* Desktop: Actions */}
            <div className="hidden md:flex items-center gap-3">
              {isLanding ? (
                <>
                  <NavSignUp />
                  <NavSignIn />
                </>
              ) : (
                <>
                  <div className="w-56">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  </div>
                  <AddButton />
                  <NavSignUp />
                </>
              )}
            </div>

            {/* Mobile: Hamburger */}
            <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
          </div>
        </div>
      </nav>

      {/* ── Mobile Overlay ── */}
      <div
        aria-hidden={!isOpen}
        style={{ top: navHeight }}
        className={`fixed left-0 right-0 bottom-0 z-40 overflow-y-auto bg-light-bg-primary transition-all duration-300 ease-out md:hidden dark:bg-dark-bg-primary ${
          isOpen
            ? 'pointer-events-auto visible opacity-100 translate-y-0'
            : 'pointer-events-none invisible opacity-0 -translate-y-2'
        }`}
      >
        {isLanding ? (
          <div className="flex flex-col gap-4 px-6 py-8">
            <NavSignUp onClick={closeMenu} />
            <NavSignIn onClick={closeMenu} />
          </div>
        ) : (
          <div className="flex flex-col gap-5 px-6 py-4">
            <div className="flex justify-end">
              <NavSignUp onClick={closeMenu} />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              </div>
              <AddButton onClick={closeMenu} />
            </div>
            <nav className="flex flex-col gap-1 border-t border-light-border pt-5 dark:border-dark-border">
              <NavLinks onClick={closeMenu} />
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
