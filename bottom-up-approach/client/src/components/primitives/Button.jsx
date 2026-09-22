import React from 'react';

export function Button({
  children,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'outline', 'danger', 'danger-outline'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props
}) {
  const baseClass = `btn btn-${variant} btn-${size} ${className}`.trim();

  return (
    <button
      type={type}
      className={baseClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner-wrapper">
          <span className="btn-spinner" aria-hidden="true" />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
