import React, { useState, useEffect } from 'react';
import { getProductByIdApi } from '../../services/productService';
import { createProductApi, updateProductApi } from '../../services/adminService';
import { Button } from '../../components/primitives/Button';

const CATEGORIES = ['Electronics', 'Home', 'Fashion', 'Accessories', 'Lifestyle'];

export function AdminProductForm({ productId, onNavigate }) {
  const isEditMode = Boolean(productId);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: CATEGORIES[0],
    image: '📦'
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getProductByIdApi(productId);
      if (res.success && res.data) {
        setFormData({
          name: res.data.name || '',
          description: res.data.description || '',
          price: res.data.price !== undefined ? String(res.data.price) : '',
          stock: res.data.stock !== undefined ? String(res.data.stock) : '',
          category: res.data.category || CATEGORIES[0],
          image: res.data.image || '📦'
        });
      } else {
        setError(res.message || 'Product not found');
      }
    } catch (err) {
      setError(err.message || 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic client validation
    if (!formData.name.trim()) {
      setError('Product name is required.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Product description is required.');
      return;
    }
    const priceNum = Number(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Price must be a positive number greater than zero.');
      return;
    }
    const stockNum = Number(formData.stock);
    if (isNaN(stockNum) || !Number.isInteger(stockNum) || stockNum < 0) {
      setError('Stock must be a non-negative integer.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: priceNum,
      stock: stockNum,
      category: formData.category,
      image: formData.image.trim() || '📦'
    };

    try {
      setSubmitting(true);
      let res;
      if (isEditMode) {
        res = await updateProductApi(productId, payload);
      } else {
        res = await createProductApi(payload);
      }

      if (res.success || res.data) {
        onNavigate('admin-products');
      } else {
        setError(res.message || 'Operation failed.');
      }
    } catch (err) {
      setError(err.message || 'Error saving product.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-product-form-container">
        <h2>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
        <p className="loading-state">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="admin-product-form-container">
      <div className="form-header-row">
        <h2>{isEditMode ? `Edit Product (ID: ${productId})` : 'Add New Product'}</h2>
        <Button variant="secondary" size="sm" onClick={() => onNavigate('admin-products')}>
          ⬅️ Back to Products
        </Button>
      </div>

      {error && <div className="alert-banner alert-danger">{error}</div>}

      <div className="ui-card form-card">
        <form onSubmit={handleSubmit} className="admin-product-form">
          <div className="form-group">
            <label htmlFor="prodName">Product Name *</label>
            <input
              id="prodName"
              name="name"
              type="text"
              className="ui-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Ergonomic Mouse"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prodDescription">Description *</label>
            <textarea
              id="prodDescription"
              name="description"
              className="ui-input textarea-input"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide product features, details, and specifications..."
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group col-half">
              <label htmlFor="prodPrice">Price (INR) *</label>
              <input
                id="prodPrice"
                name="price"
                type="number"
                step="0.01"
                min="0.01"
                className="ui-input"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 3499"
                required
              />
            </div>

            <div className="form-group col-half">
              <label htmlFor="prodStock">Stock Quantity *</label>
              <input
                id="prodStock"
                name="stock"
                type="number"
                min="0"
                step="1"
                className="ui-input"
                value={formData.stock}
                onChange={handleChange}
                placeholder="25"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-half">
              <label htmlFor="prodCategory">Category *</label>
              <select
                id="prodCategory"
                name="category"
                className="ui-input select-input"
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-half">
              <label htmlFor="prodImage">Image / Icon *</label>
              <input
                id="prodImage"
                name="image"
                type="text"
                className="ui-input"
                value={formData.image}
                onChange={handleChange}
                placeholder="Emoji or Image URL (e.g. 🎧)"
              />
            </div>
          </div>

          <div className="form-actions-row">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onNavigate('admin-products')}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
