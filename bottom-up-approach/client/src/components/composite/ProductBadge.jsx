import React from 'react';
import { Badge } from '../primitives/Badge';
import { formatCategory } from '../../utils/formatters';

export function ProductBadge({ category }) {
  return <Badge variant="default">{formatCategory(category)}</Badge>;
}
