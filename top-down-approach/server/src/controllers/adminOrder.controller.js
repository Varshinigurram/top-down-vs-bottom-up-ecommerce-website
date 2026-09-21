import {
  getAdminOrders,
  getAdminOrderDetails,
  updateAdminOrderStatus
} from '../services/adminOrder.service.js';

export async function getAllOrdersController(req, res, next) {
  try {
    const orders = await getAdminOrders();
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
}

export async function getOrderDetailsController(req, res, next) {
  try {
    const { id } = req.params;
    const order = await getAdminOrderDetails(id);
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
}

export async function updateOrderStatusController(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Request body must contain 'status' property."
      });
    }

    const updatedOrder = await updateAdminOrderStatus(id, status);
    res.status(200).json({
      success: true,
      data: updatedOrder,
      message: `Order status updated to '${status}'.`
    });
  } catch (error) {
    next(error);
  }
}
