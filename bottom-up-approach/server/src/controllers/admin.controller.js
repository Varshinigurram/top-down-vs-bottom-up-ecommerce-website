import { getAdminDashboardStatsService } from '../services/admin.service.js';
import {
  createProductService,
  updateProductService,
  deleteProductService
} from '../services/product.service.js';
import {
  getAllOrdersAdminService,
  getOrderByIdAdminService,
  updateOrderStatusAdminService
} from '../services/order.service.js';

export async function handleGetAdminDashboard(req, res, next) {
  try {
    const stats = await getAdminDashboardStatsService();
    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
}

export async function handleAdminCreateProduct(req, res, next) {
  try {
    const product = await createProductService(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

export async function handleAdminUpdateProduct(req, res, next) {
  try {
    const product = await updateProductService(req.params.id, req.body);
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

export async function handleAdminDeleteProduct(req, res, next) {
  try {
    const result = await deleteProductService(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function handleGetAllOrdersAdmin(req, res, next) {
  try {
    const orders = await getAllOrdersAdminService();
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
}

export async function handleGetOrderByIdAdmin(req, res, next) {
  try {
    const order = await getOrderByIdAdminService(req.params.id);
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

export async function handleUpdateOrderStatusAdmin(req, res, next) {
  try {
    const { status } = req.body;
    const order = await updateOrderStatusAdminService(req.params.id, status);
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}
