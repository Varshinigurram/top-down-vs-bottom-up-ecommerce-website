import { Router } from 'express';
import { authenticateUser, requireRole } from '../middleware/auth.middleware.js';
import {
  handleGetAdminDashboard,
  handleAdminCreateProduct,
  handleAdminUpdateProduct,
  handleAdminDeleteProduct,
  handleGetAllOrdersAdmin,
  handleGetOrderByIdAdmin,
  handleUpdateOrderStatusAdmin
} from '../controllers/admin.controller.js';

const router = Router();

// Protect all admin endpoints with authentication and ADMIN role check
router.use(authenticateUser, requireRole('ADMIN'));

router.get('/admin/dashboard', handleGetAdminDashboard);
router.post('/admin/products', handleAdminCreateProduct);
router.put('/admin/products/:id', handleAdminUpdateProduct);
router.delete('/admin/products/:id', handleAdminDeleteProduct);

router.get('/admin/orders', handleGetAllOrdersAdmin);
router.get('/admin/orders/:id', handleGetOrderByIdAdmin);
router.patch('/admin/orders/:id/status', handleUpdateOrderStatusAdmin);

export default router;
