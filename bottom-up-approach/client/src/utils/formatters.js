/**
 * Pure Frontend Formatting Utilities
 */

export function formatCurrency(amount) {
  const num = Number(amount || 0);
  return `\$${num.toFixed(2)}`;
}

export function formatDate(dateString, options = {}) {
  if (!dateString) return 'N/A';
  try {
    const defaultOptions = { dateStyle: 'medium', timeStyle: 'short' };
    return new Date(dateString).toLocaleString('en-US', { ...defaultOptions, ...options });
  } catch (err) {
    return String(dateString);
  }
}

export function formatCategory(category) {
  if (!category) return 'General';
  return String(category).trim();
}

