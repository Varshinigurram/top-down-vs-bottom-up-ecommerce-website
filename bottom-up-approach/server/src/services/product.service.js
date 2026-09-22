import { findAllProducts, findProductById } from '../repositories/product.repository.js';
import { buildSuccessResponse, buildErrorResponse } from '../utils/responseFormatter.js';

/**
 * Bottom-Up Service Layer: Aggregates repository primitives and utility functions
 */
export async function fetchProductsService() {
  const products = await findAllProducts();
  return buildSuccessResponse(products, { count: products.length });
}

export async function fetchProductByIdService(id) {
  const product = await findProductById(id);
  if (!product) {
    return buildErrorResponse(`Product ID ${id} not found`, 404);
  }
  return buildSuccessResponse(product);
}
