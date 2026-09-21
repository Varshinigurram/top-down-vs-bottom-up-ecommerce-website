import React from 'react';
import { OrderStatusBadge } from '../orders/OrderStatusBadge';

export function AdminOrderCard({ order, onViewDetails }) {
  if (!order) return null;

  const formattedDate = new Date(order.createdAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const itemCount = order.items ? order.items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <div className="admin-order-card">
      <div className="order-card-header">
        <div>
          <span className="order-card-id">Order ID: #{order.id}</span>
          <div className="order-card-customer">
            👤 <strong>{order.customerName || 'Customer'}</strong> ({order.customerEmail || order.userId})
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="order-card-meta">
        <span>📅 {formattedDate}</span>
        <span>📦 {itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        <span>💰 Total: <strong>\${Number(order.total).toFixed(2)}</strong></span>
      </div>

      <div className="order-card-footer">
        <button className="btn btn-sm btn-outline" onClick={() => onViewDetails(order.id)}>
          👁️ View Details
        </button>
      </div>
    </div>
  );
}
