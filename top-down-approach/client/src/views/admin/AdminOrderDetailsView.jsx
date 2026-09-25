import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchAdminOrderById, updateAdminOrderStatus } from '../../services/adminOrderService';
import { OrderStatusBadge } from '../../features/orders/OrderStatusBadge';
import { OrderItemList } from '../../features/orders/OrderItemList';
import { AdminOrderStatusControl } from '../../features/administration/AdminOrderStatusControl';
import { formatCurrency } from '../../utils/formatCurrency';

export function AdminOrderDetailsView({ orderId, onNavigate }) {
  const { user, isAuthenticated } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN' && orderId) {
      loadOrder();
    } else {
      setLoading(false);
    }
  }, [orderId, isAuthenticated, user]);

  const loadOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminOrderById(orderId);
      setOrder(data);
    } catch (err) {
      setError(err.message || 'Failed to load order details.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const updated = await updateAdminOrderStatus(orderId, newStatus);
      setOrder(updated);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="view-container">
        <div className="error-alert role-access-denied">
          <h2>🚫 Access Denied (403 Forbidden)</h2>
          <p>Administrator privileges are required to view detailed order info.</p>
          <button className="btn btn-primary mt-3" onClick={() => onNavigate('catalog')}>
            Return to Storefront Catalog
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = order
    ? new Date(order.createdAt).toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short'
      })
    : '';

  return (
    <div className="view-container admin-view-container">
      <div className="admin-header-banner">
        <div>
          <h2>Order #{orderId} Details</h2>
          <p className="subtitle">Administrative order review and status state control.</p>
        </div>
        <div className="admin-actions-bar">
          <button className="btn btn-outline" onClick={() => onNavigate('admin-orders')}>
            ← Back to Orders List
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-spinner-container">
          <div className="spinner"></div>
          <p>Loading order details...</p>
        </div>
      )}

      {error && (
        <div className="error-alert mb-4">
          ⚠️ {error}{' '}
          <button className="btn btn-sm btn-outline ml-2" onClick={loadOrder}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && order && (
        <div className="order-details-grid">
          <div className="order-details-main">
            <div className="order-info-card">
              <div className="card-header-flex">
                <div>
                  <span className="order-id-title">Order #{order.id}</span>
                  <div className="order-date-sub">{formattedDate}</div>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="customer-info-box">
                <h4>👤 Customer Information</h4>
                <p><strong>Name:</strong> {order.customerName || 'N/A'}</p>
                <p><strong>Email:</strong> {order.customerEmail || 'N/A'}</p>
                <p><strong>Customer ID:</strong> <code>{order.userId}</code></p>
              </div>

              <div className="admin-status-control-wrapper">
                <h4>⚙️ Update Order Processing Status</h4>
                <AdminOrderStatusControl
                  currentStatus={order.status}
                  onStatusChange={handleStatusChange}
                  isUpdating={isUpdatingStatus}
                />
              </div>

              <h4 className="mt-4 mb-2">📦 Order Historical Item Snapshot</h4>
              <OrderItemList items={order.items} />
            </div>
          </div>

          <div className="order-details-sidebar">
            <div className="checkout-summary-card">
              <h3>Financial Breakdown</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}</span>
              </div>

              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-row total-row">
                <span>Order Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
