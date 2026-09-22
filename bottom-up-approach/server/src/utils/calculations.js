/**
 * Pure Business Calculation Utilities
 * (Deterministic, zero HTTP dependencies, reusable building block)
 */

export function calculateItemSubtotal(quantity, unitPrice) {
  const qty = Math.max(0, Number(quantity || 0));
  const price = Math.max(0, Number(unitPrice || 0));
  return Math.round(qty * price * 100) / 100;
}

export function calculateCartSubtotal(items = []) {
  if (!Array.isArray(items)) return 0;
  const rawSubtotal = items.reduce((sum, item) => {
    const qty = Number(item.quantity || 1);
    const price = Number(item.unitPrice || item.price || 0);
    return sum + (qty * price);
  }, 0);
  return Math.round(rawSubtotal * 100) / 100;
}

export function calculateShipping(subtotal) {
  // Free shipping policy for standard case study baseline
  return 0;
}

export function calculateTax(subtotal) {
  const sub = Math.max(0, Number(subtotal || 0));
  return Math.round(sub * 0.08 * 100) / 100;
}

export function calculateOrderTotal(subtotal, shipping = 0, tax = 0) {
  const sub = Math.max(0, Number(subtotal || 0));
  const ship = Math.max(0, Number(shipping || 0));
  const tx = Math.max(0, Number(tax || 0));
  return Math.round((sub + ship + tx) * 100) / 100;
}
