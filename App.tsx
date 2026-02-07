
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ProcessPage from './pages/ProcessPage';
import SolutionsPage from './pages/SolutionsPage';
import Footer from './components/Footer';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="font-sans antialiased text-offwhite selection:bg-indigo selection:text-white">
        <main className="min-h-screen">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
