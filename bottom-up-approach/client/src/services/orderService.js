import { apiGet, apiPost } from './apiClient';

/**
 * Client Order Service
 * (Consumes apiClient primitive)
 */

export function createOrderApi() {
  return apiPost('/orders');
}

export function getUserOrdersApi() {
  return apiGet('/orders');
}

export function getOrderByIdApi(id) {
  return apiGet(`/orders/${id}`);
}
