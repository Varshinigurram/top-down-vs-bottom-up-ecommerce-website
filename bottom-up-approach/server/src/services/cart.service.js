import { findCartByUserId, saveCart, deleteCartByUserId } from '../repositories/cart.repository.js';
import { findProductById } from '../repositories/product.repository.js';
import { validateCartItemInput } from '../validators/cart.validator.js';
import { createCartItem } from '../models/cart.model.js';

/**
 * Reusable Backend Cart Service
 * (Independent of Express req/res objects)
 */

export async function getUserCartService(userId) {
  if (!userId) {
    const error = new Error('Authentication required.');
    error.statusCode = 401;
    throw error;
  }
  return await findCartByUserId(userId);
}

export async function addItemToCartService(userId, { productId, quantity = 1 }) {
  if (!userId) {
    const error = new Error('Authentication required.');
    error.statusCode = 401;
    throw error;
  }

  const product = await findProductById(productId);
  if (!product) {
    const error = new Error(`Product with ID '${productId}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  const cart = await findCartByUserId(userId);
  const existingItem = cart.items.find((item) => item.productId === product.id);
  const proposedQty = existingItem ? existingItem.quantity + Number(quantity) : Number(quantity);

  const validation = validateCartItemInput(productId, proposedQty, product.stock);
  if (!validation.isValid) {
    const error = new Error(validation.errors.join(' '));
    error.statusCode = 409; // Conflict (stock limit) or 400
    throw error;
  }

  if (existingItem) {
    existingItem.quantity = proposedQty;
    existingItem.price = product.price; // Authoritative price update
    existingItem.subtotal = Math.round(existingItem.quantity * existingItem.price * 100) / 100;
  } else {
    cart.items.push(
      createCartItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: proposedQty
      })
    );
  }

  return await saveCart(cart);
}

export async function updateCartItemQuantityService(userId, productId, quantity) {
  if (!userId) {
    const error = new Error('Authentication required.');
    error.statusCode = 401;
    throw error;
  }

  const product = await findProductById(productId);
  if (!product) {
    const error = new Error(`Product not found.`);
    error.statusCode = 404;
    throw error;
  }

  const validation = validateCartItemInput(productId, quantity, product.stock);
  if (!validation.isValid) {
    const error = new Error(validation.errors.join(' '));
    error.statusCode = 409;
    throw error;
  }

  const cart = await findCartByUserId(userId);
  const itemIndex = cart.items.findIndex((i) => i.productId === product.id);
  if (itemIndex === -1) {
    const error = new Error('Item is not present in your cart.');
    error.statusCode = 404;
    throw error;
  }

  cart.items[itemIndex].quantity = Number(quantity);
  cart.items[itemIndex].price = product.price;
  cart.items[itemIndex].subtotal = Math.round(cart.items[itemIndex].quantity * cart.items[itemIndex].price * 100) / 100;

  return await saveCart(cart);
}

export async function removeCartItemService(userId, productId) {
  if (!userId) {
    const error = new Error('Authentication required.');
    error.statusCode = 401;
    throw error;
  }

  const cart = await findCartByUserId(userId);
  cart.items = cart.items.filter((i) => i.productId !== productId && i.productId !== `prod_${productId.replace('p', '10')}`);
  return await saveCart(cart);
}

export async function clearUserCartService(userId) {
  if (!userId) {
    const error = new Error('Authentication required.');
    error.statusCode = 401;
    throw error;
  }
  return await deleteCartByUserId(userId);
}
