import type { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './_db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, tracking, status } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Missing order id' });
    }

    const [order] = await sql`
      UPDATE orders SET status = ${status || 'fulfilled'}, tracking = ${tracking || null}
      WHERE id = ${id}
      RETURNING id, customer_name, customer_email, total, status, tracking, created_at
    `;

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.json({ success: true, order });
  } catch (err) {
    console.error('Fulfill error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
