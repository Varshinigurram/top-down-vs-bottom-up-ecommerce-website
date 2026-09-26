import React, { useState, useEffect } from 'react';
import { getProductsApi } from '../services/productService';
import { ProductSearch } from '../features/catalog/ProductSearch';
import { ProductFilters } from '../features/catalog/ProductFilters';
import { ProductResultsHeader } from '../features/catalog/ProductResultsHeader';
import { ProductEmptyState } from '../features/catalog/ProductEmptyState';
import { ProductGrid } from '../components/composite/ProductGrid';
import { LoadingState, ErrorState } from '../components/primitives/FeedbackStates';

export function CatalogView({ onViewDetails, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProductsApi(search, category);
      setProducts(res?.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load product catalog.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
  };

  const handleAddToCart = async (product) => {
    setActionMessage(null);
    try {
      await onAddToCart?.(product);
      setActionMessage({
        type: 'success',
        text: `${product.name || product.title} was added to your cart.`
      });
    } catch (err) {
      setActionMessage({
        type: 'error',
        text: err.message || 'We could not add this item to your cart.'
      });
    }
  };

  return (
    <div className="view-container catalog-view">
      <div className="catalog-header-section">
        <span className="catalog-eyebrow">BOTTOM-UP APPROACH / PRODUCT CATALOG</span>
        <h1 className="view-title">Explore the catalog.</h1>
        <p className="view-subtitle">Practical products across Electronics, Home, Fashion, Accessories and Lifestyle.</p>
      </div>

      <div className="catalog-toolbar">
        <ProductSearch search={search} onSearchChange={setSearch} />
        <ProductFilters activeCategory={category} onCategoryChange={setCategory} />
      </div>

      {actionMessage && (
        <div className={`alert-banner ${actionMessage.type}`} role={actionMessage.type === 'error' ? 'alert' : 'status'}>
          {actionMessage.text}
        </div>
      )}

      {loading && <LoadingState message="Loading catalog products..." />}

      {error && (
        <ErrorState
          title="Catalog Load Error"
          message={error}
          onRetry={fetchProducts}
        />
      )}

      {!loading && !error && (
        <>
          <ProductResultsHeader
            count={products.length}
            search={search}
            category={category}
          />

          {products.length === 0 ? (
            <ProductEmptyState onResetFilters={handleResetFilters} />
          ) : (
            <ProductGrid
              products={products}
              onViewDetails={onViewDetails}
              onAddToCart={handleAddToCart}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CatalogView;
