import { getProductCatalog, getProductDetails } from '../services/product.service.js';

/**
 * Top-Down Controller Layer: Formats controller responses based on route handlers.
 */
export async function getAllProducts(req, res, next) {
  try {
    const products = await getProductCatalog();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    const product = await getProductDetails(req.params.id);
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
}
