import { findAllProducts } from '../repositories/product.repository.js';
import { findAllOrders } from '../repositories/order.repository.js';
import { ORDER_STATUS } from '../constants/domain.constants.js';

/**
 * Administrative Dashboard Statistics Service
 */
export async function getAdminDashboardStatsService() {
  const products = await findAllProducts();
  const orders = await findAllOrders();

  const totalProducts = products.length;
  const totalOrders = orders.length;

  const ordersByStatus = {
    [ORDER_STATUS.PENDING]: 0,
    [ORDER_STATUS.CONFIRMED]: 0,
    [ORDER_STATUS.SHIPPED]: 0,
    [ORDER_STATUS.DELIVERED]: 0,
    [ORDER_STATUS.CANCELLED]: 0
  };

  orders.forEach((o) => {
    if (ordersByStatus[o.status] !== undefined) {
      ordersByStatus[o.status] += 1;
    }
  });

  const lowStockProducts = products.filter((p) => Number(p.stock) <= 5);

  return {
    totalProducts,
    totalOrders,
    ordersByStatus,
    lowStockCount: lowStockProducts.length,
    lowStockProducts
  };
}
