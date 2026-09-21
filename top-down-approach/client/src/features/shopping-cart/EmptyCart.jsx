import React from 'react';

export function EmptyCart({ onContinueShopping }) {
  return (
    <div className="empty-cart-card">
      <div className="empty-cart-visual">🛒</div>
      <h3>Your Shopping Cart is Empty</h3>
      <p>Looks like you haven't added any items to your store cart yet.</p>
      <button className="btn-primary" onClick={onContinueShopping}>
        Explore Product Catalog
      </button>
    </div>
  );
}
