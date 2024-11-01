const express = require('express');
const router = express.Router();
const orderStatusController = require('../controller/OSController');

// Lấy tất cả trạng thái đơn hàng
router.get('/get/', orderStatusController.getAllOrderStatuses);

// Lấy trạng thái đơn hàng theo order_status_id
router.get('/get/:_id', orderStatusController.getOrderStatusById);

// Thêm trạng thái đơn hàng mới
router.post('/add', orderStatusController.addOrderStatus);

// Cập nhật trạng thái đơn hàng theo order_status_id
router.put('/update/:_id', orderStatusController.updateOrderStatus);

// Xóa trạng thái đơn hàng theo order_status_id
router.delete('/delete/:_id', orderStatusController.deleteOrderStatus);

module.exports = router;
