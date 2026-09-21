import React from 'react';
import { CartItem } from './CartItem';

export function CartItemList({ items, onUpdateQuantity, onRemoveItem, onClearCart, loading = false }) {
  return (
    <div className="cart-item-list-card">
      <div className="cart-list-header">
        <h3>Items in Your Shopping Cart ({items.length})</h3>
        <button
          className="btn-clear-cart"
          onClick={onClearCart}
          disabled={loading || items.length === 0}
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-items-container">
        {items.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveItem}
            disabled={loading}
          />
        ))}
      </div>
    </div>
  );
}
