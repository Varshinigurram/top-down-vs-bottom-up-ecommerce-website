import React from 'react';
import { ProductSearchInput } from '../../components/composite/ProductSearchInput';

export function ProductSearch({ search, onSearchChange }) {
  return (
    <div className="product-search-feature">
      <ProductSearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search products by name or description..."
      />
    </div>
  );
}
