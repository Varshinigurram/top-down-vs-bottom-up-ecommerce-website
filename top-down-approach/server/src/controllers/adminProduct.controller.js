import {
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct
} from '../services/adminProduct.service.js';

export async function createProductController(req, res, next) {
  try {
    const product = await createAdminProduct(req.body);
    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully.'
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProductController(req, res, next) {
  try {
    const { id } = req.params;
    const updatedProduct = await updateAdminProduct(id, req.body);
    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully.'
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProductController(req, res, next) {
  try {
    const { id } = req.params;
    const result = await deleteAdminProduct(id);
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
}
