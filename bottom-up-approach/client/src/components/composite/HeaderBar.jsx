import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { UserMenuBar } from './UserMenuBar';
import { CartBadgeIndicator } from './CartBadgeIndicator';

export function HeaderBar({ currentRoute = 'catalog', onNavigate, cartCount = 0 }) {
  const { isAuthenticated } = useAuth();

  return (
    <header className="site-header">
      <div className="header-brand-section" onClick={() => onNavigate && onNavigate('catalog')}>
        <span className="brand-logo">🛍️</span>
        <h1 className="brand-title">Bottom-Up Store</h1>
        <Badge variant="emerald">Bottom-Up Architecture</Badge>
      </div>

      <nav className="header-nav">
        <Button
          variant={currentRoute === 'catalog' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onNavigate && onNavigate('catalog')}
        >
          Catalog
        </Button>

        {isAuthenticated && (
          <Button
            variant={currentRoute === 'orders' || currentRoute === 'order-details' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onNavigate && onNavigate('orders')}
          >
            📦 My Orders
          </Button>
        )}

        <CartBadgeIndicator
          count={cartCount}
          isActive={currentRoute === 'cart'}
          onClick={() => onNavigate && onNavigate('cart')}
        />

        <UserMenuBar onNavigate={onNavigate} />
      </nav>
    </header>
  );
}

export default HeaderBar;
