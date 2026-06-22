import type { VercelRequest, VercelResponse } from '@vercel/node';

const SITE = 'https://elixir-techx.vercel.app';

const products = [
  { id: 1, name: "Mini Projecteur Portable HD", updated: "2026-06-22", img: "mini-projecteur-portable-hd.jpg" },
  { id: 2, name: "Écouteurs Bluetooth TWS Réduction de Bruit", updated: "2026-06-22", img: "ecouteurs-bluetooth-tws.jpg" },
  { id: 3, name: "Montre Connectée Fitness Tracker", updated: "2026-06-22", img: "montre-connectee-fitness-tracker.jpg" },
  { id: 4, name: "Power Bank 20000mAh Ultra-Compacte", updated: "2026-06-22", img: "power-bank-20000mah-ultra-compacte.jpg" },
  { id: 5, name: "Support Téléphone Pliable Lit/Canapé", updated: "2026-06-22", img: "support-telephone-pliable-lit.jpg" },
  { id: 6, name: "Enceinte Bluetooth Waterproof Portable", updated: "2026-06-22", img: "enceinte-bluetooth-waterproof.jpg" },
  { id: 7, name: "Anneau Lumineux LED Selfie/TikTok 10\"", updated: "2026-06-22", img: "anneau-lumineux-led-selfie.jpg" },
  { id: 8, name: "Hub USB-C Multi-Ports 8-en-1", updated: "2026-06-22", img: "hub-usb-c-multi-ports.jpg" },
  { id: 9, name: "Ventilateur Portable Rechargeable à Collerette", updated: "2026-06-22", img: "ventilateur-portable-collerette.jpg" },
  { id: 10, name: "Lampe Bureau LED Pliable + Chargeur Sans Fil", updated: "2026-06-22", img: "lampe-bureau-led-chargeur-sans-fil.jpg" },
  { id: 11, name: "Gua Sha Pierre de Jade Authentique", updated: "2026-06-22", img: "gua-sha-pierre-jade.jpg" },
  { id: 12, name: "Brosse Démêlante Électrique Anti-Frisottis", updated: "2026-06-22", img: "brosse-demelante-electrique.jpg" },
  { id: 13, name: "Masque Facial LED 7 Couleurs", updated: "2026-06-22", img: "masque-facial-led.jpg" },
  { id: 14, name: "Appareil Microdermabrasion Diamant Portable", updated: "2026-06-22", img: "microdermabrasion-diamant.jpg" },
  { id: 15, name: "Rouleau Massage Visage Réfrigérant Acier", updated: "2026-06-22", img: "rouleau-massage-visage-acier.jpg" },
  { id: 16, name: "Diffuseur d'Huiles Essentielles Portable USB", updated: "2026-06-22", img: "diffuseur-huiles-essentielles-usb.jpg" },
  { id: 17, name: "Kit Faux Cils Magnétiques Réutilisables", updated: "2026-06-22", img: "faux-cils-magnetiques.jpg" },
  { id: 18, name: "Masseur de Tête Électrique Picots Silicone", updated: "2026-06-22", img: "masseur-tete-electrique.jpg" },
  { id: 19, name: "Épilateur Électrique Facial Visage & Corps", updated: "2026-06-22", img: "epilateur-electrique-facial.jpg" },
  { id: 20, name: "Sèche-Ongles LED UV Portable Mini", updated: "2026-06-22", img: "seche-ongles-led-uv.jpg" },
  { id: 21, name: "Hachoir Manuel à Corde 3 Lames", updated: "2026-06-22", img: "hachoir-manuel-corde.jpg" },
  { id: 22, name: "Tapis de Cuisson Silicone Antiadhésif Lot de 3", updated: "2026-06-22", img: "tapis-cuisson-silicone.jpg" },
  { id: 23, name: "Organisateur Tiroir Extensible Lot de 4", updated: "2026-06-22", img: "organisateur-tiroir-extensible.jpg" },
  { id: 24, name: "Bouteille Infuseur à Eau avec Minuteur", updated: "2026-06-22", img: "bouteille-infuseur-eau.jpg" },
  { id: 25, name: "Couvercles Silicone Extensibles Lot de 6", updated: "2026-06-22", img: "couvercles-silicone-extensibles.jpg" },
  { id: 26, name: "Planche à Découper Pliable 3-en-1", updated: "2026-06-22", img: "planche-decouper-pliable.jpg" },
  { id: 27, name: "Mini Aspirateur de Table USB Rechargeable", updated: "2026-06-22", img: "mini-aspirateur-table-usb.jpg" },
  { id: 28, name: "Sacs Rangement Sous Vide à Valve Lot de 6", updated: "2026-06-22", img: "sacs-sous-vide-valve.jpg" },
  { id: 29, name: "Support Éponge avec Distributeur de Savon", updated: "2026-06-22", img: "support-eponge-distributeur-savon.jpg" },
  { id: 30, name: "Thermomètre Cuisine Digital Instantané", updated: "2026-06-22", img: "thermometre-cuisine-digital.jpg" },
];

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const urls = [
    `  <url><loc>${SITE}/</loc><priority>1.0</priority><changefreq>daily</changefreq></url>`,
    `  <url><loc>${SITE}/cart</loc><priority>0.5</priority><changefreq>weekly</changefreq></url>`,
    `  <url><loc>${SITE}/account</loc><priority>0.3</priority><changefreq>monthly</changefreq></url>`,
    `  <url><loc>${SITE}/sign-in</loc><priority>0.3</priority><changefreq>monthly</changefreq></url>`,
    `  <url><loc>${SITE}/sign-up</loc><priority>0.3</priority><changefreq>monthly</changefreq></url>`,
    ...products.map(p =>
      `  <url><loc>${SITE}/product/${p.id}</loc><lastmod>${p.updated}</lastmod><priority>0.8</priority><changefreq>weekly</changefreq><image:image><image:loc>${SITE}/images/${p.img}</image:loc><image:title>${p.name}</image:title></image:image></url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}
