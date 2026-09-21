import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProductById } from '../../services/productService';
import { createAdminProduct, updateAdminProduct } from '../../services/adminProductService';
import { AdminProductForm } from '../../features/administration/AdminProductForm';

export function AdminProductFormView({ productId, onNavigate }) {
  const { user, isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(Boolean(productId));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const isEditMode = Boolean(productId);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN' && isEditMode) {
      loadProduct();
    } else {
      setLoading(false);
    }
  }, [productId, isAuthenticated, user]);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError(err.message || 'Failed to load product details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (isEditMode) {
        await updateAdminProduct(productId, formData);
      } else {
        await createAdminProduct(formData);
      }
      onNavigate('admin-products');
    } catch (err) {
      setError(err.message || 'Failed to save product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="view-container">
        <div className="error-alert role-access-denied">
          <h2>🚫 Access Denied (403 Forbidden)</h2>
          <p>Administrator privileges are required to edit product details.</p>
          <button className="btn btn-primary mt-3" onClick={() => onNavigate('catalog')}>
            Return to Storefront Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="view-container admin-view-container">
      <div className="admin-header-banner">
        <div>
          <h2>{isEditMode ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
          <p className="subtitle">
            {isEditMode
              ? `Update details for product #${productId}`
              : 'Add a new product entity to the store catalog.'}
          </p>
        </div>
        <div className="admin-actions-bar">
          <button className="btn btn-outline" onClick={() => onNavigate('admin-products')}>
            ← Back to Products List
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-spinner-container">
          <div className="spinner"></div>
          <p>Loading product information...</p>
        </div>
      )}

      {error && (
        <div className="error-alert mb-4">
          ⚠️ {error}
        </div>
      )}

      {!loading && (
        <div className="admin-form-card">
          <AdminProductForm
            initialData={product}
            onSubmit={handleSubmit}
            onCancel={() => onNavigate('admin-products')}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
    </div>
  );
}
