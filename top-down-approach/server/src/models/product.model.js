/**
 * Product Domain Model Schema Definition
 */

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Home',
  'Fashion',
  'Accessories',
  'Lifestyle'
];

/**
 * Validates and formats product data object.
 */
export function validateProductSchema(product) {
  if (!product || !product.name || typeof product.price !== 'number') {
    return { valid: false, message: 'Invalid product schema attributes' };
  }
  return { valid: true };
}

/**
 * Formats product entity for API response standardization.
 */
export function formatProductEntity(product) {
  if (!product) return null;
  return {
    id: product.id,
    name: product.name,
    title: product.name, // Title alias for backwards interface compatibility
    description: product.description || '',
    price: Number(product.price),
    category: product.category || 'General',
    image: product.image || '📦',
    icon: product.image || '📦',
    stock: Number(product.stock || 0),
    createdAt: product.createdAt || new Date().toISOString(),
    updatedAt: product.updatedAt || new Date().toISOString()
  };
}
