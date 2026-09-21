import { getProductCatalog, getProductDetails } from '../services/product.service.js';

/**
 * Top-Down Controller: Request/Response handling for Product endpoints
 */
export async function getAllProducts(req, res, next) {
  try {
    const { search, category } = req.query;
    const products = await getProductCatalog({ search, category });

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
    const { id } = req.params;
    const product = await getProductDetails(id);

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
}
