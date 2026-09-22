import React from 'react';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../primitives/FeedbackStates';

export function ProductGrid({ products = [], onAddToCart, onViewDetails }) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No Products Found"
        message="No products match your current search and filter criteria."
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
