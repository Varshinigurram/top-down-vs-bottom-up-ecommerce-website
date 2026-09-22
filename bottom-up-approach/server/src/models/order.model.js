import { ORDER_STATUS } from '../constants/domain.constants.js';

/**
 * Creates an OrderItem historical snapshot primitive.
 */
export function createOrderItemSnapshot(item) {
  const qty = Number(item.quantity || 1);
  const price = Number(item.unitPrice || item.price || 0);
  return {
    productId: item.productId,
    productName: item.productName || item.name || 'Product Item',
    productImage: item.productImage || item.image || '📦',
    quantity: qty,
    unitPrice: price,
    subtotal: Math.round(price * qty * 100) / 100
  };
}

/**
 * Creates a complete Order domain entity.
 */
export function createOrderEntity({ id, userId, items = [], subtotal = 0, shipping = 0, tax = 0, total = 0, status = ORDER_STATUS.PENDING, createdAt }) {
  const now = new Date().toISOString();
  return {
    id: id || `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    userId,
    items: items.map((i) => createOrderItemSnapshot(i)),
    subtotal: Number(subtotal),
    shipping: Number(shipping),
    tax: Number(tax),
    total: Number(total),
    status: status || ORDER_STATUS.PENDING,
    createdAt: createdAt || now,
    updatedAt: now
  };
}
