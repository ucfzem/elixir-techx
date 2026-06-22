import type { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './_db.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const customers = await sql`
      SELECT DISTINCT ON (customer_email)
        id, customer_name AS name, customer_email AS email, customer_address AS address, created_at
      FROM orders
      ORDER BY customer_email, created_at DESC
    `;

    return res.json(customers);
  } catch (err) {
    console.error('Customers error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
