import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

export function OrderItemList({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="order-items-table-card">
      <h3>Purchased Items Snapshot</h3>
      <div className="table-responsive">
        <table className="order-receipt-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th className="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <div className="receipt-item-cell">
                    <span className="receipt-emoji">{item.productImage || '📦'}</span>
                    <span className="receipt-name">{item.productName}</span>
                  </div>
                </td>
                <td>{formatCurrency(item.unitPrice)}</td>
                <td>{item.quantity}</td>
                <td className="text-right font-bold">{formatCurrency(item.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
