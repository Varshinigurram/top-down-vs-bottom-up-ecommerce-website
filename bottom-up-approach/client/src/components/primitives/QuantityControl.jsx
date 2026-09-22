import React from 'react';

export function QuantityControl({ quantity, maxStock = 99, onChange, disabled = false }) {
  const qty = Number(quantity || 1);

  const handleDecrement = () => {
    if (qty > 1 && !disabled) {
      onChange(qty - 1);
    }
  };

  const handleIncrement = () => {
    if (qty < maxStock && !disabled) {
      onChange(qty + 1);
    }
  };

  return (
    <div className="quantity-control-stepper">
      <button
        type="button"
        className="qty-btn"
        onClick={handleDecrement}
        disabled={disabled || qty <= 1}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="qty-value">{qty}</span>
      <button
        type="button"
        className="qty-btn"
        onClick={handleIncrement}
        disabled={disabled || qty >= maxStock}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
