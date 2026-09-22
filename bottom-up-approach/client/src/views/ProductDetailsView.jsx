import React, { useState, useEffect } from 'react';
import { getProductByIdApi } from '../services/productService';
import { ProductDetailsContent } from '../features/product-details/ProductDetailsContent';
import { Button } from '../components/primitives/Button';
import { LoadingState, ErrorState, EmptyState } from '../components/primitives/FeedbackStates';

export function ProductDetailsView({ productId, onBackToCatalog, onNavigate }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!productId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    setNotFound(false);

    try {
      const res = await getProductByIdApi(productId);
      if (res && res.data) {
        setProduct(res.data);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      if (err.status === 404 || err.message?.includes('not found')) {
        setNotFound(true);
      } else {
        setError(err.message || 'Failed to fetch product details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-container product-details-view">
      <div className="details-navigation-bar">
        <Button variant="outline" size="sm" onClick={onBackToCatalog}>
          ← Back to Catalog
        </Button>
      </div>

      {loading && <LoadingState message="Loading product details..." />}

      {notFound && (
        <EmptyState
          icon="📦"
          title="Product Not Found"
          message={`The requested product (ID: '${productId}') could not be located in our catalog.`}
        />
      )}

      {error && !notFound && (
        <ErrorState
          title="Failed to Load Product"
          message={error}
        />
      )}

      {!loading && !error && !notFound && product && (
        <ProductDetailsContent
          product={product}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}

export default ProductDetailsView;
