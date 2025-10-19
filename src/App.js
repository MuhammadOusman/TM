import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AnimatePresence, motion } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import SplashScreen from './components/SplashScreen';

import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Agents from './pages/Agents';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProperties from './pages/admin/AdminProperties';
import AdminPropertyForm from './pages/admin/AdminPropertyForm';
import AdminBlog from './pages/admin/AdminBlog';
import AdminBlogForm from './pages/admin/AdminBlogForm';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminAgents from './pages/admin/AdminAgents';
import AdminAgentForm from './pages/admin/AdminAgentForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4AF37', // A vibrant, classic gold
      light: '#E0C66F',
      dark: '#B18F2A',
    },
    secondary: {
      main: '#3A4750', // A cool, dark gray for secondary elements
      light: '#61707D',
      dark: '#1F2A32',
    },
    accent: {
      main: '#D4AF37', // Keeping an accent color consistent with primary
      light: '#E0C66F',
      dark: '#B18F47',
    },
    background: {
      default: '#1A2027', // A very dark, sophisticated blue-gray
      paper: '#273444', // A slightly lighter shade for cards and surfaces
    },
    text: {
      primary: '#F0F2F5', // A clean, soft off-white for high readability
      secondary: '#BCCCDC', // A lighter gray for secondary text and details
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Segoe UI", "Helvetica Neue", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", "Exo 2", "Orbitron", sans-serif',
      fontWeight: 700,
      color: '#FFFFFF',
      letterSpacing: '-0.02em', // Tighter spacing for modern look
    },
    h2: {
      fontFamily: '"Space Grotesk", "Exo 2", "Orbitron", sans-serif',
      fontWeight: 700,
      color: '#F0F2F5',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Space Grotesk", "Exo 2", sans-serif',
      fontWeight: 600,
      color: '#E0E0E0',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      color: '#D4AF37',
      letterSpacing: '0em',
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: '0em',
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12, // Slightly more rounded corners for a modern feel
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.1)',
    '0px 4px 8px rgba(0,0,0,0.15)',
    '0px 8px 16px rgba(0,0,0,0.2)',
    '0px 12px 24px rgba(0,0,0,0.25)',
    '0px 16px 32px rgba(0,0,0,0.3)',
    '0px 20px 40px rgba(0,0,0,0.35)',
    '0px 24px 48px rgba(0,0,0,0.4)',
    '0px 2px 4px rgba(0,0,0,0.1)',
    '0px 4px 8px rgba(0,0,0,0.15)',
    '0px 8px 16px rgba(0,0,0,0.2)',
    '0px 12px 24px rgba(0,0,0,0.25)',
    '0px 16px 32px rgba(0,0,0,0.3)',
    '0px 20px 40px rgba(0,0,0,0.35)',
    '0px 24px 48px rgba(0,0,0,0.4)',
    '0px 2px 4px rgba(0,0,0,0.1)',
    '0px 4px 8px rgba(0,0,0,0.15)',
    '0px 8px 16px rgba(0,0,0,0.2)',
    '0px 12px 24px rgba(0,0,0,0.25)',
    '0px 16px 32px rgba(0,0,0,0.3)',
    '0px 20px 40px rgba(0,0,0,0.35)',
    '0px 24px 48px rgba(0,0,0,0.4)',
    '0px 2px 4px rgba(0,0,0,0.1)',
    '0px 4px 8px rgba(0,0,0,0.15)',
    '0px 8px 16px rgba(0,0,0,0.2)',
  ],
});

const RouteWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Public Routes with Navbar & Footer */}
              <Route path="/*" element={
                <>
                  <Navbar />
                  <RouteWrapper>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/agents" element={<Agents />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogDetail />} />
                      <Route path="/properties" element={<Properties />} />
                      <Route path="/properties/:id" element={<PropertyDetail />} />
                    </Routes>
                  </RouteWrapper>
                  <Footer />
                </>
              } />

              {/* Admin Routes (No Navbar/Footer) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/*" element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="properties" element={<AdminProperties />} />
                    <Route path="properties/new" element={<AdminPropertyForm />} />
                    <Route path="properties/edit/:id" element={<AdminPropertyForm />} />
                    <Route path="blog" element={<AdminBlog />} />
                    <Route path="blog/new" element={<AdminBlogForm />} />
                    <Route path="blog/edit/:id" element={<AdminBlogForm />} />
                    <Route path="inquiries" element={<AdminInquiries />} />
                    <Route path="agents" element={<AdminAgents />} />
                    <Route path="agents/new" element={<AdminAgentForm />} />
                    <Route path="agents/:id" element={<AdminAgentForm />} />
                  </Routes>
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
