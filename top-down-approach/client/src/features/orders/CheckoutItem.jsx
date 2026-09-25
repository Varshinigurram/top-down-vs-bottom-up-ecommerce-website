import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

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
          {formatCurrency(item.price)} × {item.quantity}
        </span>
      </div>
      <div className="checkout-item-subtotal">
        <span>{formatCurrency(item.subtotal)}</span>
      </div>
    </div>
  );
}
