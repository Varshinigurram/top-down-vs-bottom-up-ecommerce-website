import { findUserByEmail, findUserById, createUser } from '../repositories/user.repository.js';
import { validateRegistrationData, validateLoginData } from '../validators/user.validator.js';
import { hashPassword, comparePassword, signToken } from '../utils/authPrimitives.js';
import { serializeSafeUser } from '../models/user.model.js';

/**
 * Reusable Backend Authentication Service
 * (Independent of Express req/res objects)
 */

export async function registerUser({ name, email, password }) {
  const validation = validateRegistrationData({ name, email, password });
  if (!validation.isValid) {
    const error = new Error(validation.errors.join(' '));
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error('An account with this email address already exists.');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await hashPassword(password);
  const newUser = await createUser({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash
  });

  const token = signToken({ userId: newUser.id, role: newUser.role });
  return {
    user: serializeSafeUser(newUser),
    token
  };
}

export async function loginUser({ email, password }) {
  const validation = validateLoginData({ email, password });
  if (!validation.isValid) {
    const error = new Error(validation.errors.join(' '));
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const isValidPassword = await comparePassword(password, user.passwordHash);
  if (!isValidPassword) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const token = signToken({ userId: user.id, role: user.role });
  return {
    user: serializeSafeUser(user),
    token
  };
}

export async function getCurrentUser(userId) {
  if (!userId) {
    const error = new Error('User ID is required.');
    error.statusCode = 401;
    throw error;
  }

  const user = await findUserById(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  return serializeSafeUser(user);
}
