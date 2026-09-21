/**
 * Bottom-Up Architecture: Pure utility functions for standardizing API responses
 */

export function buildSuccessResponse(data, meta = {}) {
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  };
}

export function buildErrorResponse(message, statusCode = 500) {
  return {
    success: false,
    error: message,
    statusCode
  };
}
