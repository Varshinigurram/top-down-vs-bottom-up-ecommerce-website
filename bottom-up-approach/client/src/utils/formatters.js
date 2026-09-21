/**
 * Bottom-Up Primitive Utility: Pure formatting functions
 */

export function formatCurrency(amount) {
  if (typeof amount !== 'number') return '$0.00';
  return `$${amount.toFixed(2)}`;
}

export function formatCategory(category) {
  if (!category) return 'GENERAL';
  return String(category).toUpperCase();
}
