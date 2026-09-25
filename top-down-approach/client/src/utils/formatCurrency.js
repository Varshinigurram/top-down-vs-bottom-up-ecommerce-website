/**
 * INR currency display (presentation only; authoritative amounts come from the API).
 */
export function formatCurrency(amount) {
  const num = Number(amount || 0);
  if (!Number.isFinite(num)) return '₹0';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
}
