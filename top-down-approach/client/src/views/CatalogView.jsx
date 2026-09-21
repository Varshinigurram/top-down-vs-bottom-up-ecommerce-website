import React, { useEffect, useState } from 'react';
import { ProductGrid } from '../features/product-catalog/ProductGrid';
import { getProducts } from '../services/productService';

export function CatalogView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="catalog-view">
      <header className="view-header">
        <h2>Product Catalog</h2>
        <p>Top-Down View: System specs decompose into high-level catalog screen, delegating to feature grid modules and API services.</p>
      </header>

      <div className="status-banner">
        <strong>Design Pattern Note:</strong> This view was designed Top-Down starting from system-level user goals down to services and data interfaces.
      </div>

      {loading && <p>Loading product catalog...</p>}
      {error && <p style={{ color: 'red' }}>Error loading products: {error}</p>}
      {!loading && !error && <ProductGrid products={products} />}
    </section>
  );
}
