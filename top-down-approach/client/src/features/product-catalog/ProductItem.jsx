import React from 'react';

export function ProductItem({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-placeholder">
        {product.icon || '📦'}
      </div>
      <div>
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
      </div>
      <div className="product-footer">
        <span className="product-price">${product.price.toFixed(2)}</span>
        <button className="btn-primary">Add to Cart</button>
      </div>
    </div>
  );
}
