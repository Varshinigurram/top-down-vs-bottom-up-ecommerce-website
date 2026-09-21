import React from 'react';
import { AuthStatus } from '../features/authentication/AuthStatus';
import { useCart } from '../context/CartContext';

export function Header({ currentView, onNavigate }) {
  const { cartItemCount } = useCart();

  return (
    <header className="site-header">
      <div className="header-brand" onClick={() => onNavigate('catalog')}>
        <h1>Top-Down E-Commerce Store</h1>
        <span className="badge-paradigm">Top-Down Architecture</span>
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
          🛒 Cart
          {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>}
        </button>

        <AuthStatus onNavigate={onNavigate} />
      </nav>
    </header>
  );
}
