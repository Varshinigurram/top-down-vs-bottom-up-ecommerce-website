/**
 * Low-Level Base API Communication Primitive
 * (Standard HTTP fetch wrapper with normalized error handling)
 */

const API_BASE_URL = '/api';

export async function httpRequest(endpoint, options = {}) {
  const url = endpoint.startsWith('/') ? `${API_BASE_URL}${endpoint}` : `${API_BASE_URL}/${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const config = {
    method: options.method || 'GET',
    headers: defaultHeaders,
    credentials: 'include',
    ...options
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  let responseData = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.toLowerCase().includes('application/json')) {
    try {
      responseData = await response.json();
    } catch (e) {
      responseData = null;
    }
  }

  if (!response.ok) {
    const message = responseData?.message || responseData?.error || `HTTP request failed with status ${response.status}`;
    const error = new Error(message);
    error.statusCode = response.status;
    error.data = responseData;
    throw error;
  }

  return responseData;
}

export function apiGet(endpoint, options) {
  return httpRequest(endpoint, { ...options, method: 'GET' });
}

export function apiPost(endpoint, body, options) {
  return httpRequest(endpoint, { ...options, method: 'POST', body });
}

export function apiPut(endpoint, body, options) {
  return httpRequest(endpoint, { ...options, method: 'PUT', body });
}

export function apiDelete(endpoint, options) {
  return httpRequest(endpoint, { ...options, method: 'DELETE' });
}
