import { Router } from 'express';
import {
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart
} from '../controllers/cart.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = Router();

// Enforce authentication for all cart routes
router.use(authenticateUser);

/**
 * Top-Down Cart API Routes
 */
router.get('/cart', getCart);
router.post('/cart/items', addItem);
router.put('/cart/items/:productId', updateItemQuantity);
router.delete('/cart/items/:productId', removeItem);
router.delete('/cart', clearCart);

export default router;
