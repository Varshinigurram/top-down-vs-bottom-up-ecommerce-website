import React from 'react';

export function Badge({ children, variant = 'default', className = '' }) {
  const badgeClass = `badge badge-${variant} ${className}`.trim();
  return <span className={badgeClass}>{children}</span>;
}
