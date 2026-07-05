
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
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
  <>
    <ScrollToTop />
    <div className="font-sans antialiased text-offwhite selection:bg-indigo selection:text-white overflow-x-clip">
      <main className="min-h-screen overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
    </div>
  </>
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
