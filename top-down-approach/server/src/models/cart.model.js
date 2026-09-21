/**
 * Cart Domain Model Schema Definition
 */

export function createEmptyCart(userId) {
  return {
    id: `cart_${userId}`,
    userId: userId,
    items: [],
    totalItems: 0,
    subtotal: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

/**
 * Calculates item subtotals and overall cart subtotal / item count.
 */
export function calculateCartTotals(cart) {
  if (!cart || !Array.isArray(cart.items)) {
    return createEmptyCart(cart?.userId || 'unknown');
  }

  let totalItems = 0;
  let subtotal = 0;

  const calculatedItems = cart.items.map((item) => {
    const qty = Math.max(1, Number(item.quantity || 1));
    const price = Number(item.price || 0);
    const itemSubtotal = Math.round(price * qty * 100) / 100;

    totalItems += qty;
    subtotal += itemSubtotal;

    return {
      productId: item.productId,
      name: item.name || item.title || 'Product Item',
      price: price,
      image: item.image || item.icon || '📦',
      category: item.category || 'General',
      quantity: qty,
      subtotal: itemSubtotal
    };
  });

  return {
    id: cart.id,
    userId: cart.userId,
    items: calculatedItems,
    totalItems: totalItems,
    subtotal: Math.round(subtotal * 100) / 100,
    createdAt: cart.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}
