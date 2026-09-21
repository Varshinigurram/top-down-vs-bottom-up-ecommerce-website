/**
 * Client service API wrapper for Admin Order Management.
 */

const API_BASE_URL = '/api/admin/orders';

export async function fetchAdminOrders() {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
    credentials: 'include'
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch admin orders list.');
  }

  return result.data;
}

export async function fetchAdminOrderById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    credentials: 'include'
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || `Failed to fetch admin order details for order ${id}.`);
  }

  return result.data;
}

export async function updateAdminOrderStatus(id, status) {
  const response = await fetch(`${API_BASE_URL}/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ status })
  });

  const result = await response.json();
  if (!response.ok) {
    const error = new Error(result.message || `Failed to update order status.`);
    error.status = response.status;
    throw error;
  }

  return result.data;
}
