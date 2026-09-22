import bcrypt from 'bcryptjs';
import { USER_ROLES } from '../constants/domain.constants.js';

export const INITIAL_PRODUCTS = [
  {
    id: 'prod_101',
    name: 'Wireless Ergonomic Noise-Canceling Headset',
    description: 'High-fidelity audio with active noise cancellation, dual microphones, and 30-hour battery life for professional work environments.',
    price: 99.99,
    category: 'Electronics',
    image: '🎧',
    stock: 15,
    createdAt: '2026-09-01T10:00:00.000Z',
    updatedAt: '2026-09-21T18:00:00.000Z'
  },
  {
    id: 'prod_102',
    name: 'Tactile RGB Mechanical Keyboard',
    description: 'Customizable mechanical gaming keyboard featuring hot-swappable tactile switches, aluminum top casing, and dynamic per-key backlighting.',
    price: 129.50,
    category: 'Electronics',
    image: '⌨️',
    stock: 8,
    createdAt: '2026-09-02T10:00:00.000Z',
    updatedAt: '2026-09-21T18:00:00.000Z'
  },
  {
    id: 'prod_103',
    name: 'Smart Health & Fitness Tracker Watch',
    description: 'Waterproof smartwatch with continuous heart rate monitoring, continuous SpO2 tracking, sleep analysis, and GPS activity tracking.',
    price: 149.00,
    category: 'Electronics',
    image: '⌚',
    stock: 22,
    createdAt: '2026-09-03T10:00:00.000Z',
    updatedAt: '2026-09-21T18:00:00.000Z'
  },
  {
    id: 'prod_104',
    name: 'Precision Optical Ergonomic Mouse',
    description: 'High-precision wireless mouse with thumb rest, hyper-fast scroll wheel, and multi-device Bluetooth connectivity.',
    price: 49.99,
    category: 'Electronics',
    image: '🖱️',
    stock: 35,
    createdAt: '2026-09-04T10:00:00.000Z',
    updatedAt: '2026-09-21T18:00:00.000Z'
  },
  {
    id: 'prod_105',
    name: 'Ultra-Wide Stitched Desk Mat Pad',
    description: 'Minimalist desk pad made from premium micro-weave cloth with reinforced anti-fray stitched edges and heavy non-slip rubber base.',
    price: 24.99,
    category: 'Accessories',
    image: '🖼️',
    stock: 50,
    createdAt: '2026-09-05T10:00:00.000Z',
    updatedAt: '2026-09-21T18:00:00.000Z'
  },
  {
    id: 'prod_106',
    name: 'Minimalist Leather Slim Cardholder',
    description: 'Handcrafted full-grain leather wallet equipped with RFID-blocking technology and quick-access card ejection slot.',
    price: 34.50,
    category: 'Fashion',
    image: '👛',
    stock: 18,
    createdAt: '2026-09-06T10:00:00.000Z',
    updatedAt: '2026-09-21T18:00:00.000Z'
  },
  {
    id: 'prod_107',
    name: 'Insulated Stainless Steel Water Flask',
    description: 'Vacuum-insulated 32oz bottle keeping beverages icy cold for 24 hours or piping hot for 12 hours with leak-proof straw lid.',
    price: 29.99,
    category: 'Lifestyle',
    image: '🧉',
    stock: 40,
    createdAt: '2026-09-07T10:00:00.000Z',
    updatedAt: '2026-09-21T18:00:00.000Z'
  },
  {
    id: 'prod_108',
    name: 'Modern Ambient LED Desk Lamp',
    description: 'Dimmable architectural desk lamp with adjustable color temperatures, touch controls, and built-in fast wireless charging pad.',
    price: 59.95,
    category: 'Home',
    image: '💡',
    stock: 12,
    createdAt: '2026-09-08T10:00:00.000Z',
    updatedAt: '2026-09-21T18:00:00.000Z'
  },
  {
    id: 'prod_109',
    name: 'Ergonomic Memory Foam Lumbar Cushion',
    description: 'Premium high-density memory foam cushion providing optimal lower back support and posture alignment for office chairs.',
    price: 39.99,
    category: 'Home',
    image: '🛋️',
    stock: 25,
    createdAt: '2026-09-09T10:00:00.000Z',
    updatedAt: '2026-09-21T18:00:00.000Z'
  },
  {
    id: 'prod_110',
    name: 'Water-Resistant Commuter Backpack',
    description: 'Sleek travel backpack featuring padded 16-inch laptop compartment, hidden anti-theft pocket, and integrated USB charging port.',
    price: 79.00,
    category: 'Accessories',
    image: '🎒',
    stock: 14,
    createdAt: '2026-09-10T10:00:00.000Z',
    updatedAt: '2026-09-21T18:00:00.000Z'
  }
];

export async function createInitialSeedUsers() {
  const customerHash = await bcrypt.hash('Customer123!', 10);
  const adminHash = await bcrypt.hash('Admin123!', 10);

  return [
    {
      id: 'usr_customer_01',
      name: 'Demo Customer',
      email: 'customer@example.com',
      passwordHash: customerHash,
      role: USER_ROLES.CUSTOMER,
      createdAt: '2026-09-01T10:00:00.000Z'
    },
    {
      id: 'usr_admin_01',
      name: 'Demo Administrator',
      email: 'admin@example.com',
      passwordHash: adminHash,
      role: USER_ROLES.ADMIN,
      createdAt: '2026-09-01T10:00:00.000Z'
    }
  ];
}
