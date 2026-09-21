import { getAllProductsPrimitive, getProductByIdPrimitive } from '../models/product.model.js';
import { buildSuccessResponse, buildErrorResponse } from '../utils/responseFormatter.js';

/**
 * Bottom-Up Service Layer: Aggregates model primitives and utility functions
 */
export function fetchProductsService() {
  const products = getAllProductsPrimitive();
  return buildSuccessResponse(products, { count: products.length });
}

export function fetchProductByIdService(id) {
  const product = getProductByIdPrimitive(id);
  if (!product) {
    return buildErrorResponse(`Product ID ${id} not found`, 404);
  }
  return buildSuccessResponse(product);
}
