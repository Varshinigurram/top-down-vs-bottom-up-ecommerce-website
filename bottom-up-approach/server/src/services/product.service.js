import {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../repositories/product.repository.js';
import { validateProductData } from '../validators/product.validator.js';
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

export async function createProductService(productData) {
  const validation = validateProductData(productData, false);
  if (!validation.isValid) {
    const error = new Error(validation.errors.join(' '));
    error.statusCode = 400;
    throw error;
  }
  return await createProduct(productData);
}

export async function updateProductService(id, productData) {
  const existing = await findProductById(id);
  if (!existing) {
    const error = new Error(`Product with ID '${id}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  const validation = validateProductData(productData, true);
  if (!validation.isValid) {
    const error = new Error(validation.errors.join(' '));
    error.statusCode = 400;
    throw error;
  }

  return await updateProduct(id, productData);
}

export async function deleteProductService(id) {
  const existing = await findProductById(id);
  if (!existing) {
    const error = new Error(`Product with ID '${id}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  const deleted = await deleteProduct(id);
  if (!deleted) {
    const error = new Error(`Failed to delete product with ID '${id}'.`);
    error.statusCode = 500;
    throw error;
  }

  return { success: true, message: `Product '${existing.name}' deleted successfully.` };
}

