import React from 'react';
import { Button } from '../primitives/Button';
import { ProductBadge } from './ProductBadge';
import { ProductPrice } from './ProductPrice';
import { ProductStockIndicator } from './ProductStockIndicator';

export function ProductCard({ product, onAddToCart, onViewDetails }) {
  if (!product) return null;

  const isOutOfStock = Number(product.stock || 0) <= 0;

  return (
    <div className="ui-card product-card">
      <div className="product-card-top" onClick={() => onViewDetails && onViewDetails(product.id)}>
        <div className="product-image-placeholder">{product.image || product.icon || '📦'}</div>
        <div className="product-meta-row">
          <ProductBadge category={product.category} />
          <ProductStockIndicator stock={product.stock} />
        </div>
        <h3 className="product-title">{product.name || product.title}</h3>
        <p className="product-description">{product.description}</p>
      </div>

      <div className="product-footer">
        <ProductPrice price={product.price} />
        <Button
          variant="primary"
          size="sm"
          disabled={isOutOfStock}
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          🛒 {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}
