/**
 * Validates cart item quantity and stock limits.
 */
export function validateCartItemInput(productId, quantity, availableStock) {
  const errors = [];

  if (!productId) {
    errors.push('Product ID is required.');
  }

  const qty = Number(quantity);
  if (isNaN(qty) || !Number.isInteger(qty) || qty <= 0) {
    errors.push('Quantity must be a positive integer greater than zero.');
  }

  if (availableStock !== undefined && qty > availableStock) {
    errors.push(`Requested quantity (${qty}) exceeds available stock (${availableStock}).`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
