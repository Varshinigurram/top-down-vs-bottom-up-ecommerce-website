import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addToCartApi } from '../../services/cartService';
import { Button } from '../../components/primitives/Button';
import { QuantityControl } from '../../components/primitives/QuantityControl';
import { ProductBadge } from '../../components/composite/ProductBadge';
import { ProductPrice } from '../../components/composite/ProductPrice';
import { ProductStockIndicator } from '../../components/composite/ProductStockIndicator';
import { ErrorState } from '../../components/primitives/FeedbackStates';

export function ProductDetailsContent({ product, onNavigate, onCartUpdated }) {
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [cartError, setCartError] = useState(null);

  if (!product) return null;

  const isOutOfStock = Number(product.stock || 0) <= 0;

  const handleAddToCart = async () => {
    setCartError(null);
    setCartSuccess(false);

    if (!isAuthenticated) {
      setCartError('Please sign in to add items to your shopping cart.');
      return;
    }

    setAdding(true);
    try {
      await addToCartApi(product.id, quantity);
      setCartSuccess(true);
      if (onCartUpdated) onCartUpdated();
      setTimeout(() => setCartSuccess(false), 4000);
    } catch (err) {
      setCartError(err.message || 'Failed to add product to cart.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="product-details-content-feature">
      <div className="details-grid">
        <div className="details-media">
          <div className="product-image-large">{product.image || '📦'}</div>
        </div>

        <div className="details-info">
          <div className="details-header-row">
            <ProductBadge category={product.category} />
            <ProductStockIndicator stock={product.stock} />
          </div>

          <h1 className="details-title">{product.name}</h1>
          <p className="details-sku">Product ID: {product.id}</p>

          <div className="details-price-row">
            <ProductPrice price={product.price} />
          </div>

          <div className="details-description">
            <h3>Product Overview</h3>
            <p>{product.description}</p>
          </div>

          {!isOutOfStock && (
            <div className="details-quantity-row">
              <label htmlFor="product-quantity-select">Quantity:</label>
              <QuantityControl
                quantity={quantity}
                maxStock={product.stock}
                onChange={setQuantity}
                disabled={adding}
              />
            </div>
          )}

          {cartError && (
            <ErrorState
              title="Cart Action Failed"
              message={cartError}
            />
          )}

          {cartSuccess && (
            <div className="alert-banner alert-success">
              ✓ Successfully added {quantity} x "{product.name}" to your cart!
            </div>
          )}

          <div className="details-actions-row">
            <Button
              variant="primary"
              size="lg"
              disabled={isOutOfStock || adding}
              onClick={handleAddToCart}
            >
              🛒 {adding ? 'Adding to Cart...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>

          {!isAuthenticated && (
            <p className="auth-prompt-hint">
              <small>
                Note: You must{' '}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => onNavigate && onNavigate('login')}
                >
                  login
                </button>{' '}
                to manage your shopping cart.
              </small>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
