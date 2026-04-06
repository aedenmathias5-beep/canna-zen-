# CannaZen — CBD Premium

## Overview
CannaZen is a CBD e-commerce website built with Vite + React 19 + TypeScript + Tailwind CSS v4. Modern artistic design with vivid teal/emerald/cyan color palette, light/dark theme toggle, aurora gradient backgrounds, glassmorphism cards, and smooth animations. Cormorant Garamond display font + Inter body font. Internal product catalog (28 products), Supabase auth with PostgreSQL profiles, cart with localStorage persistence, Smokellier keyword chatbot, and sandbox checkout.

## Architecture
- **Dev Server**: Vite on port 5000 (host 0.0.0.0, allowedHosts: true)
- **Frontend**: React 19 SPA with react-router-dom v7
- **Styling**: Tailwind CSS v4 via @tailwindcss/vite plugin
- **Icons**: lucide-react
- **Fonts**: Cormorant Garamond (display headings, italic), Inter (body text) — both via Google Fonts
- **Auth**: Supabase Auth (Google sign-in, Email/Password, Password Reset) + PostgreSQL user profiles
- **Validation**: Zod schemas for forms (login, register, reset password, profile, address)
- **E-commerce**: Internal product catalog (no Ecwid), cart in localStorage, sandbox checkout
- **SEO**: react-helmet-async with per-page <Helmet> (title, meta description, og tags)
- **Notifications**: react-hot-toast for cart add/remove feedback + auth toasts
- **Performance**: React.lazy() + Suspense for all route components, lazy-loaded images below fold
- **Accessibility**: aria-labels on all icon-only buttons, focus-visible outlines, proper alt text
- **SEO files**: public/robots.txt, public/sitemap.xml

## Design System (Vivid Blue-Green Theme with Light/Dark Toggle)
- **Theme**: CSS custom properties in :root (light) and .dark (dark), toggled via ThemeContext
- **ThemeContext**: src/lib/ThemeContext.tsx — persists to localStorage('cannazen-theme'), toggles .dark class on html
- **ThemeToggle**: src/components/ui/ThemeToggle.tsx — Moon/Sun icon button in Header top-left
- **Light mode bg**: Gradient #eef7f3 → #f0f4f1 → #edf5fa (subtle green-blue gradient, fixed)
- **Dark mode bg**: Gradient #0a1a15 → #0a0f0d → #0a1520
- **Accent colors**: Teal #0d9488 (--accent-1), Emerald #10b981 (--accent-2), Cyan #06b6d4 (--accent-3)
- **CSS Variables**: --bg-main, --bg-card, --bg-header, --bg-surface, --text-primary, --text-secondary, --text-muted, --border-color, --border-light, --glass-bg, --glass-border, --shadow-color
- **Cards**: glass-card class (var(--bg-card) + backdrop-blur + var(--border-color))
- **Buttons**: btn-vivid (teal-to-emerald gradient), btn-magnetic (hover lift+glow)
- **Gradients**: text-gradient-vivid (teal→emerald→cyan), text-gradient-sage, text-gradient-blue
- **Effects**: aurora-bg-light, floating orbs (orb-1/2/3), neon-glow, animate-shimmer, animate-float, stagger-child
- **Header banner**: Gradient from-teal-500 via-emerald-500 to-cyan-500 (white text)
- **Footer**: Dark gradient (teal/emerald deep), teal-400 accents
- **Gold**: #c4a35a (Smokellier accents, unchanged)
- **Display font**: Cormorant Garamond (italic, semibold, serif)
- **Body font**: Inter (400, 500, 600, 700)
- **Logo**: Inline SVG component (src/components/ui/Logo.tsx) + PNG logo at public/logo-cannazen.png
- **Logo variant**: Uses theme === 'dark' ? 'light' : 'dark' in Header

