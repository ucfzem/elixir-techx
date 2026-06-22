import type { VercelRequest, VercelResponse } from '@vercel/node';

const SITE = 'https://elixir-techx.vercel.app';

const products = [
  { id: 1, name: "Mini Projecteur Portable HD", updated: "2026-06-22" },
  { id: 2, name: "Écouteurs Bluetooth TWS Réduction de Bruit", updated: "2026-06-22" },
  { id: 3, name: "Montre Connectée Fitness Tracker", updated: "2026-06-22" },
  { id: 4, name: "Power Bank 20000mAh Ultra-Compacte", updated: "2026-06-22" },
  { id: 5, name: "Support Téléphone Pliable Lit/Canapé", updated: "2026-06-22" },
  { id: 6, name: "Enceinte Bluetooth Waterproof Portable", updated: "2026-06-22" },
  { id: 7, name: "Anneau Lumineux LED Selfie/TikTok 10\"", updated: "2026-06-22" },
  { id: 8, name: "Hub USB-C Multi-Ports 8-en-1", updated: "2026-06-22" },
  { id: 9, name: "Ventilateur Portable Rechargeable à Collerette", updated: "2026-06-22" },
  { id: 10, name: "Lampe Bureau LED Pliable + Chargeur Sans Fil", updated: "2026-06-22" },
  { id: 11, name: "Gua Sha Pierre de Jade Authentique", updated: "2026-06-22" },
  { id: 12, name: "Brosse Démêlante Électrique Anti-Frisottis", updated: "2026-06-22" },
  { id: 13, name: "Masque Facial LED 7 Couleurs", updated: "2026-06-22" },
  { id: 14, name: "Appareil Microdermabrasion Diamant Portable", updated: "2026-06-22" },
  { id: 15, name: "Rouleau Massage Visage Réfrigérant Acier", updated: "2026-06-22" },
  { id: 16, name: "Diffuseur d'Huiles Essentielles Portable USB", updated: "2026-06-22" },
  { id: 17, name: "Kit Faux Cils Magnétiques Réutilisables", updated: "2026-06-22" },
  { id: 18, name: "Masseur de Tête Électrique Picots Silicone", updated: "2026-06-22" },
  { id: 19, name: "Épilateur Électrique Facial Visage & Corps", updated: "2026-06-22" },
  { id: 20, name: "Sèche-Ongles LED UV Portable Mini", updated: "2026-06-22" },
  { id: 21, name: "Hachoir Manuel à Corde 3 Lames", updated: "2026-06-22" },
  { id: 22, name: "Tapis de Cuisson Silicone Antiadhésif Lot de 3", updated: "2026-06-22" },
  { id: 23, name: "Organisateur Tiroir Extensible Lot de 4", updated: "2026-06-22" },
  { id: 24, name: "Bouteille Infuseur à Eau avec Minuteur", updated: "2026-06-22" },
  { id: 25, name: "Couvercles Silicone Extensibles Lot de 6", updated: "2026-06-22" },
  { id: 26, name: "Planche à Découper Pliable 3-en-1", updated: "2026-06-22" },
  { id: 27, name: "Mini Aspirateur de Table USB Rechargeable", updated: "2026-06-22" },
  { id: 28, name: "Sacs Rangement Sous Vide à Valve Lot de 6", updated: "2026-06-22" },
  { id: 29, name: "Support Éponge avec Distributeur de Savon", updated: "2026-06-22" },
  { id: 30, name: "Thermomètre Cuisine Digital Instantané", updated: "2026-06-22" },
];

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const urls = [
    `  <url><loc>${SITE}/</loc><priority>1.0</priority><changefreq>daily</changefreq></url>`,
    `  <url><loc>${SITE}/cart</loc><priority>0.5</priority><changefreq>weekly</changefreq></url>`,
    `  <url><loc>${SITE}/account</loc><priority>0.3</priority><changefreq>monthly</changefreq></url>`,
    `  <url><loc>${SITE}/sign-in</loc><priority>0.3</priority><changefreq>monthly</changefreq></url>`,
    `  <url><loc>${SITE}/sign-up</loc><priority>0.3</priority><changefreq>monthly</changefreq></url>`,
    ...products.map(p =>
      `  <url><loc>${SITE}/product/${p.id}</loc><lastmod>${p.updated}</lastmod><priority>0.8</priority><changefreq>weekly</changefreq></url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}
