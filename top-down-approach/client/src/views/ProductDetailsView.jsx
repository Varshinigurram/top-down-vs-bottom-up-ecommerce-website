import React, { useEffect, useState } from 'react';
import { getProductById } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

export function ProductDetailsView({ productId, onBackToCatalog, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [successBanner, setSuccessBanner] = useState('');

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

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      if (onNavigate) onNavigate('login');
      return;
    }

    try {
      setAddingToCart(true);
      setError(null);
      await addItem(product.id, quantity);
      setSuccessBanner(`Added ${quantity} unit(s) of "${product.name || product.title}" to your cart!`);
      setTimeout(() => setSuccessBanner(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to add item to cart.');
    } finally {
      setAddingToCart(false);
    }
  };

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

      {successBanner && (
        <div className="alert-banner success">
          ✨ {successBanner}{' '}
          <button className="btn-link" onClick={() => onNavigate && onNavigate('cart')}>
            View Cart →
          </button>
        </div>
      )}

      {error && <div className="alert-banner error">{error}</div>}

      <div className="product-details-card">
        <div className="product-details-visual">
          <div className="visual-preview-box">
            <img className="preview-emoji" src={product.image || product.icon || '/images/product-default.svg'} alt={product.name || product.title || 'Product'} />
          </div>
          <span className="visual-category-badge">{product.category}</span>
        </div>

        <div className="product-details-content">
          <header className="details-header">
            <span className="details-category-sub">{product.category}</span>
            <h1 className="details-title">{product.name || product.title}</h1>
            <div className="details-price-row">
              <span className="details-price">{formatCurrency(product.price)}</span>
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
            <div className="add-to-cart-controls">
              <div className="quantity-select-group">
                <label htmlFor="details-qty">Qty:</label>
                <select
                  id="details-qty"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  disabled={!inStock || addingToCart}
                >
                  {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn-primary btn-large btn-add-cart"
                onClick={handleAddToCart}
                disabled={!inStock || addingToCart}
              >
                {!isAuthenticated
                  ? 'Sign In to Add to Cart'
                  : addingToCart
                  ? 'Adding to Cart...'
                  : '🛒 Add to Cart'}
              </button>
            </div>
            {!isAuthenticated && (
              <p className="action-hint">
                ℹ️ You must be logged in to save items to your personal cart.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
