import { Router } from 'express';
import {
  createOrderHandler,
  getOrdersHandler,
  getOrderByIdHandler
} from '../controllers/order.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = Router();

// Enforce authentication for all order routes
router.use(authenticateUser);

/**
 * Top-Down Order API Routes
 */
router.post('/orders', createOrderHandler);
router.get('/orders', getOrdersHandler);
router.get('/orders/:id', getOrderByIdHandler);

export default router;
