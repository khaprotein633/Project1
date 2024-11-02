const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

// Lấy tất cả đơn hàng
router.get('/get', orderController.getAllOrders);

// Lấy đơn hàng theo orders_id
router.get('/get/:orders_id', orderController.getOrderById);

// Lấy đơn hàng theo user_id
router.get('/get/:user_id', orderController.getOrdersByUserId);

// Thêm đơn hàng mới
router.post('/add', orderController.addOrder);

// Cập nhật đơn hàng theo orders_id
router.put('/update/:orders_id', orderController.updateOrder);

// Xóa đơn hàng theo orders_id
router.delete('/delete/:orders_id', orderController.deleteOrder);

module.exports = router;
