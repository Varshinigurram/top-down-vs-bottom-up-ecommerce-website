import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export function ProductPrice({ price, className = '' }) {
  return <span className={`product-price ${className}`.trim()}>{formatCurrency(price)}</span>;
}
