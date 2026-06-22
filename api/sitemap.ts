import type { VercelRequest, VercelResponse } from '@vercel/node';

const SITE = 'https://elixir-techx.vercel.app';

const products = [
  { id: 1, name: "iPhone 17 Pro Max", updated: "2026-06-01" },
  { id: 2, name: "Samsung Galaxy S26 Ultra", updated: "2026-05-28" },
  { id: 3, name: "MacBook Pro 16\" M4 Max", updated: "2026-05-15" },
  { id: 4, name: "Dell XPS 16", updated: "2026-05-20" },
  { id: 5, name: "Sony WH-1000XM6", updated: "2026-06-05" },
  { id: 6, name: "AirPods Max 2", updated: "2026-06-10" },
  { id: 7, name: "Apple Watch Ultra 3", updated: "2026-06-08" },
  { id: 8, name: "Samsung Galaxy Watch 7 Pro", updated: "2026-05-25" },
  { id: 9, name: "PlayStation 6 Pro", updated: "2026-06-12" },
  { id: 10, name: "Xbox Series Y", updated: "2026-06-03" },
  { id: 11, name: "Logitech MX Master 4", updated: "2026-06-02" },
  { id: 12, name: "Clavier Mécanique Keychron Q6 Max", updated: "2026-05-30" },
  { id: 13, name: "Samsung Galaxy Z Fold 7", updated: "2026-06-15" },
  { id: 14, name: "ASUS ROG Zephyrus G16", updated: "2026-06-07" },
  { id: 15, name: "Bose QuietComfort Ultra Pro", updated: "2026-06-14" },
  { id: 16, name: "Garmin Fenix 8 Solar", updated: "2026-05-18" },
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
