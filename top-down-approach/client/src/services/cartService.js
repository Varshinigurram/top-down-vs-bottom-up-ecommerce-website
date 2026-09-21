const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Helper for authenticated cart API requests.
 */
async function cartRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include' // Ensures HTTP-only auth token cookie is sent
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || data.error || `Cart API error ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return data;
}

/**
 * Client cart service API methods
 */
export async function fetchCart() {
  return cartRequest('/cart', 'GET');
}

export async function addToCart(productId, quantity = 1) {
  return cartRequest('/cart/items', 'POST', { productId, quantity });
}

export async function updateCartQuantity(productId, quantity) {
  return cartRequest(`/cart/items/${productId}`, 'PUT', { quantity });
}

export async function removeCartItem(productId) {
  return cartRequest(`/cart/items/${productId}`, 'DELETE');
}

export async function clearCart() {
  return cartRequest('/cart', 'DELETE');
}
