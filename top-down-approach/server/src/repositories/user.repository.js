import bcrypt from 'bcryptjs';
import { USER_ROLES } from '../models/user.model.js';

// In-Memory Data Store (Isolated Repository Layer)
const users = [];

// Seed initial test accounts with hashed passwords
async function seedInitialUsers() {
  if (users.length === 0) {
    const customerHash = await bcrypt.hash('Customer123!', 10);
    const adminHash = await bcrypt.hash('Admin123!', 10);

    users.push(
      {
        id: 'usr_customer_01',
        name: 'Demo Customer',
        email: 'customer@example.com',
        passwordHash: customerHash,
        role: USER_ROLES.CUSTOMER,
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr_admin_01',
        name: 'Demo Administrator',
        email: 'admin@example.com',
        passwordHash: adminHash,
        role: USER_ROLES.ADMIN,
        createdAt: new Date().toISOString()
      }
    );
  }
}

// Initialize seed data
seedInitialUsers();

/**
 * Finds user by email address (case-insensitive).
 */
export async function findUserByEmail(email) {
  if (!email) return null;
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  return user ? { ...user } : null;
}

/**
 * Finds user by unique user ID.
 */
export async function findUserById(id) {
  if (!id) return null;
  const user = users.find((u) => u.id === id);
  return user ? { ...user } : null;
}

/**
 * Creates and persists a new user entity.
 */
export async function createUser(userData) {
  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name: userData.name,
    email: userData.email.toLowerCase(),
    passwordHash: userData.passwordHash,
    role: userData.role || USER_ROLES.CUSTOMER,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  return { ...newUser };
}
