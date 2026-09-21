/**
 * Order Domain Model Schema Definition
 */

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

/**
 * Formats order entity for API response standardization.
 */
export function formatOrderEntity(order) {
  if (!order) return null;
  return {
    id: order.id,
    userId: order.userId,
    items: Array.isArray(order.items) ? order.items.map((item) => ({
      productId: item.productId,
      productName: item.productName || item.name,
      productImage: item.productImage || item.image || '📦',
      quantity: Number(item.quantity || 1),
      unitPrice: Number(item.unitPrice || item.price || 0),
      subtotal: Number(item.subtotal || 0)
    })) : [],
    subtotal: Number(order.subtotal || 0),
    shipping: Number(order.shipping || 0),
    tax: Number(order.tax || 0),
    total: Number(order.total || 0),
    status: order.status || ORDER_STATUS.PENDING,
    createdAt: order.createdAt || new Date().toISOString(),
    updatedAt: order.updatedAt || new Date().toISOString()
  };
}
