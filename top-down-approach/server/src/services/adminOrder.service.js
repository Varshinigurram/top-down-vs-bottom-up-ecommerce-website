import {
  findAllOrders,
  findOrderById,
  updateOrderStatus as repoUpdateOrderStatus
} from '../repositories/order.repository.js';
import { findUserById } from '../repositories/user.repository.js';
import { ORDER_STATUS } from '../models/order.model.js';

/**
 * Valid state transitions table for Order management.
 */
const VALID_TRANSITIONS = {
  [ORDER_STATUS.PENDING]: [ORDER_STATUS.CONFIRMED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.CONFIRMED]: [ORDER_STATUS.SHIPPED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.SHIPPED]: [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.DELIVERED]: [],
  [ORDER_STATUS.CANCELLED]: []
};

/**
 * Enriches order object with customer metadata for admin overview.
 */
async function enrichOrderWithCustomer(order) {
  if (!order) return null;
  const user = await findUserById(order.userId);
  return {
    ...order,
    customerName: user ? user.name : 'Unknown Customer',
    customerEmail: user ? user.email : 'N/A'
  };
}

/**
 * Retrieves all customer orders (newest first).
 */
export async function getAdminOrders() {
  const orders = await findAllOrders();
  return await Promise.all(orders.map((o) => enrichOrderWithCustomer(o)));
}

/**
 * Retrieves detailed information for a specific order.
 */
export async function getAdminOrderDetails(id) {
  const order = await findOrderById(id);
  if (!order) {
    const error = new Error(`Order with ID '${id}' not found.`);
    error.statusCode = 404;
    throw error;
  }
  return await enrichOrderWithCustomer(order);
}

/**
 * Updates order status following strict state transition rules.
 */
export async function updateAdminOrderStatus(id, newStatus) {
  const order = await findOrderById(id);
  if (!order) {
    const error = new Error(`Order with ID '${id}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  // Check if status is a valid status value
  const validStatusValues = Object.values(ORDER_STATUS);
  if (!validStatusValues.includes(newStatus)) {
    const error = new Error(`Invalid status '${newStatus}'. Allowed values: ${validStatusValues.join(', ')}.`);
    error.statusCode = 400;
    throw error;
  }

  // Check state transition rule
  const allowedNextStatuses = VALID_TRANSITIONS[order.status] || [];
  if (!allowedNextStatuses.includes(newStatus)) {
    const error = new Error(
      `Cannot transition order status from '${order.status}' to '${newStatus}'.`
    );
    error.statusCode = 409; // Conflict
    throw error;
  }

  const updatedOrder = await repoUpdateOrderStatus(id, newStatus);
  return await enrichOrderWithCustomer(updatedOrder);
}
