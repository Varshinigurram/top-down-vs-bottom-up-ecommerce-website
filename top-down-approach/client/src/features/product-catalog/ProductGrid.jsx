import React from 'react';
import { ProductItem } from './ProductItem';

export function ProductGrid({ products, onViewDetails }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
}
