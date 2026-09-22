/**
 * Validates user registration payload primitive.
 */
export function validateRegistrationData({ name, email, password }) {
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('A valid email address is required.');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters long.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates login payload primitive.
 */
export function validateLoginData({ email, password }) {
  const errors = [];

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('Email is required.');
  }

  if (!password || typeof password !== 'string' || password.trim().length === 0) {
    errors.push('Password is required.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
