import { Router } from 'express';
import { handleCreateOrder, handleGetUserOrders, handleGetOrderById } from '../controllers/order.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = Router();

router.use('/orders', authenticateUser);

router.post('/orders', handleCreateOrder);
router.get('/orders', handleGetUserOrders);
router.get('/orders/:id', handleGetOrderById);

export default router;
