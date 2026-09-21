import React from 'react';

export function CheckoutItem({ item }) {
  return (
    <div className="checkout-item-row">
      <div className="checkout-item-image">
        <span>{item.image || item.icon || '📦'}</span>
      </div>
      <div className="checkout-item-info">
        <span className="checkout-item-category">{item.category}</span>
        <h4 className="checkout-item-title">{item.name}</h4>
        <span className="checkout-item-meta">
          ${Number(item.price).toFixed(2)} × {item.quantity}
        </span>
      </div>
      <div className="checkout-item-subtotal">
        <span>${Number(item.subtotal).toFixed(2)}</span>
      </div>
    </div>
  );
}
