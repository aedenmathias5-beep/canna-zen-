# CannaZen — CBD E-commerce App

## Overview
CannaZen is a French CBD/D10/OH+ e-commerce boutique. It features a product shop, AI-powered chat assistant, loyalty system, wishlist, checkout flow, and user accounts.

## Architecture
- **Frontend**: Vite + React 18 + TypeScript, TailwindCSS, shadcn/ui, React Router v6
- **Backend**: Express (TypeScript via tsx) serving the `/api/chat` endpoint
- **AI Chat**: Groq API (llama-3.1-8b-instant) — key stored as server-side secret only
- **Auth/Data**: Supabase (configured via `.env`) with graceful local fallback when not available
- **State**: TanStack Query, React Context (Cart, Auth, Theme)

## Dev Setup
Two processes run concurrently:
- **Vite** on port 5000 (webview) — hot-reload React frontend
- **Express** on port 3001 — API server (proxied via Vite's `/api` proxy)

Run: `npm run dev`

## Key Files
- `server/index.ts` — Express API server with `/api/chat` route
- `src/components/ui/CbdChat.tsx` — AI chat widget (calls `/api/chat`)
- `src/integrations/supabase/client.ts` — Supabase client (auth/db)
- `src/lib/AuthContext.tsx` — Auth provider
- `src/lib/CartContext.tsx` — Cart state
- `src/data/products.ts` — Local product catalog (fallback)
- `src/pages/` — All page components (Shop, Home, Checkout, Account, etc.)

## Environment Variables / Secrets
- `GROQ_API_KEY` — Replit Secret, used by Express server only (never exposed to browser)
- `VITE_SUPABASE_URL` — Supabase project URL (in `.env`)
- `VITE_SUPABASE_PUBLISHABLE_KEY` — Supabase anon key (in `.env`)
- `DATABASE_URL` — PostgreSQL connection string (Replit-managed)

## Migration Notes (Lovable → Replit)
- Removed `@lovable.dev/cloud-auth-js` and `lovable-tagger` dependencies
- Replaced Supabase Edge Function chat with Express `/api/chat` endpoint
- OAuth social login stub returns error gracefully (email/password auth still works)
- Vite proxies `/api` requests to Express on port 3001
