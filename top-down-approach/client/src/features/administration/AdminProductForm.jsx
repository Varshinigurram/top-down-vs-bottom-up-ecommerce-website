import React, { useState, useEffect } from 'react';

const CATEGORIES = ['Electronics', 'Accessories', 'Fashion', 'Lifestyle', 'Home'];

export function AdminProductForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    image: '📦',
    stock: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price !== undefined ? String(initialData.price) : '',
        category: initialData.category || 'Electronics',
        image: initialData.image || '📦',
        stock: initialData.stock !== undefined ? String(initialData.stock) : ''
      });
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!formData.name || !formData.name.trim()) {
      errs.name = 'Product name is required.';
    }

    if (!formData.description || !formData.description.trim()) {
      errs.description = 'Product description is required.';
    }

    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      errs.price = 'Price must be a number greater than 0.';
    }

    if (!formData.category || !formData.category.trim()) {
      errs.category = 'Category is required.';
    }

    const stockNum = parseInt(formData.stock, 10);
    if (isNaN(stockNum) || stockNum < 0 || String(stockNum) !== formData.stock.trim()) {
      errs.stock = 'Stock must be a non-negative integer.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10)
    });
  };

  return (
    <form className="admin-product-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="prod-name">Product Name *</label>
        <input
          id="prod-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
          placeholder="e.g. Ergonomic Bluetooth Headphones"
          disabled={isSubmitting}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-row-two">
        <div className="form-group">
          <label htmlFor="prod-price">Price (INR) *</label>
          <input
            id="prod-price"
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? 'input-error' : ''}
            placeholder="e.g. 49.99"
            disabled={isSubmitting}
          />
          {errors.price && <span className="error-text">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="prod-stock">Stock Quantity *</label>
          <input
            id="prod-stock"
            type="number"
            step="1"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className={errors.stock ? 'input-error' : ''}
            placeholder="e.g. 25"
            disabled={isSubmitting}
          />
          {errors.stock && <span className="error-text">{errors.stock}</span>}
        </div>
      </div>

      <div className="form-row-two">
        <div className="form-group">
          <label htmlFor="prod-category">Category *</label>
          <select
            id="prod-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'input-error' : ''}
            disabled={isSubmitting}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-text">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="prod-image">Image Emoji / Icon</label>
          <input
            id="prod-image"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="e.g. 🎧 or image URL"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="prod-desc">Description *</label>
        <textarea
          id="prod-desc"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'input-error' : ''}
          placeholder="Detailed description of product features..."
          disabled={isSubmitting}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
