import React from 'react';
import { OrderStatusBadge } from './OrderStatusBadge';
import { Button } from '../primitives/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function OrderSummaryCard({ order, onViewDetails }) {
  if (!order) return null;

  const itemCount = order.items ? order.items.reduce((acc, i) => acc + i.quantity, 0) : 0;

  return (
    <div className="order-summary-card">
      <div className="order-summary-header">
        <div>
          <span className="order-id-label">Order #{order.id}</span>
          <div className="order-date-label">{formatDate(order.createdAt)}</div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="order-summary-body">
        <span>📦 {itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        <span>Total: <strong>{formatCurrency(order.total)}</strong></span>
      </div>

      {onViewDetails && (
        <div className="order-summary-footer">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(order.id)}>
            👁️ View Order Details
          </Button>
        </div>
      )}
    </div>
  );
}
