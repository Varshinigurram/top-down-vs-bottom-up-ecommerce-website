import React from 'react';
import { AdminProductManagement } from '../../features/admin/AdminProductManagement';

export function AdminProductsView({ onNavigate }) {
  return (
    <div className="view-container admin-products-view">
      <AdminProductManagement onNavigate={onNavigate} />
    </div>
  );
}
