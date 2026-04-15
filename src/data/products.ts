// Detail images by category for product gallery alternate views
const DETAIL_IMAGES = {
  gummies: [
    '/products/detail-gummies-close.jpg',
    '/products/detail-gummies-box.jpg',
    '/products/detail-gummies-flatlay.jpg',
  ],
  flower: [
    '/products/detail-flower-macro.jpg',
    '/products/detail-flower-jar.jpg',
    '/products/detail-flower-styled.jpg',
  ],
  oil: [
    '/products/detail-oil-bottle.jpg',
    '/products/detail-flower-styled.jpg',
    '/products/detail-flower-jar.jpg',
  ],
  vape: [
    '/products/detail-vape-styled.jpg',
    '/products/detail-gummies-box.jpg',
    '/products/detail-flower-jar.jpg',
  ],
  resin: [
    '/products/detail-flower-jar.jpg',
    '/products/detail-flower-macro.jpg',
    '/products/detail-flower-styled.jpg',
  ],
};

export function getDetailImages(categorySlug: string): string[] {
  if (categorySlug === 'gummies-d9') return DETAIL_IMAGES.gummies;
  if (categorySlug === 'huiles-cbd') return DETAIL_IMAGES.oil;
  if (categorySlug === 'vapes') return DETAIL_IMAGES.vape;
  if (categorySlug === 'resines-d10') return DETAIL_IMAGES.resin;
  return DETAIL_IMAGES.flower;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  shortDesc: string;
  effects: string[];
  smokellierQuote: string;
  badge?: string;
  strain?: string;
  rating: number;
  reviewCount: number;
  intensity: number;
  image: string;
  images?: string[];
  prices: { label: string; amount: number; grams?: number }[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  stock?: number;
  cbdPercent?: number;
}

export const products: Product[] = [
  {
    id: 1, name: "Cookies\u00ae D9 Gummies - Cereal Milk", slug: "cookies-d9-cereal-milk",
    category: "Gummies D9", categorySlug: "gummies-d9",
    description: "Gummies officiels Cookies\u00ae au Delta-9 THC l\u00e9gal. Saveur Cereal Milk gourmande et lact\u00e9e. 10 sachets par bo\u00eete, dosage pr\u00e9cis 10mg par gummy.",
    shortDesc: "Gummies D9 officiels Cookies\u00ae \u2014 Cereal Milk",
    effects: ["Relaxation", "Euphorie", "Bien-\u00eatre"],
    smokellierQuote: "Le Cereal Milk de Cookies... quand le petit-d\u00e9jeuner devient premium.",
    badge: "COOKIES\u00ae", strain: "Cereal Milk", rating: 4.8, reviewCount: 67, intensity: 3,
    image: "/products/cookies-d9-cereal-milk.webp",
    prices: [{ label: "Bo\u00eete 10 sachets", amount: 24.90 }],
    inStock: true, isNew: true, isBestSeller: true,
  },
  {
    id: 2, name: "Cookies\u00ae D9 Gummies - Huckleberry Gelato", slug: "cookies-d9-huckleberry",
    category: "Gummies D9", categorySlug: "gummies-d9",
    description: "Gummies officiels Cookies\u00ae au Delta-9 THC l\u00e9gal. Saveur Huckleberry Gelato fruit\u00e9e et glac\u00e9e. 10 sachets par bo\u00eete.",
    shortDesc: "Gummies D9 officiels Cookies\u00ae \u2014 Huckleberry Gelato",
    effects: ["Relaxation", "Euphorie", "Cr\u00e9ativit\u00e9"],
    smokellierQuote: "L'Huckleberry Gelato... un dessert glac\u00e9 qui te met sur orbite.",
    badge: "COOKIES\u00ae", strain: "Huckleberry Gelato", rating: 4.7, reviewCount: 52, intensity: 3,
    image: "/products/cookies-d9-huckleberry.webp",
    prices: [{ label: "Bo\u00eete 10 sachets", amount: 24.90 }],
    inStock: true, isNew: true,
  },
  {
    id: 3, name: "Tropical Punch", slug: "tropical-punch",
    category: "Fleur CBD", categorySlug: "fleurs-cbd",
    description: "Fleur CBD outdoor aux notes tropicales et fruit\u00e9es. Ar\u00f4mes de mangue, ananas et agrumes. Id\u00e9ale pour la d\u00e9tente quotidienne \u00e0 petit prix.",
    shortDesc: "Fleur CBD outdoor fruit\u00e9e et tropicale",
    effects: ["D\u00e9tente", "Bonne humeur", "Anti-stress"],
    smokellierQuote: "Tropical Punch \u2014 un cocktail de soleil dans chaque t\u00eate.",
    strain: "Sativa / Hybride", rating: 4.2, reviewCount: 38, intensity: 2,
    image: "/products/tropical-punch.webp",
    prices: [
      { label: "1g", amount: 4.90, grams: 1 }, { label: "3g", amount: 12.90, grams: 3 },
      { label: "5g", amount: 19.90, grams: 5 }, { label: "10g", amount: 34.90, grams: 10 },
      { label: "50g", amount: 149.00, grams: 50 },
    ],
    inStock: true,
  },
  {
    id: 4, name: "Amnesia Haze Premium", slug: "amnesia-haze-premium",
    category: "Fleur CBD", categorySlug: "fleurs-cbd",
    description: "Amnesia Haze en version CBD indoor premium. Notes intenses de citron, encens et haze. Trichomes abondants.",
    shortDesc: "Amnesia Haze CBD indoor premium",
    effects: ["\u00c9nergie", "Focus", "Cr\u00e9ativit\u00e9"],
    smokellierQuote: "L'Amnesia Premium... tu oublieras tout sauf le plaisir.",
    badge: "PREMIUM", strain: "Sativa dominante", rating: 4.6, reviewCount: 89, intensity: 3,
    image: "/products/amnesia-haze-premium.webp",
    prices: [
      { label: "1g", amount: 7.90, grams: 1 }, { label: "3g", amount: 19.90, grams: 3 },
      { label: "5g", amount: 34.90, grams: 5 }, { label: "10g", amount: 59.90, grams: 10 },
      { label: "50g", amount: 249.00, grams: 50 },
    ],
    inStock: true, isBestSeller: true,
  },
  {
    id: 5, name: "Runtz", slug: "runtz",
    category: "Fleur CBD", categorySlug: "fleurs-cbd",
    description: "Fleur CBD greenhouse Runtz. Ar\u00f4mes sucr\u00e9s de bonbon et fruits. Buds color\u00e9s verts et violets.",
    shortDesc: "Fleur CBD greenhouse sucr\u00e9e et fruit\u00e9e",
    effects: ["D\u00e9tente", "Bonne humeur", "Relaxation"],
    smokellierQuote: "Runtz \u2014 c'est du bonbon, mais version zen.",
    strain: "Hybride", rating: 4.3, reviewCount: 45, intensity: 2,
    image: "/products/runtz.webp",
    prices: [
      { label: "1g", amount: 4.90, grams: 1 }, { label: "3g", amount: 12.90, grams: 3 },
      { label: "5g", amount: 19.90, grams: 5 }, { label: "10g", amount: 34.90, grams: 10 },
      { label: "50g", amount: 149.00, grams: 50 },
    ],
    inStock: true,
  },
  {
    id: 6, name: "Mint Kush", slug: "mint-kush",
    category: "Fleur CBD", categorySlug: "fleurs-cbd",
    description: "Fleur CBD indoor Mint Kush. Notes fra\u00eeches de menthe poivr\u00e9e et kush terreuse. Buds denses et r\u00e9sineux.",
    shortDesc: "Fleur CBD indoor menthe et kush",
    effects: ["Relaxation profonde", "Fra\u00eecheur", "Sommeil"],
    smokellierQuote: "Mint Kush \u2014 la fra\u00eecheur d'un glacier, la puissance d'un kush.",
    badge: "PREMIUM", strain: "Indica dominante", rating: 4.5, reviewCount: 61, intensity: 4,
    image: "/products/mint-kush.webp",
    prices: [
      { label: "1g", amount: 7.90, grams: 1 }, { label: "3g", amount: 19.90, grams: 3 },
      { label: "5g", amount: 34.90, grams: 5 }, { label: "10g", amount: 59.90, grams: 10 },
      { label: "50g", amount: 249.00, grams: 50 },
    ],
    inStock: true,
  },
  {
    id: 7, name: "Small Buds Double Cinnamon", slug: "small-buds-double-cinnamon",
    category: "Small Buds", categorySlug: "fleurs-cbd",
    description: "Small buds CBD Double Cinnamon. Petites t\u00eates \u00e0 la cannelle douce. Rapport qualit\u00e9-prix exceptionnel.",
    shortDesc: "Small buds CBD cannelle \u2014 prix mini",
    effects: ["D\u00e9tente l\u00e9g\u00e8re", "Confort", "Quotidien"],
    smokellierQuote: "Double Cinnamon en small buds \u2014 le luxe accessible au quotidien.",
    badge: "PRIX MINI", strain: "Hybride", rating: 4.1, reviewCount: 112, intensity: 2,
    image: "/products/small-buds-double-cinnamon.webp",
    prices: [
      { label: "5g", amount: 9.90, grams: 5 }, { label: "10g", amount: 17.90, grams: 10 },
      { label: "25g", amount: 39.90, grams: 25 }, { label: "50g", amount: 69.90, grams: 50 },
      { label: "100g", amount: 119.00, grams: 100 },
    ],
    inStock: true, isBestSeller: true,
  },
  {
    id: 8, name: "Fat Banana", slug: "fat-banana",
    category: "Fleur CBD", categorySlug: "fleurs-cbd",
    description: "Fleur CBD Fat Banana. Notes de banane m\u00fbre, terre et douceur sucr\u00e9e. Le compromis parfait qualit\u00e9-prix.",
    shortDesc: "Fleur CBD aux notes de banane sucr\u00e9e",
    effects: ["Relaxation", "Gourmandise", "Bonne humeur"],
    smokellierQuote: "Fat Banana \u2014 grosse saveur, grosse d\u00e9tente, petit prix.",
    strain: "Indica", rating: 4.3, reviewCount: 55, intensity: 3,
    image: "/products/fat-banana.webp",
    prices: [
      { label: "1g", amount: 5.90, grams: 1 }, { label: "3g", amount: 14.90, grams: 3 },
      { label: "5g", amount: 24.90, grams: 5 }, { label: "10g", amount: 44.90, grams: 10 },
      { label: "50g", amount: 189.00, grams: 50 },
    ],
    inStock: true,
  },
  {
    id: 9, name: "Wapanga \u2014 50% D10", slug: "wapanga-d10",
    category: "Fleur D10", categorySlug: "fleurs-d10",
    description: "Fleur enrichie au Delta-10 \u00e0 50%. Ar\u00f4mes exotiques et bois\u00e9s avec un effet stimulant et cr\u00e9atif.",
    shortDesc: "Fleur enrichie 50% Delta-10 \u2014 exotique",
    effects: ["Stimulation", "Cr\u00e9ativit\u00e9", "Euphorie"],
    smokellierQuote: "Wapanga D10 \u2014 50% de puissance, 100% de voyage.",
    badge: "D10 50%", strain: "Sativa", rating: 4.5, reviewCount: 34, intensity: 4,
    image: "/products/wapanga-d10.webp",
    prices: [
      { label: "1g", amount: 8.90, grams: 1 }, { label: "3g", amount: 22.90, grams: 3 },
      { label: "5g", amount: 34.90, grams: 5 }, { label: "10g", amount: 64.90, grams: 10 },
    ],
    inStock: true, isNew: true,
  },
  {
    id: 10, name: "Zoap \u2014 50% D10", slug: "zoap-d10",
    category: "Fleur D10", categorySlug: "fleurs-d10",
    description: "Zoap enrichie \u00e0 50% de Delta-10. Saveur savonneuse unique, notes florales. Top-shelf pour connaisseurs.",
    shortDesc: "Fleur top-shelf 50% D10 \u2014 saveur unique",
    effects: ["Euphorie", "Relaxation", "Cr\u00e9ativit\u00e9"],
    smokellierQuote: "Zoap D10 \u2014 propre comme du savon, puissante comme un ouragan.",
    badge: "TOP-SHELF", strain: "Hybride", rating: 4.8, reviewCount: 28, intensity: 5,
    image: "/products/zoap-d10.webp",
    prices: [
      { label: "1g", amount: 10.90, grams: 1 }, { label: "3g", amount: 27.90, grams: 3 },
      { label: "5g", amount: 44.90, grams: 5 }, { label: "10g", amount: 79.90, grams: 10 },
    ],
    inStock: true, isNew: true, isBestSeller: true,
  },
  {
    id: 11, name: "White Widow \u2014 50% D10", slug: "white-widow-d10",
    category: "Fleur D10", categorySlug: "fleurs-d10",
    description: "La l\u00e9gendaire White Widow enrichie \u00e0 50% de Delta-10. Trichomes cristallins, ar\u00f4mes terreux et \u00e9pic\u00e9s.",
    shortDesc: "White Widow enrichie 50% D10",
    effects: ["Euphorie", "\u00c9nergie", "Focus"],
    smokellierQuote: "White Widow D10 \u2014 la l\u00e9gende n'a jamais \u00e9t\u00e9 aussi puissante.",
    badge: "TOP-SHELF", strain: "Hybride", rating: 4.7, reviewCount: 41, intensity: 5,
    image: "/products/white-widow-d10.webp",
    prices: [
      { label: "1g", amount: 10.90, grams: 1 }, { label: "3g", amount: 27.90, grams: 3 },
      { label: "5g", amount: 44.90, grams: 5 }, { label: "10g", amount: 79.90, grams: 10 },
    ],
    inStock: true,
  },
  {
    id: 12, name: "Soul Assassin \u2014 50% D10", slug: "soul-assassin-d10",
    category: "Fleur D10", categorySlug: "fleurs-d10",
    description: "Soul Assassin enrichie au Delta-10 \u00e0 50%. Ar\u00f4mes diesel, pin et terre. Effet relaxant et m\u00e9ditatif.",
    shortDesc: "Fleur D10 50% \u2014 diesel et relaxante",
    effects: ["Relaxation", "M\u00e9ditation", "Calme"],
    smokellierQuote: "Soul Assassin \u2014 elle assassine le stress, pas ton portefeuille.",
    strain: "Indica", rating: 4.4, reviewCount: 29, intensity: 4,
    image: "/products/soul-assassin-d10.webp",
    prices: [
      { label: "1g", amount: 7.90, grams: 1 }, { label: "3g", amount: 19.90, grams: 3 },
      { label: "5g", amount: 29.90, grams: 5 }, { label: "10g", amount: 54.90, grams: 10 },
    ],
    inStock: true,
  },
  {
    id: 13, name: "Royal Dwarf \u2014 50% D10", slug: "royal-dwarf-d10",
    category: "Fleur D10", categorySlug: "fleurs-d10",
    description: "Royal Dwarf enrichie \u00e0 50% de Delta-10. Entr\u00e9e de gamme D10 au meilleur rapport qualit\u00e9-prix.",
    shortDesc: "Fleur D10 50% entr\u00e9e de gamme",
    effects: ["D\u00e9tente", "Bonne humeur", "Quotidien"],
    smokellierQuote: "Royal Dwarf \u2014 petit par la taille, royal par l'effet.",
    badge: "BON PLAN", strain: "Hybride", rating: 4.2, reviewCount: 56, intensity: 3,
    image: "/products/royal-dwarf-d10.webp",
    prices: [
      { label: "1g", amount: 6.90, grams: 1 }, { label: "3g", amount: 17.90, grams: 3 },
      { label: "5g", amount: 27.90, grams: 5 }, { label: "10g", amount: 49.90, grams: 10 },
    ],
    inStock: true,
  },
  {
    id: 14, name: "Snow White \u2014 60% D10", slug: "snow-white-d10",
    category: "Fleur D10", categorySlug: "fleurs-d10",
    description: "Snow White enrichie \u00e0 60% de Delta-10 \u2014 la plus concentr\u00e9e de la gamme. Effets puissants, notes fra\u00eeches et menthol\u00e9es.",
    shortDesc: "Fleur D10 60% \u2014 la plus puissante",
    effects: ["Euphorie intense", "Relaxation profonde", "Cr\u00e9ativit\u00e9"],
    smokellierQuote: "Snow White 60% D10 \u2014 la plus blanche, la plus puissante.",
    badge: "D10 60%", strain: "Hybride", rating: 4.9, reviewCount: 22, intensity: 5,
    image: "/products/snow-white-d10.webp",
    prices: [
      { label: "1g", amount: 9.90, grams: 1 }, { label: "3g", amount: 24.90, grams: 3 },
      { label: "5g", amount: 39.90, grams: 5 }, { label: "10g", amount: 69.90, grams: 10 },
    ],
    inStock: true, isNew: true,
  },
  {
    id: 15, name: "Silk Road \u2014 50% D10", slug: "silk-road-d10",
    category: "R\u00e9sine D10", categorySlug: "resines-d10",
    description: "R\u00e9sine Silk Road enrichie \u00e0 50% de Delta-10. Texture souple et parfum\u00e9e. Notes orientales et \u00e9pic\u00e9es.",
    shortDesc: "R\u00e9sine D10 50% \u2014 orientale et \u00e9pic\u00e9e",
    effects: ["Relaxation", "M\u00e9ditation", "Bien-\u00eatre"],
    smokellierQuote: "Silk Road \u2014 le chemin de la soie m\u00e8ne droit \u00e0 la d\u00e9tente.",
    badge: "R\u00c9SINE D10", strain: "Résine enrichie", rating: 4.6, reviewCount: 33, intensity: 4,
    image: "/products/silk-road-d10.webp",
    prices: [
      { label: "1g", amount: 8.90, grams: 1 }, { label: "3g", amount: 22.90, grams: 3 },
      { label: "5g", amount: 34.90, grams: 5 }, { label: "10g", amount: 64.90, grams: 10 },
    ],
    inStock: true,
  },
  {
    id: 16, name: "Atlas Cargo \u2014 50% D10", slug: "atlas-cargo-d10",
    category: "R\u00e9sine D10", categorySlug: "resines-d10",
    description: "R\u00e9sine Atlas Cargo enrichie \u00e0 50% de Delta-10. Style marocain traditionnel avec la puissance du D10.",
    shortDesc: "R\u00e9sine D10 50% \u2014 style marocain",
    effects: ["Relaxation profonde", "Nostalgie", "Confort"],
    smokellierQuote: "Atlas Cargo \u2014 du Maroc \u00e0 Strasbourg, la cargaison premium.",
    badge: "R\u00c9SINE D10", strain: "Résine traditionnelle", rating: 4.5, reviewCount: 27, intensity: 4,
    image: "/products/atlas-cargo-d10.webp",
    prices: [
      { label: "1g", amount: 8.90, grams: 1 }, { label: "3g", amount: 22.90, grams: 3 },
      { label: "5g", amount: 34.90, grams: 5 }, { label: "10g", amount: 64.90, grams: 10 },
    ],
    inStock: true,
  },
  {
    id: 17, name: "Early Girl \u2014 30% OH+", slug: "early-girl-oh",
    category: "Fleur OH+", categorySlug: "fleurs-oh",
    description: "Early Girl enrichie \u00e0 30% de OH+ (Hydroxy-HHC). Terp\u00e8nes m\u00fbrs et complexes. Notes terreuses et sucr\u00e9es.",
    shortDesc: "Fleur OH+ 30% \u2014 terreuse et puissante",
    effects: ["Relaxation", "Euphorie", "Sommeil"],
    smokellierQuote: "Early Girl OH+ \u2014 elle arrive t\u00f4t, mais frappe fort.",
    badge: "OH+ 30%", strain: "Indica", rating: 4.5, reviewCount: 19, intensity: 4,
    image: "/products/early-girl-oh.webp",
    prices: [
      { label: "1g", amount: 8.90, grams: 1 }, { label: "3g", amount: 22.90, grams: 3 },
      { label: "5g", amount: 34.90, grams: 5 }, { label: "10g", amount: 64.90, grams: 10 },
    ],
    inStock: true, isNew: true,
  },
  {
    id: 18, name: "Oreoz \u2014 30% OH+", slug: "oreoz-oh",
    category: "Fleur OH+", categorySlug: "fleurs-oh",
    description: "Oreoz enrichie \u00e0 30% de OH+. Go\u00fbt biscuit chocolat-cr\u00e8me. Dense, r\u00e9sineuse, effet puissant et gourmand.",
    shortDesc: "Fleur OH+ 30% \u2014 go\u00fbt biscuit chocolat",
    effects: ["Euphorie", "Gourmandise", "Relaxation"],
    smokellierQuote: "Oreoz OH+ \u2014 le biscuit qui te met bien.",
    badge: "OH+ 30%", strain: "Hybride", rating: 4.7, reviewCount: 24, intensity: 4,
    image: "/products/oreoz-oh.webp",
    prices: [
      { label: "1g", amount: 9.90, grams: 1 }, { label: "3g", amount: 24.90, grams: 3 },
      { label: "5g", amount: 39.90, grams: 5 }, { label: "10g", amount: 69.90, grams: 10 },
    ],
    inStock: true, isNew: true, isBestSeller: true,
  },
  {
    id: 19, name: "Vape Pen 2ml 99% OH+ \u2014 Cherry Sour", slug: "vape-oh-cherry-sour",
    category: "Vape OH+", categorySlug: "vapes",
    description: "Vape pen jetable 2ml concentr\u00e9e \u00e0 99% de OH+. Saveur Cherry Sour acidul\u00e9e. ~800 bouff\u00e9es.",
    shortDesc: "Vape jetable 2ml 99% OH+ \u2014 cerise acidul\u00e9e",
    effects: ["Effet imm\u00e9diat", "Euphorie", "Portabilit\u00e9"],
    smokellierQuote: "Cherry Sour en vape OH+ \u2014 l'acidul\u00e9 qui frappe en une bouff\u00e9e.",
    badge: "99% OH+", rating: 4.6, reviewCount: 42, intensity: 5,
    image: "/products/vape-oh-cherry-sour.webp",
    prices: [{ label: "1 Vape Pen", amount: 34.90 }],
    inStock: true, isNew: true,
  },
  {
    id: 20, name: "Vape Pen 2ml 99% OH+ \u2014 Cotton Candy", slug: "vape-oh-cotton-candy",
    category: "Vape OH+", categorySlug: "vapes",
    description: "Vape pen jetable 2ml \u00e0 99% de OH+. Saveur Cotton Candy sucr\u00e9e. ~800 bouff\u00e9es.",
    shortDesc: "Vape jetable 2ml 99% OH+ \u2014 barbe \u00e0 papa",
    effects: ["Effet imm\u00e9diat", "Douceur", "Relaxation"],
    smokellierQuote: "Cotton Candy OH+ \u2014 la barbe \u00e0 papa version adulte.",
    badge: "99% OH+", rating: 4.5, reviewCount: 38, intensity: 5,
    image: "/products/vape-oh-cotton-candy.webp",
    prices: [{ label: "1 Vape Pen", amount: 34.90 }],
    inStock: true,
  },
  {
    id: 21, name: "Vape Pen 2ml 99% OH+ \u2014 Kiwi Sorbet", slug: "vape-oh-kiwi-sorbet",
    category: "Vape OH+", categorySlug: "vapes",
    description: "Vape pen jetable 2ml \u00e0 99% de OH+. Saveur Kiwi Sorbet fra\u00eeche et acidul\u00e9e. ~800 bouff\u00e9es.",
    shortDesc: "Vape jetable 2ml 99% OH+ \u2014 kiwi fra\u00ees",
    effects: ["Effet imm\u00e9diat", "Fra\u00eecheur", "Euphorie"],
    smokellierQuote: "Kiwi Sorbet OH+ \u2014 l'\u00e9t\u00e9 en une bouff\u00e9e.",
    badge: "99% OH+", rating: 4.7, reviewCount: 31, intensity: 5,
    image: "/products/vape-oh-kiwi-sorbet.webp",
    prices: [{ label: "1 Vape Pen", amount: 34.90 }],
    inStock: true,
  },
  {
    id: 22, name: "Vape Pen 2ml 99% OH+ \u2014 Lemon Cheese", slug: "vape-oh-lemon-cheese",
    category: "Vape OH+", categorySlug: "vapes",
    description: "Vape pen jetable 2ml \u00e0 99% de OH+. Saveur Lemon Cheese acidul\u00e9e et fromagère. ~800 bouff\u00e9es.",
    shortDesc: "Vape jetable 2ml 99% OH+ \u2014 citron fromagé",
    effects: ["Effet imm\u00e9diat", "Cr\u00e9ativit\u00e9", "\u00c9nergie"],
    smokellierQuote: "Lemon Cheese OH+ \u2014 l'acidit\u00e9 du citron, la puissance du fromage.",
    badge: "99% OH+", rating: 4.4, reviewCount: 26, intensity: 5,
    image: "/products/vape-oh-lemon-cheese.webp",
    prices: [{ label: "1 Vape Pen", amount: 34.90 }],
    inStock: true,
  },
  {
    id: 23, name: "Golden Cobra \u2014 R\u00e9sine", slug: "golden-cobra",
    category: "R\u00e9sine CBD", categorySlug: "resines-d10",
    description: "R\u00e9sine Golden Cobra CBD. Texture dorée malléable. Arômes orientaux, miel et épices.",
    shortDesc: "Résine CBD premium — dorée et parfumée",
    effects: ["Relaxation", "Méditation", "Calme"],
    smokellierQuote: "Golden Cobra — le serpent doré qui vous enveloppe de zen.",
    strain: "Résine artisanale", rating: 4.5, reviewCount: 35, intensity: 3,
    image: "/products/golden-cobra.webp",
    prices: [
      { label: "1g", amount: 6.90, grams: 1 }, { label: "3g", amount: 17.90, grams: 3 },
      { label: "5g", amount: 27.90, grams: 5 }, { label: "10g", amount: 49.90, grams: 10 },
    ],
    inStock: true,
  },
  {
    id: 24, name: "Cookies\u00ae D9 Flower", slug: "cookies-d9-flower",
    category: "Fleur D9", categorySlug: "fleurs-d10",
    description: "Fleur officielle Cookies\u00ae enrichie D9 légal. Génétique exclusive. Arômes doux et gourmands.",
    shortDesc: "Fleur officielle Cookies\u00ae D9 légal",
    effects: ["Euphorie", "Relaxation", "Gourmandise"],
    smokellierQuote: "La Cookies D9 Flower — quand le premium rencontre la légende.",
    badge: "COOKIES\u00ae", strain: "Hybride exclusif", rating: 4.8, reviewCount: 18, intensity: 4,
    image: "/products/cookies-d9-flower.webp",
    prices: [
      { label: "1g", amount: 12.90, grams: 1 }, { label: "3g", amount: 32.90, grams: 3 },
      { label: "5g", amount: 49.90, grams: 5 },
    ],
    inStock: true, isNew: true, isBestSeller: true,
  },
  {
    id: 25, name: "Huile CBD Full Spectrum 20%", slug: "huile-fs-20-bio",
    category: "Huile CBD", categorySlug: "huiles-cbd",
    description: "Huile CBD full spectrum 20% biologique. Extraction CO2 supercritique. Flacon 10ml avec pipette graduée.",
    shortDesc: "Huile CBD bio 20% full spectrum",
    effects: ["Bien-\u00eatre g\u00e9n\u00e9ral", "Sommeil", "Anti-stress"],
    smokellierQuote: "L'huile 20% — le dosage parfait pour débuter ou entretenir.",
    badge: "BIO", rating: 4.7, reviewCount: 94, intensity: 3,
    image: "/products/huile-fs-20-bio.webp",
    prices: [{ label: "Flacon 10ml", amount: 39.90 }],
    inStock: true, isBestSeller: true,
  },
  {
    id: 26, name: "Huile CBD Full Spectrum 30%", slug: "huile-fs-30-bio",
    category: "Huile CBD", categorySlug: "huiles-cbd",
    description: "Huile CBD full spectrum 30% biologique. Concentration maximale. Extraction CO2. Flacon 10ml pipette graduée.",
    shortDesc: "Huile CBD bio 30% — concentration maximale",
    effects: ["Relaxation profonde", "Sommeil", "Confort articulaire"],
    smokellierQuote: "La 30% — quand il faut sortir l'artillerie lourde.",
    badge: "BIO", rating: 4.9, reviewCount: 71, intensity: 5,
    image: "/products/huile-fs-30-bio.webp",
    prices: [{ label: "Flacon 10ml", amount: 59.90 }],
    inStock: true,
  },
];
