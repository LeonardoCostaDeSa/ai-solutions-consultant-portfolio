
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import type { RouteRecord } from 'vite-react-ssg';
import Home from './pages/Home';
import Footer from './components/Footer';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC = () => (
  <MotionConfig reducedMotion="user">
    <ScrollToTop />
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-6 focus:py-3 focus:bg-indigo focus:text-white focus:rounded-full focus:font-bold"
    >
      Skip to content
    </a>
    <div className="font-sans antialiased text-offwhite selection:bg-indigo selection:text-white overflow-x-clip">
      <main id="main" className="min-h-screen overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
    </div>
  </MotionConfig>
);

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', lazy: async () => ({ Component: (await import('./pages/AboutPage')).default }) },
      { path: 'process', lazy: async () => ({ Component: (await import('./pages/ProcessPage')).default }) },
      { path: 'solutions', lazy: async () => ({ Component: (await import('./pages/SolutionsPage')).default }) },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];
