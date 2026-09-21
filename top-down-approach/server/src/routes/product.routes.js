import { Router } from 'express';
import { getAllProducts, getProductById } from '../controllers/product.controller.js';

const router = Router();

/**
 * Top-Down API Routes: High-level REST endpoint contracts
 */
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

export default router;
