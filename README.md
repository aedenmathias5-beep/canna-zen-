# CannaZen — Boutique CBD Premium Française

Site e-commerce CBD haut de gamme, construit avec React + Vite + Tailwind CSS.

## Stack technique

- **Frontend** : React 18 + Vite + TypeScript + Tailwind CSS v3 + Framer Motion
- **Auth / DB** : Supabase
- **Paiement** : Mollie
- **Routing** : React Router v7

## Déploiement

Le site est déployé automatiquement sur Vercel via GitHub Actions à chaque push sur `main`.

### Variables d'environnement requises (Vercel)

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | URL de ton projet Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clé publique Supabase |
| `VITE_MOLLIE_API_KEY` | Clé API Mollie |

### Secrets GitHub Actions requis

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Token API Vercel |
| `VERCEL_ORG_ID` | ID de ton organisation Vercel |
| `VERCEL_PROJECT_ID` | ID du projet Vercel |

## Conformité légale

Tous les produits contiennent un taux de THC < 0,3% conformément à la réglementation française.
