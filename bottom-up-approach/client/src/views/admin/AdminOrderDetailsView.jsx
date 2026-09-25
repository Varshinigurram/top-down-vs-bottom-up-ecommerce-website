import React from 'react';
import { AdminOrderDetails } from '../../features/admin/AdminOrderDetails';

export function AdminOrderDetailsView({ orderId, onNavigate }) {
  return (
    <div className="view-container admin-order-details-view">
      <AdminOrderDetails orderId={orderId} onNavigate={onNavigate} />
    </div>
  );
}
