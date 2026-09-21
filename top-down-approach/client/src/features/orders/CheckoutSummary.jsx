import React from 'react';

export function CheckoutSummary({ totalItems, subtotal, onPlaceOrder, isSubmitting = false }) {
  const estimatedShipping = 0; // Free shipping
  const estimatedTax = Math.round(subtotal * 0.08 * 100) / 100;
  const totalAmount = Math.round((subtotal + estimatedShipping + estimatedTax) * 100) / 100;

  return (
    <div className="cart-summary-card checkout-summary-card">
      <h3>Payment & Order Summary</h3>

      <div className="summary-row">
        <span>Items Subtotal ({totalItems} items):</span>
        <span className="summary-value">${Number(subtotal).toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span>Standard Express Shipping:</span>
        <span className="summary-value free-shipping">FREE</span>
      </div>

      <div className="summary-row">
        <span>Sales Tax (8%):</span>
        <span className="summary-value">${estimatedTax.toFixed(2)}</span>
      </div>

      <div className="summary-divider"></div>

      <div className="summary-row total-row">
        <span>Final Order Total:</span>
        <span className="total-amount">${totalAmount.toFixed(2)}</span>
      </div>

      <button
        className="btn-primary btn-block btn-place-order"
        onClick={onPlaceOrder}
        disabled={isSubmitting || totalItems === 0}
      >
        {isSubmitting ? 'Processing Order...' : '🛍️ Place Order'}
      </button>

      <p className="checkout-notice">
        ℹ️ Academic Simulation: No real payment required. Order will be initialized as PENDING.
      </p>
    </div>
  );
}
