import React from 'react';

export function AdminMetricCard({ title, value, icon, badge, variant = 'default' }) {
  return (
    <div className={`ui-card admin-metric-card metric-variant-${variant}`}>
      <div className="metric-header">
        <span className="metric-icon">{icon || '📊'}</span>
        <span className="metric-title">{title}</span>
      </div>
      <div className="metric-value-row">
        <span className="metric-value">{value}</span>
        {badge && <span className="metric-badge">{badge}</span>}
      </div>
    </div>
  );
}
