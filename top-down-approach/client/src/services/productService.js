const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Fetches product catalog with optional keyword search and category filters.
 */
export async function getProducts(search = '', category = 'All') {
  try {
    const params = new URLSearchParams();
    if (search && search.trim() !== '') params.append('search', search.trim());
    if (category && category.toLowerCase() !== 'all') params.append('category', category.trim());

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await fetch(`${API_BASE_URL}/products${queryString}`);

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.warn('[Top-Down Service] API query failed, using fallback dataset:', error.message);
    return getFallbackProducts(search, category);
  }
}

/**
 * Fetches details for a single product by ID.
 */
export async function getProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error(`Server returned status ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.warn('[Top-Down Service] API detail fetch failed, using fallback item:', error.message);
    const fallbackList = getFallbackProducts('', 'All');
    const match = fallbackList.find((p) => p.id === id || p.id === `prod_${id.replace('p', '10')}`);
    if (!match) throw new Error('Product not found');
    return match;
  }
}

function getFallbackProducts(search = '', category = 'All') {
  const fallback = [
    {
      id: 'prod_101',
      name: 'Wireless Ergonomic Noise-Canceling Headset',
      title: 'Wireless Ergonomic Noise-Canceling Headset',
      price: 99.99,
      description: 'High-fidelity audio with active noise cancellation, dual microphones, and 30-hour battery life.',
      category: 'Electronics',
      image: '🎧',
      icon: '🎧',
      stock: 15
    },
    {
      id: 'prod_102',
      name: 'Tactile RGB Mechanical Keyboard',
      title: 'Tactile RGB Mechanical Keyboard',
      price: 129.50,
      description: 'Customizable mechanical gaming keyboard featuring hot-swappable switches and aluminum top casing.',
      category: 'Electronics',
      image: '⌨️',
      icon: '⌨️',
      stock: 8
    },
    {
      id: 'prod_103',
      name: 'Smart Health & Fitness Tracker Watch',
      title: 'Smart Health & Fitness Tracker Watch',
      price: 149.00,
      description: 'Waterproof smartwatch with continuous heart rate monitoring, SpO2 tracking, and sleep analysis.',
      category: 'Electronics',
      image: '⌚',
      icon: '⌚',
      stock: 22
    },
    {
      id: 'prod_105',
      name: 'Ultra-Wide Stitched Desk Mat Pad',
      title: 'Ultra-Wide Stitched Desk Mat Pad',
      price: 24.99,
      description: 'Minimalist desk pad made from premium micro-weave cloth with reinforced anti-fray stitched edges.',
      category: 'Accessories',
      image: '🖼️',
      icon: '🖼️',
      stock: 50
    },
    {
      id: 'prod_106',
      name: 'Minimalist Leather Slim Cardholder',
      title: 'Minimalist Leather Slim Cardholder',
      price: 34.50,
      description: 'Handcrafted full-grain leather wallet equipped with RFID-blocking technology.',
      category: 'Fashion',
      image: '👛',
      icon: '👛',
      stock: 18
    },
    {
      id: 'prod_108',
      name: 'Modern Ambient LED Desk Lamp',
      title: 'Modern Ambient LED Desk Lamp',
      price: 59.95,
      description: 'Dimmable architectural desk lamp with adjustable color temperatures and wireless charging pad.',
      category: 'Home',
      image: '💡',
      icon: '💡',
      stock: 12
    }
  ];

  return fallback.filter((p) => {
    const matchesCategory = category.toLowerCase() === 'all' || p.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}
