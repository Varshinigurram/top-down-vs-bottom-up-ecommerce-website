import {
  getUserCartService,
  addItemToCartService,
  updateCartItemQuantityService,
  removeCartItemService,
  clearUserCartService
} from '../services/cart.service.js';

export async function handleGetCart(req, res, next) {
  try {
    const cart = await getUserCartService(req.user.userId);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
}

export async function handleAddToCart(req, res, next) {
  try {
    const cart = await addItemToCartService(req.user.userId, req.body);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
}

export async function handleUpdateCartItem(req, res, next) {
  try {
    const cart = await updateCartItemQuantityService(req.user.userId, req.params.productId, req.body.quantity);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
}

export async function handleRemoveCartItem(req, res, next) {
  try {
    const cart = await removeCartItemService(req.user.userId, req.params.productId);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
}

export async function handleClearCart(req, res, next) {
  try {
    const cart = await clearUserCartService(req.user.userId);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
}