## Key Files
- **src/lib/supabase.ts**: Supabase client SDK init (graceful: works without config)
- **src/lib/supabaseAuth.ts**: Auth helpers (signInWithGoogle, signInWithEmail, registerWithEmail, resetPassword, supabaseSignOut)
- **src/lib/supabaseDb.ts**: Supabase DB CRUD (UserProfile, wishlist, addresses, cart sync)
- **src/lib/validators/auth.ts**: Zod schemas (loginSchema, registerSchema, resetPasswordSchema, updateProfileSchema, addressSchema)
- **src/lib/AuthContext.tsx**: Auth provider with Supabase onAuthStateChange + PostgreSQL profile loading
- **src/hooks/useAuthActions.ts**: Hook with auth actions + toast feedback
- **src/lib/constants.ts**: Site name, routes, storage keys, shipping config
- **src/components/ui/LoadingSpinner.tsx**: Suspense fallback for lazy routes
- **src/components/ui/ScrollToTopButton.tsx**: Scroll-to-top button (appears after 300px scroll)

## Auth Components
- **src/components/auth/LoginModal.tsx**: Login modal (Google + Email, Zod validation, cream theme)
- **src/components/auth/RegisterModal.tsx**: Register modal (password strength indicator, age+terms checkboxes, cream theme)
- **src/components/auth/ResetPasswordModal.tsx**: Password reset modal (email form, success state)
- **src/components/auth/UserMenu.tsx**: User dropdown (avatar, account links, loyalty points, sign out)
- **src/components/auth/AuthGuard.tsx**: Protected route wrapper (redirects to /connexion)
- **src/components/auth/SocialButton.tsx**: Google sign-in button component

## Pages & Routes
- `/` — Home (hero "L'univers de Mary Jane", categories, best-sellers, nouveautés, newsletter)
- `/boutique` — Shop (28 products, category filter, search with URL params)
- `/boutique/:slug` — Product detail (effects, intensity, Smokellier quote, wishlist heart, add to cart)
- `/connexion` — Login/Register/Reset (modal-based, redirects when authenticated)
- `/compte` — Account (AuthGuard, profile card with stats, menu links)
- `/compte/commandes` — Orders history (AuthGuard, localStorage)
- `/wishlist` — Wishlist (AuthGuard, Firestore-backed product favorites)
- `/checkout` — Checkout (3 shipping + 3 payment options)
- `/checkout/confirmation/:id` — Order confirmation
- `/a-propos` — About
- `/cgv` — CGV
- `/mentions-legales` — Legal
- `/politique-de-confidentialite` — Privacy
- `*` — 404 NotFound page

