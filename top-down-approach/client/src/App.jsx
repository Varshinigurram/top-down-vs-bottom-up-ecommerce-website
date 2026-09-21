import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatalogView } from './views/CatalogView';

export function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <CatalogView />
      </main>
      <Footer />
    </div>
  );
}

export default App;
