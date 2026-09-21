import React from 'react';
import { Badge } from '../primitives/Badge';

/**
 * Bottom-Up Composite Component: Header composed with Badge primitive
 */
export function HeaderBar() {
  return (
    <header className="site-header">
      <h1>Bottom-Up E-Commerce Store</h1>
      <Badge variant="emerald">Bottom-Up Architecture</Badge>
    </header>
  );
}
