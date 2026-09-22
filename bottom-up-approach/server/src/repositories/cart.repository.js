import { createEmptyCart } from '../models/cart.model.js';
import { calculateCartSubtotal } from '../utils/calculations.js';

const carts = new Map();

function formatCartEntity(cart) {
  if (!cart) return null;
  const items = Array.isArray(cart.items) ? cart.items : [];
  const subtotal = calculateCartSubtotal(items);
  const totalItems = items.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0);

  return {
    id: cart.id || `cart_${cart.userId}`,
    userId: cart.userId,
    items,
    totalItems,
    subtotal,
    createdAt: cart.createdAt || new Date().toISOString(),
    updatedAt: cart.updatedAt || new Date().toISOString()
  };
}

export async function findCartByUserId(userId) {
  if (!userId) return Promise.resolve(null);
  if (!carts.has(userId)) {
    carts.set(userId, createEmptyCart(userId));
  }
  return Promise.resolve(formatCartEntity(carts.get(userId)));
}

export async function saveCart(cart) {
  if (!cart || !cart.userId) return Promise.resolve(null);
  const formatted = formatCartEntity({ ...cart, updatedAt: new Date().toISOString() });
  carts.set(cart.userId, formatted);
  return Promise.resolve(formatted);
}

export async function deleteCartByUserId(userId) {
  if (!userId) return Promise.resolve(false);
  const empty = createEmptyCart(userId);
  carts.set(userId, empty);
  return Promise.resolve(empty);
}
