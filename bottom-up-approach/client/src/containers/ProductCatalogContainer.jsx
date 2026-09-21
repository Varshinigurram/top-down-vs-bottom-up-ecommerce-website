import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components/composite/ProductCard';

const API_BASE_URL = 'http://localhost:5002/api';

/**
 * Bottom-Up Container: Assembles composite ProductCard components into a product catalog grid
 */
export function ProductCatalogContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('[Bottom-Up Container] Server offline, using local fallback dataset:', err.message);
        setProducts(getFallbackProducts());
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    console.log('[Bottom-Up Container] Item added to cart primitive:', product.title);
  };

  if (loading) return <p>Loading catalog items...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
}

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
