import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { OrderCard } from '../features/orders/OrderCard';
import { EmptyOrders } from '../features/orders/EmptyOrders';
import * as orderService from '../services/orderService';

export function OrdersView({ onNavigate }) {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    orderService.fetchOrders()
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setOrders(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load order history.');
        setLoading(false);
      });
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <section className="cart-view-container">
        <header className="view-header">
          <h2>Order History</h2>
          <p>Please authenticate to view your orders.</p>
        </header>

        <div className="auth-form-card" style={{ textAlign: 'center' }}>
          <h3>Authentication Required</h3>
          <p className="auth-subtitle">Sign in to inspect past transactions and order receipts.</p>
          <button className="btn-primary btn-block" onClick={() => onNavigate('login')}>
            Sign In to View Orders
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="orders-view-container">
      <header className="view-header">
        <div>
          <h2>Your Order History</h2>
          <p>Top-Down View: Historical customer order entities retrieved from backend storage (`GET /api/orders`).</p>
        </div>
        <button className="btn-secondary" onClick={() => onNavigate('catalog')}>
          Explore Products
        </button>
      </header>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Retrieving your order records...</p>
        </div>
      )}

      {error && (
        <div className="alert-banner error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <EmptyOrders onExploreCatalog={() => onNavigate('catalog')} />
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="orders-list-grid">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={(id) => onNavigate('order-details', id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
