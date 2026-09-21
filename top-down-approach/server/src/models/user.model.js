/**
 * User Model & Domain Entity representation
 */

export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN'
};

/**
 * Strips passwordHash and returns safe user information for API responses.
 */
export function toSafeUser(user) {
  if (!user) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
