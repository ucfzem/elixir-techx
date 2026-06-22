import type { VercelRequest, VercelResponse } from '@vercel/node';

const customers = [
  { id: 1, name: "Marie Dubois", email: "marie.dubois@email.fr", address: "15 Rue de la Paix, 75001 Paris", created_at: "2026-01-15T10:30:00Z" },
  { id: 2, name: "Thomas Leroy", email: "thomas.leroy@email.fr", address: "8 Avenue des Champs-Élysées, 75008 Paris", created_at: "2026-02-03T14:15:00Z" },
  { id: 3, name: "Sophie Moreau", email: "sophie.moreau@email.fr", address: "42 Cours Mirabeau, 13100 Aix-en-Provence", created_at: "2026-02-20T09:45:00Z" },
  { id: 4, name: "Lucas Petit", email: "lucas.petit@email.fr", address: "3 Place Bellecour, 69002 Lyon", created_at: "2026-03-05T16:00:00Z" },
  { id: 5, name: "Camille Bernard", email: "camille.bernard@email.fr", address: "28 Rue Sainte-Catherine, 33000 Bordeaux", created_at: "2026-03-18T11:20:00Z" },
  { id: 6, name: "Antoine Roux", email: "antoine.roux@email.fr", address: "12 Quai du Port, 13002 Marseille", created_at: "2026-04-01T08:00:00Z" },
  { id: 7, name: "Julie Fontaine", email: "julie.fontaine@email.fr", address: "5 Place du Capitole, 31000 Toulouse", created_at: "2026-04-12T13:30:00Z" },
  { id: 8, name: "Maxime Girard", email: "maxime.girard@email.fr", address: "19 Rue de la République, 69001 Lyon", created_at: "2026-05-02T15:45:00Z" },
];

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  return res.json(customers);
}
