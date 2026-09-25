import React from 'react';
import { Button } from '../primitives/Button';
import { OrderStatusBadge } from './OrderStatusBadge';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function OrderAdminRow({ order, onViewDetails }) {
  if (!order) return null;

  const itemCount = order.items ? order.items.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;

  return (
    <tr className="order-admin-row">
      <td className="cell-id">
        <code>{order.id}</code>
      </td>
      <td className="cell-customer">
        <div><strong>{order.customerEmail || 'Customer'}</strong></div>
        {order.customerName && <small className="text-muted">{order.customerName}</small>}
      </td>
      <td className="cell-date">
        {formatDate(order.createdAt)}
      </td>
      <td className="cell-items">
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </td>
      <td className="cell-total">
        <strong>{formatCurrency(order.total)}</strong>
      </td>
      <td className="cell-status">
        <OrderStatusBadge status={order.status} />
      </td>
      <td className="cell-actions">
        <Button variant="secondary" size="sm" onClick={() => onViewDetails(order.id)}>
          👁️ Manage
        </Button>
      </td>
    </tr>
  );
}
