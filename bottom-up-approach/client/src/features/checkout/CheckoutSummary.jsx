import React from 'react';
import { ProductPrice } from '../../components/composite/ProductPrice';
import { formatCurrency } from '../../utils/formatters';

export function CheckoutSummary({ items = [], subtotal = 0, shipping = 0, tax = 0, total = 0 }) {
  return (
    <div className="checkout-summary-feature ui-card">
      <h2 className="summary-title">Order Review</h2>
      <p className="summary-subtitle">Please review your items and price breakdown before placing your order.</p>

      <div className="checkout-items-list">
        {items.map((item) => {
          const itemSubtotal = item.subtotal || Math.round(item.price * item.quantity * 100) / 100;
          return (
            <div key={item.productId} className="checkout-item-row">
              <div className="checkout-item-main">
                <span className="checkout-item-icon">{item.image || '📦'}</span>
                <div className="checkout-item-meta">
                  <span className="checkout-item-name">{item.name}</span>
                  <span className="checkout-item-qty">Qty: {item.quantity} × {formatCurrency(item.price)}</span>
                </div>
              </div>
              <div className="checkout-item-subtotal">
                <ProductPrice price={itemSubtotal} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="checkout-totals-breakdown">
        <div className="total-row">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="total-row">
          <span>Shipping (Standard Free)</span>
          <span className="free-shipping-label">{formatCurrency(shipping)}</span>
        </div>
        <div className="total-row">
          <span>Sales Tax (8%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="total-row grand-total">
          <strong>Order Total</strong>
          <strong className="total-amount">{formatCurrency(total)}</strong>
        </div>
      </div>
    </div>
  );
}
