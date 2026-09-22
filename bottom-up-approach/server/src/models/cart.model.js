/**
 * Creates an empty Cart domain structure.
 */
export function createEmptyCart(userId) {
  const now = new Date().toISOString();
  return {
    id: `cart_${userId}`,
    userId: userId,
    items: [],
    totalItems: 0,
    subtotal: 0,
    createdAt: now,
    updatedAt: now
  };
}

/**
 * Creates a raw CartItem item primitive.
 */
export function createCartItem({ productId, name, price, image, category, quantity }) {
  const qty = Math.max(1, Number(quantity || 1));
  const unitPrice = Number(price || 0);
  return {
    productId: productId,
    name: name || 'Product Item',
    price: unitPrice,
    image: image || '📦',
    category: category || 'General',
    quantity: qty,
    subtotal: Math.round(unitPrice * qty * 100) / 100
  };
}
