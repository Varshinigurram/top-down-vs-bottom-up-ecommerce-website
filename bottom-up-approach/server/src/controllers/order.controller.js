import {
  createOrderService,
  getUserOrdersService,
  getOrderByIdService
} from '../services/order.service.js';

export async function handleCreateOrder(req, res, next) {
  try {
    const order = await createOrderService(req.user.userId);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

export async function handleGetUserOrders(req, res, next) {
  try {
    const orders = await getUserOrdersService(req.user.userId);
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
}

export async function handleGetOrderById(req, res, next) {
  try {
    const order = await getOrderByIdService(req.user.userId, req.params.id);
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}
