import React from 'react';

export function AdminProductTable({ products, onEdit, onDelete }) {
  if (!products || products.length === 0) {
    return (
      <div className="empty-state-card">
        <span className="empty-icon">📦</span>
        <h3>No Products Found</h3>
        <p>No products exist in the catalog yet.</p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrapper">
      <table className="admin-data-table desktop-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="product-img-cell">{product.image || '📦'}</td>
              <td className="product-name-cell">
                <strong>{product.name}</strong>
                <span className="product-id-sub">ID: {product.id}</span>
              </td>
              <td>
                <span className="category-pill">{product.category}</span>
              </td>
              <td className="product-price-cell">\${Number(product.price).toFixed(2)}</td>
              <td>
                <span className={`stock-badge ${product.stock < 10 ? 'stock-low' : 'stock-ok'}`}>
                  {product.stock} left
                </span>
              </td>
              <td className="actions-cell">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => onEdit(product)}
                  title="Edit Product"
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-sm btn-danger-outline"
                  onClick={() => onDelete(product)}
                  title="Delete Product"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile-Friendly Cards Fallback */}
      <div className="admin-cards-mobile">
        {products.map((product) => (
          <div className="admin-mobile-card" key={product.id}>
            <div className="mobile-card-header">
              <span className="product-img-cell">{product.image || '📦'}</span>
              <div>
                <strong>{product.name}</strong>
                <span className="product-id-sub">ID: {product.id}</span>
              </div>
            </div>
            <div className="mobile-card-details">
              <div>Category: <span className="category-pill">{product.category}</span></div>
              <div>Price: <strong>\${Number(product.price).toFixed(2)}</strong></div>
              <div>
                Stock:{' '}
                <span className={`stock-badge ${product.stock < 10 ? 'stock-low' : 'stock-ok'}`}>
                  {product.stock} left
                </span>
              </div>
            </div>
            <div className="mobile-card-actions">
              <button className="btn btn-sm btn-outline" onClick={() => onEdit(product)}>
                ✏️ Edit
              </button>
              <button className="btn btn-sm btn-danger-outline" onClick={() => onDelete(product)}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
