import { apiGet, apiPost } from './apiClient';

/**
 * Client Authentication Service
 * (Consumes apiClient primitive)
 */

export function registerApi(userData) {
  return apiPost('/auth/register', userData);
}

export function loginApi(credentials) {
  return apiPost('/auth/login', credentials);
}

export function logoutApi() {
  return apiPost('/auth/logout');
}

export function getCurrentUserApi() {
  return apiGet('/auth/me');
}
