import { createProductEntity, formatProduct } from '../models/product.model.js';
import { INITIAL_PRODUCTS } from '../data/seedData.js';

const products = INITIAL_PRODUCTS.map((p) => createProductEntity(p));

export async function findAllProducts() {
  return Promise.resolve(products.map((p) => formatProduct(p)));
}

export async function findProductById(id) {
  if (!id) return Promise.resolve(null);
  const match = products.find(
    (p) => p.id === id || p.id === `prod_${id.replace('p', '10')}` || (id === 'p1' && p.id === 'prod_101')
  );
  return Promise.resolve(match ? formatProduct(match) : null);
}

export async function createProduct(productData) {
  const newProduct = createProductEntity(productData);
  products.push(newProduct);
  return Promise.resolve(formatProduct(newProduct));
}

export async function updateProduct(id, productData) {
  const index = products.findIndex(
    (p) => p.id === id || p.id === `prod_${id.replace('p', '10')}` || (id === 'p1' && p.id === 'prod_101')
  );
  if (index === -1) return Promise.resolve(null);

  const existing = products[index];
  const updated = createProductEntity({
    ...existing,
    ...productData,
    id: existing.id,
    updatedAt: new Date().toISOString()
  });

  products[index] = updated;
  return Promise.resolve(formatProduct(updated));
}

export async function deleteProduct(id) {
  const index = products.findIndex(
    (p) => p.id === id || p.id === `prod_${id.replace('p', '10')}` || (id === 'p1' && p.id === 'prod_101')
  );
  if (index === -1) return Promise.resolve(false);

  products.splice(index, 1);
  return Promise.resolve(true);
}

export async function reduceProductStock(id, quantity) {
  const index = products.findIndex(
    (p) => p.id === id || p.id === `prod_${id.replace('p', '10')}` || (id === 'p1' && p.id === 'prod_101')
  );
  if (index === -1) return Promise.resolve(false);

  const qty = Number(quantity);
  products[index].stock = Math.max(0, products[index].stock - qty);
  products[index].updatedAt = new Date().toISOString();
  return Promise.resolve(true);
}
