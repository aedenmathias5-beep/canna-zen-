'use client'
import { useState, useMemo } from "react"

// ═══════════════════════════════════════════════
// FULL PRODUCT DATABASE
// ═══════════════════════════════════════════════
const PRODUCTS = [
  // ── FLEURS MAGIC SAUCE ──
  { id:1, slug:"gorilla-cookies-magic-sauce", name:"GORILLA COOKIES", subtitle:"50% MAGIC SAUCE", type:"flower", molecule:"magic-sauce", intensity:"INTENSE", badge:"🔥 BEST-SELLER", promo:true, promoText:"-30%", rating:4.8, reviews:142,
    image:"https://sixty8.fr/1394-medium_default/gorilla-cookies-30-fleur-magic-sauce.jpg",
    description:"La Gorilla Cookies en version Magic Sauce : compacte, poudreuse, parsemée de pistils. Notes de cyprès, miel et pin avec des pointes sucrées en bouche.",
    smokellier:"La Gorilla Cookies Magic Sauce, c'est la douceur du miel de forêt qui rencontre la puissance brute du chanvre. Un classique réinventé, pour les âmes exigeantes.",
    effects:["Relaxation profonde","Stimulation créative","Anti-stress puissant","Euphorie douce"],
    aromas:["Cyprès","Miel","Pin sylvestre","Pointes sucrées"],
    prices:{"1g":9.90,"3g":26.73,"5g":41.58,"10g":74.25}, warning:"Déconseillé aux débutants" },
  { id:2, slug:"tinky-winky-magic-sauce", name:"TINKY WINKY", subtitle:"50% MAGIC SAUCE", type:"flower", molecule:"magic-sauce", intensity:"INTENSE", badge:"⚡ CRÉATIF", promo:true, promoText:"-70%", rating:4.7, reviews:98,
    image:"https://sixty8.fr/1390-medium_default/tinky-winky-30-fleur-magic-sauce.jpg",
    description:"La Tinky Winky ne plaisante pas : sommité florale qui stimule la créativité et la pensée en arborescence. Fragrances puissantes d'herbe et de diesel.",
    smokellier:"La Tinky Winky, c'est un aller simple vers l'imaginaire. Une fleur qui donne envie de débattre, de rire, de créer. Le cerveau en fête, le corps en paix.",
    effects:["Stimulation créative","Pensée en arborescence","Envie de discuter","Euphorie"],
    aromas:["Herbe puissante","Diesel","Skunk authentique","Notes corsées"],
    prices:{"1g":11.90,"3g":32.13,"5g":50.15,"10g":89.25}, warning:"Déconseillé aux débutants" },
  { id:3, slug:"donny-burger-magic-sauce", name:"DONNY BURGER", subtitle:"50% MAGIC SAUCE", type:"flower", molecule:"magic-sauce", intensity:"INTENSE", badge:"🏷️ NOUVEAU", promo:false, rating:4.9, reviews:67,
    image:"https://sixty8.fr/1387-medium_default/donny-burger-50-magic-sauce.jpg",
    description:"Issue du croisement GMO × Han Solo Burger, la Donny Burger est une indica qui sort du lot. Arômes funky d'ail rôti, fromage affiné et diesel brut.",
    smokellier:"La Donny Burger, c'est l'inattendu fait fleur. Entre le garage et la cuisine d'un chef étoilé, elle vous emmène dans un chill extrême.",
    effects:["Détente profonde","Apaisement corporel","Lâcher-prise total","Chill extrême"],
    aromas:["Ail rôti","Fromage affiné","Diesel brut","Épices"],
    prices:{"1g":10.90,"3g":29.43,"5g":45.79,"10g":81.75}, warning:"Déconseillé aux débutants" },
  { id:4, slug:"911-og-magic-sauce", name:"911 OG", subtitle:"50% MAGIC SAUCE", type:"flower", molecule:"magic-sauce", intensity:"EXTREME", badge:"🚨 EXTRÊME", promo:true, promoText:"-40%", rating:4.6, reviews:203,
    image:"https://sixty8.fr/1384-medium_default/911-og-30-fleur-magic-sauce.jpg",
    description:"911 OG, c'est l'urgence sensorielle. Intensité quasi-bourdonnante : envie de rire, parler, danser, méditer. Vigueur, motivation, créativité.",
    smokellier:"La 911 OG n'attend pas les présentations. Elle sonne l'alarme et vous propulse. Épicée, poivrée, avec un profil musc envoûtant. Code rouge sensoriel.",
    effects:["Vigueur immédiate","Motivation","Créativité explosive","Euphorie intense"],
    aromas:["Poivre de Kampot","Musc","Épices chaudes","Herbe verte"],
    prices:{"1g":9.90,"3g":26.73,"5g":41.58,"10g":74.25}, warning:"EXTRÊME — Strictement déconseillé aux débutants" },
  { id:5, slug:"khalifa-kush-magic-sauce", name:"KHALIFA KUSH", subtitle:"50% MAGIC SAUCE", type:"flower", molecule:"magic-sauce", intensity:"EXTREME", badge:"👑 LÉGENDE", promo:false, rating:4.9, reviews:156,
    image:"https://sixty8.fr/1381-medium_default/khalifa-kush-30-fleur-magic-sauce.jpg",
    description:"Inspirée par Wiz Khalifa, cette variété légendaire enrichie en Magic Sauce. Audacieuse, sans complexe, puissante.",
    smokellier:"Khalifa Kush Magic Sauce : quand la Californie rencontre l'innovation européenne. Un héritage de légende, amplifié.",
    effects:["Relaxation californienne","Stimulation mentale","Détente musculaire","Euphorie"],
    aromas:["Kush californien","Pin","Terre chaude","Agrumes subtils"],
    prices:{"1g":10.90,"3g":29.43,"5g":45.79,"10g":81.75}, warning:"Déconseillé aux débutants" },
  { id:6, slug:"crazy-dog-magic-sauce", name:"CRAZY DOG", subtitle:"50% MAGIC SAUCE", type:"flower", molecule:"magic-sauce", intensity:"EXTREME", badge:"⚠️ EXTRÊME", promo:false, rating:4.5, reviews:89,
    image:"https://sixty8.fr/1378-medium_default/crazy-dog-30-fleur-magic-sauce.jpg",
    description:"Le Crazy Dog : fleur unique enrichie en THCP concentré. Effets immédiats, puissants et ultra convaincants. Strictement réservé aux habitués.",
    smokellier:"Le Crazy Dog, c'est le chien fou du catalogue. Il aboie fort et mord encore plus fort. Pas pour les timides.",
    effects:["Puissance maximale","Effets immédiats","Relaxation totale","Somnolence"],
    aromas:["Herbe dense","Résine","Notes terreuses","Épices lourdes"],
    prices:{"1g":11.90,"3g":32.13,"5g":50.15,"10g":89.25}, warning:"THCP concentré — Strictement déconseillé aux débutants" },
  { id:7, slug:"caviar-haze-magic-sauce", name:"CAVIAR HAZE", subtitle:"MAGIC SAUCE 10%", type:"flower", molecule:"magic-sauce", intensity:"STRONG", badge:"💎 PREMIUM", promo:false, rating:4.8, reviews:178,
    image:"https://sixty8.fr/746-medium_default/caviar-haze-magic-sauce-10.jpg",
    description:"La Caviar Haze, fleur d'exception. Épicée, subtile et puissante. Saveurs entre l'amer et l'épicé avec un arrière-goût floral durable.",
    smokellier:"La Caviar Haze laisse un goût de luxe sur la langue. Subtile, épicée, avec cette élégance qu'on ne trouve que dans les fleurs d'exception.",
    effects:["Détente rapide","Stimulation fine","Bien-être durable","Relaxation élégante"],
    aromas:["Épices subtiles","Amertume noble","Floral persistant","Herbe fine"],
    prices:{"1g":8.90,"3g":24.03,"5g":37.38,"10g":66.75}, warning:null },
  { id:8, slug:"la-confidential-magic-sauce", name:"L.A CONFIDENTIAL", subtitle:"MAGIC SAUCE 10%", type:"flower", molecule:"magic-sauce", intensity:"STRONG", badge:"🌙 NUIT", promo:false, rating:4.7, reviews:134,
    image:"https://sixty8.fr/748-medium_default/la-confidential-magic-sauce.jpg",
    description:"Inspirée des nuits de Los Angeles. Un voyage indica pur. Relaxation profonde, sérénité totale, endormissement favorisé.",
    smokellier:"L.A Confidential, c'est le sunset sur Venice Beach en version fleur. Douce, enveloppante, mystérieuse.",
    effects:["Relaxation profonde","Sérénité","Sommeil favorisé","Calme mental"],
    aromas:["Pin doux","Terre humide","Lavande subtile","Bois de santal"],
    prices:{"1g":8.90,"3g":24.03,"5g":37.38,"10g":66.75}, warning:null },
  { id:9, slug:"small-buds-magic-sauce", name:"SMALL BUDS", subtitle:"30% MAGIC SAUCE", type:"flower", molecule:"magic-sauce", intensity:"STRONG", badge:"🏷️ BON PLAN", promo:true, promoText:"-50%", rating:4.4, reviews:267,
    image:"https://sixty8.fr/1344-medium_default/small-buds-30-fleur-magic-sauce.jpg",
    description:"Les Small Buds Magic Sauce : même puissance, petit format. 30% de Magic Sauce pour une expérience économique sans compromis.",
    smokellier:"Les Small Buds, c'est la preuve que la taille ne fait pas tout. Petits mais costauds, économiques mais décisifs.",
    effects:["Relaxation intense","Stimulation mentale","Bien-être général","Anti-stress"],
    aromas:["Mix variétal","Herbe","Notes terreuses","Touches épicées"],
    prices:{"1g":4.90,"3g":13.23,"5g":20.58,"10g":36.75}, warning:null },
  // ── RÉSINES MAGIC SAUCE ──
  { id:10, slug:"charas-hash-magic-sauce", name:"CHARAS HASH", subtitle:"MAGIC SAUCE 10%", type:"resin", molecule:"magic-sauce", intensity:"INTENSE", badge:"🕉️ ANCESTRAL", promo:false, rating:4.8, reviews:91,
    image:"https://sixty8.fr/752-medium_default/charas-hash-magic-sauce-10.jpg",
    description:"Le Charas, résine mythique de l'Himalaya, réinventée en Magic Sauce. Fabrication traditionnelle manuelle, texture lisse et malléable.",
    smokellier:"Le Charas Magic Sauce, c'est 3000 ans de tradition himalayenne qui rencontre la technologie du futur. Roulé à la main, amplifié par la science.",
    effects:["Apaisement corporel total","Détente musculaire","Sérénité profonde","Sommeil"],
    aromas:["Terre d'Himalaya","Épices chaudes","Fruits subtils","Résine pure"],
    prices:{"1g":7.90,"3g":21.33,"5g":33.18,"10g":59.25}, warning:"Déconseillé aux débutants" },
  { id:11, slug:"marrakech-dream-magic-sauce", name:"MARRAKECH DREAM", subtitle:"MAGIC SAUCE 10%", type:"resin", molecule:"magic-sauce", intensity:"INTENSE", badge:"🌍 EXOTIQUE", promo:false, rating:4.6, reviews:73,
    image:"https://sixty8.fr/754-medium_default/marrakech-dream-magic-sauce.jpg",
    description:"Le Marrakech Dream transporte dans les souks. Hash marocain enrichi en Magic Sauce. Texture fondante, arômes de cuir et d'épices orientales.",
    smokellier:"Le Marrakech Dream, c'est un tapis volant version hash. Fermez les yeux, vous êtes dans la médina.",
    effects:["Voyage sensoriel","Relaxation orientale","Détente progressive","Euphorie douce"],
    aromas:["Cuir marocain","Épices orientales","Menthe","Terre sèche"],
    prices:{"1g":7.90,"3g":21.33,"5g":33.18,"10g":59.25}, warning:null },
  // ── VAPES MAGIC SAUCE ──
  { id:12, slug:"puff-crazy-dog-magic-sauce", name:"PUFF CRAZY DOG", subtitle:"2ML • 1000 PUFFS", type:"vape", molecule:"magic-sauce", intensity:"EXTREME", badge:"🚨 VAPE", promo:true, promoText:"-25%", rating:4.5, reviews:189,
    image:"https://sixty8.fr/1393-medium_default/copie-de-disposable-magic-sauce-2ml-1000-puffs-crazy-dog.jpg",
    description:"Puff jetable 2ML, 1000 bouffées de Magic Sauce Crazy Dog. Format nomade, effets puissants, saveurs intenses.",
    smokellier:"Le Crazy Dog en puff, c'est la tempête dans un format de poche. 1000 bouffées de folie, zéro compromis.",
    effects:["Effets rapides","Puissance maximale","Relaxation intense","Euphorie"],
    aromas:["Terpènes naturels","Notes fruitées","Herbe fraîche","Résine"],
    prices:{"×1":34.90,"×3":89.90,"×5":139.90,"×10":249.90}, warning:"EXTRÊME — Déconseillé aux débutants" },
  // ── FLEURS CBD ──
  { id:13, slug:"runtz-cbd", name:"RUNTZ CBD", subtitle:"CBD Premium", type:"flower", molecule:"cbd", intensity:"MODERATE", badge:"🍬 GOURMAND", promo:true, promoText:"-20%", rating:4.6, reviews:312,
    image:"https://sixty8.fr/628-medium_default/runtz-cbd.jpg",
    description:"La Runtz en version CBD : tout le profil bonbon sans l'effet dévastateur. Notes de bonbon aux fruits, sucre candi et zeste d'agrumes.",
    smokellier:"La Runtz CBD, c'est la confiserie en version chanvre. Un rayon de soleil apaisant dans un monde de bonbons.",
    effects:["Relaxation douce","Bonne humeur","Anti-stress","Découverte"],
    aromas:["Bonbon aux fruits","Sucre candi","Agrumes","Floral"],
    prices:{"1g":6.90,"3g":18.63,"5g":28.98,"10g":51.75}, warning:null },
  { id:14, slug:"mandarine-sherbet", name:"MANDARINE SHERBET", subtitle:"CBD Premium", type:"flower", molecule:"cbd", intensity:"MODERATE", badge:"🍊 FRUITÉ", promo:false, rating:4.5, reviews:187,
    image:"https://sixty8.fr/630-medium_default/mandarine-sherbet.jpg",
    description:"Explosion d'agrumes frais. La Mandarine Sherbet est un sorbet au soleil, parfait pour les journées où l'on veut juste respirer.",
    smokellier:"La Mandarine Sherbet, c'est le sud de la France en une bouffée. Fraîche, sucrée, lumineuse.",
    effects:["Bonne humeur","Énergie douce","Relaxation légère","Créativité"],
    aromas:["Mandarine","Zeste d'agrumes","Sorbet","Fleurs blanches"],
    prices:{"1g":9.90,"3g":26.73,"5g":41.58,"10g":74.25}, warning:null },
  { id:15, slug:"mint-kush", name:"MINT KUSH", subtitle:"CBD Premium", type:"flower", molecule:"cbd", intensity:"MODERATE", badge:"🌿 FRAIS", promo:false, rating:4.4, reviews:156,
    image:"https://sixty8.fr/632-medium_default/mint-kush.jpg",
    description:"L'alliance du menthol et du kush. Rafraîchissante et terreuse, la Mint Kush nettoie l'esprit comme une brise de montagne.",
    smokellier:"La Mint Kush, c'est le glacier qui rencontre la forêt. Fraîcheur arctique, profondeur terreuse. L'équilibre parfait.",
    effects:["Fraîcheur mentale","Relaxation","Clarté","Bien-être"],
    aromas:["Menthe poivrée","Terre humide","Eucalyptus","Pin"],
    prices:{"1g":9.90,"3g":26.73,"5g":41.58,"10g":74.25}, warning:null },
  { id:16, slug:"platinium-og", name:"PLATINIUM OG", subtitle:"CBD Premium", type:"flower", molecule:"cbd", intensity:"MODERATE", badge:"🏅 CLASSIQUE", promo:false, rating:4.7, reviews:201,
    image:"https://sixty8.fr/634-medium_default/platinium-og.jpg",
    description:"Le Platinium OG est un monument du CBD. Notes de pin argenté, terre minérale et citron subtil. Un classique indémodable.",
    smokellier:"Le Platinium OG, c'est le costume trois pièces du CBD. Élégant, classique, toujours au bon moment.",
    effects:["Relaxation classique","Apaisement","Sérénité","Anti-douleur"],
    aromas:["Pin argenté","Terre minérale","Citron subtil","Bois"],
    prices:{"1g":9.90,"3g":26.73,"5g":41.58,"10g":74.25}, warning:null },
  { id:17, slug:"trainwreck-cbd", name:"TRAINWRECK", subtitle:"CBD Premium", type:"flower", molecule:"cbd", intensity:"MODERATE", badge:"🚂 PUISSANT", promo:false, rating:4.3, reviews:143,
    image:"https://sixty8.fr/636-medium_default/trainwreck.jpg",
    description:"Le Trainwreck CBD est un express sensoriel. Pin Ponderosa, citron vert et poivre noir. Dynamique et résineux.",
    smokellier:"Le Trainwreck, c'est le TGV du CBD. Il file, il surprend, il détend. Accrochez-vous.",
    effects:["Énergie","Focus","Détente active","Motivation"],
    aromas:["Pin Ponderosa","Citron vert","Poivre noir","Résine"],
    prices:{"1g":9.90,"3g":26.73,"5g":41.58,"10g":74.25}, warning:null },
  // ── FLEURS HEC-10 ──
  { id:18, slug:"gelato-hec10", name:"GELATO", subtitle:"HEC-10 30%", type:"flower", molecule:"hec-10", intensity:"STRONG", badge:"🍦 ONCTUEUX", promo:true, promoText:"-35%", rating:4.8, reviews:167,
    image:"https://sixty8.fr/850-medium_default/gelato-hec-10.jpg",
    description:"La Gelato HEC-10 est un dessert glacé en version chanvre. Crémeuse, sucrée, avec cette puissance HEC-10 qui surprend en douceur.",
    smokellier:"La Gelato HEC-10, c'est le glacier artisanal du cannabis légal. Onctueuse, généreuse, irrésistible.",
    effects:["Relaxation onctueuse","Euphorie légère","Bien-être corporel","Gourmandise"],
    aromas:["Crème glacée","Vanille","Baies","Pâtisserie"],
    prices:{"1g":8.90,"3g":24.03,"5g":37.38,"10g":66.75}, warning:null },
  { id:19, slug:"amnesia-hec10", name:"AMNESIA", subtitle:"HEC-10 30%", type:"flower", molecule:"hec-10", intensity:"STRONG", badge:"🧠 CÉRÉBRAL", promo:false, rating:4.6, reviews:124,
    image:"https://sixty8.fr/852-medium_default/amnesia-hec-10.jpg",
    description:"L'Amnesia HEC-10 efface le stress et réinitialise l'esprit. Sativa dominante avec des notes de citron et d'encens.",
    smokellier:"L'Amnesia HEC-10 vous fait oublier vos soucis en 3 secondes. Reset mental, redémarrage en mode zen.",
    effects:["Reset mental","Énergie créative","Anti-stress","Clarté"],
    aromas:["Citron","Encens","Haze","Épices"],
    prices:{"1g":8.90,"3g":24.03,"5g":37.38,"10g":66.75}, warning:null },
  // ── FLEURS 10-OH ──
  { id:20, slug:"wedding-cake-10oh", name:"WEDDING CAKE", subtitle:"10-OH+ Premium", type:"flower", molecule:"10-oh", intensity:"STRONG", badge:"🎂 GOURMET", promo:false, rating:4.9, reviews:98,
    image:"https://sixty8.fr/860-medium_default/wedding-cake-10-oh.jpg",
    description:"Le Wedding Cake 10-OH+ est une pièce montée cannabique. Vanille, crème pâtissière et sucre caramélisé dans une indica ultra relaxante.",
    smokellier:"Le Wedding Cake, c'est le jour de votre mariage en version fleur. Tout est beau, tout est doux, tout est parfait.",
    effects:["Relaxation gourmande","Euphorie douce","Sommeil","Apaisement total"],
    aromas:["Vanille","Crème pâtissière","Caramel","Terre douce"],
    prices:{"1g":9.90,"3g":26.73,"5g":41.58,"10g":74.25}, warning:null },
  // ── RÉSINES CBD ──
  { id:21, slug:"afghan-black-cbd", name:"AFGHAN BLACK", subtitle:"CBD Hash Premium", type:"resin", molecule:"cbd", intensity:"MODERATE", badge:"🏔️ TRADITION", promo:false, rating:4.7, reviews:234,
    image:"https://sixty8.fr/680-medium_default/afghan-black-cbd.jpg",
    description:"L'Afghan Black CBD est un retour aux sources. Hash pressé à la main, texture souple, arômes profonds de terre et d'épices millénaires.",
    smokellier:"L'Afghan Black, c'est la route de la soie en version CBD. Des siècles de tradition dans chaque gramme.",
    effects:["Relaxation profonde","Tradition","Sommeil","Méditation"],
    aromas:["Terre afghane","Épices millénaires","Bois de cèdre","Encens"],
    prices:{"1g":5.90,"3g":15.93,"5g":24.78,"10g":44.25}, warning:null },
  { id:22, slug:"ketama-gold-cbd", name:"KETAMA GOLD", subtitle:"CBD Hash Premium", type:"resin", molecule:"cbd", intensity:"MODERATE", badge:"✨ GOLD", promo:true, promoText:"-15%", rating:4.5, reviews:189,
    image:"https://sixty8.fr/682-medium_default/ketama-gold-cbd.jpg",
    description:"Le Ketama Gold CBD est l'or du Rif marocain. Texture fondante, couleur dorée, saveurs de miel sauvage et d'herbes sèches.",
    smokellier:"Le Ketama Gold, c'est le trésor du Maroc. Doré, fondant, précieux. Chaque miette vaut de l'or.",
    effects:["Relaxation dorée","Sérénité","Anti-douleur","Voyage"],
    aromas:["Miel sauvage","Herbes sèches","Terre du Rif","Épices douces"],
    prices:{"1g":5.90,"3g":15.93,"5g":24.78,"10g":44.25}, warning:null },
  // ── RÉSINES HEC-10 ──
  { id:23, slug:"jungle-hash-hec10", name:"JUNGLE HASH", subtitle:"HEC-10 Résine", type:"resin", molecule:"hec-10", intensity:"STRONG", badge:"🌴 TROPICAL", promo:false, rating:4.6, reviews:87,
    image:"https://sixty8.fr/870-medium_default/jungle-hash-hec-10.jpg",
    description:"Le Jungle Hash HEC-10 est une expédition tropicale. Résine dense, arômes de forêt humide, effets relaxants et enveloppants.",
    smokellier:"Le Jungle Hash, c'est l'Amazonie en hash. Dense, mystérieux, enveloppant. La jungle vous appelle.",
    effects:["Immersion","Relaxation dense","Voyage tropical","Détente"],
    aromas:["Forêt tropicale","Terre humide","Fruits exotiques","Bois vert"],
    prices:{"1g":7.90,"3g":21.33,"5g":33.18,"10g":59.25}, warning:null },
  // ── VAPES CBD ──
  { id:24, slug:"puff-blueberry-cbd", name:"PUFF BLUEBERRY", subtitle:"CBD 1000 Puffs", type:"vape", molecule:"cbd", intensity:"MODERATE", badge:"🫐 FRUITÉ", promo:false, rating:4.3, reviews:213,
    image:"https://sixty8.fr/700-medium_default/puff-blueberry-cbd.jpg",
    description:"Puff CBD Blueberry : 1000 bouffées de myrtille sucrée. Discret, savoureux, relaxant. Le CBD dans la poche.",
    smokellier:"La Puff Blueberry, c'est le smoothie de l'après-midi. Sucrée, fruitée, apaisante. Vape et souris.",
    effects:["Relaxation douce","Bonne humeur","Discrétion","Plaisir"],
    aromas:["Myrtille","Fruits rouges","Sucre","Fraîcheur"],
    prices:{"×1":19.90,"×3":49.90,"×5":74.90,"×10":129.90}, warning:null },
  { id:25, slug:"puff-mango-hec10", name:"PUFF MANGO", subtitle:"HEC-10 • 2ML", type:"vape", molecule:"hec-10", intensity:"STRONG", badge:"🥭 EXOTIC", promo:true, promoText:"-20%", rating:4.7, reviews:156,
    image:"https://sixty8.fr/880-medium_default/puff-mango-hec-10.jpg",
    description:"Puff HEC-10 Mango : explosion de mangue tropicale avec la puissance du HEC-10. Effets rapides et saveurs paradisiaques.",
    smokellier:"La Puff Mango HEC-10, c'est les tropiques dans un tube. Mangue juteuse, effets puissants. Vacances instantanées.",
    effects:["Effets rapides","Relaxation tropicale","Euphorie","Saveur intense"],
    aromas:["Mangue mûre","Fruits tropicaux","Agrumes","Floral"],
    prices:{"×1":29.90,"×3":74.90,"×5":114.90,"×10":209.90}, warning:null },
  // ── COMESTIBLES ──
  { id:26, slug:"gummies-delta9-fruits", name:"GUMMIES DELTA-9", subtitle:"Mix Fruité • 10pcs", type:"comestible", molecule:"delta-9", intensity:"STRONG", badge:"🍬 CANDY", promo:false, rating:4.8, reviews:345,
    image:"https://sixty8.fr/900-medium_default/gummies-delta-9.jpg",
    description:"Gummies Delta-9 THC : 10 bonbons fruités avec une montée progressive et des effets durables. Fraise, mangue, myrtille, citron, raisin.",
    smokellier:"Les Gummies Delta-9, c'est Halloween pour adultes. Chaque bonbon est une surprise sucrée avec un twist puissant.",
    effects:["Montée progressive","Effets durables","Euphorie gourmande","Relaxation"],
    aromas:["Fraise","Mangue","Myrtille","Citron"],
    prices:{"×10":24.90,"×20":44.90,"×30":59.90,"×50":89.90}, warning:"Attendez 1h avant de reprendre une dose" },
  { id:27, slug:"sirop-delta9-grape", name:"SIROP PURPLE GRAPE", subtitle:"Delta-9 THC • 200ml", type:"comestible", molecule:"delta-9", intensity:"STRONG", badge:"🍇 LEAN", promo:true, promoText:"-15%", rating:4.4, reviews:123,
    image:"https://sixty8.fr/910-medium_default/sirop-delta-9.jpg",
    description:"Sirop Delta-9 THC saveur raisin. 200ml de purple drank légal. Effets relaxants et progressifs. À mélanger dans votre boisson préférée.",
    smokellier:"Le Sirop Purple Grape, c'est le lean version légale. Versez, mélangez, sirotez. La vibe est là.",
    effects:["Relaxation liquide","Effets progressifs","Euphorie","Chill"],
    aromas:["Raisin","Grenadine","Sucre","Cassis"],
    prices:{"200ml":29.90,"500ml":59.90}, warning:"Commencez par une faible dose" },
  // ── ACCESSOIRES ──
  { id:28, slug:"grinder-cannazen", name:"GRINDER CANNAZEN", subtitle:"Aluminium Premium", type:"accessoire", molecule:null, intensity:null, badge:"🛠️ ACCESSOIRE", promo:false, rating:4.9, reviews:456,
    image:"https://sixty8.fr/950-medium_default/grinder-premium.jpg",
    description:"Grinder 4 pièces en aluminium anodisé noir. Dents diamant, récupérateur de pollen, design CannaZen exclusif. Le must-have.",
    smokellier:null,
    effects:[] as string[], aromas:[] as string[],
    prices:{"1":14.90}, warning:null },
  { id:29, slug:"balance-precision", name:"BALANCE PRÉCISION", subtitle:"0.01g • Digital", type:"accessoire", molecule:null, intensity:null, badge:"⚖️ PRÉCISION", promo:false, rating:4.7, reviews:189,
    image:"https://sixty8.fr/960-medium_default/balance-precision.jpg",
    description:"Balance digitale de précision 0.01g. Compacte, couvercle-plateau, display LED. Indispensable pour doser avec précision.",
    smokellier:null,
    effects:[] as string[], aromas:[] as string[],
    prices:{"1":12.90}, warning:null },
]

