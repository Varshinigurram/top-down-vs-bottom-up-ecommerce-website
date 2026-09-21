import { verifyToken } from '../utils/auth.utils.js';

/**
 * Middleware enforcing valid JWT authentication via HTTP-only cookie or Bearer header.
 */
export function authenticateUser(req, res, next) {
  let token = req.cookies?.token;

  // Fallback to Bearer token header if present
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in.'
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication session. Please log in again.'
    });
  }

  req.user = decoded;
  next();
}

/**
 * Middleware enforcing specific user role permissions.
 */
export function requireRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: 'Access forbidden: Insufficient permissions'
      });
    }
    next();
  };
}
