import { ORDER_STATUS } from '../constants/domain.constants.js';

/**
 * Order Status State Transition Machine Table
 */
const VALID_TRANSITIONS = {
  [ORDER_STATUS.PENDING]: [ORDER_STATUS.CONFIRMED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.CONFIRMED]: [ORDER_STATUS.SHIPPED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.SHIPPED]: [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.DELIVERED]: [],
  [ORDER_STATUS.CANCELLED]: []
};

export function isValidStatus(status) {
  return Boolean(status && Object.values(ORDER_STATUS).includes(status));
}

export function canTransitionStatus(fromStatus, toStatus) {
  if (!isValidStatus(fromStatus) || !isValidStatus(toStatus)) {
    return false;
  }
  const allowed = VALID_TRANSITIONS[fromStatus] || [];
  return allowed.includes(toStatus);
}

export function getNextAllowedStatuses(fromStatus) {
  if (!isValidStatus(fromStatus)) return [];
  return [...(VALID_TRANSITIONS[fromStatus] || [])];
}
