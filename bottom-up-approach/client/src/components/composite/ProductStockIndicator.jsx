import React from 'react';
import { Badge } from '../primitives/Badge';

export function ProductStockIndicator({ stock }) {
  const count = Number(stock || 0);
  if (count <= 0) {
    return <Badge variant="danger">Out of Stock</Badge>;
  }
  if (count < 10) {
    return <Badge variant="warning">{count} Left</Badge>;
  }
  return <Badge variant="success">In Stock ({count})</Badge>;
}
