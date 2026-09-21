const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Helper wrapper for fetch requests with JSON headers and cookie credentials.
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include' // Ensures HTTP-only cookies are included
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || `HTTP error ${response.status}`);
  }

  return data;
}

/**
 * Client authentication service methods
 */
export async function register(userData) {
  return apiRequest('/auth/register', 'POST', userData);
}

export async function login(credentials) {
  return apiRequest('/auth/login', 'POST', credentials);
}

export async function logout() {
  return apiRequest('/auth/logout', 'POST');
}

export async function getCurrentUser() {
  return apiRequest('/auth/me', 'GET');
}
