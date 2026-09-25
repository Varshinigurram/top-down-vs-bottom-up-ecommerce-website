import React from 'react';
import { ProductAdminRow } from './ProductAdminRow';

export function ProductAdminTable({ products = [], onEdit, onDelete }) {
  if (!products || products.length === 0) {
    return (
      <div className="ui-card empty-state-box">
        <p>No products found matching the criteria.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive-container">
      <table className="admin-data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductAdminRow
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
