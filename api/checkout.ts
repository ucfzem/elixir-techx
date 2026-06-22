import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, customer } = req.body;

    if (!items?.length || !customer?.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate total
    const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 50 ? 0 : 4.99;
    const total = subtotal + shipping;

    // In production: create Stripe PaymentIntent & save order to DB here
    // const paymentIntent = await stripe.paymentIntents.create({ ... });

    // Mock successful order
    const order = {
      id: Math.random().toString(36).slice(2),
      items,
      customer,
      subtotal,
      shipping,
      total,
      status: 'confirmed',
      created_at: new Date().toISOString(),
    };

    return res.json({
      success: true,
      order,
      // In production: clientSecret: paymentIntent.client_secret
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
