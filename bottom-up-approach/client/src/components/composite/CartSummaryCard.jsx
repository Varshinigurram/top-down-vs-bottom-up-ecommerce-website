import React from 'react';
import { Button } from '../primitives/Button';
import { formatCurrency } from '../../utils/formatters';

export function CartSummaryCard({ subtotal = 0, onCheckout, isCheckingOut = false, disabled = false }) {
  const sub = Number(subtotal || 0);
  const shipping = 0;
  const tax = Math.round(sub * 0.08 * 100) / 100;
  const total = Math.round((sub + shipping + tax) * 100) / 100;

  return (
    <div className="cart-summary-card">
      <h3>Order Summary</h3>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatCurrency(sub)}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span className="free-shipping-tag">FREE</span>
      </div>

      <div className="summary-row">
        <span>Tax (8%)</span>
        <span>{formatCurrency(tax)}</span>
      </div>

      <div className="summary-divider" />

      <div className="summary-row total-row">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      {onCheckout && (
        <Button
          variant="primary"
          size="lg"
          className="btn-block mt-3"
          disabled={disabled || sub <= 0}
          loading={isCheckingOut}
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
}
