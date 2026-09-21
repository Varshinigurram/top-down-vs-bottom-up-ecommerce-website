import { findAllProducts, findProductById } from '../models/product.model.js';

/**
 * Top-Down Business Service Layer
 */
export async function getProductCatalog() {
  const products = await findAllProducts();
  return products;
}

export async function getProductDetails(id) {
  const product = await findProductById(id);
  if (!product) {
    const error = new Error(`Product with ID ${id} not found`);
    error.statusCode = 404;
    throw error;
  }
  return product;
}
