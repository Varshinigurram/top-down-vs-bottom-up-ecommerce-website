import React from 'react';

export function Input({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  const inputId = id || name || `input_${Math.random().toString(36).substring(2, 6)}`;

  return (
    <div className={`form-group ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId}>
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? 'input-error' : ''}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error && <span className="error-text" role="alert">{error}</span>}
    </div>
  );
}
