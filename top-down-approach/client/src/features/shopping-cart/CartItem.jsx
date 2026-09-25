import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { QuantityControl } from './QuantityControl';

export function CartItem({ item, onUpdateQuantity, onRemove, disabled = false }) {
  return (
    <div className="cart-item-row">
      <div className="cart-item-image">
        <span className="cart-emoji">{item.image || item.icon || '📦'}</span>
      </div>

      <div className="cart-item-details">
        <span className="cart-item-category">{item.category}</span>
        <h4 className="cart-item-title">{item.name}</h4>
        <span className="cart-item-unit-price">{formatCurrency(item.price)} each</span>
      </div>

      <div className="cart-item-quantity">
        <QuantityControl
          quantity={item.quantity}
          onIncrease={() => onUpdateQuantity(item.productId, item.quantity + 1)}
          onDecrease={() => onUpdateQuantity(item.productId, item.quantity - 1)}
          disabled={disabled}
        />
      </div>

      <div className="cart-item-subtotal">
        <span className="subtotal-amount">{formatCurrency(item.subtotal)}</span>
      </div>

      <div className="cart-item-action">
        <button
          className="btn-remove-item"
          onClick={() => onRemove(item.productId)}
          disabled={disabled}
          title="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
