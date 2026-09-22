/**
 * Creates a raw Product domain entity primitive.
 */
export function createProductEntity({ id, name, description, price, category, image, stock, createdAt, updatedAt }) {
  const now = new Date().toISOString();
  return {
    id: id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: name ? String(name).trim() : '',
    title: name ? String(name).trim() : '', // Alias for title field compatibility
    description: description ? String(description).trim() : '',
    price: Number(price || 0),
    category: category ? String(category).trim() : 'General',
    image: image ? String(image).trim() : '📦',
    icon: image ? String(image).trim() : '📦', // Alias for icon field compatibility
    stock: Math.max(0, Number(stock || 0)),
    createdAt: createdAt || now,
    updatedAt: updatedAt || now
  };
}

/**
 * Formats product entity for standardized output.
 */
export function formatProduct(product) {
  if (!product) return null;
  return createProductEntity(product);
}
