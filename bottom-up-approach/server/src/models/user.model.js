import { USER_ROLES } from '../constants/domain.constants.js';

/**
 * Creates a raw User domain entity.
 */
export function createUserEntity({ id, name, email, passwordHash, role = USER_ROLES.CUSTOMER, createdAt }) {
  const now = new Date().toISOString();
  return {
    id: id || `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: name ? String(name).trim() : '',
    email: email ? String(email).trim().toLowerCase() : '',
    passwordHash: passwordHash || '',
    role: role === USER_ROLES.ADMIN ? USER_ROLES.ADMIN : USER_ROLES.CUSTOMER,
    createdAt: createdAt || now
  };
}

/**
 * Strips sensitive data (passwordHash) for API transmission.
 */
export function serializeSafeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
}
