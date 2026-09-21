import React from 'react';

export function ProductItem({ product, onViewDetails }) {
  const inStock = product.stock > 0;

  return (
    <div className="product-card" onClick={() => onViewDetails && onViewDetails(product.id)}>
      <div className="product-image-container">
        <span className="product-image-emoji">{product.image || product.icon || '📦'}</span>
        <span className="product-category-tag">{product.category}</span>
      </div>

      <div className="product-card-body">
        <h3 className="product-title">{product.name || product.title}</h3>
        <p className="product-description-snippet">{product.description}</p>
      </div>

      <div className="product-card-footer">
        <div className="price-and-stock">
          <span className="product-price">${Number(product.price).toFixed(2)}</span>
          <span className={`stock-status ${inStock ? 'in-stock' : 'out-of-stock'}`}>
            {inStock ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
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
  );
}
