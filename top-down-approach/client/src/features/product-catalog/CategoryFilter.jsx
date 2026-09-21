import React from 'react';

const CATEGORIES = ['All', 'Electronics', 'Home', 'Fashion', 'Accessories', 'Lifestyle'];

export function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter-group">
      <span className="filter-label">Categories:</span>
      <div className="category-pills">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
