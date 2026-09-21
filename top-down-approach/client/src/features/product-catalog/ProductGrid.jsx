import React from 'react';
import { ProductItem } from './ProductItem';

export function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <p>No products available in the catalog.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
