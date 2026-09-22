import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';

/**
 * Client Cart Service
 * (Consumes apiClient primitive)
 */

export function getCartApi() {
  return apiGet('/cart');
}

export function addToCartApi(productId, quantity = 1) {
  return apiPost('/cart/items', { productId, quantity });
}

export function updateCartItemApi(productId, quantity) {
  return apiPut(`/cart/items/${productId}`, { quantity });
}

export function removeCartItemApi(productId) {
  return apiDelete(`/cart/items/${productId}`);
}

export function clearCartApi() {
  return apiDelete('/cart');
}
