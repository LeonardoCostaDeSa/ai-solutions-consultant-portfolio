
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const linkClass = (active: boolean) =>
    `text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors whitespace-nowrap ${active ? 'text-white' : 'text-white/60 hover:text-white'}`;

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
          className="text-white font-black tracking-tighter text-sm md:text-lg shrink-0"
        >
          LEONARDO<span className="text-indigo">.SA</span>
        </Link>
        <div className="flex gap-2.5 md:gap-6 items-center">
          <Link to="/about" className={linkClass(location.pathname === '/about') + ' hidden sm:block'}>
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
            className="text-[10px] md:text-xs font-black uppercase tracking-widest px-3 md:px-5 py-2 md:py-2.5 bg-indigo rounded-full text-white hover:bg-indigo/80 transition-all shadow-lg shadow-indigo/20 whitespace-nowrap"
          >
            Let's talk
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
