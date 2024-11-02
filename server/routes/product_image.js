const express = require('express');
const router = express.Router();
const imageController = require('../controller/PIController');

// Route để lấy tất cả hình ảnh
router.get('/get', imageController.getAllImages);

// Route để lấy tất cả hình ảnh của một sản phẩm dựa trên product_id
router.get('/get/:product_id', imageController.getImagesByProductId);

// Route để thêm mới một hình ảnh
router.post('/add', imageController.addImage);

// Route để cập nhật một hình ảnh dựa trên image_id
router.put('/update/:image_id', imageController.updateImage);

// Route để xóa một hình ảnh dựa trên image_id
router.delete('/delete/:image_id', imageController.deleteImage);

module.exports = router;
