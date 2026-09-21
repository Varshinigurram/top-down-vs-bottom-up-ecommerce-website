import { fetchProductsService, fetchProductByIdService } from '../services/product.service.js';

/**
 * Bottom-Up Controller Layer: Connects service primitives to express HTTP routes
 */
export function handleGetProducts(req, res) {
  const result = fetchProductsService();
  res.status(200).json(result);
}

export function handleGetProductById(req, res) {
  const result = fetchProductByIdService(req.params.id);
  const status = result.statusCode || 200;
  res.status(status).json(result);
}
