import React from 'react';
import { OrderStatusBadge } from '../../components/composite/OrderStatusBadge';
import { OrderItemList } from '../../components/composite/OrderItemList';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function OrderDetailsContent({ order }) {
  if (!order) return null;

  return (
    <div className="order-details-content-feature">
      <div className="order-meta-header ui-card">
        <div className="meta-top">
          <div>
            <h2 className="order-id-title">Order ID: #{order.id}</h2>
            <p className="order-date">Placed on: {formatDate(order.createdAt)}</p>
          </div>
          <div className="meta-status">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>
      </div>

      <div className="order-items-section mt-4">
        <h3>Historical Order Items Snapshot</h3>
        <p className="snapshot-note">
          <small>⚡ Prices and item names reflect historical purchase values captured at order placement time.</small>
        </p>
        <OrderItemList items={order.items} />
      </div>

      <div className="order-financials-card ui-card mt-4">
        <h3>Financial Breakdown</h3>
        <div className="financial-totals">
          <div className="total-row">
            <span>Items Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="total-row">
            <span>Shipping</span>
            <span>{formatCurrency(0)}</span>
          </div>
          <div className="total-row">
            <span>Sales Tax (8%)</span>
            <span>{formatCurrency(order.tax)}</span>
          </div>
          <div className="total-row grand-total">
            <strong>Order Total</strong>
            <strong className="total-amount">{formatCurrency(order.total)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
