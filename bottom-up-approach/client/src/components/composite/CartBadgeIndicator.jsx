import React from 'react';

export function CartBadgeIndicator({ count = 0, onClick, isActive = false }) {
  return (
    <button
      className={`nav-cart-btn ${isActive ? 'active' : ''}`.trim()}
      onClick={onClick}
      aria-label={`Shopping Cart with ${count} items`}
    >
      🛒 Cart
      {count > 0 && <span className="cart-count-badge">{count}</span>}
    </button>
  );
}
