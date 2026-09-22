import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'top-down-vs-bottom-up-case-study-secret';
const JWT_EXPIRES_IN = '1d';

export async function hashPassword(password) {
  if (!password) throw new Error('Password is required for hashing');
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password, passwordHash) {
  if (!password || !passwordHash) return false;
  return await bcrypt.compare(password, passwordHash);
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
