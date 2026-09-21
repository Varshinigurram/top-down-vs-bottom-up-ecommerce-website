import { findAllProducts, findProductById } from '../repositories/product.repository.js';
import { formatProductEntity } from '../models/product.model.js';

/**
 * Business Service handling product catalog search and filtering.
 */
export async function getProductCatalog({ search, category } = {}) {
  let products = await findAllProducts();

  // Category filtering
  if (category && category.trim() !== '' && category.toLowerCase() !== 'all') {
    const targetCategory = category.trim().toLowerCase();
    products = products.filter(
      (p) => p.category && p.category.toLowerCase() === targetCategory
    );
  }

  // Keyword search filtering (matches name or description)
  if (search && search.trim() !== '') {
    const term = search.trim().toLowerCase();
    products = products.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.description && p.description.toLowerCase().includes(term)) ||
        (p.category && p.category.toLowerCase().includes(term))
    );
  }

  return products.map(formatProductEntity);
}

/**
 * Business Service retrieving detailed product info.
 */
export async function getProductDetails(id) {
  if (!id) {
    const error = new Error('Product ID is required');
    error.statusCode = 400;
    throw error;
  }

  const product = await findProductById(id);
  if (!product) {
    const error = new Error(`Product with ID "${id}" was not found`);
    error.statusCode = 404;
    throw error;
  }

  return formatProductEntity(product);
}
