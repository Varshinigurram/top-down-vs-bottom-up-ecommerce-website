/**
 * Order Status Display Helpers
 */

export function getStatusBadgeVariant(status) {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'CONFIRMED':
      return 'primary';
    case 'SHIPPED':
      return 'info';
    case 'DELIVERED':
      return 'success';
    case 'CANCELLED':
      return 'danger';
    default:
      return 'default';
  }
}

export function getStatusLabel(status) {
  switch (status) {
    case 'PENDING':
      return '⏳ Pending';
    case 'CONFIRMED':
      return '✅ Confirmed';
    case 'SHIPPED':
      return '🚚 Shipped';
    case 'DELIVERED':
      return '📦 Delivered';
    case 'CANCELLED':
      return '❌ Cancelled';
    default:
      return status || 'Unknown';
  }
}
