import React from 'react';
import { AdminOrderManagement } from '../../features/admin/AdminOrderManagement';

export function AdminOrdersView({ onNavigate }) {
  return (
    <div className="view-container admin-orders-view">
      <AdminOrderManagement onNavigate={onNavigate} />
    </div>
  );
}
