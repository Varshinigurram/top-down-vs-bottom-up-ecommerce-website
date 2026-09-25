import React from 'react';
import { AdminProductForm } from '../../features/admin/AdminProductForm';

export function AdminProductFormView({ productId, onNavigate }) {
  return (
    <div className="view-container admin-product-form-view">
      <AdminProductForm productId={productId} onNavigate={onNavigate} />
    </div>
  );
}
