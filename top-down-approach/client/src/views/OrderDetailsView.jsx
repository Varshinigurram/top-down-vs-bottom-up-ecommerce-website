import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { OrderStatusBadge } from '../features/orders/OrderStatusBadge';
import { formatCurrency } from '../utils/formatCurrency';
import { OrderItemList } from '../features/orders/OrderItemList';
import * as orderService from '../services/orderService';

export function OrderDetailsView({ orderId, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    if (!orderId) {
      setError('Invalid order ID');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    orderService.fetchOrderById(orderId)
      .then((res) => {
        if (res.success && res.data) {
          setOrder(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load order receipt details.');
        setLoading(false);
      });
  }, [isAuthenticated, orderId]);

  if (!isAuthenticated) {
    return (
      <section className="cart-view-container">
        <header className="view-header">
          <h2>Order Receipt Details</h2>
          <p>Please authenticate to access order details.</p>
        </header>

        <div className="auth-form-card" style={{ textAlign: 'center' }}>
          <h3>Authentication Required</h3>
          <button className="btn-primary btn-block" onClick={() => onNavigate('login')}>
            Sign In to View Receipt
          </button>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <div className="product-details-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="product-details-container">
        <button className="btn-back" onClick={() => onNavigate('orders')}>← Back to Orders</button>
        <div className="alert-banner error" style={{ marginTop: '1rem' }}>
          <h3>Order Not Found</h3>
          <p>{error || 'The requested order record could not be found or belongs to another user account.'}</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <section className="product-details-container">
      <nav className="details-breadcrumb">
        <button className="btn-back" onClick={() => onNavigate('orders')}>
          ← Back to Order History
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Order #{order.id}</span>
      </nav>

      <div className="order-details-receipt-card">
        <header className="receipt-header">
          <div>
            <span className="receipt-tag">Order Receipt</span>
            <h2>Order #{order.id}</h2>
            <span className="receipt-date">{formattedDate}</span>
          </div>
          <OrderStatusBadge status={order.status} />
        </header>

        <div className="receipt-body">
          <OrderItemList items={order.items} />

          <div className="receipt-financials">
            <div className="summary-row">
              <span>Items Subtotal:</span>
              <span className="summary-value">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="summary-value free-shipping">{formatCurrency(0)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (8%):</span>
              <span className="summary-value">{formatCurrency(order.tax)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>Total:</span>
              <span className="total-amount">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        <footer className="receipt-footer">
          <button className="btn-secondary" onClick={() => onNavigate('catalog')}>
            Return to Store Catalog
          </button>
        </footer>
      </div>
    </section>
  );
}
