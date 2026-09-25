import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

export function CartSummary({ totalItems, subtotal, onProceedToCheckout }) {
  const estimatedShipping = 0; // Free shipping promo
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
        <span>Estimated Total:</span>
        <span className="total-amount">{formatCurrency(totalAmount)}</span>
      </div>

      <button
        className="btn-primary btn-block"
        onClick={onProceedToCheckout}
        disabled={totalItems === 0}
      >
        Proceed to Checkout →
      </button>
    </div>
  );
}
