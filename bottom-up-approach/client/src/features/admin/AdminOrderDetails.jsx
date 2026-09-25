import React, { useState, useEffect } from 'react';
import { getOrderByIdAdminApi, updateOrderStatusAdminApi } from '../../services/adminService';
import { AdminStatusControl } from '../../components/composite/AdminStatusControl';
import { Button } from '../../components/primitives/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function AdminOrderDetails({ orderId, onNavigate }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getOrderByIdAdminApi(orderId);
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setError(res.message || 'Order not found.');
      }
    } catch (err) {
      setError(err.message || 'Error fetching order details.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      setError(null);
      setSuccessMsg(null);
      const res = await updateOrderStatusAdminApi(orderId, newStatus);
      if (res.success && res.data) {
        setOrder(res.data);
        setSuccessMsg(`Order status successfully updated to '${newStatus}'.`);
      } else {
        setError(res.message || 'Failed to update order status.');
      }
    } catch (err) {
      // Handles 409 Conflict if invalid transition attempted
      setError(err.message || 'Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-order-details-container">
        <h2>Order Management Details</h2>
        <p className="loading-state">Loading order record...</p>
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="admin-order-details-container">
        <h2>Order Management Details</h2>
        <div className="alert-banner alert-danger">{error}</div>
        <Button variant="secondary" onClick={() => onNavigate('admin-orders')}>
          ⬅️ Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="admin-order-details-container">
      <div className="details-header-row">
        <div>
          <h2>Order Record: <code>{order.id}</code></h2>
          <p className="text-muted">Placed on {formatDate(order.createdAt)} by {order.customerEmail || 'Customer'}</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => onNavigate('admin-orders')}>
          ⬅️ Back to Orders
        </Button>
      </div>

      {successMsg && <div className="alert-banner alert-success">{successMsg}</div>}
      {error && <div className="alert-banner alert-danger">{error}</div>}

      <div className="details-grid-layout">
        {/* Left Panel: Order Item Historical Snapshots */}
        <div className="details-left-panel">
          <div className="ui-card">
            <h3>Historical Item Snapshots</h3>
            <p className="text-muted text-sm mb-3">Captured at time of purchase. Independent of current product catalog updates.</p>
            <table className="admin-data-table compact-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items && order.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="order-item-cell">
                        <span className="order-item-thumb">{item.productImage || '📦'}</span>
                        <div>
                          <strong>{item.productName}</strong>
                          <div className="text-xs text-muted">Product ID: {item.productId}</div>
                        </div>
                      </div>
                    </td>
                    <td>{formatCurrency(item.unitPrice)}</td>
                    <td>{item.quantity}</td>
                    <td><strong>{formatCurrency(item.subtotal)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Totals */}
          <div className="ui-card financial-breakdown-card mt-3">
            <h3>Order Financial Summary</h3>
            <div className="financial-row">
              <span>Items Subtotal:</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="financial-row">
              <span>Shipping Fee:</span>
              <span>{formatCurrency(order.shipping)}</span>
            </div>
            <div className="financial-row">
              <span>Estimated Tax (8%):</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className="financial-row total-row">
              <strong>Grand Total:</strong>
              <strong>{formatCurrency(order.total)}</strong>
            </div>
          </div>
        </div>

        {/* Right Panel: Status Transition Control */}
        <div className="details-right-panel">
          <div className="ui-card">
            <h3>Status Transition Control</h3>
            <AdminStatusControl
              currentStatus={order.status}
              onUpdateStatus={handleUpdateStatus}
              loading={updating}
            />
          </div>

          <div className="ui-card mt-3">
            <h3>Customer Identity</h3>
            <p><strong>Email:</strong> {order.customerEmail || 'Unknown'}</p>
            {order.customerName && <p><strong>Name:</strong> {order.customerName}</p>}
            <p><strong>User ID:</strong> <code>{order.userId}</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
