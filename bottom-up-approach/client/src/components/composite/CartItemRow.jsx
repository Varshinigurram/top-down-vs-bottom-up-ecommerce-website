import React from 'react';
import { QuantityControl } from '../primitives/QuantityControl';
import { Button } from '../primitives/Button';
import { formatCurrency } from '../../utils/formatters';

export function CartItemRow({ item, onUpdateQuantity, onRemove }) {
  if (!item) return null;

  return (
    <div className="cart-item-row">
      <div className="cart-item-img">{item.image || '📦'}</div>
      <div className="cart-item-info">
        <h4 className="cart-item-title">{item.name || item.title}</h4>
        <span className="cart-item-unit-price">{formatCurrency(item.price)} each</span>
      </div>
      <div className="cart-item-stepper">
        <QuantityControl
          quantity={item.quantity}
          onChange={(newQty) => onUpdateQuantity(item.productId, newQty)}
        />
      </div>
      <div className="cart-item-total">{formatCurrency(item.subtotal)}</div>
      <div className="cart-item-remove">
        <Button
          variant="danger-outline"
          size="sm"
          onClick={() => onRemove(item.productId)}
          title="Remove item"
        >
          🗑️
        </Button>
      </div>
    </div>
  );
}
