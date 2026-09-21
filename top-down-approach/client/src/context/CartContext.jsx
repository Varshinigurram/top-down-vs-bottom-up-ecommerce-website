import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as cartService from '../services/cartService';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], totalItems: 0, subtotal: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCart = async () => {
    if (!isAuthenticated) {
      setCart({ items: [], totalItems: 0, subtotal: 0 });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await cartService.fetchCart();
      if (res.success && res.data) {
        setCart(res.data);
      }
    } catch (err) {
      console.warn('[CartContext] Failed to load cart:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [isAuthenticated]);

  const addItem = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required');
    }

    try {
      setLoading(true);
      setError(null);
      const res = await cartService.addToCart(productId, quantity);
      if (res.success && res.data) {
        setCart(res.data);
        return res.data;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);
      const res = await cartService.updateCartQuantity(productId, quantity);
      if (res.success && res.data) {
        setCart(res.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);
      const res = await cartService.removeCartItem(productId);
      if (res.success && res.data) {
        setCart(res.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);
      const res = await cartService.clearCart();
      if (res.success && res.data) {
        setCart(res.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart,
    cartItemCount: cart.totalItems || 0,
    loading,
    error,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart: loadCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
