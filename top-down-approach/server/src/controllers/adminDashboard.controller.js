import { getAdminDashboardStats } from '../services/adminDashboard.service.js';

export async function getDashboardStatsController(req, res, next) {
  try {
    const stats = await getAdminDashboardStats();
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
}
