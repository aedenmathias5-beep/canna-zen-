import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider, useCart } from './lib/CartContext';
import { AuthProvider } from './lib/AuthContext';
import { ThemeProvider, useTheme } from './lib/ThemeContext';
import Header from './components/layout/Header';
import CartDrawer from './components/cart/CartDrawer';
import Footer from './components/layout/Footer';
import AgeGate from './components/layout/AgeGate';
import { Sidebar } from './components/layout/Sidebar';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { PageTransition } from './components/ui/PageTransition';
import { CustomCursor } from './components/ui/CustomCursor';
import { FloatingLeaves } from './components/ui/FloatingLeaves';
import CbdChat from './components/ui/CbdChat';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Login = lazy(() => import('./pages/Login'));
const Account = lazy(() => import('./pages/Account'));
const Orders = lazy(() => import('./pages/Orders'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Confirmation = lazy(() => import('./pages/Confirmation'));
const About = lazy(() => import('./pages/About'));
const CGV = lazy(() => import('./pages/CGV'));
const Legal = lazy(() => import('./pages/Legal'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Terroirs = lazy(() => import('./pages/Terroirs'));
const Coffrets = lazy(() => import('./pages/Coffrets'));
const Loyalty = lazy(() => import('./pages/Loyalty'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ThemedToaster() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: isDark ? '#0d1a10' : '#ffffff',
          color: isDark ? '#f5f0e8' : '#1a2f23',
          border: isDark ? '1px solid rgba(201,168,76,0.2)' : '1px solid rgba(74,103,65,0.15)',
          borderRadius: '12px',
          fontSize: '0.875rem',
          boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.4)' : '0 10px 40px rgba(0,0,0,0.08)',
          fontFamily: 'DM Sans, system-ui, sans-serif',
        },
        success: {
          iconTheme: { primary: isDark ? '#c9a84c' : '#4A6741', secondary: isDark ? '#0a0a08' : '#ffffff' },
        },
      }}
    />
  );
}

function AppLayout() {
  const { isCartOpen, setIsCartOpen } = useCart();
  return (
    <>
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AgeGate />
      <ScrollToTop />
      <FloatingLeaves />

      <style>{`
        .sidebar-panel { display: flex !important; }
        .header-top { display: block; }
        .main-content-wrap { margin-left: 250px; }

        @media (max-width: 1023px) {
          .sidebar-panel { display: none !important; }
          .header-top { display: block; }
          .main-content-wrap { margin-left: 0; }
        }
        @media (min-width: 1024px) {
          .header-top { display: none !important; }
        }
      `}</style>

      <Sidebar />

      <div className="main-content-wrap transition-colors duration-500" style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
      }}>
        <div className="header-top">
          <Header />
        </div>
        <main style={{ flex: 1 }}>
          <Suspense fallback={<LoadingSpinner />}>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/boutique" element={<Shop />} />
                <Route path="/boutique/:slug" element={<ProductDetail />} />
                <Route path="/connexion" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/compte" element={<Account />} />
                <Route path="/compte/commandes" element={<Orders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/confirmation/:id" element={<Confirmation />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/terroirs" element={<Terroirs />} />
                <Route path="/coffrets" element={<Coffrets />} />
                <Route path="/loyalty" element={<Loyalty />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/cgv" element={<CGV />} />
                <Route path="/mentions-legales" element={<Legal />} />
                <Route path="/politique-de-confidentialite" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </Suspense>
        </main>
        <Footer />
      </div>

      <CbdChat />
      <CustomCursor />
      <ThemedToaster />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <BrowserRouter>
                <AppLayout />
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
