import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export function OrderItemList({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="order-item-list">
      {items.map((item, idx) => (
        <div className="order-item-row" key={item.productId || idx}>
          <div className="order-item-img">{item.productImage || item.image || '📦'}</div>
          <div className="order-item-details">
            <strong>{item.productName || item.name}</strong>
            <span className="order-item-qty">
              {formatCurrency(item.unitPrice || item.price)} × {item.quantity}
            </span>
          </div>
          <div className="order-item-subtotal">{formatCurrency(item.subtotal)}</div>
        </div>
      ))}
    </div>
  );
}
