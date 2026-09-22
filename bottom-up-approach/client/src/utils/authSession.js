/**
 * Client Session Storage Primitive
 */

const USER_SESSION_KEY = 'bottom_up_user_session';

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

export function setStoredUser(user) {
  try {
    if (user) {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_SESSION_KEY);
    }
  } catch (err) {
    console.warn('Failed to persist user session:', err);
  }
}

export function clearStoredUser() {
  try {
    localStorage.removeItem(USER_SESSION_KEY);
  } catch (err) {
    console.warn('Failed to clear user session:', err);
  }
}
