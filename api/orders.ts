import type { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './_db.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const orders = await sql`
      SELECT * FROM orders ORDER BY created_at DESC
    `;

    const items = await sql`
      SELECT * FROM order_items ORDER BY order_id, id
    `;

    const itemsByOrder: Record<number, typeof items> = {};
    for (const item of items) {
      if (!itemsByOrder[item.order_id]) itemsByOrder[item.order_id] = [];
      itemsByOrder[item.order_id].push(item);
    }

    const result = orders.map((o: any) => ({
      ...o,
      items: itemsByOrder[o.id] || [],
    }));

    return res.json(result);
  } catch (err) {
    console.error('Orders error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