const MOLECULES = [
  { id:"magic-sauce", name:"Magic Sauce", emoji:"🔮", color:"#9333EA", desc:"La formule secrète. Effets puissants et immédiats." },
  { id:"cbd", name:"CBD", emoji:"🌿", color:"#22c55e", desc:"Le classique. Doux, relaxant, pour tous." },
  { id:"hec-10", name:"HEC-10", emoji:"🔥", color:"#f97316", desc:"Innovation pure. Relaxation et euphorie." },
  { id:"10-oh", name:"10-OH+", emoji:"🌙", color:"#6366f1", desc:"Biodisponibilité maximale. Effets profonds." },
  { id:"delta-9", name:"Delta-9 THC", emoji:"⚡", color:"#eab308", desc:"Le THC légal. Euphorie contrôlée." },
  { id:"cbg9", name:"CBG9", emoji:"🧬", color:"#14b8a6", desc:"Le cannabinoïde mère. Équilibre." },
  { id:"h4cbd", name:"H4CBD", emoji:"💊", color:"#ec4899", desc:"CBD hydrogéné. Puissance décuplée." },
  { id:"cbn", name:"CBN", emoji:"😴", color:"#8b5cf6", desc:"La molécule du sommeil." },
]

type ProductType = typeof PRODUCTS[number]
type PriceMap = Record<string, number>

