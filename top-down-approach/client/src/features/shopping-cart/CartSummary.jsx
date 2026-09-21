import React from 'react';

export function CartSummary({ totalItems, subtotal }) {
  const estimatedShipping = totalItems > 0 ? 0 : 0; // Free shipping promo
  const estimatedTax = Math.round(subtotal * 0.08 * 100) / 100; // 8% estimated tax
  const totalAmount = Math.round((subtotal + estimatedShipping + estimatedTax) * 100) / 100;

  return (
    <div className="cart-summary-card">
      <h3>Order Summary</h3>

      <div className="summary-row">
        <span>Total Items:</span>
        <span className="summary-value">{totalItems} units</span>
      </div>

      <div className="summary-row">
        <span>Cart Subtotal:</span>
        <span className="summary-value">${Number(subtotal).toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span>Estimated Express Shipping:</span>
        <span className="summary-value free-shipping">FREE</span>
      </div>

      <div className="summary-row">
        <span>Estimated Sales Tax (8%):</span>
        <span className="summary-value">${estimatedTax.toFixed(2)}</span>
      </div>

      <div className="summary-divider"></div>

      <div className="summary-row total-row">
        <span>Estimated Order Total:</span>
        <span className="total-amount">${totalAmount.toFixed(2)}</span>
      </div>

      <button className="btn-primary btn-block btn-checkout-disabled" disabled>
        Proceed to Checkout (Coming in Phase 6)
      </button>

      <p className="checkout-notice">
        🔒 Checkout and Order processing will be implemented in the next phase.
      </p>
    </div>
  );
}
