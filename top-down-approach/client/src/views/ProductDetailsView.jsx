import React, { useEffect, useState } from 'react';
import { getProductById } from '../services/productService';

export function ProductDetailsView({ productId, onBackToCatalog }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setError('Invalid product selection.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getProductById(productId)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load product details.');
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <div className="product-details-container">
        <button className="btn-back" onClick={onBackToCatalog}>← Back to Catalog</button>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-container">
        <button className="btn-back" onClick={onBackToCatalog}>← Back to Catalog</button>
        <div className="alert-banner error">
          <h3>Product Not Found</h3>
          <p>{error || 'The requested product could not be located in our inventory catalog.'}</p>
        </div>
      </div>
    );
  }

  const inStock = product.stock > 0;

  return (
    <section className="product-details-container">
      <nav className="details-breadcrumb">
        <button className="btn-back" onClick={onBackToCatalog}>
          ← Back to Catalog
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-category">{product.category}</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.name || product.title}</span>
      </nav>

      <div className="product-details-card">
        <div className="product-details-visual">
          <div className="visual-preview-box">
            <span className="preview-emoji">{product.image || product.icon || '📦'}</span>
          </div>
          <span className="visual-category-badge">{product.category}</span>
        </div>

        <div className="product-details-content">
          <header className="details-header">
            <span className="details-category-sub">{product.category}</span>
            <h1 className="details-title">{product.name || product.title}</h1>
            <div className="details-price-row">
              <span className="details-price">${Number(product.price).toFixed(2)}</span>
              <span className={`details-stock-badge ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                {inStock ? `In Stock (${product.stock} units)` : 'Currently Out of Stock'}
              </span>
            </div>
          </header>

          <div className="details-description-section">
            <h3>Product Overview</h3>
            <p className="details-description">{product.description}</p>
          </div>

          <div className="details-specifications">
            <h3>Specifications & Metadata</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Item SKU / ID:</span>
                <span className="spec-value">{product.id}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Category:</span>
                <span className="spec-value">{product.category}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Availability:</span>
                <span className="spec-value">{inStock ? 'Ready to Ship' : 'Backorder'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Shipping:</span>
                <span className="spec-value">Standard Express Delivery</span>
              </div>
            </div>
          </div>

          <div className="details-action-box">
            <button className="btn-primary btn-large btn-disabled-notice" disabled>
              Add to Cart (Coming in Phase 5)
            </button>
            <p className="action-hint">
              ℹ️ Shopping cart integration will be activated in the next development phase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
