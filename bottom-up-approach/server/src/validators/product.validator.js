import { PRODUCT_CATEGORIES } from '../constants/domain.constants.js';

/**
 * Validates product payload primitive.
 */
export function validateProductData(data, isUpdate = false) {
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
      errors.push('Product price must be a positive number greater than zero.');
    }
  }

  if (!isUpdate || data.category !== undefined) {
    if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
      errors.push('Product category is required.');
    } else if (!PRODUCT_CATEGORIES.includes(data.category.trim())) {
      errors.push(`Invalid category. Allowed categories: ${PRODUCT_CATEGORIES.join(', ')}.`);
    }
  }

  if (!isUpdate || data.stock !== undefined) {
    const stockNum = Number(data.stock);
    if (isNaN(stockNum) || !Number.isInteger(stockNum) || stockNum < 0) {
      errors.push('Product stock must be a non-negative integer.');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
