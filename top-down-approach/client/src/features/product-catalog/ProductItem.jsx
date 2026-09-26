import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

export function ProductItem({ product, onViewDetails, onAddToCart }) {
  const inStock = product.stock > 0;

  return (
    <div className="product-card" onClick={() => onViewDetails && onViewDetails(product.id)}>
      <div className="product-image-container">
        <img className="product-image-emoji" src={product.image || product.icon || '/images/product-default.svg'} alt="" />
        <span className="product-category-tag">{product.category}</span>
      </div>

      <div className="product-card-body">
        <h3 className="product-title">{product.name || product.title}</h3>
        <p className="product-description-snippet">{product.description}</p>
      </div>

      <div className="product-card-footer">
        <div className="price-and-stock">
          <span className="product-price">{formatCurrency(product.price)}</span>
          <span className={`stock-status ${inStock ? 'in-stock' : 'out-of-stock'}`}>
            {inStock ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <div className="product-card-actions">
          <button
            className="btn-secondary btn-sm"
            disabled={!inStock}
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart(product);
            }}
          >
            {inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
          <button
            className="btn-details-action"
            onClick={(e) => {
              e.stopPropagation();
              if (onViewDetails) onViewDetails(product.id);
            }}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
