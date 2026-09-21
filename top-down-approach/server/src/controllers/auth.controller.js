import { registerUser, loginUser, getCurrentUser } from '../services/auth.service.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false, // Set to true in HTTPS production environments
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  path: '/'
};

/**
 * Handles user registration HTTP request.
 */
export async function register(req, res, next) {
  try {
    const { user, token } = await registerUser(req.body);
    res.cookie('token', token, COOKIE_OPTIONS);
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handles user login HTTP request.
 */
export async function login(req, res, next) {
  try {
    const { user, token } = await loginUser(req.body);
    res.cookie('token', token, COOKIE_OPTIONS);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handles user logout HTTP request.
 */
export async function logout(req, res, next) {
  try {
    res.clearCookie('token', { path: '/' });
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handles current user info request.
 */
export async function getMe(req, res, next) {
  try {
    const user = await getCurrentUser(req.user.userId);
    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
}
