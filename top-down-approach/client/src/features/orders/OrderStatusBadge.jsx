import React from 'react';

export function OrderStatusBadge({ status = 'PENDING' }) {
  const normalizedStatus = String(status).toUpperCase();

  const getStatusClass = (st) => {
    switch (st) {
      case 'CONFIRMED':
        return 'status-confirmed';
      case 'SHIPPED':
        return 'status-shipped';
      case 'DELIVERED':
        return 'status-delivered';
      case 'CANCELLED':
        return 'status-cancelled';
      case 'PENDING':
      default:
        return 'status-pending';
    }
  };

  return <span className={`order-status-badge ${getStatusClass(normalizedStatus)}`}>{normalizedStatus}</span>;
}
