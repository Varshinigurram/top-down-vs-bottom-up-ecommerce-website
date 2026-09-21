import { createEmptyCart, calculateCartTotals } from '../models/cart.model.js';

// In-Memory Cart Store: Map of userId -> cart object
const carts = new Map();

/**
 * Finds user cart by userId. Returns empty cart structure if not found.
 */
export async function findCartByUserId(userId) {
  if (!userId) return Promise.resolve(null);

  if (!carts.has(userId)) {
    const newCart = createEmptyCart(userId);
    carts.set(userId, newCart);
  }

  const existingCart = carts.get(userId);
  return Promise.resolve(calculateCartTotals(existingCart));
}

/**
 * Persists updated user cart entity.
 */
export async function saveCart(cart) {
  if (!cart || !cart.userId) return Promise.resolve(null);

  const updatedCart = {
    ...cart,
    updatedAt: new Date().toISOString()
  };

  const calculated = calculateCartTotals(updatedCart);
  carts.set(cart.userId, calculated);
  return Promise.resolve(calculated);
}

/**
 * Deletes / clears user cart by userId.
 */
export async function deleteCartByUserId(userId) {
  if (!userId) return Promise.resolve(false);

  const emptyCart = createEmptyCart(userId);
  carts.set(userId, emptyCart);
  return Promise.resolve(emptyCart);
}