## Key Components
- **Logo** (src/components/ui/Logo.tsx): Inline SVG with two leaf paths (#4A6741 + #6B8F5E) and "CannaZen" text in Cormorant Garamond
- **Header**: Centered Logo, promo banner (moss #3d5a3a), dropdown nav by molecule, search, UserMenu (when logged in) or User icon (when not), cart icon with sage counter badge
- **Footer**: Moss green (#3d5a3a), 5 columns (logo, nav, categories, legal, contact), payment badges
- **AgeGate**: "Bienvenue au jardin" + "l'univers de Mary Jane" text, 18+ verification, localStorage (cannazen-age-verified)
- **CartDrawer**: Slide-in from right, quantity controls, free shipping threshold with conditional messaging
- **ChatWidget (Smokellier)**: "Le Smokellier" header, sage green (#6b8f5e) theme, keyword responses, product suggestions
- **ProductCard**: Image (lazy-loaded, 300x300), badge, Cormorant Garamond name, rating stars, price, hover lift effect with "Voir le produit" overlay
- **AnimatedSection** (src/components/ui/AnimatedSection.tsx): Scroll-reveal wrapper using IntersectionObserver (fade-up, fade-left, fade-right, scale-in, fade-in)

## Animation System
- **useInView hook** (src/hooks/useInView.ts): IntersectionObserver-based visibility detection
- **AnimatedSection**: Reusable scroll-reveal component with configurable animation and delay
- **CSS animations** (index.css): shimmer, float, pulse-glow, count-pop, slide-down, leaf-fall, gradient-shift
- **CSS utility classes**: card-hover-lift, img-zoom, btn-magnetic, text-gradient-sage, border-glow, stagger-child (cascading delays)
- **Header**: Shrinks on scroll, cart badge bounce on add, nav link underline animation, search slide-down
- **Home**: Staged hero entrance, floating leaf particles, scroll indicator, animated gradient background
- **ProductDetail**: Image fade-in on load, intensity bar animation, "Ajouté !" button feedback
- **CartDrawer**: Smooth backdrop transition, staggered item entrance, gradient shipping bar
- **prefers-reduced-motion**: All animations disabled for accessibility

## Product Categories (28 total)
- Gummies D9 (Cookies®): 2 products
- Fleurs CBD: 5 products
- Fleurs D10: 6 products
- Résines D10: 2 products
- Fleurs OH+: 5 products
- Vapes (OH+ & HEC10): 6 products
- Huiles CBD: 2 products

## Auth System
- Supabase client SDK (graceful: isSupabaseConfigured checks for VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY)
- When NOT configured: shows error toast on auth action, app works normally without auth
- When configured: Google sign-in OAuth redirect, Email/Password with Zod validation, password reset email
- PostgreSQL profiles table with: wishlist, addresses, preferences, stats (orders/spent/loyalty)
- Auth modals (Login/Register/Reset) styled in cream/botanical theme
- UserMenu dropdown in Header when authenticated
- AuthGuard wrapper for protected routes (/compte, /compte/commandes, /wishlist)
- Supabase env vars needed: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
- SQL migration file: supabase-migration.sql (run in Supabase SQL Editor)

## Data Storage
- Cart: localStorage key 'cannazen-cart'
- Orders: localStorage key 'cannazen-orders'
- Age gate: localStorage key 'cannazen-age-verified'
- User profiles: Firestore 'users' collection (when Firebase configured)
- Wishlist: Firestore arrayUnion/arrayRemove on user profile
- Cart sync: Firestore 'carts' collection (for logged-in users, when Firebase configured)

## Checkout
- Shipping: Colissimo (4.90€, free >49€), Chronopost Express (9.90€), Point Relais (3.90€, free >39€)
- Payment methods:
  - Carte bancaire (Visa/MC/CB via Mollie — redirects to hosted checkout)
  - Apple Pay (via Mollie — redirects to hosted checkout)
  - Cryptomonnaie (BTC/ETH/USDT — manual payment, order pending until confirmed)
  - Virement bancaire (IBAN LU61 6060 0020 0000 5401 — order pending until confirmed)
- Card/Apple Pay: server-side via Supabase Edge Function → Mollie API (never creates "paid" order without real payment)
- Crypto/Transfer: client-side order creation with pending status
- Sandbox mode with yellow MODE TEST banner

## Legal Info
- CannaZen — Benkiran Hatim
- 11 rue de Tourraine, 67100 Strasbourg
- contact@cannazen.space

## Deployment
- **Platform**: Vercel (SPA mode, framework: vite)
- **Config**: vercel.json with explicit buildCommand, outputDirectory, framework, and SPA rewrite
- **Build**: `vite build` (no tsc — Vite handles TS transpilation via esbuild; typecheck via `npm run typecheck`)
- **Vercel URL**: https://canna-zen-eta.vercel.app
- **Domain**: https://cannazen.fun
- **Env vars**: .env.production in repo (public keys only: Supabase URL, anon key, Mollie test key, site URL)
- **Node**: requires >=20 (set in engines field)
- **Error handling**: ErrorBoundary wraps entire app — never shows blank page on crash
- **Google OAuth redirect**: uses getRedirectUrl() (dynamic from VITE_SITE_URL), must be allowed in Supabase dashboard
- **Mollie redirect**: returns to /checkout/confirmation/:id (matches frontend route)
