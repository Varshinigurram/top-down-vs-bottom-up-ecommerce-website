import React from 'react';
import { ProductCatalogContainer } from '../containers/ProductCatalogContainer';

/**
 * Bottom-Up View: Full page composed from ProductCatalogContainer primitive
 */
export function CatalogPage() {
  return (
    <section className="catalog-view">
      <header className="view-header">
        <h2>Product Catalog</h2>
        <p>Bottom-Up View: Assembled upward from atomic primitives, formatters, composite cards, and container elements.</p>
      </header>

      <div className="status-banner">
        <strong>Design Pattern Note:</strong> Built Bottom-Up starting from atomic primitives (Button, Card, Badge, formatters) aggregating into ProductCard and ProductCatalogContainer.
      </div>

      <ProductCatalogContainer />
    </section>
  );
}
