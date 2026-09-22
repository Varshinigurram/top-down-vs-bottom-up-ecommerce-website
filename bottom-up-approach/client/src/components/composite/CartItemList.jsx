import React from 'react';
import { CartItemRow } from './CartItemRow';
import { EmptyState } from '../primitives/FeedbackStates';

export function CartItemList({ items = [], onUpdateQuantity, onRemove }) {
  if (!items || items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your Cart is Empty"
        message="Browse our catalog to add products to your shopping cart."
      />
    );
  }

  return (
    <div className="cart-item-list">
      {items.map((item) => (
        <CartItemRow
          key={item.productId}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
