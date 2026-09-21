import React from 'react';

/**
 * Bottom-Up Primitive Component: Base Button
 */
export function Button({ children, onClick, variant = 'primary', className = '' }) {
  const variantClass = variant === 'primary' ? 'ui-button-primary' : '';
  return (
    <button className={`ui-button ${variantClass} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
