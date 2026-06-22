export interface AffiliateProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice: string | null;
  image: string;
  category: string;
  platform: 'aliexpress' | 'temu';
  link: string;
  badge?: string;
}

export const affiliateProducts: AffiliateProduct[] = [
  {
    id: 1,
    name: 'Écouteurs Bluetooth 5.3',
    description: 'Qualité audio HD, réduction de bruit, 48h d\'autonomie',
    price: '12,99 €',
    originalPrice: '25,99 €',
    image: 'https://picsum.photos/seed/earbuds/400/400',
    category: 'Tech & Gadgets',
    platform: 'aliexpress',
    link: 'https://aliexpress.com/affiliate-link-placeholder',
    badge: '-50%',
  },
  {
    id: 2,
    name: 'Montre Connectée Sport',
    description: 'Fréquence cardiaque, SpO2, 20 modes sport, IP68',
    price: '9,99 €',
    originalPrice: null,
    image: 'https://picsum.photos/seed/watch/400/400',
    category: 'Tech & Gadgets',
    platform: 'aliexpress',
    link: 'https://aliexpress.com/affiliate-link-placeholder',
  },
  {
    id: 3,
    name: 'Lampe LED Solaire',
    description: 'Étanche, capteur crépusculaire, 8 modes d\'éclairage',
    price: '4,99 €',
    originalPrice: null,
    image: 'https://picsum.photos/seed/lamp/400/400',
    category: 'Maison & Cuisine',
    platform: 'aliexpress',
    link: 'https://aliexpress.com/affiliate-link-placeholder',
  },
  {
    id: 4,
    name: 'Chargeur Sans Fil 3-en-1',
    description: 'Charge iPhone, Apple Watch, AirPods simultanément',
    price: '8,99 €',
    originalPrice: '18,99 €',
    image: 'https://picsum.photos/seed/charger/400/400',
    category: 'Tech & Gadgets',
    platform: 'temu',
    link: 'https://temu.com/affiliate-link-placeholder',
    badge: '-55%',
  },
  {
    id: 5,
    name: 'Kit Sérum Visage 3 pièces',
    description: 'Acide hyaluronique, vitamine C, rétinol — soin complet',
    price: '6,99 €',
    originalPrice: null,
    image: 'https://picsum.photos/seed/serum/400/400',
    category: 'Beauté & Bien-être',
    platform: 'aliexpress',
    link: 'https://aliexpress.com/affiliate-link-placeholder',
  },
  {
    id: 6,
    name: 'Organiseur Bureau',
    description: 'Rangement multitiroirs en bambou, style minimaliste',
    price: '5,99 €',
    originalPrice: null,
    image: 'https://picsum.photos/seed/organizer/400/400',
    category: 'Maison & Cuisine',
    platform: 'temu',
    link: 'https://temu.com/affiliate-link-placeholder',
  },
  {
    id: 7,
    name: 'Mini Projecteur LED',
    description: '1080p supporté, 120" d\'image, mini projecteur home cinéma',
    price: '14,99 €',
    originalPrice: '29,99 €',
    image: 'https://picsum.photos/seed/projector/400/400',
    category: 'Tech & Gadgets',
    platform: 'aliexpress',
    link: 'https://aliexpress.com/affiliate-link-placeholder',
    badge: '-50%',
  },
  {
    id: 8,
    name: 'Gants Chauds Tactiles',
    description: 'Tissu polaire, compatibles écrans tactiles, lavables',
    price: '3,99 €',
    originalPrice: null,
    image: 'https://picsum.photos/seed/gloves/400/400',
    category: 'Maison & Cuisine',
    platform: 'temu',
    link: 'https://temu.com/affiliate-link-placeholder',
  },
  {
    id: 9,
    name: 'Lampe de Bureau LED',
    description: 'Éclairage 3 températures, pliable, USB rechargeable',
    price: '4,49 €',
    originalPrice: null,
    image: 'https://picsum.photos/seed/desklamp/400/400',
    category: 'Maison & Cuisine',
    platform: 'aliexpress',
    link: 'https://aliexpress.com/affiliate-link-placeholder',
  },
  {
    id: 10,
    name: 'Bracelet Connecté Fitness',
    description: 'Podomètre, calories, sommeil, écran AMOLED',
    price: '7,99 €',
    originalPrice: null,
    image: 'https://picsum.photos/seed/fitnessband/400/400',
    category: 'Tech & Gadgets',
    platform: 'temu',
    link: 'https://temu.com/affiliate-link-placeholder',
  },
  {
    id: 11,
    name: 'Masque LED Lumière Rouge',
    description: 'Anti-âge, acné, 7 couleurs, traitement facial à domicile',
    price: '11,99 €',
    originalPrice: null,
    image: 'https://picsum.photos/seed/ledmask/400/400',
    category: 'Beauté & Bien-être',
    platform: 'aliexpress',
    link: 'https://aliexpress.com/affiliate-link-placeholder',
  },
  {
    id: 12,
    name: 'Kit Ustensiles Cuisine 5pcs',
    description: 'Silicone anti-rayures, résistant jusqu\'à 230°C',
    price: '3,49 €',
    originalPrice: null,
    image: 'https://picsum.photos/seed/utensils/400/400',
    category: 'Maison & Cuisine',
    platform: 'temu',
    link: 'https://temu.com/affiliate-link-placeholder',
  },
];

export const affiliatePlatforms = [
  {
    name: 'AliExpress',
    logo: 'AE',
    color: 'from-orange-500 to-red-600',
    description: 'Des milliers de produits tech, beauté, maison livrés depuis la Chine. Commissions jusqu\'à 8%.',
    signupUrl: 'https://portals.aliexpress.com/',
  },
  {
    name: 'Temu',
    logo: 'TM',
    color: 'from-red-500 to-rose-600',
    description: 'Prix imbattables sur une large gamme de produits. Commissions jusqu\'à 15%.',
    signupUrl: 'https://affiliate.temu.com/',
  },
];

export const affiliateBenefits = [
  { icon: '💰', title: 'Commission sur chaque vente', desc: 'Gagnez 3-15% du montant de chaque commande passée via vos liens.' },
  { icon: '📦', title: 'Des milliers de produits', desc: 'Accès aux catalogues complets AliExpress et Temu (tech, beauté, maison, etc.).' },
  { icon: '🔗', title: 'Liens tracés', desc: 'Chaque clic est suivi — vous êtes payé pour chaque vente générée.' },
  { icon: '🌍', title: 'Livraison mondiale', desc: 'Produits livrés partout dans le monde, y compris Maroc et Europe.' },
];