const TYPES: Record<string, string> = {all:"Tous",flower:"🌿 Fleurs",resin:"🧱 Résines",vape:"💨 Vapes",comestible:"🍪 Comestibles",accessoire:"🛠️ Accessoires"}
const INTENSITIES: Record<string, {label:string;color:string;dots:number}> = {MODERATE:{label:"MODÉRÉ",color:"#22c55e",dots:2},STRONG:{label:"FORT",color:"#f59e0b",dots:3},INTENSE:{label:"INTENSE",color:"#ef4444",dots:4},EXTREME:{label:"EXTRÊME",color:"#dc2626",dots:5}}

const getMolColor = (m: string | null) => (MOLECULES.find(x=>x.id===m)||{color:"#666"}).color

function Stars({r,s=12}:{r:number;s?:number}){return <div style={{display:"flex",gap:1}}>{[1,2,3,4,5].map(i=><span key={i} style={{fontSize:s,color:i<=Math.round(r)?"#eab308":"#333"}}>★</span>)}</div>}

function IntensityDots({intensity}:{intensity:string|null}){
  const info=intensity?INTENSITIES[intensity]:null
  if(!info)return null
  return <div style={{display:"flex",alignItems:"center",gap:5}}>
    {[1,2,3,4,5].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:i<=info.dots?info.color:"rgba(255,255,255,0.1)",boxShadow:i<=info.dots?`0 0 5px ${info.color}60`:"none",animation:intensity==="EXTREME"&&i<=info.dots?"blink 1.5s ease-in-out infinite":"none",animationDelay:`${i*.1}s`}}/>)}
    <span style={{fontSize:9,fontWeight:800,color:info.color,letterSpacing:".08em",marginLeft:3}}>{info.label}</span>
  </div>
}

