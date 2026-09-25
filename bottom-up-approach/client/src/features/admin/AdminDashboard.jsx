import React, { useState, useEffect } from 'react';
import { getAdminDashboardApi } from '../../services/adminService';
import { AdminMetricCard } from '../../components/composite/AdminMetricCard';
import { OrderStatusBadge } from '../../components/composite/OrderStatusBadge';
import { Button } from '../../components/primitives/Button';

export function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAdminDashboardApi();
      if (res.success) {
        setStats(res.data);
      } else {
        setError(res.message || 'Failed to load dashboard metrics.');
      }
    } catch (err) {
      setError(err.message || 'Error loading dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard-container">
        <h2>Admin Dashboard</h2>
        <p className="loading-state">Loading administrative metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-container">
        <h2>Admin Dashboard</h2>
        <div className="error-banner">
          <p>{error}</p>
          <Button variant="secondary" size="sm" onClick={fetchDashboardStats}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const { totalProducts, totalOrders, ordersByStatus = {}, lowStockCount, lowStockProducts = [] } = stats || {};

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header-row">
        <div>
          <h2>Admin Dashboard</h2>
          <p className="text-muted">Overview of catalog inventory and customer orders.</p>
        </div>
        <div className="dashboard-action-buttons">
          <Button variant="secondary" size="sm" onClick={() => onNavigate('admin-products')}>
            📦 Manage Products
          </Button>
          <Button variant="secondary" size="sm" onClick={() => onNavigate('admin-orders')}>
            📋 Manage Orders
          </Button>
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="admin-metrics-grid">
        <AdminMetricCard title="Total Products" value={totalProducts} icon="📦" />
        <AdminMetricCard title="Total Orders" value={totalOrders} icon="🛍️" />
        <AdminMetricCard
          title="Low Stock Warning"
          value={lowStockCount}
          icon="⚠️"
          variant={lowStockCount > 0 ? 'warning' : 'default'}
        />
      </div>

      {/* Order Status Breakdown */}
      <div className="ui-card admin-status-breakdown-card">
        <h3>Order Breakdown by Status</h3>
        <div className="status-grid">
          <div className="status-metric-box">
            <OrderStatusBadge status="PENDING" />
            <span className="status-count-val">{ordersByStatus.PENDING || 0}</span>
          </div>
          <div className="status-metric-box">
            <OrderStatusBadge status="CONFIRMED" />
            <span className="status-count-val">{ordersByStatus.CONFIRMED || 0}</span>
          </div>
          <div className="status-metric-box">
            <OrderStatusBadge status="SHIPPED" />
            <span className="status-count-val">{ordersByStatus.SHIPPED || 0}</span>
          </div>
          <div className="status-metric-box">
            <OrderStatusBadge status="DELIVERED" />
            <span className="status-count-val">{ordersByStatus.DELIVERED || 0}</span>
          </div>
          <div className="status-metric-box">
            <OrderStatusBadge status="CANCELLED" />
            <span className="status-count-val">{ordersByStatus.CANCELLED || 0}</span>
          </div>
        </div>
      </div>

      {/* Low Stock Alert List */}
      {lowStockProducts.length > 0 && (
        <div className="ui-card low-stock-alert-card">
          <div className="card-header-with-badge">
            <h3>⚠️ Low Stock Alert (Stock ≤ 5)</h3>
            <span className="badge badge-warning">{lowStockProducts.length} items</span>
          </div>
          <table className="admin-data-table compact-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Remaining Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map((prod) => (
                <tr key={prod.id}>
                  <td><code>{prod.id}</code></td>
                  <td><strong>{prod.name}</strong></td>
                  <td>{prod.category}</td>
                  <td><span className="stock-critical">{prod.stock} left</span></td>
                  <td>
                    <Button variant="secondary" size="sm" onClick={() => onNavigate('admin-product-edit', { productId: prod.id })}>
                      Restock / Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
