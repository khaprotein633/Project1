const express = require('express');
const cartController = require('../controller/cartController');
const router = express.Router();

router.get('/get/:user_id', cartController.getAllCarts);
router.get('/get/:user_id',cartController.getCartByUserId);
router.post('/add', cartController.addCartItem);
router.put('/update/:_id', cartController.updateCartItem);
router.delete('/delete/:_id', cartController.deleteCartItem);

module.exports = router;