function Img({src,name,style:s}:{src:string;name:string;style:React.CSSProperties}){
  const[e,setE]=useState(false)
  const[l,setL]=useState(false)
  const c=["#6B21A8","#7C3AED","#22c55e","#f97316","#eab308","#ec4899"][(name||"").length%6]
  if(e)return<div style={{...s,background:`linear-gradient(135deg,${c}30,#111)`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}><span style={{fontSize:36,opacity:.5}}>🔮</span><span style={{fontSize:10,color:"#888",fontWeight:600,marginTop:6}}>{name}</span></div>
  return<div style={{...s,position:"relative",overflow:"hidden"}}>
    {!l&&<div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${c}20,#080808)`,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:24,animation:"spin 2s linear infinite"}}>🔮</span></div>}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={name} onError={()=>setE(true)} onLoad={()=>setL(true)} style={{width:"100%",height:"100%",objectFit:"cover",opacity:l?1:0,transition:"opacity .4s"}} crossOrigin="anonymous" referrerPolicy="no-referrer"/>
  </div>
}

function ProductCard({product:p,onClick}:{product:ProductType;onClick:(p:ProductType)=>void}){
  const[h,setH]=useState(false)
  const fp=Object.values(p.prices)[0]
  const fk=Object.keys(p.prices)[0]
  const mc=getMolColor(p.molecule)
  return<div onClick={()=>onClick(p)} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{background:"linear-gradient(145deg,#111,#090909)",borderRadius:14,overflow:"hidden",cursor:"pointer",border:`1px solid ${h?mc:"#1a1a1a"}`,transform:h?"translateY(-4px) scale(1.01)":"none",boxShadow:h?`0 16px 50px ${mc}25`:"0 2px 15px rgba(0,0,0,.3)",transition:"all .3s cubic-bezier(.4,0,.2,1)",position:"relative"}}>
    {p.promo&&<div style={{position:"absolute",top:10,left:10,zIndex:5,background:"#dc2626",color:"#fff",padding:"2px 8px",borderRadius:6,fontSize:10,fontWeight:800}}>{p.promoText||"PROMO"}</div>}
    <div style={{position:"absolute",top:10,right:10,zIndex:5,background:`linear-gradient(135deg,${mc}cc,${mc})`,color:"#fff",padding:"2px 8px",borderRadius:6,fontSize:9,fontWeight:700,boxShadow:`0 0 12px ${mc}50`}}>
      {p.molecule?(MOLECULES.find(m=>m.id===p.molecule)||{emoji:""}).emoji:""} {(p.molecule||"ACCESSOIRE").toUpperCase().replace("-"," ")}
    </div>
    <Img src={p.image} name={p.name} style={{width:"100%",height:200,background:"#080808"}}/>
    <div style={{padding:"12px 14px 16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
        <div><div style={{fontSize:9,color:mc,fontWeight:700,letterSpacing:".1em",marginBottom:1}}>{TYPES[p.type]?.replace(/[^a-zA-Zéè\s]/g,"").trim()||p.type}</div>
          <h3 style={{fontSize:14,fontWeight:800,color:"#fff",margin:0,lineHeight:1.2}}>{p.name}</h3>
          <div style={{fontSize:10,color:"#777",fontWeight:500,marginTop:1}}>{p.subtitle}</div></div>
        <span style={{fontSize:9,padding:"2px 6px",borderRadius:5,background:`${mc}15`,color:`${mc}cc`,fontWeight:600,whiteSpace:"nowrap",flexShrink:0}}>{p.badge}</span></div>
      {p.intensity&&<IntensityDots intensity={p.intensity}/>}
      <div style={{display:"flex",alignItems:"center",gap:4,marginTop:6}}><Stars r={p.rating} s={10}/><span style={{fontSize:9,color:"#555"}}>({p.reviews})</span></div>
      <div style={{display:"flex",flexWrap:"wrap",gap:3,marginTop:6}}>{p.aromas.slice(0,3).map(a=><span key={a} style={{fontSize:9,padding:"1px 6px",borderRadius:8,background:"rgba(255,255,255,.04)",color:"#777"}}>{a}</span>)}</div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginTop:10,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div><div style={{fontSize:20,fontWeight:800,color:"#fff"}}>{fp.toFixed(2)} €</div><div style={{fontSize:9,color:"#555"}}>{fk}</div></div>
        <button style={{background:`linear-gradient(135deg,${mc}cc,${mc})`,color:"#fff",border:"none",borderRadius:8,padding:"6px 14px",fontSize:11,fontWeight:700,cursor:"pointer",boxShadow:`0 3px 12px ${mc}30`}}>VOIR</button>
      </div></div></div>
}

function ProductDetail({product:p,onClose,onAddCart,allProducts}:{product:ProductType;onClose:()=>void;onAddCart:(p:ProductType,w:string,q:number)=>void;allProducts:ProductType[]}){
  const[qty,setQty]=useState(1)
  const[selW,setSelW]=useState(Object.keys(p.prices)[0])
  const[tab,setTab]=useState("desc")
  const price=(p.prices as PriceMap)[selW]||0
  const mc=getMolColor(p.molecule)
  const isVape=p.type==="vape"||p.type==="comestible"
  const related=allProducts.filter(x=>x.id!==p.id&&(x.molecule===p.molecule||x.type===p.type)).slice(0,4)
  return<div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:16,overflowY:"auto"}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",backdropFilter:"blur(12px)"}}/>
    <div style={{position:"relative",zIndex:1,background:"linear-gradient(160deg,#111,#090909)",borderRadius:18,maxWidth:920,width:"100%",margin:"20px 0",border:"1px solid #1f1f1f",boxShadow:`0 40px 80px ${mc}15`}}>
      <button onClick={onClose} style={{position:"absolute",top:16,right:16,zIndex:10,background:"rgba(255,255,255,.08)",border:"none",color:"#fff",width:34,height:34,borderRadius:"50%",fontSize:16,cursor:"pointer",backdropFilter:"blur(8px)"}}>✕</button>
      {p.warning&&<div style={{background:"linear-gradient(90deg,#7f1d1d,#991b1b)",padding:"8px 18px",display:"flex",alignItems:"center",gap:8,borderRadius:"18px 18px 0 0"}}><span style={{fontSize:16}}>⚠️</span><span style={{color:"#fca5a5",fontSize:12,fontWeight:600}}>{p.warning}</span></div>}
      <div className="detail-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
        <div style={{position:"relative"}}><Img src={p.image} name={p.name} style={{width:"100%",height:420,background:"#070707"}}/>
          <div style={{position:"absolute",top:14,left:14,background:`linear-gradient(135deg,${mc}cc,${mc})`,color:"#fff",padding:"4px 12px",borderRadius:8,fontSize:11,fontWeight:700,boxShadow:`0 0 16px ${mc}50`}}>{(MOLECULES.find(m=>m.id===p.molecule)||{emoji:"🛠️"}).emoji} {(p.molecule||"ACCESSOIRE").toUpperCase().replace("-"," ")}</div>
          {p.promo&&<div style={{position:"absolute",top:14,right:14,background:"#dc2626",color:"#fff",padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:800}}>{p.promoText}</div>}
        </div>
        <div style={{padding:"24px 24px 18px"}}>
          <div style={{fontSize:10,color:mc,fontWeight:700,letterSpacing:".14em",marginBottom:3}}>{TYPES[p.type]?.replace(/[^a-zA-Zéè\s]/g,"").trim()} • {(p.molecule||"ACCESSOIRE").toUpperCase().replace("-"," ")}</div>
          <h2 style={{fontSize:26,fontWeight:900,color:"#fff",margin:"0 0 2px",letterSpacing:"-.02em"}}>{p.name}</h2>
          <div style={{fontSize:13,color:mc,fontWeight:600,marginBottom:8}}>{p.subtitle}</div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>{p.intensity&&<IntensityDots intensity={p.intensity}/>}<Stars r={p.rating}/><span style={{fontSize:11,color:"#555"}}>({p.reviews} avis)</span></div>
          {p.smokellier&&<div style={{margin:"0 0 14px",padding:"12px 14px",background:`linear-gradient(135deg,${mc}10,${mc}05)`,borderRadius:10,borderLeft:`3px solid ${mc}`}}>
            <div style={{fontSize:9,color:mc,fontWeight:700,letterSpacing:".1em",marginBottom:4}}>LE SMOKELLIER CANNAZEN</div>
            <p style={{fontSize:12,color:"#bbb",lineHeight:1.6,margin:0,fontStyle:"italic"}}>&ldquo;{p.smokellier}&rdquo;</p></div>}
          <div style={{display:"flex",gap:0,marginBottom:12,borderBottom:"1px solid #1a1a1a"}}>
            {([["desc","Description"],["effects","Effets"],["legal","Légal"]] as const).map(([k,v])=><button key={k} onClick={()=>setTab(k)} style={{background:"none",border:"none",borderBottom:tab===k?`2px solid ${mc}`:"2px solid transparent",color:tab===k?"#fff":"#666",padding:"6px 14px",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .2s"}}>{v}</button>)}
          </div>
          {tab==="desc"&&<p style={{fontSize:12,color:"#999",lineHeight:1.7,margin:"0 0 12px"}}>{p.description}</p>}
          {tab==="effects"&&<div style={{margin:"0 0 12px"}}><div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>{p.effects.map(e=><span key={e} style={{fontSize:10,padding:"3px 8px",borderRadius:8,background:`${mc}15`,color:`${mc}cc`,fontWeight:500}}>{e}</span>)}</div>
            {p.aromas.length>0&&<><div style={{fontSize:9,color:"#555",fontWeight:700,letterSpacing:".1em",marginBottom:4,marginTop:8}}>ARÔMES</div><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{p.aromas.map(a=><span key={a} style={{fontSize:10,padding:"3px 8px",borderRadius:8,background:"rgba(255,255,255,.05)",color:"#999"}}>{a}</span>)}</div></>}</div>}
          {tab==="legal"&&<p style={{fontSize:11,color:"#666",lineHeight:1.7,margin:"0 0 12px"}}>Ce produit contient des extraits de chanvre (THC &lt; 0.3%) conforme à la législation européenne et française. Vente interdite aux mineurs (-18 ans). Déconseillé aux femmes enceintes ou allaitantes. Ne pas conduire après consommation. Non médicamenteux.</p>}
          <div style={{marginBottom:12}}>
            <div style={{fontSize:9,color:"#555",fontWeight:700,letterSpacing:".1em",marginBottom:6}}>{isVape?"QUANTITÉ":"⚖️ GRAMMAGE"}</div>
            <div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(Object.keys(p.prices).length,4)},1fr)`,gap:5}}>
              {Object.entries(p.prices).map(([w,pr])=><button key={w} onClick={()=>setSelW(w)} style={{background:selW===w?`linear-gradient(135deg,${mc}cc,${mc})`:"rgba(255,255,255,.03)",border:selW===w?`1px solid ${mc}`:"1px solid rgba(255,255,255,.06)",borderRadius:8,padding:"6px 3px",cursor:"pointer",transition:"all .2s",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <span style={{fontSize:13,fontWeight:800,color:"#fff"}}>{w}</span>
                <span style={{fontSize:10,color:selW===w?"#e9d5ff":"#777",fontWeight:600}}>{(pr as number).toFixed(2)}€</span>
              </button>)}</div></div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",background:"rgba(255,255,255,.03)",borderRadius:8,border:"1px solid rgba(255,255,255,.06)"}}>
              <button onClick={()=>setQty(Math.max(1,qty-1))} style={{background:"none",border:"none",color:"#fff",padding:"7px 12px",fontSize:16,cursor:"pointer"}}>−</button>
              <span style={{color:"#fff",fontWeight:700,fontSize:15,minWidth:20,textAlign:"center"}}>{qty}</span>
              <button onClick={()=>setQty(qty+1)} style={{background:"none",border:"none",color:"#fff",padding:"7px 12px",fontSize:16,cursor:"pointer"}}>+</button>
            </div>
            <button onClick={()=>onAddCart(p,selW,qty)} style={{flex:1,background:`linear-gradient(135deg,${mc}cc,${mc})`,border:"none",borderRadius:10,padding:"12px",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",boxShadow:`0 6px 24px ${mc}30`,letterSpacing:".03em"}}>
              Ajouter — {(price*qty).toFixed(2)} €</button></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
            {([["🚀","Livraison 48h","Dès 49€"],["🔒","Paiement sécurisé","CB / Virement"],["📦","Emballage discret","Neutre"]] as const).map(([i,t,s])=><div key={t} style={{textAlign:"center",padding:"6px",background:"rgba(255,255,255,.02)",borderRadius:6}}><div style={{fontSize:14}}>{i}</div><div style={{fontSize:9,color:"#ccc",fontWeight:700}}>{t}</div><div style={{fontSize:8,color:"#555"}}>{s}</div></div>)}</div>
        </div></div>
      {related.length>0&&<div style={{padding:"16px 24px 24px",borderTop:"1px solid #1a1a1a"}}>
        <h3 style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:12}}>Dans la même veine</h3>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(related.length,4)},1fr)`,gap:10}}>
          {related.map(r=><div key={r.id} style={{background:"rgba(255,255,255,.02)",borderRadius:10,overflow:"hidden",cursor:"pointer",border:"1px solid #1a1a1a"}}>
            <Img src={r.image} name={r.name} style={{width:"100%",height:100}}/>
            <div style={{padding:8}}><div style={{fontSize:11,fontWeight:700,color:"#fff"}}>{r.name}</div><div style={{fontSize:10,color:"#777"}}>{Object.values(r.prices)[0].toFixed(2)}€</div></div></div>)}</div></div>}
    </div></div>
}

interface CartItemType { id:number; name:string; image:string; weight:string; qty:number; price:number }

function Cart({items,onClose,onRemove,onUpdateQty}:{items:CartItemType[];onClose:()=>void;onRemove:(i:number)=>void;onUpdateQty:(i:number,q:number)=>void}){
  const total=items.reduce((s,i)=>s+i.price*i.qty,0)
  const shipping=total>=49?0:4.90
  return<><div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:1099}} onClick={onClose}/>
    <div style={{position:"fixed",top:0,right:0,bottom:0,width:400,maxWidth:"100vw",zIndex:1100,background:"linear-gradient(180deg,#111,#090909)",borderLeft:"1px solid #1a1a1a",boxShadow:"-8px 0 30px rgba(0,0,0,.5)",display:"flex",flexDirection:"column",animation:"slideRight .3s ease-out"}}>
      <div style={{padding:"18px 20px",borderBottom:"1px solid #1a1a1a",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3 style={{margin:0,color:"#fff",fontSize:16,fontWeight:800}}>🛒 PANIER <span style={{color:"#9333EA"}}>({items.length})</span></h3>
        <button onClick={onClose} style={{background:"rgba(255,255,255,.05)",border:"none",color:"#fff",width:30,height:30,borderRadius:8,fontSize:14,cursor:"pointer"}}>✕</button></div>
      <div style={{flex:1,overflow:"auto",padding:"12px 20px"}}>
        {items.length===0?<div style={{textAlign:"center",paddingTop:60}}><div style={{fontSize:48,marginBottom:12,opacity:.3}}>🛒</div><p style={{color:"#555",fontSize:13}}>Panier vide</p></div>
        :items.map((item,i)=><div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:"1px solid #151515"}}>
          <Img src={item.image} name={item.name} style={{width:56,height:56,borderRadius:8,flexShrink:0}}/>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{item.name}</div>
            <div style={{fontSize:10,color:"#a78bfa"}}>{item.weight}</div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
              <button onClick={()=>onUpdateQty(i,Math.max(1,item.qty-1))} style={{background:"rgba(255,255,255,.05)",border:"none",color:"#fff",width:22,height:22,borderRadius:4,fontSize:12,cursor:"pointer"}}>−</button>
              <span style={{color:"#fff",fontSize:12,fontWeight:700}}>{item.qty}</span>
              <button onClick={()=>onUpdateQty(i,item.qty+1)} style={{background:"rgba(255,255,255,.05)",border:"none",color:"#fff",width:22,height:22,borderRadius:4,fontSize:12,cursor:"pointer"}}>+</button>
            </div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:800,color:"#9333EA"}}>{(item.price*item.qty).toFixed(2)}€</div>
            <button onClick={()=>onRemove(i)} style={{background:"none",border:"none",color:"#444",fontSize:12,cursor:"pointer",marginTop:4}}>✕ retirer</button></div></div>)}</div>
      {items.length>0&&<div style={{padding:"14px 20px 20px",borderTop:"1px solid #1a1a1a"}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#666",marginBottom:4}}><span>Sous-total</span><span>{total.toFixed(2)}€</span></div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:shipping===0?"#22c55e":"#666",marginBottom:4}}><span>Livraison</span><span>{shipping===0?"OFFERTE ✓":`${shipping.toFixed(2)}€`}</span></div>
        {shipping>0&&<div style={{fontSize:10,color:"#555",marginBottom:8}}>Plus que {(49-total).toFixed(2)}€ pour la livraison offerte</div>}
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,paddingTop:8,borderTop:"1px solid #1a1a1a"}}><span style={{color:"#999",fontSize:14,fontWeight:600}}>Total</span><span style={{color:"#fff",fontSize:22,fontWeight:900}}>{(total+shipping).toFixed(2)}€</span></div>
        <button style={{width:"100%",background:"linear-gradient(135deg,#7C3AED,#9333EA)",border:"none",borderRadius:10,padding:"13px",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",boxShadow:"0 6px 24px rgba(147,51,234,.3)",letterSpacing:".04em"}}>PASSER COMMANDE</button>
        <div style={{textAlign:"center",marginTop:8}}><span style={{fontSize:10,color:"#555"}}>🔒 Paiement 100% sécurisé</span></div></div>}
    </div></>
}

