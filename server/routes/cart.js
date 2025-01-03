const express = require('express');
const cartController = require('../controller/cartController');
const router = express.Router();

// Lấy tất cả giỏ hàng
router.get('/get', cartController.getAllCarts);

// Lấy giỏ hàng theo user_id
router.get('/get/:userId', cartController.getCartByUserId);

// Thêm sản phẩm vào giỏ hàng
router.post('/add', cartController.addCartItem);

// Cập nhật số lượng sản phẩm trong giỏ hàng (theo user_id và thông tin sản phẩm)
router.put('/update/:cartitem_id', cartController.updateCartItem);

// Xóa sản phẩm khỏi giỏ hàng (theo user_id và thông tin sản phẩm)
router.delete('/delete/:cartitem_id', cartController.deleteCartItem);

module.exports = router;
