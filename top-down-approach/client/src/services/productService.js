// Top-Down API Service Layer: Defined from high-level system requirements down to HTTP requests

const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Fetch product catalog for the Top-Down Catalog View.
 */
export async function getProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.warn('[Top-Down Service] Backend offline, using placeholder products contract:', error.message);
    return getFallbackProducts();
  }
}

/**
 * Fallback domain mock data matching the top-down API contract requirement.
 */
function getFallbackProducts() {
  return [
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
}
