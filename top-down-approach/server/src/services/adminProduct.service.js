import {
  findAllProducts,
  findProductById,
  createProduct as repoCreateProduct,
  updateProduct as repoUpdateProduct,
  deleteProduct as repoDeleteProduct
} from '../repositories/product.repository.js';

/**
 * Validates product payload for administrative CRUD operations.
 */
function validateProductInput(data, isUpdate = false) {
  const errors = [];

  if (!isUpdate || data.name !== undefined) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Product name is required.');
    }
  }

  if (!isUpdate || data.description !== undefined) {
    if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
      errors.push('Product description is required.');
    }
  }

  if (!isUpdate || data.price !== undefined) {
    const priceNum = Number(data.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      errors.push('Product price must be a number greater than 0.');
    }
  }

  if (!isUpdate || data.category !== undefined) {
    if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
      errors.push('Product category is required.');
    }
  }

  if (!isUpdate || data.stock !== undefined) {
    const stockNum = Number(data.stock);
    if (isNaN(stockNum) || !Number.isInteger(stockNum) || stockNum < 0) {
      errors.push('Product stock must be a non-negative integer.');
    }
  }

  return errors;
}

/**
 * Creates a new product.
 */
export async function createAdminProduct(productData) {
  const errors = validateProductInput(productData, false);
  if (errors.length > 0) {
    const error = new Error(errors.join(' '));
    error.statusCode = 400;
    throw error;
  }

  const payload = {
    name: productData.name.trim(),
    description: productData.description.trim(),
    price: Number(productData.price),
    category: productData.category.trim(),
    image: productData.image ? productData.image.trim() : '📦',
    stock: Number(productData.stock)
  };

  return await repoCreateProduct(payload);
}

/**
 * Updates an existing product.
 */
export async function updateAdminProduct(id, productData) {
  const existing = await findProductById(id);
  if (!existing) {
    const error = new Error(`Product with ID '${id}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  const errors = validateProductInput(productData, true);
  if (errors.length > 0) {
    const error = new Error(errors.join(' '));
    error.statusCode = 400;
    throw error;
  }

  const payload = {};
  if (productData.name !== undefined) payload.name = productData.name.trim();
  if (productData.description !== undefined) payload.description = productData.description.trim();
  if (productData.price !== undefined) payload.price = Number(productData.price);
  if (productData.category !== undefined) payload.category = productData.category.trim();
  if (productData.image !== undefined) payload.image = productData.image.trim() || '📦';
  if (productData.stock !== undefined) payload.stock = Number(productData.stock);

  const updated = await repoUpdateProduct(id, payload);
  if (!updated) {
    const error = new Error(`Product with ID '${id}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  return updated;
}

/**
 * Deletes a product. Historical orders retain their product snapshots.
 */
export async function deleteAdminProduct(id) {
  const existing = await findProductById(id);
  if (!existing) {
    const error = new Error(`Product with ID '${id}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  const success = await repoDeleteProduct(id);
  if (!success) {
    const error = new Error(`Failed to delete product with ID '${id}'.`);
    error.statusCode = 500;
    throw error;
  }

  return { success: true, message: `Product '${existing.name}' deleted successfully.` };
}