export default function CannaZen(){
  const[page,setPage]=useState("home")
  const[filter,setFilter]=useState("all")
  const[molFilter,setMolFilter]=useState<string|null>(null)
  const[search,setSearch]=useState("")
  const[selected,setSelected]=useState<ProductType|null>(null)
  const[cart,setCart]=useState<CartItemType[]>([])
  const[showCart,setShowCart]=useState(false)
  const[notif,setNotif]=useState<string|null>(null)
  const[ageOk,setAgeOk]=useState(false)
  const[showSearch,setShowSearch]=useState(false)
  const[sortBy,setSortBy]=useState("popular")

  const filtered=useMemo(()=>{
    let list=[...PRODUCTS] as ProductType[]
    if(filter!=="all")list=list.filter(p=>p.type===filter)
    if(molFilter)list=list.filter(p=>p.molecule===molFilter)
    if(search.trim())list=list.filter(p=>(p.name+" "+p.subtitle+" "+(p.molecule||"")+" "+p.aromas.join(" ")).toLowerCase().includes(search.toLowerCase()))
    if(sortBy==="price-asc")list.sort((a,b)=>Object.values(a.prices)[0]-Object.values(b.prices)[0])
    if(sortBy==="price-desc")list.sort((a,b)=>Object.values(b.prices)[0]-Object.values(a.prices)[0])
    if(sortBy==="rating")list.sort((a,b)=>(b.rating||0)-(a.rating||0))
    if(sortBy==="popular")list.sort((a,b)=>(b.reviews||0)-(a.reviews||0))
    return list
  },[filter,molFilter,search,sortBy])

  const addToCart=(product:ProductType,weight:string,qty:number)=>{
    setCart(prev=>{
      const idx=prev.findIndex(i=>i.id===product.id&&i.weight===weight)
      if(idx>=0){const n=[...prev];n[idx]={...n[idx],qty:n[idx].qty+qty};return n}
      return[...prev,{id:product.id,name:product.name,image:product.image,weight,qty,price:(product.prices as PriceMap)[weight]}]
    })
    setSelected(null)
    setNotif(`${product.name} ajouté au panier !`)
    setTimeout(()=>setNotif(null),2500)
  }
  const updateQty=(i:number,q:number)=>setCart(prev=>{const n=[...prev];n[i]={...n[i],qty:q};return n})
  const removeFromCart=(i:number)=>setCart(prev=>prev.filter((_,idx)=>idx!==i))
  const cartCount=cart.reduce((s,i)=>s+i.qty,0)

  // AGE GATE
  if(!ageOk)return<div style={{minHeight:"100vh",background:"#050505",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div style={{textAlign:"center",maxWidth:420,padding:32}}>
      <div style={{fontSize:56,marginBottom:16}}>🌿</div>
      <h1 style={{fontSize:32,fontWeight:900,color:"#fff",marginBottom:8}}><span>Canna</span><span style={{color:"#9333EA"}}>Zen</span></h1>
      <p style={{color:"#666",fontSize:14,marginBottom:24}}>La référence du cannabis légal en France</p>
      <div style={{background:"#111",borderRadius:16,padding:32,border:"1px solid #1a1a1a"}}>
        <h2 style={{color:"#fff",fontSize:18,fontWeight:800,marginBottom:8}}>Vérification d&apos;âge</h2>
        <p style={{color:"#888",fontSize:13,marginBottom:24,lineHeight:1.6}}>Ce site est réservé aux personnes majeures. En entrant, vous confirmez avoir plus de 18 ans.</p>
        <div style={{display:"flex",gap:12}}>
          <button onClick={()=>setAgeOk(true)} style={{flex:1,background:"linear-gradient(135deg,#7C3AED,#9333EA)",border:"none",borderRadius:10,padding:"14px",color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",boxShadow:"0 8px 30px rgba(147,51,234,.3)"}}>J&apos;ai +18 ans ✓</button>
          <button onClick={()=>window.open("https://google.com","_self")} style={{flex:1,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"14px",color:"#888",fontSize:15,fontWeight:600,cursor:"pointer"}}>Non</button>
        </div></div>
      <p style={{color:"#333",fontSize:10,marginTop:16}}>THC &lt; 0.3% • Vente interdite aux mineurs</p>
    </div></div>

  return<div style={{minHeight:"100vh",background:"#050505",color:"#fff"}}>
    {/* NAV */}
    <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(5,5,5,.92)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
      <div className="nav-i" style={{maxWidth:1200,margin:"0 auto",padding:"0 28px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div onClick={()=>{setPage("home");setFilter("all");setMolFilter(null);setSearch("")}} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
          <span style={{fontSize:22}}>🌿</span>
          <span style={{fontSize:18,fontWeight:900,letterSpacing:"-.02em"}}><span style={{color:"#fff"}}>Canna</span><span style={{color:"#9333EA"}}>Zen</span></span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          <button onClick={()=>setShowSearch(!showSearch)} style={{background:"rgba(255,255,255,.04)",border:"none",color:"#999",borderRadius:8,padding:"7px 10px",fontSize:14,cursor:"pointer"}}>🔍</button>
          <button onClick={()=>setShowCart(true)} style={{background:"linear-gradient(135deg,#7C3AED,#9333EA)",border:"none",color:"#fff",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5,boxShadow:"0 3px 12px rgba(147,51,234,.3)"}}>
            🛒{cartCount>0&&<span style={{background:"#fff",color:"#7C3AED",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900}}>{cartCount}</span>}</button>
        </div></div>
      {showSearch&&<div style={{padding:"8px 28px 12px",animation:"fadeIn .2s"}}>
        <input value={search} onChange={e=>{setSearch(e.target.value);setPage("home")}} placeholder="Rechercher un produit, une molécule, un arôme..."
          style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:"10px 16px",color:"#fff",fontSize:13,outline:"none"}}/>
      </div>}
    </nav>

    {page==="about"?
    <div style={{maxWidth:800,margin:"0 auto",padding:"60px 28px 80px",animation:"slideUp .5s ease-out"}}>
      <div style={{textAlign:"center",marginBottom:48}}>
        <span style={{fontSize:48}}>🌿</span>
        <h1 style={{fontSize:36,fontWeight:900,marginTop:12,marginBottom:8}}><span>Canna</span><span style={{color:"#9333EA"}}>Zen</span></h1>
        <p style={{color:"#888",fontSize:15,lineHeight:1.7}}>La référence du cannabis légal en France</p>
      </div>
      <div style={{background:"#111",borderRadius:16,padding:32,border:"1px solid #1a1a1a",marginBottom:24}}>
        <h2 style={{fontSize:20,fontWeight:800,color:"#fff",marginBottom:12}}>Notre Mission</h2>
        <p style={{color:"#999",fontSize:14,lineHeight:1.8,marginBottom:16}}>CannaZen est né d&apos;une conviction : le cannabis légal mérite mieux. Mieux en qualité, mieux en transparence, mieux en expérience. Chaque produit est sélectionné avec l&apos;exigence d&apos;un sommelier du chanvre — notre Smokellier.</p>
        <p style={{color:"#999",fontSize:14,lineHeight:1.8}}>Avec plus de {PRODUCTS.length} produits et {MOLECULES.length} molécules exclusives, nous proposons la gamme la plus complète du marché français.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}} className="info-g">
        {([["🔬","Qualité labo","Chaque lot est analysé en laboratoire indépendant."],["🌱","Culture premium","Chanvre européen cultivé sans pesticides."],["🚀","Livraison express","Expédition sous 24h. Gratuite dès 49€."],["🔒","100% légal","THC < 0.3%. Conformité garantie."]] as const).map(([i,t,d])=><div key={t} style={{background:"#111",borderRadius:14,padding:24,border:"1px solid #1a1a1a"}}>
          <div style={{fontSize:28,marginBottom:10}}>{i}</div><h3 style={{fontSize:15,fontWeight:800,color:"#fff",marginBottom:6}}>{t}</h3><p style={{fontSize:12,color:"#777",lineHeight:1.6}}>{d}</p></div>)}</div>
      <div style={{textAlign:"center",marginTop:32}}>
        <button onClick={()=>setPage("home")} style={{background:"linear-gradient(135deg,#7C3AED,#9333EA)",border:"none",borderRadius:10,padding:"12px 32px",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",boxShadow:"0 6px 24px rgba(147,51,234,.3)"}}>🔮 Explorer la boutique</button>
      </div>
    </div>
    :
    <>
      {/* HERO */}
      {!search&&!molFilter&&filter==="all"&&<section style={{position:"relative",padding:"60px 28px 40px",textAlign:"center",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0%,rgba(147,51,234,.12) 0%,transparent 55%)"}}/>
        <div style={{position:"absolute",top:"15%",left:"50%",transform:"translateX(-50%)",width:500,height:500,background:"radial-gradient(circle,rgba(147,51,234,.07) 0%,transparent 65%)",animation:"glow 4s ease-in-out infinite"}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:720,margin:"0 auto",animation:"slideUp .7s ease-out"}}>
          <div style={{display:"inline-block",background:"linear-gradient(135deg,rgba(147,51,234,.15),rgba(107,33,168,.08))",border:"1px solid rgba(147,51,234,.2)",borderRadius:24,padding:"4px 16px",marginBottom:16}}>
            <span style={{fontSize:11,color:"#c4b5fd",fontWeight:700,letterSpacing:".12em"}}>🔮 {PRODUCTS.length} PRODUITS • {MOLECULES.length} MOLÉCULES • 2026</span></div>
          <h1 className="hero-t" style={{fontSize:48,fontWeight:900,lineHeight:1.05,letterSpacing:"-.04em",marginBottom:12}}>
            <span style={{color:"#fff"}}>La référence du </span><br/>
            <span style={{background:"linear-gradient(135deg,#9333EA,#c084fc,#a855f7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>cannabis légal</span></h1>
          <p className="hero-s" style={{fontSize:15,color:"#777",lineHeight:1.7,maxWidth:500,margin:"0 auto 24px"}}>
            Fleurs, résines, vapes &amp; comestibles d&apos;exception. Qualité premium, livraison 48h, paiement sécurisé.</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            {MOLECULES.slice(0,5).map(m=><button key={m.id} onClick={()=>{setMolFilter(m.id);setFilter("all")}} style={{background:`${m.color}10`,border:`1px solid ${m.color}30`,borderRadius:10,padding:"8px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,transition:"all .2s"}}>
              <span style={{fontSize:14}}>{m.emoji}</span><span style={{fontSize:12,color:m.color,fontWeight:700}}>{m.name}</span>
            </button>)}</div>
        </div></section>}

      {/* MOLECULE HEADER */}
      {molFilter&&<section style={{maxWidth:1200,margin:"0 auto",padding:"24px 28px 12px",animation:"slideUp .3s"}}>
        {(()=>{const m=MOLECULES.find(x=>x.id===molFilter);return m?<div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:32}}>{m.emoji}</span>
            <div><h2 style={{fontSize:24,fontWeight:900,color:"#fff"}}>{m.name}</h2><p style={{fontSize:13,color:"#888"}}>{m.desc}</p></div>
          </div>
          <button onClick={()=>setMolFilter(null)} style={{background:"rgba(255,255,255,.05)",border:"none",color:"#999",borderRadius:8,padding:"6px 14px",fontSize:12,cursor:"pointer"}}>✕ Tout voir</button>
        </div>:null})()}</section>}

      {/* FILTERS */}
      <section style={{maxWidth:1200,margin:"0 auto",padding:"8px 28px 12px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,flex:1}}>
            {Object.entries(TYPES).map(([k,v])=><button key={k} onClick={()=>setFilter(k)} style={{background:filter===k?"linear-gradient(135deg,#7C3AED,#9333EA)":"rgba(255,255,255,.03)",border:filter===k?"1px solid #9333EA":"1px solid rgba(255,255,255,.06)",color:filter===k?"#fff":"#777",borderRadius:8,padding:"6px 14px",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap",boxShadow:filter===k?"0 3px 12px rgba(147,51,234,.3)":"none"}}>
              {v} <span style={{opacity:.6}}>({k==="all"?PRODUCTS.filter(p=>!molFilter||p.molecule===molFilter).length:PRODUCTS.filter(p=>p.type===k&&(!molFilter||p.molecule===molFilter)).length})</span></button>)}</div>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:8,padding:"6px 10px",color:"#888",fontSize:11,cursor:"pointer",outline:"none"}}>
            <option value="popular">Plus populaire</option><option value="rating">Mieux noté</option><option value="price-asc">Prix ↑</option><option value="price-desc">Prix ↓</option>
          </select></div>
        {!molFilter&&<div style={{display:"flex",gap:4,marginTop:8,overflowX:"auto",paddingBottom:4}}>
          {MOLECULES.map(m=>{const count=PRODUCTS.filter(p=>p.molecule===m.id&&(filter==="all"||p.type===filter)).length;if(!count)return null;
            return<button key={m.id} onClick={()=>setMolFilter(m.id)} style={{background:`${m.color}08`,border:`1px solid ${m.color}20`,borderRadius:6,padding:"3px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap"}}>
              <span style={{fontSize:10}}>{m.emoji}</span><span style={{fontSize:10,color:m.color,fontWeight:600}}>{m.name}</span><span style={{fontSize:9,color:"#555"}}>({count})</span>
            </button>})}</div>}
      </section>

      <section style={{maxWidth:1200,margin:"0 auto",padding:"0 28px 8px"}}>
        <p style={{fontSize:11,color:"#555"}}>{filtered.length} produit{filtered.length>1?"s":""}{search?` pour "${search}"`:""}</p>
      </section>

      {/* PRODUCT GRID */}
      <section style={{maxWidth:1200,margin:"0 auto",padding:"0 28px 48px"}}>
        {filtered.length===0?<div style={{textAlign:"center",padding:"60px 0"}}><div style={{fontSize:48,opacity:.2,marginBottom:12}}>🔍</div><p style={{color:"#555",fontSize:14}}>Aucun produit trouvé</p><button onClick={()=>{setFilter("all");setMolFilter(null);setSearch("")}} style={{marginTop:12,background:"rgba(255,255,255,.05)",border:"none",color:"#999",borderRadius:8,padding:"8px 20px",cursor:"pointer",fontSize:12}}>Réinitialiser les filtres</button></div>
        :<div className="pgrid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {filtered.map((p,i)=><div key={p.id} style={{animation:`slideUp .4s ease-out ${i*.03}s both`}}><ProductCard product={p} onClick={setSelected}/></div>)}</div>}
      </section>

      {/* INFO SECTION */}
      {!search&&!molFilter&&filter==="all"&&<section style={{maxWidth:1200,margin:"0 auto",padding:"20px 28px 60px"}}>
        <div className="info-g" style={{background:"linear-gradient(160deg,rgba(147,51,234,.06),rgba(107,33,168,.02))",borderRadius:18,border:"1px solid rgba(147,51,234,.1)",padding:"32px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}}>
          <div>
            <div style={{fontSize:9,color:"#a78bfa",fontWeight:700,letterSpacing:".18em",marginBottom:6}}>POURQUOI CANNAZEN</div>
            <h2 style={{fontSize:24,fontWeight:900,color:"#fff",marginBottom:12,lineHeight:1.2}}>L&apos;excellence du <span style={{color:"#9333EA"}}>cannabis légal</span></h2>
            <p style={{fontSize:13,color:"#888",lineHeight:1.8,marginBottom:12}}>CannaZen sélectionne uniquement des produits d&apos;exception, analysés en laboratoire, cultivés en Europe. Notre Smokellier goûte et valide chaque variété.</p>
            <button onClick={()=>setPage("about")} style={{background:"rgba(147,51,234,.1)",border:"1px solid rgba(147,51,234,.2)",borderRadius:8,padding:"8px 20px",color:"#c4b5fd",fontSize:12,fontWeight:700,cursor:"pointer"}}>En savoir plus →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {([["🧪","Formule exclusive","Cannabinoïdes optimisés"],["🌱","Culture premium","Sans pesticides"],["🔬","Certifié labo","Pureté garantie"],["⚖️","100% légal","THC < 0.3%"]] as const).map(([i,t,d])=>
              <div key={t} style={{background:"rgba(0,0,0,.3)",borderRadius:12,padding:14,border:"1px solid rgba(255,255,255,.03)"}}>
                <div style={{fontSize:20,marginBottom:6}}>{i}</div><div style={{fontSize:12,fontWeight:800,color:"#fff",marginBottom:2}}>{t}</div><div style={{fontSize:10,color:"#555"}}>{d}</div></div>)}</div>
        </div></section>}
    </>}

    {/* FOOTER */}
    <footer style={{borderTop:"1px solid #1a1a1a",padding:"32px 28px 20px",background:"#050505"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div className="foot-g" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:32,marginBottom:24}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><span style={{fontSize:18}}>🌿</span><span style={{fontSize:16,fontWeight:900}}><span style={{color:"#fff"}}>Canna</span><span style={{color:"#9333EA"}}>Zen</span></span></div>
            <p style={{fontSize:11,color:"#444",lineHeight:1.7}}>La référence du cannabis légal en France. {PRODUCTS.length}+ produits, {MOLECULES.length} molécules. Qualité premium. 🔥</p>
          </div>
          <div><div style={{fontSize:10,color:"#777",fontWeight:700,letterSpacing:".1em",marginBottom:10}}>BOUTIQUE</div>
            {Object.values(TYPES).slice(1).map(l=><div key={l} onClick={()=>{setPage("home");setFilter(Object.keys(TYPES).find(k=>TYPES[k]===l)||"all")}} style={{fontSize:11,color:"#444",padding:"3px 0",cursor:"pointer"}}>{l}</div>)}</div>
          <div><div style={{fontSize:10,color:"#777",fontWeight:700,letterSpacing:".1em",marginBottom:10}}>MOLÉCULES</div>
            {MOLECULES.map(m=><div key={m.id} onClick={()=>{setPage("home");setMolFilter(m.id);setFilter("all")}} style={{fontSize:11,color:m.id==="magic-sauce"?"#a78bfa":"#444",padding:"3px 0",cursor:"pointer",fontWeight:m.id==="magic-sauce"?700:400}}>{m.emoji} {m.name}</div>)}</div>
          <div><div style={{fontSize:10,color:"#777",fontWeight:700,letterSpacing:".1em",marginBottom:10}}>INFO</div>
            {([["À Propos",()=>setPage("about")],["CGV",null],["Mentions légales",null],["Confidentialité",null]] as const).map(([l,fn])=><div key={l} onClick={fn||undefined} style={{fontSize:11,color:"#444",padding:"3px 0",cursor:fn?"pointer":"default"}}>{l}</div>)}</div>
        </div>
        <div style={{borderTop:"1px solid #151515",paddingTop:16,textAlign:"center"}}>
          <p style={{fontSize:9,color:"#2a2a2a",lineHeight:1.7}}>© 2026 CannaZen — Tous droits réservés. THC &lt; 0.3%. Vente interdite aux mineurs (-18 ans). Produits non médicamenteux. 🌿</p>
        </div></div></footer>

    {/* MODALS */}
    {selected&&<ProductDetail product={selected} onClose={()=>setSelected(null)} onAddCart={addToCart} allProducts={PRODUCTS}/>}
    {showCart&&<Cart items={cart} onClose={()=>setShowCart(false)} onRemove={removeFromCart} onUpdateQty={updateQty}/>}
    {notif&&<div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#7C3AED,#9333EA)",color:"#fff",padding:"10px 22px",borderRadius:10,fontSize:13,fontWeight:700,boxShadow:"0 8px 32px rgba(147,51,234,.4)",zIndex:2000,animation:"notifIn .3s ease-out",display:"flex",alignItems:"center",gap:6}}>✓ {notif}</div>}
  </div>
}
