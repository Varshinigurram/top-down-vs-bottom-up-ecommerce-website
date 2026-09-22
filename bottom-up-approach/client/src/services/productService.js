import { apiGet } from './apiClient';

/**
 * Client Product Service
 * (Consumes apiClient primitive)
 */

export function getProductsApi(search = '', category = 'All') {
  const params = new URLSearchParams();
  if (search && search.trim() !== '') params.append('search', search.trim());
  if (category && category.toLowerCase() !== 'all') params.append('category', category.trim());

  const queryString = params.toString() ? `?${params.toString()}` : '';
  return apiGet(`/products${queryString}`);
}

export function getProductByIdApi(id) {
  return apiGet(`/products/${id}`);
}
