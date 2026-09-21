import React from 'react';
import { HeaderBar } from './components/composite/HeaderBar';
import { FooterBar } from './components/composite/FooterBar';
import { CatalogPage } from './views/CatalogPage';

export function App() {
  return (
    <div className="app-container">
      <HeaderBar />
      <main className="main-content">
        <CatalogPage />
      </main>
      <FooterBar />
    </div>
  );
}

export default App;
