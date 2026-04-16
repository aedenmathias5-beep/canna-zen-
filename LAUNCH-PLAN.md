# Plan de lancement CannaZen

## Semaine 1 — Fondations techniques

### Jour 1-2 : Setup
- [ ] Créer le repo GitHub (privé)
- [ ] Lancer les prompts 1-5 dans l'agent
- [ ] Vérifier la compilation (npm run dev)
- [ ] Premier commit et déploiement Vercel

### Jour 3-4 : Core du site
- [ ] Prompts 6-10 (pages, panier, checkout)
- [ ] Tester chaque page manuellement
- [ ] Fix les bugs éventuels

### Jour 5-7 : Design et polish
- [ ] Prompts 11-18 (sobriété, scrollytelling, responsive)
- [ ] Test sur mobile réel (iPhone, Android)
- [ ] Vérifier les animations et performances

## Semaine 2 — Contenu et fonctionnalités

### Jour 8-9 : Contenu
- [ ] Pages légales (CGV, mentions légales réelles)
- [ ] FAQ complète
- [ ] Page à propos

### Jour 10-11 : Photos produits
- [ ] Acheter ou prendre les photos produits (fond neutre, style parfumerie)
- [ ] Optimiser les images (WebP, compression)
- [ ] Créer les icônes PWA (192x192, 512x512)

### Jour 12-14 : Features avancées
- [ ] PWA (manifest, service worker)
- [ ] Chat support
- [ ] Programme fidélité
- [ ] Cookie consent

## Semaine 3 — Business et paiement

### Jour 15-16 : Paiement
- [ ] Créer un compte Stripe (stripe.com)
- [ ] Configurer les clés API (STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY)
- [ ] Tester le flux de paiement complet (mode test)
- [ ] Activer le mode live

### Jour 17-18 : Nom de domaine et emails
- [ ] Acheter le domaine (cannazen.fr ou similaire)
- [ ] Configurer DNS sur Vercel
- [ ] Créer les emails pro (contact@, support@) via OVH ou Infomaniak
- [ ] Configurer Brevo pour les emails transactionnels

### Jour 19-21 : Tests finaux
- [ ] Lighthouse > 90 desktop, > 80 mobile
- [ ] Test de commande complète (de A à Z)
- [ ] Test responsive sur 5 appareils différents
- [ ] Relecture de tous les textes
- [ ] Vérification des prix et stocks

## Semaine 4 — Lancement

### Jour 22-23 : Soft launch
- [ ] Partager le lien avec 10-20 proches pour tester
- [ ] Collecter les retours et bugs
- [ ] Corriger les problèmes identifiés

### Jour 24-25 : SEO et analytics
- [ ] Google Search Console : soumettre le sitemap
- [ ] Vérifier les balises meta sur chaque page
- [ ] Activer Google Analytics 4
- [ ] Configurer les objectifs de conversion

### Jour 26-28 : Lancement public
- [ ] Post Instagram de lancement
- [ ] Stories et Reels (ambiance, unboxing, behind the scenes)
- [ ] Envoi de la première newsletter (liste de contacts existants)
- [ ] Activer les codes promo de lancement (BIENVENUE10, LAUNCH20)

## Post-lancement — Croissance

### Mois 1 :
- [ ] Publier 2 articles de blog par semaine (SEO)
- [ ] Répondre à chaque avis client
- [ ] Analyser les données GA4 : pages les plus vues, taux de conversion, parcours utilisateur
- [ ] Première campagne Meta Ads (budget 5-10€/jour, ciblage bien-être/relaxation)

### Mois 2 :
- [ ] Partenariats avec 3-5 micro-influenceurs
- [ ] Lancement du programme de parrainage
- [ ] Optimiser les pages à faible conversion
- [ ] Ajouter 5-10 nouveaux produits

### Mois 3 :
- [ ] Migrer vers base de données (Supabase + Prisma)
- [ ] Ajouter le paiement crypto (CoinGate)
- [ ] Lancer la version anglaise du site
- [ ] Objectif : 500 visiteurs/jour, 2-3% de taux de conversion

## Variables d'environnement Vercel

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLIC_KEY=pk_live_...
NEXT_PUBLIC_SITE_URL=https://cannazen.fr
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
DATABASE_URL=postgresql://... (quand Supabase sera configuré)
```

## Stack technique finale

| Composant | Technologie |
|-----------|------------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Animations | Framer Motion |
| State | Zustand (persisté localStorage) |
| Paiement | Stripe Checkout |
| Hébergement | Vercel (plan gratuit) |
| Domaine | OVH ou Namecheap |
| Emails | Brevo (gratuit 300/jour) |
| Analytics | Google Analytics 4 |
| Base de données | Supabase PostgreSQL (futur) |
| CDN images | Vercel Image Optimization |

## Budget de lancement estimé

| Poste | Coût |
|-------|------|
| Domaine (.fr) | 8-12€/an |
| Hébergement Vercel | Gratuit (plan hobby) |
| Stripe | 1.4% + 0.25€ par transaction |
| Brevo emails | Gratuit (300/jour) |
| Photos produits | 0€ (DIY) à 200€ (photographe) |
| Meta Ads mois 1 | 150-300€ |
| Total lancement | 160-520€ |
