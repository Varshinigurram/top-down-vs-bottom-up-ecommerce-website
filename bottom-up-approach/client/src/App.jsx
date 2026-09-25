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
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { AdminProductsView } from './views/admin/AdminProductsView';
import { AdminProductFormView } from './views/admin/AdminProductFormView';
import { AdminOrdersView } from './views/admin/AdminOrdersView';
import { AdminOrderDetailsView } from './views/admin/AdminOrderDetailsView';
import { getCartApi } from './services/cartService';

function BottomUpAppContent() {
  const { isAuthenticated, user } = useAuth();
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

  const handleNavigate = (route, options = null) => {
    setCurrentRoute(route);
    if (typeof options === 'string' || typeof options === 'number') {
      if (route === 'product-details' || route === 'admin-product-edit') {
        setSelectedProductId(options);
      } else if (route === 'order-details' || route === 'admin-order-details') {
        setSelectedOrderId(options);
      }
    } else if (options && typeof options === 'object') {
      if (options.productId) setSelectedProductId(options.productId);
      if (options.orderId) setSelectedOrderId(options.orderId);
    }

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

  const isAdminRoute = currentRoute.startsWith('admin-');
  const isAuthorizedAdmin = user?.role === 'ADMIN';

  return (
    <div className="app-container">
      <HeaderBar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        cartCount={cartCount}
      />

      <main className="main-content">
        {/* Admin Route Guarding */}
        {isAdminRoute && !isAuthorizedAdmin ? (
          <div className="view-container access-denied-view">
            <div className="ui-card error-card">
              <h2>🚫 403 Access Forbidden</h2>
              <p>You do not have administrative privileges to access this area.</p>
              <button className="ui-button primary-button" onClick={() => handleNavigate('catalog')}>
                Return to Catalog
              </button>
            </div>
          </div>
        ) : (
          <>
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

            {/* Admin Views */}
            {currentRoute === 'admin-dashboard' && (
              <AdminDashboardView onNavigate={handleNavigate} />
            )}

            {currentRoute === 'admin-products' && (
              <AdminProductsView onNavigate={handleNavigate} />
            )}

            {currentRoute === 'admin-product-new' && (
              <AdminProductFormView onNavigate={handleNavigate} />
            )}

            {currentRoute === 'admin-product-edit' && (
              <AdminProductFormView productId={selectedProductId} onNavigate={handleNavigate} />
            )}

            {currentRoute === 'admin-orders' && (
              <AdminOrdersView onNavigate={handleNavigate} />
            )}

            {currentRoute === 'admin-order-details' && (
              <AdminOrderDetailsView orderId={selectedOrderId} onNavigate={handleNavigate} />
            )}
          </>
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
