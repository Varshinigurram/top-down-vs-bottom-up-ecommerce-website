import { createOrderEntity } from '../models/order.model.js';

const orders = new Map();

export async function createOrder(orderData) {
  const newOrder = createOrderEntity(orderData);
  orders.set(newOrder.id, newOrder);
  return Promise.resolve({ ...newOrder });
}

export async function findOrdersByUserId(userId) {
  if (!userId) return Promise.resolve([]);
  const result = [];
  for (const order of orders.values()) {
    if (order.userId === userId) {
      result.push({ ...order });
    }
  }
  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return Promise.resolve(result);
}

export async function findOrderById(id) {
  if (!id) return Promise.resolve(null);
  const order = orders.get(id);
  return Promise.resolve(order ? { ...order } : null);
}

export async function findAllOrders() {
  const result = Array.from(orders.values()).map((o) => ({ ...o }));
  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return Promise.resolve(result);
}

export async function updateOrderStatus(id, newStatus) {
  if (!id) return Promise.resolve(null);
  const order = orders.get(id);
  if (!order) return Promise.resolve(null);

  order.status = newStatus;
  order.updatedAt = new Date().toISOString();
  orders.set(id, order);
  return Promise.resolve({ ...order });
}
