import React from 'react';

/**
 * Bottom-Up Primitive Component: Base Card Container
 */
export function Card({ children, className = '' }) {
  return <div className={`ui-card ${className}`}>{children}</div>;
}
