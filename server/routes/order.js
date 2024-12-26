const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');


router.get('/get', orderController.getAllOrders);


router.get('/get/:_id', orderController.getOrderById);


router.get('/getbyuserid/:user_id', orderController.getOrdersByUserId);


router.post('/add', orderController.addOrder);


router.put('/update/:_id', orderController.updateOrder);


router.delete('/delete/:_id', orderController.deleteOrder);

module.exports = router;
