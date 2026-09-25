import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { OrderStatusBadge } from './OrderStatusBadge';

export function OrderCard({ order, onViewDetails }) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const totalItemCount = Array.isArray(order.items)
    ? order.items.reduce((sum, item) => sum + Number(item.quantity || 1), 0)
    : 0;

  return (
    <div className="order-card-row" onClick={() => onViewDetails(order.id)}>
      <div className="order-card-header">
        <div>
          <span className="order-id-code">Order #{order.id}</span>
          <span className="order-date-label">{formattedDate}</span>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="order-card-body">
        <div className="order-items-preview">
          {order.items.slice(0, 3).map((item, idx) => (
            <span key={idx} className="preview-item-chip">
              {item.productImage || '📦'} {item.productName} ({item.quantity}×)
            </span>
          ))}
          {order.items.length > 3 && (
            <span className="preview-more-chip">+{order.items.length - 3} more</span>
          )}
        </div>
      </div>

      <div className="order-card-footer">
        <div className="order-metrics">
          <span className="metric-count">{totalItemCount} item(s)</span>
          <span className="metric-total">{formatCurrency(order.total)}</span>
        </div>

        <button className="btn-secondary btn-sm" onClick={() => onViewDetails(order.id)}>
          View Order Details →
        </button>
      </div>
    </div>
  );
}
