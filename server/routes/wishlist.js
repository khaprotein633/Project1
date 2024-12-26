const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlistController');

// Lấy tất cả danh sách yêu thích
router.get('/get', wishlistController.getAllWishLists);

// Lấy danh sách yêu thích theo user_id
router.get('/get/:user_id', wishlistController.getWishListByUserId);

// Cập nhật số lượng sản phẩm trong giỏ hàng (theo user_id và thông tin sản phẩm)
router.put('/update/:wistlistItem_id', wishlistController.updateWistlistItem);

// Thêm mới danh sách yêu thích
router.post('/add', wishlistController.addWishList);

// Xóa danh sách yêu thích theo wishlist_id
router.delete('/delete/:wistlistItem_id', wishlistController.deleteWishList);

module.exports = router;
