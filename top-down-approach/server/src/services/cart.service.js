import { findCartByUserId, saveCart, deleteCartByUserId } from '../repositories/cart.repository.js';
import { findProductById } from '../repositories/product.repository.js';

/**
 * Business Service Layer for Cart Operations
 */

export async function getUserCart(userId) {
  if (!userId) {
    const error = new Error('User ID is required');
    error.statusCode = 401;
    throw error;
  }
  return findCartByUserId(userId);
}

export async function addItemToCart(userId, { productId, quantity = 1 }) {
  if (!userId) {
    const error = new Error('Authentication required');
    error.statusCode = 401;
    throw error;
  }

  if (!productId) {
    const error = new Error('Product ID is required');
    error.statusCode = 400;
    throw error;
  }

  const qty = Number(quantity);
  if (isNaN(qty) || qty <= 0 || !Number.isInteger(qty)) {
    const error = new Error('Quantity must be a positive integer');
    error.statusCode = 400;
    throw error;
  }

  // Authoritative product lookup
  const product = await findProductById(productId);
  if (!product) {
    const error = new Error(`Product with ID "${productId}" not found`);
    error.statusCode = 404;
    throw error;
  }

  const cart = await findCartByUserId(userId);
  const existingItemIndex = cart.items.findIndex((item) => item.productId === product.id);

  let proposedQuantity = qty;
  if (existingItemIndex > -1) {
    proposedQuantity += cart.items[existingItemIndex].quantity;
  }

  // Stock limit validation
  if (proposedQuantity > product.stock) {
    const error = new Error(`Cannot add items. Requested total (${proposedQuantity}) exceeds available stock (${product.stock})`);
    error.statusCode = 409; // Conflict
    throw error;
  }

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity = proposedQuantity;
  } else {
    cart.items.push({
      productId: product.id,
      name: product.name,
      price: product.price, // Authoritative price from repository
      image: product.image,
      category: product.category,
      quantity: qty
    });
  }

  return saveCart(cart);
}

export async function updateCartItemQuantity(userId, productId, quantity) {
  if (!userId) {
    const error = new Error('Authentication required');
    error.statusCode = 401;
    throw error;
  }

  const qty = Number(quantity);
  if (isNaN(qty) || qty <= 0 || !Number.isInteger(qty)) {
    const error = new Error('Quantity must be a positive integer greater than zero');
    error.statusCode = 400;
    throw error;
  }

  const product = await findProductById(productId);
  if (!product) {
    const error = new Error(`Product not found`);
    error.statusCode = 404;
    throw error;
  }

  if (qty > product.stock) {
    const error = new Error(`Requested quantity (${qty}) exceeds available stock (${product.stock})`);
    error.statusCode = 409; // Conflict
    throw error;
  }

  const cart = await findCartByUserId(userId);
  const itemIndex = cart.items.findIndex((item) => item.productId === product.id);

  if (itemIndex === -1) {
    const error = new Error('Item is not present in your cart');
    error.statusCode = 404;
    throw error;
  }

  cart.items[itemIndex].quantity = qty;
  cart.items[itemIndex].price = product.price; // Ensure price integrity

  return saveCart(cart);
}

export async function removeCartItem(userId, productId) {
  if (!userId) {
    const error = new Error('Authentication required');
    error.statusCode = 401;
    throw error;
  }

  const cart = await findCartByUserId(userId);
  cart.items = cart.items.filter((item) => item.productId !== productId && item.productId !== `prod_${productId.replace('p', '10')}`);

  return saveCart(cart);
}

export async function clearUserCart(userId) {
  if (!userId) {
    const error = new Error('Authentication required');
    error.statusCode = 401;
    throw error;
  }
  return deleteCartByUserId(userId);
}
