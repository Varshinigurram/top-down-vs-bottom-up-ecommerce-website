import { ORDER_STATUS, formatOrderEntity } from '../models/order.model.js';

// In-Memory Order Store (Map of orderId -> order object)
const orders = new Map();

/**
 * Creates and persists a new order entity.
 */
export async function createOrder(orderData) {
  const orderId = `ord_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

  const newOrder = {
    id: orderId,
    userId: orderData.userId,
    items: orderData.items || [],
    subtotal: orderData.subtotal,
    shipping: orderData.shipping || 0,
    tax: orderData.tax,
    total: orderData.total,
    status: orderData.status || ORDER_STATUS.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  orders.set(orderId, newOrder);
  return Promise.resolve(formatOrderEntity(newOrder));
}

/**
 * Retrieves all orders belonging to a specific userId (newest first).
 */
export async function findOrdersByUserId(userId) {
  if (!userId) return Promise.resolve([]);

  const userOrders = [];
  for (const order of orders.values()) {
    if (order.userId === userId) {
      userOrders.push(formatOrderEntity(order));
    }
  }

  // Sort newest first by createdAt timestamp
  userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return Promise.resolve(userOrders);
}

/**
 * Finds a single order by order ID.
 */
export async function findOrderById(id) {
  if (!id) return Promise.resolve(null);
  const order = orders.get(id);
  return Promise.resolve(order ? formatOrderEntity(order) : null);
}
