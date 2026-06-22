import sql from './_db.js';

async function migrate() {
  console.log('Running migration...');

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_address TEXT NOT NULL,
      total DECIMAL(10, 2) NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      quantity INTEGER NOT NULL
    );
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);`;

  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking TEXT;`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'virement';`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_code TEXT;`;

  console.log('Migration complete.');
}

migrate().catch(console.error);
