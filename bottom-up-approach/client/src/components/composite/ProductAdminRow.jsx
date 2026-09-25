import React from 'react';
import { Button } from '../primitives/Button';
import { ProductBadge } from './ProductBadge';
import { ProductStockIndicator } from './ProductStockIndicator';
import { formatCurrency } from '../../utils/formatters';

export function ProductAdminRow({ product, onEdit, onDelete }) {
  if (!product) return null;

  const isLowStock = Number(product.stock) <= 5;

  return (
    <tr className={`product-admin-row ${isLowStock ? 'row-low-stock' : ''}`}>
      <td className="cell-id">
        <code>{product.id}</code>
      </td>
      <td className="cell-image">
        <span className="admin-product-thumb">{product.image || '📦'}</span>
      </td>
      <td className="cell-name">
        <strong>{product.name}</strong>
        <p className="admin-product-desc">{product.description}</p>
      </td>
      <td className="cell-category">
        <ProductBadge category={product.category} />
      </td>
      <td className="cell-price">
        {formatCurrency(product.price)}
      </td>
      <td className="cell-stock">
        <ProductStockIndicator stock={product.stock} />
      </td>
      <td className="cell-actions">
        <div className="action-buttons-group">
          <Button variant="secondary" size="sm" onClick={() => onEdit(product.id)}>
            ✏️ Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(product.id, product.name)}>
            🗑️ Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
