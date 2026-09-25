import React, { useState, useEffect } from 'react';
import { getAllOrdersAdminApi } from '../../services/adminService';
import { OrderAdminTable } from '../../components/composite/OrderAdminTable';
import { Button } from '../../components/primitives/Button';

const STATUS_FILTERS = ['ALL', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export function AdminOrderManagement({ onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllOrdersAdminApi();
      if (res.success) {
        setOrders(res.data || []);
      } else {
        setError(res.message || 'Failed to load orders.');
      }
    } catch (err) {
      setError(err.message || 'Error fetching orders.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (orderId) => {
    onNavigate('admin-order-details', { orderId });
  };

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'ALL') return true;
    return o.status === activeFilter;
  });

  return (
    <div className="admin-order-management-container">
      <div className="management-header-row">
        <div>
          <h2>Order Administration & Fulfillment</h2>
          <p className="text-muted">Monitor customer orders, verify items, and update order statuses.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={loadOrders}>
          🔄 Refresh Orders
        </Button>
      </div>

      {error && <div className="alert-banner alert-danger">{error}</div>}

      {/* Filter Tabs */}
      <div className="admin-tabs-container">
        {STATUS_FILTERS.map((status) => {
          const count = status === 'ALL' ? orders.length : orders.filter((o) => o.status === status).length;
          return (
            <button
              key={status}
              className={`tab-btn ${activeFilter === status ? 'tab-active' : ''}`}
              onClick={() => setActiveFilter(status)}
            >
              {status} <span className="tab-count-badge">{count}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <p className="loading-state">Loading customer orders...</p>
      ) : (
        <OrderAdminTable orders={filteredOrders} onViewDetails={handleViewDetails} />
      )}
    </div>
  );
}
