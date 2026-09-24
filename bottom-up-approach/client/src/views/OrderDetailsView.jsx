import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrderByIdApi } from '../services/orderService';
import { OrderDetailsContent } from '../features/orders/OrderDetailsContent';
import { Button } from '../components/primitives/Button';
import { LoadingState, ErrorState, EmptyState } from '../components/primitives/FeedbackStates';

export function OrderDetailsView({ orderId, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forbidden, setForbidden] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    if (!orderId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    fetchOrder();
  }, [isAuthenticated, orderId]);

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    setForbidden(false);
    setNotFound(false);

    try {
      const res = await getOrderByIdApi(orderId);
      const orderData = res?.data || res;
      if (orderData && orderData.id) {
        setOrder(orderData);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      if (err.statusCode === 403 || err.status === 403 || err.message?.toLowerCase().includes('forbidden')) {
        setForbidden(true);
      } else if (err.statusCode === 404 || err.status === 404 || err.message?.toLowerCase().includes('not found')) {
        setNotFound(true);
      } else {
        setError(err.message || 'Failed to load order details.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="view-container order-details-view">
        <ErrorState
          title="Authentication Required"
          message="Please sign in to view order details."
        />
        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => onNavigate && onNavigate('login')}>
            Sign In Now
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="view-container order-details-view">
        <LoadingState message="Fetching order details..." />
      </div>
    );
  }

  return (
    <div className="view-container order-details-view">
      <div className="details-navigation-bar">
        <Button variant="outline" size="sm" onClick={() => onNavigate && onNavigate('orders')}>
          ← Back to Orders
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onNavigate && onNavigate('catalog')}>
          Continue Shopping
        </Button>
      </div>

      {forbidden && (
        <ErrorState
          title="403 Access Forbidden"
          message="Access forbidden: You can only view your own order details."
        />
      )}

      {notFound && !forbidden && (
        <EmptyState
          icon="📦"
          title="Order Not Found"
          message={`The requested order ID ('${orderId}') could not be located in your history.`}
        />
      )}

      {error && !forbidden && !notFound && (
        <ErrorState
          title="Failed to Load Order"
          message={error}
        />
      )}

      {!loading && !error && !forbidden && !notFound && order && (
        <OrderDetailsContent order={order} />
      )}
    </div>
  );
}

export default OrderDetailsView;
