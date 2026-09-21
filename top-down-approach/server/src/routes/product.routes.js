import { Router } from 'express';
import { getAllProducts, getProductById } from '../controllers/product.controller.js';

const router = Router();

/**
 * REST Endpoint Routes for Products
 */
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

export default router;
