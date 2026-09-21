import { findAllProducts } from '../repositories/product.repository.js';
import { findAllOrders } from '../repositories/order.repository.js';
import { ORDER_STATUS } from '../models/order.model.js';

/**
 * Calculates operational statistics for the Admin Dashboard.
 */
export async function getAdminDashboardStats() {
  const products = await findAllProducts();
  const orders = await findAllOrders();

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === ORDER_STATUS.PENDING).length;
  const lowStockProducts = products.filter((p) => p.stock < 10).length;

  return {
    totalProducts,
    totalOrders,
    pendingOrders,
    lowStockProducts
  };
}
