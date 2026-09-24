import React from 'react';
import { Button } from '../../components/primitives/Button';

export function CartActions({ onClearCart, onContinueShopping, disabled = false }) {
  return (
    <div className="cart-actions-bar">
      <Button
        variant="outline"
        size="sm"
        onClick={onContinueShopping}
        disabled={disabled}
      >
        ← Continue Shopping
      </Button>

      {onClearCart && (
        <Button
          variant="danger-outline"
          size="sm"
          onClick={onClearCart}
          disabled={disabled}
        >
          🗑️ Clear Cart
        </Button>
      )}
    </div>
  );
}
