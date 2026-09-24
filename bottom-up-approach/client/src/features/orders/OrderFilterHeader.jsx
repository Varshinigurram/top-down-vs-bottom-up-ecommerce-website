import React from 'react';
import { OrderStatusBadge } from '../../components/composite/OrderStatusBadge';

const STATUSES = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export function OrderFilterHeader({ orderCount = 0 }) {
  return (
    <div className="order-filter-header-feature">
      <div className="order-title-row">
        <h1 className="view-title">My Orders</h1>
        <span className="order-count-tag">{orderCount} {orderCount === 1 ? 'Order' : 'Orders'} Placed</span>
      </div>
      <p className="view-subtitle">Track and view historical records of all your store purchases.</p>

      <div className="status-legend-bar">
        <span className="legend-label">Status Reference:</span>
        {STATUSES.map((status) => (
          <OrderStatusBadge key={status} status={status} />
        ))}
      </div>
    </div>
  );
}
