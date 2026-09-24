import React from 'react';
import { Badge } from '../../components/primitives/Badge';

export function CartHeader({ itemCount = 0 }) {
  return (
    <div className="cart-header-feature">
      <div className="cart-title-row">
        <h1 className="view-title">Shopping Cart</h1>
        <Badge variant={itemCount > 0 ? 'emerald' : 'gray'}>
          {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
        </Badge>
      </div>
      <p className="view-subtitle">Review items in your cart, adjust quantities, or proceed to checkout.</p>
    </div>
  );
}
