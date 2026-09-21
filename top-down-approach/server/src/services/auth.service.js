import { findUserByEmail, findUserById, createUser } from '../repositories/user.repository.js';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.utils.js';
import { toSafeUser, USER_ROLES } from '../models/user.model.js';

/**
 * Registers a new user account.
 */
export async function registerUser({ name, email, password, role }) {
  if (!name || !email || !password) {
    const error = new Error('Name, email, and password are required');
    error.statusCode = 400;
    throw error;
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = new Error('Invalid email format');
    error.statusCode = 400;
    throw error;
  }

  // Password length validation
  if (password.length < 6) {
    const error = new Error('Password must be at least 6 characters long');
    error.statusCode = 400;
    throw error;
  }

  // Check duplicate user
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error('An account with this email already exists');
    error.statusCode = 409; // Conflict
    throw error;
  }

  // Hash password & create user
  const passwordHash = await hashPassword(password);
  const assignedRole = role === USER_ROLES.ADMIN ? USER_ROLES.ADMIN : USER_ROLES.CUSTOMER;

  const newUser = await createUser({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash,
    role: assignedRole
  });

  const token = generateToken({ userId: newUser.id, role: newUser.role });
  return { user: toSafeUser(newUser), token };
}

/**
 * Authenticates user credentials.
 */
export async function loginUser({ email, password }) {
  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  const token = generateToken({ userId: user.id, role: user.role });
  return { user: toSafeUser(user), token };
}

/**
 * Retrieves the currently authenticated user's safe profile.
 */
export async function getCurrentUser(userId) {
  const user = await findUserById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return toSafeUser(user);
}
