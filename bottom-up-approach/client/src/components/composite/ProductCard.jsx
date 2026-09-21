import React from 'react';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { Badge } from '../primitives/Badge';
import { formatCurrency, formatCategory } from '../../utils/formatters';

/**
 * Bottom-Up Composite Component: Assembled from Card, Button, Badge primitives and formatters
 */
export function ProductCard({ product, onAddToCart }) {
  return (
    <Card>
      <div className="product-image-placeholder">
        {product.icon || '📦'}
      </div>
      <div>
        <Badge variant="gray">{formatCategory(product.category)}</Badge>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
      </div>
      <div className="product-footer">
        <span className="product-price">{formatCurrency(product.price)}</span>
        <Button onClick={() => onAddToCart && onAddToCart(product)}>Add to Cart</Button>
      </div>
    </Card>
  );
}
