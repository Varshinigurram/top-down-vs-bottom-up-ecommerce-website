import { registerUser, loginUser, getCurrentUser } from '../services/auth.service.js';

export async function handleRegister(req, res, next) {
  try {
    const result = await registerUser(req.body);
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });
    res.status(201).json({
      success: true,
      data: { user: result.user, token: result.token }
    });
  } catch (err) {
    next(err);
  }
}

export async function handleLogin(req, res, next) {
  try {
    const result = await loginUser(req.body);
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({
      success: true,
      data: { user: result.user, token: result.token }
    });
  } catch (err) {
    next(err);
  }
}

export async function handleLogout(req, res) {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Logged out successfully.'
  });
}

export async function handleGetCurrentUser(req, res, next) {
  try {
    const user = await getCurrentUser(req.user.userId);
    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (err) {
    next(err);
  }
}
