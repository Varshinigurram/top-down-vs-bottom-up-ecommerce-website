const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * Helper for authenticated order API requests.
 */
async function orderRequest(endpoint, method = 'GET', body = null) {
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
    const error = new Error(data.message || data.error || `Order API error ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return data;
}

/**
 * Client Order Service Methods
 */
export async function createOrder() {
  return orderRequest('/orders', 'POST');
}

export async function fetchOrders() {
  return orderRequest('/orders', 'GET');
}

export async function fetchOrderById(id) {
  return orderRequest(`/orders/${id}`, 'GET');
}
