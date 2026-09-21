import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatalogView } from './views/CatalogView';
import { ProductDetailsView } from './views/ProductDetailsView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';

function TopDownAppContent() {
  const [currentView, setCurrentView] = useState('catalog');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleNavigate = (viewName, productId = null) => {
    setCurrentView(viewName);
    if (productId) {
      setSelectedProductId(productId);
    }
  };

  const handleViewDetails = (id) => {
    setSelectedProductId(id);
    setCurrentView('product-details');
  };

  return (
    <div className="app-container">
      <Header currentView={currentView} onNavigate={handleNavigate} />
      <main className="main-content">
        {currentView === 'catalog' && (
          <CatalogView onViewDetails={handleViewDetails} />
        )}
        {currentView === 'product-details' && (
          <ProductDetailsView
            productId={selectedProductId}
            onBackToCatalog={() => setCurrentView('catalog')}
          />
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
      <TopDownAppContent />
    </AuthProvider>
  );
}

export default App;
