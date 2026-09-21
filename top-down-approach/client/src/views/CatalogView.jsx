import React, { useEffect, useState } from 'react';
import { ProductSearch } from '../features/product-catalog/ProductSearch';
import { CategoryFilter } from '../features/product-catalog/CategoryFilter';
import { ProductGrid } from '../features/product-catalog/ProductGrid';
import { ProductEmptyState } from '../features/product-catalog/ProductEmptyState';
import { getProducts } from '../services/productService';

export function CatalogView({ onViewDetails }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchCatalog = (search, category) => {
    setLoading(true);
    setError(null);

    getProducts(search, category)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch catalog.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCatalog(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <section className="catalog-view-container">
      <header className="view-header">
        <div className="view-header-title">
          <h2>Product Catalog & Discovery</h2>
          <p>Top-Down View: System specs decompose into search, filtering, grid modules, and product detail navigation.</p>
        </div>
        <span className="results-count-badge">
          {loading ? 'Searching...' : `${products.length} Products Found`}
        </span>
      </header>

      <div className="catalog-controls-card">
        <ProductSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={(term) => fetchCatalog(term, selectedCategory)}
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      <div className="status-banner">
        <strong>Design Pattern Note:</strong> Designed Top-Down starting from system-level requirements down to REST query params (`?search=${searchTerm}&category=${selectedCategory}`) and component trees.
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Filtering and fetching store inventory...</p>
        </div>
      )}

      {error && (
        <div className="alert-banner error">
          <p>Error loading product catalog: {error}</p>
          <button className="btn-secondary" onClick={() => fetchCatalog(searchTerm, selectedCategory)}>
            Retry Query
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <ProductEmptyState
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onResetFilters={handleResetFilters}
        />
      )}

      {!loading && !error && products.length > 0 && (
        <ProductGrid products={products} onViewDetails={onViewDetails} />
      )}
    </section>
  );
}
