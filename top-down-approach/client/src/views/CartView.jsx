import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CartItemList } from '../features/shopping-cart/CartItemList';
import { CartSummary } from '../features/shopping-cart/CartSummary';
import { EmptyCart } from '../features/shopping-cart/EmptyCart';

export function CartView({ onNavigate }) {
  const { isAuthenticated } = useAuth();
  const { cart, loading, error, updateQuantity, removeItem, clearCart } = useCart();

  if (!isAuthenticated) {
    return (
      <section className="cart-view-container">
        <header className="view-header">
          <h2>Shopping Cart</h2>
          <p>Please authenticate to access your personal cart session.</p>
        </header>

        <div className="auth-form-card" style={{ textAlign: 'center' }}>
          <h3>Authentication Required</h3>
          <p className="auth-subtitle">Sign in to view your items, adjust quantities, and manage your cart.</p>
          <button className="btn-primary btn-block" onClick={() => onNavigate('login')}>
            Sign In to View Cart
          </button>
        </div>
      </section>
    );
  }

  const hasItems = cart && Array.isArray(cart.items) && cart.items.length > 0;

  return (
    <section className="cart-view-container">
      <header className="view-header">
        <div>
          <h2>Your Shopping Cart</h2>
          <p>Review your selected essentials before placing your order.</p>
        </div>
        <button className="btn-secondary" onClick={() => onNavigate('catalog')}>
          ← Continue Shopping
        </button>
      </header>

      {error && <div className="alert-banner error">{error}</div>}

      {!hasItems ? (
        <EmptyCart onContinueShopping={() => onNavigate('catalog')} />
      ) : (
        <div className="cart-layout-grid">
          <div className="cart-items-column">
            <CartItemList
              items={cart.items}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onClearCart={clearCart}
              loading={loading}
            />
          </div>

          <div className="cart-summary-column">
            <CartSummary
              totalItems={cart.totalItems}
              subtotal={cart.subtotal}
              onProceedToCheckout={() => onNavigate('checkout')}
            />
          </div>
        </div>
      )}
    </section>
  );
}
