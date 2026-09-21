import {
  checkoutAndCreateOrder,
  getUserOrders,
  getUserOrderById
} from '../services/order.service.js';

/**
 * Top-Down Controller handling Order REST Endpoints
 */

export async function createOrderHandler(req, res, next) {
  try {
    const order = await checkoutAndCreateOrder(req.user.userId);
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
}

export async function getOrdersHandler(req, res, next) {
  try {
    const orders = await getUserOrders(req.user.userId);
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
}

export async function getOrderByIdHandler(req, res, next) {
  try {
    const { id } = req.params;
    const order = await getUserOrderById(req.user.userId, id);
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
}
