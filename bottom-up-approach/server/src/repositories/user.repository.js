import { createUserEntity, serializeSafeUser } from '../models/user.model.js';
import { createInitialSeedUsers } from '../data/seedData.js';

const users = [];

async function initializeUsers() {
  if (users.length === 0) {
    const seed = await createInitialSeedUsers();
    seed.forEach((u) => users.push(createUserEntity(u)));
  }
}

initializeUsers();

export async function findUserByEmail(email) {
  await initializeUsers();
  if (!email) return null;
  const match = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  return match ? { ...match } : null;
}

export async function findUserById(id) {
  await initializeUsers();
  if (!id) return null;
  const match = users.find((u) => u.id === id);
  return match ? { ...match } : null;
}

export async function createUser(userData) {
  await initializeUsers();
  const newUser = createUserEntity(userData);
  users.push(newUser);
  return { ...newUser };
}
