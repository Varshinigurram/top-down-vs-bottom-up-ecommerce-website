import { fetchProductsService, fetchProductByIdService } from '../services/product.service.js';

/**
 * Bottom-Up Controller Layer: Connects service primitives to express HTTP routes
 */
export async function handleGetProducts(req, res, next) {
  try {
    const result = await fetchProductsService();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function handleGetProductById(req, res, next) {
  try {
    const result = await fetchProductByIdService(req.params.id);
    const status = result.statusCode || 200;
    res.status(status).json(result);
  } catch (err) {
    next(err);
  }
}
