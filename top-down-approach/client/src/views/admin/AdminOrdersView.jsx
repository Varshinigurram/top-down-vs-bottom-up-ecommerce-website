import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchAdminOrders } from '../../services/adminOrderService';
import { AdminOrderCard } from '../../features/administration/AdminOrderCard';

export function AdminOrdersView({ onNavigate }) {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN') {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to load customer orders.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrderDetails = (orderId) => {
    onNavigate('admin-order-details', orderId);
  };

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="view-container">
        <div className="error-alert role-access-denied">
          <h2>🚫 Access Denied (403 Forbidden)</h2>
          <p>Administrator privileges are required to view customer orders.</p>
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
          <h2>📋 Customer Orders Management</h2>
          <p className="subtitle">Inspect and update statuses for all store orders (newest first).</p>
        </div>
        <div className="admin-actions-bar">
          <button className="btn btn-outline" onClick={() => onNavigate('admin-dashboard')}>
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-spinner-container">
          <div className="spinner"></div>
          <p>Loading customer orders list...</p>
        </div>
      )}

      {error && (
        <div className="error-alert mb-4">
          ⚠️ {error}{' '}
          <button className="btn btn-sm btn-outline ml-2" onClick={loadOrders}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {orders.length === 0 ? (
            <div className="empty-state-card">
              <span className="empty-icon">📦</span>
              <h3>No Customer Orders Placed Yet</h3>
              <p>When customers place orders, they will appear here for administrative processing.</p>
            </div>
          ) : (
            <div className="admin-orders-list">
              {orders.map((order) => (
                <AdminOrderCard
                  key={order.id}
                  order={order}
                  onViewDetails={handleViewOrderDetails}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
