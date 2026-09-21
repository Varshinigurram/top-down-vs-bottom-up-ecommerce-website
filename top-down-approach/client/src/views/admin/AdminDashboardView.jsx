import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchDashboardStats } from '../../services/adminDashboardService';
import { AdminStats } from '../../features/administration/AdminStats';

export function AdminDashboardView({ onNavigate }) {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN') {
      loadStats();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard statistics.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="view-container">
        <div className="error-alert role-access-denied">
          <h2>🚫 Access Denied (403 Forbidden)</h2>
          <p>Administrator privileges are required to access the Admin Dashboard.</p>
          <button className="btn btn-primary mt-3" onClick={() => onNavigate('catalog')}>
            Return to Storefront Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="view-container admin-view-container">
      <div className="admin-header-banner">
        <div>
          <h2>⚙️ Administrator Dashboard</h2>
          <p className="subtitle">Operational statistics and catalog/order management center.</p>
        </div>
        <div className="admin-actions-bar">
          <button className="btn btn-outline" onClick={() => onNavigate('admin-products')}>
            📦 Manage Products
          </button>
          <button className="btn btn-outline" onClick={() => onNavigate('admin-orders')}>
            📋 Manage Orders
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-spinner-container">
          <div className="spinner"></div>
          <p>Loading operational dashboard stats...</p>
        </div>
      )}

      {error && (
        <div className="error-alert mb-4">
          ⚠️ {error}{' '}
          <button className="btn btn-sm btn-outline ml-2" onClick={loadStats}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && stats && (
        <>
          <AdminStats stats={stats} onNavigate={onNavigate} />

          <div className="admin-dashboard-quick-grid">
            <div className="quick-action-card">
              <h3>📦 Product Management</h3>
              <p>View, create, edit catalog products, or delete items. Monitor stock status across categories.</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={() => onNavigate('admin-products')}>
                  View Products ({stats.totalProducts})
                </button>
                <button className="btn btn-secondary" onClick={() => onNavigate('admin-product-new')}>
                  ➕ Add New Product
                </button>
              </div>
            </div>

            <div className="quick-action-card">
              <h3>📋 Customer Order Management</h3>
              <p>Review customer orders, inspect item snapshots, and update order processing states.</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={() => onNavigate('admin-orders')}>
                  View Orders ({stats.totalOrders})
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
