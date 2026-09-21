import React, { useState } from 'react';

const STATUS_OPTIONS = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export function AdminOrderStatusControl({ currentStatus, onStatusChange, isUpdating }) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleApplyChange = async () => {
    if (selectedStatus === currentStatus) return;
    setErrorMsg(null);
    try {
      await onStatusChange(selectedStatus);
    } catch (err) {
      setErrorMsg(err.message || 'Status transition failed.');
      setSelectedStatus(currentStatus);
    }
  };

  const isTerminalState = currentStatus === 'DELIVERED' || currentStatus === 'CANCELLED';

  return (
    <div className="status-control-box">
      <div className="status-control-inputs">
        <label htmlFor="order-status-select" className="status-label">
          Order Status:
        </label>
        <select
          id="order-status-select"
          className="status-select-dropdown"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          disabled={isUpdating || isTerminalState}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          className="btn btn-sm btn-primary"
          onClick={handleApplyChange}
          disabled={isUpdating || selectedStatus === currentStatus || isTerminalState}
        >
          {isUpdating ? 'Updating...' : 'Update Status'}
        </button>
      </div>

      {isTerminalState && (
        <span className="terminal-status-info">
          🔒 Order is in terminal state ({currentStatus}) and cannot be modified further.
        </span>
      )}

      {errorMsg && <div className="error-alert mt-2">⚠️ {errorMsg}</div>}
    </div>
  );
}
