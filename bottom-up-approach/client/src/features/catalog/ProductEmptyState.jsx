import React from 'react';
import { Button } from '../../components/primitives/Button';
import { EmptyState } from '../../components/primitives/FeedbackStates';

export function ProductEmptyState({ onResetFilters }) {
  return (
    <div className="product-empty-state-feature">
      <EmptyState
        title="No Products Found"
        message="No products matched your search or category filter criteria. Try adjusting your search query or clear active filters."
      />
      {onResetFilters && (
        <div className="empty-state-actions">
          <Button variant="secondary" onClick={onResetFilters}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
