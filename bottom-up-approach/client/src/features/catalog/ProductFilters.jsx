import React from 'react';
import { CategoryFilter } from '../../components/composite/CategoryFilter';

const CATEGORIES = ['All', 'Electronics', 'Home', 'Fashion', 'Accessories', 'Lifestyle'];

export function ProductFilters({ activeCategory, onCategoryChange }) {
  return (
    <div className="product-filters-feature">
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={activeCategory}
        onSelectCategory={onCategoryChange}
      />
    </div>
  );
}
