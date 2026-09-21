import React from 'react';

export function AdminStats({ stats, onNavigate }) {
  if (!stats) return null;

  return (
    <div className="admin-stats-grid">
      <div className="stat-card" onClick={() => onNavigate && onNavigate('admin-products')}>
        <div className="stat-icon">📦</div>
        <div className="stat-content">
          <span className="stat-value">{stats.totalProducts}</span>
          <span className="stat-label">Total Products</span>
        </div>
      </div>

      <div className="stat-card" onClick={() => onNavigate && onNavigate('admin-orders')}>
        <div className="stat-icon">📋</div>
        <div className="stat-content">
          <span className="stat-value">{stats.totalOrders}</span>
          <span className="stat-label">Total Orders</span>
        </div>
      </div>

      <div className="stat-card highlight-pending" onClick={() => onNavigate && onNavigate('admin-orders')}>
        <div className="stat-icon">⏳</div>
        <div className="stat-content">
          <span className="stat-value">{stats.pendingOrders}</span>
          <span className="stat-label">Pending Orders</span>
        </div>
      </div>

      <div className="stat-card highlight-warning" onClick={() => onNavigate && onNavigate('admin-products')}>
        <div className="stat-icon">⚠️</div>
        <div className="stat-content">
          <span className="stat-value">{stats.lowStockProducts}</span>
          <span className="stat-label">Low Stock Items (&lt; 10)</span>
        </div>
      </div>
    </div>
  );
}
