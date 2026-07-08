
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const linkClass = (active: boolean) =>
    `text-xs font-black uppercase tracking-widest transition-colors whitespace-nowrap ${active ? 'text-white' : 'text-white/60 hover:text-white'}`;

  const mobileLinkClass = (active: boolean) =>
    `block rounded-md px-4 py-3 text-sm font-black uppercase tracking-widest transition-colors ${active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-[100] px-3 md:px-6 py-3 md:py-4"
    >
      <div className="max-w-5xl mx-auto bg-charcoal/70 backdrop-blur-xl border border-white/10 rounded-full pl-4 pr-1.5 md:pl-8 md:pr-3 py-1.5 md:py-2 flex justify-between items-center gap-2 md:gap-4 shadow-2xl">
        <Link
          to="/"
          onClick={handleLogoClick}
          aria-label="Leonardo Sá — home"
          className="text-white font-black tracking-tighter text-base md:text-lg shrink-0"
        >
          {/* Compact monogram on mobile, full wordmark from sm up */}
          <span className="sm:hidden">L<span className="text-indigo">S</span></span>
          <span className="hidden sm:inline">LEONARDO<span className="text-indigo">.SA</span></span>
        </Link>
        <div className="hidden sm:flex gap-2.5 md:gap-6 items-center">
          <Link to="/about" className={linkClass(location.pathname === '/about')}>
            About
          </Link>
          <Link to="/solutions" className={linkClass(location.pathname === '/solutions')}>
            Projects
          </Link>
          <Link to="/process" className={linkClass(location.pathname === '/process')}>
            Resume
          </Link>
          <a
            href="mailto:leonardo@leonardosa.pro"
            data-umami-event="contact-click"
            data-umami-event-location="navbar"
            className="text-xs font-black uppercase tracking-widest px-3 md:px-5 py-2 md:py-2.5 bg-indigo rounded-full text-white hover:bg-indigo/80 transition-all shadow-lg shadow-indigo/20 whitespace-nowrap"
          >
            Let's talk
          </a>
        </div>
        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 transition-colors"
        >
          {isMobileMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="sm:hidden max-w-5xl mx-auto mt-2 rounded-2xl border border-white/10 bg-charcoal/95 backdrop-blur-xl p-2 shadow-2xl"
          >
            <Link to="/about" className={mobileLinkClass(location.pathname === '/about')}>
              About
            </Link>
            <Link to="/solutions" className={mobileLinkClass(location.pathname === '/solutions')}>
              Projects
            </Link>
            <Link to="/process" className={mobileLinkClass(location.pathname === '/process')}>
              Resume
            </Link>
            <a
              href="mailto:leonardo@leonardosa.pro"
              data-umami-event="contact-click"
              data-umami-event-location="mobile-navbar"
              className="mt-1 flex items-center justify-center rounded-md bg-indigo px-4 py-3 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-indigo/20 hover:bg-indigo/80 transition-colors"
            >
              Let's talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
