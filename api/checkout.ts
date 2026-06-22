import type { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './_db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, customer } = req.body;

    if (!items?.length || !customer?.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 50 ? 0 : 4.99;
    const total = subtotal + shipping;

    const [order] = await sql`
      INSERT INTO orders (customer_name, customer_email, customer_address, total, status)
      VALUES (${customer.name}, ${customer.email}, ${customer.address}, ${total}, 'confirmed')
      RETURNING id, customer_name, customer_email, total, status, created_at
    `;

    for (const item of items) {
      await sql`
        INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
        VALUES (${order.id}, ${item.id}, ${item.name}, ${item.price}, ${item.quantity})
      `;
    }

    return res.json({
      success: true,
      order: {
        ...order,
        items,
        subtotal,
        shipping,
        total,
      },
    });
  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
