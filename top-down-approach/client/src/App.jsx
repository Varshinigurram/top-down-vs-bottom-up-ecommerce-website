import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatalogView } from './views/CatalogView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';

function TopDownAppContent() {
  const [currentView, setCurrentView] = useState('catalog');

  const handleNavigate = (viewName) => {
    setCurrentView(viewName);
  };

  return (
    <div className="app-container">
      <Header currentView={currentView} onNavigate={handleNavigate} />
      <main className="main-content">
        {currentView === 'catalog' && <CatalogView />}
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
