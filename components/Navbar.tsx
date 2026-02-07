
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling past hero (approx 80% of viewport height)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const scrollToAbout = () => {
    if (location.pathname !== '/') {
      navigate('/');
      // In a more complex app we would pass a state to scroll after nav,
      // but standard behavior here to go home is sufficient.
    } else {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-4"
        >
          <div className="max-w-5xl mx-auto bg-charcoal/60 backdrop-blur-xl border border-white/10 rounded-full px-5 md:px-8 py-3 flex justify-between items-center shadow-2xl">
            <div 
              className="text-white font-black tracking-tighter text-base md:text-lg cursor-pointer" 
              onClick={handleLogoClick}
            >
              LEONARDO<span className="text-indigo">.SA</span>
            </div>
            <div className="flex gap-4 md:gap-8 items-center">
              <button
                onClick={scrollToAbout}
                className="hidden md:block text-[10px] md:text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                Who am I?
              </button>

              <button
                onClick={() => navigate('/solutions')}
                className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                Projects
              </button>

              <button 
                onClick={() => navigate('/process')}
                className="text-[10px] md:text-xs font-black uppercase tracking-widest px-4 py-2 bg-indigo rounded-full text-white hover:bg-indigo/80 transition-all shadow-lg shadow-indigo/20 whitespace-nowrap"
              >
                Resume
              </button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
