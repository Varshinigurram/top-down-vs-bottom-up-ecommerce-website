import { findAllProducts, findProductById } from '../repositories/product.repository.js';
import { buildSuccessResponse, buildErrorResponse } from '../utils/responseFormatter.js';

/**
 * Reusable Backend Product Service
 * (Independent of Express req/res objects)
 */

export async function fetchProductsService({ search = '', category = 'All' } = {}) {
  const allProducts = await findAllProducts();

  const filtered = allProducts.filter((p) => {
    const matchesCategory =
      !category || category.toLowerCase() === 'all' || p.category.toLowerCase() === category.trim().toLowerCase();
    
    const searchTerm = search ? search.trim().toLowerCase() : '';
    const matchesSearch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  return buildSuccessResponse(filtered, { count: filtered.length });
}

export async function fetchProductByIdService(id) {
  if (!id) {
    return buildErrorResponse('Product ID is required', 400);
  }

  const product = await findProductById(id);
  if (!product) {
    return buildErrorResponse(`Product ID '${id}' not found`, 404);
  }

  return buildSuccessResponse(product);
}
