import { findCartByUserId, deleteCartByUserId } from '../repositories/cart.repository.js';
import { findProductById, reduceProductStock } from '../repositories/product.repository.js';
import { createOrder, findOrdersByUserId, findOrderById } from '../repositories/order.repository.js';
import { ORDER_STATUS } from '../models/order.model.js';

/**
 * Order Business Service Layer
 */

export async function checkoutAndCreateOrder(userId) {
  if (!userId) {
    const error = new Error('Authentication required');
    error.statusCode = 401;
    throw error;
  }

  // 1. Retrieve cart
  const cart = await findCartByUserId(userId);
  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    const error = new Error('Cannot checkout with an empty cart');
    error.statusCode = 400; // Bad Request
    throw error;
  }

  // 2. Validate product availability and stock
  let calculatedSubtotal = 0;
  const orderItemsSnapshot = [];

  for (const item of cart.items) {
    const product = await findProductById(item.productId);

    if (!product) {
      const error = new Error(`Product "${item.name}" is no longer available`);
      error.statusCode = 404;
      throw error;
    }

    if (item.quantity > product.stock) {
      const error = new Error(
        `Insufficient stock for "${product.name}". Available: ${product.stock}, requested in cart: ${item.quantity}`
      );
      error.statusCode = 409; // Conflict
      throw error;
    }

    // Authoritative pricing calculation
    const unitPrice = Number(product.price);
    const itemSubtotal = Math.round(unitPrice * item.quantity * 100) / 100;
    calculatedSubtotal += itemSubtotal;

    // Snapshot of historical purchase data
    orderItemsSnapshot.push({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      quantity: item.quantity,
      unitPrice: unitPrice,
      subtotal: itemSubtotal
    });
  }

  // 3. Authoritative Financial Calculations
  const subtotal = Math.round(calculatedSubtotal * 100) / 100;
  const shipping = 0; // Free shipping
  const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% sales tax
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;

  // 4. Create Order entity
  const newOrder = await createOrder({
    userId,
    items: orderItemsSnapshot,
    subtotal,
    shipping,
    tax,
    total,
    status: ORDER_STATUS.PENDING
  });

  // 5. Decrement Inventory Stock
  for (const item of orderItemsSnapshot) {
    await reduceProductStock(item.productId, item.quantity);
  }

  // 6. Clear user cart after successful order creation
  await deleteCartByUserId(userId);

  return newOrder;
}

export async function getUserOrders(userId) {
  if (!userId) {
    const error = new Error('Authentication required');
    error.statusCode = 401;
    throw error;
  }
  return findOrdersByUserId(userId);
}

export async function getUserOrderById(userId, orderId) {
  if (!userId) {
    const error = new Error('Authentication required');
    error.statusCode = 401;
    throw error;
  }

  if (!orderId) {
    const error = new Error('Order ID is required');
    error.statusCode = 400;
    throw error;
  }

  const order = await findOrderById(orderId);

  // Security: Return 404 if order is missing or belongs to another user
  if (!order || order.userId !== userId) {
    const error = new Error(`Order with ID "${orderId}" was not found`);
    error.statusCode = 404;
    throw error;
  }

  return order;
}
