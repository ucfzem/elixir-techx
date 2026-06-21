import products, { type Product } from './products';
import customers, { type Customer } from './customers';

function delay(ms: number = 200): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchProducts(params?: {
  category?: string;
  sort?: string;
  search?: string;
}): Promise<Product[]> {
  await delay();
  let result = [...products];

  if (params?.category && params.category !== 'all') {
    result = result.filter(p => p.category === params.category);
  }

  if (params?.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  switch (params?.sort) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'name_asc':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  }

  return result;
}

export async function fetchProduct(id: number | string): Promise<Product | null> {
  await delay();
  return products.find(p => p.id === Number(id)) || null;
}

export async function fetchCustomers(): Promise<Customer[]> {
  await delay();
  return [...customers];
}
