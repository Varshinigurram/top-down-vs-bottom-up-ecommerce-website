import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

export function CheckoutSummary({ totalItems, subtotal, onPlaceOrder, isSubmitting = false }) {
  const estimatedShipping = 0;
  const estimatedTax = Math.round(subtotal * 0.08 * 100) / 100;
  const totalAmount = Math.round((subtotal + estimatedShipping + estimatedTax) * 100) / 100;

  return (
    <div className="cart-summary-card checkout-summary-card">
      <h3>Order Summary</h3>

      <div className="summary-row">
        <span>Items Subtotal ({totalItems} items):</span>
        <span className="summary-value">{formatCurrency(subtotal)}</span>
      </div>

      <div className="summary-row">
        <span>Shipping:</span>
        <span className="summary-value free-shipping">{formatCurrency(0)}</span>
      </div>

      <div className="summary-row">
        <span>Tax (8%):</span>
        <span className="summary-value">{formatCurrency(estimatedTax)}</span>
      </div>

      <div className="summary-divider"></div>

      <div className="summary-row total-row">
        <span>Total:</span>
        <span className="total-amount">{formatCurrency(totalAmount)}</span>
      </div>

      <button
        className="btn-primary btn-block btn-place-order"
        onClick={onPlaceOrder}
        disabled={isSubmitting || totalItems === 0}
      >
        {isSubmitting ? 'Processing Order...' : 'Place Order'}
      </button>

      <p className="checkout-notice">
        No payment gateway in this demo. Your order will be created with status PENDING.
      </p>
    </div>
  );
}
