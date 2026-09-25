import { findCartByUserId, deleteCartByUserId } from '../repositories/cart.repository.js';
import { findProductById, reduceProductStock } from '../repositories/product.repository.js';
import { createOrder, findOrdersByUserId, findOrderById, findAllOrders, updateOrderStatus } from '../repositories/order.repository.js';
import { findUserById } from '../repositories/user.repository.js';
import { isValidStatus, canTransitionStatus } from '../utils/orderStatusTransition.js';
import { validateOrderCart } from '../validators/order.validator.js';
import { calculateCartSubtotal, calculateShipping, calculateTax, calculateOrderTotal } from '../utils/calculations.js';
import { createOrderItemSnapshot } from '../models/order.model.js';

/**
 * Reusable Backend Order Service
 * (Independent of Express req/res objects)
 */

export async function createOrderService(userId) {
  if (!userId) {
    const error = new Error('Authentication required.');
    error.statusCode = 401;
    throw error;
  }

  const cart = await findCartByUserId(userId);
  const validation = validateOrderCart(cart);
  if (!validation.isValid) {
    const error = new Error(validation.errors.join(' '));
    error.statusCode = 400;
    throw error;
  }

  // Stock availability check & historical item snapshot preparation
  const orderItems = [];
  for (const cartItem of cart.items) {
    const product = await findProductById(cartItem.productId);
    if (!product) {
      const error = new Error(`Product '${cartItem.name}' (ID: ${cartItem.productId}) is no longer available.`);
      error.statusCode = 404;
      throw error;
    }

    if (cartItem.quantity > product.stock) {
      const error = new Error(`Cannot place order. '${product.name}' requested quantity (${cartItem.quantity}) exceeds available stock (${product.stock}).`);
      error.statusCode = 409;
      throw error;
    }

    orderItems.push(
      createOrderItemSnapshot({
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        quantity: cartItem.quantity,
        unitPrice: product.price // Authoritative price snapshot
      })
    );
  }

  // Pure backend-authoritative financial calculation
  const subtotal = calculateCartSubtotal(orderItems);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = calculateOrderTotal(subtotal, shipping, tax);

  // Reduce product inventory stock
  for (const item of orderItems) {
    await reduceProductStock(item.productId, item.quantity);
  }

  // Create order entity
  const newOrder = await createOrder({
    userId,
    items: orderItems,
    subtotal,
    shipping,
    tax,
    total
  });

  // Clear user shopping cart session
  await deleteCartByUserId(userId);

  return newOrder;
}

export async function getUserOrdersService(userId) {
  if (!userId) {
    const error = new Error('Authentication required.');
    error.statusCode = 401;
    throw error;
  }
  return await findOrdersByUserId(userId);
}

export async function getOrderByIdService(userId, orderId) {
  if (!userId) {
    const error = new Error('Authentication required.');
    error.statusCode = 401;
    throw error;
  }

  if (!orderId) {
    const error = new Error('Order ID is required.');
    error.statusCode = 400;
    throw error;
  }

  const order = await findOrderById(orderId);
  if (!order) {
    const error = new Error(`Order with ID '${orderId}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  // User ownership isolation check
  if (order.userId !== userId) {
    const error = new Error('Access forbidden: You can only view your own order details.');
    error.statusCode = 403;
    throw error;
  }

  return order;
}

export async function getAllOrdersAdminService() {
  const allOrders = await findAllOrders();
  const enrichedOrders = [];
  for (const order of allOrders) {
    const user = await findUserById(order.userId);
    enrichedOrders.push({
      ...order,
      customerEmail: user ? user.email : 'Unknown User',
      customerName: user ? user.name : 'Unknown User'
    });
  }
  return enrichedOrders;
}

export async function getOrderByIdAdminService(orderId) {
  if (!orderId) {
    const error = new Error('Order ID is required.');
    error.statusCode = 400;
    throw error;
  }
  const order = await findOrderById(orderId);
  if (!order) {
    const error = new Error(`Order with ID '${orderId}' not found.`);
    error.statusCode = 404;
    throw error;
  }
  const user = await findUserById(order.userId);
  return {
    ...order,
    customerEmail: user ? user.email : 'Unknown User',
    customerName: user ? user.name : 'Unknown User'
  };
}

export async function updateOrderStatusAdminService(orderId, newStatus) {
  if (!orderId) {
    const error = new Error('Order ID is required.');
    error.statusCode = 400;
    throw error;
  }

  const order = await findOrderById(orderId);
  if (!order) {
    const error = new Error(`Order with ID '${orderId}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  if (!isValidStatus(newStatus)) {
    const error = new Error(`Invalid status '${newStatus}'.`);
    error.statusCode = 400;
    throw error;
  }

  if (!canTransitionStatus(order.status, newStatus)) {
    const error = new Error(`Invalid status transition from '${order.status}' to '${newStatus}'.`);
    error.statusCode = 409;
    throw error;
  }

  const updated = await updateOrderStatus(orderId, newStatus);
  const user = await findUserById(updated.userId);
  return {
    ...updated,
    customerEmail: user ? user.email : 'Unknown User',
    customerName: user ? user.name : 'Unknown User'
  };
}

