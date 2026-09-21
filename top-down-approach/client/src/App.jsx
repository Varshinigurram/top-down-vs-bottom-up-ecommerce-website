import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatalogView } from './views/CatalogView';
import { ProductDetailsView } from './views/ProductDetailsView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrdersView } from './views/OrdersView';
import { OrderDetailsView } from './views/OrderDetailsView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';

function TopDownAppContent() {
  const [currentView, setCurrentView] = useState('catalog');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleNavigate = (viewName, paramId = null) => {
    setCurrentView(viewName);
    if (viewName === 'product-details') {
      setSelectedProductId(paramId);
    } else if (viewName === 'order-details') {
      setSelectedOrderId(paramId);
    }
  };

  const handleViewProductDetails = (id) => {
    setSelectedProductId(id);
    setCurrentView('product-details');
  };

  return (
    <div className="app-container">
      <Header currentView={currentView} onNavigate={handleNavigate} />
      <main className="main-content">
        {currentView === 'catalog' && (
          <CatalogView onViewDetails={handleViewProductDetails} />
        )}
        {currentView === 'product-details' && (
          <ProductDetailsView
            productId={selectedProductId}
            onBackToCatalog={() => setCurrentView('catalog')}
            onNavigate={handleNavigate}
          />
        )}
        {currentView === 'cart' && <CartView onNavigate={handleNavigate} />}
        {currentView === 'checkout' && <CheckoutView onNavigate={handleNavigate} />}
        {currentView === 'orders' && <OrdersView onNavigate={handleNavigate} />}
        {currentView === 'order-details' && (
          <OrderDetailsView orderId={selectedOrderId} onNavigate={handleNavigate} />
        )}
        {currentView === 'login' && <LoginView onNavigate={handleNavigate} />}
        {currentView === 'register' && <RegisterView onNavigate={handleNavigate} />}
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <TopDownAppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
