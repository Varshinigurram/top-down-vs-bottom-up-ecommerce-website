import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCartApi } from '../services/cartService';
import { createOrderApi } from '../services/orderService';
import { CheckoutSummary } from '../features/checkout/CheckoutSummary';
import { Button } from '../components/primitives/Button';
import { LoadingState, ErrorState, EmptyState } from '../components/primitives/FeedbackStates';

export function CheckoutView({ onNavigate, onOrderPlaced }) {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    fetchCart();
  }, [isAuthenticated]);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCartApi();
      const cartData = res?.data || res;
      setCart(cartData);
    } catch (err) {
      setError(err.message || 'Failed to load cart for checkout.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async () => {
    // Duplicate-checkout protection: prevent multiple simultaneous submissions
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await createOrderApi();
      const newOrder = res?.data || res;
      if (onOrderPlaced) onOrderPlaced();
      
      // Navigate to Order Details for the placed order
      if (onNavigate && newOrder && newOrder.id) {
        onNavigate('order-details', newOrder.id);
      } else if (onNavigate) {
        onNavigate('orders');
      }
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
      setSubmitting(false); // Re-enable submission only on error
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="view-container checkout-view">
        <ErrorState
          title="Authentication Required"
          message="You must be signed in to checkout and place orders."
        />
        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => onNavigate && onNavigate('login')}>
            Sign In to Checkout
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="view-container checkout-view">
        <LoadingState message="Loading checkout details..." />
      </div>
    );
  }

  const items = cart?.items || [];

  if (items.length === 0) {
    return (
      <div className="view-container checkout-view">
        <EmptyState
          icon="🛒"
          title="Cannot Checkout - Cart is Empty"
          message="Your shopping cart is empty. Please add items to your cart before proceeding to checkout."
        />
        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => onNavigate && onNavigate('catalog')}>
            Browse Catalog
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + (item.subtotal || item.price * item.quantity), 0);
  const shipping = 0;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;

  return (
    <div className="view-container checkout-view">
      <div className="checkout-header-section">
        <h1 className="view-title">Order Checkout</h1>
        <p className="view-subtitle">Review your order summary and place your order.</p>
      </div>

      {error && <ErrorState title="Checkout Failed" message={error} />}

      <div className="checkout-grid">
        <div className="checkout-main-panel">
          <CheckoutSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>

        <div className="checkout-side-panel">
          <div className="ui-card checkout-action-card">
            <h3>Ready to Order?</h3>
            <p className="user-email-notice">Placing order for: <strong>{user?.email}</strong></p>
            
            <div className="checkout-actions">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={submitting}
                onClick={handleConfirmOrder}
              >
                {submitting ? '🔄 Processing Order...' : '🛍️ Confirm & Place Order'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                disabled={submitting}
                onClick={() => onNavigate && onNavigate('cart')}
              >
                ← Back to Cart
              </Button>
            </div>

            {submitting && (
              <div className="mt-3 text-center">
                <LoadingState message="Creating order & capturing price snapshots..." />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutView;
