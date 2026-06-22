import type { Product } from './products';
import type { Customer } from './customers';

const API_BASE = '/api';

export async function fetchProducts(params?: {
  category?: string;
  sort?: string;
  search?: string;
}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params?.category && params.category !== 'all') query.set('category', params.category);
  if (params?.sort) query.set('sort', params.sort);
  if (params?.search) query.set('search', params.search);

  const res = await fetch(`${API_BASE}/products?${query}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProduct(id: number | string): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/products?id=${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchCustomers(): Promise<Customer[]> {
  const res = await fetch(`${API_BASE}/customers`);
  if (!res.ok) throw new Error('Failed to fetch customers');
  return res.json();
}

export async function checkout(items: { id: number; name: string; price: number; quantity: number }[], customer: { name: string; email: string; address: string }) {
  const res = await fetch(`${API_BASE}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, customer }),
  });
  if (!res.ok) throw new Error('Checkout failed');
  return res.json();
}
