import React from 'react';

/**
 * Bottom-Up Primitive Component: Base Badge Indicator
 */
export function Badge({ children, variant = 'emerald' }) {
  const variantClass = variant === 'emerald' ? 'ui-badge-emerald' : 'ui-badge-gray';
  return <span className={`ui-badge ${variantClass}`}>{children}</span>;
}
