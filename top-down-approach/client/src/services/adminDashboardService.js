/**
 * Client service API wrapper for Admin Dashboard statistics.
 */

export async function fetchDashboardStats() {
  const response = await fetch('/api/admin/dashboard', {
    method: 'GET',
    credentials: 'include'
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch dashboard statistics.');
  }

  return result.data;
}
