import React from 'react';
import { OrderAdminRow } from './OrderAdminRow';

export function OrderAdminTable({ orders = [], onViewDetails }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="ui-card empty-state-box">
        <p>No orders found matching the filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive-container">
      <table className="admin-data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderAdminRow key={order.id} order={order} onViewDetails={onViewDetails} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
