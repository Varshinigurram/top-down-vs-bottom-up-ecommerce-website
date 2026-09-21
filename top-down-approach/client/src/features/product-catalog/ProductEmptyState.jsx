import React from 'react';

export function ProductEmptyState({ searchTerm, selectedCategory, onResetFilters }) {
  return (
    <div className="product-empty-state">
      <div className="empty-icon">🔍</div>
      <h3>No Products Found</h3>
      <p>
        We couldn't find any products matching{' '}
        {searchTerm ? <strong>"{searchTerm}"</strong> : 'your criteria'}
        {selectedCategory && selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}.
      </p>
      <button className="btn-secondary" onClick={onResetFilters}>
        Clear Filters & Search
      </button>
    </div>
  );
}
