import { Router } from 'express';
import { handleRegister, handleLogin, handleLogout, handleGetCurrentUser } from '../controllers/auth.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/auth/register', handleRegister);
router.post('/auth/login', handleLogin);
router.post('/auth/logout', handleLogout);
router.get('/auth/me', authenticateUser, handleGetCurrentUser);

export default router;
