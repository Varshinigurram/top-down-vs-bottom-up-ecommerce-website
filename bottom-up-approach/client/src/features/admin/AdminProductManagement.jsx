import React, { useState, useEffect } from 'react';
import { getProductsApi } from '../../services/productService';
import { deleteProductApi } from '../../services/adminService';
import { ProductAdminTable } from '../../components/composite/ProductAdminTable';
import { Button } from '../../components/primitives/Button';

const PRODUCT_CATEGORIES = ['Electronics', 'Home', 'Fashion', 'Accessories', 'Lifestyle'];

export function AdminProductManagement({ onNavigate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...(PRODUCT_CATEGORIES || ['Electronics', 'Home', 'Fashion', 'Accessories', 'Lifestyle'])];

  useEffect(() => {
    loadProducts();
  }, [searchTerm, selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getProductsApi(searchTerm, selectedCategory);
      if (res.success) {
        setProducts(res.data || []);
      } else {
        setError(res.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId) => {
    onNavigate('admin-product-edit', { productId });
  };

  const handleDelete = async (productId, productName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete product "${productName}" (ID: ${productId})?\n\nNote: Historical orders containing this product will not be affected.`);
    if (!confirmDelete) return;

    try {
      setError(null);
      setSuccessMessage(null);
      const res = await deleteProductApi(productId);
      if (res.success) {
        setSuccessMessage(res.message || `Product deleted successfully.`);
        await loadProducts();
      } else {
        setError(res.message || 'Failed to delete product.');
      }
    } catch (err) {
      setError(err.message || 'Error deleting product.');
    }
  };

  return (
    <div className="admin-product-management-container">
      <div className="management-header-row">
        <div>
          <h2>Product Catalog Administration</h2>
          <p className="text-muted">Manage store product inventory, details, pricing, and stock.</p>
        </div>
        <Button variant="primary" onClick={() => onNavigate('admin-product-new')}>
          ➕ Add New Product
        </Button>
      </div>

      {successMessage && <div className="alert-banner alert-success">{successMessage}</div>}
      {error && <div className="alert-banner alert-danger">{error}</div>}

      {/* Search and Category Filter Toolbar */}
      <div className="ui-card admin-filter-toolbar">
        <div className="filter-item">
          <label htmlFor="adminSearch">Search Products:</label>
          <input
            id="adminSearch"
            type="text"
            className="ui-input"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="adminCategory">Category:</label>
          <select
            id="adminCategory"
            className="ui-input select-input"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="loading-state">Loading products...</p>
      ) : (
        <ProductAdminTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
