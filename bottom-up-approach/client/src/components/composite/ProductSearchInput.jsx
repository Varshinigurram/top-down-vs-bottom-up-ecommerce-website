import React from 'react';
import { Input } from '../primitives/Input';

export function ProductSearchInput({ value, onChange, placeholder = 'Search products by keyword...' }) {
  return (
    <div className="product-search-bar">
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search catalog products"
      />
    </div>
  );
}
