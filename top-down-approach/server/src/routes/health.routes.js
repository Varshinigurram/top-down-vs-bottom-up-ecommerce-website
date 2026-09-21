import { Router } from 'express';

const router = Router();

/**
 * Health Check API Endpoint
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    architecture: 'Top-Down Approach',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
