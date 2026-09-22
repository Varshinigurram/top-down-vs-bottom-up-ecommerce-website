import { Router } from 'express';
import {
  handleGetCart,
  handleAddToCart,
  handleUpdateCartItem,
  handleRemoveCartItem,
  handleClearCart
} from '../controllers/cart.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = Router();

router.use('/cart', authenticateUser);

router.get('/cart', handleGetCart);
router.post('/cart/items', handleAddToCart);
router.put('/cart/items/:productId', handleUpdateCartItem);
router.delete('/cart/items/:productId', handleRemoveCartItem);
router.delete('/cart', handleClearCart);

export default router;
