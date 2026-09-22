import React from 'react';
import { Badge } from '../../components/primitives/Badge';

export function ProductResultsHeader({ count, search, category }) {
  const hasFilter = (search && search.trim() !== '') || (category && category !== 'All');

  return (
    <div className="product-results-header">
      <div className="results-count-title">
        <h3>Catalog Products ({count})</h3>
      </div>
      {hasFilter && (
        <div className="active-filters-bar">
          <span className="filter-label">Filtered by:</span>
          {category && category !== 'All' && (
            <Badge variant="blue" className="filter-badge">
              Category: {category}
            </Badge>
          )}
          {search && search.trim() !== '' && (
            <Badge variant="emerald" className="filter-badge">
              Search: "{search}"
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
