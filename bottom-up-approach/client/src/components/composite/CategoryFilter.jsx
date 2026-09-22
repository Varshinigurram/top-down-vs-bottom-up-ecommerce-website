import React from 'react';
import { Button } from '../primitives/Button';

const CATEGORIES = ['All', 'Electronics', 'Home', 'Fashion', 'Accessories', 'Lifestyle'];

export function CategoryFilter({ selectedCategory = 'All', onSelectCategory }) {
  return (
    <div className="category-filter-bar" role="group" aria-label="Category filter">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
        return (
          <Button
            key={cat}
            variant={isSelected ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </Button>
        );
      })}
    </div>
  );
}
