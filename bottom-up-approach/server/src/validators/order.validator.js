import { ORDER_STATUS } from '../constants/domain.constants.js';

/**
 * Validates order creation payload and status strings.
 */
export function validateOrderCart(cart) {
  const errors = [];

  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    errors.push('Cannot place an order with an empty cart.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateOrderStatusValue(status) {
  const errors = [];
  const allowed = Object.values(ORDER_STATUS);

  if (!status || !allowed.includes(status)) {
    errors.push(`Invalid order status. Allowed values: ${allowed.join(', ')}.`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
