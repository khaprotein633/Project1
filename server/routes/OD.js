const express = require('express');
const router = express.Router();
const ODController = require('../controller/ODController');

// Lấy tất cả chi tiết đơn hàng
router.get('/get',ODController.getAllOrderDetails);

// Lấy chi tiết đơn hàng theo order_details_id
router.get('/get/:order_details_id',ODController.getOrderDetailsById);

// Lấy chi tiết đơn hàng theo order_id
router.get('/get/:order_id',ODController.getOrderDetailsByOrderId);

// Thêm chi tiết đơn hàng mới
router.post('/add',ODController.addOrderDetail);

// Cập nhật chi tiết đơn hàng theo order_details_id
router.put('/update/:order_details_id',ODController.updateOrderDetail);

// Xóa chi tiết đơn hàng theo order_details_id
router.delete('/delete/:order_details_id',ODController.deleteOrderDetail);

module.exports = router;
