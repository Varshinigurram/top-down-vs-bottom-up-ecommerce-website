import React from 'react';

export function EmptyOrders({ onExploreCatalog }) {
  return (
    <div className="empty-cart-card">
      <div className="empty-cart-visual">📦</div>
      <h3>No Past Orders Found</h3>
      <p>You haven't placed any orders with your account yet.</p>
      <button className="btn-primary" onClick={onExploreCatalog}>
        Browse Catalog & Start Shopping
      </button>
    </div>
  );
}
