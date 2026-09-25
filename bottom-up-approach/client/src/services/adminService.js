import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from './apiClient';

/**
 * Client Admin Service
 * (Consumes apiClient primitives)
 */

export function getAdminDashboardApi() {
  return apiGet('/admin/dashboard');
}

export function createProductApi(productData) {
  return apiPost('/admin/products', productData);
}

export function updateProductApi(id, productData) {
  return apiPut(`/admin/products/${id}`, productData);
}

export function deleteProductApi(id) {
  return apiDelete(`/admin/products/${id}`);
}

export function getAllOrdersAdminApi() {
  return apiGet('/admin/orders');
}

export function getOrderByIdAdminApi(id) {
  return apiGet(`/admin/orders/${id}`);
}

export function updateOrderStatusAdminApi(id, status) {
  return apiPatch(`/admin/orders/${id}/status`, { status });
}
