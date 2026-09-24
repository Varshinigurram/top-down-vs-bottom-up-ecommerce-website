import React from 'react';
import { Button } from '../../components/primitives/Button';
import { EmptyState } from '../../components/primitives/FeedbackStates';

export function CartEmptyState({ onBrowseCatalog }) {
  return (
    <div className="cart-empty-state-feature">
      <EmptyState
        icon="🛒"
        title="Your Shopping Cart is Empty"
        message="You haven't added any products to your cart yet. Explore our product catalog to start shopping."
      />
      {onBrowseCatalog && (
        <div className="empty-state-actions">
          <Button variant="primary" onClick={onBrowseCatalog}>
            Browse Product Catalog
          </Button>
        </div>
      )}
    </div>
  );
}
