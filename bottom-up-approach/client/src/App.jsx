import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HeaderBar } from './components/composite/HeaderBar';
import { FooterBar } from './components/composite/FooterBar';
import { CatalogView } from './views/CatalogView';
import { ProductDetailsView } from './views/ProductDetailsView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrdersView } from './views/OrdersView';
import { OrderDetailsView } from './views/OrderDetailsView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { getCartApi } from './services/cartService';

function BottomUpAppContent() {
  const { isAuthenticated } = useAuth();
  const [currentRoute, setCurrentRoute] = useState('catalog');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [isAuthenticated]);

  const fetchCartCount = async () => {
    try {
      const res = await getCartApi();
      const cart = res?.data || res;
      if (cart && cart.items) {
        const totalQty = cart.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
        setCartCount(totalQty);
      } else {
        setCartCount(0);
      }
    } catch (err) {
      setCartCount(0);
    }
  };

  const handleNavigate = (route, paramId = null) => {
    setCurrentRoute(route);
    if (route === 'product-details') {
      setSelectedProductId(paramId);
    } else if (route === 'order-details') {
      setSelectedOrderId(paramId);
    }
    // Refresh cart badge count on navigation
    if (isAuthenticated) {
      fetchCartCount();
    }
  };

  const handleViewProductDetails = (id) => {
    setSelectedProductId(id);
    setCurrentRoute('product-details');
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      fetchCartCount();
    }
  };

  const handleOrderPlaced = () => {
    fetchCartCount();
  };

  return (
    <div className="app-container">
      <HeaderBar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        cartCount={cartCount}
      />

      <main className="main-content">
        {currentRoute === 'catalog' && (
          <CatalogView
            onViewDetails={handleViewProductDetails}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentRoute === 'product-details' && (
          <ProductDetailsView
            productId={selectedProductId}
            onBackToCatalog={() => setCurrentRoute('catalog')}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'cart' && (
          <CartView
            onNavigate={handleNavigate}
            onCartUpdated={fetchCartCount}
          />
        )}

        {currentRoute === 'checkout' && (
          <CheckoutView
            onNavigate={handleNavigate}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {currentRoute === 'orders' && (
          <OrdersView onNavigate={handleNavigate} />
        )}

        {currentRoute === 'order-details' && (
          <OrderDetailsView
            orderId={selectedOrderId}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'login' && (
          <LoginView onNavigate={handleNavigate} />
        )}

        {currentRoute === 'register' && (
          <RegisterView onNavigate={handleNavigate} />
        )}
      </main>

      <FooterBar />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <BottomUpAppContent />
    </AuthProvider>
  );
}

export default App;
