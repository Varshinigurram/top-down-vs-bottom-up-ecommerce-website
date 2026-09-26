import React from 'react';
import { AuthStatus } from '../features/authentication/AuthStatus';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function Header({ currentView, onNavigate }) {
  const { user, isAuthenticated } = useAuth();
  const { cartItemCount } = useCart();

  const isAdmin = isAuthenticated && user?.role === 'ADMIN';

  return (
    <header className="site-header">
      <div className="header-brand" onClick={() => onNavigate('catalog')}>
        <span className="brand-mark" aria-hidden="true">E</span>
        <div className="brand-copy">
          <h1>E-Commerce Application</h1>
          <span className="badge-paradigm" title="Case study implementation">Top-Down Approach</span>
        </div>
      </div>

      <nav className="header-nav">
        <button
          className={`nav-btn ${currentView === 'catalog' ? 'active' : ''}`}
          onClick={() => onNavigate('catalog')}
        >
          Catalog
        </button>

        <button
          className={`nav-btn nav-cart-btn ${currentView === 'cart' ? 'active' : ''}`}
          onClick={() => onNavigate('cart')}
        >
          Cart
          {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>}
        </button>

        {isAuthenticated && (
          <button
            className={`nav-btn ${currentView === 'orders' || currentView === 'order-details' ? 'active' : ''}`}
            onClick={() => onNavigate('orders')}
          >
            Orders
          </button>
        )}

        {isAdmin && (
          <button
            className={`nav-btn btn-admin-nav ${currentView.startsWith('admin') ? 'active' : ''}`}
            onClick={() => onNavigate('admin-dashboard')}
          >
            Admin
          </button>
        )}

        <AuthStatus onNavigate={onNavigate} />
      </nav>
    </header>
  );
}
