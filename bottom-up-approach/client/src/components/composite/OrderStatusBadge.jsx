import React from 'react';
import { Badge } from '../primitives/Badge';
import { getStatusBadgeVariant, getStatusLabel } from '../../utils/statusHelpers';

export function OrderStatusBadge({ status }) {
  const variant = getStatusBadgeVariant(status);
  const label = getStatusLabel(status);

  return <Badge variant={variant}>{label}</Badge>;
}
