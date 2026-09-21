import { Router } from 'express';
import { authenticateUser, requireRole } from '../middleware/auth.middleware.js';
import { USER_ROLES } from '../models/user.model.js';
import { getDashboardStatsController } from '../controllers/adminDashboard.controller.js';
import {
  createProductController,
  updateProductController,
  deleteProductController
} from '../controllers/adminProduct.controller.js';
import {
  getAllOrdersController,
  getOrderDetailsController,
  updateOrderStatusController
} from '../controllers/adminOrder.controller.js';

const router = Router();

// Protect ALL admin routes with Auth + ADMIN Role requirement
router.use(authenticateUser);
router.use(requireRole(USER_ROLES.ADMIN));

// Operational Dashboard
router.get('/dashboard', getDashboardStatsController);

// Product Management CRUD
router.post('/products', createProductController);
router.put('/products/:id', updateProductController);
router.delete('/products/:id', deleteProductController);

// Customer Order Management
router.get('/orders', getAllOrdersController);
router.get('/orders/:id', getOrderDetailsController);
router.put('/orders/:id/status', updateOrderStatusController);

export default router;
