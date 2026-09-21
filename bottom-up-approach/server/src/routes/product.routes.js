import { Router } from 'express';
import { handleGetProducts, handleGetProductById } from '../controllers/product.controller.js';

const router = Router();

/**
 * Bottom-Up API Routes composed from controllers
 */
router.get('/products', handleGetProducts);
router.get('/products/:id', handleGetProductById);

export default router;
