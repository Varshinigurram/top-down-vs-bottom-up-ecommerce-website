import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProducts } from '../../services/productService';
import { deleteAdminProduct } from '../../services/adminProductService';
import { AdminProductTable } from '../../features/administration/AdminProductTable';
import { AdminDeleteConfirmation } from '../../features/administration/AdminDeleteConfirmation';

export function AdminProductsView({ onNavigate }) {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal deletion state
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN') {
      loadProducts();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    onNavigate('admin-product-edit', product.id);
  };

  const handleDeleteClick = (product) => {
    setDeletingProduct(product);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    setIsDeleting(true);
    try {
      await deleteAdminProduct(deletingProduct.id);
      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      setDeletingProduct(null);
    } catch (err) {
      alert(err.message || 'Failed to delete product.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="view-container">
        <div className="error-alert role-access-denied">
          <h2>🚫 Access Denied (403 Forbidden)</h2>
          <p>Administrator privileges are required to manage products.</p>
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
          <h2>📦 Product Management</h2>
          <p className="subtitle">View, edit, create, and remove store products.</p>
        </div>
        <div className="admin-actions-bar">
          <button className="btn btn-outline" onClick={() => onNavigate('admin-dashboard')}>
            ← Back to Dashboard
          </button>
          <button className="btn btn-primary" onClick={() => onNavigate('admin-product-new')}>
            ➕ Add New Product
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-spinner-container">
          <div className="spinner"></div>
          <p>Loading products catalog...</p>
        </div>
      )}

      {error && (
        <div className="error-alert mb-4">
          ⚠️ {error}{' '}
          <button className="btn btn-sm btn-outline ml-2" onClick={loadProducts}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <AdminProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <AdminDeleteConfirmation
        product={deletingProduct}
        isOpen={Boolean(deletingProduct)}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
