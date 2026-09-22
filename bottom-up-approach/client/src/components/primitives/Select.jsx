import React from 'react';

export function Select({
  id,
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  const selectId = id || name || `select_${Math.random().toString(36).substring(2, 6)}`;

  return (
    <div className={`form-group ${className}`.trim()}>
      {label && (
        <label htmlFor={selectId}>
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={error ? 'input-error' : ''}
        {...props}
      >
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
      {error && <span className="error-text" role="alert">{error}</span>}
    </div>
  );
}
