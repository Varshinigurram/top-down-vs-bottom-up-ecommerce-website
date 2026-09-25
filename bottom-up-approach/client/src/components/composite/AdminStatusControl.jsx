import React, { useState, useEffect } from 'react';
import { Button } from '../primitives/Button';
import { OrderStatusBadge } from './OrderStatusBadge';

const ALLOWED_NEXT_STATUSES = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED', 'CANCELLED'],
  DELIVERED: [],
  CANCELLED: []
};

export function AdminStatusControl({ currentStatus, onUpdateStatus, loading = false }) {
  const allowedNext = ALLOWED_NEXT_STATUSES[currentStatus] || [];
  const [selectedStatus, setSelectedStatus] = useState(allowedNext[0] || '');

  useEffect(() => {
    if (allowedNext.length > 0) {
      setSelectedStatus(allowedNext[0]);
    }
  }, [currentStatus]);

  if (allowedNext.length === 0) {
    return (
      <div className="status-control-box status-terminal">
        <p className="text-muted">Order is in terminal status. No further transitions available.</p>
        <OrderStatusBadge status={currentStatus} />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStatus && onUpdateStatus) {
      onUpdateStatus(selectedStatus);
    }
  };

  return (
    <div className="status-control-box">
      <div className="status-control-current">
        <span>Current Status:</span>
        <OrderStatusBadge status={currentStatus} />
      </div>
      <form className="status-control-form" onSubmit={handleSubmit}>
        <label htmlFor="nextStatusSelect" className="status-label">Update Status to:</label>
        <div className="status-action-row">
          <select
            id="nextStatusSelect"
            className="ui-input select-input"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            disabled={loading}
          >
            {allowedNext.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          <Button variant="primary" size="sm" type="submit" disabled={loading || !selectedStatus}>
            {loading ? 'Updating...' : 'Apply Transition'}
          </Button>
        </div>
      </form>
    </div>
  );
}
