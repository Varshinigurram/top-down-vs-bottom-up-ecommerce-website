import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCartApi, updateCartItemApi, removeCartItemApi, clearCartApi } from '../services/cartService';
import { CartHeader } from '../features/cart/CartHeader';
import { CartActions } from '../features/cart/CartActions';
import { CartEmptyState } from '../features/cart/CartEmptyState';
import { CartItemList } from '../components/composite/CartItemList';
import { CartSummaryCard } from '../components/composite/CartSummaryCard';
import { LoadingState, ErrorState } from '../components/primitives/FeedbackStates';

export function CartView({ onNavigate, onCartUpdated }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    fetchCart();
  }, [isAuthenticated]);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCartApi();
      const cartData = res?.data || res;
      setCart(cartData);
      if (onCartUpdated) onCartUpdated();
    } catch (err) {
      setError(err.message || 'Failed to load shopping cart.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    setError(null);
    setUpdating(true);
    try {
      const res = await updateCartItemApi(productId, newQuantity);
      const updatedCart = res?.data || res;
      setCart(updatedCart);
      if (onCartUpdated) onCartUpdated();
    } catch (err) {
      setError(err.message || 'Failed to update item quantity.');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    setError(null);
    setUpdating(true);
    try {
      const res = await removeCartItemApi(productId);
      const updatedCart = res?.data || res;
      setCart(updatedCart);
      if (onCartUpdated) onCartUpdated();
    } catch (err) {
      setError(err.message || 'Failed to remove item from cart.');
    } finally {
      setUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your entire cart?')) return;

    setError(null);
    setUpdating(true);
    try {
      await clearCartApi();
      setCart({ items: [] });
      if (onCartUpdated) onCartUpdated();
    } catch (err) {
      setError(err.message || 'Failed to clear shopping cart.');
    } finally {
      setUpdating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="view-container cart-view">
        <ErrorState
          title="Authentication Required"
          message="Please sign in to view and manage your shopping cart."
        />
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('login')}>
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="view-container cart-view">
        <LoadingState message="Loading your shopping cart..." />
      </div>
    );
  }

  const items = cart?.items || [];
  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // Authoritative financial values calculated by backend
  const subtotal = items.reduce((sum, item) => sum + (item.subtotal || item.price * item.quantity), 0);
  const shipping = 0;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;

  return (
    <div className="view-container cart-view">
      <CartHeader itemCount={itemCount} />

      {error && <ErrorState title="Cart Action Error" message={error} />}

      {items.length === 0 ? (
        <CartEmptyState onBrowseCatalog={() => onNavigate && onNavigate('catalog')} />
      ) : (
        <div className="cart-content-grid">
          <div className="cart-items-section">
            <CartItemList
              items={items}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              disabled={updating}
            />
            <CartActions
              onClearCart={handleClearCart}
              onContinueShopping={() => onNavigate && onNavigate('catalog')}
              disabled={updating}
            />
          </div>

          <div className="cart-summary-section">
            <CartSummaryCard
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              onCheckout={() => onNavigate && onNavigate('checkout')}
              disabled={updating || items.length === 0}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CartView;
