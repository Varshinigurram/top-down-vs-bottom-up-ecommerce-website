import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserOrdersApi } from '../services/orderService';
import { OrderFilterHeader } from '../features/orders/OrderFilterHeader';
import { OrderSummaryCard } from '../components/composite/OrderSummaryCard';
import { Button } from '../components/primitives/Button';
import { LoadingState, ErrorState, EmptyState } from '../components/primitives/FeedbackStates';

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
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getUserOrdersApi();
      const ordersList = res?.data || res || [];
      setOrders(ordersList);
    } catch (err) {
      setError(err.message || 'Failed to load your order history.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOrder = (orderId) => {
    if (onNavigate) {
      onNavigate('order-details', orderId);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="view-container orders-view">
        <ErrorState
          title="Authentication Required"
          message="Please sign in to view your order history and track purchases."
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
      <div className="view-container orders-view">
        <LoadingState message="Loading your order history..." />
      </div>
    );
  }

  return (
    <div className="view-container orders-view">
      <OrderFilterHeader orderCount={orders.length} />

      {error && <ErrorState title="Order History Error" message={error} />}

      {orders.length === 0 ? (
        <div className="empty-orders-wrapper">
          <EmptyState
            icon="📦"
            title="No Orders Found"
            message="You haven't placed any orders yet. Once you complete checkout, your order history will appear here."
          />
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => onNavigate && onNavigate('catalog')}>
              Start Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="orders-list-grid mt-4">
          {orders.map((order) => (
            <OrderSummaryCard
              key={order.id}
              order={order}
              onSelectOrder={handleSelectOrder}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersView;
