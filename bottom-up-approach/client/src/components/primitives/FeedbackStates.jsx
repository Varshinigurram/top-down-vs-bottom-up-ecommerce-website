import React from 'react';

export function LoadingState({ message = 'Loading content...' }) {
  return (
    <div className="loading-state-container" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export function ErrorState({ title = 'Error', message, onRetry }) {
  return (
    <div className="error-state-card" role="alert">
      <h3>⚠️ {title}</h3>
      <p>{message || 'An unexpected error occurred. Please try again.'}</p>
      {onRetry && (
        <button className="btn btn-sm btn-outline mt-2" onClick={onRetry}>
          🔄 Retry
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon = '📦', title = 'No Data Found', message, action }) {
  return (
    <div className="empty-state-card">
      <span className="empty-icon" aria-hidden="true">{icon}</span>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action && <div className="empty-action-wrapper">{action}</div>}
    </div>
  );
}
