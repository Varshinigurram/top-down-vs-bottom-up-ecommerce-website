/**
 * Client service API wrapper for Admin Product Management.
 */

const API_BASE_URL = '/api/admin/products';

export async function createAdminProduct(productData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(productData)
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to create product.');
  }

  return result.data;
}

export async function updateAdminProduct(id, productData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(productData)
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || `Failed to update product ${id}.`);
  }

  return result.data;
}

export async function deleteAdminProduct(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || `Failed to delete product ${id}.`);
  }

  return result;
}
