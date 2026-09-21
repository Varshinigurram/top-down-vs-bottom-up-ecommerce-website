import React from 'react';

export function AdminDeleteConfirmation({ product, isOpen, onClose, onConfirm, isDeleting }) {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content danger-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🗑️ Confirm Product Deletion</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <p>
            Are you sure you want to delete <strong>{product.name}</strong> (ID: <code>{product.id}</code>)?
          </p>
          <div className="info-alert">
            ℹ️ <strong>Historical Order Safety:</strong> Existing placed customer orders containing this product will retain their historical order snapshots.
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
