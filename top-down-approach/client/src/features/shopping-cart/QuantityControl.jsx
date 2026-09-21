import React from 'react';

export function QuantityControl({ quantity, onIncrease, onDecrease, disabled = false }) {
  return (
    <div className="quantity-control-wrapper">
      <button
        type="button"
        className="qty-btn qty-minus"
        onClick={onDecrease}
        disabled={disabled || quantity <= 1}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="qty-value">{quantity}</span>
      <button
        type="button"
        className="qty-btn qty-plus"
        onClick={onIncrease}
        disabled={disabled}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
