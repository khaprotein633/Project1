const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlistController');

// Lấy tất cả danh sách yêu thích
router.get('/get', wishlistController.getAllWishLists);

// Lấy danh sách yêu thích theo user_id
router.get('/get/:user_id', wishlistController.getWishListByUserId);

// Thêm mới danh sách yêu thích
router.post('/add', wishlistController.addWishList);

// Xóa danh sách yêu thích theo wishlist_id
router.delete('/delete/:_id', wishlistController.deleteWishList);

module.exports = router;
