import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { CartProvider } from './lib/CartContext';
import { AuthProvider } from './lib/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AgeGate from './components/layout/AgeGate';
import ChatWidget from './components/smokellier/ChatWidget';
import CbdChat from './components/ui/CbdChat';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { PageTransition } from './components/ui/PageTransition';

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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AgeGate />
        <ScrollToTop />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--noir)' }}>
          <Header />
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
        <ChatWidget />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0d1a10',
              color: '#f5f0e8',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '8px',
              fontSize: '0.875rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              fontFamily: 'DM Sans, system-ui, sans-serif',
            },
            success: {
              iconTheme: { primary: '#c9a84c', secondary: '#0a0a08' },
            },
          }}
        />
        <SpeedInsights />
      </CartProvider>
    </AuthProvider>
  );
}
