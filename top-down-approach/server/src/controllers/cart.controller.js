import {
  getUserCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearUserCart
} from '../services/cart.service.js';

/**
 * Top-Down Controller handling Cart REST Endpoints
 */

export async function getCart(req, res, next) {
  try {
    const cart = await getUserCart(req.user.userId);
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
}

export async function addItem(req, res, next) {
  try {
    const cart = await addItemToCart(req.user.userId, req.body);
    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart
    });
  } catch (error) {
    next(error);
  }
}

export async function updateItemQuantity(req, res, next) {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await updateCartItemQuantity(req.user.userId, productId, quantity);
    res.status(200).json({
      success: true,
      message: 'Cart quantity updated',
      data: cart
    });
  } catch (error) {
    next(error);
  }
}

export async function removeItem(req, res, next) {
  try {
    const { productId } = req.params;
    const cart = await removeCartItem(req.user.userId, productId);
    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    });
  } catch (error) {
    next(error);
  }
}

export async function clearCart(req, res, next) {
  try {
    const cart = await clearUserCart(req.user.userId);
    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart
    });
  } catch (error) {
    next(error);
  }
}
