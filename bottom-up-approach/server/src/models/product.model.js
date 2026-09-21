/**
 * Bottom-Up Architecture: Primitive Data Model & Validation Layer (Ready for MongoDB integration)
 */

const placeholderProducts = [
  {
    id: 'p1',
    title: 'Wireless Ergonomic Headset',
    price: 99.99,
    description: 'High-fidelity audio with active noise cancellation for professional use.',
    category: 'Electronics',
    icon: '🎧',
    stock: 15
  },
  {
    id: 'p2',
    title: 'Mechanical Gaming Keyboard',
    price: 129.50,
    description: 'Tactile switches with customizable RGB backlighting and durable chassis.',
    category: 'Electronics',
    icon: '⌨️',
    stock: 8
  },
  {
    id: 'p3',
    title: 'Smart Fitness Watch',
    price: 149.00,
    description: 'Tracks heart rate, sleep metrics, and workout performance continuously.',
    category: 'Wearables',
    icon: '⌚',
    stock: 22
  },
  {
    id: 'p4',
    title: 'Ultra-Wide Desk Pad',
    price: 24.99,
    description: 'Smooth microfiber surface with stitched edges and non-slip rubber base.',
    category: 'Accessories',
    icon: '🖼️',
    stock: 50
  }
];

export function validateProductData(product) {
  if (!product.title || typeof product.price !== 'number') {
    return { valid: false, message: 'Invalid product schema' };
  }
  return { valid: true };
}

export function getAllProductsPrimitive() {
  return placeholderProducts;
}

export function getProductByIdPrimitive(id) {
  return placeholderProducts.find((p) => p.id === id) || null;
}
