import React, { useEffect, useState } from 'react';
import { ProductSearch } from '../features/product-catalog/ProductSearch';
import { CategoryFilter } from '../features/product-catalog/CategoryFilter';
import { ProductGrid } from '../features/product-catalog/ProductGrid';
import { ProductEmptyState } from '../features/product-catalog/ProductEmptyState';
import { getProducts } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function CatalogView({ onViewDetails, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
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

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      if (onNavigate) onNavigate('login');
      return;
    }
    if (!product?.id) return;
    try {
      await addItem(product.id, 1);
    } catch (err) {
      setError(err.message || 'Failed to add item to cart.');
    }
  };

  return (
    <section className="catalog-view-container">
      <header className="view-header">
        <div className="view-header-title">
          <span className="eyebrow">TOP-DOWN APPROACH / PRODUCT CATALOG</span>
          <h2>Explore the catalog.</h2>
          <p>Practical products across Electronics, Home, Fashion, Accessories and Lifestyle.</p>
        </div>
        <span className="results-count-badge">
          {loading ? 'Searching...' : `${products.length} Products Found`}
        </span>
      </header>

      <section className="catalog-intro-panel">
        <div>
          <span className="intro-kicker">E-COMMERCE CASE STUDY</span>
          <h3>Find useful products for everyday life.</h3>
          <p>Clear pricing, dependable stock and a straightforward shopping experience.</p>
        </div>
        <button className="btn-light" onClick={() => setSelectedCategory('Lifestyle')}>Explore lifestyle</button>
      </section>

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
        <ProductGrid
          products={products}
          onViewDetails={onViewDetails}
          onAddToCart={handleAddToCart}
        />
      )}
    </section>
  );
}
