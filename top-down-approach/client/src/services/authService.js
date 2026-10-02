/**
 * Top-Down Authentication Client Service
 * Uses relative /api path so Vite proxy routes to the Express server.
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include' // Required: sends HTTP-only cookie with every request
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`/api${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || `HTTP error ${response.status}`);
  }

  return data;
}

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
