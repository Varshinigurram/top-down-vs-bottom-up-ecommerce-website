import React from 'react';
import { AuthStatus } from '../features/authentication/AuthStatus';

export function Header({ currentView, onNavigate }) {
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
        <AuthStatus onNavigate={onNavigate} />
      </nav>
    </header>
  );
}
