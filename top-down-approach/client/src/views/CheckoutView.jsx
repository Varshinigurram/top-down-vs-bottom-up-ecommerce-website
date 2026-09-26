import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CheckoutItem } from '../features/orders/CheckoutItem';
import { CheckoutSummary } from '../features/orders/CheckoutSummary';
import * as orderService from '../services/orderService';
import { formatCurrency } from '../utils/formatCurrency';

export function CheckoutView({ onNavigate }) {
  const { isAuthenticated } = useAuth();
  const { cart, refreshCart } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isAuthenticated) {
    return (
      <section className="cart-view-container">
        <header className="view-header">
          <h2>Order Checkout</h2>
          <p>Please log in to finalize your purchase.</p>
        </header>

        <div className="auth-form-card" style={{ textAlign: 'center' }}>
          <h3>Authentication Required</h3>
          <p className="auth-subtitle">Sign in to complete your checkout process.</p>
          <button className="btn-primary btn-block" onClick={() => onNavigate('login')}>
            Sign In to Checkout
          </button>
        </div>
      </section>
    );
  }

  // Order Success Screen
  if (completedOrder) {
    const formattedDate = new Date(completedOrder.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <section className="checkout-success-container">
        <div className="order-success-card">
          <div className="success-icon-badge">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p className="success-subtitle">
            Thank you for your order. Your transaction has been recorded in your order history.
          </p>

          <div className="success-details-box">
            <div className="success-detail-row">
              <span>Order Number:</span>
              <strong className="order-id-highlight">#{completedOrder.id}</strong>
            </div>
            <div className="success-detail-row">
              <span>Order Date:</span>
              <span>{formattedDate}</span>
            </div>
            <div className="success-detail-row">
              <span>Fulfillment Status:</span>
              <span className="status-pending-badge">{completedOrder.status}</span>
            </div>
            <div className="success-detail-row">
              <span>Total Paid:</span>
              <strong className="total-price-text">{formatCurrency(completedOrder.total)}</strong>
            </div>
          </div>

          <div className="success-actions-group">
            <button
              className="btn-primary"
              onClick={() => onNavigate('order-details', completedOrder.id)}
            >
              Inspect Order Details →
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('catalog')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  const hasItems = cart && Array.isArray(cart.items) && cart.items.length > 0;

  if (!hasItems) {
    return (
      <section className="cart-view-container">
        <header className="view-header">
          <h2>Order Checkout</h2>
          <p>Review items and authorize your order.</p>
        </header>

        <div className="alert-banner error">
          <h3>Cannot Checkout with Empty Cart</h3>
          <p>Please add products to your shopping cart before attempting to checkout.</p>
          <button className="btn-secondary" style={{ marginTop: '0.75rem' }} onClick={() => onNavigate('catalog')}>
            Explore Product Catalog
          </button>
        </div>
      </section>
    );
  }

  const handlePlaceOrder = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await orderService.createOrder();
      if (response.success && response.data) {
        setCompletedOrder(response.data);
        await refreshCart(); // Refresh cart state (will be empty)
      }
    } catch (err) {
      setError(err.message || 'Failed to process order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="cart-view-container">
      <header className="view-header">
        <div>
          <h2>Review & Place Order</h2>
          <p>One last look at your order before it is confirmed.</p>
        </div>
        <button className="btn-secondary" onClick={() => onNavigate('cart')}>
          ← Back to Cart
        </button>
      </header>

      {error && <div className="alert-banner error">{error}</div>}

      <div className="cart-layout-grid">
        <div className="cart-items-column">
          <div className="cart-item-list-card">
            <h3>Items to be Ordered ({cart.items.length})</h3>
            <div className="checkout-items-list">
              {cart.items.map((item) => (
                <CheckoutItem key={item.productId} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="cart-summary-column">
          <CheckoutSummary
            totalItems={cart.totalItems}
            subtotal={cart.subtotal}
            onPlaceOrder={handlePlaceOrder}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </section>
  );
}
