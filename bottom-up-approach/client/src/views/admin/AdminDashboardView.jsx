import React from 'react';
import { AdminDashboard } from '../../features/admin/AdminDashboard';

export function AdminDashboardView({ onNavigate }) {
  return (
    <div className="view-container admin-dashboard-view">
      <AdminDashboard onNavigate={onNavigate} />
    </div>
  );
}
