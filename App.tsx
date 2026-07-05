
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import Home from './pages/Home';
import ProcessPage from './pages/ProcessPage';
import SolutionsPage from './pages/SolutionsPage';
import AboutPage from './pages/AboutPage';
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
      { path: 'about', element: <AboutPage /> },
      { path: 'process', element: <ProcessPage /> },
      { path: 'solutions', element: <SolutionsPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];
