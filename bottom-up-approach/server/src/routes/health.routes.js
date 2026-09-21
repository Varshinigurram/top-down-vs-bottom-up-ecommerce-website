import { Router } from 'express';

const router = Router();

/**
 * Bottom-Up Health Check Route
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    architecture: 'Bottom-Up Approach',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
